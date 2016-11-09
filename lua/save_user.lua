
local uid_counter_key      = 'fvac.counter.uid'
local user_table_key       = 'fvac.tables.users'
local email_index_key      = 'fvac.indexes.user_email'
local mobile_index_key     = 'fvac.indexes.user_mobile'
local nickname_index_key   = 'fvac.indexes.user_nickname'
local device_index_key     = 'fvac.indexes.user_device'
local binding_index_key    = 'fvac.indexes.sdk_binding'

local function is_empty(val)
  return val == nil or val == cjson.null or (type(val) == 'string' and val == '')
end

local function check_bindings(new_user)
  if type(new_user.bindings) == 'table' then
    for k, v in pairs(new_user.bindings) do 
      local binding_key = tostring(k)..'.'..tostring(v)
      local uid = redis.call('hget', binding_index_key, binding_key)

      if uid and tonumber(uid) ~= tonumber(new_user.id) then 
        -- existing uid not match, return error
        return false
      end
    end
  end 

  return true
end

local function check_email(new_user)
  if is_empty(new_user.email) then 
    return true
  else 
    local uid = redis.call('hget', email_index_key, new_user.email)

    if uid and tonumber(uid) ~= tonumber(new_user.id) then
      return false
    end

    return true
  end
end

local function check_mobile(new_user)
  if is_empty(new_user.mobile) then 
    return true
  else 
    local uid = redis.call('hget', mobile_index_key, new_user.mobile)

    -- check if mobile already used
    if uid and tonumber(uid) ~= tonumber(new_user.id) then
      return false
    end

    return true
  end
end

local function check_device_id(new_user)
  -- check device for unbind users
  if is_empty(new_user.mobile) then 
    if is_empty(new_user.email) then 
      if type(new_user.bindings) == 'table' then 
        local count = 0
        for _ in pairs(new_user.bindings) do count = count + 1 end

        if count == 0 then 
          if is_empty(new_user.device_id) then 
            -- device_id not set, can't identify new_user
            return false
          end
        end
      end
    end
  end

  return true
end

local function is_device_id(str)
  if type(str) == 'string' and string.match(str, '^[a-zA-Z0-9_%-%.]+') then 
    return true
  else 
    return false
  end
end

local function is_email(str)
  if type(str) == 'string' and string.match(str, '([^@]+)@([^@]+)') then 
    return true
  else 
    return false
  end
end

local function is_mobile(str)
  if type(str) == 'string' and string.match(str, '[0-9]+') then 
    return true
  else 
    return false
  end
end

local function update_user_indexes(new_user, old_user)
  local should_update_device = true 

  if is_email(new_user.email) then 
    if not old_user or old_user.email ~= new_user.email then
      redis.call('hset', email_index_key, new_user.email, new_user.id)
    end

    if old_user and is_email(old_user.email) and old_user.email ~= new_user.email then  
      redis.call('hdel', email_index_key, old_user.email)
    end

    should_update_device = false
  end

  if is_mobile(new_user.mobile) then
    if not old_user or old_user.mobile ~= new_user.mobile then
      redis.call('hset', mobile_index_key, new_user.mobile, new_user.id)
    end

    if old_user and is_mobile(old_user.mobile) and old_user.mobile ~= new_user.email then 
      redis.call('hdel', mobile_index_key, old_user.mobile)
    end

    should_update_device = false
  end

  if type(new_user.bindings) == 'table' then
    for k, v in pairs(new_user.bindings) do 
      local binding_key = tostring(k)..'.'..tostring(v)
      redis.call('hset', binding_index_key, binding_key, new_user.id)
      
      should_update_device = false
    end
  end 

  if old_user and is_device_id(old_user.device_id) then 
    if new_user.device_id == nil or string.gsub(new_user.device_id, ' ', '') == '' then 
      redis.call('hdel', device_index_key, old_user.device_id)
    end
  end

  if should_update_device and is_device_id(new_user.device_id) then
    redis.call('hset', device_index_key, new_user.device_id, new_user.id)
  end
end

local new_user = cjson.decode(ARGV[1])
local old_user = nil

if not check_mobile(new_user) then 
  return {'error', 'duplicated mobile'}
end

if not check_email(new_user) then 
  return {'error', 'duplicated email'}
end

if not check_bindings(new_user) then 
  return {'error', 'already bind'}
end

if not check_device_id(new_user) then 
  return {'error', 'must specified one of these fields: [mobile, email, bindings, device_id]'}
end


if new_user.id > 100000 then 
  local last_json = redis.call('hget', user_table_key, new_user.id)

  if last_json then 
    old_user = cjson.decode(last_json)
  end
else 
  local id = redis.call('get', uid_counter_key)

  if not id then
    redis.call('set', uid_counter_key, 100000)
  end

  new_user.id = redis.call('incr', uid_counter_key)
end 

update_user_indexes(new_user, old_user)

local json = cjson.encode(new_user)
redis.call('hset', user_table_key, new_user.id, json)

return {'ok', new_user.id}
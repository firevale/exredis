local key_field = KEYS[1]
local key_value = string.lower(ARGV[1])

local user_base_key        = 'acs.user.'
local email_index_key      = 'acs.indexes.user_email.'
local mobile_index_key     = 'acs.indexes.user_mobile.'
local nickname_index_key   = 'acs.indexes.user_nickname.'
local device_index_key     = 'acs.indexes.user_device.'
local binding_index_key    = 'acs.indexes.sdk_binding.'

local user = nil
local user_id = nil

if key_field == 'email' then 
  user_id = redis.call('get', email_index_key..key_value)
elseif key_field == 'mobile' then 
  user_id = redis.call('get', mobile_index_key..key_value)
elseif key_field == 'device' then 
  user_id = redis.call('get', device_index_key..key_value)
elseif key_field == 'sdk' then 
  user_id = redis.call('hget', binding_index_key..key_value)
elseif key_field == 'id' then 
  user_id = key_field
end

if user_id then 
  local json = redis.call('get', user_base_key..user_id)

  if json then 
    user = cjson.decode(json)
  end   
end

if user then 
  if type(user.email) == 'string' and string.match(user.email, '([^@]+)@([^@]+)') then 
    redis.call('del', email_index_key..user.email)
  end

  if type(user.mobile) == 'string' and string.match(user.mobile, '[0-9]+') then
    redis.call('del', mobile_index_key..user.mobile)
  end

  if type(user.bindings) == 'table' then
    for k, v in pairs(user.bindings) do 
      local binding_key = tostring(k)..'.'..tostring(v)
      redis.call('del', binding_index_key..binding_key)
    end
  end 

  if type(user.device_id) == 'string' and string.match(user.device_id, '[a-zA-Z0-9%-_%.]+') then
    redis.call('del', device_index_key..user.device_id)
  end

  redis.call('del', user_base_key..user.id)
end

return 'ok'


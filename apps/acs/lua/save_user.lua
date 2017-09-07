
local user_base_key        = 'acs.user.'
local email_index_key      = 'acs.indexes.user_email.'
local mobile_index_key     = 'acs.indexes.user_mobile.'
local nickname_index_key   = 'acs.indexes.user_nickname.'
local device_index_key     = 'acs.indexes.user_device.'
local binding_index_key    = 'acs.indexes.sdk_binding.'

local function is_empty(val)
  return val == nil or val == "nil" or val == cjson.null or (type(val) == 'string' and val == '')
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

local user_data = ARGV[1]
local user_id = ARGV[2]
local user_email = ARGV[3]
local user_mobile = ARGV[4]
local user_device_id = ARGV[5]
local user_old_email = ARGV[6]
local user_old_mobile = ARGV[7]
local user_old_device_id = ARGV[8]

local ttl = 604800

-- cache user data for 1 week 
redis.call('setex', user_base_key..user_id, ttl, user_data)

if user_email ~= user_old_email and is_email(user_email)  then
  redis.call('setex', email_index_key..user_email, ttl, user_id)
end

if user_email ~= user_old_email and is_email(user_old_email)  then
  redis.call('del', email_index_key..user_old_email)
end

if user_mobile ~= user_old_mobile and is_mobile(user_mobile)  then
  redis.call('setex', mobile_index_key..user_mobile, ttl, user_id)
end

if user_mobile ~= user_old_mobile and is_mobile(user_old_mobile)  then
  redis.call('del', mobile_index_key..user_old_mobile)
end

if is_device_id(user_device_id) then 
  if is_empty(user_email) and is_empty(user_mobile) and is_empty(user_old_mobile) and is_empty(user_old_mobile) then 
    redis.call('setex', device_index_key..user_device_id, ttl, user_id)

    if is_device_id(user_old_device_id) then 
      redis.call('del', device_index_key..user_old_device_id)
    end
  else 
    redis.call('del', device_index_key..user_device_id)
  end
end

return "ok"


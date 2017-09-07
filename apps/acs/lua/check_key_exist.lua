local key_field = KEYS[1]
local key_value = ARGV[1]

local user_base_key        = 'acs.user.'
local email_index_key      = 'acs.indexes.user_email.'
local mobile_index_key     = 'acs.indexes.user_mobile.'
local nickname_index_key   = 'acs.indexes.user_nickname.'
local device_index_key     = 'acs.indexes.user_device.'
local binding_index_key    = 'acs.indexes.sdk_binding.'


local user = nil
local user_id = nil

if key_field == 'email' then 
  return redis.call('exists', email_index_key..string.lower(key_value))
elseif key_field == 'mobile' then 
  return redis.call('exists', mobile_index_key..key_value)
elseif key_field == 'device' then 
  return redis.call('exists', device_index_key..key_value)
elseif key_field == 'sdk' then 
  return redis.call('exists', binding_index_key..key_value)
end

return false



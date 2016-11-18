local key_field = KEYS[1]
local key_value = ARGV[1]

local uid_counter_key      = 'fvac.counter.uid'
local user_base_key        = 'fvac.user.'
local email_index_key      = 'fvac.indexes.user_email.'
local mobile_index_key     = 'fvac.indexes.user_mobile.'
local nickname_index_key   = 'fvac.indexes.user_nickname.'
local device_index_key     = 'fvac.indexes.user_device.'
local binding_index_key    = 'fvac.indexes.sdk_binding.'


local user = nil
local user_id = nil

if key_field == 'email' then 
  user_id = redis.call('get', email_index_key..string.lower(key_value))
elseif key_field == 'mobile' then 
  user_id = redis.call('get', mobile_index_key..key_value)
elseif key_field == 'device' then 
  user_id = redis.call('get', device_index_key..key_value)
elseif key_field == 'sdk' then 
  user_id = redis.call('get', binding_index_key..key_value)
elseif key_field == 'id' then 
  user_id = key_field
end

if user_id then 
  local json = redis.call('get', user_base_key..user_id)

  if json then 
  	return json
  end   
end

return 'undefined'


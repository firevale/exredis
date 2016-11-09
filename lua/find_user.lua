local key_field = KEYS[1]
local key_value = ARGV[1]

local uid_counter_key      = 'fvac.counter.uid'
local user_table_key       = 'fvac.tables.users'
local email_index_key      = 'fvac.indexes.user_email'
local mobile_index_key     = 'fvac.indexes.user_mobile'
local nickname_index_key   = 'fvac.indexes.user_nickname'
local device_index_key     = 'fvac.indexes.user_device'
local binding_index_key    = 'fvac.indexes.sdk_binding'


local user = nil
local user_id = nil

if key_field == 'email' then 
  user_id = redis.call('hget', email_index_key, string.lower(key_value))
elseif key_field == 'mobile' then 
  user_id = redis.call('hget', mobile_index_key, key_value)
elseif key_field == 'device' then 
  user_id = redis.call('hget', device_index_key, key_value)
elseif key_field == 'sdk' then 
  user_id = redis.call('hget', binding_index_key, key_value)
elseif key_field == 'id' then 
  user_id = key_field
end

if user_id then 
  local json = redis.call('hget', user_table_key, user_id)

  if json then 
  	return json
  end   
end

return 'undefined'


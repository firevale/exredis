redis.replicate_commands()

local app_id = KEYS[1]
local open_id = ARGV[1]
local key_a = '_acs.login_codes.available.'..app_id 
local key_b = '_acs.login_codes.assigned.'..app_id

local code = redis.call('srandmember', key_a)

if code then
  redis.call('smove', key_a, key_b, code)
else 
  code = 'undefined'
end

redis.call('set', '_acs.login_codes.owns.'..app_id..open_id, code)

return code 



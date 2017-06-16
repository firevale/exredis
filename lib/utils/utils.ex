defmodule Utils do 
  use Bitwise
  use LogAlias

  require Ecto.DateTime
  alias   Comeonin.Pbkdf2
  alias   Utils.Tinypng 
  
  def md5_sign(s) when is_bitstring(s) do
    :crypto.hash(:md5, s) |> to_hex |> String.downcase
  end

  def hmacsha1_sign(source, key) when is_bitstring(source) and is_bitstring(key) do 
    :crypto.hmac(:sha, key, source) |> to_hex |> String.downcase  
  end

  def hmacsha256_sign(source, key) when is_bitstring(source) and is_bitstring(key) do 
    :crypto.hmac(:sha256, key, source) |> to_hex |> String.downcase
  end

  def hmacmd5_sign(source, key) when is_bitstring(source) and is_bitstring(key) do 
    :crypto.hmac(:md5, key, source) |> to_hex |> String.downcase
  end

  def rsa_priv_sign(priv_key_file, s, type \\ :sha) do
    key = read_rsa_key_file(priv_key_file)
    :public_key.sign(s, type, key) |> Base.encode64
  end

  def rsa_priv_sign2(priv_key_str, s, type \\ :sha) do
    key = rsa_priv_key_from_string(priv_key_str)
    :public_key.sign(s, type, key) |> Base.encode64
  end

  @doc """
  verify rsa signature using public key file
  key_file: file name of public key
  data: source text
  sign: signature to be verified
  """
  def rsa_public_verify(key_file, data, sign, type \\ :sha) do
    key = read_rsa_key_file(key_file)
    :public_key.verify(data, type, sign |> Base.decode64!, key)
  end

  @doc """
  verify rsa signature using public key content
  key_str: rsa key content
  data: source text 
  sign: signatrue to be verified
  """
  def rsa_public_verify2(key_str, data, sign, type \\ :sha) do 
    key = rsa_key_from_string(key_str)
    :public_key.verify(data, type, sign |> Base.decode64!, key)
  end

  def rsa_public_verify3(key_str, data, sig, type \\ :sha) do 
    key = rsa_key_from_string(key_str)
    :public_key.verify(data, type, sig, key)
  end

  def rsa_private_verify2(key_str, data, sign, type \\ :sha) do 
    key = rsa_priv_key_from_string(key_str)
    our_sign = :public_key.sign(data, type, key) |> Base.encode64
    our_sign == sign
  end

  @doc """
  decrypt data using given rsa public key file
  """
  def rsa_pub_decrypt(key_file, data) do 
    key = read_rsa_key_file(key_file)
    data |> Base.decode64! |> :public_key.decrypt_public(key)    
  end

  @doc """
  decrypt data using given rsa public key content(string)
  """
  def rsa_pub_decrypt2(key_str, data) do 
    key = rsa_key_from_string(key_str)
    data |> Base.decode64! |> :public_key.decrypt_public(key)    
  end

  @doc """
  decrypt data using given rsa public key file (split to 128 bytes)
  """
  def rsa_pubseg_decrypt(key_file, data) do 
    key = read_rsa_key_file(key_file)
    data |> Base.decode64! |> rsa_decrypt_public(key)    
  end

  @doc """
  decrypt data using given rsa public key content(string)
  """
  def rsa_pubseg_decrypt2(key_str, data) do 
    key = rsa_key_from_string(key_str)
    data |> Base.decode64! |> rsa_decrypt_public(key)    
  end

  @doc """
  decrypt data using given rsa private key file
  """
  def rsa_priv_decrypt(priv_key_file, data) do
    key = read_rsa_key_file(priv_key_file)
    data |> Base.decode64! |> rsa_decrypt_private(key)
  end

  def rsa_priv_key_from_string(key_str) do 
    pem_bin = "-----BEGIN RSA PRIVATE KEY-----\r\n" 
               <> split_key_str(String.replace(key_str, "\n", ""), []) 
               <> " \r\n-----END RSA PRIVATE KEY-----\r\n"

    [entry] = :public_key.pem_decode(pem_bin)

    :public_key.pem_entry_decode(entry)
  end

  def rsa_key_from_string(key_str) do 
    pem_bin = "-----BEGIN PUBLIC KEY-----\r\n" 
               <> split_key_str(String.replace(key_str, "\n", ""), []) 
               <> " \r\n-----END PUBLIC KEY-----\r\n"

    [entry] = :public_key.pem_decode(pem_bin)
    :public_key.pem_entry_decode(entry)
  end

  defp split_key_str("", strs) do 
    strs |> Enum.reverse |> Enum.join(" \r\n")
  end

  defp split_key_str(str, result) do 
    {a, b} = String.split_at(str, 75)
    split_key_str(b, [a | result])
  end

  defp read_rsa_key_file(file_name) do
    pem_bin = File.read!(file_name)
    [entry] = :public_key.pem_decode(pem_bin)
    :public_key.pem_entry_decode(entry)
  end

  ################################################################################
  defp rsa_decrypt_public(data, key) when is_binary(data) do
    rsa_decrypt_public(data, key, <<>>)
  end
  defp rsa_decrypt_public(<<data :: size(128)-unit(8)-binary, rest :: binary>>, key, result) do
    rsa_decrypt_public(rest, key, result <> :public_key.decrypt_public(data, key))
  end
  defp rsa_decrypt_public(<<data :: binary>>, key, result) when byte_size(data) < 128 and byte_size(data) > 0 do
    result <> :public_key.decrypt_public(data, key)
  end
  defp rsa_decrypt_public(<<>>, _key, result) do
    result
  end

  ################################################################################
  defp rsa_decrypt_private(data, key) when is_binary(data) do
    rsa_decrypt_private(data, key, <<>>)
  end
  defp rsa_decrypt_private(<<data :: size(128)-unit(8)-binary, rest :: binary>>, key, result) do
    rsa_decrypt_private(rest, key, result <> :public_key.decrypt_private(data, key))
  end
  defp rsa_decrypt_private(<<data :: binary>>, key, result) when byte_size(data) < 128 and byte_size(data) > 0 do
    result <> :public_key.decrypt_private(data, key)
  end
  defp rsa_decrypt_private(<<>>, _key, result) do
    result
  end
  
  @epoch :calendar.datetime_to_gregorian_seconds({{1970, 1, 1}, {0, 0, 0}})
  
  def to_unix(%Ecto.DateTime{} = date_time) do 
    date_time |> Ecto.DateTime.to_erl  |> :calendar.datetime_to_gregorian_seconds |> Kernel.-(@epoch)
  end

  def unix_timestamp do
    :erlang.system_time(:seconds)
  end
  def unix_timestamp({mega, sec, _micro}) do
    mega * 1_000_000 + sec
  end

  def human_readable_size(size) when is_integer(size) and size > 1_073_741_824,  do: :io_lib.format("~.1.0fG", [size / 1_073_741_824]) |> List.to_string
  def human_readable_size(size) when is_integer(size) and size > 1_048_576,  do: :io_lib.format("~.1.0fM", [size / 1_048_576]) |> List.to_string
  def human_readable_size(size) when is_integer(size) and size > 1_024,  do: :io_lib.format("~.1.0fK", [size / 1_024]) |> List.to_string
  def human_readable_size(size) when is_integer(size), do: "#{size}B"

  @pbkdf2_cfg Application.get_env(:acs, :pbkdf2)
  @pbkdf2_mac_func         @pbkdf2_cfg[:mac_func]
  @pbkdf2_salt             @pbkdf2_cfg[:salt]
  @pbkdf2_iterations       @pbkdf2_cfg[:iterations]
  @pbkdf2_derived_length   @pbkdf2_cfg[:derived_length]

  # deprecated, using hash_password instead for password encryption
  def encrypt_password(password) do
    {:ok, e} = :pbkdf2.pbkdf2(@pbkdf2_mac_func, password, @pbkdf2_salt, @pbkdf2_iterations, @pbkdf2_derived_length)
    e |> to_hex
  end

	def hash_password(password) do 
		Pbkdf2.hashpwsalt(password)
	end

	def check_password(password, hash) do 
		case hash do 
      nil ->
        false
			"$pbkdf2-sha512$" <> _ ->
				Pbkdf2.checkpw(password, hash)
			_ ->
				(Utils.encrypt_password(password) |> String.downcase) == (hash |> String.downcase)
		end
	end

  def nonce do 
    << x :: size(32) >> =  :crypto.strong_rand_bytes(4)
    x    
  end

  def generate_token(length \\ 32) do
    :crypto.strong_rand_bytes(length) |> to_hex
  end

  def nickname_from_email(nil) do 
    nil
  end
  def nickname_from_email(email) do 
    [[_, name, _]] = Regex.scan(~r/(\w+)@(.*)/, email)
    name
  end

  def to_hex(data) when is_binary(data) do 
    bin_to_hex(data, <<>>)
  end

  defp bin_to_hex(<<>>, acc), do: acc
  defp bin_to_hex(<< x :: size(8), rest :: binary>> = bin, acc) do 
    if (byte_size(bin) &&& 7) == 0 do 
      bin_to_hex_(bin, acc) 
    else
      bin_to_hex(rest, << acc :: binary,  hex_(x) :: size(16) >>)
    end
  end

  defp bin_to_hex_(<<>>, acc), do: acc
  defp bin_to_hex_(<< a :: size(8), b :: size(8), c :: size(8), d :: size(8), e :: size(8), f :: size(8), g :: size(8), h :: size(8), rest :: binary>>, acc) do 
    bin_to_hex_(rest, << acc :: binary, 
                         hex_(a) :: size(16), 
                         hex_(b) :: size(16),  
                         hex_(c) :: size(16), 
                         hex_(d) :: size(16), 
                         hex_(e) :: size(16), 
                         hex_(f) :: size(16),
                         hex_(g) :: size(16),
                         hex_(h) :: size(16) >>)
  end

  hex_table = [0x3030, 0x3031, 0x3032, 0x3033, 0x3034, 0x3035, 0x3036, 0x3037, 0x3038, 0x3039, 0x3041, 0x3042, 0x3043, 0x3044, 0x3045, 0x3046, 
               0x3130, 0x3131, 0x3132, 0x3133, 0x3134, 0x3135, 0x3136, 0x3137, 0x3138, 0x3139, 0x3141, 0x3142, 0x3143, 0x3144, 0x3145, 0x3146, 
               0x3230, 0x3231, 0x3232, 0x3233, 0x3234, 0x3235, 0x3236, 0x3237, 0x3238, 0x3239, 0x3241, 0x3242, 0x3243, 0x3244, 0x3245, 0x3246, 
               0x3330, 0x3331, 0x3332, 0x3333, 0x3334, 0x3335, 0x3336, 0x3337, 0x3338, 0x3339, 0x3341, 0x3342, 0x3343, 0x3344, 0x3345, 0x3346, 
               0x3430, 0x3431, 0x3432, 0x3433, 0x3434, 0x3435, 0x3436, 0x3437, 0x3438, 0x3439, 0x3441, 0x3442, 0x3443, 0x3444, 0x3445, 0x3446, 
               0x3530, 0x3531, 0x3532, 0x3533, 0x3534, 0x3535, 0x3536, 0x3537, 0x3538, 0x3539, 0x3541, 0x3542, 0x3543, 0x3544, 0x3545, 0x3546, 
               0x3630, 0x3631, 0x3632, 0x3633, 0x3634, 0x3635, 0x3636, 0x3637, 0x3638, 0x3639, 0x3641, 0x3642, 0x3643, 0x3644, 0x3645, 0x3646,
               0x3730, 0x3731, 0x3732, 0x3733, 0x3734, 0x3735, 0x3736, 0x3737, 0x3738, 0x3739, 0x3741, 0x3742, 0x3743, 0x3744, 0x3745, 0x3746,
               0x3830, 0x3831, 0x3832, 0x3833, 0x3834, 0x3835, 0x3836, 0x3837, 0x3838, 0x3839, 0x3841, 0x3842, 0x3843, 0x3844, 0x3845, 0x3846, 
               0x3930, 0x3931, 0x3932, 0x3933, 0x3934, 0x3935, 0x3936, 0x3937, 0x3938, 0x3939, 0x3941, 0x3942, 0x3943, 0x3944, 0x3945, 0x3946, 
               0x4130, 0x4131, 0x4132, 0x4133, 0x4134, 0x4135, 0x4136, 0x4137, 0x4138, 0x4139, 0x4141, 0x4142, 0x4143, 0x4144, 0x4145, 0x4146, 
               0x4230, 0x4231, 0x4232, 0x4233, 0x4234, 0x4235, 0x4236, 0x4237, 0x4238, 0x4239, 0x4241, 0x4242, 0x4243, 0x4244, 0x4245, 0x4246, 
               0x4330, 0x4331, 0x4332, 0x4333, 0x4334, 0x4335, 0x4336, 0x4337, 0x4338, 0x4339, 0x4341, 0x4342, 0x4343, 0x4344, 0x4345, 0x4346, 
               0x4430, 0x4431, 0x4432, 0x4433, 0x4434, 0x4435, 0x4436, 0x4437, 0x4438, 0x4439, 0x4441, 0x4442, 0x4443, 0x4444, 0x4445, 0x4446,
               0x4530, 0x4531, 0x4532, 0x4533, 0x4534, 0x4535, 0x4536, 0x4537, 0x4538, 0x4539, 0x4541, 0x4542, 0x4543, 0x4544, 0x4545, 0x4546, 
               0x4630, 0x4631, 0x4632, 0x4633, 0x4634, 0x4635, 0x4636, 0x4637, 0x4638, 0x4639, 0x4641, 0x4642, 0x4643, 0x4644, 0x4645, 0x4646]

  for {h, i} <- Enum.with_index(hex_table) do 
    # @inline true
    defp hex_(unquote(i)), do: unquote(h)
  end

  def cp_file_to_md5_name(src, dest, ext) do 
    if File.exists?(src) do 
      case File.mkdir_p!(dest) do 
        :ok ->
          {md5sum_result, 0} = System.cmd("md5sum", [src])
          [file_md5 | _] = String.split(md5sum_result)
          file_name = "#{file_md5}.#{ext}"
          case File.cp(src, Path.join(dest, file_name)) do 
            :ok -> {:ok, file_name}
            {:error, reason} -> {:error, reason} 
          end
        {:error, reason} -> {:error, reason} 
      end
    else 
      {:error, "file #{src} not exists"}
    end
  end

  def deploy_image_file_return_size(opts) do 
    from = opts[:from]
    to = opts[:to]

    {ext, width, height} = case Mogrify.open(from) |> Mogrify.verbose do 
      %Mogrify.Image{format: "png", width: width, height: height} -> {"png", width, height}
      %Mogrify.Image{format: "jpeg", width: width, height: height} -> {"jpg", width, height}
      %Mogrify.Image{format: "jpg", width: width, height: height} -> {"jpg", width, height}
      %Mogrify.Image{format: "gif", width: width, height: height} -> {"gif", width, height}
    end

    # looks like tinify does not reduce much size 
    Tinypng.tinify(from)

    relative_path = Path.join("/images", "/#{to}")
    url_path = Path.join("/img", "/#{to}")
    static_path = Application.app_dir(:acs, "priv/static/") 
    {:ok, dest_file_name} = cp_file_to_md5_name(from, Path.join(static_path, relative_path), ext)
    dest_file_full_name = Path.join(Path.join(static_path, relative_path), dest_file_name)
    {_, 0} = System.cmd("convert", [dest_file_full_name, "-quality", "80", "-define", "webp:lossless=false", dest_file_full_name <> ".webp"])

    if opts[:low_quality] do 
      low_quality_file_name = Path.rootname(dest_file_full_name) <> ".lq.jpg" 
      File.cp!(dest_file_full_name, low_quality_file_name)
      {_, 0} = System.cmd("mogrify", ["-background", "white", "-alpha", "remove", "-quality", "5", "-format", "jpg", low_quality_file_name])
      {_, 0} = System.cmd("convert", [dest_file_full_name, "-quality", "1", "-define", "webp:lossless=false", low_quality_file_name <> ".webp"])
    end

    path = Path.join(url_path, "/#{dest_file_name}")    
    {:ok, path, width, height}
  end

  def deploy_image_file(from: from, to: to) do 
    {:ok, path, _width, _height} = deploy_image_file_return_size(from: from, to: to)
    {:ok, path}
  end

end


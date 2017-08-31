defmodule Utils.Crypto do 
  use LogAlias

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
end


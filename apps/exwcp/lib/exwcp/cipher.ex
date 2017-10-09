defmodule Exwcp.Cipher do
  @moduledoc """
  Decrypt wechat msg.
  """

  def decrypt(msg_encrypt, aes_key) do
    plain_text =
      msg_encrypt
      |> Base.decode64!
      |> decrypt_aes(aes_key)
      |> decode_padding

    # http://mp.weixin.qq.com/wiki/2/3478f69c0d0bbe8deb48d66a3111ff6e.html
    # random(16B) + msg_len(4B) + msg + appid
    <<_ :: binary-size(16),
      msg_len :: integer-size(32),
      msg :: binary-size(msg_len),
      appid :: binary>> = plain_text

    {appid, msg}
  end

  def encrypt(text, appid, aes_key) do 
    iv = binary_part(aes_key, 0, 16)
    len = String.length(text)

    encode_binary =
      <<iv :: binary-size(16),
        len :: integer-size(32),
        text :: binary-size(len),
        appid :: binary>>

    :crypto.block_encrypt(:aes_cbc, aes_key, iv, encrypt_padding(encode_binary)) |> Base.encode64
  end

  defp decrypt_aes(aes_encrypt, aes_key) do
    iv = binary_part(aes_key, 0, 16)
    :crypto.block_decrypt(:aes_cbc, aes_key, iv, aes_encrypt)
  end

  defp decode_padding(padded_text) do
    to_remove = :binary.last(padded_text)
    :binary.part(padded_text, 0, byte_size(padded_text) - to_remove)
  end

  def encrypt_padding(text) do
    to_add = 32 - rem(byte_size(text), 32)
    text <> to_string(:string.chars(to_add, to_add))
  end
end

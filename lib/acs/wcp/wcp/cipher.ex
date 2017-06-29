defmodule Wcp.Cipher do
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

  defp decrypt_aes(aes_encrypt, aes_key) do
    iv = binary_part(aes_key, 0, 16)
    :crypto.block_decrypt(:aes_cbc128, aes_key, iv, aes_encrypt)
  end

  defp decode_padding(padded_text) do
    len = byte_size(padded_text)
    <<pad :: utf8>> = binary_part(padded_text, len, -1)
    case pad < 1 or pad > 32 do
      true -> binary_part(padded_text, 0, len)
      false -> binary_part(padded_text, 0, len-pad)
    end
  end
end

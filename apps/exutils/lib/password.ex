defmodule Utils.Password do 
	require Pbkdf2

	def hash(password) do 
		Pbkdf2.hash_pwd_salt(password)
	end

	def check(password, hash) do 
		case hash do 
      nil ->
        false
			"$pbkdf2-sha512$" <> _ ->
				Pbkdf2.verify_pass(password, hash)
			_ ->
				(encrypt(password) |> String.downcase) == (hash |> String.downcase)
		end
  end

  defp encrypt(password) do
    {:ok, e} = :pbkdf2.pbkdf2(:sha, password, "gGshJCGHNVVltq9n+Bji6w==", 4096, 20)
    e |> Utils.to_hex
  end
end
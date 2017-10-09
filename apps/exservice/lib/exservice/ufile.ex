defmodule Exservice.UFile do 
  use     HTTPotion.Base
  use     Utils.LogAlias
  alias   Utils.Crypto

  @ufile_cfg   Application.get_env(:exservice, UFile, [public_key: "", 
                                                       private_key: "", 
                                                       bucket: "", 
                                                       cdn_domain: "",
                                                       cdn_scheme: "http"])
  @cdn_scheme  @ufile_cfg[:cdn_scheme]
  @cdn_domain  @ufile_cfg[:cdn_domain]

  def put_png_image(content, file_key) do 
    put_file_content(content, file_key)
  end

  def put_jpg_image(content, file_key) do 
    put_file_content(content, file_key)
  end

  def put_file_content(content, file_key) do 
    try do 
      content_md5 = Crypto.md5_sign(content)
      ext_name = Path.extname(file_key)
      temp_file_name = Path.join(System.tmp_dir!(), "#{content_md5}#{ext_name}")
      {:ok, file} = File.open temp_file_name, [:write]
      :ok = IO.binwrite file, content
      :ok = File.close(file)
      {_, 0} = System.cmd("filemgr", ["--action", "put", "--file", temp_file_name, "--key", file_key])
      :ok = File.rm(temp_file_name)
      {:ok, "#{@cdn_scheme}://#{@cdn_domain}/#{file_key}"}
    rescue 
      e ->
        error "exception encountered: #{inspect e, pretty: true}"
        {:error, nil}
    end
  end

  def put_file(filename, file_key) do 
    try do 
      {_, 0} = System.cmd("filemgr", ["--action", "put", "--file", filename, "--key", file_key])
      {:ok, "#{@cdn_scheme}://#{@cdn_domain}/#{file_key}"}
    rescue 
      e ->
        error "exception encountered: #{inspect e, pretty: true}"
        {:error, e}
    end
  end

  def mput_file(filename, file_key) do 
    try do 
      {_, 0} = System.cmd("filemgr", ["--action", "mput", "--file", filename, "--key", file_key])
      {:ok, "#{@cdn_scheme}://#{@cdn_domain}/#{file_key}"}
    rescue 
      e ->
        error "exception encountered: #{inspect e, pretty: true}"
        {:error, nil}
    end
  end

  def delete_file(file_key) do 
    try do 
      {_, 0} = System.cmd("filemgr", ["--action",  "delete", "--key", file_key])
      :ok
    rescue 
      e ->
        error "exception encountered: #{inspect e, pretty: true}"
        :error
    end
  end

end
defmodule DeployUploadedFile do 

  alias Exservice.KSFile

  def cp_file_to_md5_name(src, path, ext) do 
    if File.exists?(src) do 
      {md5sum_result, 0} = System.cmd("md5sum", [src])
      [file_md5 | _] = String.split(md5sum_result)
      file_name = "#{file_md5}.#{ext}"
      key = Path.join(["acs", path, file_name])

      KSFile.put_file(src, key)
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

    relative_path = Path.join("/images", "/#{to}")
    {:ok, url} = cp_file_to_md5_name(from, relative_path, ext)
    {:ok, url, width, height}
  end

  def deploy_image_file(from: from, to: to) do 
    {:ok, path, _width, _height} = deploy_image_file_return_size(from: from, to: to)
    {:ok, path}
  end

  #deploy_wcp_file
  def deploy_wcp_file(from: from, filename: filename) do
    if File.exists?(from) do
      static_path = Application.app_dir(:acs_web, "priv/static/")
      case File.cp(from, Path.join(static_path, filename)) do 
        :ok -> {:ok, filename}
        {:error, reason} -> {:error, reason} 
      end
    else
      {:error, "file #{from} not exists"}
    end
  end

end
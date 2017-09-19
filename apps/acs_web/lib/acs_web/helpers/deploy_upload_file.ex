defmodule DeployUploadedFile do 

  def cp_file_to_md5_name(src, dest, ext) do 
    if File.exists?(src) do 
      case File.mkdir_p!(dest) do 
        :ok ->
          {md5sum_result, 0} = System.cmd("md5sum", [src])
          [file_md5 | _] = String.split(md5sum_result)
          file_name = "#{file_md5}.#{ext}"
          case File.cp(src, Path.join(dest, file_name)) do 
            :ok -> 
              AcsWeb.LazyTinypng.add_to_list(Path.join(dest, file_name))
              {:ok, file_name}
            {:error, reason} -> 
              {:error, reason} 
          end
        {:error, reason} -> 
          {:error, reason} 
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

  #deploy_wcp_file
  def deploy_wcp_file(from: from, filename: filename) do
    if File.exists?(from) do
      static_path = Application.app_dir(:acs, "priv/static/")
      case File.cp(from, Path.join(static_path, filename)) do 
        :ok -> {:ok, filename}
        {:error, reason} -> {:error, reason} 
      end
    else
      {:error, "file #{from} not exists"}
    end
  end

end
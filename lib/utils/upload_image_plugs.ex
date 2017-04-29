defmodule Acs.UploadImagePlugs do
  import Plug.Conn
  use    LogAlias
  require Mogrify
  require Utils

  def convert_base64_image(conn, opt) do 
    case opt[:param_name] do 
      param_name when is_bitstring(param_name) ->
        case conn.params[param_name] do 
          %{"base64_content" => base64_content} = file_param ->
            with image_data <- Base.decode64!(base64_content),
                 file_name <- Path.join("/tmp", Utils.md5_sign(base64_content)),
                 {:ok, file} <- File.open(file_name, [:write]),
                 :ok <- IO.binwrite(file, image_data),
                 :ok <- File.close(file)
            do
              rm_tmp_file = fn(conn) ->
                File.rm!(file_name)
                conn
              end

              %{conn | before_send: [rm_tmp_file | conn.before_send], 
                       private: Map.put(conn.private, :image_file_path, file_name),
                       params: Map.put(conn.params, param_name, %{path: file_name})} 
            else 
              _ -> conn
            end
          _ -> 
            conn
        end
      _ -> 
        conn
    end
  end

  def check_upload_image(conn, opt) do 
    case opt[:param_name] do 
      param_name when is_bitstring(param_name) ->
        case conn.params[param_name] do 
          %{path: path} ->
            case Mogrify.open(path) |> Mogrify.verbose do 
              image_file = %Mogrify.Image{} -> 
                with :ok <- check_image_format(image_file, opt[:format]),
                     :ok <- check_image_square(image_file, opt[:square]),
                     :ok <- check_image_ratio(image_file, opt[:ratio]),
                     :ok <- check_image_min_width(image_file, opt[:min_width]),
                     :ok <- check_image_max_width(image_file, opt[:max_width]),
                     :ok <- check_image_min_height(image_file, opt[:min_height]),
                     :ok <- check_image_max_height(image_file, opt[:max_height]),
                     {:ok, image_file} <- resize_to_limit_image(image_file, opt[:resize_to_limit]),
                     {:ok, image_file} <- resize_image(image_file, opt[:resize]),
                     {:ok, image_file} <- reformat_image(image_file, opt[:reformat])
                do 
                  conn |> put_private(:image_format, image_file.format)
                else
                  {:error, result} ->
                    conn |> Phoenix.Controller.json(result) |> halt
                end
              _ ->
                error "[plug] check upload image: file #{path} is not a valid image file"
                conn
            end
          _ -> 
            conn
        end
      _ -> 
        conn
    end
  end

  defp check_image_format(image_file, formats) when is_list(formats) do
    if image_file.format in formats do 
      :ok
    else 
      {:error, %{success: false,
                 i18n_message: "error.server.invalidImageForamt", 
                 i18n_message_object: Enum.join(formats, ",")}}
    end
  end
  defp check_image_format(image_file, format) when is_bitstring(format) do 
    if image_file.format == format do 
      :ok
    else 
      {:error, %{success: false, 
                 i18n_message: "error.server.invalidImageFormat", 
                 i18n_message_object: format}}
    end
  end
  defp check_image_format(image_file, _), do: :ok

  defp check_image_square(image_file, true) do
    if image_file.width == image_file.height do 
      :ok
    else 
      {:error, %{success: false, 
                 i18n_message: "error.server.imageShouldBeSquare", 
                 i18n_message_object: %{width: image_file.width, 
                                        height: image_file.height}}}
    end
  end
  defp check_image_square(image_file, _), do: :ok
  
  defp check_image_ratio(image_file, ratio) when is_integer(ratio) or is_float(ratio) do
    image_ratio = image_file.height / image_file.width
    if abs(image_ratio - abs(ratio)) < 0.01 do 
      :ok
    else 
      {:error, %{success: false, 
                 i18n_message: "error.server.invalidImageRatio", 
                 i18n_message_object: %{width: image_file.width, 
                                        height: image_file.height,
                                        ratio: ratio}}}
    end
  end
  defp check_image_ratio(image_file, _), do: :ok 

  defp check_image_min_width(image_file, min_width) when is_integer(min_width) do
    if image_file.width >= min_width do 
      :ok
    else 
      {:error, %{success: false, 
                 i18n_message: "error.server.imageMinWidth", 
                 i18n_message_object: %{width: image_file.width,
                                        min_width: min_width}}}
    end
  end
  defp check_image_min_width(image_file, _), do: :ok

  defp check_image_max_width(image_file, max_width) when is_integer(max_width) do
    if image_file.width <= max_width do 
      :ok
    else 
      {:error, %{success: false, 
                 i18n_message: "error.server.imageMaxWidth", 
                 i18n_message_object: %{width: image_file.width,
                                        min_width: max_width}}}
    end
  end
  defp check_image_max_width(image_file, _), do: :ok

  defp check_image_min_height(image_file, min_height) when is_integer(min_height) do
    if image_file.height >= min_height do 
      :ok
    else 
      {:error, %{success: false, 
                 i18n_message: "error.server.imageMinHeight", 
                 i18n_message_object: %{height: image_file.height,
                                        min_height: min_height}}}
    end
  end
  defp check_image_min_height(image_file, _), do: :ok

  defp check_image_max_height(image_file, max_height) when is_integer(max_height) do
    if image_file.height <= max_height do 
      :ok
    else 
      {:error, %{success: false, 
                 i18n_message: "error.server.imageMaxHeight", 
                 i18n_message_object: %{height: image_file.height,
                                        min_height: max_height}}}
    end
  end
  defp check_image_max_height(image_file, _), do: :ok

  defp resize_image(%{path: path} = image_file, [width: width, height: height]) when is_integer(width) and is_integer(height) do
    case image_file |> Mogrify.resize("#{width}x#{height}") |> Mogrify.save(in_place: true) do 
      %{path: ^path} = new_image_file -> 
        {:ok, new_image_file}
      _ ->
        {:error, %{success: false, 
                   i18n_message: "error.server.resizeImageFailed"}}
    end
  end
  defp resize_image(image_file, _), do: {:ok, image_file}

  defp resize_to_limit_image(%{path: path} = image_file, [width: width, height: height]) when is_integer(width) and is_integer(height) do
    resize_command = if image_file.width > image_file.height and width > height do 
                       "#{width}x#{height}"
                      else
                        if image_file.width < image_file.height and width < height do 
                          "#{width}x#{height}"
                        else
                          "#{height}x#{width}"
                        end
                      end
    
    case image_file |> Mogrify.resize_to_limit(resize_command) |> Mogrify.save(in_place: true) do 
      %{path: ^path} = new_image_file -> 
        {:ok, new_image_file}
      _ ->
        {:error, %{success: false, 
                   i18n_message: "error.server.resizeImageFailed"}}
    end
  end
  defp resize_to_limit_image(image_file, _), do: {:ok, image_file}

  defp reformat_image(%{path: path, format: format} = image_file, new_format) when new_format in ["jpg", "jpeg", "png"] do 
    if format == new_format do  
      {:ok, image_file}
    else 
      {_, 0} = System.cmd("mogrify", ["-format", new_format, path])
      new_file_name = Path.rootname(path, Path.extname(path)) <> ".#{new_format}"

      if File.exists?(new_file_name) do 
        {_, 0} = System.cmd("mv", ["-f", new_file_name, path])       
        {:ok, Mogrify.open(path) |> Mogrify.verbose}
      else
        {:error, %{success: false, 
                  i18n_message: "error.server.reformatImageFailed"}}
      end
    end
  end
  defp reformat_image(image_file, _), do: {:ok, image_file}


end
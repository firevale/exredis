defmodule Acs.UploadImagePlugs do
  import Plug.Conn
  use    LogAlias
  require Mogrify

  def check_upload_image(conn, opt) do 
    case opt[:param_name] do 
      param_name when is_bitstring(param_name) ->
        case conn.params[param_name] do 
          %{path: path} ->
            case Mogrify.open(path) |> Mogrify.verbose do 
              image_file = %Mogrify.Image{} -> 
                with :ok <- check_image_format(image_file, opt[:format]),
                     :ok <- check_image_square(image_file, opt[:square]),
                     :ok <- check_image_min_width(image_file, opt[:min_width]),
                     :ok <- check_image_max_width(image_file, opt[:max_width]),
                     :ok <- check_image_min_height(image_file, opt[:min_height]),
                     :ok <- check_image_max_height(image_file, opt[:max_height]),
                     :ok <- resize_to_limit_image(image_file, opt[:resize_to_limit]),
                     :ok <- resize_image(image_file, opt[:resize]),
                     {:ok, format} <- reformat_image(image_file, opt[:reformat])
                do 
                  conn |> put_private(:image_format, format)
                else
                  {:error, result} ->
                    conn |> Phoenix.Controller.json(result) |> halt
                end
              _ ->
                error "[plug] check upload image: file #{path} is not a valid image file"
                conn
            end
          _ -> 
            error "[plug] check upload image: param #{param_name} don't has path value in it, dont know how to check uploaded image"
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
      %{path: ^path} -> :ok
      _ ->
        {:error, %{success: false, 
                   i18n_message: "error.server.resizeImageFailed"}}
    end
  end
  defp resize_image(image_file, _), do: :ok

  defp resize_to_limit_image(%{path: path} = image_file, [width: width, height: height]) when is_integer(width) and is_integer(height) do
    case image_file |> Mogrify.resize_to_limit("#{width}x#{height}") |> Mogrify.save(in_place: true) do 
      %{path: ^path} -> :ok
      _ ->
        {:error, %{success: false, 
                   i18n_message: "error.server.resizeImageFailed"}}
    end
  end
  defp resize_to_limit_image(image_file, _), do: :ok

  defp reformat_image(%{path: path, format: format} = image_file, new_format) when new_format in ["jpg", "jpeg", "png"] do 
    if format == new_format do  
      {:ok, format}
    else 
      case image_file |> Mogrify.format(new_format) |> Mogrify.save(in_place: true) do 
        %{path: ^path, format: ^new_format} -> 
          {:ok, new_format}
        _ -> 
          {:error, %{success: false, 
                    i18n_message: "error.server.reformatImageFailed"}}
      end
    end
  end
  defp reformat_image(image_file, _), do: {:ok, image_file.format}


end
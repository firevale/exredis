defmodule AcsWeb.ImageController do
  use     AcsWeb, :controller

  def get_image(conn, _params) do 
    [_ | path_info] = conn.path_info
    url = static_url(conn, Path.join("/images", Enum.join(path_info, "/")))
    conn |> redirect(external: url)
  end
end
defmodule Exmail.EmailView do 
  use Phoenix.View, root: "lib/templates", namespace: Exmail
  import Exmail.Gettext
  use Phoenix.HTML
end

defmodule Exmail.LayoutView do 
  use Phoenix.View, root: "lib/templates", namespace: Exmail
  import Exmail.Gettext
  use Phoenix.HTML
end
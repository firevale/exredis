defmodule Acs.Search.ESSdkUser do 
  require Elasticsearch
  alias Acs.Accounts.User
  alias Acs.Accounts.UserSdkBinding

  def index(%UserSdkBinding{} = sdk_user) do
    Elasticsearch.index(%{
      index: "acs",
      type: "sdk_users",
      params: %{parent: sdk_user.user_id},
      doc: sdk_user,
      id: sdk_user.id
    })
  end

end
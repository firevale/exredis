defmodule Acs.User do
  use   Acs.Web, :model
  # alias Acs.Repo
  alias Acs.UserSdkBinding
  alias Acs.UserFavoritePost
  alias Acs.ForumComment
  alias Acs.ForumPost

  # @email_check_regex ~r/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/iu

  @primary_key false
  schema "users" do
    field :id, :integer, primary_key: true
    field :email, :string
    field :mobile, :string
    field :encrypted_password, :string
    field :device_id, :string
    field :nickname, :string
    field :resident_id, :string
    field :resident_name, :string
    field :gender, :string
    field :age, :integer
    field :avatar_url, :string

    has_many :sdk_bindings, UserSdkBinding, references: :id
    has_many :favorite_posts, UserFavoritePost, references: :id
    has_many :posts, ForumPost, references: :id
    has_many :comments, ForumComment, references: :id

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:id, :email, :mobile, :encrypted_password, :device_id, :nickname, :resident_id, :resident_name,
                     :gender, :age, :avatar_url])
    |> validate_required([:id])
    |> validate_format(:email, ~r/^[^@]+@[^@]+$/)
    |> validate_format(:mobile, ~r/^1\d+$/)
    |> unique_constraint(:mobile)
    |> unique_constraint(:email)
    |> unique_constraint(:device_id)
  end

  def init_mapping() do
    unless Elasticsearch.is_type?("acs", "user") do
      # mapping = %{
      #   properties: %{
      #     id: %{type: :integer},
      #     email: %{type: :keyword},
      #     mobile: %{type: :keyword},
      #     nickname: %{type: :text, analyzer: :ik_smart},
      #     device_id: %{type: :keyword},
      #     inserted_at: %{type: :date},
      #     app_users: %{
      #       type: :nested,
      #       _parent:{ type:  },
      #       properties: %{
      #         app_id: %{type: :keyword},
      #         zone_id: %{type: :keyword},
      #         game_user_id: %{type: :keyword},
      #         game_user_name: %{type: :text, analyzer: :ik_smart},
      #         game_user_level: %{type: :integer},
      #         pay_amount:  %{type: :integer},
      #       }
      #     }, 
      #   }
      # }

      # Elasticsearch.put_mapping(%{index: "acs", type: "user", mapping: mapping, params: nil})
     end
   end

   def index(user) when is_map(user) do
    Elasticsearch.index(%{
      index: "acs",
      type: "user",
      doc: user,
      params: nil,
      id: user.id
    })
  end

  def search(query) do
    case Elasticsearch.search(%{index: "acs", type: "user", query: query, params: %{timeout: "1m"}}) do
      {:ok, %{hits: %{hits: hits, total: total}}} ->
        ids = Enum.map(hits, &(&1._id))
        {:ok, total, ids }
      error ->
        # error "search failed: #{inspect error, pretty: true}"
        throw(error)
    end
  end

end

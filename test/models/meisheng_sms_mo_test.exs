defmodule Acs.Web.MeishengSmsMoTest do
  use Acs.ModelCase

  alias Acs.MeishengSmsMo

  @valid_attrs %{content: "some content",  
                 mobile: "some content", 
                 recv_code: "some content", 
                 recv_time:  ~N[2016-11-28 18:23:45]}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = MeishengSmsMo.changeset(%MeishengSmsMo{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = MeishengSmsMo.changeset(%MeishengSmsMo{}, @invalid_attrs)
    refute changeset.valid?
  end
end

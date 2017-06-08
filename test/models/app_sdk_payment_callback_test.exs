defmodule Acs.Web.AppSdkPaymentCallbackTest do
  use Acs.Web.ModelCase

  alias Acs.AppSdkPaymentCallback

  @valid_attrs %{payment_callback: "some content", platform: "some content", sdk: "cc", app_id: "test-app"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = AppSdkPaymentCallback.changeset(%AppSdkPaymentCallback{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = AppSdkPaymentCallback.changeset(%AppSdkPaymentCallback{}, @invalid_attrs)
    refute changeset.valid?
  end
end

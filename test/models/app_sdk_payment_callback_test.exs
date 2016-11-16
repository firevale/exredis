defmodule Acs.AppSdkPaymentCallbackTest do
  use Acs.ModelCase

  alias Acs.AppSdkPaymentCallback

  @valid_attrs %{payment_callback: "some content", platform: "some content", sdk: "ccplay"}
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

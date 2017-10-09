defmodule Exservice.NeteaseDun do
  require Utils
  alias   Utils.Httpc
  alias   Utils.JSON
  alias   Utils.Crypto
  use     Utils.LogAlias

  @dun_config         Application.get_env(:exservice, NeteaseDun)
  @check_txt_url      @dun_config[:check_txt_url]
  @check_img_url      @dun_config[:check_img_url]
  @secretId           @dun_config[:secretId]
  @secretKey          @dun_config[:secretKey]
  @txt_businessId     @dun_config[:txt_businessId]
  @img_businessId     @dun_config[:img_businessId]
  @user_businessId    @dun_config[:user_businessId]
  @version            "v3"

  def check_userid(userid) do
    _check_txt(userid, @user_businessId)
  end

  def check_txt(content) do 
    _check_txt(content, @txt_businessId)
  end

  defp _check_txt(content, businessId) do 
    try do
      timestamp = Utils.unix_timestamp
      nonce = Utils.nonce
      dataId = Utils.generate_token

      response = Httpc.post_form(@check_txt_url, %{
        "secretId" => @secretId,
        "businessId" => businessId,
        "version" => @version,
        "timestamp" => timestamp,
        "nonce" => nonce,
        "dataId" => dataId,
        "content" => content,
        "signature" => Crypto.md5_sign("businessId#{businessId}content#{content}dataId#{dataId}nonce#{nonce}secretId#{@secretId}timestamp#{timestamp}version#{@version}#{@secretKey}")
      })

      if Httpc.success?(response) do 
        case JSON.decode(response.body) do 
          {:ok, %{"code" => 200, "result" => result}} ->
            case result["action"] do
              2 ->
                [labels] = result["labels"]
                {:error, "error.sdks.netease.label#{labels["label"]}", ""}
              
              _ ->
                {:ok, "error.sdks.netease.checkPass"}
            end

          {:ok, %{"code" => code, "msg" => msg}} ->
            error "netease dun check txt failed, code = #{code}, msg = #{msg}"
            {:error, "", "netease dun check txt failed, code = #{code}, msg = #{msg}"}

        _ -> 
            error "netease dun check txt error, not a json response"
            {:error, "", "netease dun check txt error, not a json response"}
        end 
      else
        error "netease dun check txt failed"
        {:error, "", "netease dun check txt failed"}
      end
    catch
      :error, e ->
        error "netease dun check txt exception: #{inspect e}"
        {:error, "", "netease dun check txt exception: #{inspect e}"}
    end 
  end

  def check_img(images) do 
    try do
      timestamp = Utils.unix_timestamp
      nonce = Utils.nonce
      response = Httpc.post_form(@check_img_url, %{
                          "secretId" => @secretId,
                          "businessId" => @img_businessId,
                          "version" => @version,
                          "timestamp" => timestamp,
                          "nonce" => nonce,
                          "images" => images,
                          "signature" => Crypto.md5_sign("businessId#{@img_businessId}images#{images}nonce#{nonce}secretId#{@secretId}timestamp#{timestamp}version#{@version}#{@secretKey}")
                          })
      info "netease dun check response: #{inspect response}"
      
      if Httpc.success?(response) do 
        case JSON.decode(response.body) do 
          {:ok, res} ->
            if res["code"] == 200 do 
              
              result = res["result"]
              maxResult = Enum.max(Enum.map(result, fn(x) -> Enum.max_by(x["labels"], fn(y) -> y["level"] end)  end))

              case maxResult["level"] do
                2 ->
                  {:error, "error.sdks.netease.label#{maxResult["label"]}", ""}

                1 ->
                  {:error, "error.sdks.netease.label#{maxResult["label"]}", ""}

                _ ->
                  {:ok, "error.sdks.netease.checkPass"}
                  
              end

            else 
              error "netease dun check img failed, code = #{res["code"]}, msg = #{res["msg"]}"
              {:error, "", "netease dun check img failed, code = #{res["code"]}, msg = #{res["msg"]}"}
            end
          _ -> 
            error "netease dun check img error, not a json response"
            {:error, "", "netease dun check img error, not a json response"}
        end 
      else
        error "netease dun check img failed"
        {:error, "", "netease dun check img failed"}
      end
    catch
      :error, e ->
        error "netease dun check img exception: #{inspect e}"
        {:error, "", "netease dun check img exception: #{inspect e}"}
    end 
  end


end
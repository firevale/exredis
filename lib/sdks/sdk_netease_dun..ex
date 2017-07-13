defmodule SDKNeteaseDun do

  require Logger
  alias   Utils.Httpc
  require Utils
  alias   Utils.JSON

  @dun_config         Application.get_env(:acs, :netease_dun)
  @check_txt_url      @dun_config[:check_txt_url]
  @check_img_url      @dun_config[:check_img_url]
  @secretId           @dun_config[:secretId]
  @secretKey          @dun_config[:secretKey]
  @txt_businessId     @dun_config[:txt_businessId]
  @img_businessId     @dun_config[:img_businessId]
  @version            "v3"

  def check_txt(content) do 
    
    try do
      timestamp = Utils.unix_timestamp
      nonce = Utils.nonce
      dataId = Utils.generate_token

      response = Httpc.post_msg(@check_txt_url, %{
                          "secretId" => @secretId,
                          "businessId" => @txt_businessId,
                          "version" => @version,
                          "timestamp" => timestamp,
                          "nonce" => nonce,
                          "dataId" => dataId,
                          "content" => content,
                          "signature" => Utils.md5_sign("businessId#{@txt_businessId}content#{content}dataId#{dataId}nonce#{nonce}secretId#{@secretId}timestamp#{timestamp}version#{@version}#{@secretKey}")
                          })

      if Httpc.success?(response) do 
       
        case JSON.decode(response.body) do 
          {:ok, res} ->
            
            if res["code"] == 200 do 
              result = res["result"]
              case result["action"] do
                2 ->
                  [labels] = result["labels"]
                  {:error, "error.sdks.netease.label#{labels["label"]}"}
                
                _ ->
                  {:ok, "error.sdks.netease.checkPass"}
                  
              end

            else 
              Logger.error "netease dun check txt failed, code = #{res["code"]}, msg = #{res["msg"]}"
              {:error, "netease dun check txt failed, code = #{res["code"]}, msg = #{res["msg"]}"}
            end
          _ -> 
            Logger.error "netease dun check txt error, not a json response"
            {:error, "netease dun check txt error, not a json response"}
        end 
      else
        Logger.error "netease dun check txt failed"
        {:error, "netease dun check txt failed"}
      end
    catch
      :error, e ->
        Logger.error "netease dun check txt exception: #{inspect e}"
        {:error, "netease dun check txt exception: #{inspect e}"}
    end 
  end

  def check_img(images) do 
    try do
      timestamp = Utils.unix_timestamp
      nonce = Utils.nonce
      dataId = Utils.generate_token

      response = Httpc.post_msg(@check_img_url, %{
                          "secretId" => @secretId,
                          "businessId" => @img_businessId,
                          "version" => @version,
                          "timestamp" => timestamp,
                          "nonce" => nonce,
                          "images" => images,
                          "signature" => Utils.md5_sign("businessId#{@img_businessId}images#{images}nonce#{nonce}secretId#{@secretId}timestamp#{timestamp}version#{@version}#{@secretKey}")
                          })

      if Httpc.success?(response) do 
       
        case JSON.decode(response.body) do 
          {:ok, res} -> 
            if res["code"] == 200 do 

              result = res["result"]
              maxResult = Enum.max(Enum.map(result, fn(x) -> Enum.max_by(x["labels"], fn(y) -> y["level"] end)  end))

              case maxResult["level"] do
                2 ->
                  {:error, "error.sdks.netease.label#{maxResult["label"]}"}
                
                _ ->
                  {:ok, "error.sdks.netease.checkPass"}
                  
              end

            else 
              Logger.error "netease dun check img failed, code = #{res["code"]}, msg = #{res["msg"]}"
              {:error, "netease dun check img failed, code = #{res["code"]}, msg = #{res["msg"]}"}
            end
          _ -> 
            Logger.error "netease dun check img error, not a json response"
            {:error, "netease dun check img error, not a json response"}
        end 
      else
        Logger.error "netease dun check img failed"
        {:error, "netease dun check img failed"}
      end
    catch
      :error, e ->
        Logger.error "netease dun check img exception: #{inspect e}"
        {:error, "netease dun check img exception: #{inspect e}"}
    end 
  end


end
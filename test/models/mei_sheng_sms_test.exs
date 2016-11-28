defmodule Acs.MeiShengSMSTest do
  use Acs.ModelCase

  alias   Acs.MeishengSms
  require Utils
  import  SweetXml

  @valid_attrs %{content: "some content", 
                 mobile: "some content", 
                 msg_id: "some content", 
                 status: 2, 
                 template_id: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = MeishengSms.changeset(%MeishengSms{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = MeishengSms.changeset(%MeishengSms{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "send sms and update status ok" do 
    msg_ids = 1..20 |> Enum.map(fn(_) -> Utils.generate_token end)

    msg_ids |> Enum.each(fn(msg_id) ->
      MeishengSms.changeset(%MeishengSms{}, %{
        msg_id: msg_id,
        mobile: "18101329172",
        template_id: "JSM41501-0001",
        content: "@1@=123456",
        status: MeishengSms.Status.sent
      }) |> Repo.insert!      
    end)

    xml_header = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" 
    xml_body = msg_ids |> Enum.map(fn(msg_id) -> 
      "<rpt>
        <mobile>18101329172</mobile>
        <msgid>#{msg_id}</msgid>
        <status>DELIVRD</status>
        <time>2015-07-09 00:21:45</time>
        <extno></extno>
       </rpt>"  
    end) |> Enum.join("\n")

    xml = "#{xml_header}<sms>#{xml_body}</sms>"

    xml_result = xml |> xpath(
                      ~x"/sms/rpt"l,
                      mobile: ~x"./mobile/text()"s,
                      msg_id: ~x"./msgid/text()"s,
                      status_code: ~x"./status/text()"s,
                      report_time: ~x"./time/text()"s, 
                    )

    xml_result |> Enum.each(fn(report) -> 
      report = case report.status_code do 
                  "DELIVRD" ->
                    Map.put(report, :status, MeishengSms.Status.delivered)
                  _ ->
                    Map.put(report, :status, MeishengSms.Status.failed)
                end
      
      sms = Repo.get_by(MeishengSms, msg_id: report.msg_id, mobile: report.mobile) 
      assert sms.status == MeishengSms.Status.sent
      MeishengSms.changeset(sms, report) |> Repo.update!
    end)

    msg_ids |> Enum.each(fn(msg_id) -> 
      sms = Repo.get_by(MeishengSms, msg_id: msg_id) 
      assert sms.status == MeishengSms.Status.delivered
    end)
  end
end

alias Ecto.Adapters.SQL

Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "point_bind_mobile", value: "10", group: "point", memo: "绑定手机获得积分", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "point_subscribe", value: "10", group: "point", memo: "官网预约获得积分", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "point_follow_wechat", value: "30", group: "point", memo: "关注微信获得积分", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "point_day_question", value: "5", group: "point", memo: "每日问题获得积分", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "point_luck_draw", value: "-10", group: "point", memo: "抽奖每次消耗积分", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "point_day_sign", value: "2", group: "point", memo: "每日签到获得积分", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "point_exchange_goods", value: "0", group: "point", memo: "购物兑换积分", active: true}) |> Acs.Repo.insert

Acs.PMalls.TaskBar.changeset(%Acs.PMalls.TaskBar{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "手机绑定", pic: "/images/task_pics/1/c35f3e49d3141f900e89e7dc2b7f2cda.jpg", sub_name: "限一次", point: 10, path: "bind_mobile", active: true, sort: 1}) |> Acs.Repo.insert
Acs.PMalls.TaskBar.changeset(%Acs.PMalls.TaskBar{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "官网预约", pic: "/images/task_pics/2/655beab6711b7b832a879b9978a28c50.jpg", sub_name: "限一次", point: 5, path: "/gwyy", active: true, sort: 2}) |> Acs.Repo.insert
Acs.PMalls.TaskBar.changeset(%Acs.PMalls.TaskBar{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "每日签到", pic: "/images/task_pics/3/c977755fc959c4de0a9debc8df435075.jpg", sub_name: "/日", point: 2, path: "sign", active: true, sort: 3}) |> Acs.Repo.insert
Acs.PMalls.TaskBar.changeset(%Acs.PMalls.TaskBar{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "每日问答", pic: "/images/task_pics/4/a3166cad54ac36073c3d5b8877764fbd.jpg", sub_name: "/日", point: 5, path: "/dayquestion", active: true, sort: 4}) |> Acs.Repo.insert

Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "day_sign_pic_1", value: "{\"pic\":\"/images/setting_pics/8/8b4c0250ff79ad8a48f2d52c4c04aa4b.jpg\"}", group: "signPic", memo: "顶部照片1", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "day_sign_pic_2", value: "{\"pic\":\"/images/setting_pics/9/d4d1837016c974e0a3a6765cd440c398.jpg\"}", group: "signPic", memo: "顶部照片2", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "day_sign_pic_3", value: "{\"pic\":\"/images/setting_pics/10/8b4c0250ff79ad8a48f2d52c4c04aa4b.jpg\"}", group: "signPic", memo: "顶部照片3", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "day_sign_pic_4", value: "{\"pic\":\"/images/setting_pics/11/6cb6aa7cde58bc9220eda53ece9a41c6.jpg\"}", group: "signPic", memo: "顶部照片4", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "day_sign_pic_5", value: "{\"pic\":\"/images/setting_pics/19/d4d1837016c974e0a3a6765cd440c398.jpg\"}", group: "signPic", memo: "顶部照片5", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "day_sign_pic_6", value: "{\"pic\":\"/images/setting_pics/20/6cb6aa7cde58bc9220eda53ece9a41c6.jpg\"}", group: "signPic", memo: "顶部照片6", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "day_sign_pic_7", value: "{\"pic\":\"/images/setting_pics/21/6cb6aa7cde58bc9220eda53ece9a41c6.jpg\"}", group: "signPic", memo: "顶部照片7", active: true}) |> Acs.Repo.insert

Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "sign_lunar_1", value: "{\"should\":\"开市|开仓|祈福\",\"bogey\":\"婚嫁|出门\"}", group: "signLunar", memo: "农历宜忌1", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "sign_lunar_2", value: "{\"should\":\"祭祀|开市|交易\",\"bogey\":\"造屋|做梁\"}", group: "signLunar", memo: "农历宜忌2", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "sign_lunar_3", value: "{\"should\":\"沐浴|纳彩\",\"bogey\":\"行丧|动土\"}", group: "signLunar", memo: "农历宜忌3", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "sign_lunar_4", value: "{\"should\":\"扫舍|安葬\",\"bogey\":\"破土|置产\"}", group: "signLunar", memo: "农历宜忌4", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "sign_lunar_5", value: "{\"should\":\"破屋|治病\",\"bogey\":\"行丧|安葬\"}", group: "signLunar", memo: "农历宜忌5", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "sign_lunar_6", value: "{\"should\":\"开市|纳财\",\"bogey\":\"破土|动土\"}", group: "signLunar", memo: "农历宜忌6", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "sign_lunar_7", value: "{\"should\":\"祭祀|破屋\",\"bogey\":\"诸事不宜\"}", group: "signLunar", memo: "农历宜忌7", active: true}) |> Acs.Repo.insert

Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "sign_award_1", value: "{\"point\":\"10\",\"days\":\"5\",\"pic\":\"/images/setting_pics/22/8b61581a1db9beb68ed9491435d3484a.jpg\"}", group: "signAward", memo: "签到3天奖励", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "sign_award_2", value: "{\"point\":\"10\",\"days\":\"5\",\"pic\":\"/images/setting_pics/23/8b61581a1db9beb68ed9491435d3484a.jpg\"}", group: "signAward", memo: "签到5天奖励", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "sign_award_3", value: "{\"days\":\"10\",\"point\":\"15\",\"pic\":\"/images/setting_pics/24/8b61581a1db9beb68ed9491435d3484a.jpg\"}", group: "signAward", memo: "签到7天奖励", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "sign_award_4", value: "{\"point\":\"50\",\"days\":\"15\",\"pic\":\"/images/setting_pics/25/8b61581a1db9beb68ed9491435d3484a.jpg\"}", group: "signAward", memo: "签到15天奖励", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "sign_award_5", value: "{\"days\":\"30\",\"point\":\"100\",\"pic\":\"/images/setting_pics/26/8b61581a1db9beb68ed9491435d3484a.jpg\"}", group: "signAward", memo: "签到30天奖励", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "sign_award_6", value: "{\"point\":\"200\",\"days\":\"50\",\"pic\":\"/images/setting_pics/27/8b61581a1db9beb68ed9491435d3484a.jpg\"}", group: "signAward", memo: "签到50天奖励", active: true}) |> Acs.Repo.insert

Acs.PMalls.LuckyDraw.changeset(%Acs.PMalls.LuckyDraw{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "衣服", num: 10, rate: 5 }) |> Acs.Repo.insert
Acs.PMalls.LuckyDraw.changeset(%Acs.PMalls.LuckyDraw{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "雨伞", num: 10, rate: 10 }) |> Acs.Repo.insert
Acs.PMalls.LuckyDraw.changeset(%Acs.PMalls.LuckyDraw{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "鞋子", num: 20, rate: 10 }) |> Acs.Repo.insert
Acs.PMalls.LuckyDraw.changeset(%Acs.PMalls.LuckyDraw{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "帽子", num: 50, rate: 10 }) |> Acs.Repo.insert
Acs.PMalls.LuckyDraw.changeset(%Acs.PMalls.LuckyDraw{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "钱包", num: 40, rate: 10 }) |> Acs.Repo.insert
Acs.PMalls.LuckyDraw.changeset(%Acs.PMalls.LuckyDraw{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "拖鞋", num: 50, rate: 10 }) |> Acs.Repo.insert
Acs.PMalls.LuckyDraw.changeset(%Acs.PMalls.LuckyDraw{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "游戏机", num: 3, rate: 1 }) |> Acs.Repo.insert
Acs.PMalls.LuckyDraw.changeset(%Acs.PMalls.LuckyDraw{}, %{app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5", name: "谢谢您", num: 99999999, rate: 40 }) |> Acs.Repo.insert


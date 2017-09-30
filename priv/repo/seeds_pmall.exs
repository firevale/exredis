use   Timex
alias Ecto.Adapters.SQL

app_id = "3E4125B15C4FE2AB3BA00CB1DC1A0EE5" 

Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "point_bind_mobile", value: "10", group: "point", memo: "绑定手机获得积分", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "point_subscribe", value: "10", group: "point", memo: "官网预约获得积分", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "point_follow_wechat", value: "30", group: "point", memo: "关注微信获得积分", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "point_day_question", value: "5", group: "point", memo: "每日问题获得积分", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "point_luck_draw", value: "-10", group: "point", memo: "抽奖每次消耗积分", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "point_day_sign", value: "2", group: "point", memo: "每日签到获得积分", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "point_exchange_goods", value: "0", group: "point", memo: "购物兑换积分", active: true}) |> Acs.Repo.insert

Acs.PMalls.TaskBar.changeset(%Acs.PMalls.TaskBar{}, %{app_id: app_id, name: "手机绑定", pic: "/images/task_pics/1/c35f3e49d3141f900e89e7dc2b7f2cda.jpg", sub_name: "限一次", point: 10, path: "bind_mobile", active: true, sort: 1}) |> Acs.Repo.insert
Acs.PMalls.TaskBar.changeset(%Acs.PMalls.TaskBar{}, %{app_id: app_id, name: "官网预约", pic: "/images/task_pics/2/655beab6711b7b832a879b9978a28c50.jpg", sub_name: "限一次", point: 5, path: "subscribe", active: true, sort: 2}) |> Acs.Repo.insert
Acs.PMalls.TaskBar.changeset(%Acs.PMalls.TaskBar{}, %{app_id: app_id, name: "每日签到", pic: "/images/task_pics/3/c977755fc959c4de0a9debc8df435075.jpg", sub_name: "/日", point: 2, path: "sign", active: true, sort: 3}) |> Acs.Repo.insert
Acs.PMalls.TaskBar.changeset(%Acs.PMalls.TaskBar{}, %{app_id: app_id, name: "每日问答", pic: "/images/task_pics/4/a3166cad54ac36073c3d5b8877764fbd.jpg", sub_name: "/日", point: 5, path: "knowledge", active: true, sort: 4}) |> Acs.Repo.insert

Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "day_sign_pic_1", value: "{\"pic\":\"/images/setting_pics/8/8b4c0250ff79ad8a48f2d52c4c04aa4b.jpg\"}", group: "signPic", memo: "顶部照片1", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "day_sign_pic_2", value: "{\"pic\":\"/images/setting_pics/9/8b4c0250ff79ad8a48f2d52c4c04aa4b.jpg\"}", group: "signPic", memo: "顶部照片2", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "day_sign_pic_3", value: "{\"pic\":\"/images/setting_pics/10/8b4c0250ff79ad8a48f2d52c4c04aa4b.jpg\"}", group: "signPic", memo: "顶部照片3", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "day_sign_pic_4", value: "{\"pic\":\"/images/setting_pics/11/8b4c0250ff79ad8a48f2d52c4c04aa4b.jpg\"}", group: "signPic", memo: "顶部照片4", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "day_sign_pic_5", value: "{\"pic\":\"/images/setting_pics/19/8b4c0250ff79ad8a48f2d52c4c04aa4b.jpg\"}", group: "signPic", memo: "顶部照片5", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "day_sign_pic_6", value: "{\"pic\":\"/images/setting_pics/19/8b4c0250ff79ad8a48f2d52c4c04aa4b.jpg\"}", group: "signPic", memo: "顶部照片6", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "day_sign_pic_7", value: "{\"pic\":\"/images/setting_pics/19/8b4c0250ff79ad8a48f2d52c4c04aa4b.jpg\"}", group: "signPic", memo: "顶部照片7", active: true}) |> Acs.Repo.insert

Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "sign_lunar_1", value: "{\"should\":\"开市|开仓|祈福\",\"bogey\":\"婚嫁|出门\"}", group: "signLunar", memo: "农历宜忌1", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "sign_lunar_2", value: "{\"should\":\"祭祀|开市|交易\",\"bogey\":\"造屋|做梁\"}", group: "signLunar", memo: "农历宜忌2", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "sign_lunar_3", value: "{\"should\":\"沐浴|纳彩\",\"bogey\":\"行丧|动土\"}", group: "signLunar", memo: "农历宜忌3", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "sign_lunar_4", value: "{\"should\":\"扫舍|安葬\",\"bogey\":\"破土|置产\"}", group: "signLunar", memo: "农历宜忌4", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "sign_lunar_5", value: "{\"should\":\"破屋|治病\",\"bogey\":\"行丧|安葬\"}", group: "signLunar", memo: "农历宜忌5", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "sign_lunar_6", value: "{\"should\":\"开市|纳财\",\"bogey\":\"破土|动土\"}", group: "signLunar", memo: "农历宜忌6", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "sign_lunar_7", value: "{\"should\":\"祭祀|破屋\",\"bogey\":\"诸事不宜\"}", group: "signLunar", memo: "农历宜忌7", active: true}) |> Acs.Repo.insert

Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "sign_award_1", value: "{\"point\":\"5\",\"days\":\"3\",\"pic\":\"/images/setting_pics/22/8b61581a1db9beb68ed9491435d3484a.jpg\"}", group: "signAward", memo: "签到3天奖励", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "sign_award_2", value: "{\"point\":\"10\",\"days\":\"5\",\"pic\":\"/images/setting_pics/23/8b61581a1db9beb68ed9491435d3484a.jpg\"}", group: "signAward", memo: "签到5天奖励", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "sign_award_3", value: "{\"days\":\"10\",\"point\":\"15\",\"pic\":\"/images/setting_pics/24/8b61581a1db9beb68ed9491435d3484a.jpg\"}", group: "signAward", memo: "签到7天奖励", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "sign_award_4", value: "{\"point\":\"50\",\"days\":\"15\",\"pic\":\"/images/setting_pics/25/8b61581a1db9beb68ed9491435d3484a.jpg\"}", group: "signAward", memo: "签到15天奖励", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "sign_award_5", value: "{\"days\":\"30\",\"point\":\"100\",\"pic\":\"/images/setting_pics/26/8b61581a1db9beb68ed9491435d3484a.jpg\"}", group: "signAward", memo: "签到30天奖励", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "sign_award_6", value: "{\"point\":\"200\",\"days\":\"50\",\"pic\":\"/images/setting_pics/27/8b61581a1db9beb68ed9491435d3484a.jpg\"}", group: "signAward", memo: "签到50天奖励", active: true}) |> Acs.Repo.insert

Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "超级礼包", value: "superPack", group: "cdkeyType", memo: "超级礼包", active: true}) |> Acs.Repo.insert
Acs.Admin.Setting.changeset(%Acs.Admin.Setting{}, %{app_id: app_id, name: "抽奖图", value: "{\"pic\":\"/images/setting_pics/31/f21ccd1c4fb26fc0aa4b51b151191217.png\"}", group: "luckyDrawPic", memo: "抽奖图", active: true}) |> Acs.Repo.insert

today = Timex.local
end_day = Timex.shift(today, days: 30) 
Acs.PMalls.PMallGoods.changeset(%Acs.PMalls.PMallGoods{}, %{id: "S00003", name: "红心尔克风衣", description: "红心尔克风衣", price: 800, original_price: 128, currency: "POINT", postage: 0, pic: "/images/goods_icon/S00003/4410b036983421a95fe7efe7148498e0.jpg", 
stock: 99, active: true, is_virtual: false, virtual_param: "", begin_time: today, end_time: end_day, app_id: app_id, user_id: 100001}) |> Acs.Repo.insert
Acs.PMalls.PMallGoods.changeset(%Acs.PMalls.PMallGoods{}, %{id: "S00004", name: "阿迪达斯运动鞋", description: "阿迪达斯运动鞋", price: 2000, original_price: 488, currency: "POINT", postage: 2000, pic: "/images/goods_icon/S00004/a698875b93dd692e941ce98b8eaa0d19.jpg", 
stock: 50, active: true, is_virtual: false, virtual_param: "", begin_time: today, end_time: end_day, app_id: app_id, user_id: 100001}) |> Acs.Repo.insert
Acs.PMalls.PMallGoods.changeset(%Acs.PMalls.PMallGoods{}, %{id: "S00005", name: "运动帽", description: "运动帽", price: 300, original_price: 50, currency: "POINT", postage: 0, pic: "/images/goods_icon/S00005/15c0b2258e8d443eaa2a911c4fb09092.jpg", 
stock: 99, active: true, is_virtual: false, virtual_param: "", begin_time: today, end_time: end_day, app_id: app_id, user_id: 100001}) |> Acs.Repo.insert
Acs.PMalls.PMallGoods.changeset(%Acs.PMalls.PMallGoods{}, %{id: "S00007", name: "switch游戏机", description: "switch游戏机", price: 3000, original_price: 1288, currency: "POINT", postage: 0, pic: "/images/goods_icon/S00007/406c6ea0b44f1f7b3d67164ec5fcc55c.jpg", 
stock: 50, active: true, is_virtual: false, virtual_param: "", begin_time: today, end_time: end_day, app_id: app_id, user_id: 100001}) |> Acs.Repo.insert
Acs.PMalls.PMallGoods.changeset(%Acs.PMalls.PMallGoods{}, %{id: "S00001", name: "超级大礼包", description: "超级大礼包", price: 500, original_price: 50, currency: "POINT", postage: 0, pic: "/images/goods_icon/S0001/8d99ac2c28b924196e3b14eb0cfd344a.jpg", 
stock: 10, active: true, is_virtual: true, virtual_param: "superPack", begin_time: today, end_time: end_day, app_id: app_id, user_id: 100001}) |> Acs.Repo.insert
Acs.PMalls.PMallGoods.changeset(%Acs.PMalls.PMallGoods{}, %{id: "S00002", name: "修身短款外套", description: "修身短款外套", price: 1000, original_price: 288, currency: "POINT", postage: 0, pic: "/images/goods_icon/S0002/b39e1cd17ee5ab3e533df61223394a45.jpg", 
stock: 20, active: true, is_virtual: false, virtual_param: "", begin_time: today, end_time: end_day, app_id: app_id, user_id: 100001}) |> Acs.Repo.insert
Acs.PMalls.PMallGoods.changeset(%Acs.PMalls.PMallGoods{}, %{id: "S00006", name: "GUCCI钱包", description: "GUCCI钱包", price: 688, original_price: 199, currency: "POINT", postage: 0, pic: "/images/goods_icon/S0006/72bdce86659d7ea0886c0d1f43c8ab6b.jpg", 
stock: 10, active: true, is_virtual: false, virtual_param: "", begin_time: today, end_time: end_day, app_id: app_id, user_id: 100001}) |> Acs.Repo.insert

Acs.PMalls.LuckyDraw.changeset(%Acs.PMalls.LuckyDraw{}, %{app_id: app_id, name: "风衣", num: 10, rate: 5, goods_id: "S00003" }) |> Acs.Repo.insert
Acs.PMalls.LuckyDraw.changeset(%Acs.PMalls.LuckyDraw{}, %{app_id: app_id, name: "外套", num: 10, rate: 10, goods_id: "S00002"  }) |> Acs.Repo.insert
Acs.PMalls.LuckyDraw.changeset(%Acs.PMalls.LuckyDraw{}, %{app_id: app_id, name: "运动鞋", num: 20, rate: 10, goods_id: "S00004"  }) |> Acs.Repo.insert
Acs.PMalls.LuckyDraw.changeset(%Acs.PMalls.LuckyDraw{}, %{app_id: app_id, name: "帽子", num: 50, rate: 10, goods_id: "S00005"  }) |> Acs.Repo.insert
Acs.PMalls.LuckyDraw.changeset(%Acs.PMalls.LuckyDraw{}, %{app_id: app_id, name: "钱包", num: 40, rate: 10, goods_id: "S00006"  }) |> Acs.Repo.insert
Acs.PMalls.LuckyDraw.changeset(%Acs.PMalls.LuckyDraw{}, %{app_id: app_id, name: "大礼包", num: 10, rate: 10, goods_id: "S00001"  }) |> Acs.Repo.insert
Acs.PMalls.LuckyDraw.changeset(%Acs.PMalls.LuckyDraw{}, %{app_id: app_id, name: "游戏机", num: 3, rate: 1, goods_id: "S00007"  }) |> Acs.Repo.insert
Acs.PMalls.LuckyDraw.changeset(%Acs.PMalls.LuckyDraw{}, %{app_id: app_id, name: "谢谢您", num: 99999999, rate: 40 }) |> Acs.Repo.insert

Acs.PMalls.Cdkey.changeset(%Acs.PMalls.Cdkey{}, %{app_id: app_id, code: "cSYLLD", code_type: "superPack"}) |> Acs.Repo.insert
Acs.PMalls.Cdkey.changeset(%Acs.PMalls.Cdkey{}, %{app_id: app_id, code: "D6ixCF", code_type: "superPack"}) |> Acs.Repo.insert
Acs.PMalls.Cdkey.changeset(%Acs.PMalls.Cdkey{}, %{app_id: app_id, code: "4kcOh9", code_type: "superPack"}) |> Acs.Repo.insert
Acs.PMalls.Cdkey.changeset(%Acs.PMalls.Cdkey{}, %{app_id: app_id, code: "OzcBQq", code_type: "superPack"}) |> Acs.Repo.insert
Acs.PMalls.Cdkey.changeset(%Acs.PMalls.Cdkey{}, %{app_id: app_id, code: "d6qvkz", code_type: "superPack"}) |> Acs.Repo.insert
Acs.PMalls.Cdkey.changeset(%Acs.PMalls.Cdkey{}, %{app_id: app_id, code: "E48mTL", code_type: "superPack"}) |> Acs.Repo.insert
Acs.PMalls.Cdkey.changeset(%Acs.PMalls.Cdkey{}, %{app_id: app_id, code: "Sh3EyE", code_type: "superPack"}) |> Acs.Repo.insert
Acs.PMalls.Cdkey.changeset(%Acs.PMalls.Cdkey{}, %{app_id: app_id, code: "XqfjOE", code_type: "superPack"}) |> Acs.Repo.insert
Acs.PMalls.Cdkey.changeset(%Acs.PMalls.Cdkey{}, %{app_id: app_id, code: "ngOl5e", code_type: "superPack"}) |> Acs.Repo.insert
Acs.PMalls.Cdkey.changeset(%Acs.PMalls.Cdkey{}, %{app_id: app_id, code: "9Hp9Uh", code_type: "superPack"}) |> Acs.Repo.insert
Acs.PMalls.Cdkey.changeset(%Acs.PMalls.Cdkey{}, %{app_id: app_id, code: "WxCFTx", code_type: "superPack"}) |> Acs.Repo.insert
Acs.PMalls.Cdkey.changeset(%Acs.PMalls.Cdkey{}, %{app_id: app_id, code: "Hm0eQY", code_type: "superPack"}) |> Acs.Repo.insert
Acs.PMalls.Cdkey.changeset(%Acs.PMalls.Cdkey{}, %{app_id: app_id, code: "7d3nOx", code_type: "superPack"}) |> Acs.Repo.insert
Acs.PMalls.Cdkey.changeset(%Acs.PMalls.Cdkey{}, %{app_id: app_id, code: "TymLBE", code_type: "superPack"}) |> Acs.Repo.insert
Acs.PMalls.Cdkey.changeset(%Acs.PMalls.Cdkey{}, %{app_id: app_id, code: "i3vqnY", code_type: "superPack"}) |> Acs.Repo.insert
Acs.PMalls.Cdkey.changeset(%Acs.PMalls.Cdkey{}, %{app_id: app_id, code: "MpPG8Z", code_type: "superPack"}) |> Acs.Repo.insert
Acs.PMalls.Cdkey.changeset(%Acs.PMalls.Cdkey{}, %{app_id: app_id, code: "r5emRX", code_type: "superPack"}) |> Acs.Repo.insert
Acs.PMalls.Cdkey.changeset(%Acs.PMalls.Cdkey{}, %{app_id: app_id, code: "3Rpyhc", code_type: "superPack"}) |> Acs.Repo.insert
Acs.PMalls.Cdkey.changeset(%Acs.PMalls.Cdkey{}, %{app_id: app_id, code: "a5tcVQ", code_type: "superPack"}) |> Acs.Repo.insert
Acs.PMalls.Cdkey.changeset(%Acs.PMalls.Cdkey{}, %{app_id: app_id, code: "mCO297", code_type: "superPack"}) |> Acs.Repo.insert

Acs.PMallTransaction.add_user_point("admin_op", app_id, 1, 5000, "管理员赠送")
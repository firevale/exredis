# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Acs.Repo.insert!(%Acs.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.


alias Acs.RedisUser
alias Acs.Repo
alias Ecto.Adapters.SQL
alias Acs.App
alias Acs.AdminUser
alias Acs.Forum
alias Acs.ForumSection
alias Acs.ForumPost
alias Acs.ForumComment
alias Acs.ForumManager
alias Acs.AdminSetting
alias Acs.Mall
alias Acs.MallGoods
alias Acs.MallOrder
alias Acs.MallOrderDetail
alias Acs.UserAddress
alias Acs.MallOPLog
require Logger

Redis.flushdb()

SQL.query(Acs.Repo, ~S{INSERT INTO `apps` (`id`, `secret`, `name`, `icon`, `token_ttl`, `currency`, `payment_callback`, `chaoxin_group_id`, `cs_phone_number`, `forum_name`, `forum_url`, `baidu_tieba_name`, `baidu_tieba_url`, `weibo_url`, `weibo_name`, `website_name`, `website_url`, `public_weixin_name`, `public_weixin_url`, `inserted_at`, `updated_at`, `active`, `has_forum`, `has_mall`) VALUES
('14c75cb12b05260bf83ee8e518717292', '3748ec3291e94b032cb51466304615da73320c652baecef617c6cceae85e03f1', 'Q传[openxlive]', NULL, 604800, 'CNY', 'http://pay.ucxl.firevale.com/pay/firevale', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-17 09:19:50', '2017-02-17 10:47:09', 0, 0, 0),
('32338E302CAE3892F299404671C52280', '7580294FB6F31190B6A390E79356D4A3FE5855C53B55F161830BCFEB88BC8153', 'Q传[火谷android]', 'https://fvaccdn.firevale.com/images/app_icons/57c9b4212cb8d30e5ae59b061db9a74a.png', 604800, 'CNY', 'http://pay.cmge.cocs.firevale.com/pay/firevale', NULL, NULL, 'Q传[火谷android]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-17 09:19:51', '2017-05-17 09:43:24', 1, 1, 1),
('3E4125B15C4FE2AB3BA00CB1DC1A0EE5', '4B17AF5E529959E8FDCB186B0E58FC1C3AF85F4813B27C27F33E2A44F724B686', '中国惊奇先生', '/img/app_icons/83141f5001af038d9164f2878de4190c.png', 604800, 'CNY', 'https://', NULL, NULL, '中国惊奇先生', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-06-19 03:44:49', '2017-06-19 03:45:49', 1, 1, 0),
('48297435e8249ae4660efaee4a898349', '8945d89c37542d8831aa1cf183bc04eaea0a9bef08b86185db6c67648669996e', 'Q传[火谷wp8]', 'https://fvaccdn.firevale.com/images/app_icons/29bf4ed1f4039d68a2fbfb704852e54a.png', 604800, 'CNY', 'http://pay.ucwp.firevale.com/pay/firevale', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-17 09:19:51', '2017-02-16 07:22:31', 1, 0, 0),
('53A993ABE3A1CB110E1DC59AE557F5C9', '56965D2D5FD7EF6F2C418C3FCA2F091778CF3543C7835BD8AFB0A55DE8E6798E', '战神 [android]', 'https://fvaccdn.firevale.com/images/app_icons/fd21f4241579254eb11e7039185d5a66.png', 604800, 'CNY', 'http://pay.adcog.firevale.com/pay/firevale', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-17 09:19:50', '2017-02-17 10:50:04', 0, 0, 0),
('794ACA695D1DFC3DDDC56C00A57B94D4', 'A6A4D9EB903307AB8424B202B4FB994A9DB0FAB7041E0FCA7F90051E1DA78C58', 'Q传[ku7]', NULL, 604800, 'CNY', 'http://pay.ucwp.firevale.com/pay/firevale', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-17 09:19:50', '2017-02-17 10:47:48', 0, 0, 0),
('978A7D84040FE589ED0C76295131E43D', 'F0D01E4B0C7769C552424AFA54D96F5FA233FEA37F1CDBB89D49AD3AA5616365', '战神大陆[IOS]', 'https://fvaccdn.firevale.com/images/app_icons/fd21f4241579254eb11e7039185d5a66.png', 604800, 'CNY', 'http://pay.adcog.firevale.com/pay/firevale', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-17 09:19:50', '2017-02-17 10:48:24', 0, 0, 0),
('9c98152c6b42c7cb3f41b53f18a0d868', '5f8947953356b7c9656158d3981775679033420010856139474d980d8801d351', '战神[越狱]', 'https://fvaccdn.firevale.com/images/app_icons/fd21f4241579254eb11e7039185d5a66.png', 604800, 'CNY', 'http://pay.uc91cog.firevale.com/pay/firevale', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-17 09:19:50', '2017-02-17 10:48:52', 0, 0, 0),
('A3D14A8801FD1EB67FF4D87B6DD86BC0', 'FFD5B0FCDD649541C26426A30FF6D2BB3C8AD59F7940E3E77CE1F675B196A1A6', 'VRStore', 'https://fvaccdn.firevale.com/images/app_icons/2f88b5ba84005ded877d6a0bf8338a99.png', 604800, 'CNY', 'http://localhost', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-17 09:19:50', '2017-02-17 10:50:33', 0, 0, 0),
('D7B5D08EA4AEF086E4C41EB0E8DD32F4', 'E2CDBB8BD9C9FC12698F33E4CF695D12C6132F80A4B5360CFBE15ABE443304E5', 'biubiubiu cn', NULL, 604800, 'CNY', 'http://123.59.71.187:5555/pay_feedback/', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-17 09:19:50', '2017-02-17 10:49:39', 0, 0, 0),
('F577FCEE9B0616A421096AA3A4E9F2AC', 'EB14440BFF2705F81C0FE5CBA2C18BD9D20D24D2EB5A0015CDC8F691EECF54B3', '枪神默示录', NULL, 604800, 'CNY', 'http://123.59.71.187:5555/pay_feedback/', NULL, NULL, '枪神默示录', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-17 09:19:51', '2017-05-17 09:43:05', 1, 1, 1)
})

SQL.query(Acs.Repo, ~S|INSERT INTO `app_sdk_bindings` (`id`, `sdk`, `binding`, `app_id`, `inserted_at`, `updated_at`) VALUES
(1, 'haima', '{"app_key":"75f6ab6ed83c113c744ae67307b8c464","app_id":"10cc12f75301788f87f934692819120b"}', '9c98152c6b42c7cb3f41b53f18a0d868', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(2, 'i4', '{"rsa_key":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCmhzrRu5eRQgMTvdDKuKMJqe5u9I+m/43ifZxW 1skOxcZmGRtZ+3CT0ZF3YsDWevDUEVmLfMWxGaB6F/GFztLWbttJ5+4r2KaEPJqWXmn7uEajpU6R 1CEK4Z/ZN0MFTdX19C+0ig7MOKYapcOUFJanl8BpO479GXleMhOeq2MebwIDAQAB","app_key":"a826eb7b694846fdb2e5115234c2fe19","app_id":"957"}', '9c98152c6b42c7cb3f41b53f18a0d868', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(3, 'iiapple', '{"app_key":"bbcbbadcbbdd58a917efa2c8b952152f","app_id":"e6d783458cdb446fec2411db79c2f59d"}', '9c98152c6b42c7cb3f41b53f18a0d868', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(4, 'itools', '{"rsa_key":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC2kcrRvxURhFijDoPpqZ/IgPlAgppkKrek6wSrua1zBiGTwHI2f+YCa5vC1JEiIi9uw4srS0OSCB6kY3bP2DGJagBoEgj/rYAGjtYJxJrEiTxVs5/GfPuQBYmU0XAtPXFzciZy446VPJLHMPnmTALmIOR5Dddd1Zklod9IQBMjjwIDAQAB","app_key":"31A4E64B9B63BC71AF8D9B113BE683FB","app_id":"1104"}', '9c98152c6b42c7cb3f41b53f18a0d868', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(5, 'ky', '{"rsa_key":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC9UR9c/IiqDjRKZzgvhmiYJDSvaFuLA1Z0rJau8jTJnsU16my4Apo4usfxHlY+ogIwXx79ASIju2Yt7H11pVwsrcg3W2DozVfZQPprW7+7F/K+NFrsuv7upj2UJPeEwiGVSvNRXF/nWZ8hISoilgTyF/aBMHDdIjyeQaQ1enleNwIDAQAB","md5_key":"ZEMh0VXUtroos6dWzMLj8wj1iY1UuKKt","app_key":"a9e47c15b99b911103e68d6d371c96e6","app_id":"8490"}', '9c98152c6b42c7cb3f41b53f18a0d868', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(6, 'ndcom', '{"app_key":"7ef44121a67533fc4a91fd45a2a8cb06ca0c35c5681c5af4","app_id":"116594"}', '9c98152c6b42c7cb3f41b53f18a0d868', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(7, 'pp', '{"pay_key":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4FvNjn5CAfd7iD2MUMFhYliAyLGG3FAZmY19qzz6aGIJVFXNznjW01IaNHr+32OEYfgrMbZ/vEkGV98VRwvYuG2KM0KyksS53NedEXUZ/OchMKuXulPxrNIg8e39lhoMmhvtT/bZAIN7wvmjb9Oz9WB79gnV1G5m2HrDlwlm9ZWSQi/Of8pP6M+mhWUhFROO60HIrFjihhOOHPPIolSiKzIuiFmh107dMzakzlfyh5hWjyIJphLOSxK7JLRCNNxEXo7ZO5ZleY60Ovllp1Qk/nhBLf3KYlwTgb+tK1ywX8TCYBRmI6kzculogGYFVLIhDBzd1BElkyKpEcns4G7omQIDAQAB","app_key":"908494ecdd918668775a6737d6f18a81","app_id":"5879"}', '9c98152c6b42c7cb3f41b53f18a0d868', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(8, 'tbt', '{"app_key":"sh5EbRe2LBNl9I@Us5uERod2AYNkxH@r","app_id":"150420"}', '9c98152c6b42c7cb3f41b53f18a0d868', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(9, 'xy', '{"pay_key":"FndlgC1ZKfA8K4KT6tP3GVY1VCNk47AA","app_key":"MSHEGtIdDnv1ooIP3R1KXvT6WAXxDE5i","app_id":"100007495"}', '9c98152c6b42c7cb3f41b53f18a0d868', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(10, 'anzhi', '{"app_secret":"p7l2EsADNmV92qTBuRowb8Aj","app_key":"1438535816M89tgA5Bky7e4v4FH9pS"}', '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(11, 'baidu', '{"app_secret":"zQgtHzTXcm6APjHFmhwyk87ntONQqyfO","app_key":"UudGmUZdxXAfKktsIVedQ8go","app_id":"6464980"}', '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(12, 'cc', '{"pay_key":"f38c9758c55c4324b5d69551749b1888","app_key":"75279a5e683842dcad225c4b611d6023","app_id":"102547"}', '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(13, 'coolpad', '{"pay_pub_key":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCly+2jYZfu22gvil3r0rc0mmFP7qRtHe4C8+fQTbo1pnEWWy/fbh2oQAYG8e6B5ChsJynnyTORqydqdyM6/oIUkD/lftbz++m8d4QT5J9iZy0SWk8k9VxPEwPcSihgpjKahOjFnkAkS6F4Gwy2JuoKydaEkklZXod5xZ7+tCH+EQIDAQAB","pay_priv_key":"MIICWwIBAAKBgQCWfbySZBAOAJAuHTRwksb0ngUBwHXoiBBVRi1KKJWBwUOaW5CR3SiIx8EyQ5GY4XX+6dQr5ce6drZJERYuXxzOy2GtCrlscleosbiKostAxFqW5EMxXnm8KdTDj2BonEePhxEjIp/p4VmNAlRAYw6MZ6PZGE8MAstbYiJAgYH1RwIDAQABAoGAconQdDrkXUPgeLiRqPyNoLCEbwjktM6aX8zBu6eX4uINafY22k3RBAnE6VS0A//VpuahLaf9k9W2d3Yhw7lwWmXw20fS5k7Y1xbLNi5Y53nvUWuBlN9adZCeaVanhORnWOB/hi4Tu3LjRbdsIPFT+EFTrnXahLM0b6aNUqe0ZEECQQDk4KatsY4nBa8sk/foO/RZy5QgeAgldcJn4ozcnQzEIRX05hEdCYjLjxyi2H14nrZw4pNuER3WO/Z5kMn3FUtjAkEAqFMdedJ19JvkAd3tS79ZITv5JIMZ8bNFNRhOUm91PUv5rKYhL0sHa5wUrOkOroxdBPDmsFBFOte5g8j3zuo9zQJAbYbb/I7VWfMsawa8QdQ/EKGNVyRZsaNyzsfpZMF7FHhIy5M1aVHgtpjbuUokcQ5ye/7RUoC6aIT1ZCNXovf7xQJAMmo6gNtNYwcyAnEi+rYEDxU0aQAvTBpCl0WBZ+VkOwi/bjuP4udZAJ0OAEAJmrQFxE4W+iYApkAom1UdC8dS3QJATLFt5sSZsHp3EOvy5xj9IJVGkUQdzf4xmE9+FNwEChg+jsC9s1z3db3P3tt1PQpm3Xs8jgoAy6CNjd37w9wfCw==","app_key":"1d73b0bd43ca4d9a8299bed15c1a5705","app_id":"5000001294"}', '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(14, 'downjoy', '{"app_secret":"Cp9aMrd1W26D","app_key":"r0zgQ863","app_id":"3529"}', '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(15, 'htc', '{"pub_key":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDbRLzWfCD4pQb1mjeGLy6gw+AfOKZ1dpNbMUyZml+p3stTSdTyHHpkuPPsaOqsT9gFDSmXz5KRBt4w6KCeLj/R61KA5rmMJipDnSJV19kld0z6NW47kiEQHslaalDBCST94TUIcCzjhaiG3yTChDCTFo3v47qyt6j3YvVpih8UNQIDAQAB","priv_key":"MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAMfJPSOrALkUfeA0C2kxu/8Rm9/SP8RmvTzwdrwk6v9+6FBbM9TEcN0Xka8QkZFEV7mySSjIKX+3nKiQdjaBTW8hrd9lSfCO5IvFvxjzgYz17T2d/c7sCMUyXoIymehYEe97F5+vRmw83yzDj8TMM1eB+eYV5MydHKmHyVI0AGoDAgMBAAECgYAIIuTvh+5Om0wJDnWMgi8C00fC1MAuEnUQf0aGoQZFA3kYlK5Gsv1Zs7UGKSmUffEIqf8avxQZlHO31bJKw/dQRc10XSlhEQ75wjKk7It0MWuHYfXkP6GXtkfGkbgtAVOM016pjPhQlvdFpgTejKbVNVb2jEpZaUMwRopqzF/RWQJBAPqLmxEefvlbqHadWNeExLXh9gUbrFfKD0tiwjaTrdPcb+HQYCKrJxLftiolwANpxmsdo+bREkuvmT8V7QxeJdUCQQDMIrsDh2fCOkEZMDjZezmKBaO5wZl3AXuxguj9MyTKjuCsaitYogbKq6trzeihhWJEBTm4DhjttjIrF5hMT4R3AkEAocmkyNk4hS17C51v0TwbCphvlbzY/ZetaLDNWRDkHvsqBFfavIhpIvbzWyQlag7T4jexr0sy1Uz/WI2AFYx2QQJAP0Vwg6p/bYMS1FTO+hGohvAyjAvGnk02YpG512j3uVTJrIcHwmQOCNlmu3ZJ6W5nQ7/+4N51uZAkQpkAmn53BwI/DbDQQG9YJmhchW30UNULHL69Zr4TOjdowHMwJJhogfaky8UsCRQecbmOpNVjSY8U7H9eT5lgK8WhuyXoM1rW","game_code":"2877531364103"}', '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(16, 'huawei', '{"pay_pub_key":"MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAM44/srXj9fhDaCpxG34yXDE8RiHB+Ro8XXPboLAC6+JuvjZjskhY8G/Mnh43m0H3gf66DgM6HKFbj8BrZdBILUCAwEAAQ==","pay_priv_key":"MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAzjj+yteP1+ENoKnEbfjJcMTxGIcH5Gjxdc9ugsALr4m6+NmOySFjwb8yeHjebQfeB/roOAzocoVuPwGtl0EgtQIDAQABAkBzJ7h/pGeacP2fHa2miypRYmgO/jgV/9P1qWNYd80Os6Wr14PnMVk7pzje2IVwsp3p2kqt6uW8CTtsg84U7I5xAiEA5vF3ycxtVEJPICz1Hnt1UHiRQiXm6S4plYrP/FF9FgMCIQDkmOdhqbPOREEdh2mkLYH/cL5tk0xyG/03xZNporNs5wIhAKgc4MFSgceTWXwnneupnXWNvtfzNUtLIlRMryiSvUa3AiB7f5fRjWsUjo9XMqcCCYvnwrM+Y4uzQifFD7qaIUoqFQIgNBKofkMZcazbe7GzQYpkRzA5oh1/YjgSghS2NJAb9O0=","pay_id":"900086000027547193","app_key":"MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAJceOwTSa7UXreUG76wwBYK0s608aKFyJiZlxN7r2+rC0BE4jPesXb0yJbf3VPj0saFyN4dytjp+hML73mdnBxtJ2tNZApJvzNI2bxUW+Z7Ae1Fu+6MpLKlnZgY87k7SZBSNatV4lYWdMACrx8FicTluu2m4iVXFVjT4XFHYyp3LAgMBAAECgYBTaV5ORQ8qgA1+ExwLwN3pzXA3uNZP9r/UBexq12kl5a4PM1WsB7oeCiYDq0N9vyKk6HR6EPlAxEDnlzqlfJrQvgpX86H6bHEQV2zSPTVHap8C5u5IlkXBN5VFJv/Kwp0NonpS/YFdTcvddh/CCz/I/3yivPzLFAW21T7zsAGdQQJBAMXi4ptMUZvvt+Tv/XWj+FxhnjwOINutLknnmsbgoOayFsQlXYA80TcFx5k5DyaOZMEEWZX81Q55tcTei++q+XsCQQDDf064+IyeR+4kDfL4vN6KNq0c+yDdK8Al5dKDXZCwsHmiqPlEMbvHdtCBE23y5WQP1PfroqctuCwRqktcMvPxAkEAwO2mTxCGVEjP+lV8wHAf2TmXQyfnIyXiBk3W2eTxGlow1gUz9q3UsBdjdWBrBAU59/Ecwp2gvx8sd4cd2YnQ9wJAG3MaqJotlGPhKirTPN24GYwHzpPsT2G/PxL/9fYDROviiFZVeZ/KD/281QLXY02WOSrcDLfv5VmAxpI0tqNo4QJAP1HXJOrCsIxw79/ziTtf7R2lItKe68rW+5WhgYujh8Vuo7cUhxMg9t7XcwYwkTLoAWxRj1zoXn89Tv4CFXQSdA==","app_id":"10290114"}', '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(17, 'iyouxi', '{"client_secret":"af6c676ddf6248cbac05770088026fd0","client_id":"79550508","app_key":"b5e41e0ae4a3c9ab2dc3cab3b7488a66"}', '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(18, 'lenovo', '{"app_key":"MIICWwIBAAKBgQDCqL5XA/Y1KCYE+V5sAO+v5abRCSncloxUeJ7W+GlWbDa+SuBM5ir/lXGpJyQdZLh3KQx+VrwdhAD4gHURz36wAbLsONMlQrei65mjN0KdiO4Xs6uBwVtWyNPtYs0ENRy+MMSldiEt1EpqsGH8i/ejG2kqa/6VN3ZBkBf9qVhO2wIDAQABAoGAJb+dcbhl9Xb8sHg/VEh2MrEhQWY6hPl46ySdAOkZXFYN46cXijIUYo3zha7+dOjEUO9X6eQeBMdFfOtESJjpYxe2Q7f37ODJbEbPaTO51JjamHliW41IeENQKjwnOtEJ4pvyXO3lUuq7VT8fzpTYXL5CP+/+5A+6Esqht4mTUyECQQDpgZgetel6uE9hpYeSfTsE2cLzaqLbtdyLIZrYoiErMTzZu96wQjqj3diRC/fJ7UvCx9hb2pD3Aute/MkKA1ERAkEA1WkoJRRLA+rW41XSios+ulI5ej0vjsSwP9K4x7xm6TF4PRckHIBxGmw1agaj4Evvjk/bg+1jF/rpAF6fF+6hKwJAejEl4JRDPMPsTmXnvwGne89UlDquRJkzct8//7M/9jFK7YnBa60MsKmr5aNEpLd3mNMpZk/G4mv1rXxM29+GcQJAYzvUiPlYsGegqHEdx4JcFrNpOqf81zwqYGMRvP6kM8bnDDEYf5BSB2FNrRGNXhyxNdF4V24o59uqQJu/CpfRpQJAcYVx+nHZ82XWgKj1kjLvaqmg87Sc9AY6oFnjDmxFN+zhTaIGqBWwl8SWmCJc32rckqY6KNjEWlU0H22vlPQWNA==","app_id":"1506080443582.app.ln"}', '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(19, 'mumayi', '{"app_key":"9691354876b7c5a1te2AIqbtNv4GcEXHkipwdKKGLC87feCZk5hpjO1sjgRyyLVd6uiLwA","app_id":"781546"}', '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(20, 'oppo', '{"app_secret":"6175a986F4858d835Bb8AFc5a9C26126","app_key":"10jZCgg8iuPWkooCSSOS0kOss","app_id":"3964"}', '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(21, 'qh360', '{"app_secret":"1016bbf67382ef5cb5805cfbd4584524","app_key":"bc52a16925cd9a55f475bff8496ca989","app_id":"202567646"}', '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(22, 'qxz', '{"app_key":"fnqop3gmg5swqx@fbuqw","app_id":"20150820-NTZS"}', '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(23, 'sogou', '{"pay_key":"{D4A860EA-0A73-4CC6-B49C-B6C1AB1340AE}","app_secret":"3205bd66568e679d003a99d10b096f7c1abc2f5f4f0a7a03df1ef189c9888aa3","app_key":"2aeae162624b90f335993e3b3db17631347f708c0ad2f9c4cbc809952decdd97","app_id":"1011"}', '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(24, 'uc', '{"app_key":"c7c102548b7c62540b4a01b06f98f374","app_id":"557054"}', '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(25, 'vivo', '{"cp_key":"c4805d06e2c4c4203d5fcc03f341bf7e","cp_id":"20150807115330291227","app_id":"0bae0449fc2e882f7e52976d0d021fe5"}', '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(26, 'wdj', '{"rsa_key":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCd95FnJFhPinpNiE/h4VA6bU1rzRa5+a25BxsnFX8TzquWxqDCoe4xG6QKXMXuKvV57tTRpzRo2jeto40eHKClzEgjx9lTYVb2RFHHFWio/YGTfnqIPTVpi7d7uHY+0FZ0lYL5LlW4E2+CQMxFOPRwfqGzMjs1SDlH7lVrLEVy6QIDAQAB","app_key":"06bd13ad857db082ccd86016dac47877","app_id":"100028099"}', '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(27, 'xiaomi', '{"app_secret":"pZO8kveTmsbR3mou7W+eCw==","app_key":"5421734335772","app_id":"2882303761517343772"}', '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(28, 'youku', '{"pay_key":"ea4890040efaf53909b2f5250e3fe127","app_secret":"d39320bcde123ede7b469f82ce1ab090","app_key":"2f802cf1a736ff39","app_id":"1867"}', '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(29, 'yyh', '{"pay_key":"QUY3MjZEMDM3OUNCODVGMzRBMjZDRjRDNUEwM0E0MDI0MTA0N0FENk1UUXpNRFE0T0RBeE1UUTBOVEk0TVRNd016Y3JNVFkzT1RrNE1UZzFNRFE0TVRjMk16VXpOVGN3TkRjNU56TTNPRE0zTURRM056azRNelkz","pay_id":"5000462617","app_key":"gj2OwwN8he7S3267","app_id":"11053"}', '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
(30, 'xiaomi', '{"app_secret":"uTip7npiWiDowQsI8KdQxA==","app_key":"5721748789198","app_id":"2882303761517487198"}', 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-19 11:26:03'),
(31, 'wechat', '{"signature":"84a28a826d5fbc76571de9004d5bf1ff","sign_key":"FireVale2017GoforMillionsFortune","partnerid":"1426834702","package_name":"com.firevale.wxqz.fv","app_secret":"916f1b7eb6570daf3f3322a2f88aef66","app_id":"wx06aa585d82e1bed7"}', '32338E302CAE3892F299404671C52280', '2017-02-28 04:31:04', '2017-02-28 04:31:04');
|)

SQL.query(Acs.Repo, ~S|INSERT INTO `app_goods` (`id`, `name`, `description`, `price`, `icon`, `app_id`, `inserted_at`, `updated_at`) VALUES
('biu.goods.credits18', '一大堆钻石', '180个钻石', 1800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
('biu.goods.credits198', '一大袋钻石', '1980个钻石', 19800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
('biu.goods.credits328', '一小箱钻石', '3280个钻石', 32800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
('biu.goods.credits6', '一小堆钻石', '60个钻石', 600, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
('biu.goods.credits648', '一大箱钻石', '6480个钻石', 64800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
('biu.goods.credits68', '一小袋钻石', '680个钻石', 6800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
('com.beijing.goods.18credit', '180钻石', '180个钻石', 1800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.beijing.goods.198credit', '1980钻石', '1980个钻石', 19800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.beijing.goods.30credit', '300钻石', '300个钻石', 3000, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.beijing.goods.328credit', '3280钻石', '3280个钻石', 32800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.beijing.goods.648credit', '6480钻石', '6480个钻石', 64800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.beijing.goods.68credit', '680钻石', '680个钻石', 6800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.beijing.goods.6credit', '60钻石', '60个钻石', 600, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.beijing.goods.88credit', '880钻石', '880个钻石', 8800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.beijing2.goods.18credit', '180钻石', '180个钻石', 1800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.beijing2.goods.198credit', '1980钻石', '1980个钻石', 19800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.beijing2.goods.30credit', '300钻石', '300个钻石', 3000, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.beijing2.goods.328credit', '3280钻石', '3280个钻石', 32800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.beijing2.goods.648credit', '6480钻石', '6480个钻石', 64800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.beijing2.goods.68credit', '680钻石', '680个钻石', 6800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.beijing2.goods.6credit', '60钻石', '60个钻石', 600, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.beijing2.goods.88credit', '880钻石', '880个钻石', 8800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.chengdu.goods.18credit', '一大堆钻石', '180个钻石', 1800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.chengdu.goods.198credit', '一大袋钻石', '1980个钻石', 19800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.chengdu.goods.30credit', '一中堆钻石', '300个钻石', 3000, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.chengdu.goods.328credit', '一小箱钻石', '3280个钻石', 32800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.chengdu.goods.648credit', '一大箱钻石', '6480个钻石', 64800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.chengdu.goods.68credit', '一小袋钻石', '680个钻石', 6800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.chengdu.goods.6credit', '一小堆钻石', '60个钻石', 600, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.chengdu.goods.88credit', '一中袋钻石', '880个钻石', 8800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.shanghai.goods.198credit', '一大袋钻石', '1980个钻石', 19800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.shanghai.goods.19credit', '一大堆钻石', '180个钻石', 1800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
('com.shanghai.goods.30credit', '一中堆钻石', '300个钻石', 3000, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.shanghai.goods.328credit', '一小箱钻石', '3280个钻石', 32800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.shanghai.goods.648credit', '一大箱钻石', '6480个钻石', 64800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.shanghai.goods.68credit', '一小袋钻', '680个钻石', 6800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.shanghai.goods.6credit', '一小堆钻石', '60个钻石', 600, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
('com.shanghai.goods.90credit', '一中袋钻石', '880个钻石', 8800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.tianjin.goods.18credit', '一大堆钻石', '180个钻石', 1800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.tianjin.goods.198credit', '一大袋钻石', '1980个钻石', 19800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.tianjin.goods.30credit', '一中堆钻石', '300个钻石', 3000, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.tianjin.goods.328credit', '一小箱钻石', '3280个钻石', 32800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.tianjin.goods.648credit', '一大箱钻石', '6480个钻石', 64800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.tianjin.goods.68credit', '一小袋钻石', '680个钻石', 6800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.tianjin.goods.6credit', '一小堆钻石', '60个钻石', 600, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('com.tianjin.goods.88credit', '一中袋钻石', '880个钻石', 8800, NULL, 'F577FCEE9B0616A421096AA3A4E9F2AC', '2017-01-17 09:19:51', '2017-01-17 09:19:51'),
('id_001', '60元宝', '60元宝', 600, 'https://fvaccdn.firevale.com/images/goods_icons/024a4340b0610d47b892e44f57da909b.png', '32338E302CAE3892F299404671C52280', '2017-01-17 09:19:51', '2017-03-10 10:42:24'),
('id_002', '一大堆元宝', '300元宝', 3000, 'https://fvaccdn.firevale.com/images/goods_icons/8322ce89e195455e231b7068c7fa160a.png', '32338E302CAE3892F299404671C52280', '2017-01-17 09:19:51', '2017-03-10 10:42:57'),
('id_003', '一小袋元宝', '680元宝', 6800, 'https://fvaccdn.firevale.com/images/goods_icons/6cb32885f9a9c8dedd4fc36181a80ce1.png', '32338E302CAE3892F299404671C52280', '2017-01-17 09:19:51', '2017-03-10 10:43:05'),
('id_004', '一大袋元宝', '1980元宝', 19800, 'https://fvaccdn.firevale.com/images/goods_icons/9ef9f2fe6c47273a49119083dd997650.png', '32338E302CAE3892F299404671C52280', '2017-01-17 09:19:51', '2017-03-10 10:43:10'),
('id_005', '一小箱元宝', '3280元宝', 32800, 'https://fvaccdn.firevale.com/images/goods_icons/eaa3448dfcb0c7fa24ea0caaf2dda293.png', '32338E302CAE3892F299404671C52280', '2017-01-17 09:19:51', '2017-03-10 10:43:17'),
('id_006', '一大箱元宝', '6480元宝', 64800, 'https://fvaccdn.firevale.com/images/goods_icons/2c8f72bdeab006bf6c79eaf116d73adc.png', '32338E302CAE3892F299404671C52280', '2017-01-17 09:19:51', '2017-03-10 10:43:21'),
('Store9001', '天神月卡', '1张天神月卡', 3000, NULL, '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-17 09:19:50'),
('Store9002', '一小堆金币', '90个金币', 600, NULL, '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
('Store9003', '一大堆金币', '300个金币', 1800, NULL, '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
('Store9004', '一小袋金币', '900个金币', 6800, NULL, '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
('Store9005', '一大袋金币', '1680个金币', 19800, NULL, '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
('Store9006', '一小箱金币', '2680个金币', 32800, NULL, '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03'),
('Store9007', '一大箱金币', '5280个金币', 64800, NULL, '53A993ABE3A1CB110E1DC59AE557F5C9', '2017-01-17 09:19:50', '2017-01-19 11:26:03');
|)

Repo.all(App) |> Enum.each(fn(app) -> 
  app |> App.changeset(%{payment_callback: "http://127.0.0.1:4000/api/sdkpay/default_callback",
  has_mall: false, has_forum: false, restrict_login: false}) |> Repo.update!
end)

%RedisUser{email: "zhongxiaobin@firevale.com", encrypted_password: "$pbkdf2-sha512$160000$XBC9izsPHnce3kqllIpE8A$xh0TY1uYF3VKukY5fwyqsGEkLqvY.o.iIdaN536i2lSJp6Bnu4xNsu/FH243xuEv9UrLQXLOPmPetmi3hrmdmA", nickname: "zhongxiaobin", gender: "male", age: 1} |> RedisUser.save!
%RedisUser{email: "zhumingzhen@firevale.com", encrypted_password: "$pbkdf2-sha512$160000$c4oGViAQf4ANOPDYAjAnTg$KCikauke6I4K7BSB3Iy9KYwTrFxwaAIdLIv.p.eUsEy62fiIuPYcm4ZT14X5wNToFPpidVeW4oPfTWfTBz9MPw", nickname: "zhumingzhen", gender: "male", age: 1} |> RedisUser.save!
%RedisUser{email: "xiaobin@firevale.com", encrypted_password: "$pbkdf2-sha512$160000$ofJOLH.3vbHuma7t/DGQmQ$0wRciGKFbmyb6U077Flruk/LStLBa167Q5ejgZNXYxeEIquCTPfYr0AkapEQNWVOjtJ5rTu9n2bWJyLKXJsnKw", nickname: "逍遥", gender: "male", age: 1} |> RedisUser.save!
%RedisUser{email: "xiebing@firevale.com", encrypted_password: "$pbkdf2-sha512$160000$iH9w/vVpiR58wgv379WaOg$nS5OABJHfBOXXYjuSnXwhJXMaDdqnwE0vIQmPLFBCsWCxNgr02kfQ3PGSwx6tBCnsDQmluh/rB8zCMkxgcarwg", nickname: "流年", gender: "male", age: 18} |> RedisUser.save!

ForumManager.changeset(%ForumManager{}, %{forum_id: 1, user_id: 100001}) |> Repo.insert
ForumManager.changeset(%ForumManager{}, %{forum_id: 1, user_id: 100002}) |> Repo.insert
ForumManager.changeset(%ForumManager{}, %{forum_id: 1, user_id: 100003}) |> Repo.insert

Forum.changeset(%Forum{}, %{title: "战神大陆-iOS专区", active: true, app_id: "978A7D84040FE589ED0C76295131E43D"}) |> Repo.insert

ForumSection.changeset(%ForumSection{}, %{title: "综合讨论", sort: 5, active: true, forum_id: 1}) |> Repo.insert
ForumSection.changeset(%ForumSection{}, %{title: "攻略心得", sort: 4, active: true, forum_id: 1}) |> Repo.insert
ForumSection.changeset(%ForumSection{}, %{title: "转帖分享", sort: 3, active: true, forum_id: 1}) |> Repo.insert
ForumSection.changeset(%ForumSection{}, %{title: "玩家原创", sort: 2, active: true, forum_id: 1}) |> Repo.insert
ForumSection.changeset(%ForumSection{}, %{title: "问题求助", sort: 1, active: true, forum_id: 1}) |> Repo.insert

ForumPost.changeset(%ForumPost{}, %{title: "测试文章1", content: "测试内容1", active: true, forum_id: 1, section_id: 1, user_id: "100001"}) |> Repo.insert
ForumPost.changeset(%ForumPost{}, %{title: "测试文章2", content: "测试内容2", active: true, forum_id: 1, section_id: 1, user_id: "100001"}) |> Repo.insert
ForumPost.changeset(%ForumPost{}, %{title: "测试文章3", content: "测试内容3", active: true, forum_id: 1, section_id: 1, user_id: "100001"}) |> Repo.insert
ForumPost.changeset(%ForumPost{}, %{title: "测试文章4", content: "测试内容4", active: true, forum_id: 1, section_id: 1, user_id: "100001"}) |> Repo.insert
ForumPost.changeset(%ForumPost{}, %{title: "测试文章5", content: "测试内容5", active: true, forum_id: 1, section_id: 1, user_id: "100001"}) |> Repo.insert
ForumPost.changeset(%ForumPost{}, %{title: "测试文章6", content: "测试内容6", active: true, forum_id: 1, section_id: 1, user_id: "100001"}) |> Repo.insert
ForumPost.changeset(%ForumPost{}, %{title: "测试文章7", content: "测试内容7", active: true, forum_id: 1, section_id: 1, user_id: "100001"}) |> Repo.insert
ForumPost.changeset(%ForumPost{}, %{title: "测试文章8", content: "测试内容8", active: true, forum_id: 1, section_id: 1, user_id: "100001"}) |> Repo.insert
ForumPost.changeset(%ForumPost{}, %{title: "测试文章9", content: "测试内容9", active: true, forum_id: 1, section_id: 1, user_id: "100001"}) |> Repo.insert
ForumPost.changeset(%ForumPost{}, %{title: "测试文章10", content: "测试内容10", active: true, forum_id: 1, section_id: 1, user_id: "100001"}) |> Repo.insert
ForumPost.changeset(%ForumPost{}, %{title: "测试文章11", content: "测试内容11", active: true, forum_id: 1, section_id: 1, user_id: "100001"}) |> Repo.insert
ForumPost.changeset(%ForumPost{}, %{title: "测试文章12", content: "测试内容12", active: true, forum_id: 1, section_id: 1, user_id: "100001"}) |> Repo.insert

ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容1", floor: 1, post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容2", floor: 2, post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容3", floor: 3, post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容4", floor: 4, post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容5", floor: 5, post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容6", floor: 6, post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容7", floor: 7, post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容8", floor: 8, post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容9", floor: 9, post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容10", floor: 10, post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容11", floor: 11, post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容12", floor: 12, post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容13", floor: 13, post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容14", floor: 14, post_id: 1, user_id: "100001"}) |> Repo.insert


AdminSetting.changeset(%AdminSetting{}, %{name: "forum_post_hot_limit", value: "5", memo: "论坛热帖时段内回复数(热帖阀值)", group: "basicInfo", active: true}) |> Repo.insert
AdminSetting.changeset(%AdminSetting{}, %{name: "forum_post_hot_hours", value: "12", memo: "论坛热帖检查时间(小时)", group: "basicInfo", active: true}) |> Repo.insert
AdminSetting.changeset(%AdminSetting{}, %{name: "keyword", value: "色情,法轮功,江泽民", memo: "网站敏感词过滤", group: "keyword", active: true}) |> Repo.insert

Mall.changeset(%Mall{}, %{title: "战神大陆商城", active: true, app_id: "978A7D84040FE589ED0C76295131E43D"}) |> Repo.insert

MallGoods.changeset(%MallGoods{}, %{id: "1010001", name: "经典黑色T恤", pic: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3164574553,770329306&fm=23&gp=0.jpg", description: "经典黑色T恤", active: true, currency: "CNY", price: 12000, postage: 1000, stock: 100, user_id: "100001", app_id: "978A7D84040FE589ED0C76295131E43D"}) |> Repo.insert

MallGoods.changeset(%MallGoods{}, %{id: "1010002", name: "经典白色T恤", pic: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491977331445&di=81098768e236f3090b3fcd4f866e7a2b&imgtype=0&src=http%3A%2F%2Fwww.spolo.cn%2Fuserfiles%2Fimages%2Fproduct%2F1%2F11%2F2.jpg", description: "经典黑色T恤", active: true, currency: "CNY", price: 9900, postage: 1000, stock: 100, user_id: "100001", app_id: "978A7D84040FE589ED0C76295131E43D"}) |> Repo.insert

MallGoods.changeset(%MallGoods{}, %{id: "1010003", name: "经典灰色T恤", pic: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491977358176&di=13043c1fe2aec64f9d7d7fadaf9e56ee&imgtype=0&src=http%3A%2F%2Fimg4.vipshop.com%2Fupload%2Fmerchandise%2F40504%2FHUNTCITY-3321002063-1.jpg", description: "经典黑色T恤", active: true, currency: "CNY", price: 19900, postage: 1000, stock: 100, user_id: "100001", app_id: "978A7D84040FE589ED0C76295131E43D"}) |> Repo.insert

MallGoods.changeset(%MallGoods{}, %{id: "1010004", name: "经典红色T恤", pic: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=928281993,479971005&fm=23&gp=0.jpg", description: "经典黑色T恤", active: true, currency: "CNY", price: 11900, postage: 1000, stock: 100, user_id: "100001", app_id: "978A7D84040FE589ED0C76295131E43D"}) |> Repo.insert

UserAddress.changeset(%UserAddress{}, %{ name: "钟楼",mobile: "13110234567", area: "福建福州", area_code: "350001",address: "工业路",user_id: "100001"}) |> Repo.insert

MallOrder.changeset(%MallOrder{}, %{ id: "A10000010",platform: "ios",user_ip: "127.0.0.1", goods_name: "经典灰色T恤", price: 1100, final_price: 1100, currency: "CNY", paid_type: "wechat", postage: 500,user_id: "100001", app_id: "978A7D84040FE589ED0C76295131E43D",address: %{name: "钟楼" , mobile: "1101101101101", area: "福建福州", address: "工业路", area_code: "3500001" }}) |> Repo.insert

MallOrderDetail.changeset(%MallOrderDetail{}, %{ goods_name: "经典红色T恤",goods_pic: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=928281993,479971005&fm=23&gp=0.jpg", price: 1100, final_price: 1100,amount: 1,mall_goods_id: "1010001", mall_order_id: "A10000010"}) |> Repo.insert

MallOrderDetail.changeset(%MallOrderDetail{}, %{ goods_name: "经典灰色T恤",goods_pic: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=928281993,479971005&fm=23&gp=0.jpg", price: 1100, final_price: 1100,amount: 1,mall_goods_id: "1010003", mall_order_id: "A10000010"}) |> Repo.insert



MallOrder.changeset(%MallOrder{}, %{ id: "A10000011",platform: "ios",user_ip: "127.0.0.1",goods_name: "经典灰色T恤", price: 1100, currency: "CNY", final_price: 1100, paid_type: "wechat",postage: 500,user_id: "100001", app_id: "978A7D84040FE589ED0C76295131E43D",address: %{name: "钟楼2" , mobile: "1101101101101", area: "福建福州", address: "工业路", area_code: "3500001" }}) |> Repo.insert

MallOrderDetail.changeset(%MallOrderDetail{}, %{ goods_name: "经典红色T恤",goods_pic: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=928281993,479971005&fm=23&gp=0.jpg", price: 1100, final_price: 1100,amount: 1,mall_goods_id: "1010001", mall_order_id: "A10000011"}) |> Repo.insert


MallOrder.changeset(%MallOrder{}, %{ id: "A10000012",platform: "ios",user_ip: "127.0.0.1",goods_name: "经典灰色T恤", price: 1100, currency: "CNY", final_price: 1100, paid_type: "wechat", postage: 500,user_id: "100001", app_id: "978A7D84040FE589ED0C76295131E43D",address: %{name: "钟楼" , mobile: "1101101101101", area: "福建福州", address: "工业路", area_code: "3500001" }}) |> Repo.insert

MallOrderDetail.changeset(%MallOrderDetail{}, %{ goods_name: "经典红色T恤",goods_pic: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=928281993,479971005&fm=23&gp=0.jpg", price: 1100, final_price: 1100,amount: 1,mall_goods_id: "1010001", mall_order_id: "A10000012"}) |> Repo.insert

MallOPLog.changeset(%MallOPLog{},%{ mall_order_id: "A10000010",  status: 0, changed_status: 1, content: %{ transaction_id: "20171010101201"} }) |> Repo.insert
MallOPLog.changeset(%MallOPLog{},%{ mall_order_id: "A10000010",  status: 1, changed_status: 2, admin_user: "zhumingzhen@firevale.com" }) |> Repo.insert

Elasticsearch.index(%{ index: "mall",type: "goods",
            doc: %{ id: "1010001",app_id: "978A7D84040FE589ED0C76295131E43D",name: "经典黑色T恤",  description: "经典黑色T恤", user_id: 100001},
            params: nil,
            id: "1010001"
          })

Elasticsearch.index(%{ index: "mall",type: "orders",
            doc: %{ id: "A10000011",platform: "ios",user_ip: "127.0.0.1",goods_name: "经典灰色T恤",  paid_type: "wechat", postage: 500,user_id: 100001, app_id: "978A7D84040FE589ED0C76295131E43D",
            address: %{name: "钟楼" , mobile: "1101101101101", area: "福建福州", address: "工业路", area_code: "3500001" }},
            params: nil,
            id: "A10000012"
          })


AdminUser.changeset(%AdminUser{}, %{account_id: "xiaobin@firevale.com", user_id: 100003, admin_level: 1}) |> Repo.insert
AdminUser.changeset(%AdminUser{}, %{account_id: "zhongxiaobin@firevale.com", user_id: 100001, admin_level: 1}) |> Repo.insert
AdminUser.changeset(%AdminUser{}, %{account_id: "zhumingzhen@firevale.com", user_id: 100002, admin_level: 1}) |> Repo.insert
AdminUser.changeset(%AdminUser{}, %{account_id: "xiebing@firevale.com", user_id: 100004, admin_level: 1}) |> Repo.insert
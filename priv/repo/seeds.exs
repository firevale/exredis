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

require ImportFvacModel

alias Acs.RedisUser
alias Acs.Repo
alias Acs.App
alias Acs.AdminUser
alias Acs.Forum
alias Acs.ForumSection
alias Acs.ForumPost
alias Acs.ForumComment
alias Acs.User
alias Acs.ForumManager

require Logger

Redis.flushdb()

data = "g3QAAAARZAAKX19zdHJ1Y3RfX2QAGEVsaXhpci5GdmFjLk1vZGVsLkNsaWVudGQACGJpbmRpbmdzdAAAABRkAAVhbnpoaXQAAAACZAAHYXBwX2tleW0AAAAeMTQzODUzNTgxNk04OXRnQTVCa3k3ZTR2NEZIOXBTZAAKYXBwX3NlY3JldG0AAAAYcDdsMkVzQURObVY5MnFUQnVSb3diOEFqZAAFYmFpZHV0AAAAA2QABmFwcF9pZG0AAAAHNjQ2NDk4MGQAB2FwcF9rZXltAAAAGFV1ZEdtVVpkeFhBZktrdHNJVmVkUThnb2QACmFwcF9zZWNyZXRtAAAAIHpRZ3RIelRYY202QVBqSEZtaHd5azg3bnRPTlFxeWZPZAACY2N0AAAAA2QABmFwcF9pZG0AAAAGMTAyNTQ3ZAAHYXBwX2tleW0AAAAgNzUyNzlhNWU2ODM4NDJkY2FkMjI1YzRiNjExZDYwMjNkAAdwYXlfa2V5bQAAACBmMzhjOTc1OGM1NWM0MzI0YjVkNjk1NTE3NDliMTg4OGQAB2Nvb2xwYWR0AAAABGQABmFwcF9pZG0AAAAKNTAwMDAwMTI5NGQAB2FwcF9rZXltAAAAIDFkNzNiMGJkNDNjYTRkOWE4Mjk5YmVkMTVjMWE1NzA1ZAAMcGF5X3ByaXZfa2V5bQAAAyxNSUlDV3dJQkFBS0JnUUNXZmJ5U1pCQU9BSkF1SFRSd2tzYjBuZ1VCd0hYb2lCQlZSaTFLS0pXQndVT2FXNUNSM1NpSXg4RXlRNUdZNFhYKzZkUXI1Y2U2ZHJaSkVSWXVYeHpPeTJHdENybHNjbGVvc2JpS29zdEF4RnFXNUVNeFhubThLZFREajJCb25FZVBoeEVqSXAvcDRWbU5BbFJBWXc2TVo2UFpHRThNQXN0YllpSkFnWUgxUndJREFRQUJBb0dBY29uUWREcmtYVVBnZUxpUnFQeU5vTENFYndqa3RNNmFYOHpCdTZlWDR1SU5hZlkyMmszUkJBbkU2VlMwQS8vVnB1YWhMYWY5azlXMmQzWWh3N2x3V21YdzIwZlM1azdZMXhiTE5pNVk1M252VVd1QmxOOWFkWkNlYVZhbmhPUm5XT0IvaGk0VHUzTGpSYmRzSVBGVCtFRlRyblhhaExNMGI2YU5VcWUwWkVFQ1FRRGs0S2F0c1k0bkJhOHNrL2ZvTy9SWnk1UWdlQWdsZGNKbjRvemNuUXpFSVJYMDVoRWRDWWpManh5aTJIMTRuclp3NHBOdUVSM1dPL1o1a01uM0ZVdGpBa0VBcUZNZGVkSjE5SnZrQWQzdFM3OVpJVHY1SklNWjhiTkZOUmhPVW05MVBVdjVyS1loTDBzSGE1d1VyT2tPcm94ZEJQRG1zRkJGT3RlNWc4ajN6dW85elFKQWJZYmIvSTdWV2ZNc2F3YThRZFEvRUtHTlZ5UlpzYU55enNmcFpNRjdGSGhJeTVNMWFWSGd0cGpidVVva2NRNXllLzdSVW9DNmFJVDFaQ05Yb3ZmN3hRSkFNbW82Z050Tll3Y3lBbkVpK3JZRUR4VTBhUUF2VEJwQ2wwV0JaK1ZrT3dpL2JqdVA0dWRaQUowT0FFQUptclFGeEU0VytpWUFwa0FvbTFVZEM4ZFMzUUpBVExGdDVzU1pzSHAzRU92eTV4ajlJSlZHa1VRZHpmNHhtRTkrRk53RUNoZytqc0M5czF6M2RiM1AzdHQxUFFwbTNYczhqZ29BeTZDTmpkMzd3OXdmQ3c9PWQAC3BheV9wdWJfa2V5bQAAANhNSUdmTUEwR0NTcUdTSWIzRFFFQkFRVUFBNEdOQURDQmlRS0JnUUNseSsyallaZnUyMmd2aWwzcjByYzBtbUZQN3FSdEhlNEM4K2ZRVGJvMXBuRVdXeS9mYmgyb1FBWUc4ZTZCNUNoc0p5bm55VE9ScXlkcWR5TTYvb0lVa0QvbGZ0YnorK204ZDRRVDVKOWlaeTBTV2s4azlWeFBFd1BjU2loZ3BqS2FoT2pGbmtBa1M2RjRHd3kySnVvS3lkYUVra2xaWG9kNXhaNyt0Q0grRVFJREFRQUJkAAdkb3duam95dAAAAANkAAZhcHBfaWRtAAAABDM1MjlkAAdhcHBfa2V5bQAAAAhyMHpnUTg2M2QACmFwcF9zZWNyZXRtAAAADENwOWFNcmQxVzI2RGQAA2h0Y3QAAAADZAAJZ2FtZV9jb2RlbQAAAA0yODc3NTMxMzY0MTAzZAAIcHJpdl9rZXltAAADTE1JSUNkUUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQWw4d2dnSmJBZ0VBQW9HQkFNZkpQU09yQUxrVWZlQTBDMmt4dS84Um05L1NQOFJtdlR6d2Ryd2s2djkrNkZCYk05VEVjTjBYa2E4UWtaRkVWN215U1NqSUtYKzNuS2lRZGphQlRXOGhyZDlsU2ZDTzVJdkZ2eGp6Z1l6MTdUMmQvYzdzQ01VeVhvSXltZWhZRWU5N0Y1K3ZSbXc4M3l6RGo4VE1NMWVCK2VZVjVNeWRIS21IeVZJMEFHb0RBZ01CQUFFQ2dZQUlJdVR2aCs1T20wd0pEbldNZ2k4QzAwZkMxTUF1RW5VUWYwYUdvUVpGQTNrWWxLNUdzdjFaczdVR0tTbVVmZkVJcWY4YXZ4UVpsSE8zMWJKS3cvZFFSYzEwWFNsaEVRNzV3aktrN0l0ME1XdUhZZlhrUDZHWHRrZkdrYmd0QVZPTTAxNnBqUGhRbHZkRnBnVGVqS2JWTlZiMmpFcFphVU13Um9wcXpGL1JXUUpCQVBxTG14RWVmdmxicUhhZFdOZUV4TFhoOWdVYnJGZktEMHRpd2phVHJkUGNiK0hRWUNLckp4TGZ0aW9sd0FOcHhtc2RvK2JSRWt1dm1UOFY3UXhlSmRVQ1FRRE1JcnNEaDJmQ09rRVpNRGpaZXptS0JhTzV3WmwzQVh1eGd1ajlNeVRLanVDc2FpdFlvZ2JLcTZ0cnplaWhoV0pFQlRtNERoanR0aklyRjVoTVQ0UjNBa0VBb2Nta3lOazRoUzE3QzUxdjBUd2JDcGh2bGJ6WS9aZXRhTEROV1JEa0h2c3FCRmZhdklocEl2YnpXeVFsYWc3VDRqZXhyMHN5MVV6L1dJMkFGWXgyUVFKQVAwVndnNnAvYllNUzFGVE8raEdvaHZBeWpBdkduazAyWXBHNTEyajN1VlRKckljSHdtUU9DTmxtdTNaSjZXNW5RNy8rNE41MXVaQWtRcGtBbW41M0J3SS9EYkRRUUc5WUptaGNoVzMwVU5VTEhMNjlacjRUT2pkb3dITXdKSmhvZ2Zha3k4VXNDUlFlY2JtT3BOVmpTWThVN0g5ZVQ1bGdLOFdodXlYb00xcldkAAdwdWJfa2V5bQAAANhNSUdmTUEwR0NTcUdTSWIzRFFFQkFRVUFBNEdOQURDQmlRS0JnUURiUkx6V2ZDRDRwUWIxbWplR0x5Nmd3K0FmT0taMWRwTmJNVXlabWwrcDNzdFRTZFR5SEhwa3VQUHNhT3FzVDlnRkRTbVh6NUtSQnQ0dzZLQ2VMai9SNjFLQTVybU1KaXBEblNKVjE5a2xkMHo2Tlc0N2tpRVFIc2xhYWxEQkNTVDk0VFVJY0N6amhhaUczeVRDaERDVEZvM3Y0N3F5dDZqM1l2VnBpaDhVTlFJREFRQUJkAAZodWF3ZWl0AAAABWQABmFwcF9pZG0AAAAIMTAyOTAxMTRkAAdhcHBfa2V5bQAAA1BNSUlDZGdJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0FtQXdnZ0pjQWdFQUFvR0JBSmNlT3dUU2E3VVhyZVVHNzZ3d0JZSzBzNjA4YUtGeUppWmx4TjdyMityQzBCRTRqUGVzWGIweUpiZjNWUGowc2FGeU40ZHl0anAraE1MNzNtZG5CeHRKMnROWkFwSnZ6TkkyYnhVVytaN0FlMUZ1KzZNcExLbG5aZ1k4N2s3U1pCU05hdFY0bFlXZE1BQ3J4OEZpY1RsdXUybTRpVlhGVmpUNFhGSFl5cDNMQWdNQkFBRUNnWUJUYVY1T1JROHFnQTErRXh3THdOM3B6WEEzdU5aUDlyL1VCZXhxMTJrbDVhNFBNMVdzQjdvZUNpWURxME45dnlLazZIUjZFUGxBeEVEbmx6cWxmSnJRdmdwWDg2SDZiSEVRVjJ6U1BUVkhhcDhDNXU1SWxrWEJONVZGSnYvS3dwME5vbnBTL1lGZFRjdmRkaC9DQ3ovSS8zeWl2UHpMRkFXMjFUN3pzQUdkUVFKQkFNWGk0cHRNVVp2dnQrVHYvWFdqK0Z4aG5qd09JTnV0TGtubm1zYmdvT2F5RnNRbFhZQTgwVGNGeDVrNUR5YU9aTUVFV1pYODFRNTV0Y1RlaSsrcStYc0NRUUREZjA2NCtJeWVSKzRrRGZMNHZONktOcTBjK3lEZEs4QWw1ZEtEWFpDd3NIbWlxUGxFTWJ2SGR0Q0JFMjN5NVdRUDFQZnJvcWN0dUN3UnFrdGNNdlB4QWtFQXdPMm1UeENHVkVqUCtsVjh3SEFmMlRtWFF5Zm5JeVhpQmszVzJlVHhHbG93MWdVejlxM1VzQmRqZFdCckJBVTU5L0Vjd3AyZ3Z4OHNkNGNkMlluUTl3SkFHM01hcUpvdGxHUGhLaXJUUE4yNEdZd0h6cFBzVDJHL1B4TC85ZllEUk92aWlGWlZlWi9LRC8yODFRTFhZMDJXT1NyY0RMZnY1Vm1BeHBJMHRxTm80UUpBUDFIWEpPckNzSXh3NzkvemlUdGY3UjJsSXRLZTY4clcrNVdoZ1l1amg4VnVvN2NVaHhNZzl0N1hjd1l3a1RMb0FXeFJqMXpvWG44OVR2NENGWFFTZEE9PWQABnBheV9pZG0AAAASOTAwMDg2MDAwMDI3NTQ3MTkzZAAMcGF5X3ByaXZfa2V5bQAAAcxNSUlCVkFJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0FUNHdnZ0U2QWdFQUFrRUF6amoreXRlUDErRU5vS25FYmZqSmNNVHhHSWNINUdqeGRjOXVnc0FMcjRtNitObU95U0Zqd2I4eWVIamViUWZlQi9yb09Bem9jb1Z1UHdHdGwwRWd0UUlEQVFBQkFrQnpKN2gvcEdlYWNQMmZIYTJtaXlwUlltZ08vamdWLzlQMXFXTllkODBPczZXcjE0UG5NVms3cHpqZTJJVndzcDNwMmtxdDZ1VzhDVHRzZzg0VTdJNXhBaUVBNXZGM3ljeHRWRUpQSUN6MUhudDFVSGlSUWlYbTZTNHBsWXJQL0ZGOUZnTUNJUURrbU9kaHFiUE9SRUVkaDJta0xZSC9jTDV0azB4eUcvMDN4Wk5wb3JOczV3SWhBS2djNE1GU2djZVRXWHdubmV1cG5YV052dGZ6TlV0TElsUk1yeWlTdlVhM0FpQjdmNWZSaldzVWpvOVhNcWNDQ1l2bndyTStZNHV6UWlmRkQ3cWFJVW9xRlFJZ05CS29ma01aY2F6YmU3R3pRWXBrUnpBNW9oMS9ZamdTZ2hTMk5KQWI5TzA9ZAALcGF5X3B1Yl9rZXltAAAAgE1Gd3dEUVlKS29aSWh2Y05BUUVCQlFBRFN3QXdTQUpCQU00NC9zclhqOWZoRGFDcHhHMzR5WERFOFJpSEIrUm84WFhQYm9MQUM2K0p1dmpaanNraFk4Ry9Nbmg0M20wSDNnZjY2RGdNNkhLRmJqOEJyWmRCSUxVQ0F3RUFBUT09ZAAGaXlvdXhpdAAAAANkAAdhcHBfa2V5bQAAACBiNWU0MWUwYWU0YTNjOWFiMmRjM2NhYjNiNzQ4OGE2NmQACWNsaWVudF9pZG0AAAAINzk1NTA1MDhkAA1jbGllbnRfc2VjcmV0bQAAACBhZjZjNjc2ZGRmNjI0OGNiYWMwNTc3MDA4ODAyNmZkMGQABmxlbm92b3QAAAACZAAGYXBwX2lkbQAAABQxNTA2MDgwNDQzNTgyLmFwcC5sbmQAB2FwcF9rZXltAAADLE1JSUNXd0lCQUFLQmdRRENxTDVYQS9ZMUtDWUUrVjVzQU8rdjVhYlJDU25jbG94VWVKN1crR2xXYkRhK1N1Qk01aXIvbFhHcEp5UWRaTGgzS1F4K1Zyd2RoQUQ0Z0hVUnozNndBYkxzT05NbFFyZWk2NW1qTjBLZGlPNFhzNnVCd1Z0V3lOUHRZczBFTlJ5K01NU2xkaUV0MUVwcXNHSDhpL2VqRzJrcWEvNlZOM1pCa0JmOXFWaE8yd0lEQVFBQkFvR0FKYitkY2JobDlYYjhzSGcvVkVoMk1yRWhRV1k2aFBsNDZ5U2RBT2taWEZZTjQ2Y1hpaklVWW8zemhhNytkT2pFVU85WDZlUWVCTWRGZk90RVNKanBZeGUyUTdmMzdPREpiRWJQYVRPNTFKamFtSGxpVzQxSWVFTlFLanduT3RFSjRwdnlYTzNsVXVxN1ZUOGZ6cFRZWEw1Q1ArLys1QSs2RXNxaHQ0bVRVeUVDUVFEcGdaZ2V0ZWw2dUU5aHBZZVNmVHNFMmNMemFxTGJ0ZHlMSVpyWW9pRXJNVHpadTk2d1FqcWozZGlSQy9mSjdVdkN4OWhiMnBEM0F1dGUvTWtLQTFFUkFrRUExV2tvSlJSTEErclc0MVhTaW9zK3VsSTVlajB2anNTd1A5SzR4N3htNlRGNFBSY2tISUJ4R213MWFnYWo0RXZ2amsvYmcrMWpGL3JwQUY2ZkYrNmhLd0pBZWpFbDRKUkRQTVBzVG1YbnZ3R25lODlVbERxdVJKa3pjdDgvLzdNLzlqRks3WW5CYTYwTXNLbXI1YU5FcExkM21OTXBaay9HNG12MXJYeE0yOStHY1FKQVl6dlVpUGxZc0dlZ3FIRWR4NEpjRnJOcE9xZjgxendxWUdNUnZQNmtNOGJuRERFWWY1QlNCMkZOclJHTlhoeXhOZEY0VjI0bzU5dXFRSnUvQ3BmUnBRSkFjWVZ4K25IWjgyWFdnS2oxa2pMdmFxbWc4N1NjOUFZNm9GbmpEbXhGTit6aFRhSUdxQld3bDhTV21DSmMzMnJja3FZNktOakVXbFUwSDIydmxQUVdOQT09ZAAGbXVtYXlpdAAAAAJkAAZhcHBfaWRtAAAABjc4MTU0NmQAB2FwcF9rZXltAAAARjk2OTEzNTQ4NzZiN2M1YTF0ZTJBSXFidE52NEdjRVhIa2lwd2RLS0dMQzg3ZmVDWms1aHBqTzFzamdSeXlMVmQ2dWlMd0FkAARvcHBvdAAAAANkAAZhcHBfaWRtAAAABDM5NjRkAAdhcHBfa2V5bQAAABkxMGpaQ2dnOGl1UFdrb29DU1NPUzBrT3NzZAAKYXBwX3NlY3JldG0AAAAgNjE3NWE5ODZGNDg1OGQ4MzVCYjhBRmM1YTlDMjYxMjZkAAVxaDM2MHQAAAADZAAGYXBwX2lkbQAAAAkyMDI1Njc2NDZkAAdhcHBfa2V5bQAAACBiYzUyYTE2OTI1Y2Q5YTU1ZjQ3NWJmZjg0OTZjYTk4OWQACmFwcF9zZWNyZXRtAAAAIDEwMTZiYmY2NzM4MmVmNWNiNTgwNWNmYmQ0NTg0NTI0ZAADcXh6dAAAAAJkAAZhcHBfaWRtAAAADTIwMTUwODIwLU5UWlNkAAdhcHBfa2V5bQAAABRmbnFvcDNnbWc1c3dxeEBmYnVxd2QABXNvZ291dAAAAARkAAZhcHBfaWRtAAAABDEwMTFkAAdhcHBfa2V5bQAAAEAyYWVhZTE2MjYyNGI5MGYzMzU5OTNlM2IzZGIxNzYzMTM0N2Y3MDhjMGFkMmY5YzRjYmM4MDk5NTJkZWNkZDk3ZAAKYXBwX3NlY3JldG0AAABAMzIwNWJkNjY1NjhlNjc5ZDAwM2E5OWQxMGIwOTZmN2MxYWJjMmY1ZjRmMGE3YTAzZGYxZWYxODljOTg4OGFhM2QAB3BheV9rZXltAAAAJntENEE4NjBFQS0wQTczLTRDQzYtQjQ5Qy1CNkMxQUIxMzQwQUV9ZAACdWN0AAAAAmQABmFwcF9pZG0AAAAGNTU3MDU0ZAAHYXBwX2tleW0AAAAgYzdjMTAyNTQ4YjdjNjI1NDBiNGEwMWIwNmY5OGYzNzRkAAR2aXZvdAAAAANkAAZhcHBfaWRtAAAAIDBiYWUwNDQ5ZmMyZTg4MmY3ZTUyOTc2ZDBkMDIxZmU1ZAAFY3BfaWRtAAAAFDIwMTUwODA3MTE1MzMwMjkxMjI3ZAAGY3Bfa2V5bQAAACBjNDgwNWQwNmUyYzRjNDIwM2Q1ZmNjMDNmMzQxYmY3ZWQAA3dkanQAAAADZAAGYXBwX2lkbQAAAAkxMDAwMjgwOTlkAAdhcHBfa2V5bQAAACAwNmJkMTNhZDg1N2RiMDgyY2NkODYwMTZkYWM0Nzg3N2QAB3JzYV9rZXltAAAA2E1JR2ZNQTBHQ1NxR1NJYjNEUUVCQVFVQUE0R05BRENCaVFLQmdRQ2Q5NUZuSkZoUGlucE5pRS9oNFZBNmJVMXJ6UmE1K2EyNUJ4c25GWDhUenF1V3hxRENvZTR4RzZRS1hNWHVLdlY1N3RUUnB6Um8yamV0bzQwZUhLQ2x6RWdqeDlsVFlWYjJSRkhIRldpby9ZR1RmbnFJUFRWcGk3ZDd1SFkrMEZaMGxZTDVMbFc0RTIrQ1FNeEZPUFJ3ZnFHek1qczFTRGxIN2xWckxFVnk2UUlEQVFBQmQABnhpYW9taXQAAAADZAAGYXBwX2lkbQAAABMyODgyMzAzNzYxNTE3MzQzNzcyZAAHYXBwX2tleW0AAAANNTQyMTczNDMzNTc3MmQACmFwcF9zZWNyZXRtAAAAGHBaTzhrdmVUbXNiUjNtb3U3VytlQ3c9PWQABXlvdWt1dAAAAARkAAZhcHBfaWRtAAAABDE4NjdkAAdhcHBfa2V5bQAAABAyZjgwMmNmMWE3MzZmZjM5ZAAKYXBwX3NlY3JldG0AAAAgZDM5MzIwYmNkZTEyM2VkZTdiNDY5ZjgyY2UxYWIwOTBkAAdwYXlfa2V5bQAAACBlYTQ4OTAwNDBlZmFmNTM5MDliMmY1MjUwZTNmZTEyN2QAA3l5aHQAAAAEZAAGYXBwX2lkbQAAAAUxMTA1M2QAB2FwcF9rZXltAAAAEGdqMk93d044aGU3UzMyNjdkAAZwYXlfaWRtAAAACjUwMDA0NjI2MTdkAAdwYXlfa2V5bQAAAKBRVVkzTWpaRU1ETTNPVU5DT0RWR016UkJNalpEUmpSRE5VRXdNMEUwTURJME1UQTBOMEZFTmsxVVVYcE5SRkUwVDBSQmVFMVVVVEJPVkVrMFRWUk5kMDE2WTNKTlZGa3pUMVJyTkUxVVp6Rk5SRkUwVFZSak1rMTZWWHBPVkdOM1RrUmpOVTU2VFROUFJFMHpUVVJSTTA1NmF6Uk5lbGt6ZAAKY3JlYXRlZF9hdGEAZAAFZ29vZHN0AAAAB20AAAAJU3RvcmU5MDAxdAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAACVN0b3JlOTAwMWQABG5hbWVtAAAADOWkqeelnuaciOWNoWQABXByaWNlYgAAC7hkAAtwcm9kdWN0X2lkc3QAAAAEZAAGY2NwbGF5bQAAAAYxMDA4OTJkAAdjb29scGFkbQAAAAExZAAGbGVub3ZvbQAAAAQ5MjE2ZAADeXlobQAAAAExZAAFdGl0bGVtAAAAEDHlvKDlpKnnpZ7mnIjljaFtAAAACVN0b3JlOTAwMnQAAAAGZAAIY3VycmVuY3ltAAAAA0NOWWQAAmlkbQAAAAlTdG9yZTkwMDJkAARuYW1lbQAAAA/kuIDlsI/loIbph5HluIFkAAVwcmljZWIAAAJYZAALcHJvZHVjdF9pZHN0AAAABGQABmNjcGxheW0AAAAGMTAwNzczZAAHY29vbHBhZG0AAAABMmQABmxlbm92b20AAAAEOTU0NmQAA3l5aG0AAAABMmQABXRpdGxlbQAAAAs5MOS4qumHkeW4gW0AAAAJU3RvcmU5MDAzdAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAACVN0b3JlOTAwM2QABG5hbWVtAAAAD+S4gOWkp+WghumHkeW4gWQABXByaWNlYgAABwhkAAtwcm9kdWN0X2lkc3QAAAAEZAAGY2NwbGF5bQAAAAYxMDA4NDhkAAdjb29scGFkbQAAAAEzZAAGbGVub3ZvbQAAAAQ5NTQ3ZAADeXlobQAAAAEzZAAFdGl0bGVtAAAADDMwMOS4qumHkeW4gW0AAAAJU3RvcmU5MDA0dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAACVN0b3JlOTAwNGQABG5hbWVtAAAAD+S4gOWwj+iii+mHkeW4gWQABXByaWNlYgAAGpBkAAtwcm9kdWN0X2lkc3QAAAAEZAAGY2NwbGF5bQAAAAYxMDA4NDlkAAdjb29scGFkbQAAAAE0ZAAGbGVub3ZvbQAAAAQ5NTQ4ZAADeXlobQAAAAE0ZAAFdGl0bGVtAAAADDkwMOS4qumHkeW4gW0AAAAJU3RvcmU5MDA1dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAACVN0b3JlOTAwNWQABG5hbWVtAAAAD+S4gOWkp+iii+mHkeW4gWQABXByaWNlYgAATVhkAAtwcm9kdWN0X2lkc3QAAAAEZAAGY2NwbGF5bQAAAAYxMDA4NTBkAAdjb29scGFkbQAAAAE1ZAAGbGVub3ZvbQAAAAQ5NTQ5ZAADeXlobQAAAAE1ZAAFdGl0bGVtAAAADTE2ODDkuKrph5HluIFtAAAACVN0b3JlOTAwNnQAAAAGZAAIY3VycmVuY3ltAAAAA0NOWWQAAmlkbQAAAAlTdG9yZTkwMDZkAARuYW1lbQAAAA/kuIDlsI/nrrHph5HluIFkAAVwcmljZWIAAIAgZAALcHJvZHVjdF9pZHN0AAAABGQABmNjcGxheW0AAAAGMTAwODUxZAAHY29vbHBhZG0AAAABNmQABmxlbm92b20AAAAEOTU1MGQAA3l5aG0AAAABNmQABXRpdGxlbQAAAA0yNjgw5Liq6YeR5biBbQAAAAlTdG9yZTkwMDd0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAJU3RvcmU5MDA3ZAAEbmFtZW0AAAAP5LiA5aSn566x6YeR5biBZAAFcHJpY2ViAAD9IGQAC3Byb2R1Y3RfaWRzdAAAAARkAAZjY3BsYXltAAAABjEwMDg1MmQAB2Nvb2xwYWRtAAAAATdkAAZsZW5vdm9tAAAABDk1NTFkAAN5eWhtAAAAATdkAAV0aXRsZW0AAAANNTI4MOS4qumHkeW4gWQAAmlkbQAAACA1M0E5OTNBQkUzQTFDQjExMEUxREM1OUFFNTU3RjVDOWQABG5hbWVtAAAAEOaImOelniBbYW5kcm9pZF1kABBwYXltZW50X2NhbGxiYWNrbQAAACpodHRwOi8vcGF5LmFkY29nLmZpcmV2YWxlLmNvbS9wYXkvZmlyZXZhbGVkABlwbGF0Zm9ybV9wYXltZW50X2NhbGxiYWNrdAAAAANkAAdhbmRyb2lkbQAAABBodHRwOi8vbG9jYWxob3N0ZAADaW9zbQAAABBodHRwOi8vbG9jYWxob3N0ZAADd3A4bQAAABBodHRwOi8vbG9jYWxob3N0ZAAMcmVkaXJlY3RfdXJpbQAAABsvYXV0aC9hdXRob3JpemF0aW9uX2NvZGVfY2JkAAVzY29wZW0AAAAAZAAGc2VjcmV0bQAAAEA1Njk2NUQyRDVGRDdFRjZGMkM0MThDM0ZDQTJGMDkxNzc4Q0YzNTQzQzc4MzVCRDhBRkIwQTU1REU4RTY3OThFZAAKc2hvcnRfbmFtZW0AAAAJenNhbmRyb2lkZAAKc2tpcF9ncmFudGQABHRydWVkAB1zdXBwb3J0ZWRfY3VzdG9tX2lhcF9jaGFubmVsc3QAAAACZAAHYW5kcm9pZGpkAANpb3NqZAAEdHlwZWQABm5hdGl2ZWQACnVwZGF0ZWRfYXRiVeP2/mQADnVzZV9jdXN0b21faWFwdAAAAAJkAAdhbmRyb2lkZAAFZmFsc2VkAANpb3NkAAVmYWxzZQ=="
ImportFvacModel.import_fvac_client(data)

data = "g3QAAAARZAAKX19zdHJ1Y3RfX2QAGEVsaXhpci5GdmFjLk1vZGVsLkNsaWVudGQACGJpbmRpbmdzdAAAAABkAApjcmVhdGVkX2F0YlXgChRkAAVnb29kc3QAAAAGbQAAAAlTdG9yZTkwMDJ0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAJU3RvcmU5MDAyZAAEbmFtZW0AAAAP5LiA5bCP5aCG6YeR5biBZAAFcHJpY2ViAAACWGQAC3Byb2R1Y3RfaWRzdAAAAAFkAAphcHBsZXN0b3JlbQAAABVjb2cuZ29vZHMuYXMuY3JlZGl0czZkAAV0aXRsZW0AAAALOTDkuKrph5HluIFtAAAACVN0b3JlOTAwM3QAAAAGZAAIY3VycmVuY3ltAAAAA0NOWWQAAmlkbQAAAAlTdG9yZTkwMDNkAARuYW1lbQAAAA/kuIDlpKfloIbph5HluIFkAAVwcmljZWIAAAcIZAALcHJvZHVjdF9pZHN0AAAAAWQACmFwcGxlc3RvcmVtAAAAFmNvZy5nb29kcy5hcy5jcmVkaXRzMThkAAV0aXRsZW0AAAAMMzAw5Liq6YeR5biBbQAAAAlTdG9yZTkwMDR0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAJU3RvcmU5MDA0ZAAEbmFtZW0AAAAP5LiA5bCP6KKL6YeR5biBZAAFcHJpY2ViAAAakGQAC3Byb2R1Y3RfaWRzdAAAAAFkAAphcHBsZXN0b3JlbQAAABZjb2cuZ29vZHMuYXMuY3JlZGl0czY4ZAAFdGl0bGVtAAAADDkwMOS4qumHkeW4gW0AAAAJU3RvcmU5MDA1dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAACVN0b3JlOTAwNWQABG5hbWVtAAAAD+S4gOWkp+iii+mHkeW4gWQABXByaWNlYgAATVhkAAtwcm9kdWN0X2lkc3QAAAABZAAKYXBwbGVzdG9yZW0AAAAXY29nLmdvb2RzLmFzLmNyZWRpdHMxOThkAAV0aXRsZW0AAAANMTY4MOS4qumHkeW4gW0AAAAJU3RvcmU5MDA2dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAACVN0b3JlOTAwNmQABG5hbWVtAAAAD+S4gOWwj+eusemHkeW4gWQABXByaWNlYgAAgCBkAAtwcm9kdWN0X2lkc3QAAAABZAAKYXBwbGVzdG9yZW0AAAAXY29nLmdvb2RzLmFzLmNyZWRpdHMzMjhkAAV0aXRsZW0AAAANMjY4MOS4qumHkeW4gW0AAAAJU3RvcmU5MDA3dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAACVN0b3JlOTAwN2QABG5hbWVtAAAAD+S4gOWkp+eusemHkeW4gWQABXByaWNlYgAA/SBkAAtwcm9kdWN0X2lkc3QAAAABZAAKYXBwbGVzdG9yZW0AAAAXY29nLmdvb2RzLmFzLmNyZWRpdHM2NDhkAAV0aXRsZW0AAAANNTI4MOS4qumHkeW4gWQAAmlkbQAAACA5NzhBN0Q4NDA0MEZFNTg5RUQwQzc2Mjk1MTMxRTQzRGQABG5hbWVtAAAAEeaImOelnuWkp+mZhltJT1NdZAAQcGF5bWVudF9jYWxsYmFja20AAAAqaHR0cDovL3BheS5hZGNvZy5maXJldmFsZS5jb20vcGF5L2ZpcmV2YWxlZAAZcGxhdGZvcm1fcGF5bWVudF9jYWxsYmFja3QAAAADZAAHYW5kcm9pZG0AAAAQaHR0cDovL2xvY2FsaG9zdGQAA2lvc20AAAAQaHR0cDovL2xvY2FsaG9zdGQAA3dwOG0AAAAQaHR0cDovL2xvY2FsaG9zdGQADHJlZGlyZWN0X3VyaW0AAAAbL2F1dGgvYXV0aG9yaXphdGlvbl9jb2RlX2NiZAAFc2NvcGVtAAAAAGQABnNlY3JldG0AAABARjBEMDFFNEIwQzc3NjlDNTUyNDI0QUZBNTREOTZGNUZBMjMzRkVBMzdGMUNEQkI4OUQ0OUFEM0FBNTYxNjM2NWQACnNob3J0X25hbWVtAAAAB3pzY25pb3NkAApza2lwX2dyYW50ZAAEdHJ1ZWQAHXN1cHBvcnRlZF9jdXN0b21faWFwX2NoYW5uZWxzdAAAAAJkAAdhbmRyb2lkamQAA2lvc2pkAAR0eXBlZAAGbmF0aXZlZAAKdXBkYXRlZF9hdGJWFjAoZAAOdXNlX2N1c3RvbV9pYXB0AAAAAmQAB2FuZHJvaWRkAAVmYWxzZWQAA2lvc2QABWZhbHNl"
ImportFvacModel.import_fvac_client(data)

data = "g3QAAAARZAAKX19zdHJ1Y3RfX2QAGEVsaXhpci5GdmFjLk1vZGVsLkNsaWVudGQACGJpbmRpbmdzdAAAAAFkAAZ4aWFvbWl0AAAAA2QABmFwcF9pZG0AAAATMjg4MjMwMzc2MTUxNzQ4NzE5OGQAB2FwcF9rZXltAAAADTU3MjE3NDg3ODkxOThkAAphcHBfc2VjcmV0bQAAABh1VGlwN25waVdpRG93UXNJOEtkUXhBPT1kAApjcmVhdGVkX2F0YlbFa25kAAVnb29kc3QAAAAubQAAABtjb20uc2hhbmdoYWkuZ29vZHMuMzBjcmVkaXR0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAbY29tLnNoYW5naGFpLmdvb2RzLjMwY3JlZGl0ZAAEbmFtZW0AAAAP5LiA5Lit5aCG6ZK755+zZAAFcHJpY2ViAAALuGQAC3Byb2R1Y3RfaWRzdAAAAAFkAAphcHBsZXN0b3JlbQAAABtjb20uc2hhbmdoYWkuZ29vZHMuMzBjcmVkaXRkAAV0aXRsZW0AAAAMMzAw5Liq6ZK755+zbQAAABpjb20uY2hlbmdkdS5nb29kcy44OGNyZWRpdHQAAAAGZAAIY3VycmVuY3ltAAAAA0NOWWQAAmlkbQAAABpjb20uY2hlbmdkdS5nb29kcy44OGNyZWRpdGQABG5hbWVtAAAAD+S4gOS4reiii+mSu+efs2QABXByaWNlYgAAImBkAAtwcm9kdWN0X2lkc3QAAAABZAAKYXBwbGVzdG9yZW0AAAAaY29tLmNoZW5nZHUuZ29vZHMuODhjcmVkaXRkAAV0aXRsZW0AAAAMODgw5Liq6ZK755+zbQAAABxjb20uYmVpamluZzIuZ29vZHMuMTk4Y3JlZGl0dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAAHGNvbS5iZWlqaW5nMi5nb29kcy4xOThjcmVkaXRkAARuYW1lbQAAAAoxOTgw6ZK755+zZAAFcHJpY2ViAABNWGQAC3Byb2R1Y3RfaWRzdAAAAAFkAAphcHBsZXN0b3JlbQAAABxjb20uYmVpamluZzIuZ29vZHMuMTk4Y3JlZGl0ZAAFdGl0bGVtAAAADTE5ODDkuKrpkrvnn7NtAAAAG2NvbS5zaGFuZ2hhaS5nb29kcy4xOWNyZWRpdHQAAAAGZAAIY3VycmVuY3ltAAAAA0NOWWQAAmlkbQAAABtjb20uc2hhbmdoYWkuZ29vZHMuMTljcmVkaXRkAARuYW1lbQAAAA/kuIDlpKfloIbpkrvnn7NkAAVwcmljZWIAAAcIZAALcHJvZHVjdF9pZHN0AAAAAWQACmFwcGxlc3RvcmVtAAAAG2NvbS5zaGFuZ2hhaS5nb29kcy4xOWNyZWRpdGQABXRpdGxlbQAAAAwxODDkuKrpkrvnn7NtAAAAGmNvbS5iZWlqaW5nLmdvb2RzLjMwY3JlZGl0dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAAGmNvbS5iZWlqaW5nLmdvb2RzLjMwY3JlZGl0ZAAEbmFtZW0AAAAJMzAw6ZK755+zZAAFcHJpY2ViAAALuGQAC3Byb2R1Y3RfaWRzdAAAAAFkAAphcHBsZXN0b3JlbQAAABpjb20uYmVpamluZy5nb29kcy4zMGNyZWRpdGQABXRpdGxlbQAAAAwzMDDkuKrpkrvnn7NtAAAAGmNvbS50aWFuamluLmdvb2RzLjMwY3JlZGl0dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAAGmNvbS50aWFuamluLmdvb2RzLjMwY3JlZGl0ZAAEbmFtZW0AAAAP5LiA5Lit5aCG6ZK755+zZAAFcHJpY2ViAAALuGQAC3Byb2R1Y3RfaWRzdAAAAAFkAAphcHBsZXN0b3JlbQAAABpjb20udGlhbmppbi5nb29kcy4zMGNyZWRpdGQABXRpdGxlbQAAAAwzMDDkuKrpkrvnn7NtAAAAG2NvbS5iZWlqaW5nMi5nb29kcy44OGNyZWRpdHQAAAAGZAAIY3VycmVuY3ltAAAAA0NOWWQAAmlkbQAAABtjb20uYmVpamluZzIuZ29vZHMuODhjcmVkaXRkAARuYW1lbQAAAAk4ODDpkrvnn7NkAAVwcmljZWIAACJgZAALcHJvZHVjdF9pZHN0AAAAAWQACmFwcGxlc3RvcmVtAAAAG2NvbS5iZWlqaW5nMi5nb29kcy44OGNyZWRpdGQABXRpdGxlbQAAAAw4ODDkuKrpkrvnn7NtAAAAGWNvbS50aWFuamluLmdvb2RzLjZjcmVkaXR0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAZY29tLnRpYW5qaW4uZ29vZHMuNmNyZWRpdGQABG5hbWVtAAAAD+S4gOWwj+WghumSu+efs2QABXByaWNlYgAAAlhkAAtwcm9kdWN0X2lkc3QAAAABZAAKYXBwbGVzdG9yZW0AAAAZY29tLnRpYW5qaW4uZ29vZHMuNmNyZWRpdGQABXRpdGxlbQAAAAs2MOS4qumSu+efs20AAAAaY29tLnRpYW5qaW4uZ29vZHMuNjhjcmVkaXR0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAaY29tLnRpYW5qaW4uZ29vZHMuNjhjcmVkaXRkAARuYW1lbQAAAA/kuIDlsI/ooovpkrvnn7NkAAVwcmljZWIAABqQZAALcHJvZHVjdF9pZHN0AAAAAWQACmFwcGxlc3RvcmVtAAAAGmNvbS50aWFuamluLmdvb2RzLjY4Y3JlZGl0ZAAFdGl0bGVtAAAADDY4MOS4qumSu+efs20AAAAbY29tLmJlaWppbmcyLmdvb2RzLjE4Y3JlZGl0dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAAG2NvbS5iZWlqaW5nMi5nb29kcy4xOGNyZWRpdGQABG5hbWVtAAAACTE4MOmSu+efs2QABXByaWNlYgAABwhkAAtwcm9kdWN0X2lkc3QAAAABZAAKYXBwbGVzdG9yZW0AAAAbY29tLmJlaWppbmcyLmdvb2RzLjE4Y3JlZGl0ZAAFdGl0bGVtAAAADDE4MOS4qumSu+efs20AAAAUYml1Lmdvb2RzLmNyZWRpdHMxOTh0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAUYml1Lmdvb2RzLmNyZWRpdHMxOThkAARuYW1lbQAAAA/kuIDlpKfooovpkrvnn7NkAAVwcmljZWIAAE1YZAALcHJvZHVjdF9pZHN0AAAAAWQACmFwcGxlc3RvcmVtAAAAFGJpdS5nb29kcy5jcmVkaXRzMTk4ZAAFdGl0bGVtAAAADTE5ODDkuKrpkrvnn7NtAAAAE2JpdS5nb29kcy5jcmVkaXRzMTh0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAATYml1Lmdvb2RzLmNyZWRpdHMxOGQABG5hbWVtAAAAD+S4gOWkp+WghumSu+efs2QABXByaWNlYgAABwhkAAtwcm9kdWN0X2lkc3QAAAABZAAKYXBwbGVzdG9yZW0AAAATYml1Lmdvb2RzLmNyZWRpdHMxOGQABXRpdGxlbQAAAAwxODDkuKrpkrvnn7NtAAAAFGJpdS5nb29kcy5jcmVkaXRzNjQ4dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAAFGJpdS5nb29kcy5jcmVkaXRzNjQ4ZAAEbmFtZW0AAAAP5LiA5aSn566x6ZK755+zZAAFcHJpY2ViAAD9IGQAC3Byb2R1Y3RfaWRzdAAAAAFkAAphcHBsZXN0b3JlbQAAABRiaXUuZ29vZHMuY3JlZGl0czY0OGQABXRpdGxlbQAAAA02NDgw5Liq6ZK755+zbQAAABtjb20uYmVpamluZy5nb29kcy4zMjhjcmVkaXR0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAbY29tLmJlaWppbmcuZ29vZHMuMzI4Y3JlZGl0ZAAEbmFtZW0AAAAKMzI4MOmSu+efs2QABXByaWNlYgAAgCBkAAtwcm9kdWN0X2lkc3QAAAABZAAKYXBwbGVzdG9yZW0AAAAbY29tLmJlaWppbmcuZ29vZHMuMzI4Y3JlZGl0ZAAFdGl0bGVtAAAADTMyODDkuKrpkrvnn7NtAAAAGWNvbS5jaGVuZ2R1Lmdvb2RzLjZjcmVkaXR0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAZY29tLmNoZW5nZHUuZ29vZHMuNmNyZWRpdGQABG5hbWVtAAAAD+S4gOWwj+WghumSu+efs2QABXByaWNlYgAAAlhkAAtwcm9kdWN0X2lkc3QAAAABZAAKYXBwbGVzdG9yZW0AAAAZY29tLmNoZW5nZHUuZ29vZHMuNmNyZWRpdGQABXRpdGxlbQAAAAs2MOS4qumSu+efs20AAAAbY29tLmJlaWppbmcuZ29vZHMuMTk4Y3JlZGl0dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAAG2NvbS5iZWlqaW5nLmdvb2RzLjE5OGNyZWRpdGQABG5hbWVtAAAACjE5ODDpkrvnn7NkAAVwcmljZWIAAE1YZAALcHJvZHVjdF9pZHN0AAAAAWQACmFwcGxlc3RvcmVtAAAAG2NvbS5iZWlqaW5nLmdvb2RzLjE5OGNyZWRpdGQABXRpdGxlbQAAAA0xOTgw5Liq6ZK755+zbQAAABtjb20uY2hlbmdkdS5nb29kcy4xOThjcmVkaXR0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAbY29tLmNoZW5nZHUuZ29vZHMuMTk4Y3JlZGl0ZAAEbmFtZW0AAAAP5LiA5aSn6KKL6ZK755+zZAAFcHJpY2ViAABNWGQAC3Byb2R1Y3RfaWRzdAAAAAFkAAphcHBsZXN0b3JlbQAAABtjb20uY2hlbmdkdS5nb29kcy4xOThjcmVkaXRkAAV0aXRsZW0AAAANMTk4MOS4qumSu+efs20AAAAaY29tLnRpYW5qaW4uZ29vZHMuODhjcmVkaXR0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAaY29tLnRpYW5qaW4uZ29vZHMuODhjcmVkaXRkAARuYW1lbQAAAA/kuIDkuK3ooovpkrvnn7NkAAVwcmljZWIAACJgZAALcHJvZHVjdF9pZHN0AAAAAWQACmFwcGxlc3RvcmVtAAAAGmNvbS50aWFuamluLmdvb2RzLjg4Y3JlZGl0ZAAFdGl0bGVtAAAADDg4MOS4qumSu+efs20AAAAcY29tLmJlaWppbmcyLmdvb2RzLjY0OGNyZWRpdHQAAAAGZAAIY3VycmVuY3ltAAAAA0NOWWQAAmlkbQAAABxjb20uYmVpamluZzIuZ29vZHMuNjQ4Y3JlZGl0ZAAEbmFtZW0AAAAKNjQ4MOmSu+efs2QABXByaWNlYgAA/SBkAAtwcm9kdWN0X2lkc3QAAAABZAAKYXBwbGVzdG9yZW0AAAAcY29tLmJlaWppbmcyLmdvb2RzLjY0OGNyZWRpdGQABXRpdGxlbQAAAA02NDgw5Liq6ZK755+zbQAAABRiaXUuZ29vZHMuY3JlZGl0czMyOHQAAAAGZAAIY3VycmVuY3ltAAAAA0NOWWQAAmlkbQAAABRiaXUuZ29vZHMuY3JlZGl0czMyOGQABG5hbWVtAAAAD+S4gOWwj+eusemSu+efs2QABXByaWNlYgAAgCBkAAtwcm9kdWN0X2lkc3QAAAABZAAKYXBwbGVzdG9yZW0AAAAUYml1Lmdvb2RzLmNyZWRpdHMzMjhkAAV0aXRsZW0AAAANMzI4MOS4qumSu+efs20AAAAaY29tLmNoZW5nZHUuZ29vZHMuNjhjcmVkaXR0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAaY29tLmNoZW5nZHUuZ29vZHMuNjhjcmVkaXRkAARuYW1lbQAAAA/kuIDlsI/ooovpkrvnn7NkAAVwcmljZWIAABqQZAALcHJvZHVjdF9pZHN0AAAAAWQACmFwcGxlc3RvcmVtAAAAGmNvbS5jaGVuZ2R1Lmdvb2RzLjY4Y3JlZGl0ZAAFdGl0bGVtAAAADDY4MOS4qumSu+efs20AAAAbY29tLnNoYW5naGFpLmdvb2RzLjkwY3JlZGl0dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAAG2NvbS5zaGFuZ2hhaS5nb29kcy45MGNyZWRpdGQABG5hbWVtAAAAD+S4gOS4reiii+mSu+efs2QABXByaWNlYgAAImBkAAtwcm9kdWN0X2lkc3QAAAABZAAKYXBwbGVzdG9yZW0AAAAbY29tLnNoYW5naGFpLmdvb2RzLjkwY3JlZGl0ZAAFdGl0bGVtAAAADDg4MOS4qumSu+efs20AAAAaY29tLmJlaWppbmcuZ29vZHMuNjhjcmVkaXR0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAaY29tLmJlaWppbmcuZ29vZHMuNjhjcmVkaXRkAARuYW1lbQAAAAk2ODDpkrvnn7NkAAVwcmljZWIAABqQZAALcHJvZHVjdF9pZHN0AAAAAWQACmFwcGxlc3RvcmVtAAAAGmNvbS5iZWlqaW5nLmdvb2RzLjY4Y3JlZGl0ZAAFdGl0bGVtAAAADDY4MOS4qumSu+efs20AAAAaY29tLnRpYW5qaW4uZ29vZHMuMThjcmVkaXR0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAaY29tLnRpYW5qaW4uZ29vZHMuMThjcmVkaXRkAARuYW1lbQAAAA/kuIDlpKfloIbpkrvnn7NkAAVwcmljZWIAAAcIZAALcHJvZHVjdF9pZHN0AAAAAWQACmFwcGxlc3RvcmVtAAAAGmNvbS50aWFuamluLmdvb2RzLjE4Y3JlZGl0ZAAFdGl0bGVtAAAADDE4MOS4qumSu+efs20AAAAcY29tLmJlaWppbmcyLmdvb2RzLjMyOGNyZWRpdHQAAAAGZAAIY3VycmVuY3ltAAAAA0NOWWQAAmlkbQAAABxjb20uYmVpamluZzIuZ29vZHMuMzI4Y3JlZGl0ZAAEbmFtZW0AAAAKMzI4MOmSu+efs2QABXByaWNlYgAAgCBkAAtwcm9kdWN0X2lkc3QAAAABZAAKYXBwbGVzdG9yZW0AAAAcY29tLmJlaWppbmcyLmdvb2RzLjMyOGNyZWRpdGQABXRpdGxlbQAAAA0zMjgw5Liq6ZK755+zbQAAABxjb20uc2hhbmdoYWkuZ29vZHMuMTk4Y3JlZGl0dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAAHGNvbS5zaGFuZ2hhaS5nb29kcy4xOThjcmVkaXRkAARuYW1lbQAAAA/kuIDlpKfooovpkrvnn7NkAAVwcmljZWIAAE1YZAALcHJvZHVjdF9pZHN0AAAAAWQACmFwcGxlc3RvcmVtAAAAHGNvbS5zaGFuZ2hhaS5nb29kcy4xOThjcmVkaXRkAAV0aXRsZW0AAAANMTk4MOS4qumSu+efs20AAAAcY29tLnNoYW5naGFpLmdvb2RzLjMyOGNyZWRpdHQAAAAGZAAIY3VycmVuY3ltAAAAA0NOWWQAAmlkbQAAABxjb20uc2hhbmdoYWkuZ29vZHMuMzI4Y3JlZGl0ZAAEbmFtZW0AAAAP5LiA5bCP566x6ZK755+zZAAFcHJpY2ViAACAIGQAC3Byb2R1Y3RfaWRzdAAAAAFkAAphcHBsZXN0b3JlbQAAABxjb20uc2hhbmdoYWkuZ29vZHMuMzI4Y3JlZGl0ZAAFdGl0bGVtAAAADTMyODDkuKrpkrvnn7NtAAAAG2NvbS5iZWlqaW5nMi5nb29kcy42OGNyZWRpdHQAAAAGZAAIY3VycmVuY3ltAAAAA0NOWWQAAmlkbQAAABtjb20uYmVpamluZzIuZ29vZHMuNjhjcmVkaXRkAARuYW1lbQAAAAk2ODDpkrvnn7NkAAVwcmljZWIAABqQZAALcHJvZHVjdF9pZHN0AAAAAWQACmFwcGxlc3RvcmVtAAAAG2NvbS5iZWlqaW5nMi5nb29kcy42OGNyZWRpdGQABXRpdGxlbQAAAAw2ODDkuKrpkrvnn7NtAAAAGmNvbS5iZWlqaW5nMi5nb29kcy42Y3JlZGl0dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAAGmNvbS5iZWlqaW5nMi5nb29kcy42Y3JlZGl0ZAAEbmFtZW0AAAAINjDpkrvnn7NkAAVwcmljZWIAAAJYZAALcHJvZHVjdF9pZHN0AAAAAWQACmFwcGxlc3RvcmVtAAAAGmNvbS5iZWlqaW5nMi5nb29kcy42Y3JlZGl0ZAAFdGl0bGVtAAAACzYw5Liq6ZK755+zbQAAABtjb20uYmVpamluZzIuZ29vZHMuMzBjcmVkaXR0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAbY29tLmJlaWppbmcyLmdvb2RzLjMwY3JlZGl0ZAAEbmFtZW0AAAAJMzAw6ZK755+zZAAFcHJpY2ViAAALuGQAC3Byb2R1Y3RfaWRzdAAAAAFkAAphcHBsZXN0b3JlbQAAABtjb20uYmVpamluZzIuZ29vZHMuMzBjcmVkaXRkAAV0aXRsZW0AAAAMMzAw5Liq6ZK755+zbQAAABNiaXUuZ29vZHMuY3JlZGl0czY4dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAAE2JpdS5nb29kcy5jcmVkaXRzNjhkAARuYW1lbQAAAA/kuIDlsI/ooovpkrvnn7NkAAVwcmljZWIAABqQZAALcHJvZHVjdF9pZHN0AAAAAWQACmFwcGxlc3RvcmVtAAAAE2JpdS5nb29kcy5jcmVkaXRzNjhkAAV0aXRsZW0AAAAMNjgw5Liq6ZK755+zbQAAABJiaXUuZ29vZHMuY3JlZGl0czZ0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAASYml1Lmdvb2RzLmNyZWRpdHM2ZAAEbmFtZW0AAAAP5LiA5bCP5aCG6ZK755+zZAAFcHJpY2ViAAACWGQAC3Byb2R1Y3RfaWRzdAAAAAFkAAphcHBsZXN0b3JlbQAAABJiaXUuZ29vZHMuY3JlZGl0czZkAAV0aXRsZW0AAAALNjDkuKrpkrvnn7NtAAAAGmNvbS5iZWlqaW5nLmdvb2RzLjg4Y3JlZGl0dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAAGmNvbS5iZWlqaW5nLmdvb2RzLjg4Y3JlZGl0ZAAEbmFtZW0AAAAJODgw6ZK755+zZAAFcHJpY2ViAAAiYGQAC3Byb2R1Y3RfaWRzdAAAAAFkAAphcHBsZXN0b3JlbQAAABpjb20uYmVpamluZy5nb29kcy44OGNyZWRpdGQABXRpdGxlbQAAAAw4ODDkuKrpkrvnn7NtAAAAGWNvbS5iZWlqaW5nLmdvb2RzLjZjcmVkaXR0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAZY29tLmJlaWppbmcuZ29vZHMuNmNyZWRpdGQABG5hbWVtAAAACDYw6ZK755+zZAAFcHJpY2ViAAACWGQAC3Byb2R1Y3RfaWRzdAAAAAFkAAphcHBsZXN0b3JlbQAAABljb20uYmVpamluZy5nb29kcy42Y3JlZGl0ZAAFdGl0bGVtAAAACzYw5Liq6ZK755+zbQAAABtjb20uY2hlbmdkdS5nb29kcy42NDhjcmVkaXR0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAbY29tLmNoZW5nZHUuZ29vZHMuNjQ4Y3JlZGl0ZAAEbmFtZW0AAAAP5LiA5aSn566x6ZK755+zZAAFcHJpY2ViAAD9IGQAC3Byb2R1Y3RfaWRzdAAAAAFkAAphcHBsZXN0b3JlbQAAABtjb20uY2hlbmdkdS5nb29kcy42NDhjcmVkaXRkAAV0aXRsZW0AAAANNjQ4MOS4qumSu+efs20AAAAaY29tLmJlaWppbmcuZ29vZHMuMThjcmVkaXR0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAaY29tLmJlaWppbmcuZ29vZHMuMThjcmVkaXRkAARuYW1lbQAAAAkxODDpkrvnn7NkAAVwcmljZWIAAAcIZAALcHJvZHVjdF9pZHN0AAAAAWQACmFwcGxlc3RvcmVtAAAAGmNvbS5iZWlqaW5nLmdvb2RzLjE4Y3JlZGl0ZAAFdGl0bGVtAAAADDE4MOS4qumSu+efs20AAAAcY29tLnNoYW5naGFpLmdvb2RzLjY0OGNyZWRpdHQAAAAGZAAIY3VycmVuY3ltAAAAA0NOWWQAAmlkbQAAABxjb20uc2hhbmdoYWkuZ29vZHMuNjQ4Y3JlZGl0ZAAEbmFtZW0AAAAP5LiA5aSn566x6ZK755+zZAAFcHJpY2ViAAD9IGQAC3Byb2R1Y3RfaWRzdAAAAAFkAAphcHBsZXN0b3JlbQAAABxjb20uc2hhbmdoYWkuZ29vZHMuNjQ4Y3JlZGl0ZAAFdGl0bGVtAAAADTY0ODDkuKrpkrvnn7NtAAAAGmNvbS5zaGFuZ2hhaS5nb29kcy42Y3JlZGl0dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAAGmNvbS5zaGFuZ2hhaS5nb29kcy42Y3JlZGl0ZAAEbmFtZW0AAAAP5LiA5bCP5aCG6ZK755+zZAAFcHJpY2ViAAACWGQAC3Byb2R1Y3RfaWRzdAAAAAFkAAphcHBsZXN0b3JlbQAAABpjb20uc2hhbmdoYWkuZ29vZHMuNmNyZWRpdGQABXRpdGxlbQAAAAs2MOS4qumSu+efs20AAAAbY29tLmJlaWppbmcuZ29vZHMuNjQ4Y3JlZGl0dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAAG2NvbS5iZWlqaW5nLmdvb2RzLjY0OGNyZWRpdGQABG5hbWVtAAAACjY0ODDpkrvnn7NkAAVwcmljZWIAAP0gZAALcHJvZHVjdF9pZHN0AAAAAWQACmFwcGxlc3RvcmVtAAAAG2NvbS5iZWlqaW5nLmdvb2RzLjY0OGNyZWRpdGQABXRpdGxlbQAAAA02NDgw5Liq6ZK755+zbQAAABtjb20udGlhbmppbi5nb29kcy42NDhjcmVkaXR0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAbY29tLnRpYW5qaW4uZ29vZHMuNjQ4Y3JlZGl0ZAAEbmFtZW0AAAAP5LiA5aSn566x6ZK755+zZAAFcHJpY2ViAAD9IGQAC3Byb2R1Y3RfaWRzdAAAAAFkAAphcHBsZXN0b3JlbQAAABtjb20udGlhbmppbi5nb29kcy42NDhjcmVkaXRkAAV0aXRsZW0AAAANNjQ4MOS4qumSu+efs20AAAAbY29tLnRpYW5qaW4uZ29vZHMuMTk4Y3JlZGl0dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAAG2NvbS50aWFuamluLmdvb2RzLjE5OGNyZWRpdGQABG5hbWVtAAAAD+S4gOWkp+iii+mSu+efs2QABXByaWNlYgAATVhkAAtwcm9kdWN0X2lkc3QAAAABZAAKYXBwbGVzdG9yZW0AAAAbY29tLnRpYW5qaW4uZ29vZHMuMTk4Y3JlZGl0ZAAFdGl0bGVtAAAADTE5ODDkuKrpkrvnn7NtAAAAG2NvbS50aWFuamluLmdvb2RzLjMyOGNyZWRpdHQAAAAGZAAIY3VycmVuY3ltAAAAA0NOWWQAAmlkbQAAABtjb20udGlhbmppbi5nb29kcy4zMjhjcmVkaXRkAARuYW1lbQAAAA/kuIDlsI/nrrHpkrvnn7NkAAVwcmljZWIAAIAgZAALcHJvZHVjdF9pZHN0AAAAAWQACmFwcGxlc3RvcmVtAAAAG2NvbS50aWFuamluLmdvb2RzLjMyOGNyZWRpdGQABXRpdGxlbQAAAA0zMjgw5Liq6ZK755+zbQAAABtjb20uc2hhbmdoYWkuZ29vZHMuNjhjcmVkaXR0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAbY29tLnNoYW5naGFpLmdvb2RzLjY4Y3JlZGl0ZAAEbmFtZW0AAAAM5LiA5bCP6KKL6ZK7ZAAFcHJpY2ViAAAakGQAC3Byb2R1Y3RfaWRzdAAAAAFkAAphcHBsZXN0b3JlbQAAABtjb20uc2hhbmdoYWkuZ29vZHMuNjhjcmVkaXRkAAV0aXRsZW0AAAAMNjgw5Liq6ZK755+zbQAAABpjb20uY2hlbmdkdS5nb29kcy4zMGNyZWRpdHQAAAAGZAAIY3VycmVuY3ltAAAAA0NOWWQAAmlkbQAAABpjb20uY2hlbmdkdS5nb29kcy4zMGNyZWRpdGQABG5hbWVtAAAAD+S4gOS4reWghumSu+efs2QABXByaWNlYgAAC7hkAAtwcm9kdWN0X2lkc3QAAAABZAAKYXBwbGVzdG9yZW0AAAAaY29tLmNoZW5nZHUuZ29vZHMuMzBjcmVkaXRkAAV0aXRsZW0AAAAMMzAw5Liq6ZK755+zbQAAABtjb20uY2hlbmdkdS5nb29kcy4zMjhjcmVkaXR0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAbY29tLmNoZW5nZHUuZ29vZHMuMzI4Y3JlZGl0ZAAEbmFtZW0AAAAP5LiA5bCP566x6ZK755+zZAAFcHJpY2ViAACAIGQAC3Byb2R1Y3RfaWRzdAAAAAFkAAphcHBsZXN0b3JlbQAAABtjb20uY2hlbmdkdS5nb29kcy4zMjhjcmVkaXRkAAV0aXRsZW0AAAANMzI4MOS4qumSu+efs20AAAAaY29tLmNoZW5nZHUuZ29vZHMuMThjcmVkaXR0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAaY29tLmNoZW5nZHUuZ29vZHMuMThjcmVkaXRkAARuYW1lbQAAAA/kuIDlpKfloIbpkrvnn7NkAAVwcmljZWIAAAcIZAALcHJvZHVjdF9pZHN0AAAAAWQACmFwcGxlc3RvcmVtAAAAGmNvbS5jaGVuZ2R1Lmdvb2RzLjE4Y3JlZGl0ZAAFdGl0bGVtAAAADDE4MOS4qumSu+efs2QAAmlkbQAAACBGNTc3RkNFRTlCMDYxNkE0MjEwOTZBQTNBNEU5RjJBQ2QABG5hbWVtAAAACUJpdWJpdWJpdWQAEHBheW1lbnRfY2FsbGJhY2ttAAAAJ2h0dHA6Ly8xMjMuNTkuNzEuMTg3OjU1NTUvcGF5X2ZlZWRiYWNrL2QAGXBsYXRmb3JtX3BheW1lbnRfY2FsbGJhY2t0AAAAA2QAB2FuZHJvaWRtAAAAEGh0dHA6Ly9sb2NhbGhvc3RkAANpb3NtAAAAEGh0dHA6Ly9sb2NhbGhvc3RkAAN3cDhtAAAAEGh0dHA6Ly9sb2NhbGhvc3RkAAxyZWRpcmVjdF91cmltAAAAGy9hdXRoL2F1dGhvcml6YXRpb25fY29kZV9jYmQABXNjb3BlbQAAAABkAAZzZWNyZXRtAAAAQEVCMTQ0NDBCRkYyNzA1RjgxQzBGRTVDQkEyQzE4QkQ5RDIwRDI0RDJFQjVBMDAxNUNEQzhGNjkxRUVDRjU0QjNkAApzaG9ydF9uYW1lbQAAAARiYmJiZAAKc2tpcF9ncmFudGQABHRydWVkAB1zdXBwb3J0ZWRfY3VzdG9tX2lhcF9jaGFubmVsc3QAAAACZAAHYW5kcm9pZGwAAAABZAAGYWxpcGF5amQAA2lvc2wAAAABZAAKYXBwbGVzdG9yZWpkAAR0eXBlZAAGbmF0aXZlZAAKdXBkYXRlZF9hdGJXoEF9ZAAOdXNlX2N1c3RvbV9pYXB0AAAAAmQAB2FuZHJvaWRkAAVmYWxzZWQAA2lvc2QABWZhbHNl"
ImportFvacModel.import_fvac_client(data)

app = Repo.get!(App, "F577FCEE9B0616A421096AA3A4E9F2AC")
app |> App.changeset(%{payment_callback: "http://127.0.0.1:4000/api/sdkpay/default_callback"}) |> Repo.update!

AdminUser.changeset(%AdminUser{}, %{account_id: "xiaobin@firevale.com"}) |> Repo.insert
AdminUser.changeset(%AdminUser{}, %{account_id: "zhangshiqing@firevale.com"}) |> Repo.insert
AdminUser.changeset(%AdminUser{}, %{account_id: "zhongxiaobin@firevale.com"}) |> Repo.insert
AdminUser.changeset(%AdminUser{}, %{account_id: "zhongxb@firevale.com"}) |> Repo.insert
AdminUser.changeset(%AdminUser{}, %{account_id: "zhumingzhen@firevale.com"}) |> Repo.insert

User.changeset(%User{}, %{id: "100001", email: "zhongxiaobin@firevale.com", encrypted_password: "$pbkdf2-sha512$160000$XBC9izsPHnce3kqllIpE8A$xh0TY1uYF3VKukY5fwyqsGEkLqvY.o.iIdaN536i2lSJp6Bnu4xNsu/FH243xuEv9UrLQXLOPmPetmi3hrmdmA", nickname: "zhongxiaobin", gender: "male", age: 1}) |> Repo.insert
User.changeset(%User{}, %{id: "100002", email: "zhumingzhen@firevale.com", encrypted_password: "$pbkdf2-sha512$160000$c4oGViAQf4ANOPDYAjAnTg$KCikauke6I4K7BSB3Iy9KYwTrFxwaAIdLIv.p.eUsEy62fiIuPYcm4ZT14X5wNToFPpidVeW4oPfTWfTBz9MPw", nickname: "zhumingzhen", gender: "male", age: 1}) |> Repo.insert
User.changeset(%User{}, %{id: "100003", email: "xiaobin@firevale.com", encrypted_password: "$pbkdf2-sha512$160000$c4oGViAQf4ANOPDYAjAnTg$KCikauke6I4K7BSB3Iy9KYwTrFxwaAIdLIv.p.eUsEy62fiIuPYcm4ZT14X5wNToFPpidVeW4oPfTWfTBz9MPw", nickname: "zhumingzhen", gender: "male", age: 1}) |> Repo.insert

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

ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容1", post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容2", post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容3", post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容4", post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容5", post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容6", post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容7", post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容8", post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容9", post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容10", post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容11", post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容12", post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容13", post_id: 1, user_id: "100001"}) |> Repo.insert
ForumComment.changeset(%ForumComment{}, %{title: "回复:测试文章1", content: "回复内容14", post_id: 1, user_id: "100001"}) |> Repo.insert

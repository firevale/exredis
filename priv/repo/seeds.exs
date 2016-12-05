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

 data = "g3QAAAARZAAKX19zdHJ1Y3RfX2QAGEVsaXhpci5GdmFjLk1vZGVsLkNsaWVudGQACGJpbmRpbmdzdAAAABRkAAVhbnpoaXQAAAACZAAHYXBwX2tleW0AAAAeMTQzODUzNTgxNk04OXRnQTVCa3k3ZTR2NEZIOXBTZAAKYXBwX3NlY3JldG0AAAAYcDdsMkVzQURObVY5MnFUQnVSb3diOEFqZAAFYmFpZHV0AAAAA2QABmFwcF9pZG0AAAAHNjQ2NDk4MGQAB2FwcF9rZXltAAAAGFV1ZEdtVVpkeFhBZktrdHNJVmVkUThnb2QACmFwcF9zZWNyZXRtAAAAIHpRZ3RIelRYY202QVBqSEZtaHd5azg3bnRPTlFxeWZPZAACY2N0AAAAA2QABmFwcF9pZG0AAAAGMTAyNTQ3ZAAHYXBwX2tleW0AAAAgNzUyNzlhNWU2ODM4NDJkY2FkMjI1YzRiNjExZDYwMjNkAAdwYXlfa2V5bQAAACBmMzhjOTc1OGM1NWM0MzI0YjVkNjk1NTE3NDliMTg4OGQAB2Nvb2xwYWR0AAAABGQABmFwcF9pZG0AAAAKNTAwMDAwMTI5NGQAB2FwcF9rZXltAAAAIDFkNzNiMGJkNDNjYTRkOWE4Mjk5YmVkMTVjMWE1NzA1ZAAMcGF5X3ByaXZfa2V5bQAAAyxNSUlDV3dJQkFBS0JnUUNXZmJ5U1pCQU9BSkF1SFRSd2tzYjBuZ1VCd0hYb2lCQlZSaTFLS0pXQndVT2FXNUNSM1NpSXg4RXlRNUdZNFhYKzZkUXI1Y2U2ZHJaSkVSWXVYeHpPeTJHdENybHNjbGVvc2JpS29zdEF4RnFXNUVNeFhubThLZFREajJCb25FZVBoeEVqSXAvcDRWbU5BbFJBWXc2TVo2UFpHRThNQXN0YllpSkFnWUgxUndJREFRQUJBb0dBY29uUWREcmtYVVBnZUxpUnFQeU5vTENFYndqa3RNNmFYOHpCdTZlWDR1SU5hZlkyMmszUkJBbkU2VlMwQS8vVnB1YWhMYWY5azlXMmQzWWh3N2x3V21YdzIwZlM1azdZMXhiTE5pNVk1M252VVd1QmxOOWFkWkNlYVZhbmhPUm5XT0IvaGk0VHUzTGpSYmRzSVBGVCtFRlRyblhhaExNMGI2YU5VcWUwWkVFQ1FRRGs0S2F0c1k0bkJhOHNrL2ZvTy9SWnk1UWdlQWdsZGNKbjRvemNuUXpFSVJYMDVoRWRDWWpManh5aTJIMTRuclp3NHBOdUVSM1dPL1o1a01uM0ZVdGpBa0VBcUZNZGVkSjE5SnZrQWQzdFM3OVpJVHY1SklNWjhiTkZOUmhPVW05MVBVdjVyS1loTDBzSGE1d1VyT2tPcm94ZEJQRG1zRkJGT3RlNWc4ajN6dW85elFKQWJZYmIvSTdWV2ZNc2F3YThRZFEvRUtHTlZ5UlpzYU55enNmcFpNRjdGSGhJeTVNMWFWSGd0cGpidVVva2NRNXllLzdSVW9DNmFJVDFaQ05Yb3ZmN3hRSkFNbW82Z050Tll3Y3lBbkVpK3JZRUR4VTBhUUF2VEJwQ2wwV0JaK1ZrT3dpL2JqdVA0dWRaQUowT0FFQUptclFGeEU0VytpWUFwa0FvbTFVZEM4ZFMzUUpBVExGdDVzU1pzSHAzRU92eTV4ajlJSlZHa1VRZHpmNHhtRTkrRk53RUNoZytqc0M5czF6M2RiM1AzdHQxUFFwbTNYczhqZ29BeTZDTmpkMzd3OXdmQ3c9PWQAC3BheV9wdWJfa2V5bQAAANhNSUdmTUEwR0NTcUdTSWIzRFFFQkFRVUFBNEdOQURDQmlRS0JnUUNseSsyallaZnUyMmd2aWwzcjByYzBtbUZQN3FSdEhlNEM4K2ZRVGJvMXBuRVdXeS9mYmgyb1FBWUc4ZTZCNUNoc0p5bm55VE9ScXlkcWR5TTYvb0lVa0QvbGZ0YnorK204ZDRRVDVKOWlaeTBTV2s4azlWeFBFd1BjU2loZ3BqS2FoT2pGbmtBa1M2RjRHd3kySnVvS3lkYUVra2xaWG9kNXhaNyt0Q0grRVFJREFRQUJkAAdkb3duam95dAAAAANkAAZhcHBfaWRtAAAABDM1MjlkAAdhcHBfa2V5bQAAAAhyMHpnUTg2M2QACmFwcF9zZWNyZXRtAAAADENwOWFNcmQxVzI2RGQAA2h0Y3QAAAADZAAJZ2FtZV9jb2RlbQAAAA0yODc3NTMxMzY0MTAzZAAIcHJpdl9rZXltAAADTE1JSUNkUUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQWw4d2dnSmJBZ0VBQW9HQkFNZkpQU09yQUxrVWZlQTBDMmt4dS84Um05L1NQOFJtdlR6d2Ryd2s2djkrNkZCYk05VEVjTjBYa2E4UWtaRkVWN215U1NqSUtYKzNuS2lRZGphQlRXOGhyZDlsU2ZDTzVJdkZ2eGp6Z1l6MTdUMmQvYzdzQ01VeVhvSXltZWhZRWU5N0Y1K3ZSbXc4M3l6RGo4VE1NMWVCK2VZVjVNeWRIS21IeVZJMEFHb0RBZ01CQUFFQ2dZQUlJdVR2aCs1T20wd0pEbldNZ2k4QzAwZkMxTUF1RW5VUWYwYUdvUVpGQTNrWWxLNUdzdjFaczdVR0tTbVVmZkVJcWY4YXZ4UVpsSE8zMWJKS3cvZFFSYzEwWFNsaEVRNzV3aktrN0l0ME1XdUhZZlhrUDZHWHRrZkdrYmd0QVZPTTAxNnBqUGhRbHZkRnBnVGVqS2JWTlZiMmpFcFphVU13Um9wcXpGL1JXUUpCQVBxTG14RWVmdmxicUhhZFdOZUV4TFhoOWdVYnJGZktEMHRpd2phVHJkUGNiK0hRWUNLckp4TGZ0aW9sd0FOcHhtc2RvK2JSRWt1dm1UOFY3UXhlSmRVQ1FRRE1JcnNEaDJmQ09rRVpNRGpaZXptS0JhTzV3WmwzQVh1eGd1ajlNeVRLanVDc2FpdFlvZ2JLcTZ0cnplaWhoV0pFQlRtNERoanR0aklyRjVoTVQ0UjNBa0VBb2Nta3lOazRoUzE3QzUxdjBUd2JDcGh2bGJ6WS9aZXRhTEROV1JEa0h2c3FCRmZhdklocEl2YnpXeVFsYWc3VDRqZXhyMHN5MVV6L1dJMkFGWXgyUVFKQVAwVndnNnAvYllNUzFGVE8raEdvaHZBeWpBdkduazAyWXBHNTEyajN1VlRKckljSHdtUU9DTmxtdTNaSjZXNW5RNy8rNE41MXVaQWtRcGtBbW41M0J3SS9EYkRRUUc5WUptaGNoVzMwVU5VTEhMNjlacjRUT2pkb3dITXdKSmhvZ2Zha3k4VXNDUlFlY2JtT3BOVmpTWThVN0g5ZVQ1bGdLOFdodXlYb00xcldkAAdwdWJfa2V5bQAAANhNSUdmTUEwR0NTcUdTSWIzRFFFQkFRVUFBNEdOQURDQmlRS0JnUURiUkx6V2ZDRDRwUWIxbWplR0x5Nmd3K0FmT0taMWRwTmJNVXlabWwrcDNzdFRTZFR5SEhwa3VQUHNhT3FzVDlnRkRTbVh6NUtSQnQ0dzZLQ2VMai9SNjFLQTVybU1KaXBEblNKVjE5a2xkMHo2Tlc0N2tpRVFIc2xhYWxEQkNTVDk0VFVJY0N6amhhaUczeVRDaERDVEZvM3Y0N3F5dDZqM1l2VnBpaDhVTlFJREFRQUJkAAZodWF3ZWl0AAAABWQABmFwcF9pZG0AAAAIMTAyOTAxMTRkAAdhcHBfa2V5bQAAA1BNSUlDZGdJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0FtQXdnZ0pjQWdFQUFvR0JBSmNlT3dUU2E3VVhyZVVHNzZ3d0JZSzBzNjA4YUtGeUppWmx4TjdyMityQzBCRTRqUGVzWGIweUpiZjNWUGowc2FGeU40ZHl0anAraE1MNzNtZG5CeHRKMnROWkFwSnZ6TkkyYnhVVytaN0FlMUZ1KzZNcExLbG5aZ1k4N2s3U1pCU05hdFY0bFlXZE1BQ3J4OEZpY1RsdXUybTRpVlhGVmpUNFhGSFl5cDNMQWdNQkFBRUNnWUJUYVY1T1JROHFnQTErRXh3THdOM3B6WEEzdU5aUDlyL1VCZXhxMTJrbDVhNFBNMVdzQjdvZUNpWURxME45dnlLazZIUjZFUGxBeEVEbmx6cWxmSnJRdmdwWDg2SDZiSEVRVjJ6U1BUVkhhcDhDNXU1SWxrWEJONVZGSnYvS3dwME5vbnBTL1lGZFRjdmRkaC9DQ3ovSS8zeWl2UHpMRkFXMjFUN3pzQUdkUVFKQkFNWGk0cHRNVVp2dnQrVHYvWFdqK0Z4aG5qd09JTnV0TGtubm1zYmdvT2F5RnNRbFhZQTgwVGNGeDVrNUR5YU9aTUVFV1pYODFRNTV0Y1RlaSsrcStYc0NRUUREZjA2NCtJeWVSKzRrRGZMNHZONktOcTBjK3lEZEs4QWw1ZEtEWFpDd3NIbWlxUGxFTWJ2SGR0Q0JFMjN5NVdRUDFQZnJvcWN0dUN3UnFrdGNNdlB4QWtFQXdPMm1UeENHVkVqUCtsVjh3SEFmMlRtWFF5Zm5JeVhpQmszVzJlVHhHbG93MWdVejlxM1VzQmRqZFdCckJBVTU5L0Vjd3AyZ3Z4OHNkNGNkMlluUTl3SkFHM01hcUpvdGxHUGhLaXJUUE4yNEdZd0h6cFBzVDJHL1B4TC85ZllEUk92aWlGWlZlWi9LRC8yODFRTFhZMDJXT1NyY0RMZnY1Vm1BeHBJMHRxTm80UUpBUDFIWEpPckNzSXh3NzkvemlUdGY3UjJsSXRLZTY4clcrNVdoZ1l1amg4VnVvN2NVaHhNZzl0N1hjd1l3a1RMb0FXeFJqMXpvWG44OVR2NENGWFFTZEE9PWQABnBheV9pZG0AAAASOTAwMDg2MDAwMDI3NTQ3MTkzZAAMcGF5X3ByaXZfa2V5bQAAAcxNSUlCVkFJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0FUNHdnZ0U2QWdFQUFrRUF6amoreXRlUDErRU5vS25FYmZqSmNNVHhHSWNINUdqeGRjOXVnc0FMcjRtNitObU95U0Zqd2I4eWVIamViUWZlQi9yb09Bem9jb1Z1UHdHdGwwRWd0UUlEQVFBQkFrQnpKN2gvcEdlYWNQMmZIYTJtaXlwUlltZ08vamdWLzlQMXFXTllkODBPczZXcjE0UG5NVms3cHpqZTJJVndzcDNwMmtxdDZ1VzhDVHRzZzg0VTdJNXhBaUVBNXZGM3ljeHRWRUpQSUN6MUhudDFVSGlSUWlYbTZTNHBsWXJQL0ZGOUZnTUNJUURrbU9kaHFiUE9SRUVkaDJta0xZSC9jTDV0azB4eUcvMDN4Wk5wb3JOczV3SWhBS2djNE1GU2djZVRXWHdubmV1cG5YV052dGZ6TlV0TElsUk1yeWlTdlVhM0FpQjdmNWZSaldzVWpvOVhNcWNDQ1l2bndyTStZNHV6UWlmRkQ3cWFJVW9xRlFJZ05CS29ma01aY2F6YmU3R3pRWXBrUnpBNW9oMS9ZamdTZ2hTMk5KQWI5TzA9ZAALcGF5X3B1Yl9rZXltAAAAgE1Gd3dEUVlKS29aSWh2Y05BUUVCQlFBRFN3QXdTQUpCQU00NC9zclhqOWZoRGFDcHhHMzR5WERFOFJpSEIrUm84WFhQYm9MQUM2K0p1dmpaanNraFk4Ry9Nbmg0M20wSDNnZjY2RGdNNkhLRmJqOEJyWmRCSUxVQ0F3RUFBUT09ZAAGaXlvdXhpdAAAAANkAAdhcHBfa2V5bQAAACBiNWU0MWUwYWU0YTNjOWFiMmRjM2NhYjNiNzQ4OGE2NmQACWNsaWVudF9pZG0AAAAINzk1NTA1MDhkAA1jbGllbnRfc2VjcmV0bQAAACBhZjZjNjc2ZGRmNjI0OGNiYWMwNTc3MDA4ODAyNmZkMGQABmxlbm92b3QAAAACZAAGYXBwX2lkbQAAABQxNTA2MDgwNDQzNTgyLmFwcC5sbmQAB2FwcF9rZXltAAADLE1JSUNXd0lCQUFLQmdRRENxTDVYQS9ZMUtDWUUrVjVzQU8rdjVhYlJDU25jbG94VWVKN1crR2xXYkRhK1N1Qk01aXIvbFhHcEp5UWRaTGgzS1F4K1Zyd2RoQUQ0Z0hVUnozNndBYkxzT05NbFFyZWk2NW1qTjBLZGlPNFhzNnVCd1Z0V3lOUHRZczBFTlJ5K01NU2xkaUV0MUVwcXNHSDhpL2VqRzJrcWEvNlZOM1pCa0JmOXFWaE8yd0lEQVFBQkFvR0FKYitkY2JobDlYYjhzSGcvVkVoMk1yRWhRV1k2aFBsNDZ5U2RBT2taWEZZTjQ2Y1hpaklVWW8zemhhNytkT2pFVU85WDZlUWVCTWRGZk90RVNKanBZeGUyUTdmMzdPREpiRWJQYVRPNTFKamFtSGxpVzQxSWVFTlFLanduT3RFSjRwdnlYTzNsVXVxN1ZUOGZ6cFRZWEw1Q1ArLys1QSs2RXNxaHQ0bVRVeUVDUVFEcGdaZ2V0ZWw2dUU5aHBZZVNmVHNFMmNMemFxTGJ0ZHlMSVpyWW9pRXJNVHpadTk2d1FqcWozZGlSQy9mSjdVdkN4OWhiMnBEM0F1dGUvTWtLQTFFUkFrRUExV2tvSlJSTEErclc0MVhTaW9zK3VsSTVlajB2anNTd1A5SzR4N3htNlRGNFBSY2tISUJ4R213MWFnYWo0RXZ2amsvYmcrMWpGL3JwQUY2ZkYrNmhLd0pBZWpFbDRKUkRQTVBzVG1YbnZ3R25lODlVbERxdVJKa3pjdDgvLzdNLzlqRks3WW5CYTYwTXNLbXI1YU5FcExkM21OTXBaay9HNG12MXJYeE0yOStHY1FKQVl6dlVpUGxZc0dlZ3FIRWR4NEpjRnJOcE9xZjgxendxWUdNUnZQNmtNOGJuRERFWWY1QlNCMkZOclJHTlhoeXhOZEY0VjI0bzU5dXFRSnUvQ3BmUnBRSkFjWVZ4K25IWjgyWFdnS2oxa2pMdmFxbWc4N1NjOUFZNm9GbmpEbXhGTit6aFRhSUdxQld3bDhTV21DSmMzMnJja3FZNktOakVXbFUwSDIydmxQUVdOQT09ZAAGbXVtYXlpdAAAAAJkAAZhcHBfaWRtAAAABjc4MTU0NmQAB2FwcF9rZXltAAAARjk2OTEzNTQ4NzZiN2M1YTF0ZTJBSXFidE52NEdjRVhIa2lwd2RLS0dMQzg3ZmVDWms1aHBqTzFzamdSeXlMVmQ2dWlMd0FkAARvcHBvdAAAAANkAAZhcHBfaWRtAAAABDM5NjRkAAdhcHBfa2V5bQAAABkxMGpaQ2dnOGl1UFdrb29DU1NPUzBrT3NzZAAKYXBwX3NlY3JldG0AAAAgNjE3NWE5ODZGNDg1OGQ4MzVCYjhBRmM1YTlDMjYxMjZkAAVxaDM2MHQAAAADZAAGYXBwX2lkbQAAAAkyMDI1Njc2NDZkAAdhcHBfa2V5bQAAACBiYzUyYTE2OTI1Y2Q5YTU1ZjQ3NWJmZjg0OTZjYTk4OWQACmFwcF9zZWNyZXRtAAAAIDEwMTZiYmY2NzM4MmVmNWNiNTgwNWNmYmQ0NTg0NTI0ZAADcXh6dAAAAAJkAAZhcHBfaWRtAAAADTIwMTUwODIwLU5UWlNkAAdhcHBfa2V5bQAAABRmbnFvcDNnbWc1c3dxeEBmYnVxd2QABXNvZ291dAAAAARkAAZhcHBfaWRtAAAABDEwMTFkAAdhcHBfa2V5bQAAAEAyYWVhZTE2MjYyNGI5MGYzMzU5OTNlM2IzZGIxNzYzMTM0N2Y3MDhjMGFkMmY5YzRjYmM4MDk5NTJkZWNkZDk3ZAAKYXBwX3NlY3JldG0AAABAMzIwNWJkNjY1NjhlNjc5ZDAwM2E5OWQxMGIwOTZmN2MxYWJjMmY1ZjRmMGE3YTAzZGYxZWYxODljOTg4OGFhM2QAB3BheV9rZXltAAAAJntENEE4NjBFQS0wQTczLTRDQzYtQjQ5Qy1CNkMxQUIxMzQwQUV9ZAACdWN0AAAAAmQABmFwcF9pZG0AAAAGNTU3MDU0ZAAHYXBwX2tleW0AAAAgYzdjMTAyNTQ4YjdjNjI1NDBiNGEwMWIwNmY5OGYzNzRkAAR2aXZvdAAAAANkAAZhcHBfaWRtAAAAIDBiYWUwNDQ5ZmMyZTg4MmY3ZTUyOTc2ZDBkMDIxZmU1ZAAFY3BfaWRtAAAAFDIwMTUwODA3MTE1MzMwMjkxMjI3ZAAGY3Bfa2V5bQAAACBjNDgwNWQwNmUyYzRjNDIwM2Q1ZmNjMDNmMzQxYmY3ZWQAA3dkanQAAAADZAAGYXBwX2lkbQAAAAkxMDAwMjgwOTlkAAdhcHBfa2V5bQAAACAwNmJkMTNhZDg1N2RiMDgyY2NkODYwMTZkYWM0Nzg3N2QAB3JzYV9rZXltAAAA2E1JR2ZNQTBHQ1NxR1NJYjNEUUVCQVFVQUE0R05BRENCaVFLQmdRQ2Q5NUZuSkZoUGlucE5pRS9oNFZBNmJVMXJ6UmE1K2EyNUJ4c25GWDhUenF1V3hxRENvZTR4RzZRS1hNWHVLdlY1N3RUUnB6Um8yamV0bzQwZUhLQ2x6RWdqeDlsVFlWYjJSRkhIRldpby9ZR1RmbnFJUFRWcGk3ZDd1SFkrMEZaMGxZTDVMbFc0RTIrQ1FNeEZPUFJ3ZnFHek1qczFTRGxIN2xWckxFVnk2UUlEQVFBQmQABnhpYW9taXQAAAADZAAGYXBwX2lkbQAAABMyODgyMzAzNzYxNTE3MzQzNzcyZAAHYXBwX2tleW0AAAANNTQyMTczNDMzNTc3MmQACmFwcF9zZWNyZXRtAAAAGHBaTzhrdmVUbXNiUjNtb3U3VytlQ3c9PWQABXlvdWt1dAAAAARkAAZhcHBfaWRtAAAABDE4NjdkAAdhcHBfa2V5bQAAABAyZjgwMmNmMWE3MzZmZjM5ZAAKYXBwX3NlY3JldG0AAAAgZDM5MzIwYmNkZTEyM2VkZTdiNDY5ZjgyY2UxYWIwOTBkAAdwYXlfa2V5bQAAACBlYTQ4OTAwNDBlZmFmNTM5MDliMmY1MjUwZTNmZTEyN2QAA3l5aHQAAAAEZAAGYXBwX2lkbQAAAAUxMTA1M2QAB2FwcF9rZXltAAAAEGdqMk93d044aGU3UzMyNjdkAAZwYXlfaWRtAAAACjUwMDA0NjI2MTdkAAdwYXlfa2V5bQAAAKBRVVkzTWpaRU1ETTNPVU5DT0RWR016UkJNalpEUmpSRE5VRXdNMEUwTURJME1UQTBOMEZFTmsxVVVYcE5SRkUwVDBSQmVFMVVVVEJPVkVrMFRWUk5kMDE2WTNKTlZGa3pUMVJyTkUxVVp6Rk5SRkUwVFZSak1rMTZWWHBPVkdOM1RrUmpOVTU2VFROUFJFMHpUVVJSTTA1NmF6Uk5lbGt6ZAAKY3JlYXRlZF9hdGEAZAAFZ29vZHN0AAAAB20AAAAJU3RvcmU5MDAxdAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAACVN0b3JlOTAwMWQABG5hbWVtAAAADOWkqeelnuaciOWNoWQABXByaWNlYgAAC7hkAAtwcm9kdWN0X2lkc3QAAAAEZAAGY2NwbGF5bQAAAAYxMDA4OTJkAAdjb29scGFkbQAAAAExZAAGbGVub3ZvbQAAAAQ5MjE2ZAADeXlobQAAAAExZAAFdGl0bGVtAAAAEDHlvKDlpKnnpZ7mnIjljaFtAAAACVN0b3JlOTAwMnQAAAAGZAAIY3VycmVuY3ltAAAAA0NOWWQAAmlkbQAAAAlTdG9yZTkwMDJkAARuYW1lbQAAAA/kuIDlsI/loIbph5HluIFkAAVwcmljZWIAAAJYZAALcHJvZHVjdF9pZHN0AAAABGQABmNjcGxheW0AAAAGMTAwNzczZAAHY29vbHBhZG0AAAABMmQABmxlbm92b20AAAAEOTU0NmQAA3l5aG0AAAABMmQABXRpdGxlbQAAAAs5MOS4qumHkeW4gW0AAAAJU3RvcmU5MDAzdAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAACVN0b3JlOTAwM2QABG5hbWVtAAAAD+S4gOWkp+WghumHkeW4gWQABXByaWNlYgAABwhkAAtwcm9kdWN0X2lkc3QAAAAEZAAGY2NwbGF5bQAAAAYxMDA4NDhkAAdjb29scGFkbQAAAAEzZAAGbGVub3ZvbQAAAAQ5NTQ3ZAADeXlobQAAAAEzZAAFdGl0bGVtAAAADDMwMOS4qumHkeW4gW0AAAAJU3RvcmU5MDA0dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAACVN0b3JlOTAwNGQABG5hbWVtAAAAD+S4gOWwj+iii+mHkeW4gWQABXByaWNlYgAAGpBkAAtwcm9kdWN0X2lkc3QAAAAEZAAGY2NwbGF5bQAAAAYxMDA4NDlkAAdjb29scGFkbQAAAAE0ZAAGbGVub3ZvbQAAAAQ5NTQ4ZAADeXlobQAAAAE0ZAAFdGl0bGVtAAAADDkwMOS4qumHkeW4gW0AAAAJU3RvcmU5MDA1dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAACVN0b3JlOTAwNWQABG5hbWVtAAAAD+S4gOWkp+iii+mHkeW4gWQABXByaWNlYgAATVhkAAtwcm9kdWN0X2lkc3QAAAAEZAAGY2NwbGF5bQAAAAYxMDA4NTBkAAdjb29scGFkbQAAAAE1ZAAGbGVub3ZvbQAAAAQ5NTQ5ZAADeXlobQAAAAE1ZAAFdGl0bGVtAAAADTE2ODDkuKrph5HluIFtAAAACVN0b3JlOTAwNnQAAAAGZAAIY3VycmVuY3ltAAAAA0NOWWQAAmlkbQAAAAlTdG9yZTkwMDZkAARuYW1lbQAAAA/kuIDlsI/nrrHph5HluIFkAAVwcmljZWIAAIAgZAALcHJvZHVjdF9pZHN0AAAABGQABmNjcGxheW0AAAAGMTAwODUxZAAHY29vbHBhZG0AAAABNmQABmxlbm92b20AAAAEOTU1MGQAA3l5aG0AAAABNmQABXRpdGxlbQAAAA0yNjgw5Liq6YeR5biBbQAAAAlTdG9yZTkwMDd0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAJU3RvcmU5MDA3ZAAEbmFtZW0AAAAP5LiA5aSn566x6YeR5biBZAAFcHJpY2ViAAD9IGQAC3Byb2R1Y3RfaWRzdAAAAARkAAZjY3BsYXltAAAABjEwMDg1MmQAB2Nvb2xwYWRtAAAAATdkAAZsZW5vdm9tAAAABDk1NTFkAAN5eWhtAAAAATdkAAV0aXRsZW0AAAANNTI4MOS4qumHkeW4gWQAAmlkbQAAACA1M0E5OTNBQkUzQTFDQjExMEUxREM1OUFFNTU3RjVDOWQABG5hbWVtAAAAEOaImOelniBbYW5kcm9pZF1kABBwYXltZW50X2NhbGxiYWNrbQAAACpodHRwOi8vcGF5LmFkY29nLmZpcmV2YWxlLmNvbS9wYXkvZmlyZXZhbGVkABlwbGF0Zm9ybV9wYXltZW50X2NhbGxiYWNrdAAAAANkAAdhbmRyb2lkbQAAABBodHRwOi8vbG9jYWxob3N0ZAADaW9zbQAAABBodHRwOi8vbG9jYWxob3N0ZAADd3A4bQAAABBodHRwOi8vbG9jYWxob3N0ZAAMcmVkaXJlY3RfdXJpbQAAABsvYXV0aC9hdXRob3JpemF0aW9uX2NvZGVfY2JkAAVzY29wZW0AAAAAZAAGc2VjcmV0bQAAAEA1Njk2NUQyRDVGRDdFRjZGMkM0MThDM0ZDQTJGMDkxNzc4Q0YzNTQzQzc4MzVCRDhBRkIwQTU1REU4RTY3OThFZAAKc2hvcnRfbmFtZW0AAAAJenNhbmRyb2lkZAAKc2tpcF9ncmFudGQABHRydWVkAB1zdXBwb3J0ZWRfY3VzdG9tX2lhcF9jaGFubmVsc3QAAAACZAAHYW5kcm9pZGpkAANpb3NqZAAEdHlwZWQABm5hdGl2ZWQACnVwZGF0ZWRfYXRiVeP2/mQADnVzZV9jdXN0b21faWFwdAAAAAJkAAdhbmRyb2lkZAAFZmFsc2VkAANpb3NkAAVmYWxzZQ=="

ImportFvacModel.import_fvac_client(data)

data = "g3QAAAARZAAKX19zdHJ1Y3RfX2QAGEVsaXhpci5GdmFjLk1vZGVsLkNsaWVudGQACGJpbmRpbmdzdAAAAABkAApjcmVhdGVkX2F0YlXgChRkAAVnb29kc3QAAAAGbQAAAAlTdG9yZTkwMDJ0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAJU3RvcmU5MDAyZAAEbmFtZW0AAAAP5LiA5bCP5aCG6YeR5biBZAAFcHJpY2ViAAACWGQAC3Byb2R1Y3RfaWRzdAAAAAFkAAphcHBsZXN0b3JlbQAAABVjb2cuZ29vZHMuYXMuY3JlZGl0czZkAAV0aXRsZW0AAAALOTDkuKrph5HluIFtAAAACVN0b3JlOTAwM3QAAAAGZAAIY3VycmVuY3ltAAAAA0NOWWQAAmlkbQAAAAlTdG9yZTkwMDNkAARuYW1lbQAAAA/kuIDlpKfloIbph5HluIFkAAVwcmljZWIAAAcIZAALcHJvZHVjdF9pZHN0AAAAAWQACmFwcGxlc3RvcmVtAAAAFmNvZy5nb29kcy5hcy5jcmVkaXRzMThkAAV0aXRsZW0AAAAMMzAw5Liq6YeR5biBbQAAAAlTdG9yZTkwMDR0AAAABmQACGN1cnJlbmN5bQAAAANDTllkAAJpZG0AAAAJU3RvcmU5MDA0ZAAEbmFtZW0AAAAP5LiA5bCP6KKL6YeR5biBZAAFcHJpY2ViAAAakGQAC3Byb2R1Y3RfaWRzdAAAAAFkAAphcHBsZXN0b3JlbQAAABZjb2cuZ29vZHMuYXMuY3JlZGl0czY4ZAAFdGl0bGVtAAAADDkwMOS4qumHkeW4gW0AAAAJU3RvcmU5MDA1dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAACVN0b3JlOTAwNWQABG5hbWVtAAAAD+S4gOWkp+iii+mHkeW4gWQABXByaWNlYgAATVhkAAtwcm9kdWN0X2lkc3QAAAABZAAKYXBwbGVzdG9yZW0AAAAXY29nLmdvb2RzLmFzLmNyZWRpdHMxOThkAAV0aXRsZW0AAAANMTY4MOS4qumHkeW4gW0AAAAJU3RvcmU5MDA2dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAACVN0b3JlOTAwNmQABG5hbWVtAAAAD+S4gOWwj+eusemHkeW4gWQABXByaWNlYgAAgCBkAAtwcm9kdWN0X2lkc3QAAAABZAAKYXBwbGVzdG9yZW0AAAAXY29nLmdvb2RzLmFzLmNyZWRpdHMzMjhkAAV0aXRsZW0AAAANMjY4MOS4qumHkeW4gW0AAAAJU3RvcmU5MDA3dAAAAAZkAAhjdXJyZW5jeW0AAAADQ05ZZAACaWRtAAAACVN0b3JlOTAwN2QABG5hbWVtAAAAD+S4gOWkp+eusemHkeW4gWQABXByaWNlYgAA/SBkAAtwcm9kdWN0X2lkc3QAAAABZAAKYXBwbGVzdG9yZW0AAAAXY29nLmdvb2RzLmFzLmNyZWRpdHM2NDhkAAV0aXRsZW0AAAANNTI4MOS4qumHkeW4gWQAAmlkbQAAACA5NzhBN0Q4NDA0MEZFNTg5RUQwQzc2Mjk1MTMxRTQzRGQABG5hbWVtAAAAEeaImOelnuWkp+mZhltJT1NdZAAQcGF5bWVudF9jYWxsYmFja20AAAAqaHR0cDovL3BheS5hZGNvZy5maXJldmFsZS5jb20vcGF5L2ZpcmV2YWxlZAAZcGxhdGZvcm1fcGF5bWVudF9jYWxsYmFja3QAAAADZAAHYW5kcm9pZG0AAAAQaHR0cDovL2xvY2FsaG9zdGQAA2lvc20AAAAQaHR0cDovL2xvY2FsaG9zdGQAA3dwOG0AAAAQaHR0cDovL2xvY2FsaG9zdGQADHJlZGlyZWN0X3VyaW0AAAAbL2F1dGgvYXV0aG9yaXphdGlvbl9jb2RlX2NiZAAFc2NvcGVtAAAAAGQABnNlY3JldG0AAABARjBEMDFFNEIwQzc3NjlDNTUyNDI0QUZBNTREOTZGNUZBMjMzRkVBMzdGMUNEQkI4OUQ0OUFEM0FBNTYxNjM2NWQACnNob3J0X25hbWVtAAAAB3pzY25pb3NkAApza2lwX2dyYW50ZAAEdHJ1ZWQAHXN1cHBvcnRlZF9jdXN0b21faWFwX2NoYW5uZWxzdAAAAAJkAAdhbmRyb2lkamQAA2lvc2pkAAR0eXBlZAAGbmF0aXZlZAAKdXBkYXRlZF9hdGJWFjAoZAAOdXNlX2N1c3RvbV9pYXB0AAAAAmQAB2FuZHJvaWRkAAVmYWxzZWQAA2lvc2QABWZhbHNl"


ImportFvacModel.import_fvac_client(data)
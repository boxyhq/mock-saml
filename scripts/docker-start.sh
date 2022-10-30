docker run \
--rm \
--env PORT=8080 \
--env APP_URL=http://localhost:3000 \
--env ENTITY_ID=PRIVILEGEDEVCLOUD \
--env ACS_URL=http://localhost:8080/api/getResponse \
--env AUDIENCE=http://localhost:8080 \
--env USERNAME=matuss85 \
--env PUBLIC_KEY_BASE64=LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUMvRENDQWVRQ0NRREt2dDMwakw1UzZqQU5CZ2txaGtpRzl3MEJBUXNGQURBL01Rc3dDUVlEVlFRR0V3SlUKU0RFUU1BNEdBMVVFQ0F3SFFtRnVaMnR2YXpFUU1BNEdBMVVFQnd3SFFtRnVaMnR2YXpFTU1Bb0dBMVVFQ2d3RApRVWxUTUNBWERUSXlNVEF6TURBM05UTTBOMW9ZRHpNd01qSXdNekF5TURjMU16UTNXakEvTVFzd0NRWURWUVFHCkV3SlVTREVRTUE0R0ExVUVDQXdIUW1GdVoydHZhekVRTUE0R0ExVUVCd3dIUW1GdVoydHZhekVNTUFvR0ExVUUKQ2d3RFFVbFRNSUlCSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQVE4QU1JSUJDZ0tDQVFFQXJ1TU9ISTlTbU1SdQp6MVNpUW9DZkM0M1c4TlE4ZVI1Unp2aE1PQXlBK2tNSnNnKy9vNyszZG9GN0M1T1lXY2VYVG9oSFBXeGdVa1NmCmUvWXZSSUtkYnlmT214WENiblpRYlVoOTBOZkR6MFljQlZ6bFVDY1kyVDA4TnNNck1PZWx1ZXBUMmVpTjlIUUQKT3lnTDNmRHNzZlJsa2FJRGNwQmFlU3RpSmxoMXNsZ0dRa1hFTnROOFBDRzhUZUZGbmJ6cTczR3l2S2pLSHdKMwpoTFErN3dTb3VwMmpQUEh5TEZ0akpsMm5wWmdGY1JGanUzMnNQY3RhZllKVXJzRm5yRUt4dHlzWkRid29UeGUyCmJlRXRVYjJYcWNPUVRLanpONlRwY3FOTUI4MHF4d04zcHJkSmlNRDVjWWQwengwZjJIRnRGMUYwVkk4UzVjcDIKK3BKb2R5ZzJld0lEQVFBQk1BMEdDU3FHU0liM0RRRUJDd1VBQTRJQkFRQmgxSVBVbW5jV0ZBUmZVakpqRkRhNgp2L1Vrdmx3eXNDV0E2bU5pRnJpN2I5cVpEZmVpcWpLUVF3VkM0MEhCMmtYeHY2M3hMdUE4bEF1a0J1Mmw4cEMrCjV5RFhydjVuNWRVR3RJRXo4S09zMGY2WjNmeDljVDJKamo1S2RGVjA5WWVhYi9mdTNTSHA5a0ViSDJvcytlR3MKRnMrYTdFcVRoRlF5c2Q3M0NXb3ZCL20zNkNxMW44cUtBTmJqRjc0L0dyM1VrcHJwdjdvQU5lK2RHUHZ3VDZpWApWVDd1WnBpZitBZG54M0sxWlFwdWpLTjZVaGxBelc2NmZyMGdDVXcvcEFHZ2tla1A0RGUza3ptaUVTUDkzNFlzCjdxaUZjZWZoSVBhNWVtTG56c3QrSjQvZnZpM1FobUlNdnpQais1dXdIcTVGODllenBacGhFZHVid0lnUnVndi8KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo= \
--env PRIVATE_KEY_BASE64=LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2UUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktjd2dnU2pBZ0VBQW9JQkFRQ3U0dzRjajFLWXhHN1AKVktKQ2dKOExqZGJ3MUR4NUhsSE8rRXc0RElENlF3bXlENytqdjdkMmdYc0xrNWhaeDVkT2lFYzliR0JTUko5Nwo5aTlFZ3Axdko4NmJGY0p1ZGxCdFNIM1ExOFBQUmh3RlhPVlFKeGpaUFR3Mnd5c3c1Nlc1NmxQWjZJMzBkQU03CktBdmQ4T3l4OUdXUm9nTnlrRnA1SzJJbVdIV3lXQVpDUmNRMjAzdzhJYnhONFVXZHZPcnZjYks4cU1vZkFuZUUKdEQ3dkJLaTZuYU04OGZJc1cyTW1YYWVsbUFWeEVXTzdmYXc5eTFwOWdsU3V3V2VzUXJHM0t4a052Q2hQRjdadAo0UzFSdlplcHc1Qk1xUE0zcE9seW8wd0h6U3JIQTNlbXQwbUl3UGx4aDNUUEhSL1ljVzBYVVhSVWp4TGx5bmI2CmttaDNLRFo3QWdNQkFBRUNnZ0VBVWFiRXdlVFFoVzdBNVovNEdlQi9ZUithQ05xdVdVWWtuK01oZ3RHanJqUjYKWkY0aDlVdmZWajdodWVmeEs0bWFSUm92V0tndTJIb2RrL3krMk5lNnRWajZoMEhEZzF0TjlaZncxZjdHOXhFZQpxQXBWTGZUekR3b2VBTnRpWVBUbVZVVG9YVWJNY0NOeUZyNTl1K051UHkrQjlGcVdEWGtFSktweXFzQ0dRdnM3CnBDTTdIUGJGSUNIUElaZVgwMENaNDJ5OStkV1l3Q2JhU3dueEpjSjkvOEZOSnkrL1VaYnAvRXBGTHpCeU4wZW0KeERxWnlTQkJORXBRTGRGYy9PUEp1bUd1WWxRcTVxZE4wam1aU3oyZjNoK0JiYm9qUkZ3U2F6WlVFL0l0Sy8vKwpWSkZaVGpadGdTaTlOaE1MWVlzTHYvd3hoZUNzUjRuWXNYdm1ITWhPUVFLQmdRRG5TRlpYS2NiQXpqOFY2TWlpCllxVEVTb3V4NTk4aUdlQVJsOHRrbFMyUUtvQ1l5c0U2SythQzgvYnE4aDhOVGR4ZExSRDNVQzhLN1NjVHVoNWcKWkFDRnZzM21WZndFSm5XN1R0QmJCM2h2NWV2UXpraFpuZUZObUFLNXVVVzRIT0p5Vzk0T1JKZlNGQTNIemdPUgo4ZW1GUm1GRDkyb3U4WEgzMTY5Qm9aVkRxd0tCZ1FEQms4bjd5R2xWSFlxMDlTM1g1azNXaHBicEttNXdiMHJuCndqUm13dE9xN092U003T0l1RE56N0d2WVdVUnk4Yll3TERDVm83ZC8xWm9tVEhUQkwyTDJxRE5iNFpRb0JHZGcKcVcvTmV3NWxNY1NUVzYwdDNtQWJidTAzRTFNL2VmcGhraUpqeCtMWDlBVnBOaXpWM1YvUm90c1BJWnNrWUE1RQpQY1hCUm5nSWNRS0JnSGNQSk9zLzVVSFJxbVlUN0Z5em5SQXpNOUNFaGJnZlM5cWlvcUNIcnVuZEIxQWdaL0lUCk1Wbk9UeGpKUlRUckZQcWVQWEtpdzJURGltODhTM0RoYWVkdnZyekpISy9pUUk4STFuZFYxQ2orV2pPbVRWWmMKME9QSjBmVmJxOGxJalVYRGh2OGZUbXhseUdaSDVreVdGTmwzenBCWGFFRDhKK2duRHVBaFZ4NTdBb0dBYzFWaApoNkU5bU5mVUY4TG93SFRZTlpQVkFERW13ZGlkVVg0MUNIRFYra1hVcjFYY2h2M3dzZ1hQcjRSb011L3VzNzd3Clo0ZTJ3ZlI3Tm94aEYrVHEycmtXZUl6clgvaFh1NURZS3g1QlVtdVhpcENabXZXZVgxbjAvZGFHeUJBZDdOcEwKb1JXc0F5ekJ1SkR0bjdLWTcyZFBpekZqcFFXU0duaVBoWHM5OHhFQ2dZRUEyRmMvbU85aFlyNWhwekVxNXg5bwpNNjJGZGh1ZFFiUmFMZGZtWmtFRzY2VUhUTFZXSmx4MnZ6KzAvcXZadVBwOFpKVEp0ODZWdjFYbFI3TGM2ZDUrClpwZW5oNGUvd0VHZGMyV0pRRkV3bXF0SlVzR0EyWFVVYkErNU9VamFzMkdrYW02ekgvdE51TnkvbkpvNFJ2SUkKenUyMEEyQmN0Z2ZqeWhXaVExY1JBYlE9Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K \
-p 3000:8080 \
mock-saml:0.0.1-SNAPSHOT

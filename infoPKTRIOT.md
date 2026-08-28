
https://www.youtube.com/watch?v=Efa5yA3eLh0

pktriot.exe Enter



pktriot.exe configure



Tunnel configuration:
  Hostname: objective-waterfall-23401.pktriot.xyz
  Server: asia-southeast-48343.packetriot.xyz
  IPv4: 139.59.228.234
  IPv6: <nil>

Start the tunnel and visit URL to check its working:
  pktriot --config C:\Users\Ashu\.pktriot\config.json start
  https://objective-waterfall-23401.pktriot.xyz

Detailed help and step-by-step tutorials:
  https://docs.packetriot.com
  https://packetriot.com/tutorials.

Need more support?
  Email: support@packetriot.com
  Twitter: @packetriot (please follow us, we like new friends :)


pktriot.exe edit --name Vishavjeet_tunnel 



pktriot.exe tunnel http add --domain objective-waterfall-23401.pktriot.xyz --destination localhost --http 3000 --letsencrypt


pktriot.exe info


pktriot.exe start
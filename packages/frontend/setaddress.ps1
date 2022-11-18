$Env:REACT_APP_ADDRESS = (Get-NetIPAddress -InterfaceAlias Wi-Fi -AddressFamily IPv4).IPAddress
exit
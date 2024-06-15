function FindProxyForURL(url, host) {
    // List of IIJ DNS servers
    var iijDnsServers = ["210.130.188.5", "210.130.188.6"];

    // Function to check if the host resolves to an IIJ DNS server
    function isIijDns(host) {
        var resolvedIp = dnsResolve(host);
        return iijDnsServers.indexOf(resolvedIp) !== -1;
    }

    // Direct access for local network addresses
    if (isPlainHostName(host) || 
        shExpMatch(host, "*.local") || 
        isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") || 
        isInNet(dnsResolve(host), "172.16.0.0", "255.240.0.0") || 
        isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0")) {
        return "DIRECT";
    }

    // Use IIJ DNS for all other requests
    if (isIijDns(host)) {
        return "DIRECT";
    }

    // Default proxy settings
    return "PROXY yourproxyserver:8080; DIRECT";
}

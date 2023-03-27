class SubnetCalculator {

    subnets = [];

    constructor() {

        this.subnets = [];

        /**
         * Sorts the subnets by number of hosts in descending order and calculates the subnet fields
         */
        this.createRows = function () {

            //Sort the subnets by number of hosts in descending order
            this.subnets.sort((a, b) => {
                return b.numhost - a.numhost;
            });

            //Calculate the other fields
            //var subnetRow = this.calculate(0);

            for (var i = 0; i < this.subnets.length; i++) {

                var subnetRow = this.calculate(i);

                //Add the subnet to the rows
                this.subnets[i].broadcast = subnetRow.broadcast;
                this.subnets[i].range = subnetRow.range;
                this.subnets[i].realnumhost = subnetRow.realnumhost;
                this.subnets[i].wastehost = subnetRow.wastehost;

                if (this.subnets.length > i + 1)
                    this.subnets[i + 1].ipaddr = subnetRow.nextIp;
            }
        };

        /**
         * Calculate a subnet given the index in the subnets array
         * @param {number} i 
         * @returns 
         */
        this.calculate = function (i) {

            var ip = this.subnets[i].ipaddr;
            var numhost = parseInt(this.subnets[i].numhost) + 3; //Add 3 for the network, broadcast, and gateway addresses

            var hostBits = this.numToNextPowerOfTwo(numhost); //Number of bits needed to represent the number of hosts
            var newcidr = 32 - hostBits; //New cidr

            var realnumhost = Math.pow(2, hostBits) - 3; //New number of hosts
            var wastehost = realnumhost - (numhost - 3); //Number of wasted hosts

            var ipbin = [];
            ip.split(".").forEach(octet => {
                ipbin.push(parseInt(octet).toString(2).padStart(8, "0"));
            });

            var mask = cidrToSubnetMask(newcidr);
            var result = getIpRange(ip, mask);

            this.subnets[i].ipaddr = result.networkAddress + "/" + newcidr;
            this.subnets[i].realnumhost = realnumhost;
            this.subnets[i].wastehost = wastehost;

            var startIp = result.networkAddress.split(".");
            startIp[3] = parseInt(startIp[3]) + 1;

            var endIp = result.broadcastAddress.split(".");
            endIp[3] = parseInt(endIp[3]) - 2;

            var nextIp = this.getNextIp(result.broadcastAddress);

            return {
                broadcast: result.broadcastAddress,
                range: startIp.join(".") + " - " + endIp.join("."),
                realnumhost: realnumhost,
                wastehost: wastehost,
                nextIp: nextIp + "/" + newcidr
            }
        };

        /**
         * Helper function to convert a CIDR to a subnet mask, e.g. 24 to 255.255.255.0
         * @param {number} cidr 
         * @returns 
         */
        function cidrToSubnetMask(cidr) {
            var mask = [];
            for (var i = 0; i < 4; i++) {
                var n = Math.min(cidr, 8);
                mask.push(256 - Math.pow(2, 8 - n));
                cidr -= n;
            }
            return mask.join('.');
        }

        /**
         * Find the network address and the broadcast address given an IP address and its subnet mask
         * @param {string} ipAddress 
         * @param {string} subnetMask 
         * @returns 
         */
        function getIpRange(ipAddress, subnetMask) {
            // Convert the IP address and subnet mask to 32-bit integers
            const ipInt = ipToLong(ipAddress);
            const maskInt = ipToLong(subnetMask);

            // Calculate the network address and broadcast address
            const networkInt = ipInt & maskInt;
            const broadcastInt = networkInt | ~maskInt;

            // Convert the network and broadcast addresses back to dotted decimal notation
            const networkAddress = longToIp(networkInt);
            const broadcastAddress = longToIp(broadcastInt);

            // Return an object containing the network and broadcast addresses
            return {
                networkAddress,
                broadcastAddress,
            };
        }

        /**
         * Helper function to convert an IP address to a 32-bit integer
         * @param {string} ipAddress 
         * @returns 
         */
        function ipToLong(ipAddress) {
            return ipAddress.split('.').reduce((acc, octet, index) => {
                return acc + (parseInt(octet) << ((3 - index) * 8));
            }, 0);
        }

        /**
         * Helper function to convert a 32-bit integer to an IP address
         * @param {Long} long 
         * @returns 
         */
        function longToIp(long) {
            return [
                (long >>> 24) & 0xff,
                (long >>> 16) & 0xff,
                (long >>> 8) & 0xff,
                long & 0xff,
            ].join('.');
        }

        /**
         * Add a subnet to the list
         * @param {string} ipaddr
         * @param {number} numhost
         * @returns {void}
         */
        this.addSubnet = function (ipaddr, numhost) {
            this.subnets = this.subnets.concat({
                id: this.subnets.length + 1,
                ipaddr: ipaddr,
                broadcast: "",
                range: "",
                numhost: numhost,
                realnumhost: 0,
                wastehost: 0
            });
        };

        /**
         * numhost to the greater nearest power of 2 (e.g. 100 -> 128, 2^7 = 128) => N=7
         * @param {number} numhost
         * @returns {number}
         */
        this.numToNextPowerOfTwo = function (num) {
            return Math.ceil(Math.log(num) / Math.log(2));
        };

        /**
         * Get the next ip address from a given ip address
         * @param {string} ip 
         * @returns {string} next ip address
         */
        this.getNextIp = function (ip) {

            const broadcastInt = ipToLong(ip);
            const nextNetworkInt = (broadcastInt + 1) & 0xffffffff;
            const nextNetworkAddress = longToIp(nextNetworkInt);
            return nextNetworkAddress;
        };

        this.getRows = function () {
            return this.subnets;
        };

        return this;
    }
}

export default SubnetCalculator;
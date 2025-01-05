// SPDX-License-Identifier: UNLICENCED
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {RefugeeAid} from "../src/RefugeeAid.sol";

contract RefugeeAidScript is Script {
    RefugeeAid public refugeeAid;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        refugeeAid = new RefugeeAid();

        vm.stopBroadcast();
    }
}

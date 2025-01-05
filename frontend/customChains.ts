import { type Chain } from "viem";

export const lensSepolia: Chain = {
    id: 37_111,
    name: "Lens Network Sepolia Testnet",
    nativeCurrency: {
        decimals: 18,
        name: "GRASS",
        symbol: "GRASS",
    },
    rpcUrls: {
        default: { http: ["https://rpc.testnet.lens.dev"] },
    },
    blockExplorers: {
        default: { name: "BlockExplorer", url: "https://block-explorer.testnet.lens.dev" },
    },
    testnet: true,
};

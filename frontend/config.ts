import {getDefaultConfig} from 'connectkit';
import {createConfig, http} from "wagmi";
import { lensSepolia } from "./customChains";

export const config = createConfig(
    getDefaultConfig({
        appName: 'Refugees Aid',
        walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
        chains: [lensSepolia],
        transports: {
            [lensSepolia.id]: http(lensSepolia.rpcUrls.default.http[0])
        }
    })
);

declare module 'wagmi' {
    interface Register {
        config: typeof config;
    }
}

import {getDefaultConfig} from 'connectkit';
import {createConfig} from "wagmi";
import {mainnet, polygon} from 'wagmi/chains';

export const config = createConfig(
    getDefaultConfig({
        appName: 'Refugees Aid',
        walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
        chains: [mainnet, polygon]
    })
);

declare module 'wagmi' {
    interface Register {
        config: typeof config;
    }
}

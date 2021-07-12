import { Linking, Alert } from 'react-native';
import WalletConnectClient, { CLIENT_EVENTS } from '@walletconnect/client';
import { PairingTypes } from '@walletconnect/types';

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export let client: WalletConnectClient;
export let session: Awaited<ReturnType<typeof client.connect>>;

const main = async () => {
	client = await WalletConnectClient.init({
		relayProvider: 'wss://relay.walletconnect.org',
		metadata: {
			name: 'Quiz',
			description: 'Crypto-based trivia game',
			url: '#',
			icons: ['https://walletconnect.org/walletconnect-logo.png']
		}
	});

	client.on(
		CLIENT_EVENTS.pairing.proposal,
		async (proposal: PairingTypes.Proposal) => {
			const { uri } = proposal.signal.params;
			if (Linking.canOpenURL(uri)) {
				Linking.openURL(uri);
			} else {
				Alert.alert('Please install a WalletConnect compatible wallet.');
			}
		}
	);
};

export const connect = async () => {
	session = await client.connect({
		permissions: {
			blockchain: {
				chains: ['eip155:1']
			},
			jsonrpc: {
				methods: ['eth_sendTransaction', 'personal_sign', 'eth_signTypedData']
			}
		}
	});
};

main();

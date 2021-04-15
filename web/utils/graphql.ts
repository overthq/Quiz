import { Client, defaultExchanges, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { w3cwebsocket } from 'websocket';

const subscriptionClient = new SubscriptionClient(
	'ws://localhost:5000/v1/graphql',
	{ reconnect: true },
	w3cwebsocket
);

export const client = new Client({
	url: 'http://localhost:5000/v1/graphql',
	exchanges: [
		...defaultExchanges,
		subscriptionExchange({
			forwardSubscription: subscriptionClient.request
		})
	]
});

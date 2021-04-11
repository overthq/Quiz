import { Client, defaultExchanges, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const subscriptionClient = new SubscriptionClient(
	'http://localhost:5000/v1/graphql',
	{ reconnect: true }
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

import redis from 'redis';

const client = redis.createClient({
	url: process.env.REDIS_URL,

	...(process.env.NODE_ENV === 'production'
		? {
				tls: { rejectUnauthorized: false }
		  }
		: {})
});

client.on('connect', () => {
	console.log('Connected to Redis!');
});

client.on('error', (error: Error) => {
	console.log(error);
});

export default client;

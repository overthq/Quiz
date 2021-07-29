import redis from 'redis';

const prodOptions = {
	url: process.env.REDIS_TLS_URL,
	tls: { rejectUnauthorized: false }
};

const devOptions = { url: process.env.REDIS_URL };

const client = redis.createClient(
	process.env.NODE_ENV === 'production' ? prodOptions : devOptions
);

client.on('connect', () => {
	console.log('Connected to Redis!');
});

client.on('error', (error: Error) => {
	console.log(error);
});

export default client;

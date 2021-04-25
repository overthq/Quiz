import mongoose from 'mongoose';

mongoose.connect(process.env.DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', error => {
	console.error(error);
});

db.once('connected', () => {
	console.log('Connected to MongoDB!');
});

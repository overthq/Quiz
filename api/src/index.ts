import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', routes);

app.listen(Number(process.env.PORT), () => {
	console.log('Server running on port', process.env.PORT);
});

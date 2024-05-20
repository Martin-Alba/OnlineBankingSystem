import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { startServer } from './src/config.js';
import userRoutes from './src/routes/user.routes.js';
import operationRoutes from './src/routes/operation.routes.js'
import cors from 'cors'

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(`${__dirname}/../client`));

app.use(cors());
app.options('*', cors())
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    res.json({ msg: "Hello World" });
});

app.use('/api/users', userRoutes);
app.use('/api/banking-operation', operationRoutes);

startServer(app);

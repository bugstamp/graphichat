import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import cors from 'cors';

import api from './api';

const PUBLIC_PATH = path.resolve(__dirname, '../public');
const HTML_PATH = path.resolve(PUBLIC_PATH, './index.html');
const PORT = process.env.PORT || 3000;

const server = express();

server.use(express.static(PUBLIC_PATH));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(methodOverride());
server.use(cors({ credentials: true }));

server.use('/api', api);

server.get('*', (req, res) => {
  res.sendFile(HTML_PATH);
});

server.listen(PORT, () => {
  console.log(`Server is listening on port - ${PORT}`);
});

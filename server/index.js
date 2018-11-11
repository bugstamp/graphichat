import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import cors from 'cors';

const PUBLIC_PATH = path.resolve(__dirname, '../public');
const HTML_PATH = path.resolve(PUBLIC_PATH, './index.html');
const PORT = process.env.PORT || 3000;

const app = express();

app.set('port', PORT);
app.use(express.static(PUBLIC_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride());
app.use(cors({ credentials: true }));

app.get('*', (req, res) => {
  res.sendFile(HTML_PATH);
});

app.listen(app.get('port'), () => {
  console.log(`Server is listening: http://localhost:${PORT}`);
});

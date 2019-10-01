import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const dotenvConfig = dotenv.config({ path: '../.env' });
dotenvExpand(dotenvConfig);

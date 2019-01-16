import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const dotenvConfig = dotenv.config();

dotenvExpand(dotenvConfig);
require('./src/app');

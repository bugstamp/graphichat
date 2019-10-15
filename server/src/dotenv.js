import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const path = process.env.DOTENV_PATH || '../.env';

const dotenvConfig = dotenv.config({ path });
dotenvExpand(dotenvConfig);

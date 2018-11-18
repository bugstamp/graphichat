import path from 'path';
import fs from 'fs';
import { buildSchema } from 'graphql';

const schema = fs.readFileSync(path.resolve(__dirname, 'schema.gql'), 'utf-8');

export default buildSchema(schema);

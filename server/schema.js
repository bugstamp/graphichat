import path from 'path';
import fs from 'fs';
import { gql } from 'apollo-server-express';

const schema = fs.readFileSync(path.resolve(__dirname, './schema.gql'), 'utf-8');

export default gql(schema);

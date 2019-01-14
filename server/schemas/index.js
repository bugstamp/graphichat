import path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

const types = fileLoader(path.resolve(__dirname));

export default mergeTypes(types, { all: true });

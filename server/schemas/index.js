import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

const types = fileLoader(__dirname);

export default mergeTypes(types, { all: true });

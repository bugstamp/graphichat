require('dotenv').config({ path: '../.env' });

global.fetch = require('jest-fetch-mock');

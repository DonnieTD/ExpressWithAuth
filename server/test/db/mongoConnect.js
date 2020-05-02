var assert = require('assert');
import { connectToMongo } from '../../db/mongoConnect';

describe('Connect to mongo', function() {
  it('Should return a db connction', function() {
    console.log(connectToMongo)
  });
});
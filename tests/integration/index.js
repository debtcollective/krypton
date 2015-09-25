var expect = require('chai').expect;
var _ = require('lodash');
var os = require('os');
var path = require('path');
var Promise = require('bluebird');
var Utils = require('./Utils');

require('./../../');

describe('Integration Tests', function() {
  var databaseConfig;

  if (process.env.NODE_ENV == 'test') {
    databaseConfig = [
      {
        client : 'postgres',
        connection: {
          host : '127.0.0.1',
          database : 'krypton_test',
          user : 'travis'
        }
      }
    ]
  } else {
    databaseConfig = [
      {
        client : 'postgres',
        connection: {
          host : '127.0.0.1',
          database : 'krypton_test'
        }
      }
    ]
  }

  _.each(databaseConfig, function(knexConfig) {
    var session = Utils.initialize({ knexConfig : knexConfig });

    describe(knexConfig.client, function() {
      before(function() {
        return session.createDB();
      });

      require('./insert')(session);
      require('./update')(session);
      require('./query')(session);

      // after(function() {
      //   return session.destroy();
      // });

    });
  });
});
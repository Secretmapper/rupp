require('newrelic');
require('prerender-node');
// Start sails and pass it command line arguments
require('sails').lift(require('optimist').argv);

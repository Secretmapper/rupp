/**v
 * IndexController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to IndexController)
   */
  _config: {},

  index: function(req, res){
    if (req.url.indexOf('?_escaped_fragment_=') > -1) {
      var request = require('request');
      request('http://rupp-phantom.herokuapp.com/' + req.originalUrl, function (error, response, body) {
        console.log('escape2');
        console.log(error,  response.statusCode);
        if (!error && response.statusCode == 200) {
          console.log('escape3');
          console.log(body);
          res.set('Content-Type', 'text/html');
          res.send(body);
        }
      });
    }
    else
      res.view({'assetVersion': sails.config.assetVersion});
  }

  
};

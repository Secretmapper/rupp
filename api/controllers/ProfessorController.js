/**
 * ProfessorController
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
   * (specific to ProfessorController)
   */
  _config: {},

  json: function(req, res) {
    Professor.find({
      where: {
        or: [{firstName: {
              contains: req.param('name')
            }},{lastName: {
              contains: req.param('name')
            }}]
      }
    })
      .limit(10)
      .exec(function(err, data) {
        if(err) return res.send(err, 500);
        res.json(data);
      })
  },

  best: function(req, res){
    //todo: change to assoc
    /*
    Professor
      .where({'rating.overall':{'>':0}})
      .sort('rating.overall')
      .limit(10)
      .exec(function(err, data){
        console.log(data);
      })*/
    Professor
      .native(function(err, coll){
        coll.find()
          .sort({'rating.overall': -1})
          .limit(10)
          .toArray(function(err, data){
          console.log(err, data);
          res.json(data);
        })
      })
  }

  
};

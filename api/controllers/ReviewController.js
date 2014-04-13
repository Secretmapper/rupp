/**
 * ReviewController
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
   * (specific to ReviewController)
   */
  _config: {},

  create: function(req, res) {
    var params = req.param('params');
    params.user = {ip:req.ip};
    params.classTaken = params.classTaken.toUpperCase();
    //todo: validate
    var rating = params.rating;
    if(rating.helpfulness != null || rating.pedagogy != null || rating.easiness != null) {
      if(isFinite(String(rating.helpfulness)) ||
        isFinite(String(rating.pedagogy)) ||
        isFinite(String(rating.easiness))) {
        Review.create(req.param('params')).exec(function(err, data){
          if(err) return res.send(err, 500);
          res.json(data);
          Professor.findOne(params.professor_id).exec(function(err, prof){
            if(prof){
              var runningAverage = function(key){
                if (key != null)
                  key = key.toLowerCase();
                var upKey = key.substring(0,1).toUpperCase()+key.substring(1);

                prof.rating['_num' + upKey] += 1;
                var num = prof.rating['_num' + upKey];
                var val = prof.rating[key];
                prof.rating[key] = ((val * (num - 1)) + rating[key])/num;
              }

              runningAverage('helpfulness');
              runningAverage('pedagogy');
              runningAverage('easiness');
              prof.rating.overall = (prof.rating.helpfulness + prof.rating.pedagogy + prof.rating.easiness) / 3;
              prof.save(function(err){

              });
            }
          })
        })
      }
    }
    else {
      return res.send(null, 400);
    }
  },

  paginate: function(req, res) {
    if(req.param('page') != null && isFinite(String(req.param('page'))) &&
      req.param('professor_id') != null)
    {
      Review.find({
        professor_id :req.param('professor_id')
      }).sort('year DESC')
        .limit(10)
        .skip(10 * (req.param('page') - 1))
        .exec(function(err, data) {
          if(err) return res.send(err, 500);
          //count items
          if(req.param('count')) {
            Review
              .count()
              .where({
                professor_id: req.param('professor_id')
              })
              .exec(function(cerr, cdata) {
              if(cerr) return res.send(err, 500);
              var result = {reviews:data, count:cdata};
              res.json(result);
            });
          }
          else {
            //wrap it up
            var result = {reviews:data};
            res.json(result);
          }
        });
    }
    else {
      return res.send(null, 400);
    }

  }

};

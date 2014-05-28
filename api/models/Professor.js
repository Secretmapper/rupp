/**
 * Professor
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    firstName   : {
      type: 'STRING',
      required: true
    },
    lastName    : {
      type: 'STRING',
      required: true
    },
    department  : {
      type: 'STRING'
    },
    emailAddress: {
      type: 'email'
    },
    rating: {
      type: 'json'
    }
  },

  beforeCreate: function(values, next){
    if((values.rating === undefined || values.rating == null) && (this.rating === undefined || this.rating == null)){
      values.rating = {
        helpfulness: 0,
        _numHelpfulness: 0,
        pedagogy: 0,
        _numPedagogy: 0,
        easiness: 0,
        _numEasiness: 0,
        overall: 0,
        _numOverall: 0
      };
    }
    next();
  },

  toJSON: function() {
    var obj = this.toObject();
    obj.name = obj.lastName + ", " + obj.firstName;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
  }

};

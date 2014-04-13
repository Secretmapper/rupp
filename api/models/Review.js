/**
 * Review
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

/*{ date:"2/22/14",
  classTaken: 'PIL 10',
  rating: [{title:'helpfulness', value:4}, {title:'easiness', value:3}, {title:'pedagogy', value:5}],
  comment:"Mahirap ang subject pero magaling si sir. Extra points pa pag magaling ka super bait."
}*/
  attributes: {
    /*
    user {
      ip: '',
      id: ''
    }
     */
    professor_id: {
      type: 'string',
      required: true
    },
    user: {
      type: 'json',
      required: true
    },
  	year: {
      type: 'int',
      required: true
    },
    classTaken: {
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 15
    },
    rating: {
      type: 'json',
      required: true
    },
    comment: {
      type: 'text',
      required: true,
      minLength: 1,
      maxLength: 350
    },
    approved: {
      type: 'boolean',
    }

  },

  beforeCreate: function(values, next) {
    values.classTaken = values.classTaken.toUpperCase();
    //todo: validate
    next();
  },

  toJSON: function() {
    var obj = this.toObject();
    delete obj._id;
    delete obj.user;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
  }

};

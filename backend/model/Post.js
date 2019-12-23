const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//monggose

// Define collection and schema
let Post = new Schema({
  post_name: {
    type: String
  }
}, {
  collection: 'posts'
})

Post.virtual('vote_list', {
  ref: 'PostUpvote', 
  localField: '_id', 
  foreignField: 'post_id'
});


Post.set('toJSON', {
  transform: function(doc, ret, options) {
    return ret;
  },virtuals: true
});

module.exports = mongoose.model('Post', Post)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//monggose

// Define collection and schema
let PostUpvote = new Schema({
  post_id: {
    type: String
  },
   ip_address: {
    type: String
  }
}, {
  collection: 'postupvote'
})

module.exports = mongoose.model('PostUpvote', PostUpvote)
const express = require('express');
const app = express();
const postRoute = express.Router();


let Post = require('../model/Post');
let PostUpvote = require('../model/PostUpvote');

// Add Post
postRoute.route('/add-post').post((req, res, next) => {
	console.log(req.body);
  Post.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Add Upvote
postRoute.route('/add-upvote').post((req, res, next) => {
	console.log(req.body);
  PostUpvote.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});


// Get all Posts
postRoute.route('/').get((req, res) => {
  Post.find().populate('vote_list').exec(function(error, data) {
    if (error) {
      console.log(error);
    } else {
      res.json(data)
    }
  })
})

// Get single post
postRoute.route('/read-post/:id').get((req, res) => {
  Post.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single post
postRoute.route('/getupvote/:ipaddress/:pid').get((req, res) => {
  
    PostUpvote.find({post_id:req.params.pid,ip_address:req.params.ipaddress}).exec(function(error, data) {  
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update post
postRoute.route('/update-post/:id').put((req, res, next) => {
  Post.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Post successfully updated!')
    }
  })
})

// Delete student
postRoute.route('/delete-post/:id').delete((req, res, next) => {
  Post.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})



module.exports = postRoute;
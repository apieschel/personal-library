/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const expect = require('chai').expect;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const Book = require("../models.js").bookModel;

module.exports = function (app) {
  
  app.route('/api/books/:id')
    .get(function (req, res) {
      if(req.params.id.length !== 24) {
        res.json("Please enter an ID that is exactly 24 characters.");
      } else {
        Book.findById(req.params.id, function(err, book) {
          if(err) throw err;
          if(book !== null) {
            res.json(book);
          } else {
            res.json("Sorry, but we couldn't find that book in our database.");
          }
        });    
      }
    })
  
    .post(function(req, res) {
      if(req.params.id.length !== 24) {
        res.json("Please enter an ID that is exactly 24 characters.");
      } else {
        Book.findByIdAndUpdate(req.params.id, { $addToSet: {comments: req.body.comment}, $inc: {commentcount : 1} }, {new: true}, function(err, book) {
          if(book === null || book === undefined) {
            res.json("Could not find that book in our database.");
          } else {
            if(err) throw err;
            res.json(book);
          }
        });  
      }
    })
  
    .delete(function(req, res) {
      if(req.params.id.length !== 24) {
        res.json("Please enter an ID that is exactly 24 characters.");
      } else {
        Book.findByIdAndDelete(req.params.id, function(err, book) {
          if(book === null || book === undefined) {
            res.json("Could not find that book in our database.");
          } else {
            if(err) throw err;
            res.json("Your book was successfully deleted.");
          }
        });  
      }
    });
  
  app.route('/api/books')
    .get(function (req, res){
      Book.find({}, function(err, books) {
			  if(err) throw err;
			  res.json(books);
		  });
    })
    
    .post(function (req, res) { 
      let title = req.body.title;
      Book.findOne({title: title}, function(err, data) {
        if(data !== null) {
          if(err) throw err;
          res.json("That book is already in our database!");						
        } else {			
            if(err) throw err;

            let newBook = new Book({title: title, commentcount: 0, comments: []});

            newBook.save(function(err, data) {
              if(err) throw err;
              res.json(data);
            });																		
        }
      });
    })
    
    .delete(function(req, res) {
          Book.deleteMany({}, function(err) {
            if(err) throw err;
          });
          res.json("Your library was successfully deleted.");
		  });
  
};

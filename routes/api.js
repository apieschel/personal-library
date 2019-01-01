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

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //console.log(req.headers);
      console.log(res);
      Book.findOne({title: title}, function(err, data) {
        if(data !== null) {
          if(err) throw err;
          res.json("That book is already in our database!");						
        } else {			
            if(err) throw err;

            let newBook = new Book({title: title, commentcount: 0});

            newBook.save(function(err, data) {
              if(err) throw err;
              res.json(data);
            });																		
        }
      });
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });

  app.route('/api/books/:id')
    .get(function (req, res){
      var bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      var bookid = req.params.id;
      var comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};

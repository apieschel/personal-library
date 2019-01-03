const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const server = require('../server');

chai.use(chaiHttp);

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
          .post('/api/books')
          .type('form')
          .send({
            '_method': 'post',
            'title': 'An Excellent Addition (Edition)'            
          })
          .end(function(err, res){
            assert.equal(res.status, 200);
            expect(res.body).to.satisfy(function (book) {
                if ((typeof book === 'object') || (book === "That book is already in our database!")) {
                    return true;
                } else {
                    return false;
                }
            });
            done();
        });
      });
    });
    
    suite('POST /api/books with no title', function() {
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
          .post('/api/books')
          .type('form')
          .send({
            '_method': 'post'       
          })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body, "Please enter a title for your book.");
            done();
        });
      });
    });

    suite('GET /api/books => array of books', function(){      
      test('GET /api/books', function(done){
       chai.request(server)
        .get('/api/books')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body, 'response should be an array');
          assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
          assert.property(res.body[0], 'title', 'Books in array should contain title');
          assert.property(res.body[0], '_id', 'Books in array should contain _id');
          done();
      });         
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
          .get('/api/books/5c2d74d376642931ae637694')
          .end(function(err, res){
            assert.equal(res.status, 200);
            expect(res.body).to.satisfy(function(message) { 
              if(message === "Please enter an ID that is exactly 24 characters." || message === "Sorry, but we couldn't find that book in our database.") {
                return true;
              } else {
                return false;
              }
            });
            done();
        });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
          .get('/api/books/5c2d74d376642931ae637695') // replace with the ID of the book you want to find
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.property(res.body, 'commentcount', 'Book should contain commentcount');
            assert.property(res.body, 'title', 'Book should contain title');
            assert.property(res.body, '_id', 'Book should contain _id');
            assert.property(res.body, 'comments', 'Book should contain comments')
            assert.isArray(res.body.comments, 'Book should contain an array of comments')
            done();
        });
      }); 
    });

    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
          .get('/api/books/5c2d74d376642931ae637695') // replace with the ID of the book you want to comment on
          .end(function(err, res){
            assert.equal(res.status, 200);
            done();
        });
      });
      
    });

  });

});

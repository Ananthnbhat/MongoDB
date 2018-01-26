/*node,mongodb should be installed,run mongod in bin directory of mongodb in cmd,run mongo in bin directory of mongodb in another cmd,
run 'node app' to start the server in git bash in this folder(e/Project/MongoDB udemy tutorial/mongooseEx)*/

var express = require('express');
var app = express();                                            //instance of exxpress is created using app variable that will allow us to create routes and start the server.
var bodyParser = require('body-parser');                        //body parser allows us to grab elements from front end and also the parameters from the url.
var mongoose = require('mongoose');
var Book = require('./Book.model');

var db = 'mongodb://localhost/example';

mongoose.connect(db);

app.use(bodyParser.json());                                     //this will allow us to parse json elements using body-parser.
app.use(bodyParser.urlencoded({
    extended: true
}));                                                            //give or recieve body elements through URLs.

app.get('/', (req, res) => res.send('happy to be here'));       //for the root directory.

app.get('/books', (req, res) => {                               //route to get all the books.
    Book.find({})
        .exec((err, result) => {
            if (err) res.send('Error has occured');
            else {
                res.json(result);
                console.log(result);
            }
        });
});

app.get('/books/:id', (req, res) => {                            //route to get one particular book using the id sent by the user in the url (req).
    Book.findOne({
        _id: req.params.id                                       //this syntax belongs to the body parser.
    })
        .exec((err, result) => {
            if (err) res.send('Error has occured');
            else {
                res.json(result);
                console.log(result);
            }
        });
});


app.post('/book', (req, res) => {
    var newBook = new Book();
    newBook.title = req.body.title,
        newBook.author = req.body.author,
        newBook.category = req.body.category

    newBook.save((err, result) => {
        if (err) res.send('Error has occured');
        else {
            res.send(result);
            console.log(result);
        }
    });
});

app.post('/book2', function (req, res) {
    Book.create(req.body, function (err, book) {
        if (err) {
            res.send('error saving book');
        } else {
            console.log(book);
            res.send(book);
        }
    });
});

app.put('/book/:id', function (req, res) {
    Book.findOneAndUpdate({
        _id: req.params.id
    },
        {
            $set: { title: req.body.title }
        }, { upsert: true }, function (err, newBook) {
            if (err) {
                res.send('error updating ');
            } else {
                console.log(newBook);
                res.send(newBook);
            }
        });
});

app.delete('/book/:id', function (req, res) {
    Book.findOneAndRemove({
        _id: req.params.id
    }, function (err, book) {
        if (err) {
            res.send('error removing')
        } else {
            console.log(book);
            res.status(204);
        }
    });
});

var port = 8080;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);                      //or server has started
});
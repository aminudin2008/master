var express = require('express');
var app = express();
var user = require('../model/user.js');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/api/user/:userid', function (req, res) 
{
    var id = req.params.userid;
    user.getUser(id, function (err, result) 
    {
    if (!err) 
    {
        res.send(result);
    }
    else
    {
        res.status(500).send("some error");
    }
    });
}),

app.get('/api/user', function (req, res) 
{
    user.getUsers(function (err, result) 
    {
        if (!err) 
        {
            res.send(result);
        }
        else
        {
            res.status(500).send("some error");
        }
    });
}),

app.post('/api/user/:userid', urlencodedParser, function (req, res) 
{
    var email = req.body.email;    
    var password = req.body.password;
    var id = req.params.userid;

    user.updateUser(email, password, id, function (err, result) 
    {
        if (!err) 
        {
            console.log(result);
            res.send(result + ' record updated');
        } 
        else
        {
            res.send(err.statusCode);
        }
    });
}),

app.delete('/api/user/:userid', function (req, res) 
{
    var userid = req.params.userid;
    user.deleteUser(userid, function (err, result) 
    {
        if (!err) 
        {
            res.send(result + ' record deleted');
        }
        else
        {
            console.log(err);
            res.status(500).send("Some error");
        }
    });
});
module.exports = app
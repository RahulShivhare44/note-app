const express = require("express");
const noteRouter = express.Router();
const pool = require("../pool");
const jwt = require("jsonwebtoken");

const { authenticator } = require('../middlewares/authenticator');
noteRouter.use(authenticator);

noteRouter.post('/fetchallnotes', (req, res) => {
    const token = req.headers.authorization || req.body.token;
    jwt.verify(token, "rahul", (err, decode) => {
        pool.query('select * from notes where user=?', [decode.userId], function (error, data) {
            if (error) {
                res.send({ message: error.message, status: 0 });
            }
            else {
                res.send({ data: data, message: "Success", status: 1 });
            }
        })
    })
});

noteRouter.post('/create', (req, res) => {
    const token = req.headers.authorization || req.body.token;
    jwt.verify(token, "rahul", (err, decode) => {
        pool.query('insert into notes(title, body, user) values(?, ?, ?)', [req.body.title, req.body.body, decode.userId], function (error, result) {
            if (error) {
                res.send({ message: error.message, status: 0 });
            }
            else {
                res.send({ message: "Note created", status: 1 });
            }
        });
    });
});

noteRouter.post('/editnote', (req, res) => {
    pool.query('update notes set title=?, body=? where noteid=?', [req.body.title, req.body.body, req.body.id], function (error, result) {
        if (error) {
            res.send({ message: error.message, status: 0 });
        }
        else {
            res.send({ message: "Note updated", status: 1 });
        }
    });
});

noteRouter.post('/deletenote', (req, res) => {
    pool.query('delete from notes where noteid=?', [req.body.id], function (error, result) {
        if (error) {
            res.send({ message: error.message, status: 0 });
        }
        else {
            res.send({ message: "Note deleted", status: 1 });
        }
    });
});

module.exports = { noteRouter };
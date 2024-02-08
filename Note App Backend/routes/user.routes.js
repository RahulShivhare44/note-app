const express = require("express");
const userRouter = express.Router();
const pool = require("../pool");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.get('/', (req, res) => {
    res.send("All the users");
});

userRouter.post("/register", function (req, res) {
    bcrypt.hash(req.body.password, 5, function (err, hash) {
        if (err) return res.send({ message: "something went wrong", status: 0 });
        pool.query('insert into users(name, email, password) values(?, ?, ?)', [req.body.firstName+req.body.lastName, req.body.email, hash], function (error, result) {
            if (error) {
                res.send({ message: "something went wrong", status: 0 });
            }
            else {
                res.send({ message: "Account created", status: 1 });
            }
        })
    })
})

userRouter.post("/checkuserexit", function (req, res) {
    const { email } = req.body;
    pool.query('select * from users where email=?', [email], function (error, data) {
        if (error) {
            res.send({ message: "something went wrong", status: 0 });
        }
        else {
            if (data.length > 0) {
                res.send({
                    message: "This email already register",
                    status: 1
                });
            }
            else {
                res.send({
                    message: "User does not exist",
                    status: 0
                })
            }
        }
    });
});

userRouter.post("/login", function (req, res) {
    const { email, password } = req.body;
    let option = {
        expiresIn: "30m"
    }

    pool.query('select * from users where email=?', [email], function (error, data) {
        if (error) {
            console.log('>>>>>>>>>>>>>>>>>', error)
            res.send({ message: "something went wrong", status: 0 });
        }
        else {
            if (data.length > 0) {
                let token = jwt.sign({ userId: data[0].userid }, "rahul", option);
                bcrypt.compare(password, data[0].password, function (err, result) {
                    if (err) return res.send({ message: "something went wrong" + err, status: 0 });
                    if (result) {
                        res.send({
                            message: "Logged In",
                            token: token,
                            status: 1
                        });
                    } else {
                        res.send({
                            message: "Incorrect password",
                            status: 2
                        });
                    }
                });
            }
            else {
                res.send({
                    message: "User does not exist",
                    status: 0
                })
            }
        }
    });
});

module.exports = { userRouter };
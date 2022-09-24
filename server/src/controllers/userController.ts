var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
// var Follow = require('../models/follow');
// var Publication = require('../models/publication');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');

var createUser =(req:any,res:any) =>{
    var params = req.body;
    var user = new User();
    if (params.username && params.emailId && params.password) {
        user.name = params.username;
        user.password = params.password;
        user.email = params.emailId;
        user.role = 'ROLE_USER';
        user.image = null;
        User.find( {email: user.email.toLowerCase()}).exec((err:any, users:any) => {
            if (err)
                return res.status(500).send({message: "Creating user error."});
            if (users && users.length >= 1) {
                return res.send({status:200,message: "User already exists."});
            } else {
                bcrypt.hash(params.password, null, null, (err: any, hash: any) => {
                    if (err) {
                        console.log("Error at 26",err)
                        return res.status(500).send({message: "Saving user error."});
                    }
                    user.password = hash;
                });
                user.save((err: any, userStored: any) => {
                    if (err)
                        return res.status(500).send({message: "Saving user error."});
                    if (userStored) {
                        return res.send({ status:200,user: userStored });
                    } else {
                        return res.status(404).send({message: "User Not Found."});
                    }
                });
            }
        });
    } else {
        return res.status(200).send({message: 'Invalid Data.'});
    }
    

}

var loginUser = (req:any, res:any) =>{
    var params = req.body;
    var email = params.email;
    var password = params.password;
    User.findOne({email: email}, (err:any, user:any) => {
        if (err)
            return res.status(500).send({message: "Login error."});
        if (user) {
            bcrypt.compare(password, user.password, (err: any, check: any) => {
                if (check) {
                    if (params.gettoken) {
                        return res.send({status:200,
                            token: jwt.createtoken(user)
                        });
                    } else {
                        user.password = undefined;
                        return res.send({status:200,user});
                    }
                } else {
                    return res.status(500).send({message: "Wrong email or password."});
                }
            });
        } else {
            return res.status(500).send({message: "Wrong email or password."});
        }
    });
}

module.exports = {
    createUser,
    loginUser
};
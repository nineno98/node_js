const session = require('express-session');
const express = require('express');

function requireAuth(req, res, next){
    if(req.session.userId){
        next();
    } 
    else{
        res.redirect('/login');
    }
}
module.exports = { requireAuth };
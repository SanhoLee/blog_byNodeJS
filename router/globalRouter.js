const express = require('express');
const globalRouter = express.Router();
const routes = require('../routes');

globalRouter.get(routes.home, (req,res)=>{
    res.render('index',{title: 'Hey', message: "Hello world !!"});
})

globalRouter.get(routes.articleTemp, (req,res)=>{
    res.render('index',{title: 'Hey', message: "This is articleTemp page... !!"});
})



module.exports = globalRouter;
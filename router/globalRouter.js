const express = require('express');
const globalRouter = express.Router();
const routes = require('../routes');

globalRouter.get(routes.home, (req,res)=>{
    res.render('index',{title: 'Hey', message: "Hello sanho !!"});
})

globalRouter.get(routes.articles, (req,res)=>{
    res.render('articles',{title: 'Hey', message: "This is articleTemp page... !!"});
})



module.exports = globalRouter;
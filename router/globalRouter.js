const express = require('express');
const globalRouter = express.Router();
const routes = require('../routes');

globalRouter.get(routes.home, (req,res)=>{
    res.render('home',
    {
        title: 'Hey', 
        message: "Hello sanho !!", 
        routes
    });
}
)

globalRouter.get(routes.about, (req,res)=>{
    res.render('about', 
    {
        title:'about',
        routes
    })
})

globalRouter.get(routes.articles, (req,res)=>{
    res.render('articles',{
        title: 'articles',
        message: "This is articleTemp page... !!",
        routes});
})

globalRouter.get(routes.comments, (req,res)=>{
    res.render('comments',{
        title: 'comments',
        message: "This is comments page... !!",
        routes});
})



module.exports = globalRouter;
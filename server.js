const express=require('express');
var app=express();
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

hbs.registerHelper("getYear",()=>{
    return new Date().getFullYear();
})

hbs.registerHelper("screamIt",(text)=>{
    return text.toUpperCase();

});
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
    
//     next();
// });


app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now}:${req.method} ${req.url}`;
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log("there was an error");
        }
    });
    next();

});



app.get('/',(req,res)=>{
    res.render('home.hbs',{
        title:'Home Page',
        
        welMsg:"Hi! You are on the home page"
    });

});


app.get('/about',(req,res)=>{
    res.render("about..hbs",{
        title:'About Page',
        year:new Date().getFullYear()
    });
});
app.get('/bad',(req,res)=>{
    res.render('about.hbs');
});

app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        title:'projects',
    });
});

app.listen(port,()=>{
    console.log(`Server started on port ${port}` )
});
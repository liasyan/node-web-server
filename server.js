const express = require('express');
const app = express();
const path = require("path");
const hbs = require('hbs');
const port = 3000;
const fs = require('fs');

hbs.registerPartials('/views/partials')
app.set('view engine', 'hbs');
// app.set("views", path.join("/public"));

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: \nmethod ${req.method} \nurl: ${req.url}`;
    // console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append server.log')
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static('public'));

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.send({
        name: 'Lia',
        likes: [
            'dance',
            'box'
         ]
     });
 });

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        aboutPage: 'About this page'
    });
});

app.get('/home', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomePage: 'Welcome home page',
    });
});

app.get('/bad', (req, res) => {
   res.send({
       errorMessage: 'everything is bad'
   })
})




app.listen(port, () => {
    console.log('server is running')
})


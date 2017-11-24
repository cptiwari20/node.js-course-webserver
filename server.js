const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + "/views/partials")
app.set("view engine", "hbs");
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('year', () => {
	var name = "By Vikas Tiwari ";
	return name + new Date().getFullYear() 
});

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = now + req.method + req.url;
	fs.appendFile( 'server.log', log + '\n' , (err) => {
		if(err){
			console.log("Unable to append the appendFile")
		}
	});
	next();


})
// app.use((req, res, next) => {
// res.render('hold', {
// 		welcomeMsg: "We'll right back"
// 	})
// })

hbs.registerHelper('capital', (text) => {
	return text.toUpperCase;
})


app.get("/", (req, res) => {
	res.render("home", {
		welcomeMsg: "Home Page!",
		header: "Welcome to homePage"
	})
});
app.get("/about", (req, res) => {
	res.render('about.hbs', {
		welcomeMsg: "About Page!",
	});
});

app.listen(3000, () => {
	console.log('Local server has been started.')
});
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const app = express();

app.use(cookieParser('Totally secret'))
app.use(bodyParser());

app.get('/', function (request, response) {
  response.cookie('test_cookie', 'value in a string %%30%30');
  console.log('Oooo a cookie ---->', request.cookies);
  response.send('<form method="post"><p>What is your name?'
    + '<input type="text" name="username"/>'
    + '<input type="submit" value="Click this"/></p></form>');
})

app.post('/set-name', function (request, response, next){
  const expires = 5 * 60 * 1000;
  //5 minutes
  if (request.body.username) {
    console.log(request.body);
    response.cookie('username', request.body.username, {maxAge: expires} )
    response.redirect('/')
  }
})

app.get('/set-name', function (request, response) {
  response.send('hi ' + request.cookies.username)
})

// app.post('/set-name', function (request, response) {
//   const expires = 5 * 60 * 10000;
//   console.log(request.body);
//   //5 minutes
//   if (request.body.username) {
//     console.log(request.body);
//     response.cookie('username', request.body.username, {maxAge: expires} )
//   }
// })

app.listen(3000);
console.log('go to localhost:3000 to see app');

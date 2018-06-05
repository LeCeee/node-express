const express = require('express');
const http = require('http');
const port = 3000;
const hostname = 'localhost';
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
app.use(morgan('dev'));

app.use(bodyParser.json());

app.all('/dishes',(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
});

app.get('/dishes',(req,res,next) => {
    res.end('will send all the dishes to you!');
});

app.post('/dishes', (req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
   });

app.put('/dishes',(req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported');
})

app.delete('/dishes',(req,res,next) => {
    res.end('will delete all the dishes for you');
})

app.get('/dishes/:dishId',(req,res,next) => {
    res.end('will get the details of the dish : ' + req.params.dishId + ' to you');
});
app.post('/dishes/:dishId', (req,res,next) => {
    res.statusCode = 403;
    res.end('post operation not supported on /dishes/'+ req.params.dishId);
});
app.put('/dishes/:dishId',(req,res,next) => {
    res.write('updating the dish: '+ req.params.dishId + '\n');
    res.end('will update the dish: ' + req.body.name + ' with details ' + req.body.description);
});
app.delete('/dishes/:dishId',(req,res,next) => {
    res.end('will delete the dish : ' + req.params.dishId + ' for you');
});

app.use(express.static(__dirname + '/public'));
app.use((req,res,next) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});
const server = http.createServer(app);

server.listen(port,hostname,() => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
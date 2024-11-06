/* Using ExpressJS frameword to create a simple REST API using micro services method */
const express = require('express');// Import the Express module
const { createProxyMiddleware } = require('http-proxy-middleware');// Import the http-proxy-middleware module
const PORT = 7000;// Set the port number for the server
var cors = require('cors');
const app = express();

/*app.use(cors({
    origin: 'http://localhost:7000', // Replace with your frontend URL
    methods: 'GET, POST', // Specify allowed HTTP methods
    credentials: true, // Allow cookies and authentication headers
  }));
*/
// Define the routes for the micro services
/*const routes = {
    '/adminservices':"http://adminservices:7001",
    '/customerservices':"http://customerservices:7002",
    '/googleservices':"http://googleservices:7003",
    '/settingservices':"http://settingservices:7004",
    '/notificationservices':"http://notificationservices:7005",
    '/reportservices':"http://reportservices:7006",
    '/subscriptionservices':"http://subscriptionservices:7007",
    '/voucherservices':"http://voucherservices:7008",
}
for(const route in routes){
    const target = routes[route];
    app.use(route, createProxyMiddleware({target}));
}*/
// Check if the middleware is called
app.use(function (req, res, next) {
    console.log("Middleware called")
    next();
});
// This is a sample route for testing
app.get('/Test', function (req, res) {
    res.send('Welcome to hordanso micro services');
});
  
// Start the server and listen on the specified port
app.listen(PORT,()=>{
    console.log("API GATEWAY SERVICE RUNNING ON PORT "+PORT);
});
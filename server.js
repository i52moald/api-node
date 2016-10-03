//server.js
// Añadimos dependencias
var express = require("express"),
    app     = express(),
    http    = require("http"),
    server  = http.createServer(app),
    mongoose = require("mongoose");

// Configuramos la app para que pueda realizar métodos CRUD
app.configure(function () {
  app.use(express.bodyParser()); // JSON parsing
  app.use(express.methodOverride()); // HTTP PUT and DELETE support
  app.use(app.router); // simple route management
});

// Métodos CRUD
routes = require('./routes/clientes')(app);

// Conexión con BBDD MongoDB
mongoose.connect('mongodb://localhost/clientes', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database Clientes');
  }
});

// petición GET del root. Simplemente mostrará un mensaje
app.get('/', function(req, res) {
  res.send("Bienvenido a iPrueba");
});

// El servidor escucha en el puerto 3000
server.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
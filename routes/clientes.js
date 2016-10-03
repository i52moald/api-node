//clientes.js
module.exports = function(app) {
 
  var Cliente = require('../models/cliente.js');
  // Todos las llamadas CRUD estarán en este fichero
  //GET - Devuelve todos los clientes de la BBDD
  allClientes = function(req, res) {
    console.log("GET - /clientes");
    return Cliente.find(function(err, clientes) {
      if(!err) {
        return res.send(clientes); 
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };
 
  //GET - Devuelve datos por ID
  findById = function(req, res) {
    console.log("GET - /cliente/:id");
    return Cliente.findById(req.params.id, function(err, cliente) {
      if(!cliente) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      if(!err) {
        // Send { status:OK, cliente { cliente values }}
        return res.send({ status: 'OK', cliente:cliente });
        // Send {cliente values}
        // return res.send(cliente);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };
 
  //POST - Inserta un nuevo dato en BBDD
  addCliente = function(req, res) {
    console.log('POST - /cliente');
    console.log(req.body);
 
    var cliente = new Cliente({
      model:    req.body.model,
      images :  req.body.images, 
      style:    req.body.style,
      size :    req.body.size, 
      colour:   req.body.colour, 
      price:    req.body.price,
      summary:  req.body.summary  
    });
 
    cliente.save(function(err) {
      if(!err) {
        console.log("Cliente created");
        return res.send({ status: 'OK', cliente:cliente });
      } else {
        console.log(err);
        if(err.name == 'ValidationError') {
          res.statusCode = 400;
          res.send({ error: 'Validation error' });
        } else {
          res.statusCode = 500;
          res.send({ error: 'Server error' });
        }
        console.log('Internal error(%d): %s',res.statusCode,err.message);
      }
    });
 
    res.send(cliente);
  };
 
  //PUT - Actualiza un registro ya existente
  updateCliente = function(req, res) {
    res.send('This is not implemented now');
  }
 
  //DELETE - Elimina un registro por su ID
  deleteCliente = function(req, res) {
    console.log("DELETE - /cliente/:id");
    return Cliente.findById(req.params.id, function(err, cliente) {
      if(!cliente) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
 
      return cliente.remove(function(err) {
        if(!err) {
          console.log('Removed cliente');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
        }
      })
    });
  }
 
  //Direcciones de la API
  app.get('/clientes', allClientes);
  app.get('/cliente/:id', findById);
  app.post('/cliente', addCliente);
  app.put('/cliente/:id', updateCliente);
  app.delete('/cliente/:id', deleteCliente);
 
}
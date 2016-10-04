angular.module('App', [])

function mainController($scope, $http) {
    $scope.newCliente = {};
    $scope.titulo = "Test WT";
    $scope.clientes = {};
    $scope.selected = false;
    
    // Read all clients
    $http.get('/clientes').success(function(data) {
        console.log('Entra en All Clientes' );
        $scope.clientes = data;
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });

    // Create cliente
    $scope.registrarCliente = function() {
        console.log('Entra en reg Clientes' );
        $http.post('/cliente', $scope.newCliente)
        .success(function(data) {
                $scope.newCliente = {}; // Borramos los datos del formulario
                $scope.clientes = data;
            })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Delete cliente
    $scope.borrarCliente = function(newCliente) {
        $http.delete('/cliente/:' + $scope.newCliente._id)
        .success(function(data) {
            $scope.newCliente = {};
            $scope.clientes = data;
            $scope.selected = false;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Select cliente and load in form
    $scope.selectCliente = function(cliente) {
        $scope.newCliente = cliente;
        $scope.selected = true;
        console.log($scope.newCliente, $scope.selected);
    };
}
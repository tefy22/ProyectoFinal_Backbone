
var RouterPrincipal= Backbone.Router.extend({
	initialize: function (el) {
		this.clientes= new Clientes();
		this.clientes.fetch();
		this.vistaInicio= new VistaInicio();
		this.vistaRegistroCliente= new VistaRegistroCliente();
		this.vistaListadoClientes= new VistaListadoClientes({
			collection: this.clientes
		});
	},
	routes:{
		"": "inicio",
		"registrarCliente": "mostrarRegistrarCliente",
		"listarClientes": "mostrarListarClientes",
		"detalleCliente/:idCliente": 'detalleCliente',
		"eliminarCliente/:idCliente": 'eliminarCliente',
	},
	inicio: function(){
		this.vistaInicio.render();
	},
	mostrarRegistrarCliente: function(){
		this.vistaRegistroCliente.render();
	},
	mostrarListarClientes: function(){
		this.vistaListadoClientes.render();	
	},
	detalleCliente: function(idCliente){
		var cliente= this.vistaListadoClientes.collection.findWhere({
            id: idCliente
        });
        $("#detalleId").val(cliente.get('id'));
        $("#detalleNombre").val(cliente.get('nombre'));
        $("#detalleApellido").val(cliente.get('apellido'));
        $("#detalleEdad").val(cliente.get('edad'));
        $("#detalleTelefono").val(cliente.get('telefono'));
        $("#detalleEmail").val(cliente.get('email'));

        $("#modalMostrarDetalleCliente").modal('show');
	},
	eliminarCliente: function(idCliente){
		this.clientes.remove(this.clientes.where({id: idCliente}));
		localStorage.removeItem(this.clientes.where({id: idCliente}));
    	this.vistaListadoClientes.render();
    	alert("Cliente Eliminado con Exito");
	}
})

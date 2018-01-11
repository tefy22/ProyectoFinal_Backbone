
var routerPrincipal;

var VistaInicio= Backbone.View.extend({
	el: $("#contenedorVistas"),
	template: _.template($("#plantillaInicio").html()),
	events:{
		"click #btnVistaRegistrarClientes": function (event) {
			routerPrincipal.navigate("registrarCliente",{
				trigger: true
			});
		},
		"click #btnVistaListadoClientes": function(event){
			routerPrincipal.navigate("listarClientes",{
				trigger: true
			});
		}
	},
	render: function(){
		$(this.el).html(this.template());
		return this;
	}
});

var VistaRegistroCliente= Backbone.View.extend({
	el:$("#contenedorVistas"),
	template: _.template($("#plantillaRegistroCliente").html()),
	events:{
		"click #btnRegistrarCliente": function(event){
			event.preventDefault();
			var cliente= new Cliente();

			cliente.set({
				id: $("#id").val()
			});
			cliente.set({
				nombre: $("#nombre").val()
			});
			cliente.set({
				apellido: $("#apellido").val()
			});
			cliente.set({
				edad: $("#edad").val()
			});
			cliente.set({
				telefono: $("#telefono").val()
			});
			cliente.set({
				email: $("#email").val()
			});

			//guardamos
			routerPrincipal.clientes.add(cliente);
			cliente.save();
			alert("Cliente Registrado con Exito!!");

			$("#id").val("");
			$("#nombre").val("");
			$("#apellido").val("");
			$("#edad").val("");
			$("#telefono").val("");
			$("#email").val("");
		},
		"click #btnSalir": function(event){
			routerPrincipal.navigate("",{
				trigger: true
			});
		}
	},
	render: function(){
		$(this.el).html(this.template());
		return this;
	}
});

var VistaListadoClientes= Backbone.View.extend({
	el: $("#contenedorVistas"),
	template: _.template($("#planillaListadoClientes").html()),
	initialize: function(){
		
	},
	events: {
		"click #btnSalir": function(event){
			routerPrincipal.navigate("",{
				trigger: true
			});
		}
	},
	render: function(){
		$(this.el).html(this.template());
		this.collection.each(function(cliente){
			$("#listaClientes").append('<tr><td>'+cliente.get("id")+'</td><td>'+cliente.get("nombre")+'</td><td>'+cliente.get("apellido")+'</td><td><a href="#detalleCliente/'+cliente.get("id")+'">Mostrar</a>'+'</td><td><a href="#eliminarCliente/'+cliente.get("id")+'"><span class="glyphicon glyphicon-floppy-remove"></span></a></td></tr>');
		},this)
		return this;
	}
});
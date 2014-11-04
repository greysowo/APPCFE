exports.definition = {
	config : {
		columns : {
			"id_falla" : "text primary key",
			"tipo" : "text",
			"descripcion" : "text",
			"direccion" : "text",
			"lat" : "real",
			"long" : "real",
			"imagen" : "text",
			"status" : "text",
			"ubicacion" : "text",
			"fecha_creacion" : "text",
			"fecha_recibido" : "text",
			"fecha_proceso" : "text",
			"fecha_resuelto" : "text"
		},
		adapter : {
			type : "sql",
			collection_name : "fallas",
			idAttribute : "id_falla"
		}
	},
	extendModel : function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};

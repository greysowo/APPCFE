exports.definition = {
	config : {
		columns : {
			"id_queja" : "text primary key",
			"tipo" : "text",
			"descripcion" : "text",
			"status" : "text",
			"imagen" : "text",
			"ubicacion" : "text",
			"fecha_creacion" : "text",
			"fecha_recibido" : "text",
			"fecha_proceso" : "text",
			"fecha_resuelto" : "text"
		},
		adapter : {
			type : "sql",
			collection_name : "quejas",
			idAttribute : "id_queja"
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
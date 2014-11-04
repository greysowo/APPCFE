exports.definition = {
	config : {
		columns : {
			"id_recordatorio" : "integer primary key autoincrement",
			"nombre" : "text",
			"fecha" : "text",
			"status" : "text"
		},
		adapter : {
			type : "sql",
			collection_name : "recordatorios",
			idAttribute : "id_recordatorio"
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
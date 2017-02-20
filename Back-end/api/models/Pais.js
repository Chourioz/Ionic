module.exports = {

    attributes: {
    	id:{
    		type: 'integer',
    		primaryKey: true,
        autoIncrement: true,
    	},

    	nombre: {
    		type: 'string',
    		required: true,
    		unique: true,
    	},

      codigo_telefonico: {
        type: 'string',
        size: 45,
      },

      name : {
        type: 'string',
        required: true,
        unique: true,
      }
    },

    registrar: function(datos, cb){
    	var error = 'Error registrar pais:';

    	if (!datos.nombre_pais || datos.nombre_pais == null) {
    		console.log(error.red, 'no se suministro el nombre del pais');
    		return cb('Error no se suministro el nombre del pais');
    	};

    	if (!datos.codigo_pais || datos.codigo_pais == null) {
    		console.log(error.red, 'no se suministro el codigo del pais');
    		return cb('Error no se suministroel código del pais');
    	};

    	var pais = {
    		codigo : datos.codigo_pais,
    		nombre: datos.nombre_pais,
    	};

    	Pais.create(pais, function(err, pais){
    		if (err) {
    			console.log(error.red, 'Error al guardar en la base de datos');
    			console.log(err);
    			return cb('Error al guardar los datos en la base de datos');
    		};

        return cb(undefined,pais);
    	});
    },
}

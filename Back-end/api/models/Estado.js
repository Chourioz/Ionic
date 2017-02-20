module.exports = {

  attributes: {
	 id:{
  		type: 'integer',
  		primaryKey: true,
      autoIncrement: true,
  	},

  	nombre: {
  		type: 'string',
  		size: 45,
  		required: true,
  	},


  	id_pais:{
  		model: 'pais',
  		required: true,
  	}
  },

  /*
  *   funcion
  *
  */

  consultaEscalonada : function(estado, cb){

    var buscar = {};

    if (estado && estado != null && estado != 0) {
      buscar.id = estado;
    };

    Estado.find(buscar,function(err, estados){
      if (err) {
        console.log('Error en consulta escalonada estado:'.red, 'error al conectar con la base de datos');
        console.log(err);
        return cb('Error al conectar con la base de datos');
      };

      if( estados.length == 0){
        return cb(undefined , {
          estado : estado,
          estados : estados,
          municipios : [],
          ciudades : [],
        });
      };

      if (!estado) {
        //estado = estados[0].id;
        return cb(undefined,{
          estado : 0,
          estados : estados,
          municipios : [],
          ciudades : [],
        });
      };

      Municipio.find({id_estado: estado}, function(err,municipios){
        if (err) {
          console.log('Error en consulta escalonada:'.red, 'error al conectar con la base de datos');
          console.log(err);
          return cb('Error al conectar con la base de datos');
        };

        Ciudad.find({id_estado: estado},function(err, ciudades){
          if (err) {
            console.log('Error en consulta escalonada:'.red, 'error al conectar con la base de datos');
            console.log(err);
            return cb('Error al conectar con la base de datos');
          };

          var resultado = {
            estado : estados[0],
            estados : estados,
            ciudades : ciudades,
            municipios : municipios,
          };

          return cb(undefined, resultado);
        });
      });

    });

  },

  // *********************************************************************************

};

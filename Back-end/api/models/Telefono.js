module.exports = {

  attributes: {

  	// ######### Datos Propios #########

  	id:{
  		type: 'integer',
  		primaryKey : true,
      autoIncrement: true,
  	},

  	numero:{
  		type: 'string',
  		maxLength: 16,
      unique: true,
  		required: true,
  	},

    // ####### Datos del usuario principal que valido el telefono como propio ####
    id_usuario : {
      model: 'usuario',
      required: true,
      unique: true
    },

  },

  // ################# Funciones de Comportamiento del Modelo  ########################

  /*
  *   funcion :: buscar
  *   descripción :: busca la informacion de un telefono registrado en el sistema.
  */

  buscar : function(datos, cb) {
     var criterio = {};

     // verificamos por que dato se piensa buscar el telefono
     if (datos.id) criterio.id = datos.id;
     else if (datos.numero) criterio.numero = datos.numero;

     Telefono.findOne(criterio).exec(function(err,telefono) {
      if (err) {
        console.log('Error consultando los telefonos:'.red, 'conectando con la base de datos');
        return cb({error: 'Error consultando la base de datos', codigo: 500});
      };

      // no se considera error el que no exista el número registrado. ya que de hecho en un posible
      // resultado
      return cb(undefined, telefono);
    });
  },

  // ********************************************************************************

  /*
  *		funcion :: registrar
  *		descripción :: crea una nueva instancia del telefono de un usuario.
  *   entrada :: datos del telefono, funcion siguiente
  *		salida :: ninguna
  *
  */

  registrar: function(datos, cb) {
    console.log('Datos registro telefonico :: '.yellow, datos);
    var telefono = {
      numero: datos.telefono_principal,
      id_usuario: datos.id_usuario
    };

    Telefono.create(telefono, function(err, telefono) {
      if (err) {
        console.log('Error creando telefono:'.red, err.Errors);

        var error = "Conectando con la base de datos";

        if (Object.keys(err.Errors).length > 0) {
          error = err.Errors[ Object.keys(err.Errors)[0] ][0]['message'];
        };

        return cb({error: 'Error ' + error});
      };

      if (!telefono) {
        console.log('Error al registrar telefono:'.red,'No se crearon los telefonos en la base de datos');
        return cb({error: 'Error no se crearon los telefonos en la base de datos'});
      };

      return cb(undefined,telefono);
    });
  },

 /*
  *   atributo :: validationMessages
  *   descripción :: define el conjunto de mensajes de error que retornara la funcion validate().
  *                  es necesario para aprovecha la libreria "sails-hook-validation".
  *   idioma :: estaran en español, si se quiere internacionalizar se puede usar el archivo
  *             config/locals, para indicar el idioma
  */

  validationMessages: {

    numero: {
      required: 'No se suministró el número del teléfono',
      maxLength: 'El número de teléfono no puede tener más de 45 caracteres',
      string: 'El número de teléfono no esta en un formato válido',
      unique: 'El número de teléfono suministrado ya se encuentra registrado'
    },
  },

  //*************************************************************************************************

};

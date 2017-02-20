module.exports = {
  attributes: {
    id_usuario: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      autoPk: false
    },
    tipo_persona: {
      type: 'string',
      required: true,
      enum: ['natural','juridica']
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    res_direccion: {
      type: 'string',
      maxLength: 200
    },
    password: {
      type: 'string',
      required: true
    },
    identificacion: {
      type: 'string',
      required: true,
      unique: true
    },
    telefono_principal: {
      model: 'telefono',
      //required: true,
      unique: true
    },
    telefono_secundario: {
      model: 'telefono'
    },
    imagen_perfil: {
      type: 'string'
    },
    persona_natural: {
      model: 'persona_natural'
    },
    persona_juridica: {
      model: 'persona_juridica'
    },
    pais: {
      required: true,
      model: 'pais'
    },
    estado: {
      model: 'estado'
    },
    ciudad: {
      model: 'ciudad'
    },
    // puntaje: {
    //   collection: 'puntaje',
    //   via: 'credibilidad'
    // },
    // comentario: {
    //   collection: 'comentario',
    //   via: 'credibilidad'
    // },
    producto: {
      model: 'afiliarproducto'
    }
  },


  registro_natural: function(datos,cb) {
    if (datos == null || datos == undefined) {
      return cb({error: 'No se sumistraron los datos requeridos para el registro', codigo: 404})
    };

    var datos_usuario = {
      tipo_persona: datos.tipo_persona,
      email: datos.email,
      identificacion: datos.identificacion,
      res_direccion: datos.res_direccion,
      pais: datos.pais,
      estado: datos.estado,
      ciudad: datos.ciudad,
      password: datos.password,
    };

    Usuario.create(datos_usuario, function(err, usuario) {
      // body...
      if (err) {
        console.log('Error :::'.red, err)
        return cb({error: 'Error consultando la base de datos', codigo: 500});
      };

      console.log('DATOS DEL USUARIO REGISTRADO ::: '.green, usuario);
      datos.id_usuario = usuario.id;

      Usuario.registrarTelefono(datos, function(error, telefono) {
        // body...
        if (error) {
          console.log('Error registrando telefono ::: '.red, error);
          return cb({error: 'Error consultando la base de datos', codigo: 500});
        }

        Usuario.registrarPersona(datos, function(error1, persona) {
          // body...
          if (error1) {
            console.log('Error registrando persona ::: '.red, error1);
            return cb({error: 'Error consultando la base de datos', codigo: 500});
          };

          var asociados = {};

          asociados.telefono_principal = telefono;
          asociados.persona_natural = persona.id;

          Usuario.update({id_usuario: usuario.id_usuario}, asociados, function(err1, result) {
            if (err1) {
              console.log('Error actualizando datos de usuario ::: '.red, err1);
              return cb({error: 'Error consultando la base de datos', codigo: 500});
            };

            return cb(undefined, result[0]);
          });
        });
      });
    });
  },

  registrarPersona: function(datos, cb) {
    Persona_natural.registrar(datos, function(err, persona) {
      if (err) {
        return cb(err)
      };

      return cb(undefined, persona);
    });
  },

  registrarTelefono: function(datos, cb) {
    Telefono.registrar(datos, function(err, telefono) {
      if (err) {
        return cb(err)
      };

      return cb(undefined, telefono.id);
    });

  },

  registro_juridico: function(datos, cb) {
    // body...
  },

  login: function(datos,cb) {
    if (datos.usuario == null || datos.usuario == undefined) {
      return cb({error: 'No se suministro el usuario de la cuenta', codigo: 404})
    };
    if (datos.password == null || datos.password == undefined) {
      return cb({error: 'No se suministro el password de la cuenta', codigo: 404})
    };

    Usuario.findOne({email: datos.usuario})
    .exec(function(err, usuario) {
      // body...
      if (err) {
        return cb({error: 'Error consultando en la base de datos', codigo: 500});
      };

      if (!usuario || usuario == null || usuario == undefined) {
        return cb({error: 'No hay usuarios registrados con el correo suministrado', codigo: 404});
      };

      if (usuario.password !== datos.password) {
        return cb({error: 'Contraseña incorrecta', codigo: 400});
      };

      return cb(undefined, usuario);
    });
  },

  consultar: function(datos, cb) {

  },

  recuperarPassword: function(datos, cb) {

  },

  cambiarPassword: function(datos, cb) {

  },

  modificar: function(datos, cb) {

  },
}

module.exports = {
  attributes: {
    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: 'string',
      required: true
    },
    apellido: {
      type: 'string',
      required: true
    },
    sexo: {
      type: 'string',
      enum: ['femenino', 'masculino']
    },
    fecha_nacimiento: {
      type: 'string'
    },
    id_usuario: {
      model: 'usuario',
      required: true
    }
  },

  registrar: function(datos, cb) {
    if (datos == null || datos == undefined) {
      return cb({error: 'No se sumistraron los datos necesarios para el registro', codigo: 400})
    };
    var persona = {
      nombre: datos.nombre,
      apellido: datos.apellido,
      fecha_nacimiento: datos.fecha_nacimiento,
      id_usuario: datos.id_usuario
    };

    Persona_natural.create(persona, function(err, usuario) {
      if (err) {
        return cb({error: 'Error consultando la base de datos', codigo: 500});
      };

      return cb(undefined, usuario);
    });
  },
}

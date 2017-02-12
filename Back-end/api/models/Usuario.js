module.exports = {
  attributes: {
    id_usuario: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true
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
    }
    telefono_principal: {
      model: 'telefono',
      required: true,
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
    puntaje: {
      collection: 'puntaje',
      via: 'credibilidad'
    },
    comentario: {
      collection: 'comentario',
      via: 'credibilidad'
    },
    producto: {
      model: 'afiliarproducto'
    }
  },


  registro: function(datos,cb) {

  },

  login: function(datos,cb) {

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

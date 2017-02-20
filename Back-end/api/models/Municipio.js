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

  	id_estado:{
  		model: 'estado',
  		required: true,
  	}
  }
};

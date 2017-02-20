module.exports = {

  attributes: {

  	id:{
  		type: 'integer',
  		autoIncrement: true,
  		primaryKey: true
  	},

  	isDefault: {
  		type: 'boolean'
  	},

  	pregunta: {
  		required: true,
  		type: 'string',
  		maxLength: 45
  	}

  }
};

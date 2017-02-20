module.exports = {

  consultarPaises : function(req,res) {
    if (req.method == "GET") {
      Pais.find().populateAll().exec(function (err, paises) {
        if (err) {
          return res.serverError({error: 'Error consultando la base de datos'})
        };

        return res.ok({paises: paises});
      });
    }else {
      return res.badRequest({error: 'Metodo de solicitud incorrecto'});
    };
  },

  consultarEstados : function(req, res) {
    if (req.method == "GET") {
      Estado.find().populateAll().exec(function(err, estados) {
        if (err) {
          return res.serverError({error: 'Error consultando la base de datos'});
        };

        return res.ok({estados: estados});
      });
    }else {
      return res.badRequest({error: 'Metodo de solicitud incorrecto'});
    };
  },

  consultarCiudades : function(req, res) {
    if (req.method == "GET") {
      Ciudad.find().populateAll().exec(function(err, ciudades) {
        if (err) {
          return res.serverError({error: 'Error consultando la base de datos'});
        };

        return res.ok({ciudades: ciudades});
      });
    }else {
      return res.badRequest({error: 'Metodo de solicitud incorrecto'});
    };
  },

  consultarMunicipios : function(req, res) {
    if (req.method == "GET") {
      Municipio.find().populateAll().exec(function(err, municipios) {
        if (err) {
          return res.serverError({error: 'Error consultando la base de datos'});
        };

        return res.ok({municipios: municipios});
      });
    }else {
      return res.badRequest({error: 'Metodo de solicitud incorrecto'});
    };
  },
}

module.exports = {


  registerUser: function (req, res) {
    if (req.method == 'POST') {
      var datos = req.params.all();

      Usuario.registro_natural(datos, function(err, usuario) {
        if (err) {
          return res.serverError(err);
        };
        var data_sesion = {
          usuario: usuario.email,
          password: usuario.password
        };

        Usuario.login(data_sesion, function(error, result) {
          if (error) {
            return res.serverError(error);
          };

          req.session.usuario = {
            id: usuario.id_usuario,
            nombre: usuario.nombre,
            apellido: usuario.apelldio,
            identificacion: usuario.identificacion
          };

          var siguiente = '/usuario';

          if (req.session.siguiente) {
            siguiente = req.session.siguiente;
          };

          return res.ok({siguiente: siguiente});
        });
      });
    }else {
      return res.badRequest({error: 'Metodo de solicitud incorrecto'});
    };
  },

  iniciarSesion: function(req, res) {
    if (req.method == "POST") {
      var datos = {
        usuario: req.params('usuario'),
        password: req.params('password'),
      };

      Usuario.login(datos, function(err, usuario) {
        if (err) {
          return res.serverError(err);
        };

        req.session.usuario = {
          id: usuario.id_usuario,
          nombre: usuario.nombre,
          apellido: usuario.apelldio,
          identificacion: usuario.identificacion,
        };

        var siguiente = '/usuario';

        if (req.session.siguiente) {
          siguiente = req.session.siguiente;
        };

        return res.ok({siguiente: siguiente});
      });

    }else {
      return res.badRequest({error: 'Metodo de solicitud incorrecto'});
    };
  },
}

/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  sails.hooks.http.app.set('trust proxy', true);


  Lift.cargarPaisesCodigo(function(err) {
    if (err) {
      console.log('Warning:'.red, 'no se crearon los datos de locacion por defecto');
    };
  });

  Lift.cargarPreguntas(function(err){});
  
  cb();
};

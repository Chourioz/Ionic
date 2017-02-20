/***************************************************************************
*   Servicio que aporta las funciones para la inicializacion del servidor  *
* referencia : https://www.npmjs.com/package/nodemailer 				   *
****************************************************************************/

module.exports = {

	/*
	*	funcion :: cargarDatosLocacion
	*	descripción :: carga los modelos de la base de datos, dedicados a la locacion
	*				   con instancias, por defecto.
	*/

	cargarDatosLocacion : function(cb) {

    Pais.find().exec(function(err, paises) {
      if (err) {
        console.log('Error iniciando carga por defecto: '.red,' al consultar en la base de datos los paises registrados');
      };

      if (paises.length == 0) {
        Pais.createEach( Lift.paisesDefecto ,function(err, paises){
          if (err) {
            console.log(err);
            return cb('Error al registrar paises');
          };
          console.log('n° paises registrados: '.green, paises.length);

          Estado.createEach( Lift.estadosDefecto, function(err, estados) {
            if (err) {
              console.log(err);
              return cb('Error al registrar estados');
            };
            console.log('n° estados registrados: '.green, estados.length);

            Municipio.createEach( Lift.municipiosDefecto, function(err, municipios) {
              if (err) {
                console.log(err);
                return cb('Error al registrar municipios');
              };
              console.log('n° municipios registrados: '.green, municipios.length);

              Ciudad.createEach( Lift.ciudadesDefecto, function(err, ciudades) {
                if (err) {
                  console.log(err);
                  return cb('Error al registrar ciudades');
                };
                console.log('n° ciudades registradas: '.green, ciudades.length);
                console.log('Datos de locacion registrados'.green);

                return cb();
              });
            });
          });
        });
      };
    });
	},

	// ******************************************************************************


  /*prueba de carga de paises*/

  cargarPaisesCodigo : function(cb){

    Pais.count(function(err, cantidad){
      if (err) {
        console.log(err);
        return cb(err);
      };

      if (cantidad != 0) {
        return cb();
      };

      Lift.cargarPaisesCSV(function(err, paises){

        if (err) {
          return cb(err);
        }else{

          Pais.createEach(paises,function(err, paises){
            if (err) {
              console.log(err);
              return cb(err);
            };

            console.log('se registraron :'.green, paises.length);

            Pais.findOne({nombre:'Venezuela'},function(err, vene){
              if (err) {
                return cb(err);
              }else{

                var estados = Lift.estadosDefecto;

                estados.forEach(function(estado){
                  estado.id_pais = vene.id;
                });

                Estado.createEach( estados, function(err, estados) {
                  if (err) {
                    console.log(err);
                    return cb('Error al registrar estados');
                  };
                  console.log('n° estados registrados: '.green, estados.length);

                  Municipio.createEach( Lift.municipiosDefecto, function(err, municipios) {
                    if (err) {
                      console.log(err);
                      return cb('Error al registrar municipios');
                    };
                    console.log('n° municipios registrados: '.green, municipios.length);

                    Ciudad.createEach( Lift.ciudadesDefecto, function(err, ciudades) {
                      if (err) {
                        console.log(err);
                        return cb('Error al registrar ciudades');
                      };
                      console.log('n° ciudades registradas: '.green, ciudades.length);
                      console.log('Datos de locacion registrados'.green);

                      return cb();
                    });
                  });
                });

              }

            });
          });
        };
      });

    })



  },

  cargarPaisesCSV: function(cb){
          // Codigo para parsear  el archivo
      var csv = require("fast-csv");
      var paises  = [];

      console.log('Cargando paises'.green);

      csv.fromPath(process.cwd()+"/assets/documentos/paises.csv",
        {headers: true}
        ).on("data", function(data){

          if (data['phone_code']){

            var pais = {
              nombre : data.nombre,
              name : data.name,
              codigo_telefonico : data.phone_code,
            };

            paises.push(pais);
          }
        }).on("end", function(){
           console.log("Carga de paises completada!".green);

           return cb(undefined, paises);
        }).on("error",function(err){
          console.log('Error Cargando paises'.red);
          console.log(err);
          return cb('Error cargando datos de paises');
       });
  },

  // carga de preguntas de seguridad
  cargarPreguntas: function(cb){
    Pregunta.findOrCreate(Lift.preguntas_seguridad, Lift.preguntas_seguridad, function(err, preguntas){
      if (err) {
        console.log('Error'.red, '-- Cargando Preguntas', '::', 'guardando en la base de datos');
        return cb(err);
      }else{
        console.log('Preguntas de seguridad por defecto cargadas'.green);
        cb(undefined, undefined);
      };
    });
  },


  preguntas_seguridad: [
    {pregunta: '¿Nombre de su escuela primaria?', isDefault:true},
    {pregunta: '¿Marca de vehículo preferido?', isDefault:true},
    {pregunta: '¿Apellido de su abuela materna?', isDefault:true},
    {pregunta: '¿Nombre de su primera mascota?', isDefault:true},
    {pregunta: '¿Nombre de su película favorita?', isDefault:true},
    {pregunta: '¿Segundo nombre de su padre?', isDefault:true},
    {pregunta: '¿Actor favorito?', isDefault:true}
  ],


	paisesDefecto : [
		{
       "id" : 1,
			 "nombre": "Venezuela",
		},
	],

	// ******************************************************************************

	/*
	*	atributo : estadosDefecto
	*/

	estadosDefecto :  [
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 1,
          "nombre": "Amazonas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 2,
          "nombre": "Anzoátegui",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 3,
          "nombre": "Apure",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 4,
          "nombre": "Aragua",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 5,
          "nombre": "Barinas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 6,
          "nombre": "Bolívar",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 7,
          "nombre": "Carabobo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 8,
          "nombre": "Cojedes",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 9,
          "nombre": "Delta Amacuro",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 10,
          "nombre": "Falcón",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 11,
          "nombre": "Guárico",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 12,
          "nombre": "Lara",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 13,
          "nombre": "Mérida",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 14,
          "nombre": "Miranda",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 15,
          "nombre": "Monagas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 16,
          "nombre": "Nueva Esparta",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 17,
          "nombre": "Portuguesa",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 18,
          "nombre": "Sucre",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 19,
          "nombre": "Táchira",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 20,
          "nombre": "Trujillo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 21,
          "nombre": "Vargas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 22,
          "nombre": "Yaracuy",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 23,
          "nombre": "Zulia",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 24,
          "nombre": "Distrito Capital",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_pais": {
            "id": 1,
            "nombre": "Venezuela",
            "createdAt": null,
            "updatedAt": null
          },
          "id": 25,
          "nombre": "Dependencias Federales",
          "createdAt": null,
          "updatedAt": null
        }
    ],
	// ******************************************************************************

	/*
	*	atributo : municipiosDefecto
	*/

	municipiosDefecto :
    [
      {
        "id_estado": 1,
        "id": 1,
        "nombre": "Alto Orinoco",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 1,
        "id": 2,
        "nombre": "Atabapo",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 1,
        "id": 3,
        "nombre": "Atures",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 1,
        "id": 4,
        "nombre": "Autana",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 1,
        "id": 5,
        "nombre": "Manapiare",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 1,
        "id": 6,
        "nombre": "Maroa",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 1,
        "id": 7,
        "nombre": "Río Negro",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 2,
        "id": 8,
        "nombre": "Anaco",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 2,
        "id": 9,
        "nombre": "Aragua",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 2,
        "id": 10,
        "nombre": "Manuel Ezequiel Bruzual",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 2,
        "id": 11,
        "nombre": "Diego Bautista Urbaneja",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 2,
        "id": 12,
        "nombre": "Fernando Peñalver",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 2,
        "id": 13,
        "nombre": "Francisco Del Carmen Carvajal",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 2,
        "id": 14,
        "nombre": "General Sir Arthur McGregor",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 2,
        "id": 15,
        "nombre": "Guanta",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 2,
        "id": 16,
        "nombre": "Independencia",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 2,
        "id": 17,
        "nombre": "José Gregorio Monagas",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 2,
        "id": 18,
        "nombre": "Juan Antonio Sotillo",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 2,
        "id": 19,
        "nombre": "Juan Manuel Cajigal",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 2,
        "id": 20,
        "nombre": "Libertad",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 2,
        "id": 21,
        "nombre": "Francisco de Miranda",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 2,
        "id": 22,
        "nombre": "Pedro María Freites",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 2,
        "id": 23,
        "nombre": "Píritu",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 2,
        "id": 24,
        "nombre": "San José de Guanipa",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 2,
        "id": 25,
        "nombre": "San Juan de Capistrano",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 2,
        "id": 26,
        "nombre": "Santa Ana",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 2,
        "id": 27,
        "nombre": "Simón Bolívar",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 2,
        "id": 28,
        "nombre": "Simón Rodríguez",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 3,
        "id": 29,
        "nombre": "Achaguas",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 3,
        "id": 30,
        "nombre": "Biruaca",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 3,
        "id": 31,
        "nombre": "Muñóz",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 3,
        "id": 32,
        "nombre": "Páez",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 3,
        "id": 33,
        "nombre": "Pedro Camejo",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 3,
        "id": 34,
        "nombre": "Rómulo Gallegos",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 3,
        "id": 35,
        "nombre": "San Fernando",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 4,
        "id": 36,
        "nombre": "Atanasio Girardot",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 4,
        "id": 37,
        "nombre": "Bolívar",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 4,
        "id": 38,
        "nombre": "Camatagua",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 4,
        "id": 39,
        "nombre": "Francisco Linares Alcántara",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 4,
        "id": 40,
        "nombre": "José Ángel Lamas",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 4,
        "id": 41,
        "nombre": "José Félix Ribas",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 4,
        "id": 42,
        "nombre": "José Rafael Revenga",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 4,
        "id": 43,
        "nombre": "Libertador",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 4,
        "id": 44,
        "nombre": "Mario Briceño Iragorry",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 4,
        "id": 45,
        "nombre": "Ocumare de la Costa de Oro",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 4,
        "id": 46,
        "nombre": "San Casimiro",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 4,
        "id": 47,
        "nombre": "San Sebastián",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 4,
        "id": 48,
        "nombre": "Santiago Mariño",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 4,
        "id": 49,
        "nombre": "Santos Michelena",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 4,
        "id": 50,
        "nombre": "Sucre",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 4,
        "id": 51,
        "nombre": "Tovar",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 4,
        "id": 52,
        "nombre": "Urdaneta",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 4,
        "id": 53,
        "nombre": "Zamora",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 5,
        "id": 54,
        "nombre": "Alberto Arvelo Torrealba",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 5,
        "id": 55,
        "nombre": "Andrés Eloy Blanco",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 5,
        "id": 56,
        "nombre": "Antonio José de Sucre",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 5,
        "id": 57,
        "nombre": "Arismendi",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 5,
        "id": 58,
        "nombre": "Barinas",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 5,
        "id": 59,
        "nombre": "Bolívar",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 5,
        "id": 60,
        "nombre": "Cruz Paredes",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 5,
        "id": 61,
        "nombre": "Ezequiel Zamora",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 5,
        "id": 62,
        "nombre": "Obispos",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 5,
        "id": 63,
        "nombre": "Pedraza",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 5,
        "id": 64,
        "nombre": "Rojas",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 5,
        "id": 65,
        "nombre": "Sosa",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 6,
        "id": 66,
        "nombre": "Caroní",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 6,
        "id": 67,
        "nombre": "Cedeño",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 6,
        "id": 68,
        "nombre": "El Callao",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 6,
        "id": 69,
        "nombre": "Gran Sabana",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 6,
        "id": 70,
        "nombre": "Heres",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 6,
        "id": 71,
        "nombre": "Piar",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 6,
        "id": 72,
        "nombre": "Angostura Raúl Leoni",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 6,
        "id": 73,
        "nombre": "Roscio",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 6,
        "id": 74,
        "nombre": "Sifontes",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 6,
        "id": 75,
        "nombre": "Sucre",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 6,
        "id": 76,
        "nombre": "Padre Pedro Chien",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 7,
        "id": 77,
        "nombre": "Bejuma",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 7,
        "id": 78,
        "nombre": "Carlos Arvelo",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 7,
        "id": 79,
        "nombre": "Diego Ibarra",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 7,
        "id": 80,
        "nombre": "Guacara",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 7,
        "id": 81,
        "nombre": "Juan José Mora",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 7,
        "id": 82,
        "nombre": "Libertador",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 7,
        "id": 83,
        "nombre": "Los Guayos",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 7,
        "id": 84,
        "nombre": "Miranda",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 7,
        "id": 85,
        "nombre": "Montalbán",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 7,
        "id": 86,
        "nombre": "Naguanagua",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 7,
        "id": 87,
        "nombre": "Puerto Cabello",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 7,
        "id": 88,
        "nombre": "San Diego",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 7,
        "id": 89,
        "nombre": "San Joaquín",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 7,
        "id": 90,
        "nombre": "Valencia",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 8,
        "id": 91,
        "nombre": "Anzoátegui",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 8,
        "id": 92,
        "nombre": "Tinaquillo",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 8,
        "id": 93,
        "nombre": "Girardot",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 8,
        "id": 94,
        "nombre": "Lima Blanco",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 8,
        "id": 95,
        "nombre": "Pao de San Juan Bautista",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 8,
        "id": 96,
        "nombre": "Ricaurte",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 8,
        "id": 97,
        "nombre": "Rómulo Gallegos",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 8,
        "id": 98,
        "nombre": "San Carlos",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 8,
        "id": 99,
        "nombre": "Tinaco",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 9,
        "id": 100,
        "nombre": "Antonio Díaz",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 9,
        "id": 101,
        "nombre": "Casacoima",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 9,
        "id": 102,
        "nombre": "Pedernales",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 9,
        "id": 103,
        "nombre": "Tucupita",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 104,
        "nombre": "Acosta",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 105,
        "nombre": "Bolívar",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 106,
        "nombre": "Buchivacoa",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 107,
        "nombre": "Cacique Manaure",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 108,
        "nombre": "Carirubana",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 109,
        "nombre": "Colina",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 110,
        "nombre": "Dabajuro",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 111,
        "nombre": "Democracia",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 112,
        "nombre": "Falcón",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 113,
        "nombre": "Federación",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 114,
        "nombre": "Jacura",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 115,
        "nombre": "José Laurencio Silva",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 116,
        "nombre": "Los Taques",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 117,
        "nombre": "Mauroa",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 118,
        "nombre": "Miranda",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 119,
        "nombre": "Monseñor Iturriza",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 120,
        "nombre": "Palmasola",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 121,
        "nombre": "Petit",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 122,
        "nombre": "Píritu",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 123,
        "nombre": "San Francisco",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 124,
        "nombre": "Sucre",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 125,
        "nombre": "Tocópero",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 126,
        "nombre": "Unión",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 127,
        "nombre": "Urumaco",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 10,
        "id": 128,
        "nombre": "Zamora",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 11,
        "id": 129,
        "nombre": "Camaguán",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 11,
        "id": 130,
        "nombre": "Chaguaramas",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 11,
        "id": 131,
        "nombre": "El Socorro",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 11,
        "id": 132,
        "nombre": "José Félix Ribas",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 11,
        "id": 133,
        "nombre": "José Tadeo Monagas",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 11,
        "id": 134,
        "nombre": "Juan Germán Roscio",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 11,
        "id": 135,
        "nombre": "Julián Mellado",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 11,
        "id": 136,
        "nombre": "Las Mercedes",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 11,
        "id": 137,
        "nombre": "Leonardo Infante",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 11,
        "id": 138,
        "nombre": "Pedro Zaraza",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 11,
        "id": 139,
        "nombre": "Ortíz",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 11,
        "id": 140,
        "nombre": "San Gerónimo de Guayabal",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 11,
        "id": 141,
        "nombre": "San José de Guaribe",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 11,
        "id": 142,
        "nombre": "Santa María de Ipire",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 11,
        "id": 143,
        "nombre": "Sebastián Francisco de Miranda",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 12,
        "id": 144,
        "nombre": "Andrés Eloy Blanco",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 12,
        "id": 145,
        "nombre": "Crespo",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 12,
        "id": 146,
        "nombre": "Iribarren",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 12,
        "id": 147,
        "nombre": "Jiménez",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 12,
        "id": 148,
        "nombre": "Morán",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 12,
        "id": 149,
        "nombre": "Palavecino",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 12,
        "id": 150,
        "nombre": "Simón Planas",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 12,
        "id": 151,
        "nombre": "Torres",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 12,
        "id": 152,
        "nombre": "Urdaneta",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 13,
        "id": 179,
        "nombre": "Alberto Adriani",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 13,
        "id": 180,
        "nombre": "Andrés Bello",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 13,
        "id": 181,
        "nombre": "Antonio Pinto Salinas",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 13,
        "id": 182,
        "nombre": "Aricagua",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 13,
        "id": 183,
        "nombre": "Arzobispo Chacón",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 13,
        "id": 184,
        "nombre": "Campo Elías",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 13,
        "id": 185,
        "nombre": "Caracciolo Parra Olmedo",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 13,
        "id": 186,
        "nombre": "Cardenal Quintero",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 13,
        "id": 187,
        "nombre": "Guaraque",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 13,
        "id": 188,
        "nombre": "Julio César Salas",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 13,
        "id": 189,
        "nombre": "Justo Briceño",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 13,
        "id": 190,
        "nombre": "Libertador",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 13,
        "id": 191,
        "nombre": "Miranda",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 13,
        "id": 192,
        "nombre": "Obispo Ramos de Lora",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 13,
        "id": 193,
        "nombre": "Padre Noguera",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 13,
        "id": 194,
        "nombre": "Pueblo Llano",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 13,
        "id": 195,
        "nombre": "Rangel",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 13,
        "id": 196,
        "nombre": "Rivas Dávila",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 13,
        "id": 197,
        "nombre": "Santos Marquina",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 13,
        "id": 198,
        "nombre": "Sucre",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 13,
        "id": 199,
        "nombre": "Tovar",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 13,
        "id": 200,
        "nombre": "Tulio Febres Cordero",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 13,
        "id": 201,
        "nombre": "Zea",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 14,
        "id": 223,
        "nombre": "Acevedo",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 14,
        "id": 224,
        "nombre": "Andrés Bello",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 14,
        "id": 225,
        "nombre": "Baruta",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 14,
        "id": 226,
        "nombre": "Brión",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 14,
        "id": 227,
        "nombre": "Buroz",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 14,
        "id": 228,
        "nombre": "Carrizal",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 14,
        "id": 229,
        "nombre": "Chacao",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 14,
        "id": 230,
        "nombre": "Cristóbal Rojas",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 14,
        "id": 231,
        "nombre": "El Hatillo",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 14,
        "id": 232,
        "nombre": "Guaicaipuro",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 14,
        "id": 233,
        "nombre": "Independencia",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 14,
        "id": 234,
        "nombre": "Lander",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 14,
        "id": 235,
        "nombre": "Los Salias",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 14,
        "id": 236,
        "nombre": "Páez",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 14,
        "id": 237,
        "nombre": "Paz Castillo",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 14,
        "id": 238,
        "nombre": "Pedro Gual",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 14,
        "id": 239,
        "nombre": "Plaza",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 14,
        "id": 240,
        "nombre": "Simón Bolívar",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 14,
        "id": 241,
        "nombre": "Sucre",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 14,
        "id": 242,
        "nombre": "Urdaneta",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 14,
        "id": 243,
        "nombre": "Zamora",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 15,
        "id": 258,
        "nombre": "Acosta",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 15,
        "id": 259,
        "nombre": "Aguasay",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 15,
        "id": 260,
        "nombre": "Bolívar",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 15,
        "id": 261,
        "nombre": "Caripe",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 15,
        "id": 262,
        "nombre": "Cedeño",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 15,
        "id": 263,
        "nombre": "Ezequiel Zamora",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 15,
        "id": 264,
        "nombre": "Libertador",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 15,
        "id": 265,
        "nombre": "Maturín",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 15,
        "id": 266,
        "nombre": "Piar",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 15,
        "id": 267,
        "nombre": "Punceres",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 15,
        "id": 268,
        "nombre": "Santa Bárbara",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 15,
        "id": 269,
        "nombre": "Sotillo",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 15,
        "id": 270,
        "nombre": "Uracoa",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 16,
        "id": 271,
        "nombre": "Antolín del Campo",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 16,
        "id": 272,
        "nombre": "Arismendi",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 16,
        "id": 273,
        "nombre": "García",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 16,
        "id": 274,
        "nombre": "Gómez",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 16,
        "id": 275,
        "nombre": "Maneiro",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 16,
        "id": 276,
        "nombre": "Marcano",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 16,
        "id": 277,
        "nombre": "Mariño",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 16,
        "id": 278,
        "nombre": "Península de Macanao",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 16,
        "id": 279,
        "nombre": "Tubores",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 16,
        "id": 280,
        "nombre": "Villalba",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 16,
        "id": 281,
        "nombre": "Díaz",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 17,
        "id": 282,
        "nombre": "Agua Blanca",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 17,
        "id": 283,
        "nombre": "Araure",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 17,
        "id": 284,
        "nombre": "Esteller",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 17,
        "id": 285,
        "nombre": "Guanare",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 17,
        "id": 286,
        "nombre": "Guanarito",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 17,
        "id": 287,
        "nombre": "Monseñor José Vicente de Unda",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 17,
        "id": 288,
        "nombre": "Ospino",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 17,
        "id": 289,
        "nombre": "Páez",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 17,
        "id": 290,
        "nombre": "Papelón",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 17,
        "id": 291,
        "nombre": "San Genaro de Boconoíto",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 17,
        "id": 292,
        "nombre": "San Rafael de Onoto",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 17,
        "id": 293,
        "nombre": "Santa Rosalía",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 17,
        "id": 294,
        "nombre": "Sucre",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 17,
        "id": 295,
        "nombre": "Turén",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 18,
        "id": 296,
        "nombre": "Andrés Eloy Blanco",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 18,
        "id": 297,
        "nombre": "Andrés Mata",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 18,
        "id": 298,
        "nombre": "Arismendi",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 18,
        "id": 299,
        "nombre": "Benítez",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 18,
        "id": 300,
        "nombre": "Bermúdez",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 18,
        "id": 301,
        "nombre": "Bolívar",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 18,
        "id": 302,
        "nombre": "Cajigal",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 18,
        "id": 303,
        "nombre": "Cruz Salmerón Acosta",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 18,
        "id": 304,
        "nombre": "Libertador",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 18,
        "id": 305,
        "nombre": "Mariño",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 18,
        "id": 306,
        "nombre": "Mejía",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 18,
        "id": 307,
        "nombre": "Montes",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 18,
        "id": 308,
        "nombre": "Ribero",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 18,
        "id": 309,
        "nombre": "Sucre",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 18,
        "id": 310,
        "nombre": "Valdéz",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 341,
        "nombre": "Andrés Bello",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 342,
        "nombre": "Antonio Rómulo Costa",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 343,
        "nombre": "Ayacucho",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 344,
        "nombre": "Bolívar",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 345,
        "nombre": "Cárdenas",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 346,
        "nombre": "Córdoba",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 347,
        "nombre": "Fernández Feo",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 348,
        "nombre": "Francisco de Miranda",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 349,
        "nombre": "García de Hevia",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 350,
        "nombre": "Guásimos",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 351,
        "nombre": "Independencia",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 352,
        "nombre": "Jáuregui",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 353,
        "nombre": "José María Vargas",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 354,
        "nombre": "Junín",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 355,
        "nombre": "Libertad",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 356,
        "nombre": "Libertador",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 357,
        "nombre": "Lobatera",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 358,
        "nombre": "Michelena",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 359,
        "nombre": "Panamericano",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 360,
        "nombre": "Pedro María Ureña",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 361,
        "nombre": "Rafael Urdaneta",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 362,
        "nombre": "Samuel Darío Maldonado",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 363,
        "nombre": "San Cristóbal",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 364,
        "nombre": "Seboruco",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 365,
        "nombre": "Simón Rodríguez",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 366,
        "nombre": "Sucre",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 367,
        "nombre": "Torbes",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 368,
        "nombre": "Uribante",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 19,
        "id": 369,
        "nombre": "San Judas Tadeo",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 20,
        "id": 370,
        "nombre": "Andrés Bello",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 20,
        "id": 371,
        "nombre": "Boconó",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 20,
        "id": 372,
        "nombre": "Bolívar",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 20,
        "id": 373,
        "nombre": "Candelaria",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 20,
        "id": 374,
        "nombre": "Carache",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 20,
        "id": 375,
        "nombre": "Escuque",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 20,
        "id": 376,
        "nombre": "José Felipe Márquez Cañizalez",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 20,
        "id": 377,
        "nombre": "Juan Vicente Campos Elías",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 20,
        "id": 378,
        "nombre": "La Ceiba",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 20,
        "id": 379,
        "nombre": "Miranda",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 20,
        "id": 380,
        "nombre": "Monte Carmelo",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 20,
        "id": 381,
        "nombre": "Motatán",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 20,
        "id": 382,
        "nombre": "Pampán",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 20,
        "id": 383,
        "nombre": "Pampanito",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 20,
        "id": 384,
        "nombre": "Rafael Rangel",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 20,
        "id": 385,
        "nombre": "San Rafael de Carvajal",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 20,
        "id": 386,
        "nombre": "Sucre",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 20,
        "id": 387,
        "nombre": "Trujillo",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 20,
        "id": 388,
        "nombre": "Urdaneta",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 20,
        "id": 389,
        "nombre": "Valera",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 21,
        "id": 390,
        "nombre": "Vargas",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 22,
        "id": 391,
        "nombre": "Arístides Bastidas",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 22,
        "id": 392,
        "nombre": "Bolívar",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 22,
        "id": 407,
        "nombre": "Bruzual",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 22,
        "id": 408,
        "nombre": "Cocorote",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 22,
        "id": 409,
        "nombre": "Independencia",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 22,
        "id": 410,
        "nombre": "José Antonio Páez",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 22,
        "id": 411,
        "nombre": "La Trinidad",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 22,
        "id": 412,
        "nombre": "Manuel Monge",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 22,
        "id": 413,
        "nombre": "Nirgua",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 22,
        "id": 414,
        "nombre": "Peña",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 22,
        "id": 415,
        "nombre": "San Felipe",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 22,
        "id": 416,
        "nombre": "Sucre",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 22,
        "id": 417,
        "nombre": "Urachiche",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 22,
        "id": 418,
        "nombre": "José Joaquín Veroes",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 23,
        "id": 441,
        "nombre": "Almirante Padilla",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 23,
        "id": 442,
        "nombre": "Baralt",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 23,
        "id": 443,
        "nombre": "Cabimas",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 23,
        "id": 444,
        "nombre": "Catatumbo",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 23,
        "id": 445,
        "nombre": "Colón",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 23,
        "id": 446,
        "nombre": "Francisco Javier Pulgar",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 23,
        "id": 447,
        "nombre": "Páez",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 23,
        "id": 448,
        "nombre": "Jesús Enrique Losada",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 23,
        "id": 449,
        "nombre": "Jesús María Semprún",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 23,
        "id": 450,
        "nombre": "La Cañada de Urdaneta",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 23,
        "id": 451,
        "nombre": "Lagunillas",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 23,
        "id": 452,
        "nombre": "Machiques de Perijá",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 23,
        "id": 453,
        "nombre": "Mara",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 23,
        "id": 454,
        "nombre": "Maracaibo",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 23,
        "id": 455,
        "nombre": "Miranda",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 23,
        "id": 456,
        "nombre": "Rosario de Perijá",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 23,
        "id": 457,
        "nombre": "San Francisco",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 23,
        "id": 458,
        "nombre": "Santa Rita",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 23,
        "id": 459,
        "nombre": "Simón Bolívar",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 23,
        "id": 460,
        "nombre": "Sucre",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 23,
        "id": 461,
        "nombre": "Valmore Rodríguez",
        "createdAt": null,
        "updatedAt": null
      },
      {
        "id_estado": 24,
        "id": 462,
        "nombre": "Libertador",
        "createdAt": null,
        "updatedAt": null
      }
    ],

	// ******************************************************************************

	/*
	*	atributo : ciudadesDefecto
	*/

	ciudadesDefecto :
      [
        {
          "id_estado": 1,
          "id": 1,
          "nombre": "Maroa",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 1,
          "id": 2,
          "nombre": "Puerto Ayacucho",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 1,
          "id": 3,
          "nombre": "San Fernando de Atabapo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 4,
          "nombre": "Anaco",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 5,
          "nombre": "Aragua de Barcelona",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 6,
          "nombre": "Barcelona",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 7,
          "nombre": "Boca de Uchire",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 8,
          "nombre": "Cantaura",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 9,
          "nombre": "Clarines",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 10,
          "nombre": "El Chaparro",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 11,
          "nombre": "El Pao Anzoátegui",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 12,
          "nombre": "El Tigre",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 13,
          "nombre": "El Tigrito",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 14,
          "nombre": "Guanape",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 15,
          "nombre": "Guanta",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 16,
          "nombre": "Lechería",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 17,
          "nombre": "Onoto",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 18,
          "nombre": "Pariaguán",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 19,
          "nombre": "Píritu",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 20,
          "nombre": "Puerto La Cruz",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 21,
          "nombre": "Puerto Píritu",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 22,
          "nombre": "Sabana de Uchire",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 23,
          "nombre": "San Mateo Anzoátegui",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 24,
          "nombre": "San Pablo Anzoátegui",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 25,
          "nombre": "San Tomé",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 26,
          "nombre": "Santa Ana de Anzoátegui",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 27,
          "nombre": "Santa Fe Anzoátegui",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 28,
          "nombre": "Santa Rosa",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 29,
          "nombre": "Soledad",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 30,
          "nombre": "Urica",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 2,
          "id": 31,
          "nombre": "Valle de Guanape",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 3,
          "id": 43,
          "nombre": "Achaguas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 3,
          "id": 44,
          "nombre": "Biruaca",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 3,
          "id": 45,
          "nombre": "Bruzual",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 3,
          "id": 46,
          "nombre": "El Amparo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 3,
          "id": 47,
          "nombre": "El Nula",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 3,
          "id": 48,
          "nombre": "Elorza",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 3,
          "id": 49,
          "nombre": "Guasdualito",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 3,
          "id": 50,
          "nombre": "Mantecal",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 3,
          "id": 51,
          "nombre": "Puerto Páez",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 3,
          "id": 52,
          "nombre": "San Fernando de Apure",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 3,
          "id": 53,
          "nombre": "San Juan de Payara",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 4,
          "id": 54,
          "nombre": "Barbacoas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 4,
          "id": 55,
          "nombre": "Cagua",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 4,
          "id": 56,
          "nombre": "Camatagua",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 4,
          "id": 58,
          "nombre": "Choroní",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 4,
          "id": 59,
          "nombre": "Colonia Tovar",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 4,
          "id": 60,
          "nombre": "El Consejo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 4,
          "id": 61,
          "nombre": "La Victoria",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 4,
          "id": 62,
          "nombre": "Las Tejerías",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 4,
          "id": 63,
          "nombre": "Magdaleno",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 4,
          "id": 64,
          "nombre": "Maracay",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 4,
          "id": 65,
          "nombre": "Ocumare de La Costa",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 4,
          "id": 66,
          "nombre": "Palo Negro",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 4,
          "id": 67,
          "nombre": "San Casimiro",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 4,
          "id": 68,
          "nombre": "San Mateo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 4,
          "id": 69,
          "nombre": "San Sebastián",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 4,
          "id": 70,
          "nombre": "Santa Cruz de Aragua",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 4,
          "id": 71,
          "nombre": "Tocorón",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 4,
          "id": 72,
          "nombre": "Turmero",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 4,
          "id": 73,
          "nombre": "Villa de Cura",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 4,
          "id": 74,
          "nombre": "Zuata",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 5,
          "id": 75,
          "nombre": "Barinas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 5,
          "id": 76,
          "nombre": "Barinitas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 5,
          "id": 77,
          "nombre": "Barrancas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 5,
          "id": 78,
          "nombre": "Calderas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 5,
          "id": 79,
          "nombre": "Capitanejo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 5,
          "id": 80,
          "nombre": "Ciudad Bolivia",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 5,
          "id": 81,
          "nombre": "El Cantón",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 5,
          "id": 82,
          "nombre": "Las Veguitas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 5,
          "id": 83,
          "nombre": "Libertad de Barinas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 5,
          "id": 84,
          "nombre": "Sabaneta",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 5,
          "id": 85,
          "nombre": "Santa Bárbara de Barinas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 5,
          "id": 86,
          "nombre": "Socopó",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 6,
          "id": 87,
          "nombre": "Caicara del Orinoco",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 6,
          "id": 88,
          "nombre": "Canaima",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 6,
          "id": 89,
          "nombre": "Ciudad Bolívar",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 6,
          "id": 90,
          "nombre": "Ciudad Piar",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 6,
          "id": 91,
          "nombre": "El Callao",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 6,
          "id": 92,
          "nombre": "El Dorado",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 6,
          "id": 93,
          "nombre": "El Manteco",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 6,
          "id": 94,
          "nombre": "El Palmar",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 6,
          "id": 95,
          "nombre": "El Pao",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 6,
          "id": 96,
          "nombre": "Guasipati",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 6,
          "id": 97,
          "nombre": "Guri",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 6,
          "id": 98,
          "nombre": "La Paragua",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 6,
          "id": 99,
          "nombre": "Matanzas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 6,
          "id": 100,
          "nombre": "Puerto Ordaz",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 6,
          "id": 101,
          "nombre": "San Félix",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 6,
          "id": 102,
          "nombre": "Santa Elena de Uairén",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 6,
          "id": 103,
          "nombre": "Tumeremo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 6,
          "id": 104,
          "nombre": "Unare",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 6,
          "id": 105,
          "nombre": "Upata",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 7,
          "id": 106,
          "nombre": "Bejuma",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 7,
          "id": 107,
          "nombre": "Belén",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 7,
          "id": 108,
          "nombre": "Campo de Carabobo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 7,
          "id": 109,
          "nombre": "Canoabo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 7,
          "id": 110,
          "nombre": "Central Tacarigua",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 7,
          "id": 111,
          "nombre": "Chirgua",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 7,
          "id": 112,
          "nombre": "Ciudad Alianza",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 7,
          "id": 113,
          "nombre": "El Palito",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 7,
          "id": 114,
          "nombre": "Guacara",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 7,
          "id": 115,
          "nombre": "Guigue",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 7,
          "id": 116,
          "nombre": "Las Trincheras",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 7,
          "id": 117,
          "nombre": "Los Guayos",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 7,
          "id": 118,
          "nombre": "Mariara",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 7,
          "id": 119,
          "nombre": "Miranda",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 7,
          "id": 120,
          "nombre": "Montalbán",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 7,
          "id": 121,
          "nombre": "Morón",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 7,
          "id": 122,
          "nombre": "Naguanagua",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 7,
          "id": 123,
          "nombre": "Puerto Cabello",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 7,
          "id": 124,
          "nombre": "San Joaquín",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 7,
          "id": 125,
          "nombre": "Tocuyito",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 7,
          "id": 126,
          "nombre": "Urama",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 7,
          "id": 127,
          "nombre": "Valencia",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 7,
          "id": 128,
          "nombre": "Vigirimita",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 8,
          "id": 129,
          "nombre": "Aguirre",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 8,
          "id": 130,
          "nombre": "Apartaderos Cojedes",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 8,
          "id": 131,
          "nombre": "Arismendi",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 8,
          "id": 132,
          "nombre": "Camuriquito",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 8,
          "id": 133,
          "nombre": "El Baúl",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 8,
          "id": 134,
          "nombre": "El Limón",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 8,
          "id": 135,
          "nombre": "El Pao Cojedes",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 8,
          "id": 136,
          "nombre": "El Socorro",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 8,
          "id": 137,
          "nombre": "La Aguadita",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 8,
          "id": 138,
          "nombre": "Las Vegas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 8,
          "id": 139,
          "nombre": "Libertad de Cojedes",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 8,
          "id": 140,
          "nombre": "Mapuey",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 8,
          "id": 141,
          "nombre": "Piñedo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 8,
          "id": 142,
          "nombre": "Samancito",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 8,
          "id": 143,
          "nombre": "San Carlos",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 8,
          "id": 144,
          "nombre": "Sucre",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 8,
          "id": 145,
          "nombre": "Tinaco",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 8,
          "id": 146,
          "nombre": "Tinaquillo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 8,
          "id": 147,
          "nombre": "Vallecito",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 9,
          "id": 148,
          "nombre": "Tucupita",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 24,
          "id": 149,
          "nombre": "Caracas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 24,
          "id": 150,
          "nombre": "El Junquito",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 151,
          "nombre": "Adícora",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 152,
          "nombre": "Boca de Aroa",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 153,
          "nombre": "Cabure",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 154,
          "nombre": "Capadare",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 155,
          "nombre": "Capatárida",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 156,
          "nombre": "Chichiriviche",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 157,
          "nombre": "Churuguara",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 158,
          "nombre": "Coro",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 159,
          "nombre": "Cumarebo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 160,
          "nombre": "Dabajuro",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 161,
          "nombre": "Judibana",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 162,
          "nombre": "La Cruz de Taratara",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 163,
          "nombre": "La Vela de Coro",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 164,
          "nombre": "Los Taques",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 165,
          "nombre": "Maparari",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 166,
          "nombre": "Mene de Mauroa",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 167,
          "nombre": "Mirimire",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 168,
          "nombre": "Pedregal",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 169,
          "nombre": "Píritu Falcón",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 170,
          "nombre": "Pueblo Nuevo Falcón",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 171,
          "nombre": "Puerto Cumarebo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 172,
          "nombre": "Punta Cardón",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 173,
          "nombre": "Punto Fijo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 174,
          "nombre": "San Juan de Los Cayos",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 175,
          "nombre": "San Luis",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 176,
          "nombre": "Santa Ana Falcón",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 177,
          "nombre": "Santa Cruz De Bucaral",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 178,
          "nombre": "Tocopero",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 179,
          "nombre": "Tocuyo de La Costa",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 180,
          "nombre": "Tucacas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 10,
          "id": 181,
          "nombre": "Yaracal",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 11,
          "id": 182,
          "nombre": "Altagracia de Orituco",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 11,
          "id": 183,
          "nombre": "Cabruta",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 11,
          "id": 184,
          "nombre": "Calabozo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 11,
          "id": 185,
          "nombre": "Camaguán",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 11,
          "id": 196,
          "nombre": "Chaguaramas Guárico",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 11,
          "id": 197,
          "nombre": "El Socorro",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 11,
          "id": 198,
          "nombre": "El Sombrero",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 11,
          "id": 199,
          "nombre": "Las Mercedes de Los Llanos",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 11,
          "id": 200,
          "nombre": "Lezama",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 11,
          "id": 201,
          "nombre": "Onoto",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 11,
          "id": 202,
          "nombre": "Ortíz",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 11,
          "id": 203,
          "nombre": "San José de Guaribe",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 11,
          "id": 204,
          "nombre": "San Juan de Los Morros",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 11,
          "id": 205,
          "nombre": "San Rafael de Laya",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 11,
          "id": 206,
          "nombre": "Santa María de Ipire",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 11,
          "id": 207,
          "nombre": "Tucupido",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 11,
          "id": 208,
          "nombre": "Valle de La Pascua",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 11,
          "id": 209,
          "nombre": "Zaraza",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 12,
          "id": 210,
          "nombre": "Aguada Grande",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 12,
          "id": 211,
          "nombre": "Atarigua",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 12,
          "id": 212,
          "nombre": "Barquisimeto",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 12,
          "id": 213,
          "nombre": "Bobare",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 12,
          "id": 214,
          "nombre": "Cabudare",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 12,
          "id": 215,
          "nombre": "Carora",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 12,
          "id": 216,
          "nombre": "Cubiro",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 12,
          "id": 217,
          "nombre": "Cují",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 12,
          "id": 218,
          "nombre": "Duaca",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 12,
          "id": 219,
          "nombre": "El Manzano",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 12,
          "id": 220,
          "nombre": "El Tocuyo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 12,
          "id": 221,
          "nombre": "Guaríco",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 12,
          "id": 222,
          "nombre": "Humocaro Alto",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 12,
          "id": 223,
          "nombre": "Humocaro Bajo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 12,
          "id": 224,
          "nombre": "La Miel",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 12,
          "id": 225,
          "nombre": "Moroturo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 12,
          "id": 226,
          "nombre": "Quíbor",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 12,
          "id": 227,
          "nombre": "Río Claro",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 12,
          "id": 228,
          "nombre": "Sanare",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 12,
          "id": 229,
          "nombre": "Santa Inés",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 12,
          "id": 230,
          "nombre": "Sarare",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 12,
          "id": 231,
          "nombre": "Siquisique",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 12,
          "id": 232,
          "nombre": "Tintorero",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 233,
          "nombre": "Apartaderos Mérida",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 234,
          "nombre": "Arapuey",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 235,
          "nombre": "Bailadores",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 236,
          "nombre": "Caja Seca",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 237,
          "nombre": "Canaguá",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 238,
          "nombre": "Chachopo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 239,
          "nombre": "Chiguara",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 240,
          "nombre": "Ejido",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 241,
          "nombre": "El Vigía",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 242,
          "nombre": "La Azulita",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 243,
          "nombre": "La Playa",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 244,
          "nombre": "Lagunillas Mérida",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 245,
          "nombre": "Mérida",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 246,
          "nombre": "Mesa de Bolívar",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 247,
          "nombre": "Mucuchíes",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 248,
          "nombre": "Mucujepe",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 249,
          "nombre": "Mucuruba",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 250,
          "nombre": "Nueva Bolivia",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 251,
          "nombre": "Palmarito",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 252,
          "nombre": "Pueblo Llano",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 253,
          "nombre": "Santa Cruz de Mora",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 254,
          "nombre": "Santa Elena de Arenales",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 255,
          "nombre": "Santo Domingo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 256,
          "nombre": "Tabáy",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 257,
          "nombre": "Timotes",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 258,
          "nombre": "Torondoy",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 259,
          "nombre": "Tovar",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 260,
          "nombre": "Tucani",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 13,
          "id": 261,
          "nombre": "Zea",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 262,
          "nombre": "Araguita",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 263,
          "nombre": "Carrizal",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 264,
          "nombre": "Caucagua",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 265,
          "nombre": "Chaguaramas Miranda",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 266,
          "nombre": "Charallave",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 267,
          "nombre": "Chirimena",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 268,
          "nombre": "Chuspa",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 269,
          "nombre": "Cúa",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 270,
          "nombre": "Cupira",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 271,
          "nombre": "Curiepe",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 272,
          "nombre": "El Guapo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 273,
          "nombre": "El Jarillo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 274,
          "nombre": "Filas de Mariche",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 275,
          "nombre": "Guarenas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 276,
          "nombre": "Guatire",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 277,
          "nombre": "Higuerote",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 278,
          "nombre": "Los Anaucos",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 279,
          "nombre": "Los Teques",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 280,
          "nombre": "Ocumare del Tuy",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 281,
          "nombre": "Panaquire",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 282,
          "nombre": "Paracotos",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 283,
          "nombre": "Río Chico",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 284,
          "nombre": "San Antonio de Los Altos",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 285,
          "nombre": "San Diego de Los Altos",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 286,
          "nombre": "San Fernando del Guapo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 287,
          "nombre": "San Francisco de Yare",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 288,
          "nombre": "San José de Los Altos",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 289,
          "nombre": "San José de Río Chico",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 290,
          "nombre": "San Pedro de Los Altos",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 291,
          "nombre": "Santa Lucía",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 292,
          "nombre": "Santa Teresa",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 293,
          "nombre": "Tacarigua de La Laguna",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 294,
          "nombre": "Tacarigua de Mamporal",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 295,
          "nombre": "Tácata",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 14,
          "id": 296,
          "nombre": "Turumo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 15,
          "id": 297,
          "nombre": "Aguasay",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 15,
          "id": 298,
          "nombre": "Aragua de Maturín",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 15,
          "id": 299,
          "nombre": "Barrancas del Orinoco",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 15,
          "id": 300,
          "nombre": "Caicara de Maturín",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 15,
          "id": 301,
          "nombre": "Caripe",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 15,
          "id": 302,
          "nombre": "Caripito",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 15,
          "id": 303,
          "nombre": "Chaguaramal",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 15,
          "id": 305,
          "nombre": "Chaguaramas Monagas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 15,
          "id": 307,
          "nombre": "El Furrial",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 15,
          "id": 308,
          "nombre": "El Tejero",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 15,
          "id": 309,
          "nombre": "Jusepín",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 15,
          "id": 310,
          "nombre": "La Toscana",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 15,
          "id": 311,
          "nombre": "Maturín",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 15,
          "id": 312,
          "nombre": "Miraflores",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 15,
          "id": 313,
          "nombre": "Punta de Mata",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 15,
          "id": 314,
          "nombre": "Quiriquire",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 15,
          "id": 315,
          "nombre": "San Antonio de Maturín",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 15,
          "id": 316,
          "nombre": "San Vicente Monagas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 15,
          "id": 317,
          "nombre": "Santa Bárbara",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 15,
          "id": 318,
          "nombre": "Temblador",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 15,
          "id": 319,
          "nombre": "Teresen",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 15,
          "id": 320,
          "nombre": "Uracoa",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 16,
          "id": 321,
          "nombre": "Altagracia",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 16,
          "id": 322,
          "nombre": "Boca de Pozo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 16,
          "id": 323,
          "nombre": "Boca de Río",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 16,
          "id": 324,
          "nombre": "El Espinal",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 16,
          "id": 325,
          "nombre": "El Valle del Espíritu Santo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 16,
          "id": 326,
          "nombre": "El Yaque",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 16,
          "id": 327,
          "nombre": "Juangriego",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 16,
          "id": 328,
          "nombre": "La Asunción",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 16,
          "id": 329,
          "nombre": "La Guardia",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 16,
          "id": 330,
          "nombre": "Pampatar",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 16,
          "id": 331,
          "nombre": "Porlamar",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 16,
          "id": 332,
          "nombre": "Puerto Fermín",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 16,
          "id": 333,
          "nombre": "Punta de Piedras",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 16,
          "id": 334,
          "nombre": "San Francisco de Macanao",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 16,
          "id": 335,
          "nombre": "San Juan Bautista",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 16,
          "id": 336,
          "nombre": "San Pedro de Coche",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 16,
          "id": 337,
          "nombre": "Santa Ana de Nueva Esparta",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 16,
          "id": 338,
          "nombre": "Villa Rosa",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 17,
          "id": 339,
          "nombre": "Acarigua",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 17,
          "id": 340,
          "nombre": "Agua Blanca",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 17,
          "id": 341,
          "nombre": "Araure",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 17,
          "id": 342,
          "nombre": "Biscucuy",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 17,
          "id": 343,
          "nombre": "Boconoito",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 17,
          "id": 344,
          "nombre": "Campo Elías",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 17,
          "id": 345,
          "nombre": "Chabasquén",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 17,
          "id": 346,
          "nombre": "Guanare",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 17,
          "id": 347,
          "nombre": "Guanarito",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 17,
          "id": 348,
          "nombre": "La Aparición",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 17,
          "id": 349,
          "nombre": "La Misión",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 17,
          "id": 350,
          "nombre": "Mesa de Cavacas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 17,
          "id": 351,
          "nombre": "Ospino",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 17,
          "id": 352,
          "nombre": "Papelón",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 17,
          "id": 353,
          "nombre": "Payara",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 17,
          "id": 354,
          "nombre": "Pimpinela",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 17,
          "id": 355,
          "nombre": "Píritu de Portuguesa",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 17,
          "id": 356,
          "nombre": "San Rafael de Onoto",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 17,
          "id": 357,
          "nombre": "Santa Rosalía",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 17,
          "id": 358,
          "nombre": "Turén",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 18,
          "id": 359,
          "nombre": "Altos de Sucre",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 18,
          "id": 360,
          "nombre": "Araya",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 18,
          "id": 361,
          "nombre": "Cariaco",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 18,
          "id": 362,
          "nombre": "Carúpano",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 18,
          "id": 363,
          "nombre": "Casanay",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 18,
          "id": 364,
          "nombre": "Cumaná",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 18,
          "id": 365,
          "nombre": "Cumanacoa",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 18,
          "id": 366,
          "nombre": "El Morro Puerto Santo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 18,
          "id": 367,
          "nombre": "El Pilar",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 18,
          "id": 368,
          "nombre": "El Poblado",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 18,
          "id": 369,
          "nombre": "Guaca",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 18,
          "id": 370,
          "nombre": "Guiria",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 18,
          "id": 371,
          "nombre": "Irapa",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 18,
          "id": 372,
          "nombre": "Manicuare",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 18,
          "id": 373,
          "nombre": "Mariguitar",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 18,
          "id": 374,
          "nombre": "Río Caribe",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 18,
          "id": 375,
          "nombre": "San Antonio del Golfo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 18,
          "id": 376,
          "nombre": "San José de Aerocuar",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 18,
          "id": 377,
          "nombre": "San Vicente de Sucre",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 18,
          "id": 378,
          "nombre": "Santa Fe de Sucre",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 18,
          "id": 379,
          "nombre": "Tunapuy",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 18,
          "id": 380,
          "nombre": "Yaguaraparo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 18,
          "id": 381,
          "nombre": "Yoco",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 382,
          "nombre": "Abejales",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 383,
          "nombre": "Borota",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 384,
          "nombre": "Bramon",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 385,
          "nombre": "Capacho",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 386,
          "nombre": "Colón",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 387,
          "nombre": "Coloncito",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 388,
          "nombre": "Cordero",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 389,
          "nombre": "El Cobre",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 390,
          "nombre": "El Pinal",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 391,
          "nombre": "Independencia",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 392,
          "nombre": "La Fría",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 393,
          "nombre": "La Grita",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 394,
          "nombre": "La Pedrera",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 395,
          "nombre": "La Tendida",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 396,
          "nombre": "Las Delicias",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 397,
          "nombre": "Las Hernández",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 398,
          "nombre": "Lobatera",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 399,
          "nombre": "Michelena",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 400,
          "nombre": "Palmira",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 401,
          "nombre": "Pregonero",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 402,
          "nombre": "Queniquea",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 403,
          "nombre": "Rubio",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 404,
          "nombre": "San Antonio del Tachira",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 405,
          "nombre": "San Cristobal",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 406,
          "nombre": "San José de Bolívar",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 407,
          "nombre": "San Josecito",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 408,
          "nombre": "San Pedro del Río",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 409,
          "nombre": "Santa Ana Táchira",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 410,
          "nombre": "Seboruco",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 411,
          "nombre": "Táriba",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 412,
          "nombre": "Umuquena",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 19,
          "id": 413,
          "nombre": "Ureña",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 414,
          "nombre": "Batatal",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 415,
          "nombre": "Betijoque",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 416,
          "nombre": "Boconó",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 417,
          "nombre": "Carache",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 418,
          "nombre": "Chejende",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 419,
          "nombre": "Cuicas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 420,
          "nombre": "El Dividive",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 421,
          "nombre": "El Jaguito",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 422,
          "nombre": "Escuque",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 423,
          "nombre": "Isnotú",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 424,
          "nombre": "Jajó",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 425,
          "nombre": "La Ceiba",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 426,
          "nombre": "La Concepción de Trujllo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 427,
          "nombre": "La Mesa de Esnujaque",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 428,
          "nombre": "La Puerta",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 429,
          "nombre": "La Quebrada",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 430,
          "nombre": "Mendoza Fría",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 431,
          "nombre": "Meseta de Chimpire",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 432,
          "nombre": "Monay",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 433,
          "nombre": "Motatán",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 434,
          "nombre": "Pampán",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 435,
          "nombre": "Pampanito",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 436,
          "nombre": "Sabana de Mendoza",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 437,
          "nombre": "San Lázaro",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 438,
          "nombre": "Santa Ana de Trujillo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 439,
          "nombre": "Tostós",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 440,
          "nombre": "Trujillo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 20,
          "id": 441,
          "nombre": "Valera",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 21,
          "id": 442,
          "nombre": "Carayaca",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 21,
          "id": 443,
          "nombre": "Litoral",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 25,
          "id": 444,
          "nombre": "Archipiélago Los Roques",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 22,
          "id": 445,
          "nombre": "Aroa",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 22,
          "id": 446,
          "nombre": "Boraure",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 22,
          "id": 447,
          "nombre": "Campo Elías de Yaracuy",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 22,
          "id": 448,
          "nombre": "Chivacoa",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 22,
          "id": 449,
          "nombre": "Cocorote",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 22,
          "id": 450,
          "nombre": "Farriar",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 22,
          "id": 451,
          "nombre": "Guama",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 22,
          "id": 452,
          "nombre": "Marín",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 22,
          "id": 453,
          "nombre": "Nirgua",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 22,
          "id": 454,
          "nombre": "Sabana de Parra",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 22,
          "id": 455,
          "nombre": "Salom",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 22,
          "id": 456,
          "nombre": "San Felipe",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 22,
          "id": 457,
          "nombre": "San Pablo de Yaracuy",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 22,
          "id": 458,
          "nombre": "Urachiche",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 22,
          "id": 459,
          "nombre": "Yaritagua",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 22,
          "id": 460,
          "nombre": "Yumare",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 461,
          "nombre": "Bachaquero",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 462,
          "nombre": "Bobures",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 463,
          "nombre": "Cabimas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 464,
          "nombre": "Campo Concepción",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 465,
          "nombre": "Campo Mara",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 466,
          "nombre": "Campo Rojo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 467,
          "nombre": "Carrasquero",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 468,
          "nombre": "Casigua",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 469,
          "nombre": "Chiquinquirá",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 470,
          "nombre": "Ciudad Ojeda",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 471,
          "nombre": "El Batey",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 472,
          "nombre": "El Carmelo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 473,
          "nombre": "El Chivo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 474,
          "nombre": "El Guayabo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 475,
          "nombre": "El Mene",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 476,
          "nombre": "El Venado",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 477,
          "nombre": "Encontrados",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 478,
          "nombre": "Gibraltar",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 479,
          "nombre": "Isla de Toas",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 480,
          "nombre": "La Concepción del Zulia",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 481,
          "nombre": "La Paz",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 482,
          "nombre": "La Sierrita",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 483,
          "nombre": "Lagunillas del Zulia",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 484,
          "nombre": "Las Piedras de Perijá",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 485,
          "nombre": "Los Cortijos",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 486,
          "nombre": "Machiques",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 487,
          "nombre": "Maracaibo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 488,
          "nombre": "Mene Grande",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 489,
          "nombre": "Palmarejo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 490,
          "nombre": "Paraguaipoa",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 491,
          "nombre": "Potrerito",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 492,
          "nombre": "Pueblo Nuevo del Zulia",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 493,
          "nombre": "Puertos de Altagracia",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 494,
          "nombre": "Punta Gorda",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 495,
          "nombre": "Sabaneta de Palma",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 496,
          "nombre": "San Francisco",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 497,
          "nombre": "San José de Perijá",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 498,
          "nombre": "San Rafael del Moján",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 499,
          "nombre": "San Timoteo",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 500,
          "nombre": "Santa Bárbara Del Zulia",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 501,
          "nombre": "Santa Cruz de Mara",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 502,
          "nombre": "Santa Cruz del Zulia",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 503,
          "nombre": "Santa Rita",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 504,
          "nombre": "Sinamaica",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 505,
          "nombre": "Tamare",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 506,
          "nombre": "Tía Juana",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 23,
          "id": 507,
          "nombre": "Villa del Rosario",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 21,
          "id": 508,
          "nombre": "La Guaira",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 21,
          "id": 509,
          "nombre": "Catia La Mar",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 21,
          "id": 510,
          "nombre": "Macuto",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 21,
          "id": 511,
          "nombre": "Naiguatá",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 25,
          "id": 512,
          "nombre": "Archipiélago Los Monjes",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 25,
          "id": 513,
          "nombre": "Isla La Tortuga y Cayos adyacentes",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 25,
          "id": 514,
          "nombre": "Isla La Sola",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 25,
          "id": 515,
          "nombre": "Islas Los Testigos",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 25,
          "id": 516,
          "nombre": "Islas Los Frailes",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 25,
          "id": 517,
          "nombre": "Isla La Orchila",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 25,
          "id": 518,
          "nombre": "Archipiélago Las Aves",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 25,
          "id": 519,
          "nombre": "Isla de Aves",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 25,
          "id": 520,
          "nombre": "Isla La Blanquilla",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 25,
          "id": 521,
          "nombre": "Isla de Patos",
          "createdAt": null,
          "updatedAt": null
        },
        {
          "id_estado": 25,
          "id": 522,
          "nombre": "Islas Los Hermanos",
          "createdAt": null,
          "updatedAt": null
        }
      ]

	// ******************************************************************************

};

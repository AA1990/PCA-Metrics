'use strict';

angular.module('metricsApp', [
   'ngAnimate',
   'ui.router'

     /*
    'app.main',
    'ui.bootstrap',*/
  ])

  /*
 .module('metricsApp', [
   'ngAnimate',
     'ngCookies',
     'ngResource',
     'ngRoute',
     'ngSanitize',
     'ngTouch',
     'ui.router'
   ])
   */




  .config(function($stateProvider, $urlRouterProvider) {
       $urlRouterProvider.when('/','/home');
       $urlRouterProvider.when('','/home');
       // $urlRouterProvider.when("/dashboard","/dashboard");
       // $urlRouterProvider.when("dashboard","/dashboard");
       $urlRouterProvider.otherwise('/home');
       $stateProvider
               .state('home',{
                       url: '/home',
                       views: {

                        '': {
                            templateUrl: 'views/super.html',
                            controller: 'MainCtrl'
                        },
                        // main view
                        // '': {
                        'login@home': {
                            templateUrl: 'views/login.html',
                            controller: 'MainCtrl'
                        },
                        // main view
                        // '': {
                        'main@home': {
                            templateUrl: 'views/main.html',
                            controller: 'MainCtrl'
                        },

                        //dashboard template partial
                        'dashboard@home': {
                            templateUrl: 'views/partials/dashboard.html',
                            controller: 'DashboardCtrl'
                        },

                         //Otros temporal medicamentos
                        'medicamentos@home': {
                             // url: '/medicamentos',
                             templateUrl: 'views/partials/otrasPrescripciones.html',
                             controller: 'MedicamentosCtrl'
                        },
                        'principioActivo@home': {
                             // url: '/medicamentos',
                             templateUrl: 'views/partials/otrasPrescripciones.html',
                             controller: 'MedicamentosCtrl'
                        },
                        'laboratorios@home': {
                             // url: '/medicamentos',
                             templateUrl: 'views/partials/otrasPrescripciones.html',
                             controller: 'MedicamentosCtrl'
                        },
                        'clasesTerapeuticas@home': {
                             // url: '/medicamentos',
                             templateUrl: 'views/partials/otrasPrescripciones.html',
                             controller: 'MedicamentosCtrl'
                        },
                        'enfermedades@home': {
                             // url: '/medicamentos',
                             templateUrl: 'views/partials/otrasPrescripciones.html',
                             controller: 'MedicamentosCtrl'
                        },
                        'datosDemograficos@home': {
                             // url: '/medicamentos',
                             templateUrl: 'views/partials/otrasPrescripciones.html',
                             controller: 'MedicamentosCtrl'
                        },
                        'pacientes@home': {
                             // url: '/medicamentos',
                             templateUrl: 'views/partials/tablaDeConsulta.html',
                             controller: 'MedicamentosCtrl'
                        },
                        'especialidadesMedicas@home': {
                             // url: '/medicamentos',
                             templateUrl: 'views/partials/otrasPrescripciones.html',
                             controller: 'MedicamentosCtrl'
                        },
                        'indicacionesMedicas@home': {
                             // url: '/medicamentos',
                             templateUrl: 'views/partials/indicacionesMedicas.html',
                             controller: 'MedicamentosCtrl'
                        },
                        'farmacias@home': {
                             // url: '/medicamentos',
                             templateUrl: 'views/partials/otrasPrescripciones.html',
                             controller: 'MedicamentosCtrl'
                        },
                        'desviaciones@home': {
                             // url: '/medicamentos',
                             templateUrl: 'views/partials/otrasPrescripciones.html',
                             controller: 'MedicamentosCtrl'
                        },
                        'otrasPrescripciones@home': {
                             // url: '/medicamentos',
                             templateUrl: 'views/partials/otrasPrescripciones.html',
                             controller: 'MedicamentosCtrl'
                        },
                        'otrasDispensaciones@home': {
                             // url: '/medicamentos',
                             templateUrl: 'views/partials/otrasPrescripciones.html',
                             controller: 'MedicamentosCtrl'
                        },
                        'otrasEnfermedades@home': {
                             // url: '/medicamentos',
                             templateUrl: 'views/partials/otrasPrescripciones.html',
                             controller: 'MedicamentosCtrl'
                        },
                        'tablaDeConsulta@home': {
                             // url: '/medicamentos',
                             templateUrl: 'views/partials/tablaDeConsulta.html',
                             controller: 'MedicamentosCtrl'
                        }

                        },

               });
               //  .state('home.dashboard',{
               //         url: '/dashboard',
               //         templateUrl: 'partials/dashboard.html',
               //         controller: 'DashboardCtrl'
               // })
});
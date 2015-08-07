'use strict';





angular.module('metricsApp')
    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    })
    .directive('ngUp', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 38) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngUp);
                    });

                    event.preventDefault();
                }
            });
        };
    })
    .directive('ngDown', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 40) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngDown);
                    });

                    event.preventDefault();
                }
            });
        };
    })
    .factory('setDate', function(){
      var dateFrom = '01/01/2015';
      var dateTo = '30/1/2015';
      return {
        from: function() {return dateFrom;},
        to: function() {return dateTo;},
        setFrom: function(newDate) { dateFrom = newDate;},
        setTo: function(newDate) { dateTo = newDate;}
      };
    })
    .factory('isLogged', function(){
      var logged = false;
      return {
        check: function() {return logged;},
        set: function(opt) {logged = opt;}
      };
    })
    .controller('MainCtrl', function ($scope, $state, $stateParams, $http, $filter, setDate, isLogged) {

        $scope.setDate = setDate;
        $scope.isLogged = isLogged;
        $scope.menuSwitch = false;
        $scope.partial = 'Dashboard';
        $scope.medicamentosDrop = false;
        $scope.medDropSelected = false;
        $scope.otrosDrop = false;
        $scope.otrosDropSelected = false;
        $scope.totalSiShow = false;
        $scope.totalSaShow = false;
        $scope.transShow = false;
        $scope.savingShow = false;
        $scope.irregularityShow = false;
        $scope.medShowOpts = false;
        $scope.medCurrentOpt = 'Marca Grupo';
        $scope.query = '';
        $scope.menu = [
        'Dashboard',
        'Medicamentos',
        'Clases Terapéuticas',
        'Enfermedades',
        'Datos Demográficos',
        'Pacientes',
        'Especialidades Médicas',
        'Indicaciones Médicas',
        'Farmacias',
        'Desviaciones',
        'Otros',
        'Tabla de Consulta'
        ];
        $scope.menuExploring = '';
        $scope.date1= "01/01/2014";
        $scope.date2= "30/11/2014";
        $scope.med1selected = true;
        $scope.med2selected = false;
        $scope.logged = false;
        $scope.log = function(){
            isLogged.set(true);
            // console.log('asd');
            // console.log(isLogged.check());
        };
        $scope.menuAct = function () {
            if ($scope.query.length>0) {
                return { 'background-color':'#99ABC0' }
            };
        }
        $scope.menuGoto = function () {
            if ($scope.menuExploring==='Medicamentos' && $scope.med1selected) {
                $scope.medicamentosDrop = !$scope.medicamentosDrop;
                // $scope.med1selected = true;
                // $scope.med2selected = false;
            }else if ($scope.menuExploring==='Otros') {
                $scope.otrosDrop = !$scope.otrosDrop;
            }else{
                $scope.partial = $scope.menuExploring;  
                if ($scope.partial === 'Medicamentos' || $scope.partial === 'Principio Activo' || $scope.partial === 'Laboratorios') {
                    $scope.medDropSelected = true;
                    $scope.otrosDropSelected = false;
                    // console.log('meddrop optSelected')
                }else if ($scope.partial === 'Otras Prescripciones' || $scope.partial === 'Otras Dispensaciones' || $scope.partial === 'Otras Enfermedades') {
                    $scope.otrosDropSelected = true;
                    $scope.medDropSelected = false;
                }else{
                    $scope.otrosDropSelected = false;
                    $scope.medDropSelected = false;    
                };  
                
            };
        }
        $scope.openSidebar = function () {
            if ($scope.menuSwitch === false) {
                $scope.menuToggle();
            };
            var temp = $filter('filter')($scope.menu, $scope.query);
            $scope.menuExploring = temp[0];
            if ($scope.menuExploring === 'Medicamentos') {
                $scope.med1selected = true;
                $scope.med2selected = false;
                $scope.medicamentosDrop = false;
            }else if ($scope.menuExploring === 'Otros') {
                $scope.otrosDrop = false;
            };
        }
        $scope.menuUp = function () {
            

            var temp = $filter('filter')($scope.menu, $scope.query);
            var notSubOpt = true;
            if ($scope.menuExploring === 'Laboratorios') {
                $scope.menuExploring = 'Principio Activo'
                notSubOpt = false;
            }else if ($scope.menuExploring === 'Principio Activo') {
                $scope.menuExploring = 'Medicamentos';
                $scope.med1selected = false;
                $scope.med2selected = true;
                notSubOpt = false;
            }else if ($scope.menuExploring === 'Medicamentos' && $scope.med2selected) {
                $scope.med1selected = true;
                $scope.med2selected = false;
                notSubOpt = false;
            }else if ($scope.menuExploring==='Tabla de Consulta' && $scope.otrosDrop) {
                $scope.menuExploring = 'Otras Enfermedades'
                notSubOpt = false;
            }else if ($scope.menuExploring==='Otras Dispensaciones') {
                $scope.menuExploring = 'Otras Prescripciones'
                notSubOpt = false;
            }else if ($scope.menuExploring==='Otras Prescripciones') {
                $scope.menuExploring = 'Otros';
                notSubOpt = false;
            }else if ($scope.menuExploring==='Otras Enfermedades') {
                $scope.menuExploring = 'Otras Dispensaciones';
                notSubOpt = false;
            };
            if ((temp.length > 1) && notSubOpt) {
                for (var i = 0; i<temp.length; i++){
                    if (temp[i]===$scope.menuExploring) {
                        if (i>0) {
                            if (temp[i-1]==='Medicamentos' && $scope.medicamentosDrop) {
                                $scope.menuExploring = 'Laboratorios';
                            }else{
                                $scope.menuExploring = temp[i-1];
                            };
                        };
                    };
                }
            };
            if (!$scope.med1selected && !$scope.med2selected && $scope.menuExploring === 'Medicamentos' && !$scope.medicamentosDrop) {
                $scope.med1selected = true;
            };
            if ($scope.menuExploring==='Medicamentos') {
                console.log('med1-'+$scope.med1selected+' med2-'+$scope.med2selected+' meddrop-'+$scope.medicamentosDrop+' partial-'+$scope.partial);    
            };
            
        }
        $scope.menuDown = function () {

            var temp = $filter('filter')($scope.menu, $scope.query);
            var notSubOpt = true;
            if (!$scope.med1selected && !$scope.med2selected && $scope.menuExploring === 'Medicamentos') {
                $scope.med1selected = true;
            };
            if ($scope.menuExploring === 'Medicamentos' && $scope.medicamentosDrop) {
                if ($scope.med1selected) {
                    $scope.med2selected = true;
                    $scope.med1selected = false;
                    notSubOpt = false;
                } else if ($scope.med2selected) {
                    console.log('asd')
                    $scope.med2selected = false;
                    $scope.menuExploring = 'Principio Activo'
                    notSubOpt = false;
                }
            }else if ($scope.menuExploring==='Principio Activo') {
                $scope.menuExploring = 'Laboratorios'
                notSubOpt = false;
            } else if ($scope.menuExploring==='Laboratorios') {
                $scope.menuExploring = 'Medicamentos'
            } else if ($scope.menuExploring==='Otros' && $scope.otrosDrop) {
                    $scope.menuExploring = 'Otras Prescripciones';
                    notSubOpt = false;
                // $scope.menuExploring = 'Otras Prescripciones'
                // notSubOpt = false;
            }else if ($scope.menuExploring==='Otras Prescripciones' ) {
                $scope.menuExploring = 'Otras Dispensaciones'
                notSubOpt = false;
            }else if ($scope.menuExploring==='Otras Dispensaciones') {
                $scope.menuExploring = 'Otras Enfermedades'
                notSubOpt = false;
            }else if ($scope.menuExploring==='Otras Enfermedades') {
                if (temp[temp.length-1]==='Tabla de Consulta') {
                    $scope.menuExploring = 'Tabla de Consulta'    
                };
                notSubOpt = false;
            };
            
            // console.log(temp)
            if ((temp.length > 1) && notSubOpt) {
                for (var i = 0; i<temp.length; i++){
                    if (temp[i]===$scope.menuExploring) {
                        if (i<(temp.length-1)) {
                            $scope.menuExploring = temp[i+1];
                            if ($scope.menuExploring==='Medicamentos') {
                                $scope.med1selected = true;
                            }else{
                                $scope.med1selected = false;
                            };
                            i=temp.length;
                        };
                    };
                }
            };
            console.log('down'+$scope.menuExploring);
        }
        $scope.optSelected = function(opt){
            $scope.partial = opt;
            if (opt!=='Medicamentos' && opt!=='Principio Activo' && opt!=='Laboratorios' && opt!=='Otras Prescripciones' && opt!=='Otras Dispensaciones'&& opt!=='Otras Enfermedades') {
                $scope.otrosDropSelected = false;
                $scope.medDropSelected = false;
                $scope.dropsOff();
            }else{
                if (opt==='Medicamentos' || opt==='Principio Activo' || opt==='Laboratorios') {
                    $scope.medDropSelected = true;
                    $scope.otrosDropSelected = false;
                }else{
                    $scope.otrosDropSelected = true;
                    $scope.medDropSelected = false;
                };
            };
        };
        $scope.medSwitchStyle = function() {
            // && $scope.menuExploring===opt
            if ($scope.medicamentosDrop && !$scope.medDropSelected && $scope.menuExploring==='Medicamentos' && $scope.med1selected) {
                 return { 'color': '#99ABC0', 'background-color': '#fff','border':'6px solid #99ABC0'};
            };
            if ($scope.medDropSelected && $scope.menuExploring==='Medicamentos' && $scope.med1selected) {
                 return { 'color': '#99ABC0','font-weight': '700', 'background-color': '#002d61', 'border':'6px solid #99ABC0'};
            };
            if ($scope.medicamentosDrop && !$scope.medDropSelected) {
                 return { 'color': '#002d61', 'background-color': '#E6EAEF','border-bottom': '1px solid #ddd'};
            };
            if ($scope.medDropSelected) {
                 return { 'color': '#F98D41','font-weight': '700', 'background-color': '#002d61', 'border-top':'1px solid #99ABC0', 'border-bottom':'1px solid #99ABC0'};
            };
            if ($scope.menuExploring==='Medicamentos' && $scope.med1selected) {
                return { 'color':'#99ABC0' ,'border':'6px solid #99ABC0','background-color': '#fff'};
            };
        };
        $scope.otrosSwitchStyle = function() {
            // && $scope.menuExploring===opt
            if ($scope.otrosDrop && !$scope.otrosDropSelected && $scope.menuExploring==='Otros') {
                 return { 'color': '#99ABC0', 'background-color': '#fff','border':'6px solid #99ABC0'};
            };
            if ($scope.otrosDropSelected && $scope.menuExploring==='Otros') {
                 return { 'color': '#99ABC0','font-weight': '700', 'background-color': '#002d61', 'border':'6px solid #99ABC0'};
            };
            if ($scope.otrosDrop && !$scope.otrosDropSelected) {
                 return { 'color': '#002d61', 'background-color': '#E6EAEF','border-bottom': '1px solid #ddd'};
            };
            if ($scope.otrosDropSelected) {
                 return { 'color': '#F98D41','font-weight': '700', 'background-color': '#002d61', 'border-top':'1px solid #99ABC0', 'border-bottom':'1px solid #99ABC0'};
            };
            if ($scope.menuExploring==='Otros') {
                return { 'color':'#99ABC0' ,'border':'6px solid #99ABC0', 'background-color': '#fff'};
            };
        };
        $scope.sidebarDropOpcStyle = function(opt) {
            if ($scope.partial===opt && $scope.menuExploring===opt  && !$scope.med1selected) {
                 return { 'color':'#99ABC0' ,'border':'6px solid #99ABC0', 'font-weight':'700', 'background-color': '#fff'};
            };
            if ($scope.partial===opt) {
                 return { 'color': '#002d61', 'font-weight':'700', 'background-color': '#99ABC0', 'border-top':'1px solid #eee', 'border-bottom':'1px solid #eee'};
            };
            if ($scope.menuExploring===opt && !$scope.med1selected) {
                 return { 'color':'#99ABC0' ,'border':'6px solid #99ABC0', 'font-weight':'700', 'background-color': '#fff'};
            };
            if ((opt==='Laboratorios' || opt==='Otras Enfermedades') && $scope.partial!==opt) {
                 return {'border-bottom': '1px solid #ddd'};
            };
        };
        $scope.sidebarOpcStyle = function(opt) {
            if ($scope.partial===opt && $scope.menuExploring===opt) {
                 return { 'color': '#99ABC0','font-weight': '700', 'background-color': '#002d61', 'border':'6px solid #99ABC0'};
            };
            if ($scope.partial===opt) {
                 return { 'color': '#F98D41','font-weight': '700', 'background-color': '#002d61', 'border-top':'1px solid #99ABC0', 'border-bottom':'1px solid #99ABC0'};
            };
            if ($scope.menuExploring===opt) {
                return { 'color':'#99ABC0' ,'border':'6px solid #99ABC0', 'background-color': '#fff'};
            };
        };
        $scope.medSwitch = function(){
            if ($scope.medicamentosDrop) {
                if ($scope.med2selected || $scope.menuExploring === 'Principio Activo' || $scope.menuExploring === 'Laboratorios') {
                    $scope.med2selected = false;
                    $scope.med1selected = true;
                    $scope.menuExploring = 'Medicamentos';
                };
            };
            $scope.medicamentosDrop = !$scope.medicamentosDrop;
            $scope.otrosDrop = false;
        };
        $scope.otrSwitch = function(){
            if ($scope.otrosDrop) {
                if ($scope.menuExploring === 'Otras Prescripciones' || $scope.menuExploring === 'Otras Dispensaciones'|| $scope.menuExploring === 'Otras Enfermedades') {
                    $scope.menuExploring = 'Otros';
                };
            };
            $scope.otrosDrop = !$scope.otrosDrop;
            $scope.medicamentosDrop = false;
        };
        $scope.dropsOff = function(){
            $scope.medicamentosDrop = false;
            $scope.otrosDrop = false;
        };
        $scope.menuToggle = function(){
            if ($scope.menuSwitch) {
                $scope.menuExploring = '';
            };
            $scope.menuSwitch = !$scope.menuSwitch;
            if ($scope.menuSwitch) {
                $('.body-div').css('left','180px');
            }
            else{
                $('.body-div').css('left','0px');
            };        
            $(window).resize();
        };
        $scope.totalSiShowSwitch = function(){
            $scope.totalSiShow = !$scope.totalSiShow;
        };
        $scope.totalSaShowSwitch = function(){
            $scope.totalSaShow = !$scope.totalSaShow;
        };
        $scope.transShowSwitch = function(){
            $scope.transShow = !$scope.transShow;
            if ($scope.transShow) {
                $('#db-box').hide();
            }else{
                $('#db-box').show();
            };
            $(window).resize();
        };
        $scope.savingShowSwitch = function(){
            $scope.savingShow = !$scope.savingShow;
            if ($scope.savingShow) {
                $('#db-box2').hide();
            }else{
                $('#db-box2').show();
            };
            $(window).resize();
        };
        $scope.irregularityShowSwitch = function(){
            $scope.irregularityShow = !$scope.irregularityShow;
            if ($scope.irregularityShow) {
                $('#db-box3').hide();
            }else{
                $('#db-box3').show();
            };
            $(window).resize();
        };
    });

    // VERIFICAR BOTONES CUANDO ESTEN EN UNA LLAMADA QUE NO EJECUTE LA MISMA ACCION









































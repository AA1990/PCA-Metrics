

var chartDirective = function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        scope: {
            config: '='
        },
        link: function (scope, element, attrs) {
            var chart;
            var process = function () {
                var defaultOptions = {
                    chart: { renderTo: element[0],
                    zoomType: 'x'},
                };
                var config = angular.extend(defaultOptions, scope.config);
                chart = new Highcharts.Chart(config);

            };
            process();
            scope.$watch("config.series", function (loading) {
                process();
            });
            scope.$watch("config.loading", function (loading) {
                if (!chart) {
                    return;
                }
                if (loading) {
                    chart.showLoading();
                } else {
                    chart.hideLoading();
                }
            });
        }
    };
};
var chartGaugeDirective = function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        scope: {
            config: '='
        },
        link: function (scope, element, attrs) {
            var chart;
            var process = function () {
                var defaultOptions = {
                    chart: {renderTo: element[0],
                            type: 'gauge',
                            plotBackgroundColor: null,
                            plotBackgroundImage: null,
                            plotBorderWidth: 0,
                            plotShadow: false},
                };
                var config = angular.extend(defaultOptions, scope.config);
                chart = new Highcharts.Chart(config);
            };
            process();
            scope.$watch("config.series", function (loading) {
                process();
            });
            scope.$watch("config.loading", function (loading) {
                if (!chart) {
                    return;
                }
                if (loading) {
                    chart.showLoading();
                } else {
                    chart.hideLoading();
                }
            });
        }
    };
};

angular.module('metricsApp')
  .directive('chart', chartDirective)
  .directive('chartgauge', chartGaugeDirective)
  .factory('setSaving', function(){
      var saving = 0;
      var sinister = 0;
      return {
        saving: function() {
            if (saving==='NaN') {
                return "0"
            }else{
                return saving.toString();
            };
        },
        sinister: function() {
            if (sinister==='NaN') {
                return "0"
            }else{
                return sinister.toString();
            };
        },
        setSavings: function(newSaving) { saving = newSaving.toString();
                                        // console.log('settingSaving: '+newSaving);
                                    },
        setSinister: function(newSinister) { sinister = newSinister.toString();
                                        // console.log('settingSinister: '+newSinister);
                                    }
      };
    })
    .factory('setIrregularities', function(){
        var data = [
        {name:'LA FECHA DE LA FACTURA ES ANTERIOR A LA FECHA DEL INFORME', cantidad: 0, total: 0},
        {name:'INFORME O RÉCIPE MÉDICO VENCIDO', cantidad: 0, total: 0},
        {name:'EL TRATAMIENTO NO GUARDA RELACIÓN CON EL DIAGNÓSTICO', cantidad: 0, total: 0},
        {name:'EL TRATAMIENTO NO ES PARA EL PACIENTE', cantidad: 0, total: 0},
        {name:'ADQUISICIÓN DE MEDICAMENTOS SIN PRESCRIPCIÓN', cantidad: 0, total: 0},
        {name:'ADQUISICIÓN DE ANSIOLÍTICOS, SEDANTES O PSICOESTIMULANTES', cantidad: 0, total: 0},
        {name:'ADQUISICIÓN DE VITAMINAS', cantidad: 0, total: 0},
        {name:'ADQUISICIÓN DE PRODUCTOS CONTRA LA OBESIDAD', cantidad: 0, total: 0},
        {name:'ADQUISICIÓN DE MEDICAMENTOS PARA LA DISFUNCIÓN ERÉCTIL', cantidad: 0, total: 0},
        {name:'ADQUISICIÓN DE ANTICONCEPTIVOS', cantidad: 0, total: 0},
        {name:'ADQUISICIÓN DE MISCELÁNEOS', cantidad: 0, total: 0},
        {name:'ADQUISICIÓN EXCESIVA DE MEDICAMENTOS', cantidad: 0, total: 0},
        {name:'SOBREDOSIS ADQUIRIDA POR EL PACIENTE', cantidad: 0, total: 0},
        {name:'ADQUISICIÓN DE DOSIS INFERIOR A LA PRESCRITA', cantidad: 0, total: 0},
        {name:'SUSTITUCIÓN DE MEDICAMENTOS', cantidad: 0, total: 0},
        {name:'SUSTITUCIÓN EN LA FARMACIA POR MEDICAMENTOS MÁS COSTOSOS', cantidad: 0, total: 0},
        {name:'SUSTITUCIÓN DE GENÉRICOS POR MARCA', cantidad: 0, total: 0},
        {name:'SOBREPRECIO EN LOS MEDICAMENTOS FACTURADOS', cantidad: 0, total: 0},
        {name:'EL PACIENTE NO ADQUIERE MEDICAMENTOS ESENCIALES PARA EL TRATAMIENTO DE SU DIAGNOSTICO', cantidad: 0, total: 0},
        {name:'MEDICAMENTOS CON EL MISMO PRINCIPIO ACTIVO', cantidad: 0, total: 0},
        {name:'MEDICAMENTOS CON LA MISMA SUB-CLASE TERAPEUTICA', cantidad: 0, total: 0},
        {name:'ADQUISICIÓN DE PRODUCTOS EN CONTRA DEL TABAQUISMO', cantidad: 0, total: 0},
        {name:'ADQUISICIÓN DE PRODUCTOS NATURALES', cantidad: 0, total: 0},
        {name:'ADQUISICIÓN DE SUPLEMENTOS NUTRICIONALES', cantidad: 0, total: 0},
        {name:'ADQUISICIÓN DE EMOLIENTES Y PROTECTORES', cantidad: 0, total: 0},
        {name:'ADQUISICIÓN DE ESTIMULANTES DEL APETITO', cantidad: 0, total: 0},
        {name:'DIAGNÓSTICO DE ENFERMEDADES NO CUBIERTAS POR LA PÓLIZA', cantidad: 0, total: 0},
        {name:'ADQUISICIÓN DE MEDICAMENTOS NO CUBIERTOS POR LA PÓLIZA', cantidad: 0, total: 0},
        {name:'ADQUISICIÓN EXCESIVA DE MEDICAMENTOS POR SOBREDOSIS', cantidad: 0, total: 0},
        {name:'ADQUISICIÓN DE PRODUCTOS CONTRA LA DEPENDENCIA DE OPIOIDES', cantidad: 0, total: 0},
        {name:'ADQUISICIÓN DE PRODUCTOS CONTRA EL ALCOHOLISMO', cantidad: 0, total: 0},
        {name:'ADQUISICIÓN DE PRODUCTOS HOMEOPÁTICOS', cantidad: 0, total: 0},
        {name:'ADQUISICIÓN DE AMINOÁCIDOS U OTROS PRODUCTOS PARA EL METABOLISMO', cantidad: 0, total: 0},
        {name:'ADQUISICIÓN DE SUPLEMENTOS ANTIDIABÉTICOS', cantidad: 0, total: 0},
        {name:'LAS INDICACIONES SUPERAN LA FRECUENCIA MÁXIMA DIARIA', cantidad: 0, total: 0},
        {name:'DISPENSACIÓN EXCESIVA DE MEDICAMENTOS', cantidad: 0, total: 0},
        {name:'PRESCRIPCIÓN DE MEDICAMENTOS CON EL MISMO PRINCIPIO ACTIVO O LA MISMA SUBCLASE TERAPÉUTICA', cantidad: 0, total: 0},
        {name:'LA ESPECIALIDAD MÉDICA NO CONCUERDA CON EL TRATAMIENTO PRESCRITO', cantidad: 0, total: 0}
    ];

        return {
            array: function() {return data;},
            reset: function() {
                for (var i = 0; i < data.length; i++){
                    data[i].cantidad = 0;
                    data[i].total = 0;
                }
            },
            setCantidad: function(name, n){
                // console.log('setting '+name+' n '+n)
                for (var i = 0; i < data.length; i++){
                    if (name === data[i].name) {
                        data[i].cantidad += n;
                        i = data.length;
                    };
                }
            },
            setTotal: function(name, n){
                // console.log('setting total '+name+' n '+n)
                function numberWithDots(x) {
                    var parts = x.toString().split(".");
                    // console.log(parts)
                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    return parts.join(".");
                }
                var temp = 0;
                for (var i = 0; i < data.length; i++){
                    if (name === data[i].name) {
                        temp = parseFloat((data[i].total))
                        data[i].total = parseFloat((temp+n).toFixed(2))
                        // temp = parseFloat((data[i].total).toString().replace(/,/g,''))
                        // data[i].total = numberWithDots((temp+n).toFixed(2))
                        i = data.length;
                    };
                }
            }
      };

    })
  .controller('DashboardCtrl', function ($scope, $state, $stateParams, $http, $filter, setSaving, setDate, setIrregularities) {
    $scope.setIrregularities = setIrregularities;
    $scope.setSaving = setSaving;
    $scope.setDate = setDate;
    $scope.n1 = -1;
    $scope.n2 = -1;
    $scope.datosParaGrafica1=[];
    $scope.datosParaGrafica2=[];
    $scope.categs = [];
    $scope.categsAux = [];
    $scope.savingsGet = [];
    $scope.savingsTemp = 0;
    $scope.sinisterTemp = 0;
    $scope.savingsTotal = 0;
    $scope.sinisterTotal = 0;
    $scope.dbIrregOrderBy = 'cantidad';
    $scope.dbReverse = true;
    $scope.irregsGetPresc = [];
    $scope.irregsGetDisp = [];


    $scope.chartConfig = {
        title: {
            text: '',
            // x: -20 //center
        },
        subtitle: {
            text: '',
            // x: -20
        },
        xAxis: {
            // dateTimeLabelFormats: { // don't display the dummy year
            //     month: '%b',
            //     year: '%Y'
            // }
            // categories: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
            // categories: $scope.arrayNulo
            // pointStart: $scope.pointStart
        },
        yAxis: {
            title: {
                text: 'Transacciones'
            },
            min:0,
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            // valueSuffix: ' Transacciones'
            formatter: function() {
                var i = this.series.data.indexOf( this.point );
                // console.log('formatter'+$scope.categsAux);
                var s = this.x+' '+$scope.categsAux[i]+':<br/>'+this.y+' Transacciones';
                return s;
            }
        },
        legend: {
            // layout: 'vertical',
            // align: 'bottom',
            // verticalAlign: 'middle',
            borderWidth: 0
        },

        credits: {
               enabled: false 
        },
        series: [{
            // pointStart: $scope.pointStart,
            name: 'Órdenes de farmacia',
            data: [],
            color: '#002d61',
            marker: {
                symbol: 'circle'
            }
        } 
        ,{
            name: 'Siniestros de reembolso',
            data: [],
            color: '#f27516',
            marker: {
                symbol: 'circle'
            },
        }]
    };
    $scope.chartConfig2 = {
            title: {
            text: ''
        },
        pane: {
            startAngle: -135,
            endAngle: 135,
            size: '100%',
            background: [{
                    // BG color for speed
                    //  backgroundColor: '#E4E3DF',
                    backgroundColor: { 
                       radialGradient: {
                          cx: 0.5,
                          cy: 0.6,
                          r: 1.0 
                        },
                       stops: [
                           [0.3, '#A7A9A4'],
                           //[0.6, '#FF04FF'],
                           [0.45, '#DDD'],
                           [0.7, '#EBEDEA'],
                           //[0.7, '#FFFF04'],
                       ]
                    },
                    innerRadius: '47%',
                    outerRadius: '102%'
                }, {
                    // Below rpm bg color
                    // backgroundColor: '#909090',
                    zIndex: 1,
                    backgroundColor: { 
                       radialGradient: {
                          cx: 0.5,
                          cy: 0.55,
                          r: 0.5 
                        },
                       stops: [
                           [0.6, '#48443B' ],
                           [0.8, '#909090'],
                           [1, '#FFFFF6']
                       ]
                    },
                    // '#002d61','#f27516', '#A0DB00'
                    outerRadius: '48%',
                    innerRadius: '40%',
                }, {
                    backgroundColor: '#002d61',
                    zIndex: 1,
                    outerRadius: '40%',
                    innerRadius: '38%'
                }, {
                    backgroundColor: '#000913',
                    outerRadius: '38%'

                }]        },

        // the value axis
        yAxis: {
            min: 0,
            max: 100,
            minorTickInterval: 1,
            minorTickWidth: 1,
            minorTickLength: 6,
            minorTickColor: '#000',
            tickInterval: 10,
            tickPixelInterval: 30,
            tickWidth: 2,
            //tickPosition: 'inside',
            tickLength: 15,
            tickColor: '#000',
            labels: {
            //'#002d61','#f27516', '#A0DB00'
                step: 1,
                y: 7,
                
                style: {
                    color: '#002d61',
                    fontSize: 16,   
                }
               // size: 20px,
                //rotation: 'auto'
            },
            title: {
                // text: '%',
                   // y: 180,
                   // x: -86,
                  //  style: {
                     //   color: '#000',
                        //fontFamily: 'Squada One',
                  //      fontStyle: 'italic'
                  //  }
            },
            plotBands: [{
                from: 30,
                to: 100,
                
                color: '#55BF3B' // green
            }, {
                from: 10,
                to: 30,
                color: '#DDDF0D' // yellow
            }, {
                from: 0,
                to: 10,
                color: '#DF5353' // red
            }]
        },
        credits: {
            enabled: false 
        },
        tooltip: { enabled: false },
        series: [{
            name: 'Ahorro',
            data: [0],
            dataLabels: {
                    color: '#f27516',//prx orange
                    borderWidth: 0,
               // borderColor:  '#002d61',
               // backgroundColor:'#002d61',
                    y: -25,
                    //x: 0,
                    
                    style: {
                        fontSize: '28px',
                        // fontFamily: 'digital',
                        fontFamily: 'Orbitron',
                    },
                    formatter: function() {
                        return (this.y)
                    }
            },
            tooltip: {
                valueSuffix: ''
            },
            dial: {
                //'#002d61','#f27516', '#A0DB00'
                    backgroundColor: '#f27516',
                    baseLength: '50%',
                    baseWidth: 7,
              //  headWidth: 10,
                    radius: '90%',
                    topWidth: 1,
                    rearLength: '-44%',
                    borderColor: '#631210',
                    borderWidth: 1
                },
            pivot: {
                    radius: '0'
                }
        }]

    };

    $scope.dbIrregOrderByChange = function(opt){
        if ($scope.dbIrregOrderBy === opt) {
            $scope.dbReverse=!$scope.dbReverse;
        }else{
            $scope.dbReverse = false;
        };
        $scope.dbIrregOrderBy = opt;
    };

    $scope.nextMonth = function (month) {
        var m = parseInt(month);
        if (m<9) {
            m+=1;
            return '0'+m.toString();
        }else if (m<12){
            m+=1;
            return m.toString();
        }else{
            return '01';
        };
    }
    $scope.leapYear = function(year){
      return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    };
    $scope.urlBuilder = function(type, subtype, fDay, lDay, monthFrom, monthTo, year, yearTo, offset){
        var URL = '';
        //request/custom/?date__gte=2014-01-01&date__lte=2014-11-30&limit=0&format=json
        URL+='https://apimetrics.pcaaudit.com/api/v1/';
        URL+=type;
        URL+='/?';
        if (type === 'irregularityDispensedDrug' || type === 'irregularityPrescribedDrug') {
            URL+='request__';
        };
        URL+='date__gte=';
        //from
        URL+=year;
        URL+='-';
        URL+=monthFrom;
        URL+='-';
        // // Temporal mientras se pasan todas las consultas a 1 sola sin diviciones
        // // se debe arreglar
        // if (fDay>0 && fDay <32) {
            URL+=fDay;
        // }else{
        //     URL+='01';
        // };
        URL+='&';
        if (type === 'irregularityDispensedDrug' || type === 'irregularityPrescribedDrug') {
            URL+='request__';
        };
        URL+='date';
        URL+='__lte=';
        URL+=yearTo;
        URL+='-';
        URL+=monthTo;
        URL+='-';
        // console.log(fDay+' f '+lDay+' l '+year+' y '+month+' m');
        URL+=lDay;
        // if (isFirstLastNone===1) {
        //     if (monthTo==='01'||monthTo==='03'||monthTo==='05'||monthTo==='07'||monthTo==='08'||monthTo==='10'||monthTo==='12') {
        //         if (lDay>31) {URL+='31';}
        //         else{URL+=lDay;};
        //     }else if(monthTo==='04'||monthTo==='06'||monthTo==='09'||monthTo==='11'){
        //         if (lDay>30) {URL+='30';}
        //         else{URL+=lDay;};
        //     }else{
        //         if ($scope.leapYear(parseInt(year))) {
        //             if (lDay>29) {URL+='29';}
        //             else{URL+=lDay;};
        //         }else{
        //             if (lDay>28) {URL+='28';}
        //             else{URL+=lDay;};
        //         };
        //     };
        // }else{
        //     if (monthTo==='01'||monthTo==='03'||monthTo==='05'||monthTo==='07'||monthTo==='08'||monthTo==='10'||monthTo==='12') {
        //         URL+='31';
        //     }else if(monthTo==='04'||monthTo==='06'||monthTo==='09'||monthTo==='11'){
        //         URL+='30'; 
        //     }else{
        //         if ($scope.leapYear(parseInt(year))) {
        //             URL+='29';
        //         }else{
        //             URL+='28';    
        //         };
        //     };
        // };
        if (type==='request/custom') {
            URL+='&type_request__description=';
            URL+=subtype;
        };
        URL+='&limit=0';
        URL+='&format=json';
        console.log(URL);
        return URL;
    }
//    Llamada a cualquier url
//    Entrada:
//    m=mes
//    y=anio
//    type= savings, irregularityDispensedDrug
//    subtype= Orden, Reembolso
    
    $scope.callURL = function (type,subtype,urlOrders, m, y, isLast, offset) {
        $http({method: 'GET', url: urlOrders })
            .success(function(data) {
                if (subtype==='Orden') {
                    // console.log("orden:");
                    // console.log(type+urlOrders);
                    //for (var i = 1; i <= n; i++) {
                    var n=data.meta.total_count
                    for (var i = 0; i < n; i++) {
                         //console.log(i)
                         $scope.datosParaGrafica1.push({total: data.objects[i].transactions, month: data.objects[i].month, year: data.objects[i].year});
                    };
                   // console.log($scope.datosParaGrafica1)
                    //$scope.datosParaGrafica1.push({total: data.meta.total_count, month: m, year: y});
                    
                }else if (subtype==='Reembolso') {
                    
                    var n=data.meta.total_count
                    for (var i = 0; i < n; i++) {
                         //console.log(i)
                         $scope.datosParaGrafica2.push({total: data.objects[i].transactions, month: data.objects[i].month, year: data.objects[i].year});
                    };
                    
                    //$scope.datosParaGrafica2.push({total: data.meta.total_count, month: m, year: y});
                }else if (type==='savingstotal/custom') {
                    $scope.savingsGet = data.objects;
                        // console.log(urlOrders);
                     // console.log(data.objects.accident__sum);
                    if (isLast && ($scope.sinisterTotal===0 && $scope.savingsTotal===0 && $scope.savingsGet.length <= 0)) {
                        setSaving.setSavings($scope.savingsTotal);
                        setSaving.setSinister($scope.sinisterTotal);
                    };
                }else if (type === 'irregularityDispensedDrug') {
                    // console.log('casa')
                    $scope.irregsGetDisp = data.objects;
                }else if (type ==='savings/custom') {
                    // console.log('perro');
                    $scope.irregsGetPresc = data.objects;
                };
                if ((data.meta.total_count>(offset+1000)) && subtype!=='Reembolso' && subtype!=='Orden') {
                        if (offset>999) {
                            urlOrders = urlOrders.substring(0, (urlOrders.length - offset.toString().length));
                        }else{
                            urlOrders+='&offset=';                            
                        };
                        urlOrders+=(offset+1000).toString();
                        // console.log('offset'+offset);
                        $scope.callURL(type,subtype,urlOrders, m, y, isLast, (offset+1000));
                };
            })
            .error(function(data) {
                console.log('callURL failure: '+urlOrders+ ' type: '+type);
            })
    }
    $scope.getData = function (type,subtype,filters) {

        var dayFrom = setDate.from().substring(0, 2);
        var dayTo = setDate.to().substring(0, 2);
        var month = setDate.from().substring(3, 5);
        var monthTo = setDate.to().substring(3, 5);
        var year =  setDate.from().substring(6, 10);
        var yearTo =  setDate.to().substring(6, 10);
        //var n = (parseInt(setDate.to().substring(3, 5))+(12*(parseInt(yearTo)-parseInt(year)))) - parseInt(setDate.from().substring(3, 5))+1;
        //var monthTo = n;
        //console.log(n)
        // variable temporal mientras se modifica el api para no necesitar un ciclo en el 'chart1'
        var cicle = false;
        var urlF = '';
        if (subtype==='Orden') {
            $scope.datosParaGrafica1=[];    
            //$scope.n1 = n;
            cicle = true;
        }else if (subtype==='Reembolso'){
            $scope.datosParaGrafica2=[];    
            //$scope.n2 = n;
            cicle = true;
        };
        if (type === 'savingstotal/custom') {
            $scope.savingsGet = 0;
        }else if (type ==='savings/custom') {
            $scope.irregsGetPresc = [];
        // }else if (type ==='irregularityDispensedDrug') {
        //     $scope.irregsGetDisp = [];
        };
        // var isFLN = 0;
        // if (cicle) {
            // console.log('holaaa');
            urlF=$scope.urlBuilder(type,subtype,dayFrom,dayTo,month, monthTo, year,yearTo,filters, '');
            $scope.callURL(type,subtype,urlF, month, year,true,0);
            
//            for (var i = 0; i < n; i++) {
//                    if (i > 0 && i < n-1) {
//                        // none
//                        isFLN=2;
//                    }else if(i === 0){
//                        // first
//                        isFLN=0;
//                    }else{
//                        // last
//                        isFLN=1;
//                    };
//
//                    urlF=$scope.urlBuilder(type,subtype,dayFrom,dayTo,month,year,isFLN,filters, '');
//                    if (i < (n-1)) {
//                        $scope.callURL(type,subtype,urlF, month, year,false,0);
//                        month = $scope.nextMonth(month);
//                        if (month === '01') {
//                            year = (parseInt(year)+1).toString();
//                        };
//                    }else{
//                        $scope.callURL(type,subtype,urlF, month, year,true,0);
//                    };
//                 
//            };
        // }else{
            // urlF=$scope.urlBuilder(type,subtype,dayFrom,dayTo,month, monthTo,year,yearTo,filters, '');
            // $scope.callURL(type,subtype,urlF, month, year,true,0);
        // };
//            console.log($scope.callURL());
    }

    $scope.dateRegister = function () {
        // VALIDATE!!!!
        setDate.setFrom($scope.date1);
        setDate.setTo($scope.date2);
        // console.log('dateRegister')
        if ($scope.partial==='Dashboard') {
            // console.log('date register Dashboard')
            $scope.savingsTotal = 0;
            $scope.sinisterTotal = 0;
            $scope.getData('request/custom','Orden','');
            $scope.getData('request/custom','Reembolso','');
            $scope.getData('savingstotal/custom','','');
            $scope.getData('savings/custom','','');
            // VER CUANDO SE INCLUYAN ESTOS A LOS DATOS.
            // $scope.getData('savings/custom','','');

        }
    }
    $scope.setCategs = function () {

        var year =  setDate.from().substring(6, 10);
        var yearTo =  setDate.to().substring(6, 10);
        var months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        var n = (parseInt(setDate.to().substring(3, 5))+(12*(parseInt(yearTo)-parseInt(year)))) - parseInt(setDate.from().substring(3, 5))+1;
        $scope.categs = [];
        $scope.categsAux = [];
        var yearInt = parseInt(year);
        var month = parseInt(setDate.from().substring(3, 5));
        for (var i = 1; i <= n; i++) {
            $scope.categs.push(months[month-1]);
            $scope.categsAux.push(yearInt);
            month++;
            // console.log('antes'+year);
            if (month === 13) {
                // console.log('in');
                yearInt+=1;
                month=1;
                // year=(parseInt(year)+1).toString();

            };
            // console.log('despues'+year);
        };
    }
    $scope.$watchCollection('datosParaGrafica1', function(){

        // console.log('---------------------');
        // console.log($scope.datosParaGrafica1.length)
        // console.log($scope.n1)
        // if ($scope.n1===$scope.datosParaGrafica1.length) {
        if ($scope.datosParaGrafica1.length>0) {
            $scope.datosParaGrafica1 = $filter('orderBy')($scope.datosParaGrafica1, ['year','month']);
            // console.log($scope.datosParaGrafica1)
            var arrayTemp1=[];
            for(var key in $scope.datosParaGrafica1){
                arrayTemp1.push(parseInt($scope.datosParaGrafica1[key].total));
            };
            var chartemp = $('#chart1').highcharts();
            $scope.setCategs();
            // console.log($scope.categs);
            chartemp.xAxis[0].setCategories($scope.categs);
                    // console.log('outside'+$scope.categsAux);
            chartemp.series[0].setData(arrayTemp1, true);
            chartemp.tooltip.options.formatter = function() {
                var i = this.series.data.indexOf( this.point );
                // console.log('formatter'+$scope.categsAux);
                var s = this.x+' '+$scope.categsAux[i]+':<br/>'+this.y+' Transacciones';
                return s;
            };
            $scope.n1 = -1;
        };
        // console.log('---------------------');
    })
    $scope.$watchCollection('datosParaGrafica2', function(){
                // console.log('---------------------');
        // if ($scope.n2===$scope.datosParaGrafica2.length) {
        if ($scope.datosParaGrafica2.length>0) {
            $scope.datosParaGrafica2 = $filter('orderBy')($scope.datosParaGrafica2, ['year','month']);
            var arrayTemp2=[];

            // console.log('aca se deberia estar agregando')
            // console.log($scope.datosParaGrafica2)

            
            for(var key in $scope.datosParaGrafica2){
                arrayTemp2.push(parseInt($scope.datosParaGrafica2[key].total));
            };

            // console.log(arrayTemp2)

            var chartemp = $('#chart1').highcharts();


            chartemp.series[1].setData(arrayTemp2, true);
            $scope.n2 = -1;
        };
                // console.log('---------------------');
    })
    $scope.$watchCollection('savingsGet', function(){
        // console.log('---------------------');
        // console.log($scope.savingsGet);
//        if ($scope.savingsGet.length > 0) {
//             // console.log($scope.savingsGet.length);
//            for (var i = 0; i < $scope.savingsGet.length; i++ ) {
//                // console.log(i);
//                if ($scope.savingsGet[i].i_presc_drug_active && $scope.savingsGet[i].i_presc_drug_enabled && !$scope.savingsGet[i].ignored_irregularity) {
//                    // console.log('in1')
//                    var aux = $scope.savingsGet[i].requested_medication_reference_price;
//                    if ($scope.savingsGet[i].i_disp_drug_active && $scope.savingsGet[i].i_disp_drug_enabled) {
//                        aux = (aux - $scope.savingsGet[i].i_disp_drug_unit_price);
//                    };
//
//                    aux = ($scope.savingsGet[i].requested_medication_quantity - $scope.savingsGet[i].i_presc_drug_quantity)*aux;
//                    // console.log(aux)
//                    if (aux > 0) {
//                        $scope.savingsTemp += aux;
//                        setIrregularities.setTotal($scope.savingsGet[i].i_presc_drug_description,aux)
//                        
//                    };
//                };
//                
//                // $scope.savingsTemp += $scope.savingsGet[i].requested_medication_reference_price;
//                
//                    $scope.sinisterTemp += parseFloat($scope.savingsGet[i].requested_medication_quantity)*(parseFloat($scope.savingsGet[i].requested_medication_reference_price));    
//                
//                
//            };
//            // console.log($scope.savingsGet[0]);
//            $scope.savingsTotal += $scope.savingsGet.saving__sum;
//            $scope.sinisterTotal += $scope.savingsGet.accident__sum;
//            
//            $scope.savingsTemp = 0;
//            $scope.sinisterTemp = 0;
//            while($scope.savingsGet.length > 0) {
//                $scope.savingsGet.pop();
//            }
//            // SET SINISTER TOO;
//            setSaving.setSavings($scope.savingsTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
//            setSaving.setSinister($scope.sinisterTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
//            var savPerc = [];
//            var chartemp = $('#chart2').highcharts();
//            savPerc.push(parseFloat((($scope.savingsTotal*100)/$scope.sinisterTotal).toFixed(2)));
//            chartemp.series[0].setData(savPerc, true);
//
//        }else{
//            // $scope.savingsTotal += 1000;
//            // setSaving.setSavings($scope.savingsTotal);
//            // console.log('else'+$scope.savingsTemp);
//        };
        // console.log($scope.savingsGet.saving__sum);
        // console.log($scope.savingsGet.accident__sum);
        $scope.savingsTotal = parseFloat($scope.savingsGet.saving__sum);
        $scope.sinisterTotal = parseFloat($scope.savingsGet.accident__sum);
        setSaving.setSavings($scope.savingsTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
        setSaving.setSinister($scope.sinisterTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
        var savPerc = [];
        var chartemp = $('#chart2').highcharts();
        // console.log(setSaving.saving());
        // console.log(setSaving.sinister());
        savPerc.push(parseFloat((($scope.savingsTotal*100)/$scope.sinisterTotal).toFixed(2)));
        // console.log(savPerc)
        if (savPerc[0]==='NaN') {
            chartemp.series[0].setData(0, true);    
        }else{
            chartemp.series[0].setData(savPerc, true);
        };

        // console.log('---------------------');
       
    })
    $scope.$watchCollection('irregsGetDisp', function(){

        if ($scope.irregsGetDisp.length > 0) {

            for (var i in $scope.irregsGetDisp){
                
                if ($scope.irregsGetDisp[i].active && $scope.irregsGetDisp[i].enabled && !$scope.irregsGetDisp[i].ignored_irregularity) {
                    // console.log($scope.irregsGetDisp[i].max_approved_quantity);
                    setIrregularities.setCantidad($scope.irregsGetDisp[i].irregularity_description.description,1)
                    
                };
            }
            while($scope.irregsGetDisp.length > 0) {
                $scope.irregsGetDisp.pop();
            }
        };
    })
    $scope.$watchCollection('irregsGetPresc', function(){

        if ($scope.irregsGetPresc.length > 0) {

            for (var i in $scope.irregsGetPresc){
                
                // if ($scope.irregsGetPresc[i].active && $scope.irregsGetPresc[i].enabled && !$scope.irregsGetPresc[i].ignored_irregularity) {
                    // console.log($scope.irregsGetPresc[i].max_approved_quantity);
                    setIrregularities.setCantidad($scope.irregsGetPresc[i].i_presc_drug_description,$scope.irregsGetPresc[i].cantidad);
                    setIrregularities.setTotal($scope.irregsGetPresc[i].i_presc_drug_description,$scope.irregsGetPresc[i].total)
                    
                // };
            }
            while($scope.irregsGetPresc.length > 0) {
                $scope.irregsGetPresc.pop();
            }
        };
    })
    $scope.$on('$viewContentLoaded', function(){
        //CHEQUEAR SI VENGO DE OTRA VISTA y aplicar date resgister alterno
        // console.log('on')
        $scope.date1 = setDate.from();
        $scope.date2 = setDate.to();
        $scope.dateRegister();
    });

});

//Ordenar datos por año por mes y poner categorias



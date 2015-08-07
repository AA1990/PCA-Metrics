'use strict';

angular.module('metricsApp')
  .factory('tableService', function(){
      var tableData = [];
      var noData = true;
      var dataTotal = 0;
      var page = 1;
      var offset = 0;
      var pages = ['-','-','-','-','-'];
      return {
        offset: function() {return offset},
        setOffset: function(ofs) {offset = ofs},
        dataTotal: function() {return dataTotal},
        setDataTotal: function(total) {dataTotal = total},
        page: function() {return page},
        setPage: function(pg) {page = pg},
        getPage: function(i) {return pages[i]},
        setPages: function(i,n) {pages[i]=n},
        hasData: function() {return noData},
        dataLoaded: function(bool) {noData = bool},
        data: function() {return tableData},
        add: function(obj) {
          if (isNaN(parseInt(obj.transactions))) {
            obj.transactions = '0,00'
          };
          if (isNaN(parseInt(obj.presc))) {
            obj.presc = '0,00'  
          };
          if (isNaN(parseInt(obj.fact))) {
            obj.fact = '0,00'  
          };
          if (isNaN(parseInt(obj.total))) {
            obj.total = '0,00'  
          };
          if (isNaN(parseInt(obj.mean))) {
            obj.mean = '0,00'  
          };
          tableData.push(obj)
        },
        clear: function() {while (tableData.length > 0){tableData.pop()}},
        modify: function(obj) {
          for (var i = 0; i < tableData.length; i++){
            if (obj.name === tableData[i].name) {
              if (isNaN(parseInt(obj.transactions))) {
                obj.transactions = '0,00'
              };
              if (isNaN(parseInt(obj.presc))) {
                obj.presc = '0,00'
              };
              if (isNaN(parseInt(obj.fact))) {
                obj.fact = '0,00'
              };
              if (isNaN(parseInt(obj.total))) {
                obj.total = '0,00'
              };
              if (isNaN(parseInt(obj.mean))) {
                obj.mean = '0,00'
              };
              tableData[i].transactions = obj.transactions;
              tableData[i].presc = obj.presc;
              tableData[i].fact = obj.fact;
              tableData[i].total = obj.total;
              tableData[i].mean = obj.mean;
            };
          }
        }
      };
  })
  .controller('MedicamentosCtrl', function ($scope, $http, $filter, tableService) {
    $scope.tableService = tableService;
    $scope.medCurrentOpt = 'Presentación';
    $scope.medTableOrderBy = 'transactions';
    $scope.medReverse = true;
    $scope.medFiltersOn = false;
    $scope.placeholder = 'Medicamento'
    $scope.focusedRow = 'Fila';
    $scope.male = false;
    $scope.female = false;
    $scope.maleAct = false;
    $scope.femaleAct = false;
    $scope.filtsAct = false;
    $scope.edadAct = false;
    $scope.edadGrupoAct = false;
    $scope.montoActFrom = false;
    $scope.montoActTo = false;
    $scope.priceActTo = false;
    $scope.priceActFrom = false;
    $scope.showPrice = false;
    $scope.presc='';
    $scope.ageGroups = [
      {name:'...'},
      {name:'Recién Nacido'},
      {name:'Lactante Menor'},
      {name:'Lactante Mayor'},
      {name:'Preescolar'},
      {name:'Escolar'},
      {name:'Adolescente'},
      {name:'Adulto Joven'},
      {name:'Adulto Maduro'},
      {name:'Adulto Mayor'}
    ];
    $scope.ageGroup = $scope.ageGroups[0];
    $scope.totalFiltFrom = -1;
    $scope.totalFiltTo = -1;
    $scope.priceFrom = -1;
    $scope.priceTo = -1;
    $scope.age = '';
    $scope.filtersUrl = '';
    $scope.limit = 10;
    $scope.page = 1;
    $scope.pages = [];
    $scope.offset = 0;
    $scope.pages[0] = '-';
    $scope.pages[1] = '-';
    $scope.pages[2] = '-';
    $scope.pages[3] = '-';
    $scope.pages[4] = '-';
    $scope.fetchedValue = '';
    $scope.substitutesAct = false;
    $scope.searching = false;
    $scope.substitutesData = {"objects": []};
    $scope.marcaGrupoData = {"objects": []};
    $scope.marcaData = {"objects": []};
    $scope.table = {"objects": []};
    $scope.date1 = "01/01/2012";
    $scope.date2 = "31/12/2012";
    
    // $scope.specialInit = function () {
    //   // //console.log('init!');
    //   //console.log( $('.input-ft-input').val())


    // }
    
    $scope.searchInTable = function () {
      if ($('.input-header-m').val()!=='') {
        // //console.log('searching modafoca :'+$('.input-header-m').val());
      $scope.searching = true;
      $scope.fetchedValue = $('.input-header-m').val();
      $scope.checkActiveFilters();
      $scope.page = 1;
      $scope.offset = 0;
      tableService.clear();
      if (!$scope.substitutesAct || $scope.partial!=='Medicamentos') {
        var tempURL = ''
        var typeOfRequest = ''
        var tempName = ''
        //console.log('partial-'+$scope.partial+' medCurrentOpt '+$scope.medCurrentOpt)
        if ($scope.partial === 'Medicamentos') {
          if ($scope.medCurrentOpt === 'Presentación') {
            typeOfRequest = 'presentationRequested/custom'
          }else if ($scope.medCurrentOpt === 'Marca') {
            typeOfRequest = 'medicationRequested/custom'
          }else if ($scope.medCurrentOpt === 'Marca Grupo') {
            typeOfRequest = 'drugBrandRequested/custom'
          };
        }else if ($scope.partial === 'Principio Activo') {
          typeOfRequest = 'actIngredientRequested/custom'
        }else if ($scope.partial === 'Laboratorios') {
          typeOfRequest = 'pharmaceuticalRequested/custom'
        };
        //console.log(typeOfRequest)
        tempURL = $scope.buildTableDataUrl(typeOfRequest, $scope.fetchedValue)
        $http({method: 'GET', url: tempURL})
          .success(function(data) {
             //console.log(data)
              // completar set up y disables
              // paginacion etc

              for (var i = 0; i<data.objects.length; i++){
                if ($scope.partial==='Medicamentos') {
                  if ($scope.medCurrentOpt === 'Presentación') {
                    tempName = data.objects[i].presentation_name
                  }else if ($scope.medCurrentOpt === 'Marca') {
                    tempName = data.objects[i].medication_name
                  }else if ($scope.medCurrentOpt === 'Marca Grupo') {
                    tempName = data.objects[i].drug_brand_name
                  };
                }else if ($scope.partial ==='Principio Activo') {
                    tempName = data.objects[i].act_ingredient_name
                }else if ($scope.partial ==='Laboratorios') {
                    tempName = data.objects[i].phar_comp_name
                };
                tableService.add({
                  position: i+1,
                  name: tempName,
                  transactions: data.objects[i].trans__sum,
                  presc: data.objects[i].presc_drug_quantity__sum,
                  fact: data.objects[i].req_med_quantity__sum,
                  total: parseFloat(data.objects[i].total__sum).toFixed(2).replace('.',',').replace(/\d(?=(\d{3})+\,)/g, '$&.'),
                  mean: parseFloat(data.objects[i].presentation_price__avg).toFixed(2).replace('.',',').replace(/\d(?=(\d{3})+\,)/g, '$&.')
                })
              }
              tableService.setDataTotal(data.meta.total_count);
              for (var i = 0; i < 5; i++){
                 $scope.pages[i] = (i*$scope.limit < tableService.dataTotal()) ? (i+1) : '-'
              };
              if (tableService.dataTotal() === 0) {
                tableService.dataLoaded(true)
              }else{
                tableService.dataLoaded(false)
              };
              
          })
          .error(function(data) {
              //console.log('callURL failure: '+type+ ' type: '+type);
          })

        }else{
          var isIn = false;
         
          $http({method: 'GET', url: 'http://127.0.0.1:8000/api/v1/substitute/?limit=1000&offset=0'+$scope.buildFilters()+'&presc_presentation_name='+$scope.focusedRow+'&format=json'})
          .success(function(data) {
            //console.log(data)
            for (var i = 0; i<data.objects.length; i++){
              //console.log(data.objects[i].req_presentation_name+'--'+$scope.fetchedValue)
              if (data.objects[i].req_presentation_name.lastIndexOf(($scope.fetchedValue).toUpperCase())===-1) {
                data.objects.splice(i,1);
                i--;
                //console.log('no')
              }else{
                var isIn = true;
                
                //console.log('si')
              };
            }

            if (!isIn) {
              tableService.dataLoaded(true)
              tableService.setDataTotal(0);
            }else{
              $scope.substitutesData = data;
              tableService.setDataTotal(data.meta.total_count)
              tableService.dataLoaded(false)
              //console.log(data)
            };
            for (var i = 0; i < 5; i++){
               $scope.pages[i] = (i*$scope.limit < tableService.dataTotal()) ? (i+1) : '-'
            };
          })
          .error(function(data) {
              //console.log('callURL failure: '+type+ ' type: '+type);
          })
        };
      }else{
        //console.log('shouldoffsearch');
        $scope.search_span_mRemove();
      };
    }
    $scope.nextPages = function () {

      if (($scope.pages[4]*$scope.limit) < tableService.dataTotal()) {
          if (($scope.page % 5)===0) {
            $scope.page = $scope.page + 1;
          }else{
            $scope.page = $scope.page + (6-($scope.page % 5))
          };
          $scope.offset = ($scope.page-1)*$scope.limit;
          if (!$scope.substitutesAct) {
            $scope.loadTable();
          }else{
            $scope.substitutes(false);
          };
          if ((($scope.pages[4]+5)*$scope.limit) > tableService.dataTotal()) {
            //console.log((tableService.dataTotal() % ($scope.limit*5)));
            for (var i = 0; i < 5; i++){
              $scope.pages[i] = ((tableService.dataTotal() % ($scope.limit*5)) >= ((i)*$scope.limit)) ? ($scope.pages[i]+5) : '-'
            };
          }else{
            $scope.pages[0] = $scope.pages[0] + 5;
            $scope.pages[1] = $scope.pages[1] + 5;
            $scope.pages[2] = $scope.pages[2] + 5;
            $scope.pages[3] = $scope.pages[3] + 5;
            $scope.pages[4] = $scope.pages[4] + 5;
          };
      };
    }
    $scope.repage = function () {
      var mod = $scope.page % 5;
      mod = mod === 0 ? 5 : mod;
      for (var i = 1; i < 6; i++) {
        $scope.pages[i-1] = (mod-i) >= 0 ? $scope.page-(mod-i) : '-'
      };
    }
    $scope.changePage = function (opt) {
      // //console.log('page'+$scope.pages[opt]+'opt'+opt);
      if (($scope.pages[opt]!=='-') && ($scope.pages[opt]!==$scope.page)) {
        if (opt===-1) {
          $scope.page = 1;
          //repage?
          $scope.offset = 0;
          $scope.loadTable();
        }else if (opt===-2) {
          if ($scope.pages[0]!=='-') {
            $scope.page = parseInt(tableService.dataTotal()/$scope.limit);
            if (tableService.dataTotal()%$scope.limit!==0) {
              $scope.page++
            };
            $scope.offset = ($scope.page-1)*$scope.limit;
            $scope.repage();
            $scope.loadTable();
          };
          
        }else{
          $scope.page = $scope.pages[opt];
          $scope.offset = ($scope.page-1)*$scope.limit;
          $scope.loadTable();
        };
      };
    }
    $scope.prevPages = function () {
      if ($scope.page > 1) {
        if ($scope.page < 6) {
          if ($scope.page > 1) {
            $scope.page = 1;
            $scope.offset = 0;
            if (!$scope.substitutesAct) {
              $scope.loadTable();  
            }else{
              $scope.substitutes(false);
            };
          };
        }else{
          if (($scope.page % 5)===0) {
            $scope.page = $scope.page - 5;
          }else{
            $scope.page = $scope.page - ($scope.page % 5);
          };
          $scope.offset = ($scope.page-1)*$scope.limit;
          if (!$scope.substitutesAct) {
            $scope.loadTable();
          }else{
            $scope.substitutes(false);
          };
          for (var i = 0; i < 5; i++){
            $scope.pages[i] = ($scope.pages[i]==='-') ? ($scope.pages[0]+i) : ($scope.pages[i]-5) 
          };
        };
      };
    }
    $scope.actvPageStyle = function (opt) {
      if (opt===-1) {
        if ($scope.pages[0]===1) {
          return {'background-color': '#f8f8f8', 'color': '#aaa', 'cursor':'default'}
        };
      }else if (opt===-2) {
        //probar usando offset
        if (tableService.dataTotal() < (($scope.limit*5)+$scope.offset)) {
          return {'background-color': '#f8f8f8', 'color': '#aaa', 'cursor':'default'}
        };
      }else if ($scope.page===$scope.pages[opt]) {
        return { 'color': '#002d61', 'font-weight': '700'};
      };
    }
    $scope.medCatsSwitch = function(opt){
        $scope.medCurrentOpt = opt;
        // //console.log($scope.medCurrentOpt)
        $scope.medShowOpts = false;
        $scope.offset = 0;
        $scope.page = 1;
        //set pages to default empty here
        for (var i = 1; i<6; i++){
          $scope.pages[i]='-';
        }
        $scope.loadTable();
    };
    $scope.setBackgroundFilMed = function() {
        if ($scope.medFiltersOn) {
             return { 'background-color': '#eee', 'color': '#002d61'};
        }if ($scope.substitutesAct) {
          return { 'boder':'1px solid #fbfbfb','background-color': '#fcfcfc', 'color': '#aaa', 'cursor':'default'};
        };
    };
    $scope.setBackgroundMed = function(opt) {
        if ($scope.medCurrentOpt === opt) {
          return { 'background-color': '#eee', 'color': '#002d61'};
        };
    };
    $scope.medOrderByChange = function(opt){
      if (!$scope.substitutesAct) {

        if ($scope.medTableOrderBy === opt) {
            $scope.medReverse=!$scope.medReverse;
        }else{
            $scope.medReverse = false;
        };
        $scope.medTableOrderBy = opt;
        if ($scope.searching) {
          $scope.searchInTable();
        }else{
          $scope.loadTable();  
        };

      };
    };
    $scope.medCatsShow = function(){
        $scope.medShowOpts = !$scope.medShowOpts;
    };
    $scope.toggleFilters = function(){
        if (!$scope.substitutesAct) {
          $scope.medFiltersOn = !$scope.medFiltersOn;
          if ($scope.medFiltersOn) {
            //console.log($scope.age+'must fix filts')
            // $('.price_from_m').val() = $scope.priceFrom;
            // $('.price_to_m').val() = $scope.priceTo;
            // $('.total_from_m').val() = $scope.totalFiltFrom;
            // $('.total_to_m').val() = $scope.totalFiltTo;
            // document.getElementById('age_input_m').value = 'perro';
            // $('#age_input_m').val() = "casa";
            // $scope.ageGroups[$(age_group_input_m).val()];
          };
        }
    };
    $scope.cellFocus = function(opt){9
      if (!$scope.substitutesAct && $scope.partial!=='Otras Prescripciones' && $scope.partial!=='Otras Dispensaciones' && $scope.partial!=='Otras Enfermedades' && $scope.partial!=='Indicaciones Médicas') {
        if (opt===$scope.focusedRow) {
          $scope.focusedRow = 'Fila';
        }else{
          $scope.focusedRow = opt;
        };
      };
    };
    $scope.maleFilt = function(){
        $scope.male = !$scope.male;
        if ($scope.male) {$scope.female = false;};
    };
    $scope.femaleFilt = function(){
        $scope.female = !$scope.female;
        if ($scope.female) {$scope.male = false;};
    };
    $scope.maleStyle = function(){
        if ($scope.male) {
            return {'color': '#002d61', 'font-size': '30px'};
        };
    };
    $scope.femaleStyle = function(){
        if ($scope.female) {
            return {'color': '#002d61', 'font-size': '30px'};
        };
    };
    $scope.positionColStyle = function () {
      if (!($scope.partial==='Principio Activo' || ($scope.medCurrentOpt==='Presentación' && $scope.partial==='Medicamentos'))) {
        return {'width':'1%'}
      };
    }
    $scope.tableHeaderCursor = function (opt) {
      // partial==='Principio Activo'||(medCurrentOpt==='Presentación'&&partial==='Medicamentos')
      // //console.log(!($scope.partial==='Principio Activo' || ($scope.medCurrentOpt==='Presentación' && $scope.partial==='Medicamentos')))
      // //console.log(opt)
      if (opt==='numeral' && !($scope.partial==='Principio Activo' || ($scope.medCurrentOpt==='Presentación' && $scope.partial==='Medicamentos'))) {
        //chequear cuando haya substitutos o no
        return {'width':'1%'}
      };
      if ($scope.substitutesAct) {
        return {'cursor':'default', 'background-color':'#f8f8f8'}
      };
    }
    $scope.checkActiveFilters = function () {
       if ($scope.maleAct || $scope.femaleAct || $scope.edadAct || $scope.edadGrupoAct || $scope.montoActFrom || $scope.montoActTo || $scope.priceActFrom || $scope.priceActTo || $scope.searching) {
            $scope.filtsAct = true;
       }else{
            $scope.filtsAct = false;
       };
    }
    $scope.applyFilters = function(){
        //VALIDAR TODO
        $scope.offset = 0;
        $scope.page = 1;
        if (!isNaN(parseInt($(price_from_m).val())) && !isNaN(parseInt($(price_to_m).val()))) {
          if ( parseFloat($(price_from_m).val()) > parseFloat($(price_to_m).val())) {
            alert('Rango invalido en filtro \'Precio\' desde: '+$(price_from_m).val()+' hasta: '+$(price_to_m).val());
          }else{
            $scope.priceFrom = $(price_from_m).val();
            $scope.priceTo = $(price_to_m).val();
            $scope.priceActFrom = true;
            $scope.priceActTo = true;
          };
        }else if (!isNaN(parseInt($(price_from_m).val()))) {
            $scope.priceActFrom = true;
            $scope.priceFrom = $(price_from_m).val();
            $scope.priceTo = -1;
            $scope.priceActTo = false;
        }else if (!isNaN(parseInt($(price_to_m).val()))) {
            $scope.priceActTo = true;
            $scope.priceTo = $(price_to_m).val();
            $scope.priceFrom = -1;
            $scope.priceActFrom = false;
        }else{
          $scope.priceTo = -1;
          $scope.priceActTo = false;
          $scope.priceFrom = -1;
          $scope.priceActFrom = false;
        };
        if (!isNaN(parseInt($(total_from_m).val())) && !isNaN(parseInt($(total_to_m).val()))) {
          if ( parseFloat($(total_from_m).val()) > parseFloat($(total_to_m).val())) {
            alert('Rango invalido en filtro \'Monto Total\' desde: '+$(total_from_m).val()+' hasta: '+$(total_to_m).val());
          }else{
            $scope.totalFiltFrom = $(total_from_m).val();
            $scope.totalFiltTo = $(total_to_m).val();
            $scope.montoActFrom = true;
            $scope.montoActTo = true;
          };
        }else if (!isNaN(parseInt($(total_from_m).val()))) {
            $scope.montoActFrom = true;
            $scope.totalFiltFrom = $(total_from_m).val();
            $scope.totalFiltTo = -1;
            $scope.montoActTo = false;
        }else if (!isNaN(parseInt($(total_to_m).val()))) {
            $scope.montoActTo = true;
            $scope.totalFiltTo = $(total_to_m).val();
            $scope.totalFiltFrom = -1;
            $scope.montoActFrom = false;
        }else{
            $scope.totalFiltFrom = -1;
            $scope.totalFiltTo = -1;
            $scope.montoActFrom = false;
            $scope.montoActTo = false;
        };
        if (!isNaN(parseInt($(age_input_m).val()))) {
            $scope.edadAct = true;
            $scope.edadGrupoAct = false;
            $scope.age = $(age_input_m).val();
        }else if ($(age_group_input_m).val()>0) {
            $scope.edadAct = false;
            $scope.edadGrupoAct = true;
            $scope.ageGroup = $scope.ageGroups[$(age_group_input_m).val()];
        }else{
            $scope.edadAct = false;
            $scope.edadGrupoAct = false;
            $scope.ageGroup = $scope.ageGroups[0];
        };
        if ($scope.male) {
            $scope.maleAct = true;
            $scope.femaleAct = false;
        }else if ($scope.female) {
            $scope.femaleAct = true;
            $scope.maleAct = false;
        }else{
          $scope.maleAct = false;
          $scope.femaleAct = false;
        };
        $scope.checkActiveFilters();
        $scope.medFiltersOn = false;
        $scope.loadTable();
    };
    $scope.search_span_mRemove = function () {
      $scope.offset = 0;
      $scope.page = 1;
      $scope.searching = false;
      $scope.checkActiveFilters();
      $scope.loadTable();
    }
    $scope.age_span_mRemove = function () {
        $scope.offset = 0;
        $scope.page = 1;
        $scope.edadAct = false;
        $scope.edadGrupoAct = false;
        $scope.age = -1
        $scope.checkActiveFilters();
        if(!$scope.substitutesAct){
          $scope.loadTable();
        }
        
    };
    $scope.age_group_span_mRemove = function () {
        $scope.offset = 0;
        $scope.page = 1;
        $scope.edadAct = false;
        $scope.edadGrupoAct = false;
        $scope.ageGroup = $scope.ageGroups[0];
        $scope.checkActiveFilters();
        if(!$scope.substitutesAct){
          $scope.loadTable();
        }
        
    };
    $scope.total_f_span_mRemove = function () {
        $scope.offset = 0;
        $scope.page = 1;
        $scope.totalFiltFrom = -1;
        $scope.montoActFrom = false;
        $scope.checkActiveFilters();
        if(!$scope.substitutesAct){
          $scope.loadTable();
        }
        
    };
    $scope.total_t_span_mRemove = function () {
        $scope.offset = 0;
        $scope.page = 1;
        $scope.totalFiltTo = -1;
        $scope.montoActTo = false;
        $scope.checkActiveFilters();
        if(!$scope.substitutesAct){
          $scope.loadTable();
        }
        
    };
    $scope.price_f_span_mRemove = function () {
        $scope.offset = 0;
        $scope.page = 1;
        $scope.priceFrom = -1;
        $scope.priceActFrom = false;
        $scope.checkActiveFilters();
        if(!$scope.substitutesAct){
          $scope.loadTable();
        }
        
    };
    $scope.price_t_span_mRemove = function () {
        $scope.offset = 0;
        $scope.page = 1;
        $scope.priceTo = -1;
        $scope.priceActTo = false;
        $scope.checkActiveFilters();
        if(!$scope.substitutesAct){
          $scope.loadTable();
        }
        
    };
    $scope.male_span_mRemove = function () {
        $scope.offset = 0;
        $scope.page = 1;
        $scope.maleAct = false;
        $scope.checkActiveFilters();
        if(!$scope.substitutesAct){
          $scope.loadTable();
        }
        
    };
    $scope.female_span_mRemove = function () {
        $scope.offset = 0;
        $scope.page = 1;
        $scope.femaleAct = false;
        $scope.checkActiveFilters();
        if(!$scope.substitutesAct){
          $scope.loadTable();
        }
        
    };
    $scope.changeQueryLimit = function (opt) {
      $scope.limit = opt;
      $scope.page = 1;
      $scope.offset = 0;
      //modificar segun caso
        for (var i = 0; i < 5; i++){
          //console.log(tableService.dataTotal())
          $scope.pages[i] = (tableService.dataTotal() - ($scope.limit*i)) < 1 ? '-' : i+1
        };
      // $scope.pages[0] = 1;
      // $scope.pages[1] = 2;
      // $scope.pages[2] = 3;
      // $scope.pages[3] = 4;
      // $scope.pages[4] = 5;
      //console.log($scope.substitutesAct+'changelimit b4');
      if(!$scope.substitutesAct){
        $scope.loadTable();
      }else{
        // //console.log($scope.substitutesAct+'changelimit after');
        $scope.substitutes(false);
        // //console.log($scope.substitutesAct+'changelimit after2');
      }
      
    };
    $scope.rowFocusStyle = function (opt) {
      if (opt.name === $scope.focusedRow) {
        return {'color': '#002d61', 'font-weight': '700'}; ;  
      };
      
    }
    $scope.activeQueryStyle = function (opt) {
      if ($scope.limit === opt) {
        return {'color': '#002d61', 'font-weight': '700'}; 
      };
    };
    $scope.resetFilts = function () {
       // //console.log('AAAAAAAAAAaa');
      $scope.age_span_mRemove();
      $scope.age_group_span_mRemove();
      $scope.total_f_span_mRemove();
      $scope.total_t_span_mRemove();
      $scope.price_f_span_mRemove();
      $scope.price_t_span_mRemove();
      $scope.male_span_mRemove();
      $scope.female_span_mRemove();
      $scope.offset=0;
      $scope.page = 1;
      //cargar adeacuadamente paginasF
      for (var i = 0; i < 5; i++){
        $scope.pages[i] = i+1;
      };
       // //console.log('BBBBBBBBBBBBB');
    }
     $scope.buildFilters = function () {
      var filters = '';
      var order = '';
      if ($scope.partial==='Otras Prescripciones' || $scope.partial==='Otras Dispensaciones') {
        if ($scope.medCurrentOpt==='Presentación') {
          filters += '&presentation_name__contains=';
        }else{
          filters += '&medication_name__contains=';
        };
        filters += $('.input-ft-input').val().toUpperCase();
      }else if ($scope.partial==='Otras Enfermedades') {
        filters += '&diagnosis_name__contains='
        filters += $('.input-ft-input').val().toUpperCase();
      }else if ($scope.partial==='Indicaciones Médicas') {
        filters += '&presentation_name__contains='
        filters += $('.input-ft-input').val().toUpperCase();
      };
      if ($scope.edadAct) {
        filters += '&age=';
        filters += $scope.age;
      }else if ($scope.edadGrupoAct) {
        filters += '&age__gte='
        if ($scope.ageGroup.name==='Recién Nacido') {
          filters += '0';
          filters += '&age__lte=0';
        }else if ($scope.ageGroup.name==='Lactante Menor') {
          filters += '0';
          filters += '&age__lte=1';
        }else if ($scope.ageGroup.name==='Lactante Mayor') {
          filters += '1';
          filters += '&age__lte=2';
        }else if ($scope.ageGroup.name==='Preescolar') {
          filters += '2';
          filters += '&age__lte=6';
        }else if ($scope.ageGroup.name==='Escolar') {
          filters += '7';
          filters += '&age__lte=11';
        }else if ($scope.ageGroup.name==='Adolescente') {
          filters += '12';
          filters += '&age__lte=19';
        }else if ($scope.ageGroup.name==='Adulto Joven') {
          filters += '20';
          filters += '&age__lte=39';
        }else if ($scope.ageGroup.name==='Adulto Maduro') {
          filters += '40';
          filters += '&age__lte=64';
        }else if ($scope.ageGroup.name==='Adulto Mayor') {
          filters += '65';
        };
      };
      if ($scope.montoActFrom) {
        if ($scope.partial==='Farmacias') {
          filters += '&total__gte=';
        }else{
          filters += '&total__sum__gte=';  
        };
        filters += $scope.totalFiltFrom
      };
      if ($scope.montoActTo) {
        if ($scope.partial==='Farmacias') {
          filters += '&total__lte=';
        }else{
          filters += '&total__sum__lte=';    
        };
        filters += $scope.totalFiltTo
      };


      if ($scope.priceActFrom) {
        if ($scope.partial==='Principio Activo') {
          filters += '&reference_price__avg__gte=';
        }else{
          filters += '&presentation_price__avg__gte=';  
        };
        
        filters += $scope.priceFrom
      };
      if ($scope.priceActTo) {
        if ($scope.partial==='Principio Activo') {
          filters += '&reference_price__avg__lte=';
        }else{
          filters += '&presentation_price__avg__lte=';  
        };
        filters += $scope.priceTo
      };

      if ($scope.maleAct) {
        filters += '&sex=M';
      }else if ($scope.femaleAct) {
        filters += '&sex=F';
      };

      if ($scope.medTableOrderBy!=='none') {
        if ($scope.partial==='Farmacias' || $scope.partial==='Especialidades Médicas' || $scope.partial==='Indicaciones Médicas') {
          if ($scope.medReverse) {
            order=''
          }else{
            order='-'
          };  
        }else{
          if ($scope.medReverse) {
            order='desc'
          }else{
            order='asc'
          };
        };
      };
      if ($scope.partial!=='Farmacias' && $scope.partial!=='Especialidades Médicas' && $scope.partial!=='Indicaciones Médicas') {

        if ($scope.medTableOrderBy === 'transactions') {
          filters += '&trans__sum=';
        }else if ($scope.medTableOrderBy === 'fact') {
          filters += '&req_med_quantity__sum=';
        }else if ($scope.medTableOrderBy === 'total') {
          filters += '&total__sum=';
        }else if ($scope.medTableOrderBy === 'mean') {
          if ($scope.partial==='Principio Activo') {
            filters += '&reference_price__avg=';
          }else{
            filters += '&presentation_price__avg=';
          };
        }else if ($scope.medTableOrderBy === 'name') {
          filters += '&name__order='
        }else if ($scope.medTableOrderBy === 'presc') {
          filters += '&presc_drug_quantity__sum=';
        };
        filters += order;
      }else{
        filters+= '&order_by=';
        filters += order;
        if ($scope.medTableOrderBy === 'transactions') {
          filters += 'trans';
        }else if ($scope.medTableOrderBy === 'total') {
          filters += 'total';
        }else if ($scope.medTableOrderBy === 'name') {
          filters += 'name'
        };
      };
      
      // };
      // setDate.setFrom($scope.date1);
      // setDate.setTo($scope.date2);
      // if (!
        // //console.log('not oning')
        // //console.log($scope.date1)
        // //console.log($scope.date2)
        $('#datepicker1').trigger('input');
        $('#datepicker2').trigger('input');
        $scope.date1 = $('#datepicker1').val();
        $scope.date2 = $('#datepicker2').val();  
      // };
      
      var dayFrom = $scope.date1.substring(0, 2);
      var dayTo = $scope.date2.substring(0, 2);
      var monthFrom = $scope.date1.substring(3, 5);
      var monthTo = $scope.date2.substring(3, 5);
      var yearFrom =  $scope.date1.substring(6, 10);
      var yearTo =  $scope.date2.substring(6, 10);

      //console.log( dayFrom+'-'+monthFrom+'-'+yearFrom)
      // //console.log( dayTo+'-'+monthTo+'-'+yearTo)
      // //console.log(setDate.from());
      // //console.log(setDate.to());
      //VALIDAR
      filters+='&date__gte=';
      filters+=yearFrom;
      filters+='-';
      filters+=monthFrom;
      filters+='-';
      filters+=dayFrom;
      filters+='&date__lte=';
      filters+=yearTo;
      filters+='-';
      filters+=monthTo;
      filters+='-';
      filters+=dayTo;
     
      return filters;
    }
    // $scope.dateRegister = function () {
    //     // VALIDATE!!!!
    //     setDate.setFrom($scope.date1);
    //     setDate.setTo($scope.date2);
    //     //console.log(setDate.from+'asdasdasd')
    //     if ($scope.partial==='Medicamentos') {
    //       $scope.loadTable();
    //     };
    // }
    $scope.buildTableDataUrl = function (type,name) {
      
      var URL = 'https://apimetrics.pcaaudit.com/api/v1/';
      URL+=type;  
      URL+='/?limit=';
      URL+=$scope.limit;
      URL+='&offset=';
      // //console.log('offset'+$scope.offset)
      if (name!=='' && type!=='substitute') {
        URL+='0';
      }else{
        URL+=$scope.offset;  
      };
      URL+=$scope.buildFilters();
      // if (type==='presc'&& $scope.medTableOrderBy !== 'presc') {
      if ($scope.searching) {
        // actIngredientRequested
        // act_ingredient_name
        // act_ingredient_name__contains
        // pharmaceuticalRequested
        // phar_comp_name
        // phar_comp_name__contains
        if ($scope.partial==='Medicamentos') {
          if ($scope.medCurrentOpt === 'Presentación') {
            // typeOfRequest = 'presentationRequested/custom'
            URL+='&presentation_name__contains=';
          }else if ($scope.medCurrentOpt === 'Marca') {
            // typeOfRequest = 'medicationRequested/custom'
            URL+='&medication_name__contains=';
          }else if ($scope.medCurrentOpt === 'Marca Grupo') {
            // typeOfRequest = 'drugBrandRequested/custom'
            URL+='&drug_brand_name__contains=';
          };
          // URL+='&presentation_name__contains=';
        }else if ($scope.partial ==='Principio Activo') {
          URL+='&act_ingredient_name__contains=';
        }else if ($scope.partial ==='Laboratorios') {
          URL+='&phar_comp_name__contains='
        };
        URL+= $scope.fetchedValue.toUpperCase();
      }else{
        if ($scope.medCurrentOpt==='Presentación') {
          if (type==='substitute') {
            URL+='&presc_presentation_name=';  
          }else if (name!==''){
            URL+='&presentation_name=';  
          };
          URL+= name.toUpperCase();
        }else if ($scope.medCurrentOpt==='Marca') {
          URL+='&presc_presentation_drugbrand=';
          URL+= name.toUpperCase();
        };
      }
      URL+='&format=json'
      console.log(URL);
      return URL;
    }
    $scope.callGet = function (type) {
      // //console.log('rtyrtyyrty');
      $http({method: 'GET', url: $scope.buildTableDataUrl(type,'')})
          .success(function(data) {
              if ($scope.partial==='Medicamentos' ) {
                  if ((type === 'presentationRequested/custom' && !$scope.substitutesAct) || $scope.medCurrentOpt==='Marca' || $scope.medCurrentOpt==='Marca Grupo') {
                    //console.log("reading presentacion");
                     $scope.table = data;
                     tableService.setDataTotal(data.meta.total_count)
                      if (tableService.dataTotal() === 0) {
                        tableService.dataLoaded(true)
                      }else{
                        tableService.dataLoaded(false)
                      };
                  }
                  // MODIFICAR SEGUN SEA EL CASO
              }else{
                 $scope.table = data;
                 //console.log(data.meta.total_count)
                 tableService.setDataTotal(data.meta.total_count);
                  if (tableService.dataTotal() === 0) {
                    tableService.dataLoaded(true)
                  }else{
                    tableService.dataLoaded(false)
                  };
              };
          })
          .error(function(data) {
              //console.log('callURL failure: '+type+ ' type: '+type);
          })
    }
    $scope.getMedicamentData = function () {
      // usar switch
      if (!$scope.substitutesAct) {
        if ($scope.medCurrentOpt==='Presentación' && $scope.partial==='Medicamentos') {
          $scope.callGet('presentationRequested/custom'); 
        }else if ($scope.medCurrentOpt==='Marca' && $scope.partial==='Medicamentos') {
          $scope.callGet('medicationRequested/custom'); 
        }else if ($scope.medCurrentOpt==='Marca Grupo' && $scope.partial==='Medicamentos') {
          $scope.callGet('drugBrandRequested/custom'); 
        }else if ($scope.partial==='Principio Activo') {
          $scope.callGet('actIngredientRequested/custom'); 
        }else if ($scope.partial==='Laboratorios') {
          $scope.callGet('pharmaceuticalRequested/custom'); 
        }else if ($scope.partial==='Desviaciones') {
          $scope.callGet('irregularity/custom'); 
        }else if ($scope.partial==='Clases Terapéuticas') {
          if ($scope.medCurrentOpt==='Presentación') {
            $scope.medCurrentOpt = 'Clases Terapéuticas';
          };
          if ($scope.medCurrentOpt === 'Clases Terapéuticas') {
            //console.log('clase t')
            $scope.callGet('therapeuticClass/custom');
          }else if ($scope.medCurrentOpt === 'Subclases Terapéuticas') {
            //console.log('subclase 1')
            $scope.callGet('therapeuticSub/custom');
          }else if ($scope.medCurrentOpt === 'Subclases Terapéuticas 2') {
            //console.log('subclase 2')
            $scope.callGet('therapeuticSub2/custom');
          }else if ($scope.medCurrentOpt === 'Subclases Terapéuticas 3') {
            //console.log('subclase 3')
            $scope.callGet('therapeuticSub3/custom');
          };
          // $scope.callGet('pharmaceuticalRequested/custom'); 
        }else if ($scope.partial==='Enfermedades') {
          if ($scope.medCurrentOpt==='Presentación') {
            $scope.medCurrentOpt = 'Diagnóstico';
          };
          if ($scope.medCurrentOpt === 'Diagnóstico') {
            //console.log('diagnosis')
            $scope.callGet('diagnosis/custom');
          }else if ($scope.medCurrentOpt === 'Tipo de Diagnóstico') {
            //console.log('diagnosis 1')
            $scope.callGet('diagnosis1/custom');
          }else if ($scope.medCurrentOpt === 'Subtipo de Diagnóstico') {
            //console.log('diagnosis 2')
            $scope.callGet('diagnosis2/custom');
          };
          // $scope.callGet('pharmaceuticalRequested/custom'); 
        }else if ($scope.partial==='Datos Demográficos') {
          if ($scope.medCurrentOpt==='Presentación') {
            $scope.medCurrentOpt = 'Edad';
          };
          if ($scope.medCurrentOpt === 'Edad') {
            //console.log('Edad')
            $scope.callGet('demographics_age/custom');
          }else if ($scope.medCurrentOpt === 'Sexo') {
            //console.log('Sexo')
            $scope.callGet('demographics_sex/custom');
          };
          // $scope.callGet('pharmaceuticalRequested/custom'); 
        }else if ($scope.partial==='Farmacias') {
          if ($scope.medCurrentOpt==='Presentación') {
            $scope.medCurrentOpt = 'Farmacias';
          };
          if ($scope.medCurrentOpt === 'Farmacias') {
            //console.log('Farmacias')
            $scope.callGet('pharmacy/custom');
          }else if ($scope.medCurrentOpt === 'Cadena') {
            //console.log('Cadena')
            $scope.callGet('pharmacyChain/custom');
          };
          // $scope.callGet('pharmaceuticalRequested/custom'); 
        }else if($scope.partial==='Especialidades Médicas') {
          //console.log('Especialidades')
          $scope.callGet('speciality/custom');
        }else if($scope.partial==='Otras Prescripciones') {
          //console.log($('.input-ft-input').val())
          if ((typeof ($('.input-ft-input').val())) === 'string') {
            if ($('.input-ft-input').val()!=='') {
              if ($scope.medCurrentOpt==='Presentación') {
                $scope.callGet('otherPrescriptionsDrug/custom');
              }else if ($scope.medCurrentOpt==='Marca') {
                $scope.callGet('otherPrescriptionsMed/custom');
              };
              $scope.focusedRow = $('.input-ft-input').val().toUpperCase()
            };
          }
          //console.log('otras Prescripciones')
        }else if($scope.partial==='Otras Dispensaciones') {
          //console.log($('.input-ft-input').val())
          if ((typeof ($('.input-ft-input').val())) === 'string') {
            if ($('.input-ft-input').val()!=='') {
              if ($scope.medCurrentOpt==='Presentación') {
                $scope.callGet('otherDispensationsDrug/custom');
              }else if ($scope.medCurrentOpt==='Marca') {
                $scope.callGet('otherDispensationsMed/custom');
              };
              $scope.focusedRow = $('.input-ft-input').val().toUpperCase()
            };
          }
          //console.log('otras Prescripciones')
        }else if($scope.partial==='Otras Enfermedades') {
          //console.log($('.input-ft-input').val())
          if ((typeof ($('.input-ft-input').val())) === 'string') {
            if ($('.input-ft-input').val()!=='') {
                $scope.callGet('otherDiagnosis/custom');
              $scope.focusedRow = $('.input-ft-input').val().toUpperCase()
            };
          }
          //console.log('otras Enfermedades')
        }else if($scope.partial==='Indicaciones Médicas') {
          //console.log($('.input-ft-input').val())
          if ((typeof ($('.input-ft-input').val())) === 'string') {
            if ($('.input-ft-input').val()!=='') {
                $scope.callGet('posology');
              $scope.focusedRow = $('.input-ft-input').val().toUpperCase()
            };
          }
          //console.log('Indicaciones Médicas')
        };
           
      }else{
        $scope.substitutes(false);
      };

    }
    $scope.loadTable = function () {
      // //console.log('qweqweewqe')
            tableService.clear();
            $scope.getMedicamentData();
    };
    $scope.substStyle = function () {
      if ($scope.substitutesAct) {
        return { 'background-color': '#f8f8f8', 'color': '#aaa'}
      }else if($scope.focusedRow!=='Fila'){
        return { 'background-color':'#efefef', 'color':'#002d61','font-weight':'700', 'border':'1px solid rgb(153, 171, 192)'}
      };
    }
    $scope.dateRegisterMed = function () {
      // //console.log('asdasdasdasdasd')
      $scope.loadTable();
    }

    $scope.substitutes = function (reload) {
      if ($scope.focusedRow!=='Fila') {
        if ($scope.substitutesAct && reload) {
          $scope.medTableOrderBy = 'transactions';
          $scope.resetFilts();
          $scope.substitutesAct = false;
          $scope.loadTable();
        }else{
          $scope.medTableOrderBy = 'none';
          tableService.clear();
          if (reload) {
            $scope.resetFilts();
          };
          $scope.substitutesAct = true;
          $scope.medFiltersOn = false;
          if ($scope.searching) {
            $scope.searching = false;
            $scope.checkActiveFilters();
          };
          // //console.log('substitutes: '+$scope.focusedRow);
          $http({method: 'GET', url: $scope.buildTableDataUrl('substitute',$scope.focusedRow)})
            .success(function(data) {
              $scope.substitutesData = data;
              tableService.setDataTotal(data.meta.total_count);
              for (var i = 0; i < 5; i++){
                $scope.pages[i] = (i*$scope.limit < tableService.dataTotal()) ? (i+1) : '-'
              };
                  if (data.meta.total_count === 0) {
                    tableService.dataLoaded(true)
                  }else{
                    tableService.dataLoaded(false)
                  };
            })
            .error(function(data) {
              //console.log('Substututes failure: '+data);
            })

        };
        
      }else{
        alert('Seleccione una opción en la tabla para ver sus substitutos.');
      };
    }

//DAR FORMATO A NUMEROS
    $scope.$watchCollection('substitutesData', function(){
      if ($scope.substitutesData.objects.length>0) {

      for (var i = 0; i < $scope.substitutesData.objects.length; i++){
            //console.log('loading substitute data')
              
              tableService.add({
                                    position: i+$scope.offset+1,
                                    name: $scope.substitutesData.objects[i].req_presentation_name,
                                    transactions: 0,
                                    presc: 0,
                                    fact: 0,
                                    total: 0,
                                    mean: 0
                                    })
              $http({method: 'GET', url: 'http://127.0.0.1:8000/api/v1/presentationRequested/custom/?limit=10&offset=0'+$scope.buildFilters()+'&presentation_name='+$scope.substitutesData.objects[i].req_presentation_name+'&format=json'})
              .success(function(data) {
                // //console.log($scope.buildTableDataUrl('presentationRequested/custom',$scope.substitutesData.objects[i].req_presentation_name))
                // //console.log($scope.mediData)
                //console.log('data')
                //console.log(data)
                tableService.modify({
                  name: data.objects[0].presentation_name,
                  transactions: data.objects[0].trans__sum,
                  presc: data.objects[0].presc_drug_quantity__sum,
                  fact: data.objects[0].req_med_quantity__sum,
                  total: parseFloat(data.objects[0].total__sum).toFixed(2).replace('.',',').replace(/\d(?=(\d{3})+\,)/g, '$&.'),
                  mean: parseFloat(data.objects[0].presentation_price__avg).toFixed(2).replace('.',',').replace(/\d(?=(\d{3})+\,)/g, '$&.')
                })
              })
              .error(function(data) {
                //console.log('Substututes failure: '+data);
              })
            }
      }
    })
    $scope.$watchCollection('table', function(){
        // //console.log($scope.table.objects.length);
        if ($scope.table.objects.length>0) {
          // if (!$scope.substitutesAct) {
            // if ($scope.medTableOrderBy!=='presc') {
            // //console.log('read pdata = '+$scope.table.objects.length);

            tableService.dataLoaded(false)
            // //console.log($scope.table.objects.length + 'nodata')
            $scope.marcaData = {"objects": []};
            $scope.marcaGrupoData = {"objects": []};
            // $scope.$apply(function() {
            var temp = '';
            var tempMean = '';
            var include = true;
            // for (var i = 0; i < $scope.table.objects.length; i++){
            for (var i = 0; i < $scope.table.objects.length; i++){
              // //console.log('in')
              //REVISAR MEANS TEMPMEAN
              include = true;
              if ($scope.medCurrentOpt==='Presentación' && $scope.partial==='Medicamentos') {
                temp = $scope.table.objects[i].presentation_name
                tempMean = parseFloat($scope.table.objects[i].presentation_price__avg).toFixed(2).replace('.',',').replace(/\d(?=(\d{3})+\,)/g, '$&.')
              }else if ($scope.medCurrentOpt==='Marca' && $scope.partial==='Medicamentos') {
                temp = $scope.table.objects[i].medication_name
                tempMean = parseFloat($scope.table.objects[i].presentation_price__avg).toFixed(2).replace('.',',').replace(/\d(?=(\d{3})+\,)/g, '$&.')
              }else if ($scope.medCurrentOpt==='Marca Grupo' && $scope.partial==='Medicamentos') {
                temp = $scope.table.objects[i].drug_brand_name
                tempMean = parseFloat($scope.table.objects[i].presentation_price__avg).toFixed(2).replace('.',',').replace(/\d(?=(\d{3})+\,)/g, '$&.')
              }else if ($scope.partial==='Principio Activo') {
                temp = $scope.table.objects[i].act_ingredient_name
                tempMean = parseFloat($scope.table.objects[i].reference_price__avg).toFixed(2).replace('.',',').replace(/\d(?=(\d{3})+\,)/g, '$&.')
              }
              else if ($scope.partial==='Laboratorios') {
                temp = $scope.table.objects[i].phar_comp_name
                // tempMean = parseFloat($scope.table.objects[i].reference_price__avg).toFixed(2).replace('.',',').replace(/\d(?=(\d{3})+\,)/g, '$&.')
              }else if ($scope.partial==='Clases Terapéuticas') {
                if ($scope.medCurrentOpt === 'Clases Terapéuticas') {
                  temp = $scope.table.objects[i].therapeutic_name  
                }else if ($scope.medCurrentOpt === 'Subclases Terapéuticas') {
                  temp = $scope.table.objects[i].therapeuticsub_name  
                }else if ($scope.medCurrentOpt === 'Subclases Terapéuticas 2') {
                  temp = $scope.table.objects[i].therapeuticsub2_name  
                }else if ($scope.medCurrentOpt === 'Subclases Terapéuticas 3') {
                  temp = $scope.table.objects[i].therapeuticsub3_name  
                };
              }else if ($scope.partial==='Enfermedades') {
                if ($scope.medCurrentOpt === 'Diagnóstico') {
                  temp = $scope.table.objects[i].diagnosis_name
                }else if ($scope.medCurrentOpt === 'Tipo de Diagnóstico') {
                  temp = $scope.table.objects[i].type_description
                }else if ($scope.medCurrentOpt === 'Subtipo de Diagnóstico') {
                  temp = $scope.table.objects[i].subtype_description  
                }
              }else if ($scope.partial==='Datos Demográficos') {
                if ($scope.medCurrentOpt === 'Sexo') {
                  temp = $scope.table.objects[i].sex
                }else if ($scope.medCurrentOpt === 'Edad') {
                  temp = $scope.table.objects[i].age
                  if ($scope.table.objects[i].type_of_age==='M') {
                    if ($scope.table.objects[i].age===1) {
                      //RECIEN NACIDO MODIFICAR
                      temp+=' (mes)'
                    }else if ($scope.table.objects[i].age===0){
                      temp+=' (recien nacido)'
                    }else{
                      
                      include = false;
                    };
                  }else{
                    if ($scope.table.objects[i].age===0) {
                      temp+=' (más de un mes)'
                    }else if ($scope.table.objects[i].age===1) {
                      temp+=' (año)'
                    }else{
                      temp+=' (años)'
                    };
                  };
                }
              }else if ($scope.partial==='Farmacias') {
                
                  temp = $scope.table.objects[i].name
                
              }else if ($scope.partial==='Especialidades Médicas') {
                
                  temp = $scope.table.objects[i].speciality_name
                
              }else if ($scope.partial==='Desviaciones') {
                
                  temp = $scope.table.objects[i].irregularity_description
                
              }else if ($scope.partial==='Otras Prescripciones'  || $scope.partial==='Otras Dispensaciones' || $scope.partial==='Otras Enfermedades') {
                  temp = $scope.table.objects[i].other
              }else if ($scope.partial==='Indicaciones Médicas') {
                  include = false;
                  tableService.add({
                                  position: i+$scope.offset+1,
                                  name: $scope.table.objects[i].quantity,
                                  transactions: $scope.table.objects[i].frequency, 
                                  presc: $scope.table.objects[i].duration,
                                  fact: $scope.table.objects[i].trans,
                                  total: 0, 
                                  mean: 0
                                })  
              };
              if (include) {
                tableService.add({
                                  position: i+$scope.offset+1,
                                  name: temp,
                                  transactions: $scope.table.objects[i].trans__sum, 
                                  presc: $scope.table.objects[i].presc_drug_quantity__sum,
                                  fact: $scope.table.objects[i].req_med_quantity__sum,
                                  total: parseFloat($scope.table.objects[i].total__sum).toFixed(2).replace('.',',').replace(/\d(?=(\d{3})+\,)/g, '$&.'), 
                                  mean: tempMean
                                })
              };
            };
            // //console.log(medidata)
            if ($scope.offset === 0 && $scope.page===1) {
              for (var i = 0; i < 5; i++){
                 $scope.pages[i] = (i*$scope.limit < tableService.dataTotal()) ? (i+1) : '-'
              };
            };
            // })
          // }else{
            // $scope.$apply();
          // };
         
        };
    })
    $scope.$on('$viewContentLoaded', function(){
        //CHEQUEAR SI VENGO DE OTRA VISTA y aplicar date resgister alterno
        tableService.dataLoaded(true);
        tableService.setDataTotal(0)
        // completar
        if ($scope.partial === 'Otras Prescripciones' || $scope.partial === 'Otras Dispensaciones') {
          // $scope.placeholder
          $scope.focusedRow='Seleccione un medicamento primero'
        }else if ($scope.partial==='Otras Enfermedades') {
          //console.log('oning')
          $scope.placeholder = 'Enfermedad';
          $scope.focusedRow='Seleccione una enfermedad primero'
        }else if ($scope.partial==='Indicaciones Médicas') {
          //console.log('oning')
          $scope.placeholder = 'Marca';
          $scope.focusedRow='Seleccione una marca primero'
        };
        $scope.loadTable();
    });


  });
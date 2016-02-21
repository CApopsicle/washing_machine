'use strict';

angular.module('washingMachine')
  .controller('HomeCtrl', function ($scope, Auth, $cookieStore, $http, $interval) {

    var vm = this; 

    $scope.status = [{
        machineId: '0201',
        subscribed: false,
        plugId: '20F85EA97363',
        status: '脫水中',
        percent: 0,
        timeLeft: 0
    },{
        machineId: '0202',
        subscribed: false,
        plugId: '20F85EA96EE0',
        status: '運轉中',
        percent: 0,
        timeLeft: 0
    }];

    var translateStatus = {
        'idle': '閒置中',
        'inWater': '進水中',
        'washing': '運轉中',
        'outWater': '放水中',
        'drying': '脫水中'
    };

    angular.extend(vm, {
      name: 'HomeCtrl'
    });

    //executed when coming into this page
    getStatus();
    checkLoginAndSuscription();
    $interval(checkLoginAndSuscription, 60000);
    //executed when coming into this page

    //There are 2 cards now
    function setCircle(){
        for (var i = 0; i < 2; i++) {
            var _id = 'graph_'+(i+1);
            var el = document.getElementById(_id); // get canvas

            var options = {
                percent:  el.getAttribute('data-percent') || 25,
                size: el.getAttribute('data-size') || 110,
                lineWidth: el.getAttribute('data-line') || 8,
                rotate: el.getAttribute('data-rotate') || 0
            }

            var canvas = document.createElement('canvas');
            var span = document.createElement('span');
            var span_status = document.createElement('span');
            var span_percent = document.createElement('span');
            span_status.setAttribute("class","progress_status");
            span_status.textContent = $scope.status[i].status;
            span.setAttribute("class","progress_number");
            span.textContent = $scope.status[i].percent;
            span_percent.setAttribute("class","progress_percent");
            span_percent.textContent = '%';
                
            if (typeof(G_vmlCanvasManager) !== 'undefined') {
                G_vmlCanvasManager.initElement(canvas);
            }

            var ctx = canvas.getContext('2d');
            canvas.width = canvas.height = options.size;

            el.appendChild(span_status);
            el.appendChild(span);
            el.appendChild(span_percent);
            el.appendChild(canvas);

            ctx.translate(options.size / 2, options.size / 2); // change center
            ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

            //imd = ctx.getImageData(0, 0, 240, 240);
            var radius = (options.size - options.lineWidth) / 2;

            var drawCircle = function(color, lineWidth, percent) {
                    percent = Math.min(Math.max(0, percent || 1), 1);
                    ctx.beginPath();
                    ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
                    ctx.strokeStyle = color;
                    ctx.lineCap = 'round'; // butt, round or square
                    ctx.lineWidth = lineWidth
                    ctx.stroke();
            };

            drawCircle('#efefef', options.lineWidth, 100 / 100);
            drawCircle('#00BCD4', options.lineWidth, options.percent / 100);
        }
    };
    

    

    $scope.isLog = function(){
        return Auth.isLogged();
    };
    $scope.makeSubscription = function(machineId){
        if($cookieStore.get('isLoggedIn')){
            var data = {
                userEmail: $cookieStore.get('isLoggedIn'),
                machineID: machineId
            }
            $http.post('api/subscribe', data)
            .then(function(res){
                if(res.data=='done'){
                    $scope.status.forEach(function(eachMachine, index){
                        if(eachMachine.machineId == machineId){
                            eachMachine.subscribed = true;
                        }
                    });
                    
                }
            });
        }
        else{}// login first
    };
    function getStatus(){
        $http.get('api/status')
        .then(function(res){
            for (var i = 0; i < res.data.length; i++) {
                for (var j = 0; j < $scope.status.length; j++) {
                    if(res.data[i].id == $scope.status[j].plugId){
                        $scope.status[j].status =  translateStatus[res.data[i].status];
                        $scope.status[j].percent = res.data[i].percent;
                        $scope.status[j].timeLeft = res.data[i].timeLeft;
                        
                    }
                }
            }
            setCircle();
        });
    };
    function checkLoginAndSuscription(){
        if(Auth.isLogged()){
            $scope.status.forEach(function(item, index){
                var data = {
                    machineID: item.machineId,
                    userEmail: $cookieStore.get('isLoggedIn')
                };
                $http.post('api/subscribe/getSubs', data)
                .then(function(res){
                    $scope.status[index].subscribed = res.data;
                });
            });
        }    
    };

  });

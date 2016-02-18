'use strict';

angular.module('washingMachine')
  .controller('HomeCtrl', function ($scope, Auth, $cookieStore, $http) {

    var vm = this;
    $scope.status = [{
        machineId: '0201',
        status: '脫水中',
        subscribed: false
    },{
        machineId: '0202',
        status: '運轉中',
        subscribed: false
    }];

    angular.extend(vm, {
      name: 'HomeCtrl'
    });

    //There are 2 cards now
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
        span_status.textContent = '脫水中';
        span.setAttribute("class","progress_number");
        span.textContent = options.percent ;
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

    

    $scope.isLog = function(){
        return Auth.isLogged();
    };
    $scope.makeSubscription = function(machineId){
        if($cookieStore.get('isLoggedIn')){
            var data = {
                userEmail: $cookieStore.get('isLoggedIn'),
                machineID: machineId
            }
            console.log("subscription data: ",data);
            $http.post('api/subscribe', data)
            .then(function(res){
                console.log(res);
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

  });

// /*
// * @Author: Lewisky
// * @Date:   2016-07-05 19:17:27
// * @Last Modified by:   Lewisky
// * @Last Modified time: 2016-07-05 22:50:58
// */

// (function(angular){
//     'use strict';
//     //由于豆瓣api不支持angular.callback 这种点的形式
//     //可接受callback参数，使返回的数据为jsonp。
//     //callback只能包含数字、字母、下划线，长度不大于50
//     var app=angular.module('moviecat.http-server',[]);
//     //创建服务  一般用于注入 公用模块
//     app.service('MyService',['$window',function($window){
//         // url是请求的地址 arg是请求的数据 是object形式
//         this.jsonp=function(url,arg,fn){
//             //合并参数到url   count=0 & start=1 
//             var queryString='';
//             for(var key in arg){
//                queryString+= key+'='+arg[key]+'&'
//             }
//             //拼接地址
//             url=url+'?'+queryString;
//             //string.substr(start, length)
//             var mycallbackName='jsonp_'+Math.random().toString().substr(2);
//             //方法执行以后删除掉script标签
//             window[mycallbackName]=function(data){
//                 fn(data);
//                 $window.document.body.removeChild(scriptEle);
//             }
//             url=url+'callback='+mycallbackName;
//             //动态创建script标签
//             var scriptEle=$window.document.createElement('script');
//             script.src=url;
//             $window.document.body.appendChild(scriptEle);
//         }
//     }])

// })(angular)



/*
* @Author: huoqishi
* @Date:   2016-07-04 11:20:19
* @Last Modified by:   huoqishi
* @Last Modified time: 2016-07-04 11:27:43
*/

(function(angular){
  'use strict';
  // 1.创建模块
  var app = angular.module('moviecat.http-server',[]);

  // 2.创建服务
  app.service('MyService',['$window',function($window){
    this.jsonp=function(url,arg,fn) {
           // 1.合并参数到url中
           // start=2&count=5;
          
            var queryString = '';
            for(var key in arg){
                queryString+= key+'='+arg[key]+'&'
            }
            url = url+'?'+queryString;
            // 拼接callback参数  angular.callback 豆瓣不支持 回调函数名字
            // 给我们的逆名函数一个名字,要记得把随机数里的点去掉.
            var mycallbackName='jsonp_'+Math.random().toString().substr(2);
            // window.mycallback= fn;
            // 在方法执行后移除script标签
            $window[mycallbackName]= function(data){
              fn(data);
              $window.document.body.removeChild(scriptEle); // 这里形成了一个闭包
            }
            url=url+'callback='+mycallbackName;
           // 2.动态的创建script标签
           var scriptEle = $window.document.createElement('script');
           scriptEle.src=url;
           $window.document.body.appendChild(scriptEle);
        }
  }])

})(angular)

/*
* @Author: Lewisky
* @Date:   2016-07-05 19:17:27
* @Last Modified by:   Lewisky
* @Last Modified time: 2016-07-05 22:23:20
*/

// (function(angular){
//     'use strict';
//     //创建首页的模块
//     var app=angular.module('moviecat.home_page',['ngRoute']);
//     //指定一个路由
//     app.config(['$routeProvider',function($routeProvider){
//         $routeProvider.when('/home_page',{
//             templateUrl:'./home_page/view.html'
//         })
//     }])
// })(angular)
(function(angular){
  // 1.创建首页的模块
  var app = angular.module('moviecat.home_page',['ngRoute']);

  // 2.给定一个路由规则
  app.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/home_page',{
      templateUrl:'./home_page/view.html'
    })
  }])
})(angular)
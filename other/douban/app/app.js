/*
* @Author: Lewisky
* @Date:   2016-07-05 19:17:27
* @Last Modified by:   Lewisky
* @Last Modified time: 2016-07-06 09:24:22
*/

(function(angular){
    //创建主模块 
    var app=angular.module('moviecat',[
        //在主模块引用时  路由模块优先使用 匹配
        'moviecat.home_page',
        'moviecat.details',
        'moviecat.movie_list',
        'moviecat.auto-active'
        ])
//创建控制
    app.controller('mainController',['$scope','$location',function($scope,$location){
      $scope.query='';
      $scope.search=function(){
        //v2/movie/search   //?q={text}
       //http://api.douban.com/v2/movie/top250
        /// $scope.query;
        // 传入一个字符串参数，就是用来改变页面的锚点值。
        console.log($location.url())
        $location.url('/search?q='+$scope.query);
      }
    }])

})(angular)
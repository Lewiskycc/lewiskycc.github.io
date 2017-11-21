/*
* @Author: Lewisky
* @Date:   2016-07-05 19:17:27
* @Last Modified by:   Lewisky
* @Last Modified time: 2016-07-06 11:30:22
*/
(function(angular){
    //创建详情页模块  依赖模块的注入  路由 和 服务请求模块
    var app=angular.module('moviecat.details',['ngRoute','moviecat.http-server']);
    //配置路由请求地址
    app.config(['$routeProvider',function($routeProvider){
        //当锚点值变化为  通过路由参数 $routeParams 绑定
        //通过id来确定用户点击的电影
        $routeProvider.when('/details/:id',{
            templateUrl: './details/view.html',
            controller: 'detailsController'
        })
    }])
    //创建控制器  暴露数据到模板
    app.controller('detailsController',['$scope',
        '$routeParams',
        'MyService',
        function($scope,$routeParams,MyService){
            MyService.jsonp('http://api.douban.com/v2/movie/subject/'+$routeParams.id,{},function(data){
                //将请求回来的数据暴露出来
                $scope.data=data;
                $scope.$apply();
            })
        }])
})(angular)
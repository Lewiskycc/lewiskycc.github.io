/*
* @Author: Lewisky
* @Date:   2016-07-05 19:17:27
* @Last Modified by:   Lewisky
* @Last Modified time: 2016-07-17 08:43:14
*/

(function(angular){
    'use strict';
    //创建正在热映 top250 模块
    var app=angular.module('moviecat.movie_list',['ngRoute','moviecat.http-server']);
    //配置路由  在各自的路由模块 配置自己的规则
    app.config(['$routeProvider',function($routeProvider){
        //如果没有请求页码  添加？ 匹配不写页码的情况
        $routeProvider.when('/:movieType/:page?',{ //这里冒号后面movieType属于变量 
            //指定模板路径 模板字符串文件的路径以主模块所在目录计算
            templateUrl: './movie_list/view.html',
            controller: 'movie_listController'
        }).otherwise({
            redirectTo:'/home_page'
        })
    }])
    //创建控制器  
    app.controller('movie_listController',['$scope',
        '$http',
        '$routeParams', //路由参数Object {movieType: "in_theaters", page: "1"}
        '$route', //可以用来改变url的锚点值
        'MyService',
        function($scope,$http,$routeParams,$route,MyService){
            //获取到所有的路由参数
            $scope.loading=true;
            //分页处理
            var count=5;
            //获取当前的页码
            var page=($routeParams.page || '1')-0;
            $scope.nowPage=page;
            var start=(page-1)*count;//表示从第几条数据开始请求
            var totalPage=0;
            //这里拼接的q是 获取输入框输入的内容
            var url='http://api.douban.com/v2/movie/'+$routeParams.movieType+'?q='+$routeParams.q;
            //发送jsonp请求 获取数据
            MyService.jsonp(url,{start:start,count:count},function(data){
                //data返回的数据  Object {count: 5, start: 0, total: 42, subjects: Array[5], title: "搜索 "张艺谋?start=0" 的结果"}
                $scope.data=data;
                $scope.loading=false;
                totalPage=Math.ceil($scope.data.total/count); //总页数
                $scope.total=$scope.data.total; //总条数 
                $scope.totalPage=totalPage;
                //通知angular去执行同步  数据模型发生了改变
                $scope.$apply();
            })
           }
        ])

})(angular)


// (function(angular){
//     // 1.创建正在热映模块
//     var app  = angular.module('moviecat.movie_list',['ngRoute','moviecat.http-server']);

//     // 2.配置路由，在各自的模块中配置路由，最后中主模块中引用，我们自己管理自己的路由规则
//     app.config(['$routeProvider',function($routeProvider){
//       // 写具体的规则
//       // 我们需要使用路由参数来动态年 匹配页码,加上问题，匹配不写页码的情况
//       // 这里可以使用多个路由参数.
//       // 规则 ，先写先匹配
//       $routeProvider.when('/:movieType/:page?',{
//         // 指定一个模板路径,注意，模板字符串文件的路径是主模块所在目录开始计算.是相对于主模块文件所在路径计算的.
//         templateUrl:'./movie_list/view.html',
//         controller:'movie_listController'
//       })
//       .otherwise({
//         redirectTo:'/home_page'
//       })
//     }])
//     // 3.创建控制器
//     app.controller('movie_listController',[
//       '$scope',
//       '$http',
//       '$routeParams',
//       '$route',// 这个服务是用来改变url中锚点值的参数s
//       'MyService',
//       function($scope,$http,$routeParams,$route,MyService){
//         // 可以得到所有的路由参数;
//         console.log($routeParams);
//         // $routeParams.movieType
//       $scope.loading=true;
//       console.log($routeParams)
//       //这是进行分页处理
//       // count 5
//       // page 1, start 0 ->0,1,2,3,4
//       // page 2, start 5 ->5,6,7,8,9,
//       // page 3, start 10 ->10,11,12,13,14
      
//       var count = 5;// 表示每请求多少条数据
//       // 要加上括号，有优先级问题
//       var page = ($routeParams.page||'1') -0;
//       $scope.nowPage=page;
//       var start = (page-1)*count;// 这个表示从第几条数据开始请求
//       var totalPage= 0;
//       // $scope.data;
//       // 需要动态改变的是这个url,最后一部分
//       // MyService.jsonp('http://api.douban.com/v2/movie/in_theaters',
//       var url ='http://api.douban.com/v2/movie/'+$routeParams.movieType+'?q='+$routeParams.q;
//       console.log(url);
//       MyService.jsonp(url,
//         {start:start,count:count},function(data){
//            $scope.data=data;
//            console.log(data);
//            // 告诉angular,数据模型已经发生改变，需要你去同步一下，紧接着给$scope赋值的语句后面
//            $scope.test=123;
//            $scope.loading=false;
//            totalPage= Math.ceil($scope.data.total/count);
//            $scope.total=$scope.data.total;//总条数
//            $scope.totalPage=totalPage;// 总页数
//            $scope.$apply();

//         });

//       // 这里是实现点按钮分页的代码
//       $scope.goPage=function(nowPage){
//         // 这里做一些过滤，不允许请求小于等于0的页面，也不允许请求大于最大页数的页码
//          if(nowPage<=0||nowPage>totalPage){
//           return;
//          }
//         // 这个updateParams方法是用来更新url中锚点值里的参数,这个就会重新再匹配规则，不需要再在这里发jsonp请求了。
//         // var nextPage = page+1;
//         // 要求传入一个对象
//          $route.updateParams({page:nowPage})
//       }
//       // 一会用真实的数据来处理
//       // then的第一个参数，是成功的回调函数,第二个参数是失败回调函数
//       // 在发ajax请求时建议使用绝对路径,绝对路径是以/开头的路径。
//       // 绝对路径是从网站的根目录开始
//       // $http.get('/moviecat/app/in_theaters/in_theaters.json').then(function(response){
//       //   console.log(response);
//       //   // console.log(data);
//       //   // var tmp = JSON.parse(response.data);
//       //   // console.log(JSON.parse(data));
//       //   $scope.data=response.data; //
//       //   // console.log(response.data.subjects);
//       // },function(err){
        
//       // });
//       // $http.post('',{}).then(function(){
        
//       // },function(err){
        
//       // })
//       // angular 跨域请求要求我们加上JSON_CALLBACK参数
//       // jquery_1892182919// 全局作用污染
//       // 豆瓣api不支持angular这种有点的参数。
//       // $http.jsonp('http://api.douban.com/v2/movie/in_theaters?JSON_CALLBACK')
//       //   .then(function(data){ 
//       //     console.log(data);
//       //   })
      
//     }])
// })(angular); 
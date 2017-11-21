/*
* @Author: Lewisky
* @Date:   2016-07-05 19:17:27
* @Last Modified by:   Lewisky
* @Last Modified time: 2016-07-06 17:06:10
*/


(function(angular) {
    //1. 这里是自定义指令模块，用于对导航栏焦点状态切换
    var app = angular.module('moviecat.auto-active', []);
    // 2.创建自定义指令,名字必需以驼峰命名法的形式来书写。
    app.directive('autoActive', ['$location',function($location) {
        return {
            link: function(scope, element, attributes) {
                scope.loca = $location; 
                // 在这里，点a标签时会改变锚点值，所以监视之后就不需要注册点击事件了。
                scope.$watch('loca.url()',function(newValue,oldValue){
                //以#分割后然后选择  索引为1的
                   var hash = element.children()[0].href.split('#')[1];
                   console.log(element.children()[0].href);
                   // startsWith判断一个字符是否是以另一个字符开头
                   // endsWith 判断一个字符是否是以另一个字符结尾.
                   if(newValue.startsWith(hash)){
                      element.parent().children().removeClass('active');
                      element.addClass('active');
                   }
                });
            }
        }
    }])
})(angular)


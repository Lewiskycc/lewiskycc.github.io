/**
 * Created by user on 2016/07/13.
 */
$(document).ready(function () {
    //执行后去除样式
    setTimeout(function () {
        $('.slidePage1 .imgBox').removeClass('animated bounceInDown');
    },1000);
    /*initialize Swiper*/
    var swiper = new Swiper('.swiper-container', {
//            pagination: '.swiper-pagination',
        direction: 'vertical',
        slidesPerView: 1,
        paginationClickable: true,
//            spaceBetween: 30,
        mousewheelControl: true,
        onSlideChangeEnd: function(swiper){
            //滑动同步导航条li标签的样式
            $('.navbar ul.nav>li').removeClass('active').eq(swiper.activeIndex).addClass('active');
        }
    });
    /*公共样式*/
    $('.navbar ul>li').on('click', function () {
        //点击改变导航条li标签的样式
        $(this).addClass('active').siblings().removeClass('active');
        //根据索引跳转到相对应得页面
        swiper.slideTo($(this).index());
        //点击li标签后收起菜单栏
        $(this).parent().parent().removeClass('in');
        $(this).parent().parent().prop('aria-expanded',false);
    });
    //点击导航条Brand回到首页
    $('.nav-header-logo>a.navbar-brand').on('click', function () {
        if(swiper.activeIndex!=0){
            swiper.slideTo(0);
        }
    });
    // $('.spinner').hide();

    /*first page start*/

    /*first page end*/


    /*second page start*/

    /*second page end*/
})

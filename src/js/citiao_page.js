/**
 * Created by caoning on 2017/6/15.
 * 词条印象
 */

// 龙门热词
loadData({
    type: 'get',
    url: '/api/substance/keyword',
    data: {},
    interval: 0,
    callback: function (res) {
        var tpl = $("#word").html();
        var data={};
        data.list= res.result;
        $("#detail").html(soda(tpl, data))
    }
})

// 热词查询
$("#look").on('click', function () {
    var t3 = $("#pri").val();
    if ((!t3)) return false
    loadData({
        type: 'get',
        url: '/api/substance/keyword',
        data: {
            time: t3
        },
        interval: 0,
        callback: function (res) {
            if(res.code==1){
                dyw.box.alert(res.msg);
                return false
            }
            var tpl = $("#word").html();
            var data={};
            data.list= res.result;
            $("#detail").html(soda(tpl, data))
        }
    })
})

// 龙门印象
loadData({
    type: 'get',
    url: '/api/substance/impression',
    data: {},
    interval: 0,
    callback: function (res) {
        var tpl = $("#impression").html();
        var data={};
        data.list2= res.result;
        $("#detail2").html(soda(tpl, data))

        $("#detail2 .effect").windstagball({
            radius: 200,
            speed: 10
        });

    }
})

// 微信热度
$("#weixin").on('click', function () {
    var t1 = $("#tic-start").val();
    var t2 = $("#tic-end").val();
    if ((!t1) || (!t2)) return false
    loadData({
        type: 'get',
        url: '/api/substance/sogou?type=2',
        data: {
            start_time: t1,
            end_time: t2
        },
        interval: 0,
        callback: function (res) {
            if(res.code==1){
                dyw.box.alert(res.msg);
                return false
            }
            lefthotOption.series[0].data = res.result.data;
            lefthotOption.xAxis[0].data = res.result.legend;
            var lefthot = echarts.init(document.getElementById('hot'));
            lefthot.setOption(lefthotOption);
        }
    })
})

// 搜索热度
$("#search").on('click', function () {
    var t1 = $("#tic-start").val();
    var t2 = $("#tic-end").val();
    if ((!t1) || (!t2)) return false
    loadData({
        type: 'get',
        url: '/api/substance/sogou?type=1',
        data: {
            start_time: t1,
            end_time: t2
        },
        interval: 0,
        callback: function (res) {
            if(res.code==1){
                dyw.box.alert(res.msg);
                return false
            }
            lefthotOption.series[0].data = res.result.data;
            lefthotOption.xAxis[0].data = res.result.legend;
            var lefthot = echarts.init(document.getElementById('hot'));
            lefthot.setOption(lefthotOption);
        }
    })
})

// 热度
var lefthotOption = {
    animation: true,
    color: ['#fff'],
    title: {
        text: '',
        textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
        },
        left: '6%'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#57617B'
            }
        }
    },
    legend: {
        top: 20,
        icon: 'rect',
        itemWidth: 15,
        itemHeight: 5,
        itemGap: 13,
        right: '4%',
        textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [{
        show: true,
        type: 'category',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#d2d2d2'
            }
        },
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    }],
    yAxis: [{
        type: 'value',
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#d2d2d2'
            }
        },
        axisLabel: {
            margin: 10,
            textStyle: {
                fontSize: 14
            } 
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: 'none'
            }
        }
    }],
    series: [{
        name: '热度',
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: {
            normal: {
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0.1,
                    color: 'rgba(7, 123, 245, 0.3)'
                }, {
                    offset: 0.9,
                    color: 'rgba(7, 123, 245, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: 'rgb(7,123,245)'
            }
        },
        data: [96.3, 96.4, 97.5, 95.6, 98.1, 94.8, 89.6, 94.1, 80.1, 52.4, 75.8, 94.7]
    }]
};
// 使用刚指定的配置项和数据显示图表。
//lefthot.setOption(lefthotOption);
loadData({
    type: 'get',
    url: '/api/substance/sogou?type=2',
    data: {},
    interval: 0,
    callback: function (res) {
        lefthotOption.series[0].data = res.result.data;
        lefthotOption.xAxis[0].data = res.result.legend;
        var lefthot = echarts.init(document.getElementById('hot'));
        lefthot.setOption(lefthotOption);
    }
})

// 情绪
loadData({
    type: 'get',
    url: '/api/substance/commpents',
    data: {},
    interval: 0,
    callback: function (res) {
        var tpl = $("#progress").html();
        var data={};
        data.list= res.result.mood;
        $("#detail3").html(soda(tpl, data));

        var tpl2 = $("#comment").html();
        var data2={};
        data2.list2= _.chunk(res.result.data,10)
        $("#detail4").html(soda(tpl2, data2));
        if (window.swiper) {
            window.swiper.destroy()
        }

        // 评论hover效果
        $('.message .inner').hover(function() {
            $(this).find('.del').show();
        }, function() {
            $(this).find('.del').hide();
        });

        // 评论
        window.swiper = new Swiper('.swiper', {
            nextButton: '.right',
            prevButton: '.left',
            paginationClickable: true,
            spaceBetween: 0,
            centeredSlides: true,
            autoplay: 5000,
            loop: true,
            autoplayDisableOnInteraction: false
        });
    }
})

// 隐藏评论
$("body").on('click', '.inner', function () {
    $(this).addClass('z-hide');
    var num = $(this).find('.del').text();

    loadData({
        type: 'post',
        url: '/api/substance/hide-commpents',
        data: {
            id: num
        },
        interval: 0,
        callback: function (res) {
            setTimeout(function () { 
                 pull()
            }, 2000);
        }
    })
})

function pull() {
    loadData({
        type: 'get',
        url: '/api/substance/commpents',
        data: {},
        interval: 0,
        callback: function (res) {
            var tpl2 = $("#comment").html();
            var data2={};
            data2.list2= _.chunk(res.result.data,10)
            $("#detail4").html(soda(tpl2, data2));
            if (window.swiper) {
                window.swiper.destroy()
            }

            // 评论hover效果
            $('.message .inner').hover(function() {
                $(this).find('.del').show();
            }, function() {
                $(this).find('.del').hide();
            });

            // 评论
            window.swiper = new Swiper('.swiper', {
                nextButton: '.right',
                prevButton: '.left',
                paginationClickable: true,
                spaceBetween: 0,
                centeredSlides: true,
                autoplay: 5000,
                loop: true,
                autoplayDisableOnInteraction: false
            });
        }
    })
}

// 昨日热词
$("#yesterday").on('click', function () {
    loadData({
        type: 'get',
        url: '/api/substance/keyword',
        data: {
            time: laydate.now(-1)
        },
        interval: 0,
        callback: function (res) {
            if (res.code == 1) {
                dyw.box.alert(res.msg);
                return false
            }
            var tpl = $("#word").html();
            var data = {};
            data.list = res.result;
            $("#detail").html(soda(tpl, data))
        }
    })
})
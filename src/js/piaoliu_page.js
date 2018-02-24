/**
 * Created by liujinghao on 2017/6/12.
 * 幸运漂流瓶页面
 */

// 左侧数据
loadData({
    type: 'get',
    url: '/api/bottle/info',
    data: {},
    interval: 1000,
    callback: function (res) {
        var tpl = $("#tp2").html();
        $("#listdom").html(soda(tpl, res.result))
    }
})


    // 左上角图例
//var winning = echarts.init(document.getElementById('winning'));
var winningOption = {
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
        data: ['参与人次', '中奖人次'],
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
        show: false,
        type: 'category',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        data: []
    }],
    yAxis: [{
        type: 'value',
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#57617B'
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
                color: 'rgba(87,97,123,0.4)'
            }
        }
    }],
    series: [{
        name: '参与人次',
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
                    offset: 0,
                    color: 'rgba(137, 189, 27, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(137, 189, 27, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: 'rgb(137,189,27)'
            }
        },
        data: [96.3, 96.4, 97.5, 95.6, 98.1, 94.8, 89.6, 94.1, 80.1, 52.4, 75.8, 94.7]
    }, {
        name: '中奖人次',
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
                    offset: 0,
                    color: 'rgba(0, 136, 212, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(0, 136, 212, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: 'rgb(0,136,212)'
            }
        },
        data: [97.3, 99.2, 99.3, 100.0, 99.6, 90.6, 80.0, 91.5, 69.8, 67.5, 90.4, 84.9]
    }]
};
// 使用刚指定的配置项和数据显示图表。
//winning.setOption(winningOption);
loadData({
    type: 'get',
    url: '/api/bottle/trend',
    data: {},
    interval: 0,
    callback: function (res) {
        winningOption.xAxis[0].data = res.result.date;
        winningOption.series[0].data=res.result.player_num;
        winningOption.series[1].data=res.result.winner_num;
        var winning = echarts.init(document.getElementById('winning'));
        winning.setOption(winningOption);
    }
})
// 搜索
$("#search2").on('click', function () {
    var t1 = $("#tic-start").val();
    var t2 = $("#tic-end").val();
    if ((!t1) || (!t2)) return false
    loadData({
        type: 'get',
        url: '/api/bottle/trend',
        data: {
            start_time: t1,
            end_time: t2
        },
        interval: 0,
        callback: function (res) {
            if (res.code == 1) {
                dyw.box.alert(res.msg);
                return false
            }
            winningOption.xAxis[0].data = res.result.date;
            console.log(res.result.date)
            winningOption.series[0].data=res.result.player_num;
            winningOption.series[1].data=res.result.winner_num;
            var winning = echarts.init(document.getElementById('winning'));
            winning.setOption(winningOption);
        }
    })
})

// 中奖率柱状图
//var winRate = echarts.init(document.getElementById('winRate'));
var winRateOption = {
    color: ['#00c4df', '#0162b3', '#158cd0', '#d5f4f7', '#31d9da', '#3b4f72'],
    textStyle: {
        color: "#d7d7d7"
    },
    grid: {
        left: 30,
        width: '93%',
        containLabel: true
    },

    xAxis: [{
        show:true,
        axisLabel: {
            show: false
        },
        type: 'category',
        axisTick: {
            show: false
        },
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }],
    yAxis: [{
        type: 'value',
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        splitLine: {
            lineStyle: {
                color: 'none'
            }
        },
    }],
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
/*     dataZoom: [{
     show: true,
     start: 0,
     end: 22
     }], */
    series: [{
        name: '参与人次',
        type: 'bar',
        barWidth: 3,
        itemStyle: {
            normal: {
                barBorderRadius: 5
            }
        },
        data: [120, 50, 60, 50, 15, 50, 30]
    }, {
        name: '中奖人次',
        type: 'bar',
        barWidth: 3,
        itemStyle: {
            normal: {
                barBorderRadius: 5
            }
        },
        data: [120, 50, 60, 50, 15, 50, 30]
    } ]
};
// winRate.setOption(winRateOption);
loadData({
    type: 'get',
    url: '/api/bottle/day-trend',
    data: {},
    interval: 0,
    callback: function (res) {
        winRateOption.xAxis[0].data = res.result.trend.xAxis;
        winRateOption.series[0].data = res.result.trend.people;
        winRateOption.series[1].data = res.result.trend.winner;
        var winRate = echarts.init(document.getElementById('winRate'));
        winRate.setOption(winRateOption);
        optionPiaoiuping.series[0].data[0].value= res.result.ratio[0].value;
        optionPiaoiuping.series[0].data[0].label.normal.formatter= res.result.ratio[0].value+'%';
        var piaoliupingChart = echarts.init(document.getElementById('piaoliuping'));
        piaoliupingChart.setOption(optionPiaoiuping);
    }
})
function ppData(res) {
    if (res.code == 1) {
        dyw.box.alert(res.msg);
        return false
    }
    winRateOption.xAxis[0].data = res.result.trend.xAxis;
    winRateOption.series[0].data = res.result.trend.people;
    winRateOption.series[1].data = res.result.trend.winner;
    var winRate = echarts.init(document.getElementById('winRate'));
    winRate.setOption(winRateOption);
    optionPiaoiuping.series[0].data[0].value = res.result.ratio[0].value;
    optionPiaoiuping.series[0].data[0].label.normal.formatter = res.result.ratio[0].value + '%';
    var piaoliupingChart = echarts.init(document.getElementById('piaoliuping'));
    piaoliupingChart.setOption(optionPiaoiuping);
}
// 搜索
$("#search5").on('click', function () {
    var t1 = $("#pri").val();
    if(!t1) return false
    loadData({
        type: 'get',
        url: '/api/bottle/day-trend',
        data: {
            start_time: t1
        },
        interval: 0,
        callback: function (res) {
            ppData(res)
        }
    });
})


// 幸运漂流瓶 中奖概率
//var piaoliupingChart = echarts.init(document.getElementById('piaoliuping'));
var optionPiaoiuping = {
    color: ['#51ffff', '#0161b3', '#148cd1', '#d3f6f8', '#30d9d9', '#3b4f74'],
    series: [{
        name: '饼图二',
        type: 'pie',
        radius: ['65%', '80%'],
        label: {
            normal: {
                position: 'center'
            }
        },
        data: [{
            value: 10 ,
            name: '占有率',
            label: {
                normal: {
                    formatter: '{d} %',
                    textStyle: {
                        fontSize: 14
                    }
                }
            }
        }, {
            value: 100,
            name: '占位',
            label: {
                normal: {
                    formatter: '\n中奖概率',
                    textStyle: {
                        color: '#51ffff',
                        fontSize: 15
                    }
                }
            },
            tooltip: {
                show: true
            },
            itemStyle: {
                normal: {
                    color: '#192c33'
                },
                emphasis: {
                    color: '#192c33'
                }
            },
            hoverAnimation: true
        }]
    }]
};
// 使用刚指定的配置项和数据显示图表。
// piaoliupingChart.setOption(optionPiaoiuping);

// 右上角中奖播报
loadData({
    type: 'get',
    url: '/api/bottle/prize-winner',
    data: {},
    interval: 10000,
    callback: function (res) {
        var data = {};
        data.list = res.result;
        var tpl = $("#sTpl").html();
        $("#sHTML").html(soda(tpl, data))
        if (window.swiper1) {
            window.swiper1.destroy()
        }
        // 奖品区域
        window.swiper1 = new Swiper('.swiper1', {
            nextButton: '.rightbtn',
            prevButton: '.leftbtn',
            paginationClickable: true,
            spaceBetween: 0,
            centeredSlides: true,
/*            autoplay: 2000,*/
            loop: true,
            autoplayDisableOnInteraction: false
        });


    }
})


// 右下角送福播报
loadData({
    type: 'get',
    url: '/api/bottle/broadcast',
    data: {},
    interval: 24000,
    callback: function (res) {
        var data={};
        data.list= _.chunk(res.result,4)
        var tpl = $("#boTpl").html();
        $("#boHtml").html(soda(tpl, data))
        if(window.swiper2){
            window.swiper2.destroy()
        };
        // 祝福区域
        window.swiper2 = new Swiper('.swiper-container2', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            spaceBetween: 0,
            centeredSlides: true,
           autoplay: 4000,
            loop:true,
            autoplayDisableOnInteraction: false
        });
    }
})

$("#todayB").on('click',function () {
    console.log('点击今日按钮')
    loadData({
        type: 'get',
        url: '/api/bottle/day-trend',
        interval: 0,
        callback: function (res) {
            ppData(res)
        }
    });
})

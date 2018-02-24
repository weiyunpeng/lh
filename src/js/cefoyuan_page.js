/**
 * Created by caoning on 2017/6/15.
 * 测佛缘&上心香
 */

// 侧佛缘数据
loadData({
    type: 'get',
    url: '/api/buddha/info',
    data: {},
    interval: 1000,
    callback: function (res) {
        var tpl = $("#amount").html();
        $("#detail").html(soda(tpl, res.result))
    }
})

// 上心香数据
loadData({
    type: 'get',
    url: '/api/thus/info',
    data: {},
    interval: 3000,
    callback: function (res) {
        var tpl = $("#amount2").html();
        $("#detail2").html(soda(tpl, res.result))
    }
})

// 搜索
$("#search").on('click', function () {
    var t1 = $("#tic-start").val();
    var t2 = $("#tic-end").val();
    if ((!t1) || (!t2)) return false
    loadData({
        type: 'get',
        url: '/api/buddha/trend',
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
            leftPhotoChartOption.series[0].data = res.result.data;
            leftPhotoChartOption.xAxis[0].data = res.result.date;
            var leftPhotoChart = echarts.init(document.getElementById('PhotoChart'));
            leftPhotoChart.setOption(leftPhotoChartOption);
        }
    }) ;
    loadData({
        type: 'get',
        url: '/api/buddha/top-list',
        data: {
            start_time: t1,
            end_time: t2
        },
        interval: 0,
        callback: function (res) {
            winRateOption.series[0].data = res.result.data;
            winRateOption.xAxis[0].data = res.result.legend;
            var winRate = echarts.init(document.getElementById('winRate'));
            winRate.setOption(winRateOption);
        }
    })
})

// 测佛缘
var leftPhotoChartOption = {
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
        show: false,
        type: 'category',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#fff'
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
        name: '测佛缘次数',
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
//leftPhotoChart.setOption(leftPhotoChartOption);
loadData({
    type: 'get',
    url: '/api/buddha/trend',
    data: {},
    interval: 0,
    callback: function (res) {
        leftPhotoChartOption.series[0].data = res.result.data;
        leftPhotoChartOption.xAxis[0].data=res.result.date;
        var leftPhotoChart = echarts.init(document.getElementById('PhotoChart'));
        leftPhotoChart.setOption(leftPhotoChartOption);
    }
})

// 搜索2
$("#search2").on('click', function () {
    var t3 = $("#tic-start2").val();
    var t4 = $("#tic-end2").val();
    if ((!t3) || (!t4)) return false
    loadData({
        type: 'get',
        url: '/api/thus/trend',
        data: {
            start_time: t3,
            end_time: t4
        },
        interval: 0,
        callback: function (res) {
            if (res.code == 1) {
                dyw.box.alert(res.msg);
                return false
            }
            leftPhotoChartOption2.xAxis[0].data = res.result.legend;
            leftPhotoChartOption2.series[0].data = res.result.data;
            var leftPhotoChart2 = echarts.init(document.getElementById('PhotoChart2'));
            leftPhotoChart2.setOption(leftPhotoChartOption2);
        }
    });
    loadData({
        type: 'get',
        url: '/api/thus/ratio',
        data: {
            start_time: t3,
            end_time: t4
        },
        interval: 0,
        callback: function (res) {
            optionShangxinxiang.series[0].data = res.result.ratio;
            optionShangxinxiang.legend.data = res.result.legend;
            var shangxinxiang = echarts.init(document.getElementById('shangxinxiang'));
            shangxinxiang.setOption(optionShangxinxiang);
        }
    })
})

// 上心香
var leftPhotoChartOption2 = {
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
        show: false,
        type: 'category',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#fff'
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
        name: '上心香次数',
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
// leftPhotoChart2.setOption(leftPhotoChartOption2);
loadData({
    type: 'get',
    url: '/api/thus/trend',
    data: {},
    interval: 0,
    callback: function (res) {
        leftPhotoChartOption2.xAxis[0].data = res.result.legend;
        leftPhotoChartOption2.series[0].data = res.result.data;
        var leftPhotoChart2 = echarts.init(document.getElementById('PhotoChart2'));
        leftPhotoChart2.setOption(leftPhotoChartOption2);
    }
})

// 测佛缘人数及分布
var winRateOption = {
    color: ['#00c4df', '#0162b3', '#158cd0', '#000', '#31d9da', '#3b4f72'],
    textStyle: {
        color: "#d2d2d2"
    },
    grid: {
        left: 30,
        width: '93%',
        containLabel: true
    },

    xAxis: [{
        type: 'category',
        axisTick: {
            show: false
        },
        axisLabel:{
            formatter: function (val) {
                return val.split("").join("\n");
            }
        } ,
        data: ['宾阳南洞阿弥陀佛', '宾阳中洞普贤菩萨', '宾阳中洞燃灯佛', '宾阳中洞释迦摩尼', '宾阳中洞文殊菩萨', '奉先寺多闻天王', '奉先寺卢舍那大佛', '万佛洞观世音菩萨', '看经寺罗汉像', '宾阳中洞弥勒佛', '奉先寺阿弥陀佛', '奉先寺阿难', '奉先寺普贤菩萨', '奉先寺文殊菩萨', '古阳洞释迦摩尼佛', '惠简洞弥勒佛', '看经寺迦叶', '万佛洞阿弥陀佛']
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
    /* 配置数据缩放起始大小，需要根据数量动态设置
     dataZoom: [
     {
     show: true,
     start: 0,
     end: 22
     }
     ],*/
    series: [{
        name: '测佛缘次数',
        type: 'bar',
        barWidth: 20,
        itemStyle: {
            normal: {
                barBorderRadius: 0
            }
        },
        data: [700000, 600000, 500000, 450000, 300000, 600000, 400000, 250000, 600000, 500000, 450000, 700000, 200000, 400000, 250000, 600000, 500000, 450000]
    } ]
};

// 使用刚指定的配置项和数据显示图表。
// winRate.setOption(winRateOption);
loadData({
    type: 'get',
    url: '/api/buddha/top-list',
    data: {},
    interval: 0,
    callback: function (res) {
        winRateOption.series[0].data = res.result.data;
        winRateOption.xAxis[0].data = res.result.legend;
        var winRate = echarts.init(document.getElementById('winRate'));
        winRate.setOption(winRateOption);
    }
})

// 上心香祈福占比
// var shangxinxiang = echarts.init(document.getElementById('shangxinxiang'));
var optionShangxinxiang = {
    color: ['#0542a7', '#0161b3', '#148cd1', '#d3f6f8', '#30d9d9', '#3b4f74'],
    tooltip: {
        trigger: 'item',
        formatter: function (params, ticket, callback) {
            var res = params.seriesName;
            res += '<br/>' + params.name + ' : ' + params.value + '次 (' + params.percent + '%)';
            return res;
        }
    },
    legend: {
        orient: 'vertical',
        right: '5%',
        top: '25%',
        itemWidth: 15,
        itemHeight: 10,
        textStyle: {
            color: '#d2d2d2'
        },
        data: ['佛语禅心', '送父母', '新年祝福', '送朋友', '喜乐祥和', '送子女']
    },
    series: [
        {
            "center": [
                "30.0%",
                "55%"
            ],
            name: '上心香祈福',
            type: 'pie',
            radius: ['50%', '70%'],
            left: 6,
            top: 30,
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '12',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [
                {value: 335, name: '佛语禅心'},
                {value: 310, name: '送父母'},
                {value: 234, name: '新年祝福'},
                {value: 335, name: '送朋友'},
                {value: 505, name: '喜乐祥和'},
                {value: 1548, name: '送子女'}
            ]
        }
    ]
};
// 使用刚指定的配置项和数据显示图表。
// shangxinxiang.setOption(optionShangxinxiang);

loadData({
    type: 'get',
    url: '/api/thus/ratio',
    data: {},
    interval: 0,
    callback: function (res) {
        optionShangxinxiang.series[0].data = res.result.ratio;
        optionShangxinxiang.legend.data = res.result.legend;
        var shangxinxiang = echarts.init(document.getElementById('shangxinxiang'));
        shangxinxiang.setOption(optionShangxinxiang);
    }
})

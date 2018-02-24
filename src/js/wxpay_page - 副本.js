/**
 * Created by liujinghao on 2017/6/8.
 *
 */

// 左侧数据
loadData({
    type: 'get',
    url: '/api/pay-ticket/info',
    data: {},
    interval: 1000,
    callback: function (res) {
        var tpl = $("#tp1").html();
        $("#listdom").html(soda(tpl, res.result))
    }
})

// 左上角图例
//var leftPayChart = echarts.init(document.getElementById('leftPayChart'));
var leftPayOption = {
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
        top:20,
        icon:'rect',
        itemWidth: 15,
        itemHeight: 5,
        itemGap: 13,
        data: ['支付金额', '订单数'],
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
        show:false,
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
            show:true,
            lineStyle: {
                color: 'rgba(87,97,123,0.4)'
            }
        }
    }],
    series: [{
        name: '支付金额',
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: {
            normal: {
                width:2
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
        name: '订单数',
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
    } ]
};
// 使用刚指定的配置项和数据显示图表。
//leftPayChart.setOption(leftPayOption);

loadData({
    type: 'get',
    url: '/api/pay-ticket/ticket-trend',
    data: {},
    interval: 0,
    callback: function (res) {
        ticData(res)
    }
})
function  ticData(res) {
    if (res.code == 1) {
        dyw.box.alert(res.msg);
        return false
    }
    leftPayOption.xAxis[0].data = res.result.legend;
    leftPayOption.series[0].data = res.result.fee_data;
    leftPayOption.series[1].data = res.result.order_data;
    var leftPayChart = echarts.init(document.getElementById('leftPayChart'));
    leftPayChart.setOption(leftPayOption);
}
// 搜索
$("#search2").on('click', function () {
    var t1 = $("#tic-start").val();
    var t2 = $("#tic-end").val();
    if ((!t1) || (!t2)) return false
    loadData({
        type: 'get',
        url: '/api/pay-ticket/ticket-trend',
        data: {
            start_time: t1,
            end_time: t2
        },
        interval: 0,
        callback: function (res) {
            ticData(res);
        }
    });
    loadData({
        type: 'get',
        url: '/api/pay-ticket/all-half-ticket',
        data: {
            start_time: t1,
            end_time: t2
        },
        interval: 0,
        callback: function (res) {
            halfData(res)
        }
    }) ;
    loadData({
        type: 'get',
        url: '/api/pay-ticket/together-ratio',
        data: {
            start_time: t1,
            end_time: t2
        },
        interval: 0,
        callback: function (res) {
            tic2Option.series[0].data = res.result.data;
            var ticket2 = echarts.init(document.getElementById('tic2'));
            ticket2.setOption(tic2Option);
        }
    })
})


// 全价票与半价票
//var ticket1 = echarts.init(document.getElementById('tic1'));
var tic1Option= {
    color: ['#0140b3', '#00cae2', '#2850e5', '#339ff2', '#339ff2'],
    title: {
        text: '',
        subtext: '',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        right: '8%',
        top: '40%',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
            color: '#d2d2d2'
        },
        data: []
    },
    series: [
        {
            name: '全价票与半价票',
            type: 'pie',
            radius: '65%',
            center: ['40%', '50%'],
            label: {
                normal: {
                    show: false
                }
            },
            data: [
                {value: 335, name: '全价票'},
                {value: 235, name: '半价票'},
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
//ticket1.setOption(tic1Option);
loadData({
    type: 'get',
    url: '/api/pay-ticket/all-half-ticket',
    data: {},
    interval: 0,
    callback: function (res) {
        halfData(res)
    }
})
function halfData(res) {
    tic1Option.series[0].data = res.result;
    tic1Option.legend.data =['半价','全价'];
    var ticket1 = echarts.init(document.getElementById('tic1'));
    ticket1.setOption(tic1Option);
}



// 同行人数比例分布
// var ticket2 = echarts.init(document.getElementById('tic2'));
var tic2Option = {
    color: ['#339ff2', '#195cca', '#0140b3', '#2850e5', '#28d1e5'],
    title: {
        text: '',
        subtext: '',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
        {
            name: '同行人数比例分布',
            type: 'pie',
            radius: '65%',
            center: ['30%', '50%'],
            data: [
                {value: 335, name: '单人'},
                {value: 235, name: '双人'},
                {value: 135, name: '三人'},
                {value: 35, name: '四人'},
                {value: 30, name: '团体'}
            ],
            label: {
            normal: {
                show: false
            }
        },
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
// ticket2.setOption(tic2Option);
loadData({
    type: 'get',
    url: '/api/pay-ticket/together-ratio',
    data: {},
    interval: 0,
    callback: function (res) {
        tic2Option.series[0].data = res.result.data;
        var ticket2 = echarts.init(document.getElementById('tic2'));
        ticket2.setOption(tic2Option);
    }
})
// 右上角的微信支付
//var wxpay = echarts.init(document.getElementById('wxpay'));
var wxpayOption = {
    color: ['#0442a7', '#51ffff', '#158cd0', '#d5f4f7', '#31d9da','#3b4f72','#00CC66'],
    textStyle: {
        color: "#d7d7d7"
    },
    grid: {
        left:30,
        width: '93%',
        containLabel: true
    },
    legend: {
        top:10,
        right: 10,
        itemWidth: 15,
        textStyle: {
            color: "#d7d7d7",
        },
        data: ['预期人数', '实到人数']
    },
    xAxis: [{
        type: 'category',
        axisTick: {
            show: false
        },
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
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
                color: "#333333"
            }
        },
    }],
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
   dataZoom: [
        {
            type: 'slider', zoomOnMouseWheel: true,
            show: true,
 
        } 
    ],
    series: [{
        name: '预期人数',
        type: 'bar',
        barWidth: 5,
        itemStyle: {
            normal: {
                barBorderRadius: 5
            }
        },
        data: [120, 50, 60, 50, 15, 50, 30]
    }, {
        name: '实到人数',
        type: 'bar',
        barWidth: 5,
        itemStyle: {
            normal: {
                barBorderRadius: 5
            }
        },
        data: [66, 35, 58, 54, 45, 82, 92]
    }, {
        name: '实到人数',
        type: 'bar',
        barWidth: 5,
        itemStyle: {
            normal: {
                barBorderRadius: 5
            }
        },
        data: [66, 35, 58, 54, 45, 82, 92]
    }, {
        name: '实到人数',
        type: 'bar',
        barWidth: 5,
        itemStyle: {
            normal: {
                barBorderRadius: 5
            }
        },
        data: [66, 35, 58, 54, 45, 82, 92]
    }, {
        name: '实到人数',
        type: 'bar',
        barWidth: 5,
        itemStyle: {
            normal: {
                barBorderRadius: 5
            }
        },
        data: [66, 35, 58, 54, 45, 82, 92]
    },{
        name: '实到人数',
        type: 'bar',
        barWidth: 5,
        itemStyle: {
            normal: {
                barBorderRadius: 5
            }
        },
        data: [66, 35, 58, 54, 45, 82, 92]
    },{
        name: '实到人数',
        type: 'bar',
        barWidth: 5,
        itemStyle: {
            normal: {
                barBorderRadius: 5
            }
        },
        data: [66, 35, 58, 54, 45, 82, 92]
    }]
};
//wxpay.setOption(wxpayOption);
loadData({
    type: 'get',
    url: '/api/pay-ticket/other-fee-trend',
    data: {},
    interval: 0,
    callback: function (res) {
        wxpayOption.xAxis[0].data = res.result.xAxis;
        wxpayOption.legend.data= res.result.legend;
        for(var i=0;i<=6;i++){
            wxpayOption.series[i].name = res.result.series[i].name;
            wxpayOption.series[i].data = res.result.series[i].data;
        }
//        console.log('数据缩放区总长度：'+ res.result.series[0].data.length);
        if(res.result.series[0].data.length>7){
            wxpayOption.dataZoom[0].show=true;
            wxpayOption.dataZoom[0].start = 0;
            wxpayOption.dataZoom[0].end = 35;
        }else{
            wxpayOption.dataZoom[0].show = false;
        }
        var wxpay = echarts.init(document.getElementById('wxpay'));
        wxpay.setOption(wxpayOption);
    }
});

// 搜索
$("#search7").on('click', function () {
    var t1 = $("#pay-start2").val();
    var t2 = $("#pay-end2").val();
    if ((!t1) || (!t2)) return false
    loadData({
        type: 'get',
        url: '/api/pay-ticket/other-fee-trend',
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
            wxpayOption.xAxis[0].data = res.result.xAxis;
            wxpayOption.legend.data = res.result.legend;
            for (var i = 0; i <= 5; i++) {
                wxpayOption.series[i].name = res.result.series[i].name;
                wxpayOption.series[i].data = res.result.series[i].data;
            }
            console.log('数据缩放区总长度：' + res.result.series[0].data.length)
            if (res.result.series[0].data.length > 7) {
                wxpayOption.dataZoom[0].show = true;
                wxpayOption.dataZoom[0].start = 0;
                wxpayOption.dataZoom[0].end= 50;
            } else {
                wxpayOption.dataZoom[0].show = false;
                wxpayOption.dataZoom[0].start = 0;
                wxpayOption.dataZoom[0].end= 100;
            }
            var wxpay = echarts.init(document.getElementById('wxpay'));
            wxpay.setOption(wxpayOption);
        }
    }) ;
    loadData({
        type: 'get',
        url: '/api/pay-ticket/other-fee-ratio',
        data: {
            start_time: t1,
            end_time: t2
        },
        interval: 0,
        callback: function (res) {
            payperOption.series[0].data = res.result.data;
            var payper = echarts.init(document.getElementById('payper'));
            payper.setOption(payperOption);
        }
    })
})

// 支付金额占比         #28d1e5、#339ff2、#0162b3、#0140b3、#2850e5、#3b4f74
//   var payper = echarts.init(document.getElementById('payper'));
var payperOption = {
    color: ['#28d1e5', '#339ff2', '#0162b3', '#0140b3', '#2850e5','#3b4f74'],
    title: {
        text: '',
        subtext: '',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        right: '0%',
        top: '12%',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
            color: '#d2d2d2'
        },
        data: []
    },
    series: [
        {
            name: '支付金额占比',
            type: 'pie',
            radius: '75%',
            center: ['35%', '49%'],
            label: {
                normal: {
                    show: false
                }
            },
            data: [
                {value: 335, name: '单人'},
                {value: 235, name: '双人'},
                {value: 135, name: '三人'},
                {value: 35, name: '四人'},
                {value: 30, name: '团体'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
//  payper.setOption(payperOption);

loadData({
    type: 'get',
    url: '/api/pay-ticket/other-fee-ratio',
    data: {},
    interval: 0,
    callback: function (res) {
        payperOption.series[0].data = res.result.data;
        payperOption.legend.data = res.result.legend;
        var payper = echarts.init(document.getElementById('payper'));
        payper.setOption(payperOption);
    }
})

loadData({
    type: 'get',
    url: '/api/pay-ticket/history-top',
    data: {},
    interval: 0,
    callback: function (res) {
        var top3={};
        top3.list=[];
        for(var i=0;i<3;i++){
            var obj={};
            obj.date = res.result.date[i];
            obj.data = res.result.data[i];
            top3.list.push(obj)
        }
        
        var tpl = $("#tp6").html();
        $("#top3html").html(soda(tpl, top3))
    }
})


















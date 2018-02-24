/**
 * Created by caoning on 2017/6/15.
 * 客流热度
 */

// Top5
loadData({
    type: 'get',
    url: '/api/visitor/rank',
    data: {},
    interval: 0,
    callback: function (res) {
        var tpl = $("#ranking").html();
        var data={};
        data.list= res.result.data;
        $("#detail").html(soda(tpl, data))
    }
})

// 搜索
$("#search").on('click', function () {
    var t1 = $("#tic-start").val();
    var t2 = $("#tic-end").val();
    if ((!t1) || (!t2)) return false
    loadData({
        type: 'get',
        url: '/api/visitor/passenger-flow',
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

            heatOption.series[0].data = res.result.data1;
            heatOption.series[1].data = res.result.data2;
            heatOption.xAxis[0].data = res.result.date;
            var heat = echarts.init(document.getElementById('heat'));
            heat.setOption(heatOption);
        }
    })

    loadData({
        type: 'get',
        url: '/api/visitor/rank',
        data: {
            start_time: t1,
            end_time: t2
        },
        interval: 0,
        callback: function (res) {
            var tpl = $("#ranking").html();
            var data={};
            data.list= res.result.data;
            $("#detail").html(soda(tpl, data))
        }
    })
})

// 客流热度
var heatOption = {
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['每天入园人数','微信购票人数'],
        textStyle: {
            color: '#d3d3d3'
        }
    },
    textStyle: {
        color: "#d2d2d2"
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            axisLine: {
                lineStyle: {
                    color: '#475f79'
                }
            },
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLabel : {
                formatter: '{value}'
            },
            axisLine: {
                lineStyle: {
                    color: '#475f79'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'none'
                }
            }
        }
    ],
    series : [
        {
            name:'每天入园人数',
            type:'line',
            data:[11, 11, 15, 13, 12, 13, 10],
            itemStyle: {
                normal: {
                    color: 'rgb(3,231,234)'
                }
            }
        },
        {
            name:'微信购票人数',
            type:'line',
            data:[1, -2, 2, 5, 3, 2, 0],
            itemStyle: {
                normal: {
                    color: 'rgb(0,88,254)'
                }
            }
        }
    ]
};                    

// 使用刚指定的配置项和数据显示图表。
// heat.setOption(heatOption);
loadData({
    type: 'get',
    url: '/api/visitor/passenger-flow',
    data: {},
    interval: 0,
    callback: function (res) {
        heatOption.series[0].data = res.result.data1;
        heatOption.series[1].data = res.result.data2;
        heatOption.xAxis[0].data = res.result.date;
        var heat = echarts.init(document.getElementById('heat'));
        heat.setOption(heatOption);
    }
})

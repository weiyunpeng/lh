/**
 * Created by caoning on 2017/6/15.
 * 流量趋势
 */

// 人员流量特征
loadData({
    type: 'get',
    url: '/api/visitor/feature',
    data: {},
    interval: 0,
    callback: function(res) {
        var tpl = $("#feature").html();
        var data = {};
        data.list = res.result;
        $("#detail").html(soda(tpl, data))
    }
})

// 搜索
$("#search").on('click', function() {
    var t1 = $("#tic-start").val();
    var t2 = $("#tic-end").val();
    var particle = $("#particle").val();
    // if ((!t1) || (!t2)) return false;
    if (!particle) {
        particle = 10 // 默认时间粒度  单位：分钟
    }
    getData(t1, t2, particle);
})

// 流量趋势
var compareOption = {
    color: ['#42ca83', '#00e8e7', '#fdec1e', '#804aff', '#df6512', '#1296ce', '#970af7', '#b03537', '#cfc2af', '#015aff'],
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        textStyle: {
            color: '#d3d3d3'
        }
    },
    textStyle: {
        color: "#d2d2d2"
    },
    calculable: true,
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#475f79'
            }
        },
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
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
    }],
    series: [{
            name: '当前时间人员流量',
            type: 'line',
            data: [11, 11, 15, 13, 12, 13, 10]
        },
        {
            name: '对比时间人员流量',
            type: 'line',
            data: [1, -2, 2, 5, 3, 2, 0]
        },
        {
            name: '对比时间人员流量',
            type: 'line',
            lineStyle: {
                normal: {
                    type: 'dotted'
                }
            },
            data: [1, -2, 2, 5, 3, 2, 0]
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
// compare.setOption(compareOption);

function getData(start_time, end_time, interval) {
    interval = interval ? interval : 10;
    if (start_time && end_time) {
        data = {
            start_time: start_time,
            end_time: end_time,
            interval: interval ? interval : 10
        };
    } else {
        data = {
            interval: interval ? interval : 10
        };
    }
    loadData({
        type: 'get',
        url: '/api/visitor/flow',
        data: data,
        interval: 0,
        callback: function(res) {
            if (res.code == 1) {
                dyw.box.alert(res.msg);
                return false
            }

            var Item = function() {
                return {
                    name: '',
                    type: 'line',
                    data: []
                }
            };

            var Series = [];
            var json = res.result.data;

            for (var i = 0; i < json.length; i++) {
                var it = new Item();
                it.name = json[i].name; // 先将每一项填充数据
                it.data = json[i].data;
                Series.push(it); // 将item放在series中
            }

            if (res.result.data2) {
                var Item2 = function() {
                    return {
                        name: '',
                        type: 'line',
                        lineStyle: { normal: { type: 'dotted' } },
                        data: []
                    }
                };
                var json2 = res.result.data2;
                for (var i = 0; i < json2.length; i++) {
                    var it2 = new Item2();
                    it2.name = json2[i].name;
                    it2.data = json2[i].data;
                    Series.push(it2);
                }
            }

            compareOption.series = Series; // 设置图表
            compareOption.xAxis[0].data = res.result.xAxis;
            var compare = echarts.init(document.getElementById('compare'));
            compare.setOption(compareOption);
        }
    })

}
getData();


// 12.7 新增的流量预警

var optionYujing = {
    animation: false,
    color: ['#0542a7', '#0161b3', '#148cd1', '#d3f6f8', '#30d9d9', '#3b4f74'],
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
            value: 0,
            name: '占有率',
            label: {
                normal: {
                    formatter: '{d} %',
                    textStyle: {
                        color: '#51ffff',
                        fontSize: 20
                    }
                }
            }
        }, {
            value: 100,
            name: '',
            label: {
                normal: {
                    formatter: '\n舒适',
                    textStyle: {
                        color: '#51ffff',
                        fontSize: 15
                    }
                }
            },
            tooltip: {
                show: false
            },
            itemStyle: {
                normal: {
                    color: '#192c33'
                },
                emphasis: {
                    color: '#192c33'
                }
            },
            hoverAnimation: false
        }]
    }]
};
//加载新增的流量预警接口
loadData({
    type: 'get',
    url: '/api/visitor/warn',
    callback: function(res) {
        if (res.result.percent&&res.result.percent>100) {
            percent=100;
        }else{
            percent = res.result.percent;
        }
        optionYujing.series[0].data[0].value = percent;
        optionYujing.series[0].data[1].value = 100 - percent;
        optionYujing.series[0].data[0].label.normal.formatter = res.result.percent + '%';
        optionYujing.series[0].data[1].label.normal.formatter = '\n' + res.result.desc;
        // 设置颜色  舒服#0542a7   ；  拥挤：#fff601 ；  饱和：#ff0403
        optionYujing.color[0] = res.result.color;
        var yujingChart = echarts.init(document.getElementById('addyujing'));
        yujingChart.setOption(optionYujing);
    }
})

loadData();
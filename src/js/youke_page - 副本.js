/**
 * Created by caoning on 2017/6/15.
 * 游客画像
 */

// 客流来源-省内分析
// var datum1 = echarts.init(document.getElementById('datum1'));
var datum1Option = {
    color: ['#28d1e6', '#1a5cca', '#0140b2', '#49149f', '#9226b2', '#edbdd9', '#ff6f41', '#93430d', '#f2af32', '#fce700', '#d1dfd7', '#548476', '#7090b8', '#4d2942', '#e69c6c', '#226b4a'],
    title: {
        text: '',
        subtext: '',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : ({d}%)"
    },
    legend: {
        orient: 'vertical',
        right: '8%',
        top: '8%',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
            color: '#d2d2d2'
        },
        data: []
    },
    series: [
        {
            name: '客流来源',
            type: 'pie',
            radius: '65%',
            center: ['30%', '45%'],
            label: {
                normal: {
                    show: false
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [
                {value: 335, name: '洛阳'},
                {value: 235, name: '洛阳'},
                {value: 335, name: '洛阳'},
                {value: 335, name: '洛阳'},
                {value: 235, name: '洛阳'}
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
// 使用刚指定的配置项和数据显示图表。
// datum1.setOption(datum1Option);


// 客流来源-省外分析
// var datum2 = echarts.init(document.getElementById('datum2'));
var datum2Option = {
    color: ['#28d1e6', '#1a5cca', '#0140b2', '#49149f', '#9226b2', '#edbdd9', '#ff6f41', '#93430d', '#f2af32', '#fce700', '#d1dfd7', '#548476', '#7090b8', '#4d2942', '#e69c6c', '#226b4a'],
    title: {
        text: '',
        subtext: '',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : ({d}%)"
    },
    legend: {
        orient: 'vertical',
        right: '0%',
        top: '8%',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
            color: '#d2d2d2'
        },
        data: []
    },
    series: [
        {
            name: '客流来源',
            type: 'pie',
            radius: '65%',
            center: ['30%', '45%'],
            label: {
            normal: {
                show: false
            }
        },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [
                {value: 335, name: '洛阳'},
                {value: 235, name: '洛阳'},
                {value: 335, name: '洛阳'},
                {value: 335, name: '洛阳'},
                {value: 235, name: '洛阳'}
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
// 使用刚指定的配置项和数据显示图表。
// datum2.setOption(datum2Option);


// 游客年龄分析
// var datum3 = echarts.init(document.getElementById('datum3'));
var optiondatum3 = {
    color: ['#28d1e6', '#1a5cca', '#0140b2', '#49149f', '#9226b2', '#edbdd9', '#ff6f41', '#93430d', '#f2af32', '#fce700', '#d1dfd7', '#548476', '#7090b8', '#4d2942', '#e69c6c', '#226b4a'],
    tooltip: {
        trigger: 'item',
        formatter: function (params, ticket, callback) {
            var res = params.seriesName;
            res += '<br/>' + params.name + ' : ' + params.percent + '%';
            return res;
        }
    },
    legend: {
        orient: 'vertical',
        right: '0%',
        top: '38%',
        itemWidth: 10,
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
            name: '游客年龄',
            type: 'pie',
            radius: ['40%', '55%'],
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
// datum3.setOption(optiondatum3);


// 游客性别分析
// var datum4 = echarts.init(document.getElementById('datum4'));
var optiondatum4 = {
    color: ['#28d1e6', '#1a5cca', '#0140b2', '#49149f', '#9226b2', '#edbdd9', '#ff6f41', '#93430d', '#f2af32', '#fce700', '#d1dfd7', '#548476', '#7090b8', '#4d2942', '#e69c6c', '#226b4a'],
    tooltip: {
        trigger: 'item',
        formatter: function (params, ticket, callback) {
            var res = params.seriesName;
            res += '<br/>' + params.name + ' : ' + params.percent + '%';
            return res;
        }
    },
    legend: {
        orient: 'vertical',
        right: '15%',
        top: '45%',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
            color: '#d2d2d2'
        },
        data: ['佛语禅心', '送父母', '新年祝福', '送朋友', '喜乐祥和', '送子女']
    },
    series: [
        {
            "center": [
                "36.0%",
                "55%"
            ],
            name: '游客性别',
            type: 'pie',
            radius: ['40%', '55%'],
            left: 6,
            top: 36,
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
// datum4.setOption(optiondatum4);


//  左侧Top20和中国地图
var chinamap = echarts.init(document.getElementById('chinamap'));
var citydata = [
    {name: '海门', value: 9},
    {name: '鄂尔多斯', value: 50}
];
var geoCoordMap = {
    '海门': [121.15, 31.89],
    '鄂尔多斯': [109.781327, 39.608266]
};

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    console.log(res)
    return res;
};

var chinaoption = {};
function calcOption() {
    chinaoption = {
        backgroundColor: '#102867',
        tooltip: {
            trigger: 'item',
            formatter: function (params, ticket, callback) {
                var res = params.seriesName;
                res += '<br/>' + params.name + ' ';
                return res;
            }
        },

        geo: {
            map: 'china',
            left: '20%',
            right: '0%',
            label: {
                normal:{
                    show:true  ,
                    textStyle: {
                        color: "#6582b8"   // 省份的文字颜色
                    }
                },
                show: true,
                emphasis:{
                    textStyle: {
                        color: "#6582b8"   // 省份的文字hover 颜色
                    }
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#102867',  // 正常状态下的省份背景色
                    borderColor: '#1364e0'
                },
                emphasis: {
                    areaColor: '#102867' // hover上去的背景色
                }
            }
        },
        series: [
            {
                name: '游客来源城市：',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(citydata.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 20)),
                symbolSize: function (val) {
                    return function () {
                        var num = val[2] / 6;
                        if (num < 15) {
                            return 15
                        } else {
                            return val[2] / 3
                        }
                    }();
                },
                
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#00ffff', // 圆点颜色
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 100
            }
        ]
    };
}


function setDat(res) {
    citydata = [];
    geoCoordMap = {};
    res.result.forEach(function (val, index) {
        var obj = {};
        obj.name = val.name;
        obj.value = val.value;
        citydata.push(val)
        geoCoordMap[val.name] = val.coor;
        $(".c-content .tourist .list li .progress").show();
        $(".c-content .tourist .list li").eq(index).find(".bar").width(obj.value + '%');
        $(".c-content .tourist .list li").eq(index).find(".city").text(val.name);
    })
    calcOption();
    chinamap.setOption(chinaoption);   // 设置echart
}

loadData({
    type: 'get',
    url: '/api/visitor/tourist-city-top',
    data: {},
    interval: 0,
    callback: function (res) {
        setDat(res)
    }
})

$("#search2").on("click", function () {
    var value = $("#date2").val();
    if(!value) return
    loadData({
        type: 'get',
        url: '/api/visitor/tourist-city-top',
        data: {
            start_time: value
        },
        interval: 0,
        callback: function (res) {
            setDat(res)
        }
    })


    loadData({
        type: 'get',
        url: '/api/visitor/tourist-city-ratio',
        data: {
            start_time: value
        },
        interval: 0,
        callback: function (res) {
            setData(res)
        }
    })
})


function setData(res) {
    if (res.code == 1) {
        dyw.box.alert(res.msg);
        return false
    }
    datum1Option.series[0].data = res.result.shengnei.data;
    datum1Option.legend.data =_.take(res.result.shengnei.legend,6)
    var datum1 = echarts.init(document.getElementById('datum1'));
    datum1.setOption(datum1Option);

    datum2Option.series[0].data = res.result.shengwai.data;
    datum2Option.legend.data = _.take(res.result.shengwai.legend,6);
    var datum2 = echarts.init(document.getElementById('datum2'));
    datum2.setOption(datum2Option);

    optiondatum3.series[0].data = res.result.age.data;
    optiondatum3.legend.data = res.result.age.legend;
    var datum3 = echarts.init(document.getElementById('datum3'));
    datum3.setOption(optiondatum3);

    optiondatum4.series[0].data = res.result.sex.data;
    optiondatum4.legend.data = res.result.sex.legend;
    var datum4 = echarts.init(document.getElementById('datum4'));
    datum4.setOption(optiondatum4);
}

loadData({
    type: 'get',
    url: '/api/visitor/tourist-city-ratio',
    interval: 0,
    callback: function (res) {
        setData(res)
    }
})



/**
 * Created by liujinghao on 2017/6/7.
 *语音画册页面  
 */

// 左侧数据
loadData({
    type: 'get',
    url: '/api/voice-book/info',
    data: {},
    interval: 1000,
    callback: function (res) {
        var tpl = $("#leftTpl").html();
        $("#leftST").html(soda(tpl, res.result))
    }
})
var mapRoot = {}; // 地图的根对象
var yuyinMap = new BMap.Map('yuyinbMap', {minZoom: 16, maxZoom: 17, enableMapClick: false});
//  yuyinMap.addControl(new BMap.NavigationControl());   // 左上角放大缩小控制按钮
//yuyinMap.addControl(new BMap.MapTypeControl());   //添加地图类型控件
yuyinMap.centerAndZoom(new BMap.Point(112.485412, 34.561331), 15);
var tileLayer = new BMap.TileLayer({isTransparentPng: true});
tileLayer.getTilesUrl = function (tileCoord, zoom) {
    var x = tileCoord.x;
    var y = tileCoord.y;
    return '/web/tiles/' + zoom + '/tile' + x + '_' + y + '.png';  //根据当前坐标，选取合适的瓦片图
}
yuyinMap.addTileLayer(tileLayer);  // 添加手绘的瓦片图
//  yuyinMap.disableDragging();     //禁止拖拽
//yuyinMap.setMapStyle({style: 'midnight'}); // 设置地图为午夜蓝模式，接近于设计稿的配色
yuyinMap.setMapStyle({styleJson: myStyleJson}); // 设置龙门石窟高级黑样式
yuyinMap.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
yuyinMap.disableInertialDragging()


 
// 测试坐标准确性
/*var point = new BMap.Point(112.495294, 34.573634);
var marker = new BMap.Marker(point);  // 创建标注
photoMap.addOverlay(marker);               // 将标注添加到地图中
marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画*/

//  添加15个相册的基础白色地标
// 创建地标maker
mapRoot.landMarkObj = {};// 所有地标的映射
function landMarker(point, text) {
    this._point = point;
    this._text = text;
}
landMarker.prototype = new BMap.Overlay();
landMarker.prototype.initialize = function (map) {
    this._map = map;
    var div = this._div = document.createElement("div");
    div.classList.add('land')
    div.style.position = "absolute";
    div.innerHTML = this._text
    yuyinMap.getPanes().labelPane.appendChild(div);
    return div;
}
landMarker.prototype.draw = function () {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x + "px";
    this._div.style.top = pixel.y + "px";
}
// 批量添加基础 地标
mapRoot.landAdd = function (c1, c2, name) {
    markCoor.yuyin15.forEach(function (val, index) {
        mapRoot.landMarkObj[val.id] = new landMarker(new BMap.Point(val.coor.split(',')[0], val.coor.split(',')[1]), val.name);
        yuyinMap.addOverlay(mapRoot.landMarkObj[val.id]);
    })
}


// 彩色会闪动的marker
mapRoot.coMarkObj = {};// 所有彩色点的映射
function coMarker(point, bg, name) {
    this._point = point;
    this._bg = bg;
    this._name = name;
}
coMarker.prototype = new BMap.Overlay();
coMarker.prototype.initialize = function (map) {
    this._map = map;
    var div = this._div = document.createElement("div");
    div.classList.add('comark');
    div.setAttribute('names', this._name);
    div.style.position = "absolute";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    var em = document.createElement('em');
    em.style.backgroundColor = this._bg;
    div.appendChild(em);
    var span = document.createElement('span');
    span.style.backgroundColor = this._bg;
    div.appendChild(span);
    yuyinMap.getPanes().labelPane.appendChild(div);
    // console.log(div)
    return div;
}
coMarker.prototype.draw = function () {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x + "px";
    this._div.style.top = pixel.y + "px";
}


// 批量添加65个语音画册点位  ,相册的点位每个背景色是一样的
mapRoot.yuyinAdd = function () {
    markCoor.yuyin.forEach(function (val, index) {
        mapRoot.coMarkObj[val.id] = new coMarker(new BMap.Point(val.coor.split(',')[0], val.coor.split(',')[1]), '#df6513', val.name);
        yuyinMap.addOverlay(mapRoot.coMarkObj[val.id]);
        // 隐藏点位示例：mapRoot.coMarkObj[val.id].hide()
    })
}


$(function () {
    // 批量添加15个语音画册基础点位
    mapRoot.landAdd();
    // 添加65个语音画册点位
    mapRoot.yuyinAdd()
    // 获取所有语音点位的闪烁状态
    loadData({
        type: 'get',
        url: '/api/message/get-voice-point',
        data: {},
        interval: 4000,
        callback: function (res) {
            res.result.forEach(function (val, key) {
                if (val.show) {
                    mapRoot.coMarkObj[val.id].show()
                } else {
                    mapRoot.coMarkObj[val.id].hide()
                }

            })
        }
    })
})

// 左下角的听取次数统计
//var leftListenChart = echarts.init(document.getElementById('leftListen'));
var leftListenOption = {
    color: ['#51ffff', '#00cae2', '#2850e5', '#339ff2', '#339ff2'],
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
        data: [],
        right: '10%',
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
        name: '支付金额',
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
        data: [97.3, 99.2, 99.3, 100.0, 99.6, 90.6, 80.0, 91.5, 69.8, 67.5, 90.4, 84.9]
    }, {
        name: '支付金额',
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
        data: [96.3, 96.4, 97.5, 95.6, 98.1, 94.8, 89.6, 94.1, 80.1, 52.4, 75.8, 94.7]
    }, {
        name: '支付金额',
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
        data: [96.3, 96.4, 97.5, 95.6, 98.1, 94.8, 89.6, 94.1, 80.1, 52.4, 75.8, 94.7]
    }]
};
// 使用刚指定的配置项和数据显示图表。
// leftListenChart.setOption(leftListenOption);


// 右下角 听取比例
// var listenType = echarts.init(document.getElementById('listenType'));
var listenTypeOption = {
    color: ['#28d1e5', '#339ff2', '#0162b3', '#0140b3', '#2850e5', '#3b4f74'],
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
        top: '30%',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
            color: '#d2d2d2'
        },
        data: []
    },
    series: [
        {
            name: '听取比例',
            type: 'pie',
            radius: '65%',
            center: ['40%', '50%'],
            label: {
                normal: {
                    show: false
                }
            },
            data: [
                {value: 335, name: '西山石窟'},
                {value: 235, name: '白园'},
                {value: 335, name: '东山石窟'},
                {value: 235, name: '香山寺'}
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
// listenType.setOption(listenTypeOption);

function  setLE(res) {
    if (res.code == 1) {
        dyw.box.alert(res.msg);
        return false
    }
    //左侧折线图
    leftListenOption.legend.data = res.result.trend.legent;
    leftListenOption.xAxis[0].data = res.result.trend.yAxis;
    for (var i = 0; i < 4; i++) {
        leftListenOption.series[i].name = res.result.trend.series[i].name;
        leftListenOption.series[i].data = res.result.trend.series[i].data;
    }
    var leftListenChart = echarts.init(document.getElementById('leftListen'));
    leftListenChart.setOption(leftListenOption);
    // 右边听取比例
    listenTypeOption.series[0].data = res.result.ratio.data;
    listenTypeOption.legend.data = res.result.ratio.legend;
    var listenType = echarts.init(document.getElementById('listenType'));
    listenType.setOption(listenTypeOption);
}

loadData({
    type: 'get',
    url: '/api/voice-book/trend',
    data: {},
    interval: 0,
    callback: function (res) {
        setLE(res)
    }
})
// 搜索
$("#search2").on('click', function () {
    var t1 = $("#tic-start").val();
    var t2 = $("#tic-end").val();
    if ((!t1) || (!t2)) return false
    loadData({
        type: 'get',
        url: '/api/voice-book/trend',
        data: {
            start_time: t1,
            end_time: t2
        },
        interval: 0,
        callback: function (res) {
            setLE(res)
        }
    })
})


// 右侧top20
/*loadData({
    type: 'get',
    url: '/api/voice-book/top',
    data: {},
    interval: 93000,
    callback: function (res) {
        var tpl = $("#top20tpl").html();
        var data={};
        data.list= res.result;
        $("#top20html").html(soda(tpl, data))
    }
})*/









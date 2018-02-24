/**
 * Created by liujinghao on 2017/6/6.
 *龙门相册页面
 */
// 左侧数据
loadData({
    type: 'get',
    url: '/api/album/info',
    data: {},
    interval: 1000,
    callback: function (res) {
        var tpl=$("#leftPhotoTpl").html();
        $("#leftPhotoHtml").html(soda(tpl, res.result))
    }
})

// 左上角图例
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
        data: ['照片数量', '相册数量'],
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
        name: '照片数量',
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
                    color: 'rgba(137, 189, 27, 0.3)'
                }, {
                    offset: 0.9,
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
        name: '相册数量',
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
                    color: 'rgba(0, 136, 212, 0.3)'
                }, {
                    offset: 0.9,
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
//leftPhotoChart.setOption(leftPhotoChartOption);
loadData({
    type: 'get',
    url: '/api/album/trend',
    data: {},
    interval: 0,
    callback: function (res) {
        leftPhotoChartOption.series[0].data = res.result.data1;
        leftPhotoChartOption.series[0].name = '照片数量';
        leftPhotoChartOption.series[1].data = res.result.data2;
        leftPhotoChartOption.series[1].name = '相册数量';
        leftPhotoChartOption.xAxis[0].data=res.result.date;
        var leftPhotoChart = echarts.init(document.getElementById('leftPhotoChart'));
        leftPhotoChart.setOption(leftPhotoChartOption);
    }
})
function  leftData(res) {
    if (res.code == 1) {
        dyw.box.alert(res.msg);
        return false
    }
    leftPhotoChartOption.series[0].data = res.result.data1;
    leftPhotoChartOption.series[0].name = '照片数量';
    leftPhotoChartOption.series[1].data = res.result.data2;
    leftPhotoChartOption.series[1].name = '相册数量';
    leftPhotoChartOption.xAxis[0].data = res.result.date;
    var leftPhotoChart = echarts.init(document.getElementById('leftPhotoChart'));
    leftPhotoChart.setOption(leftPhotoChartOption);
}
// 搜索
$("#search2").on('click',function () {
    var t1 = $("#tic-start").val();
    var t2 = $("#tic-end").val();
    if((!t1)||(!t2)) return false
    loadData({
        type: 'get',
        url: '/api/album/trend',
        data: {
            start_time:t1,
            end_time:t2
        },
        interval: 0,
        callback: function (res) {
            leftData(res)
        }
    }) ;
    loadData({
        type: 'get',
        url: '/api/album/style-photo',
        data: {
            start_time: t1,
            end_time: t2
        },
        interval: 0,
        callback: function (res) {
            photoDate(res)
        }
    })
})


// 制作不同相册风格比例
//var stylePer = echarts.init(document.getElementById('stylePer'));
var stylePerOption = {
    color: ['#51ffff', '#00cae2', '#2850e5', '#339ff2', '#339ff2'],
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
        orient: 'horizontal',
        left: '10%',
        top: '3%',
        itemWidth: 15,
        itemHeight: 10,
        textStyle: {
            color: '#d2d2d2'
        },
        data: ['旅行', '青春', '怀旧', '风格']
    },
    series: [
        {
            name: '制作不同相册风格比例',
            type: 'pie',
            radius: '65%',
            center: ['50%', '55%'],
            data: [
                {value: 335, name: '旅行'},
                {value: 235, name: '青春'},
                {value: 335, name: '怀旧'},
                {value: 235, name: '风格'}
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
//stylePer.setOption(stylePerOption);

// 点位照片拥有数量
var pnumOption = {
    color: ['#00cae2'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        top: '8%',
        borderWidth: 0,
        containLabel: true
    },
    xAxis: {
        type: 'value',
        show:false,
        splitLine: {
            show: false
        },
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        axisLabel: {
            textStyle: {
                color: '#d2d2d2'
            }
        },
        data: [ '世界文化遗产石', '点位8', '点位7', '点位6', '点位5', '点位4', '点位3', '点位2', '点位1',]
    },
    series: [
        {
            name: '拥有照片',
            type: 'bar',
            barWidth: 5,
            itemStyle: {
                normal: {
                    barBorderRadius: 4
                }
            },
            data: [18203, 23489, 29034, 18203, 23489, 29034, 18203, 23489, 29034]
        }
    ],
    textStyle: {
        color: '#416685'
    }
};

function photoDate(res) {
    if (res.code == 1) {
        dyw.box.alert(res.msg);
        return false
    }
    stylePerOption.legend.data = _.values(res.result.ratio.legend);
    stylePerOption.series[0].data = res.result.ratio.data;
    pnumOption.yAxis.data = res.result.trend.legend;
    pnumOption.series[0].data = res.result.trend.data;
    var stylePer = echarts.init(document.getElementById('stylePer'));
    stylePer.setOption(stylePerOption);
    var pnum = echarts.init(document.getElementById('pnum'));
    pnum.setOption(pnumOption);
}

loadData({
    type: 'get',
    url: '/api/album/style-photo',
    data: {},
    interval: 0,
    callback: function (res) {
        photoDate(res)
    }
})



// 右侧地图
var mapRoot = {}; // 地图的根对象
var photoMap = new BMap.Map('photoMap', {minZoom: 16, maxZoom: 17, enableMapClick: false});
//  photoMap.addControl(new BMap.NavigationControl());   // 左上角放大缩小控制按钮
//photoMap.addControl(new BMap.MapTypeControl());   //添加地图类型控件
photoMap.centerAndZoom(new BMap.Point(112.485412, 34.564331), 16);
var tileLayer = new BMap.TileLayer({isTransparentPng: true});
tileLayer.getTilesUrl = function (tileCoord, zoom) {
    var x = tileCoord.x;
    var y = tileCoord.y;
    return '/web/tiles/' + zoom + '/tile' + x + '_' + y + '.png';  //根据当前坐标，选取合适的瓦片图
}
photoMap.addTileLayer(tileLayer);  // 添加手绘的瓦片图
//  photoMap.disableDragging();     //禁止拖拽
//photoMap.setMapStyle({style: 'midnight'}); // 设置地图为午夜蓝模式，接近于设计稿的配色
photoMap.setMapStyle({styleJson: myStyleJson}); // 设置龙门石窟高级黑样式
photoMap.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
photoMap.disableInertialDragging() ;




// 测试坐标准确性
/*var point = new BMap.Point(112.495294, 34.573634);
var marker = new BMap.Marker(point);  // 创建标注
photoMap.addOverlay(marker);               // 将标注添加到地图中
marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画*/
 
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
    photoMap.getPanes().labelPane.appendChild(div);
    // console.log(div)
    return div;
}
coMarker.prototype.draw = function () {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x + "px";
    this._div.style.top = pixel.y + "px";
}
 
// 批量添加彩色龙门相册点位  ,相册的点位每个背景色是一样的
mapRoot.xiangceAdd = function () {
    markCoor.photo.forEach(function (val, index) {
        mapRoot.coMarkObj[val.id] = new coMarker(new BMap.Point(val.coor.split(',')[0], val.coor.split(',')[1]), '#147ad0', val.name);
        photoMap.addOverlay(mapRoot.coMarkObj[val.id]);
        mapRoot.coMarkObj[val.id].hide();
    })
}

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
    photoMap.getPanes().labelPane.appendChild(div);
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
    markCoor.photo.forEach(function (val, index) {
        mapRoot.landMarkObj[val.id] = new landMarker(new BMap.Point(val.coor.split(',')[0], val.coor.split(',')[1]), val.name);
        photoMap.addOverlay(mapRoot.landMarkObj[val.id]);
    })
}

$(function () {
 
    // 添加彩色的龙门相册点位
    mapRoot.xiangceAdd();
    // 添加基础坐标
    mapRoot.landAdd();
    // 获取所有点位的闪烁状态
    loadData({
        type: 'get',
        url: '/api/message/get-album-point',
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


//------------------------------------------------------------------------------------------------------------------------
// 左下角相册点位的气泡动态          10s请求一次接口， 每次返回最近的10个动态
var bubble=function () {
      var that=this;
      this.$list=$("#bubbleList");
      this.loadTime=10000;// 请求接口时间频率
      this.inteval = 1000;// 创建dom频率
      this.init=function () {
          // 轮询请求接口
          loadData({
              type: 'get',
              url: '/api/message/get-album-message',
              data: {},
              interval: that.loadTime,
              callback: function (res) {
                  res.result.forEach(function (val, key) {
                      that.userList.push(val)
                  })
              }
          })
          // 动画队列
          that.updateTime=  setInterval(function () {
              that.update()
          },that.inteval)
      }
      this.userList=[];// 待动画的数组队列
}

bubble.prototype={
    create:function (data) {
        if(!data) return
        var tpl =`<div class="item {{type}}">
                             <img src="{{headimgurl}}"> <p>{{content}}</p>
                         </div>`;
        var $html=$(soda(tpl, data));
        this.$list.append($html);
        // 每次创建后都执行垃圾回收
        this.rubbishCC()
    },
    load:function () {
        var that=this;
        // 数据格式   type=photo是用户上传了照片，type=album是生成了相册
    } ,
    update:function () {
       //console.log('更新帧')
        if(!this.userList.length) return;
        var data= this.userList.shift();
        this.create(data)
    } ,
    rubbishCC:function () {
        if ($("#bubbleList .item").length > 8) {
            $("#bubbleList .item").first().remove();
        }
    }
}

var bub=new bubble();
bub.init();



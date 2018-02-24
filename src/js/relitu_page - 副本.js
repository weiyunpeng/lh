/**
 * Created by caoning on 2017/6/15.
 * 区域热力
 */

// 客流热度
var totalOption = {
    tooltip : {
        trigger: 'axis'
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
            data : ['8:00','9:00','10:00','11:00','12:00','13:00','14:00']
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
            name: '在园人数',
            type:'line',
            data:[11, 11, 15, 13, 12, 13, 10],
            itemStyle: {
                normal: {
                    color: 'rgb(3,231,234)'
                }
            }
        }
    ]
};                    

// 使用刚指定的配置项和数据显示图表。
var total = echarts.init(document.getElementById('total'));
 total.setOption(totalOption);
 
// 绘制 普通地图
var mapRoot = {}; // 地图的根对象
var handMap = new BMap.Map('handMap', {minZoom: 16, maxZoom: 17, enableMapClick: false});
//  handMap.addControl(new BMap.NavigationControl());   // 左上角放大缩小控制按钮
//handMap.addControl(new BMap.MapTypeControl());   //添加地图类型控件
handMap.centerAndZoom(new BMap.Point(112.486822, 34.566836), 15);
var tileLayer = new BMap.TileLayer({isTransparentPng: true});
tileLayer.getTilesUrl = function (tileCoord, zoom) {
    var x = tileCoord.x;
    var y = tileCoord.y;
    return '/web/tiles/' + zoom + '/tile' + x + '_' + y + '.png';  //根据当前坐标，选取合适的瓦片图
}
handMap.addTileLayer(tileLayer);  // 添加手绘的瓦片图
//  handMap.disableDragging();     //禁止拖拽
//handMap.setMapStyle({style: 'midnight'}); // 设置地图为午夜蓝模式，接近于设计稿的配色
handMap.setMapStyle({styleJson: myStyleJson}); // 设置龙门石窟高级黑样式
handMap.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
handMap.disableInertialDragging();
var points = [
    {"lng": 112.485564, "lat": 34.563595, "count": 99},
    {"lng": 112.482093, "lat": 34.556074, "count": 99},
    {"lng": 112.485276, "lat": 34.563387, "count": 80},
];
// 绘制卫星地图
var sateMAP = new BMap.Map("satellite", {mapType: BMAP_SATELLITE_MAP, minZoom: 16, maxZoom: 17, enableMapClick: false});    // 创建Map实例
sateMAP.centerAndZoom(new BMap.Point(112.486822, 34.566836), 15);  // 初始化地图,设置中心点坐标和地图级别
sateMAP.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
sateMAP.setMapStyle({style: 'midnight'}); // 设置地图为午夜蓝模式，接近于设计稿的配色


// 热力图图层
heatmapOverlay = new BMapLib.HeatmapOverlay({"radius": 20});
heatmapOverlay2 = new BMapLib.HeatmapOverlay({"radius": 20});

handMap.addOverlay(heatmapOverlay); // 手绘地图
sateMAP.addOverlay(heatmapOverlay2); // 卫星图

heatmapOverlay.setDataSet({data: points, max: 100});
heatmapOverlay2.setDataSet({data: points, max: 100});
//是否显示热力图
function openHeatmap() {
    heatmapOverlay.show();
}
function closeHeatmap() {
    heatmapOverlay.hide();
}
// 彩色会闪动的marker
mapRoot.coMarkObj = {};// 所有彩色点的映射
function top10Marker(point, bg, name) {
    this._point = point;
    this._bg = bg;
    this._name = name;
}
top10Marker.prototype = new BMap.Overlay();
top10Marker.prototype.initialize = function (map) {
    this._map = map;
    var div = this._div = document.createElement("div");
    div.classList.add('top10mark');
    div.setAttribute('names', this._name);
    div.innerHTML='<i>'+this._name+'</i>'
    div.style.position = "absolute";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    var em = document.createElement('em');
    em.style.backgroundColor = this._bg;
    div.appendChild(em);
    var span = document.createElement('span');
    span.style.backgroundColor = this._bg;
    div.appendChild(span);
    handMap.getPanes().labelPane.appendChild(div);
    // console.log(div)
    return div;
}
top10Marker.prototype.draw = function () {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x + "px";
    this._div.style.top = pixel.y + "px";
}


//  批量添加 top10热力点位
var top10Coor=[]; // 10个点位的坐标数据
mapRoot.top10Add = function () {
    markCoor.h5.forEach(function (val, index) {
        mapRoot.coMarkObj[val.id] = new top10Marker(new BMap.Point(val.coor.split(',')[0], val.coor.split(',')[1]), '#df6513', val.name);
        handMap.addOverlay(mapRoot.coMarkObj[val.id]);
        // 隐藏点位示例：mapRoot.coMarkObj[val.id].hide()
    })
}
mapRoot.removeAll=function () {  // 清除所有marker
    markCoor.h5.forEach(function (val, index) {
        handMap.removeOverlay(mapRoot.coMarkObj[val.id]);
        mapRoot.coMarkObj={};
    })
}

setTimeout(mapRoot.top10Add(),1000)




Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
// (new Date()).Format("yyyy-MM-dd hh:mm:ss") ==> 2006-07-02 08:09:04.423

// 底部时间轴对象
var timeline = function () {
    // 绑定点击事件
    this.bindClick();
    this.init();
}
timeline.prototype = {
    init: function (date, rate,leng) {
        // date:日期，  rate: 时间粒度，5分钟 10 分钟
        this.date = date;
        this.rate = rate;
        this.scaleWidth = 1656; // 刻度盘总宽度
        this.minutesNum = 24 * 60;
        this.scaleLength = this.minutesNum / this.rate; // 总共划分几个刻度
        // this.spotWidth = parseInt(this.scaleWidth /this.scaleLength);
        this.spotWidth = 68 / (60 / rate);
        this.addNumTimes = 1000 * 60 * this.rate; // 每次步进的毫秒数
        this.originalStamp = new Date(date).getTime(); // 零点时候的时间戳
        this.timeList = [];
        this.timelist = this.dateSplit(date, rate);
        this.autoplay = null,
         this.playIndex = 0;
        // 渲染底部时间轴
        this.render(this.date, this.rate);
        $(".tooltip-main").hide();
    },
    dateSplit: function () {
        for (var i = 0; i < this.scaleLength; i++) {
            var tmp = this.originalStamp + this.addNumTimes * i;
            var time = new Date(tmp).Format("yyyy-MM-dd hh:mm:ss");
            this.timeList.push(time)
        }
        return {
            time: this.timeList,
            spotNum:this.scaleLength
        }
    },
    render: function (date, rate) {
        var that=this;
        var HtmlFragmeng = document.createDocumentFragment();
        this.timelist.time.forEach(function (val, index) {
            var $spot = $("<div class='spot'></div>");
            var leftPx = that.spotWidth * index;
            $spot.css('left', leftPx);
            $spot.css('width', that.spotWidth);
            $spot.attr('date', val);
            $spot.attr('index', index);
            $spot.attr('title', val);
            HtmlFragmeng.appendChild($spot[0])
        })
        $("#spotWrap").append(HtmlFragmeng)
    } ,
    bindClick:function () {
        var that=this;
        $("#spotWrap").on('click', '.spot', function (event) {
           if(event.clientX){  // 人点和机器点
               botTimeline.pause();
               $(".playBtn").show();
               $(".pauseBtn").hide();
           }
            $(".tooltip-main").show();
            that.playIndex=parseInt($(this).attr('index'));
            var time = $(this).attr('date').split(' ')[1];
            var leftPx = $(this).css('left');
            $("#spotWrap .tooltip-inner").text(time);
            $("#spotWrap .tooltip-main").css('left', leftPx);
            var hour= $(this).attr('date').split(':')[0].split(' ')[1];
            var minu= $(this).attr('date').split(':')[1].split(':')[0];
            $("#spotWrap .star").css('left', leftPx);
            if(parseInt(minu)==0){
                $("#timeline .lis li").removeClass('on');
              //  $("#timeline .lis li").eq(parseInt(hour)).addClass('on')
            }else{
                $("#timeline .lis li").removeClass('on');
            }
        }) ;
        $(".playBtn").on("click", function () {
            botTimeline.play()
            $(".playBtn").hide();
            $(".pauseBtn").show();
        })
        $(".pauseBtn").on("click", function () {
            botTimeline.pause()
            $(".playBtn").show();
            $(".pauseBtn").hide();
        })
        $("#sumPeoNum").on('click',function () {
            $('.c-content .total').toggleClass('dn')
        })
        $("#ms1").on('click', function () {
             $(this).addClass('current').siblings('li').removeClass('current') ;
              $("#handMap").css('left',0);
              $("#satellite").css('left', -2000);
        })
        $("#ms2").on('click', function () {
            $(this).addClass('current').siblings('li').removeClass('current');
            $("#handMap").css('left', -2000);
            $("#satellite").css('left', 0);
        })
        $("#peoNum").on('click',function () {
             $(".peoNum").toggleClass('dn')
        })
    },
    autoClick:function () {
        this.playIndex++;
        if (this.playIndex >= this.scaleLength) {
            this.playIndex = 0;
        }
        $("#spotWrap .spot").eq(this.playIndex).click();
    } ,
    play:function () {
         var that=this;
         this.autoplay=setInterval(function () {
            // console.log(11)
                that.autoClick('robot')
         },1000)
    },
    pause:function () {
        if(this.autoplay){
          //  console.log(000)
            clearInterval(this.autoplay)
        }
    }
}
var botTimeline = new timeline();
botTimeline.init('2017-6-21', 30)









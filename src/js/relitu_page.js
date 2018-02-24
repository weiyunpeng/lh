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
            name: '入园人数',
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
var Rtotal = echarts.init(document.getElementById('total'));

 
// 绘制 普通地图
var mapRoot = {}; // 地图的根对象
var handMap = new BMap.Map('handMap', {minZoom: 16, maxZoom: 17, enableMapClick: false});
//  handMap.addControl(new BMap.NavigationControl());   // 左上角放大缩小控制按钮
//handMap.addControl(new BMap.MapTypeControl());   //添加地图类型控件
handMap.centerAndZoom(new BMap.Point(112.485579, 34.56422), 15);
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
    {"lng": 112.485564, "lat": 134.563595, "count": 99}
];
// 绘制卫星地图
var sateMAP = new BMap.Map("satellite", {mapType: BMAP_SATELLITE_MAP, minZoom: 16, maxZoom: 17, enableMapClick: false});    // 创建Map实例
sateMAP.centerAndZoom(new BMap.Point(112.485579, 34.56422), 15);  // 初始化地图,设置中心点坐标和地图级别
sateMAP.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
sateMAP.setMapStyle({style: 'midnight'}); // 设置地图为午夜蓝模式，接近于设计稿的配色
// 创建地标maker
mapRoot.landMarkObj = {};// 所有地标的映射
function landMarker(point, text,wrap) {
    this._point = point;
    this._text = text;
    this._wrap=wrap;
}
landMarker.prototype = new BMap.Overlay();
landMarker.prototype.initialize = function (map) {
    this._map = map;
    var div = this._div = document.createElement("div");
    div.classList.add('land')
    div.style.position = "absolute";
    div.innerHTML = this._text
    this._wrap.getPanes().labelPane.appendChild(div);
    return div;
}
landMarker.prototype.draw = function () {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x + "px";
    this._div.style.top = pixel.y + "px";
}

// 批量添加基础 地标
handMap.landAdd = function (c1, c2, name) {
    markCoor.landMark.forEach(function (val, index) {
        mapRoot.landMarkObj[val.id] = new landMarker(new BMap.Point(val.coor.split(',')[0], val.coor.split(',')[1]), val.name, handMap);
        handMap.addOverlay(mapRoot.landMarkObj[val.id]);
        mapRoot.landMarkObj[val.id] = new landMarker(new BMap.Point(val.coor.split(',')[0], val.coor.split(',')[1]), val.name, sateMAP);
        sateMAP.addOverlay(mapRoot.landMarkObj[val.id]);
    })
}
$(function () {
    // 添加基本点位
    handMap.landAdd();
    // 几个比较密集的点位隐藏掉
    setTimeout(function () {
        mapRoot.landMarkObj['d9'].hide()
    }, 1000)
})

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
mapRoot.coMarkObj2 = {};// 所有彩色点的映射
function top10Marker(point, bg, name,mapid) {
    this._point = point;
    this._bg = bg;
    this._name = name;
    this._mapid=mapid;
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
    this._mapid.getPanes().labelPane.appendChild(div);
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
    top10Coor.forEach(function (val, index) {
        mapRoot.coMarkObj[val.index] = new top10Marker(new BMap.Point(val.coor.split(',')[0], val.coor.split(',')[1]), '#df6513', val.index, handMap);
      mapRoot.coMarkObj2[val.index] = new top10Marker(new BMap.Point(val.coor.split(',')[0], val.coor.split(',')[1]), '#df6513', val.index,sateMAP);
        handMap.addOverlay(mapRoot.coMarkObj[val.index]);
        sateMAP.addOverlay(mapRoot.coMarkObj2[val.index]);
    })
}
mapRoot.removeAll=function () {  // 清除所有marker
    top10Coor.forEach(function (val, index) {
        handMap.removeOverlay(mapRoot.coMarkObj[val.index]);
        sateMAP.removeOverlay(mapRoot.coMarkObj2[val.index]);
    })
    mapRoot.coMarkObj = {};
    mapRoot.coMarkObj2 = {};
}
var top10show = true;// top10点位当前是否显示
mapRoot.top10hide = function () {
    top10show=false;
    top10Coor.forEach(function (val, index) {
        mapRoot.coMarkObj[val.index].hide();
        mapRoot.coMarkObj2[val.index].hide();
    })
}
mapRoot.top10show = function () {
    top10show=true
    top10Coor.forEach(function (val, index) {
        mapRoot.coMarkObj[val.index].show();
        mapRoot.coMarkObj2[val.index].show();
    })
}
mapRoot.top10toggle=function () {
     if(top10show){
         mapRoot.top10hide()
     }else{
         mapRoot.top10show()
     }
}
// 测试添加top10点位       setTimeout(mapRoot.top10Add(),1000)




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
    this.hotdata=[];
}
timeline.prototype = {
    init: function (date, rate,leng) {
        // date:日期，  rate: 时间粒度，5分钟 10 分钟
        this.date = date;
        this.rate = rate;
        this.scaleWidth = 1656; // 刻度盘总宽度
        this.minutesNum = 24 * 60;
       // this.scaleLength = this.minutesNum / this.rate; // 总共划分几个刻度
        this.scaleLength = leng; // 总共划分几个刻度
        this.spotWidth = 68 / (60 / rate);
        this.addNumTimes = 1000 * 60 * this.rate; // 每次步进的毫秒数
        this.originalStamp = new Date(date).getTime(); // 零点时候的时间戳  ,  因日期格式原因需要减去8小时
        this.originalStamp= this.originalStamp-8*3600*1000
        this.timeList = [];
        this.timelist = this.dateSplit(date, rate);
        this.autoplay = null,
         this.playIndex = 0;
        // 渲染底部时间轴
        this.render(this.date, this.rate);
        $(".tooltip-main").hide();
    },
    dateSplit: function () {
        for (var i = 0; i <this.scaleLength; i++) {
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
        $("#spotWrap .spot").remove();
        $("#spotWrap").append(HtmlFragmeng)
    } ,
    bindClick:function () {
        var that=this;
        $("#spotWrap").on('click', '.spot', function (event) {
         //   console.log(event)
           if(event.clientX){  // 人点和机器点
               botTimeline.pause();
               $(".playBtn").show();
               $(".pauseBtn").hide();
               autoRefresh.pause();
           }
            $(".tooltip-main").show();
           if(autoRefresh.status){
               $(".tooltip-main").hide();
           }
            that.playIndex=parseInt($(this).attr('index'));
            that.spotChange(that.playIndex);// 应用当前点位的热力图数据
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
            autoRefresh.pause();
        })
        $(".pauseBtn").on("click", function () {
            botTimeline.pause()
            $(".playBtn").show();
            $(".pauseBtn").hide();
            $(".tooltip-main").hide();
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
        $("#top10Btn").on('click',function () {
             mapRoot.top10toggle();
        })
    },
    spotChange:function (index) {
        //每个时间点对应的人数，热力图，top10点位
        $(".chartSpotDate").text(botTimeline.hotdata[index].date);
        $(".chartOnlineNum").text(botTimeline.hotdata[index].online);
        $(".chartTotalNum").text(botTimeline.hotdata[index].total);
        // 绘制热力图数据
        heatmapOverlay.setDataSet({data: botTimeline.hotdata[index].hot, max: 100});
        heatmapOverlay2.setDataSet({data: botTimeline.hotdata[index].hot, max: 100});
        // top10点位
        mapRoot.removeAll();
        top10Coor =[];
        top10Coor= botTimeline.hotdata[index].top10;
        mapRoot.top10Add()
    },
    autoClick:function () {
        this.playIndex++;
        if (this.playIndex >= (this.scaleLength+1)) {
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
//botTimeline.init('2017-6-21', 30,48)

$("#hotSearch").on('click',function () {
      var time=$("#tic-start").val();
      var interval=$("#interval").val();
      getOnlineHot(time, interval) ;
      clearInterval(autoRefresh.time)
})

function getOnlineHot(time, interval) {
    var opt={};
    if(time){
        opt.time= time
    };
    if(interval){
        opt.interval = interval
    }else {
        opt.interval = 10     // 默认时间粒度  单位：分钟
    }
    loadData({
        type: 'get',
        url: '/api/visitor/heatmap',
        data: opt,
        interval: 0,
        callback: function (res) {
           // console.log(res);
            hotSearchChange(res, opt.interval)
        }
    })
}
// 默认页面打开显示今天
getOnlineHot()
function hotSearchChange(res, interval) {
    totalOption.xAxis[0].data = res.result.peopleLine.xAxis;
    totalOption.series[0].data = res.result.peopleLine.series;
    Rtotal.setOption(totalOption);
    // 分时段热力图数据
    botTimeline.hotdata= res.result.timeline;
    // 渲染底部进度条
    if(!botTimeline.hotdata.length){
        console.log('接口数据为空')
        return;
    };
    var day= botTimeline.hotdata[0].date.split(' ')[0];
    botTimeline.init(day, interval, botTimeline.hotdata.length);
    var localToday= (new Date()).Format("yyyy-MM-dd");
    // 如果是今天，并且为自动刷新模式，则要自动点击最后一个时间点 ，用于更新热力图和top10点位
    if(autoRefresh.status&&(day== localToday)){
        autoRefresh.isToday=true;
        autoRefresh.start(); // 启动自动刷次
        $("#spotWrap .spot:last").click();   // 自动点击最后一个
    }else {
        autoRefresh.isToday = false;
        $("#spotWrap .spot:first").click();   // 点击第一个
        autoRefresh.pause();
    }
    
}

// 顶部的自动刷新功能
var autoRefresh={
    name:'自动刷新',
    status:false,
    isToday:false,
    time:null,
    click:function () {
        if(!this.isToday){
            alert('自动刷新用于查看今天的实时数据，往日的历史数据请点击右下角播放按钮')
        }
      if(this.status){
          this.pause()
      }else {
          this.start()
      }
    },
    start:function () {
        this.status=true;
        if(this.time) clearInterval(autoRefresh.time)
        this.time = setInterval(this.refresh, 1000*60*3)
        $("#refresh").text('暂停刷新');
        if($(".pauseBtn").is(':visible')){
               $(".pauseBtn").click();
        }
    },
    pause:function () {
         this.status = false;
         clearInterval(this.time)
        $("#refresh").text('自动刷新');
    },
    refresh:function () {
        getOnlineHot();// 请求今天数据
    }
};
autoRefresh.start();

$("#refresh").on('click',function () {
    autoRefresh.click();
})





 






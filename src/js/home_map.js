/**
 * Created by liujinghao on 2017/5/24.
 *
 */

var mapRoot={}; // 地图的根对象
var homeMap = new BMap.Map('homeMapDiv', {minZoom: 16, maxZoom: 17, enableMapClick: false});
//  homeMap.addControl(new BMap.NavigationControl());   // 左上角放大缩小控制按钮
//homeMap.addControl(new BMap.MapTypeControl());   //添加地图类型控件
homeMap.centerAndZoom(new BMap.Point(112.485412, 34.564331), 16);
var tileLayer = new BMap.TileLayer({isTransparentPng: true});
tileLayer.getTilesUrl = function (tileCoord, zoom) {
    var x = tileCoord.x;
    var y = tileCoord.y;
    return '/web/tiles/' + zoom + '/tile' + x + '_' + y + '.png';  //根据当前坐标，选取合适的瓦片图
}
homeMap.addTileLayer(tileLayer);  // 添加手绘的瓦片图
//  homeMap.disableDragging();     //禁止拖拽



//homeMap.setMapStyle({style: 'midnight'}); // 设置地图为午夜蓝模式，接近于设计稿的配色
homeMap.setMapStyle({styleJson: myStyleJson}); // 设置龙门石窟高级黑样式
homeMap.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
homeMap.disableInertialDragging()
 
homeMap.addEventListener('zoomend',function () {
    var nowS = this.getZoom();
    console.log('当前缩放层级' + nowS)
})
//GPS坐标校准工具函数
function transA(coor) {
    var nc = coor - 0.000001;
    return nc
}
function transB(coor) {
    var nc = coor + 0.000001;
    return nc
}
function newBp(c1, c2) {
    return new BMap.Point(transA(c1), transB(c2))
}
// 测试坐标准确性
/*
var point = newBp(112.495294, 34.573634);
var marker = new BMap.Marker(point);  // 创建标注
homeMap.addOverlay(marker);               // 将标注添加到地图中
marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

var point2 = newBp(112.479636, 34.560719);
var marker2 = new BMap.Marker(point2);  // 创建标注
homeMap.addOverlay(marker2);               // 将标注添加到地图中
marker2.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
*/

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
    div.innerHTML= this._text
    homeMap.getPanes().labelPane.appendChild(div);
    return div;
}
landMarker.prototype.draw = function () {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x + "px";
    this._div.style.top = pixel.y + "px";
}

// 批量添加基础 地标
mapRoot.landAdd=function(c1,c2,name) {
    markCoor.landMark.forEach(function (val, index) {
        mapRoot.landMarkObj[val.id]= new landMarker(new BMap.Point(val.coor.split(',')[0], val.coor.split(',')[1]), val.name);
        homeMap.addOverlay(mapRoot.landMarkObj[val.id]);
    })
}
// 控制所有基础地标 的显示与隐藏
mapRoot.landMarkShow = function (flag) {
    for (var id in mapRoot.landMarkObj) {
        if(flag){
            mapRoot.landMarkObj[id].show()
        }else{
            mapRoot.landMarkObj[id].hide()
        }
    }
}
// 几个比较密集的点位隐藏掉
setTimeout(function () {
    mapRoot.landMarkObj['d9'].hide()
},1000)

// 彩色会闪动的marker
mapRoot.coMarkObj = {};// 所有彩色点的映射
function coMarker(point, bg,name) {
    this._point = point;
    this._bg = bg;
    this._name=name;
}
coMarker.prototype = new BMap.Overlay();
coMarker.prototype.initialize = function (map) {
    this._map = map;
    var div = this._div = document.createElement("div");
    div.classList.add('comark');
    div.setAttribute('names',this._name);
    div.style.position = "absolute";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    var em = document.createElement('em');
    em.style.backgroundColor = this._bg;
    div.appendChild(em);
    var span = document.createElement('span');
    span.style.backgroundColor = this._bg;
    div.appendChild(span);
    homeMap.getPanes().labelPane.appendChild(div);
   // console.log(div)
    return div;
}
coMarker.prototype.draw = function () {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x + "px";
    this._div.style.top = pixel.y + "px";
}
// 批量添加彩色h5点位  ，背景色各不相同
mapRoot.comarkAdd = function () {
    markCoor.h5.forEach(function (val, index) {
        mapRoot.coMarkObj[val.id] = new coMarker(new BMap.Point(val.coor.split(',')[0], val.coor.split(',')[1]), val.color,val.name);
        homeMap.addOverlay(mapRoot.coMarkObj[val.id]);
        mapRoot.coMarkObj[val.id].hide()
    })
}
// 批量添加彩色龙门相册点位  ,相册的点位每个背景色是一样的
mapRoot.xiangceAdd = function () {
    markCoor.photo.forEach(function (val, index) {
        mapRoot.coMarkObj[val.id] = new coMarker(new BMap.Point(val.coor.split(',')[0], val.coor.split(',')[1]), '#147ad0', val.name);
        homeMap.addOverlay(mapRoot.coMarkObj[val.id]);
        mapRoot.coMarkObj[val.id].hide()
    })
}
// 批量添加65个语音画册点位  ,相册的点位每个背景色是一样的
mapRoot.yuyinAdd = function () {
    markCoor.yuyin.forEach(function (val, index) {
        mapRoot.coMarkObj[val.id] = new coMarker(new BMap.Point(val.coor.split(',')[0], val.coor.split(',')[1]), '#df6513', val.name);
        homeMap.addOverlay(mapRoot.coMarkObj[val.id]);
       // mapRoot.coMarkObj[val.id].hide()
    })
}
// 批量添加微信支付点位  , 每个背景色是一样的
mapRoot.wxpayAdd = function () {
    markCoor.wxpay.forEach(function (val, index) {
        mapRoot.coMarkObj[val.id] = new coMarker(new BMap.Point(val.coor.split(',')[0], val.coor.split(',')[1]), '#42ca83', val.name);
        homeMap.addOverlay(mapRoot.coMarkObj[val.id]);
        // mapRoot.coMarkObj[val.id].hide()
    })
}
// 首页互动播报
function roll(domid, time) {
    this.dom = domid
    this.loop=null;
    this.autotime = time; //刷新间隔时间
    this.ani = function () {
        this.$scrollCont = $(this.dom);
        var that = this;
        that.$scrollCont.find('li:last').clone().prependTo('' + that.dom + ' ul');
        var _first = that.$scrollCont.find('li:first');
        _first.height(0);
        _first.css('opacity', 0);
        _first.animate({height: '41px', opacity: 1});
        var _last = that.$scrollCont.find('li:last');
        _last.remove();
        this.loop=setTimeout(function () {
            that.ani();
        }, that.autotime);
    } ;
    this.ani()
}
$(function () {
    // 添加基本点位
    mapRoot.landAdd();
    // 添加彩色点位
    mapRoot.comarkAdd();
    // 添加彩色的龙门相册点位
    mapRoot.xiangceAdd();
    // 添加65个语音画册点位
    mapRoot.yuyinAdd();
    // 添加65个语音画册点位
    mapRoot.wxpayAdd();

    // 获取所有点位的闪烁状态
    loadData({
        type: 'get',
        url: '/api/message/get-point',
        data: {},
        interval: 4000,
        callback: function (res) {
            res.result.forEach(function (val,key) {
                if(val.show){
                    mapRoot.coMarkObj[val.id].show()
                }else{
                    mapRoot.coMarkObj[val.id].hide()
                }

            })
        }
    })

    //  右下角互动播报滚动
    var hudong=[];
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    var compiled = _.template('<% _.forEach(users, function(user) { %><li><div class="tx"><img src={{user.headimgurl}} class="w100"></div><div class="txt">{{user.content}}</div><div class="time">{{user.created}}</div></li><% }); %>');

    // 轮询请求接口
    loadData({
        type: 'get',
        url: '/api/message/get-message',
        data: {},
        interval: 40000,
        callback: function (res) {
            hudong=res.result;
            var hudonghtml = compiled({'users': hudong});
            $("#hottitle ul").html(hudonghtml)

        }
    })
    setTimeout(function () {
        var hotS = new roll('#hottitle', 2000);
    },2000)




    
})



 





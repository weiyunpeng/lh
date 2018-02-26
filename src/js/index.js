var mapRoot = {}; // 地图的根对象
var yuyinMap = new BMap.Map('yuyinbMap', {minZoom: 16, maxZoom: 17, enableMapClick: false});
//  yuyinMap.addControl(new BMap.NavigationControl());   // 左上角放大缩小控制按钮
//yuyinMap.addControl(new BMap.MapTypeControl());   //添加地图类型控件
yuyinMap.centerAndZoom(new BMap.Point(112.485412, 34.561331), 15);
var tileLayer = new BMap.TileLayer({isTransparentPng: true});
tileLayer.getTilesUrl = function (tileCoord, zoom) {
    var x = tileCoord.x;
    var y = tileCoord.y;
    return 'tiles/' + zoom + '/tile' + x + '_' + y + '.png';  //根据当前坐标，选取合适的瓦片图
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

// 播放次数
function qry_num(res) {
    var total = res.result.total;
    $('#totalNum').prop('number', $('#totalNum').text()).animateNumber({number: total.number}, 2000);
    $('#newsNum').prop('number', $('#newsNum').text()).animateNumber({number: total.news}, 2000);
    $('#readNum').prop('number', $('#readNum').text()).animateNumber({number: total.read}, 2000);
}

//热词
function qry_hot(res){
    var result = res.result.hot;
    var tpl = $("#word").html();
    var data={};
    data.list= result;
    $("#detail").html(soda(tpl, data))
}

// 地图
function qry_map(res){
    // 批量添加15个语音画册基础点位
    mapRoot.landAdd();
    // 添加65个语音画册点位
    mapRoot.yuyinAdd()
    // 获取所有语音点位的闪烁状态
    res.result.map.forEach(function (val, key) {
        if (val.show) {
            mapRoot.coMarkObj[val.id].show()
        } else {
            mapRoot.coMarkObj[val.id].hide()
        }
    })
}

// 网友评论
function qry_comments(res){
        var tpl2 = $("#comment").html();
        var data2={};
        data2.list2= _.chunk(res.result.commpents,10)
        $("#detail4").html(soda(tpl2, data2));
        if (window.swiper) {
            window.swiper.destroy()
        }

        // 评论hover效果
        $('.message .inner').hover(function() {
            $(this).find('.del').show();
        }, function() {
            $(this).find('.del').hide();
        });

        // 评论
        window.swiper = new Swiper('.swiper', {
            nextButton: '.right',
            prevButton: '.left',
            paginationClickable: true,
            spaceBetween: 0,
            centeredSlides: true,
            autoplay: 50000,
            loop: true,
            autoplayDisableOnInteraction: false
        });
}

// 隐藏评论
$("body").on('click', '.inner', function () {
    $(this).addClass('z-hide');
    var num = $(this).find('.del').text();

    loadData({
        type: 'post',
        url: '/api/substance/hide-commpents',
        data: {
            id: num
        },
        interval: 0,
        callback: function (res) {
            setTimeout(function () { 
                 pull()
            }, 2000);
        }
    })
})

// 当前代表人数
function qry_people(res){
    var result = res.result.hot;
    var tpl = $("#word").html();
    var data={};
    data.list= result;
    $("#detail").html(soda(tpl, data))
}

// 查询
loadData({
    type: 'get',
    url: 'http://localhost:3001/api/lianghui/hot',
    data: {},
    interval: 0,
    callback: function (res) {
        qry_num(res);
        qry_hot(res);
        qry_map(res);
        qry_comments(res);
    }
})
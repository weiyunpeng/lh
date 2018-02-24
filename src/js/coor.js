/**
 * Created by liujinghao on 2017/5/26.
 *   公共坐标数据，和公共的js方法
 */

/* 点位坐标*/
var markCoor={}

/*常态化显示的基础地标，共26个点位*/
markCoor.landMark=[
    {id:'d1',name: '大石门', coor: '112.484386,34.567898'},
    {id: 'd2',name: '松林', coor: '112.484215,34.567363'},
    {id: 'd3',name: '龙门桥', coor: '112.484125,34.564234'},
    {id: 'd4',name: '伊阙门', coor: '112.483955,34.563695'},
    {id: 'd5',name: '禹王池', coor: '112.483748,34.563461'},
    {id: 'd6',name: '潜溪寺', coor: '112.483155,34.562993'},
    {id: 'd7',name: '宾阳三洞', coor: '112.482899,34.562714'},
    {id: 'd8',name: '摩崖三佛龛', coor: '112.482985,34.562428'},
    {id: 'd9',name: '珍珠泉', coor: '112.483618,34.56225'},
    {id: 'd10',name: '步步生莲', coor: '112.48368,34.56199'},
    {id: 'd11',name: '佛手牡丹石', coor: '112.483438,34.561618'},
    {id: 'd12',name: '万佛洞', coor: '112.483411,34.56034'},
    {id: 'd13',name: '莲花洞', coor: '112.483424,34.55947'},
    {id: 'd14',name: '奉先寺', coor: '112.483092,34.55824'},
    {id: 'd15',name: '药方洞', coor: '112.483038,34.557504'},
    {id: 'd16',name: '古阳洞', coor: '112.48294,34.557125'},
    {id: 'd17',name: '极南洞', coor: '112.48205,34.555832'},
    {id: 'd18',name: '伊阙桥', coor: '112.483407,34.555468'},
    {id: 'd19',name: '东山石窟', coor: '112.485149,34.555899'},
    {id: 'd20',name: '看经寺', coor: '112.48506,34.556412'},
    {id: 'd21',name: '礼佛台', coor: '112.485185,34.558114'},
    {id: 'd22',name: '香山寺', coor: '112.486614,34.560462'},
    {id: 'd23',name: '白园', coor: '112.487638,34.563651'},
    {id: 'd24',name: '东山宾馆', coor: '112.489434,34.562841'},
    {id: 'd25',name: '东北服务区', coor: '112.495741,34.575325'},
    {id: 'd26',name: '西北服务区', coor: '112.481224,34.573311'},
]  ;
/*龙门相册点位*/
markCoor.photo = [
    {id: 'p1', name: '世界文化遗产石', coor: '112.483955,34.567846'},
    {id: 'p2', name: '伊阙门', coor: '112.483955,34.563695'},
    {id: 'p3', name: '鱼跃龙门', coor: '112.484125,34.564234'},
    {id: 'p4', name: '与佛同萌', coor: '112.482899,34.562714'},
    {id: 'p5', name: '步步生莲', coor: '112.483555,34.56212'},
    {id: 'p6', name: '牡丹石', coor: '112.483492,34.560949'},
    {id: 'p7', name: '奉先寺', coor: '112.483092,34.55824'},
    {id: 'p8', name: '伊阙桥', coor: '112.483407,34.555468'},
    {id: 'p9', name: '礼佛台', coor: '112.485185,34.558114'},
];
/*龙门支付点位*/
markCoor.wxpay = [
    {id: 'w1', name: '东北服务器售票中心', coor: '112.495293,34.575716'},
    {id: 'w2', name: '大石门检票口', coor: '112.484728,34.567631'},
    {id: 'w3', name: '讲解服务中心', coor: '112.484194,34.564747'},
    {id: 'w4', name: '东山宾馆', coor: '112.487994,34.562585'}
];
/* h5点位*/
markCoor.h5 = [
    {id: 'h1',name: '松林拼图', coor: '112.484215,34.567363',color:'#9b2ee5'},
    {id: 'h2',name: '测佛缘', coor: '112.48417,34.564457', color: '#668ef3'},
    {id: 'h3',name: '龙门幸运漂流瓶1', coor: '112.48426,34.564736', color: '#51ffff'},
    {id: 'h4',name: '龙门幸运漂流瓶2', coor: '112.48369,34.562187', color: '#51ffff'},
    {id: 'h5',name: '龙门幸运漂流瓶3', coor: '112.483366,34.558151', color: '#51ffff'},
    {id: 'h6',name: '与佛同萌', coor: '112.482899,34.562714', color: '#b13535'},
    {id: 'h7',name: '3D拍照新体验', coor: '112.483609,34.562287', color: '#cfc2ae'},
    {id: 'h8',name: '3D万佛洞', coor: '112.483299,34.561376', color: '#cfc2ae'},
    {id: 'h9',name: '3D卢舍那大佛欣赏', coor: '112.483092,34.55824', color: '#cfc2ae'},
    {id: 'h10',name: '拜卢舍那上心香', coor: '112.483092,34.55824', color: '#fdeb1f'},
    {id: 'h11',name: '祈福魏碑', coor: '112.48294,34.557125', color: '#00CC99'},
    {id: 'h12',name: '百科知识竞赛', coor: '112.482284,34.555564', color: '#330099'},
    {id: 'h13',name: '心语心愿', coor: '112.485185,34.558114', color: '#663399'},
];
/*语音画册点位*/
markCoor.yuyin = [
    {id: 'y1', name: '大石门', coor: '112.484386,34.567898'},
    {id: 'y2', name: '松林', coor: '112.484244,34.566939'},
    {id: 'y3', name: '龙门桥', coor: '112.48411,34.564219'},
    {id: 'y4', name: '石窟北大门', coor: '112.483988,34.563777'},
    {id: 'y5', name: '禹王池', coor: '112.483876,34.56313'},
    {id: 'y6', name: '潜溪寺', coor: '112.483643,34.564059'},
    {id: 'y7', name: '陈抟十字卷碑', coor: '112.483526,34.563862'},
    {id: 'y8', name: '宾阳洞区', coor: '112.482897,34.562707'},
    {id: 'y9', name: '伊阙佛龛之碑', coor: '112.482879,34.56267'},
    {id: 'y10', name: '宾阳中洞', coor: '112.482879,34.56267'},
    {id: 'y11', name: '宾阳南洞', coor: '112.482879,34.56267'},
    {id: 'y12', name: '宾阳北洞', coor: '112.482879,34.56267'},
    {id: 'y13', name: '敬善寺', coor: '112.482901,34.562592'},
    {id: 'y14', name: '摩崖三佛龛', coor: '112.482892,34.562562'},
    {id: 'y15', name: '步步生莲', coor: '112.483521,34.561967'},
    {id: 'y16', name: '佛手牡丹石', coor: '112.483499,34.561663'},
    {id: 'y17', name: '万佛洞', coor: '112.483297,34.561399'},
    {id: 'y18', name: '双窑', coor: '112.483297,34.561399'},
    {id: 'y19', name: '清明寺', coor: '112.483297,34.56135'},
    {id: 'y20', name: '惠简洞', coor: '112.483301,34.561258'},
    {id: 'y21', name: '老龙洞', coor: '112.483301,34.560979'},
    {id: 'y22', name: '慈香窑', coor: '112.483292,34.560774'},
    {id: 'y23', name: '莲花洞', coor: '112.483378,34.558608'},
    {id: 'y24', name: '郭公路方公路', coor: '112.48344,34.558474'},
    {id: 'y25', name: '普泰洞', coor: '112.483431,34.558452'},
    {id: 'y26', name: '赵客师洞', coor: '112.483422,34.558422'},
    {id: 'y27', name: '破窑', coor: '112.483414,34.558422'},
    {id: 'y28', name: '魏字洞', coor: '112.483414,34.558422'},
    {id: 'y29', name: '唐字洞', coor: '112.483414,34.558422'},
    {id: 'y30', name: '交脚弥勒像龛', coor: '112.483414,34.558422'},
    {id: 'y31', name: '奉先寺', coor: '112.483072,34.558288'},
    {id: 'y32', name: '大卢舍那像龛记碑', coor: '112.483333,34.558244'},
    {id: 'y33', name: '奉南洞', coor: '112.483153,34.558229'},
    {id: 'y34', name: '大唐内侍省功德碑', coor: '112.483018,34.55814'},
    {id: 'y35', name: '火烧洞', coor: '112.482749,34.55753'},
    {id: 'y36', name: '皇甫公窟', coor: '112.482578,34.557122'},
    {id: 'y37', name: '八作司洞', coor: '112.48256,34.55701'},
    {id: 'y38', name: '龙华寺洞', coor: '112.482866,34.557657'},
    {id: 'y39', name: '北市綵帛行净土宗', coor: '112.482524,34.556973'},
    {id: 'y40', name: '古阳洞', coor: '112.482946,34.557166'},
    {id: 'y41', name: '药方洞', coor: '112.483009,34.5573'},
    {id: 'y42', name: '路洞', coor: '112.482461,34.556891'},
    {id: 'y43', name: '北市丝行像龛', coor: '112.482452,34.556817'},
    {id: 'y44', name: '汴州洞', coor: '112.482425,34.55678'},
    {id: 'y45', name: '地花洞', coor: '112.482291,34.556505'},
    {id: 'y46', name: '唐增陇西县君牛式像龛碑', coor: '112.482291,34.556468'},
    {id: 'y47', name: '极南洞', coor: '112.482093,34.556074'},
    {id: 'y48', name: '袁弘绩洞', coor: '112.482057,34.555947'},
    {id: 'y49', name: '伊河', coor: '112.484752,34.560912'},
    {id: 'y50', name: '西方净土变龛', coor: '112.486477,34.555721'},
    {id: 'y51', name: '千手千眼观音像龛', coor: '112.486513,34.555702'},
    {id: 'y52', name: '高平郡王洞', coor: '112.486382,34.555773'},
    {id: 'y53', name: '看经寺', coor: '112.485093,34.556416'},
    {id: 'y54', name: '二莲花洞', coor: '112.485102,34.556668'},
    {id: 'y55', name: '四雁洞', coor: '112.485147,34.556861'},
    {id: 'y56', name: '礼佛台', coor: '112.48468,34.556824'},
    {id: 'y57', name: '香山寺', coor: '112.486652,34.560462'},
    {id: 'y58', name: '蒋宋别墅', coor: '112.486508,34.560395'},
    {id: 'y59', name: '香山寺乾隆御碑', coor: '112.486872,34.560436'},
    {id: 'y60', name: '香山寺九老堂', coor: '112.486679,34.560548'},
    {id: 'y61', name: '香山寺石楼', coor: '112.486355,34.560485'},
    {id: 'y62', name: '白园', coor: '112.488143,34.563179'},
    {id: 'y63', name: '白园诗廊区', coor: '112.488269,34.564345'},
    {id: 'y64', name: '白园墓区', coor: '112.488736,34.5641'} ,
    {id: 'y65', name: '白园乐天堂', coor: '112.488898,34.563558'}
];
markCoor.yuyin15=[
    {id: 'y1', name: '大石门', coor: '112.484386,34.567898'},
    {id: 'y3', name: '龙门桥', coor: '112.48411,34.564219'},
    {id: 'y8', name: '宾阳洞区', coor: '112.482897,34.562707'},
    {id: 'y17', name: '万佛洞', coor: '112.483297,34.561399'},
    {id: 'y23', name: '莲花洞', coor: '112.483378,34.558608'},
    {id: 'y31', name: '奉先寺', coor: '112.483072,34.558288'},
    {id: 'y40', name: '古阳洞', coor: '112.482946,34.557166'},
    {id: 'y53', name: '看经寺', coor: '112.485093,34.556416'},
    {id: 'y51', name: '千手千眼观音像龛', coor: '112.486513,34.555702'},
    {id: 'y56', name: '礼佛台', coor: '112.48468,34.556824'},
    {id: 'y61', name: '香山寺石楼', coor: '112.486355,34.560485'},
    {id: 'y63', name: '白园诗廊区', coor: '112.488269,34.564345'},
    {id: 'y65', name: '白园乐天堂', coor: '112.488898,34.563558'}
];
markCoor.h5color=[
    '#42ca83', '#51ffff', '#fdeb1f', '#668ef3', '#df6513', '#147ad0', '#9b2ee5', '#b13535','#cfc2ae' ,'#42ca83', '#51ffff', '#fdeb1f'
] ;
// 龙门石窟高级黑样式
var myStyleJson = [
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": {
            "color": "#021019"
        }
    },
    {
        "featureType": "highway",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#000000"
        }
    },
    {
        "featureType": "highway",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#147a92"
        }
    },
    {
        "featureType": "arterial",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#000000"
        }
    },
    {
        "featureType": "arterial",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#0b3d51"
        }
    },
    {
        "featureType": "local",
        "elementType": "geometry",
        "stylers": {
            "color": "#000000"
        }
    },
    {
        "featureType": "land",
        "elementType": "all",
        "stylers": {
            "color": "#08304b"
        }
    },
    {
        "featureType": "railway",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#000000"
        }
    },
    {
        "featureType": "railway",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#08304b"
        }
    },
    {
        "featureType": "subway",
        "elementType": "geometry",
        "stylers": {
            "lightness": -70
        }
    },
    {
        "featureType": "building",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#000000"
        }
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#857f7f"
        }
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#000000"
        }
    },
    {
        "featureType": "building",
        "elementType": "geometry",
        "stylers": {
            "color": "#022338"
        }
    },
    {
        "featureType": "green",
        "elementType": "geometry",
        "stylers": {
            "color": "#062032"
        }
    },
    {
        "featureType": "boundary",
        "elementType": "all",
        "stylers": {
            "color": "#1e1c1c"
        }
    },
    {
        "featureType": "background",     // 地图底色
        "elementType": "all",
        "stylers": {
            "color": "#030619",
            "saturation": 100
        }
    },
    {
        "featureType": "poi",  // 关闭兴趣点
        "elementType": "all",
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "featureType": "road",   // 关闭路名
        "elementType": "all",
        "stylers": {
            "visibility": "off"
        }
    }, {
        "featureType": "background",
        "elementType": "all",
        "stylers": {
            "color": "#030619",
            "weight": "1",
            "saturation": 88,
            "visibility": "on"
        }
    }
];

// 封装ajax数据调用层
function loadData(para) {
     var type=para.type||'get';
    // var url='http://testdsj.qqdayu.com'+para.url;window.location.origin+  // 临时用的接口地址 ，正式环境请注释掉
     var url= para.url; //  部署到服务器上后，去掉此行的注释，把上面临时的接口注释掉
     var ajax=function () {
         $.ajax({
             type: type,
             url: url,
             data:para.data,
             dataType: 'json',
             cache: false,
             success: function (datas) {
                 if(datas.code==2){
                     // 未登录
                  //   top.location.href= window.location.origin+ datas.result;
                     
                 }
                  para.callback(datas)
             },
             error: function (message) {
                 console.log('捕获到后端接口错误')
             }
         });
     }
     if(para.interval){  // 轮询调用
         ajax();
         var time=setInterval(function () {
           ajax()
         },para.interval)
     }else{    // 只请求一次
            ajax()
     }

}

// ajax调用示例，interval参数为毫秒，表示轮询请求
/*
loadData({
    type:'get',
    url:'/api/album/info',
    data:{},
    interval:12000,
    callback:function (res) {
         console.log(res)
    }
})
*/

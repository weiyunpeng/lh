/**
 * Created by liujinghao on 2017/5/24.
 *
 */

// 语音画册
var yuyinChart = echarts.init(document.getElementById('yuyinhuace'));
var option_yuyinhuace = {
    animation:false,
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
        splitLine: {
            show: false
        },
        splitNumber:6,// X轴刻度值分段数
        axisLabel: {
            show:false
        } ,
        boundaryGap: [0, 0.1]
    },
    yAxis: {
        color:'#fff',
        axisLabel: {
            textStyle:{
                color:'#d2d2d2'
            }
        },
        type: 'category',
        data: ['点位13', '点位12', '点位11', '点位10', '点位9', '点位8', '点位7', '点位6', '点位5', '点位4', '点位3', '点位2', '点位1',]
    },
    series: [
        {
            name: '收听次数',
            type: 'bar',
            barWidth: 5,
            itemStyle: {
                normal: {
                    barBorderRadius: 4
                }
            },
            data: [18203, 23489, 29034, 18203, 23489, 29034, 18203, 23489, 29034, 18203, 23489, 29034, 29034]
        }
    ],
    textStyle: {
        color: '#416685'
    }
};
// 使用刚指定的配置项和数据显示图表。
//yuyinChart.setOption(option_yuyinhuace);
/*loadData({
    type: 'get',
    url: '/api/voice-book/summary-info',
    data: {},
    interval:3000,
    callback: function (res) {
        set_yuyin(res)
    }
})*/

function  set_yuyin(res) {
    $('#yu1').prop('number', $('#yu1').text()).animateNumber({number: res.result.yuyin.total_num},2000);
    $('#yt1').prop('number', $('#yt1').text()).animateNumber({number: res.result.yuyin.total_time.hours}, 2000);
    $('#yt2').prop('number', $('#yt2').text()).animateNumber({number: res.result.yuyin.total_time.minutes}, 2000);
    $('#yt3').prop('number', $('#yt3').text()).animateNumber({number: res.result.yuyin.total_time.seconds}, 2000);
    option_yuyinhuace.yAxis.data = res.result.yuyin.legend;
    var datalist = [];
    res.result.yuyin.data.forEach(function (val) {
        datalist.push(val.value)
    })
    option_yuyinhuace.series[0].data = datalist
    //var yuyinChart = echarts.init(document.getElementById('yuyinhuace'));
    yuyinChart.setOption(option_yuyinhuace);
}

// 龙门相册
 var xiangceChart = echarts.init(document.getElementById('xiangce'));
optionXiangce = {
    color: ['#136fbd', '#24b1f1', '#51ffff'],
    calculable: false,
    animation: false,
    series: [
        {
            name: '漏斗图',
            type: 'funnel',
            left: '1%',
            top: 30,
            width: '75%',
            height: '60%',
            min: 0,
            max: 80,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            labelLine: {
                normal: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            } ,
            data: [
           /*     {value: 60, name: '累计照片'},
                {value: 40, name: '累计人数'},
                {value: 20, name: '累计相册'}*/
            ]
        }
    ]
};
// 使用刚指定的配置项和数据显示图表。
//  xiangceChart.setOption(optionXiangce);

/*
loadData({
    type: 'get',
    url: '/api/album/summary-info',
    data: {},
    interval:3000,
    callback: function (res) {
        set_xiangce(res)
    }
})
*/

function set_xiangce(res) {
    $('#xd1').prop('number', $('#xd1').text()).animateNumber({number: res.result.xiangce.total_photo_num}, 2000);
    $('#xd2').prop('number', $('#xd2').text()).animateNumber({number: res.result.xiangce.total_people_num}, 2000);
    $('#xd3').prop('number', $('#xd3').text()).animateNumber({number: res.result.xiangce.total_album_num}, 2000);
    optionXiangce.series[0].data = res.result.xiangce.ratio.data;
    // var xiangceChart = echarts.init(document.getElementById('xiangce'));
    xiangceChart.setOption(optionXiangce);
}
 


// 上心香
  var shangxinxiangChart = echarts.init(document.getElementById('shangxinxiang'));
optionShangxinxiang = {
    animation: false,
    color: ['#0542a7', '#0161b3', '#148cd1', '#d3f6f8', '#30d9d9', '#3b4f74'],
    tooltip: {
        trigger: 'item',
        formatter: function (params, ticket, callback) {
            var res = params.seriesName;
            res += '<br/>' + params.name + ' : ' + params.value + '次 (' + params.percent + '%)';
            return res;
        }
    },
    legend: {
        orient: 'vertical',
        right: '15%',
        top: '12%',
        itemWidth:10,
        itemHeight:10,
        textStyle:{
            color:'#d2d2d2'
        }  ,
        data: ['佛语禅心', '送父母', '新年祝福', '送朋友', '喜乐祥和', '送子女']
    },
    series: [
        {
            "center": [
                "18.0%",
                "55%"
            ],
            name: '上心香',
            type: 'pie',
            radius: ['60%', '80%'],
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
                {value: 135, name: '送朋友'},
                {value: 1548, name: '喜乐祥和'} ,
                {value: 1548, name: '送子女'}
            ]   ,
            hoverAnimation: false
        } 
    ]
};
// 使用刚指定的配置项和数据显示图表。
//shangxinxiangChart.setOption(optionShangxinxiang);
 
/*
 loadData({
    type: 'get',
    url: '/api/thus/summary-info',
    data: {},
    interval: 3000,
    callback: function (res) {
        set_shangxinxiang(res)
    }
}) 
*/

function set_shangxinxiang(res) {
    optionShangxinxiang.legend.data = res.result.shangxinxiang.ratioInfo.legend;
    optionShangxinxiang.series[0].data = res.result.shangxinxiang.ratioInfo.ratio;
    //var shangxinxiangChart = echarts.init(document.getElementById('shangxinxiang'));
    shangxinxiangChart.setOption(optionShangxinxiang);
    $('#qf1').prop('number', $('#qf1').text()).animateNumber({number: res.result.shangxinxiang.total_num}, 2000);
    $('#qf2').prop('number', $('#qf2').text()).animateNumber({number: res.result.shangxinxiang.total_people}, 2000);

}


// 微信支付
var wxpayChart = echarts.init(document.getElementById('wxpay'));
optionWP = {
    animation: false,
    color: ['#0542a7', '#0161b3', '#148cd1', '#d3f6f8', '#30d9d9', '#3b4f74','#00CC66'],
    tooltip: {
        trigger: 'item',
        formatter: function (params, ticket, callback) {
            var res = params.seriesName;
            res += '<br/>' + params.name + ' : ' + params.value + '元 (' + params.percent + '%)';
            return res;
        }
    },
   
    legend: {
        orient: 'vertical',
        // right: '0',
        top: '2px',
        // bottom:'3%',
        padding:[0,0],
        right: '2%',
        bottom:'1%',
        height:210,
        itemWidth: 15,
        itemHeight: 10,
        textStyle: {
            color: '#d2d2d2',
        },
        /*data: ['门票收入', '游船公司', '东山宾馆', '导游讲解', '电瓶车']*/
    },
    series: [
        {
            "center": [
                "30.0%",
                "45%"
            ],
            name: '收入统计',
            type: 'pie',
            radius: ['50%', '70%'],
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
           /* data: [
                {value: 0, name: '门票收入'},
                {value: 0, name: '游船公司'},
                {value: 234, name: '东山宾馆'},
                {value: 135, name: '导游讲解'},
                {value: 1548, name: '电瓶车'}
            ]*/
        }
    ]
};
// 使用刚指定的配置项和数据显示图表。
//wxpayChart.setOption(optionWP);

/*loadData({
    type: 'get',
    url: '/api/pay-ticket/summary-info',
    data: {},
    interval:3000,
    callback: function (res) {
        set_weixin(res)
    }
})*/

function set_weixin(res) {
    optionWP.legend.data = res.result.weixin.orther_fee_ratio.legend;
    optionWP.series[0].data = res.result.weixin.orther_fee_ratio.data;
    // var wxpayChart = echarts.init(document.getElementById('wxpay'));
    wxpayChart.setOption(optionWP);
    $('#wp1').prop('number', $('#wp1').text()).animateNumber({number: res.result.weixin.total_fee}, 2000);
    $('#wp2').prop('number', $('#wp2').text()).animateNumber({number: res.result.weixin.total_ticket_fee}, 2000);
    $('#wp3').prop('number', $('#wp3').text()).animateNumber({number: res.result.weixin.total_full_num}, 2000);
    $('#wp4').prop('number', $('#wp4').text()).animateNumber({number: res.result.weixin.total_half_num}, 2000);

    var per = res.result.weixin.total_full_num * 100 / (res.result.weixin.total_full_num + res.result.weixin.total_half_num)
    var per2 = res.result.weixin.total_half_num * 100 / (res.result.weixin.total_full_num + res.result.weixin.total_half_num)
    $('#payper').width(per + '%');
    $('#payper').attr('per',per.toFixed(1))
    $('#payper2').width(per2 + '%');
    $('#payper2').attr('per', per2.toFixed(1))
}


// 测佛缘
var cefuoyuanChart = echarts.init(document.getElementById('cefuoyuan'));
var optionCefuoyuan = {
    animation: false,
    color: ['#24b1f1'],
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
        data: ['点位13', '点位12', '点位11', '点位10', '点位9', '点位8', '点位7', '点位6', '点位5', '点位4', '点位3', '点位2', '点位1',]
    },
    series: [
        {
            name: '互动次数',
            type: 'bar',
            barWidth: 5,
            itemStyle: {
                normal: {
                    barBorderRadius: 4
                }
            },
            data: [18203, 23489, 29034, 18203, 23489, 29034, 18203, 23489, 29034, 18203, 23489, 29034, 29034]
        }
    ],
    textStyle: {
        color: '#416685'
    }
};
// 使用刚指定的配置项和数据显示图表。
//cefuoyuanChart.setOption(optionCefuoyuan);

/*
loadData({
    type: 'get',
    url: '/api/buddha/summary-info',
    data: {},
    interval: 3000,
    callback: function (res) {
        set_cefoyuan(res)
    }
})
*/

function set_cefoyuan(res) {
    optionCefuoyuan.yAxis.data = res.result.cefoyuan.toplist.legend;
    optionCefuoyuan.series[0].data = res.result.cefoyuan.toplist.data;
    //   var cefuoyuanChart = echarts.init(document.getElementById('cefuoyuan'));
    cefuoyuanChart.setOption(optionCefuoyuan);
/*    $("#ce1").text(res.result.total_num);
    $("#ce2").text(res.result.total_people);*/
    $('#ce1').prop('number', $('#ce1').text()).animateNumber({number: res.result.cefoyuan.total_num}, 2000);
    $('#ce2').prop('number', $('#ce2').text()).animateNumber({number: res.result.cefoyuan.total_people}, 2000);
}


// 幸运漂流瓶
var piaoliupingChart = echarts.init(document.getElementById('piaoliuping'));
var optionPiaoiuping = {
    animation: false,
    color: ['#51ffff', '#0161b3', '#148cd1', '#d3f6f8', '#30d9d9', '#3b4f74'],
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
                        fontSize: 14
                    }
                }
            }
        }, {
            value: 100,
            name: '',
            label: {
                normal: {
                    formatter: '\n中奖率',
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
// 使用刚指定的配置项和数据显示图表。
//piaoliupingChart.setOption(optionPiaoiuping);


/*loadData({
    type: 'get',
    url: '/api/bottle/summary-info',
    data: {},
    interval:3000,
    callback: function (res) {
        set_piaoliuping(res)
    }
})*/

function set_piaoliuping(res) {
    $('#xy1').prop('number', $('#xy1').text()).animateNumber({number: res.result.piaoliuping.total_people}, 2000);
    $('#xy2').prop('number', $('#xy2').text()).animateNumber({number: res.result.piaoliuping.winner_people}, 2000);
    $('#xy3').prop('number', $('#xy3').text()).animateNumber({number: res.result.piaoliuping.prize_num}, 2000);
 
    optionPiaoiuping.series[0].data[0].value = res.result.piaoliuping.winning_rate[0].value;
    optionPiaoiuping.series[0].data[0].label.normal.formatter = res.result.piaoliuping.winning_rate[0].value + '%';
    // var piaoliupingChart = echarts.init(document.getElementById('piaoliuping'));
    piaoliupingChart.setOption(optionPiaoiuping);
}


// 慢直播人数
/*loadData({
    type: 'get',
    url: '/api/summary/info',
    data: {},
    interval: 3000,
    callback: function (res) {
        set_total(res);// 直播
    }
})*/
function set_total(res) {
/*    $("#zbnum").text(res.result.live_num);
    $("#serviceNum").text(res.result.service_num);
    $("#fansNum").text(res.result.fans_num);*/
    $('#zbnum').prop('number', $('#zbnum').text()).animateNumber({number: res.result.total.live_num}, 2000);
    $('#serviceNum').prop('number', $('#serviceNum').text()).animateNumber({number: res.result.total.service_num}, 2000);
    $('#fansNum').prop('number', $('#fansNum').text()).animateNumber({number: res.result.total.fans_num}, 2000);
}



// 合并所有接口
loadData({
    type: 'get',
    url: '/api/summary/index',
    data: {},
    interval: 5000,
    callback: function (res) {
        set_total(res);
        set_yuyin(res);
        set_xiangce(res);
        set_weixin(res);
        set_cefoyuan(res);
        set_shangxinxiang(res);
        set_piaoliuping(res);
    }
})









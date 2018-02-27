// 性别比例
// var echart1 = echarts.init(document.getElementById('echart1'));
var optiondatum1 = {
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
// echart1.setOption(optiondatum1);

// 来源分析
// var echart2 = echarts.init(document.getElementById('echart2'));
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
// echart2.setOption(datum2Option);

// AR性别比例
// var echart3 = echarts.init(document.getElementById('echart3'));
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
// echart3.setOption(optiondatum3);

// AR来源分析
// var echart4 = echarts.init(document.getElementById('echart4'));
var datum4Option = {
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
// echart4.setOption(datum4Option);

// 播放次数
function qry_num(res) {
    var total = res.result.total;
    $('#newsNum').prop('number', $('#newsNum').text()).animateNumber({number: total.news}, 2000);
    $('#readNum').prop('number', $('#readNum').text()).animateNumber({number: total.read}, 2000);
    $('#commentNum').prop('number', $('#commentNum').text()).animateNumber({number: total.comment}, 2000);
}

//两会热词
function qry_lh(res){
    var result = res.result.keyword;
    var tpl = $("#word").html();
    var data={};
    data.list= result;
    $("#detail").html(soda(tpl, data))
}

// 网友评论
function qry_comments(res){
        var tpl2 = $("#comment").html();
        var data2={};
        data2.list2= _.chunk(res.result.comment,10)
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
        url: 'http://m.qqdyw.cn/meeting/api/closed',
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
    var result = res.result.read_total;
    var tpl = $("#peopleWord").html();
    var data={};
    var numStr = result.read_number+'';
    var count = numStr.split('');
    data.count= count;
    $("#peopleDetail").html(soda(tpl, data))

    //性别比例
    optiondatum1.series[0].data = result.sex.data;
    optiondatum1.legend.data = result.sex.legend;
    var echart1 = echarts.init(document.getElementById('echart1'));
    echart1.setOption(optiondatum1);

    //来源分析
    datum2Option.series[0].data = result.from.data;
    datum2Option.legend.data = _.take(result.from.legend, 6);
    var echart2 = echarts.init(document.getElementById('echart2'));
    echart2.setOption(datum2Option);
}

// AR
function qry_ar(res){
    var result = res.result.ar_total;
    var tpl = $("#peopleWord").html();
    var data={};
    var numStr = result.read_number+'';
    var count = numStr.split('');
    data.count= count;
    $("#peopleDetail").html(soda(tpl, data))

    //性别比例
    optiondatum3.series[0].data = result.sex.data;
    optiondatum3.legend.data = result.sex.legend;
    var echart3 = echarts.init(document.getElementById('echart3'));
    echart3.setOption(optiondatum3);

    //来源分析
    datum4Option.series[0].data = result.from.data;
    datum4Option.legend.data = _.take(result.from.legend, 6);
    var echart4 = echarts.init(document.getElementById('echart4'));
    echart4.setOption(datum4Option);
}

// 查询
loadData({
    type: 'get',
    url: 'http://m.qqdyw.cn/meeting/api/get',
    data: {},
    interval: 0,
    callback: function (res) {
        qry_num(res);
        qry_lh(res);
        qry_comments(res);
        qry_people(res);
        qry_ar(res);
    }
})

loadData({
    type: 'get',
    url: 'http://m.qqdyw.cn/meeting/api/getword',
    data: {},
    interval: 0,
    callback: function (res) {
    }
})
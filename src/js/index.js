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
    var result = res.result.hot;
    var tpl = $("#word").html();
    var data={};
    data.list= result;
    $("#detail").html(soda(tpl, data))
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
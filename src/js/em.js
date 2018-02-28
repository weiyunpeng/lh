/**
 * Created by liujinghao on 2/27 0027.
 *
 */

// 语意分析

var emt=function () {
    // 滚动处理
    var wrapSize = 0;
    var conSize =0;
    var scrollW=0;
    var scrollDistance=0;
   function renderSize(){
        wrapSize=$(".embox .type").width();
        conSize= $(".embox .type .list").width();
        scrollW=conSize - wrapSize;
   }

    renderSize(); // 数据更新后调用预渲染
   // 滚动按钮
    $(".embox .type .btn").on('click',function () {
       if(scrollW<=0) {
           console.log(scrollW)
           return;
       };
        console.log(scrollDistance)
        scrollDistance-=50;
        if(Math.abs(scrollDistance)>=Math.abs(scrollW+100)){
            scrollDistance=0;
            $(".embox .type .list").css('left', 0);
        } else {
            $(".embox .type .list").css('left', scrollDistance);
        }

    })

    // 词类型点击
    $(".embox .type .list ").on('click','span',function () {
        $(this).addClass('current').siblings().removeClass('current');
        var id=$(this).attr('id');
        console.log(id);
        $(".embox .words span").removeClass('cc')
        $(".embox .words span").each(function () {
            var thisId=$(this).attr("id");
            if(thisId==id){
                $(this).addClass('cc')
            }
        })


    })

    var lastTxt='';

    //  请求数据
    loadData({
        type: 'post',
        url: 'http://m.qqdyw.cn/meeting/api/getword',
        data: {
            id: 0
        },
        interval: 0,
        callback: function (res) {
            setData(res)
        }
    })
    function  setData(res) {
        var  data=res.result;
        if(lastTxt== data.sentence){
            return false;
        }
        lastTxt=data.sentence;
        $(".embox .mtxt").text(data.sentence) ;
        $(".embox .prog .t1").text('负面情绪' + data.mood.positive * 100 + '%')
        $(".embox .prog .t2").text('正面情绪' + data.mood.negative * 100 + '%')
        $('.embox .prog .num').css('width', data.mood.positive * 100 + '%') ;

        // 词类型
        var wordstpl = '<span soda-repeat="item in list" id="{{item.wtype_pos}}">{{item.wtype}}</span>';
        var words = {
            list: data.type
        };
        var wordsHtml = soda(wordstpl, words);
        $(".embox .type .list").html(wordsHtml);
        // 中文分词
        var segTpl = '<span soda-repeat="item in list" id="{{item.wtype_pos}}">{{item.word}}</span>';
        var segment = {
            list: data.words
        };
        var segHtml = soda(segTpl, segment);
        $(".embox .words").html(segHtml);
        // 自动点击第一个
        $(".embox .type span").eq(0).click()
        

        renderSize(); // 数据更新后调用预渲染
    }

}
emt();
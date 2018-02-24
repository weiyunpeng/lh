// 热词
loadData({
    type: 'get',
    url: 'http://localhost:3001/api/lianghui/hot',
    data: {},
    interval: 0,
    callback: function (res) {
        qry_hot(res);
    }
})

//热词
function qry_hot(res){
    var result = res.result.hot;
    var tpl = $("#word").html();
    var data={};
    data.list= result;
    $("#detail").html(soda(tpl, data))
}
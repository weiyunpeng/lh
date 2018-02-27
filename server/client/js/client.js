$(function() {

    var socket = io('http://127.0.0.1:3000');

    socket.emit("hey");

    socket.on('onHey', function(data){
//        console.log(data)
    })

    // 接收服务端传回的 打开 人脸识别弹层指令
    socket.on('clientOpenFaceScanLayer', function(data){
        // 打开人脸识别弹层
        // todo
        console.log('启动人脸识别');
    })
    // 接收服务端传回的 关闭 人脸识别弹层指令
    socket.on('clientCloseFaceScanLayer', function(data){
        // 关闭人脸识别弹层
        // todo
        console.log('关闭人脸识别');
    })

    // 接收截取照片的事件
    socket.on('clientCaptureSnapshot', function(data){
        // 截取照片
        // todo
        console.log('抓取照片');
    })

    // 选取人脸识别人物
    socket.on('clientChoosePeople', function(data){
        // 截取照片
        // todo
        console.log(data.people);
    })
});

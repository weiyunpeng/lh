$(function() {

    var socket = io('http://socket.qqdayu.com');

    socket.emit("hey");

    // // 发送开启大屏人脸识别弹层
    // socket.emit('serverOpenFaceScanLayer', {})
    // // 发送关闭大屏人脸识别弹层
    // socket.emit('serverCloseFaceScanLayer', {})
    // // 发送抓取照片指令
    // socket.emit('serverCaptureSnapshot', {})

    $('#l1').click(function(){
        console.log('send request');
        socket.emit('serverOpenFaceScanLayer', {
        })
    })

    $('#l2').click(function(){
        console.log('send request');
        socket.emit('serverCloseFaceScanLayer', {
        })
    })

    $('#c1').click(function(){
        console.log('send request');
        socket.emit('serverCaptureSnapshot', {
        })
    })

    $('#p1').click(function(){
        console.log('send request');
        socket.emit('serverChoosePeople', {
            people:"Tom Hardy"
        })
    })
    $('#p2').click(function(){
        console.log('send request');
        socket.emit('serverChoosePeople', {
            people:"Jessica Alba"
        })
    })
    $('#p3').click(function(){
        console.log('send request');
        socket.emit('serverChoosePeople', {
            people:"Michael Jackson"
        })
    })



//    // 接收服务端传回的 打开 人脸识别弹层指令
//    socket.on('clientOpenFaceScanLayer', function(data){
//        // 打开人脸识别弹层
//        // todo
//    })
//    // 接收服务端传回的 关闭 人脸识别弹层指令
//    socket.on('clientCloseFaceScanLayer', function(data){
//        // 关闭人脸识别弹层
//        // todo
//    })
});

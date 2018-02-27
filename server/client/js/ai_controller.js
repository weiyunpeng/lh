$(function() {

    var socket = io('http://127.0.0.1:3000');

    socket.emit("hey");

//    // 发送开启大屏人脸识别弹层
//    socket.emit('serverOpenFaceScanLayer', function(data){
//    })
//    // 发送关闭大屏人脸识别弹层
//    socket.emit('serverCloseFaceScanLayer', function(data){
//    })
//    // 发送抓取照片指令
//    socket.emit('serverCaptureSnapshot', function(data){
//    })



});

var socket = io('http://socket.qqdayu.com');
var canvasWidth = 640;
var canvasHeight = 480;

var faceRadius = 240;
var facelimite = 100;

var faceVideo = document.getElementById('faceVideo');
var faceCanvas = document.getElementById('faceCanvas');
var context = faceCanvas.getContext('2d');

var tracker;
var trackerTask;

var flag = true;

faceCanvas.width = canvasWidth;
faceCanvas.height = canvasHeight;
faceVideo.width = canvasWidth;
faceVideo.height = canvasHeight;

// 识别人脸
socket.emit('hey');
// // 接收服务端传回的 打开 人脸识别弹层指令
socket.on('clientOpenFaceScanLayer', function(data) {
    // 打开人脸识别弹层
    console.log('启动人脸识别');
    faceTrack();
});

// trackerTask.stop(); // Stops the tracking
// trackerTask.run(); // Runs it again anytime

// faceTrack();
function faceTrack() {
    flag = true;
    $('#warpFace').show();
    $('#faceVideo').show();

    tracker = new tracking.ObjectTracker(['face', 'eye']);
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);
    trackerTask = tracking.track('#faceVideo', tracker, { camera: true });
    trackerTask.run();

    tracker.on('track', function(event) {
        context.clearRect(0, 0, faceCanvas.width, faceCanvas.height);

        event.data.forEach(function(rect) {
            if (!rect.width || !rect.height) {
                return false;
            }
            if (rect.width < facelimite || rect.height < facelimite) {
                return false;
            }

            if (rect.x > canvasWidth - faceRadius || rect.x < faceRadius) {
                return false;
            }

            drawFace(rect);

            // setTimeout(function() {
            //     saveFace(rect);
            // }, 2000);
        });
    });
}

// 识别并标出人脸
function drawFace(rect) {
    context.strokeStyle = '#004FE2';
    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    context.lineWidth = 1;
    context.font = '11px Helvetica';
    context.fillStyle = '#00CEF9';
    context.fillText(
        'x: ' + rect.x + 'px',
        rect.x + rect.width + 5,
        rect.y + 11
    );
    context.fillText(
        'y: ' + rect.y + 'px',
        rect.x + rect.width + 5,
        rect.y + 22
    );
}

// 保存并截取人脸
function saveFace(rect) {
    if (!flag) {
        return;
    }
    flag = false;
    trackerTask.stop();
    // 接收截取照片的事件
    socket.on('clientCaptureSnapshot', function(data) {
        // 截取照片
        // todo
        console.log('抓取照片');
        saveFace(rect);
    });
    $('#faceVideo').hide();
    faceSuc(rect);
}

// 对人脸照片进行处理
function faceSuc(rect) {
    if (faceVideo.readyState === faceVideo.HAVE_ENOUGH_DATA) {
        try {
            context.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
            context.drawImage(
                faceVideo,
                0,
                0,
                canvasWidth,
                canvasHeight
            );
            // circleImg(
            //     context,
            //     faceVideo,
            //     rect.x - facelimite * 2.88,
            //     rect.y - facelimite * 1.3,
            //     $(window).width() / 4 - faceRadius,
            //     $(window).height() / 4 - faceRadius,
            //     faceRadius
            // );
            $('#faceText1').show();
        } catch (err) {
            console.log(err);
        }
    }
}

// 画出圆形图片
function circleImg(ctx, img, sx, sy, x, y, r) {
    ctx.save();
    var d = 2 * r;
    var cx = x + r;
    var cy = y + r;
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(img, x, y, d, d * 0.89);
    // ctx.drawImage(img, sx, sy, d, d, x, y, d, d);
    ctx.restore();
}

// 展示识别结果信息
function showFaceRes(rect) {
    // setTimeout(function() {
    //     faceTrack();
    // }, 2000);
}

// 接收服务端传回的 关闭 人脸识别弹层指令
socket.on('clientCloseFaceScanLayer', function(data){
    // 关闭人脸识别弹层
    // todo
    console.log('关闭人脸识别');
    context.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
    flag = false;
    trackerTask.stop();
    $('#warpFace').hide();
    $('#faceVideo').hide();
    $('#faceText1').hide();
})

//动画处理
var rander = function() {
    requestAnimationFrame(rander);
};

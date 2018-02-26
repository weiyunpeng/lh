var canvasWidth = $(window).width() / 2;
var canvasHeight = $(window).height() / 2;

var faceWidth = 200;
var faceHight = 200;

var faceVideo = document.getElementById('faceVideo');
var faceCanvas = document.getElementById('faceCanvas');
var context = faceCanvas.getContext('2d');

var templateImageData;

var flag = true;

faceCanvas.width = canvasWidth;
faceCanvas.height = canvasHeight;
faceVideo.width = canvasWidth;
faceVideo.height = canvasHeight;

// 识别人脸
// trackerTask.stop(); // Stops the tracking
// trackerTask.run(); // Runs it again anytime
var tracker = new tracking.ObjectTracker('face');
tracker.setInitialScale(1);
tracker.setStepSize(2);
tracker.setEdgesDensity(0.1);

var trackerTask = tracking.track('#faceVideo', tracker, { camera: true });
tracker.on('track', function(event) {
    context.clearRect(0, 0, faceCanvas.width, faceCanvas.height);

    event.data.forEach(function(rect) {
        context.strokeStyle = '#004FE2';
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.lineWidth = 1;
        // context.font = '11px Helvetica';
        // context.fillStyle = '#00CEF9';
        // context.fillText(
        //     'x: ' + rect.x + 'px',
        //     rect.x + rect.width + 5,
        //     rect.y + 11
        // );
        // context.fillText(
        //     'y: ' + rect.y + 'px',
        //     rect.x + rect.width + 5,
        //     rect.y + 22
        // );

        setTimeout(function() {
            drawFace(rect);
        }, 2000);
    });
});

// 保存并截取人脸
function drawFace(rect) {
    if (!flag) {
        return;
    }
    flag = false;
    trackerTask.stop();
    $('#faceVideo').hide();
    if (faceVideo.readyState === faceVideo.HAVE_ENOUGH_DATA) {
        try {
            context.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
            context.drawImage(
                faceVideo,
                $(window).width() / 4 - faceWidth/2,
                $(window).height() / 4 - faceHight/2,
                faceWidth,
                faceHight
            );
        } catch (err) {}
    }
}

// 识别成功
function faceSuc() {}

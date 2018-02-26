var canvasWidth = $(window).width()/2;
var canvasHeight = $(window).height()/2;

var faceVideo = document.getElementById('faceVideo');
var faceCanvas = document.getElementById('faceCanvas');
var context = faceCanvas.getContext('2d');

faceCanvas.width = canvasWidth;
faceCanvas.height = canvasHeight;
faceVideo.width = canvasWidth;
faceVideo.height = canvasHeight;

// var tracker = new tracking.ColorTracker();
var tracker = new tracking.ObjectTracker('face');
tracker.setInitialScale(4);
tracker.setStepSize(2);
tracker.setEdgesDensity(0.1);

tracking.track('#faceVideo', tracker, { camera: true });
tracker.on('track', function(event) {
    context.clearRect(0, 0, faceCanvas.width, faceCanvas.height);

    event.data.forEach(function(rect) {
        context.strokeStyle = '#004FE2';
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.lineWidth = 2;
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
    });
});

// 保存并截取人脸
function saveFace(){

}
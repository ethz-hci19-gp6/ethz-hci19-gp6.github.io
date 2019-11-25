/*
Mouse pos indicator
*/
var mousePos = new Path.Circle(new Point(20, 20), 15);
mousePos.fillColor = 'black'
mousePos.opacity = 0.2

var mouseClick = new Path.Circle(new Point(20, 20), 5);
mouseClick.fillColor = 'black'
mouseClick.opacity = 0

function onMouseMove(event) {
	mousePos.position = event.point;
}
function onMouseDown(event) {
    mouseClick.opacity = 0.5
    // mouseClick.radius = 40
    mouseClick.position = event.point
    mouseClick.onFrame = function(event) {
        if (mouseClick.opacity > 0.01) {
            mouseClick.opacity -= 0.01
        } else {
            mouseClick.opacity = 0
        }
    }
}

// Create a Paper.js Path to draw a line into it:
var path = new Path();
// Give the stroke a color
path.strokeColor = 'black';
var start = new Point(100, 100);
// Move to start and draw a line from there
path.moveTo(start);
// Note the plus operator on Point objects.
// PaperScript does that for us, and much more!
path.lineTo(start + [ 100, -50 ]);

var mp = new Path();
mp.strokeColor = 'black';
var mpoi = new Point(10, 20);
mp.add(mpoi);
var mpoi = new Point(200, 20);
mp.add(mpoi);
var mpoi = new Point(200, 300);
mp.add(mpoi);

var rect = new Path.Rectangle(new Point(20,20), new Point(80, 80));
rect.strokeColor = 'black';
rect.fillColor = 'black';

var text = new PointText(new Point(200, 50));
text.justification = 'center';
text.fillColor = 'black';
text.content = 'The contents of the point text';
text.visible = false;


rect.onMouseEnter = function() {
    text.visible = true;
}
rect.onMouseLeave = function() {
    text.visible = false;
}



var cc = new Path.Circle(
    {
        center: view.center,
        radius: 30,
        strokeColor: 'black'
    }
);

function onResize(event) {
    cc.position = view.center;
    path.position = view.center;
}

/*
Animated star example
*/
// var layer = project.activeLayer;

// var values = {
//     count: 34,
//     points: 32
// };

// for (var i = 0; i < values.count; i++) {
//     var path = new Path({
//         fillColor: i % 2 ? 'red' : 'black',
//         closed: true
//     });

//     var offset = new Point(20 + 10 * i, 0);
//     var l = offset.length;
//     for (var j = 0; j < values.points * 2; j++) {
//         offset.angle += 360 / values.points;
//         var vector = offset.normalize(l * (j % 2 ? 0.1 : -0.1));
//         path.add(offset + vector);
//     }
//     path.smooth({ type: 'continuous' });
//     layer.insertChild(0, new Group({
//         children: [path],
//         applyMatrix: false
//     }));
// }

// function onFrame(event) {
//     for (var i = 0; i < values.count; i++) {
//         var item = layer.children[i];
//         var angle = (values.count - i) * Math.sin(event.count / 128) / 10;
//         item.rotate(angle);
//     }
// }

// // Reposition the paths whenever the window is resized:
// function onResize(event) {
//     layer.position = view.center;
// }
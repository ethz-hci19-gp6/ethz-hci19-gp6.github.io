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
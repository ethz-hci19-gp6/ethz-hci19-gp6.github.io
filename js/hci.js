$.getJSON("configs/P1VA.json", function(conf) {

var NodeConfig = conf["nodes"];
var Links = conf["links"];

console.log(NodeConfig);

/*
Mouse pos indicator
*/
var mousePos = new Path.Circle(new Point(20, 20), 15);
mousePos.fillColor = 'white';
var mousePosOpacity = 0.2;
mousePos.opacity = mousePosOpacity;
function onMouseMove(event) {
    mousePos.position = event.point;
}

var mouseClick = new Path.Circle(new Point(20, 20), 5);
mouseClick.fillColor = 'white';
mouseClick.opacity = 0;

function onMouseDown(event) {
    mouseClick.opacity = 0.7
    // mouseClick.radius = 40
    mouseClick.position = event.point
    mouseClick.onFrame = function(event) {
        if (mouseClick.opacity > 0.02) {
            mouseClick.opacity -= 0.02
        } else {
            mouseClick.opacity = 0
        }
    }
}

var toggleMousePos = new Path.Rectangle(
    new Point(0,0), new Point(180, 16), new Size(2, 2));
toggleMousePos.fillColor = 'white';
var togglwMouseText = new PointText(new Point(2, 12));
togglwMouseText.fillColor = 'black';
togglwMouseText.content = 'Toggle Mouse Position Indicator';

var toggleMousePosGroup = new Group([toggleMousePos, togglwMouseText]);
toggleMousePosGroup.onMouseDown = function() {
    if (mousePos.opacity > 0) {
        mousePos.opacity = 0;
    } else {
        mousePos.opacity = mousePosOpacity;
    }
}


/*
testing
*/
// var rect = new Path.Rectangle(new Point(40,40), new Point(80, 80), new Size(10, 10));
// rect.strokeColor = 'white';
// rect.fillColor = 'white';
// var rext = new PointText(new Point(60, 167));
// rext.justification = 'center';
// rext.fillColor = 'white';
// rext.content = "ABCDEFG";
// rext.fontSize = 20;
// var tg = new Group([rect, rext])


/*
NODE
*/
var node = new Path.Rectangle(new Point(40,40), new Point(80, 80), new Size(10, 10));
// node.strokeColor = 'white';
node.fillColor = 'white';

var nodeText = new PointText(new Point(60, 67));
nodeText.justification = 'center';
nodeText.fillColor = 'white';
nodeText.content = "A";
nodeText.fontSize = 20;
nodeText.fontWeight = "bold";

var nodeGroup = new Group([node, nodeText]);
nodeGroup.scale(2);
nodeGroup.translate({x: 50, y: 100});
nodeGroup.visible = false;

/*
MENU
*/
var x = 80;
var y = 198;
var l = 200;
var h = 40;

var menuBar = new Path.Rectangle(new Point(x, y), new Point(x+l, y+h));
menuBar.strokeColor = 'white';
menuBar.fillColor = 'black';
var menuText = new PointText(new Point(x+l/2, y+h/2+4));
menuText.justification = 'center';
menuText.fillColor = 'white';
menuText.content = 'Reachability';
menuText.fontSize = 16
var menuItem = new Group([menuBar, menuText]);

var menuGroup = new Group([menuItem]);
var menuItemNum = 4
var menuTextList = ["Isolation", "Waypoint", "Load Balancing"]
for (var i = 1; i < menuItemNum; i++) {
    var menu = menuItem.clone().translate({x: 0, y: h*i});
    menu.children[1].content = menuTextList[i-1]
    menuGroup.addChild(menu);
}
menuGroup.visible = false;

function onMenuItemEnter(event) {
    this.children[0].fillColor = 'yellow';
    this.children[1].fillColor = 'black';
    document.body.style.cursor = 'pointer';
}
function onMenuItemEnter2(event) {
    this.children[0].fillColor = 'grey';
    this.children[1].fillColor = 'black';
    document.body.style.cursor = 'not-allowed';
}
function onMenuItemLeave(event) {
    this.children[0].fillColor = 'black';
    this.children[1].fillColor = 'white';
    document.body.style.cursor = 'default';
}

// Annotation 
var annoBar = new Path.Rectangle(new Point(10, 80), new Point(210, 120));
annoBar.fillColor = 'white';
annoBar.opacity = 0.65
var annoText = new PointText(new Point(110, 104));
annoText.justification = 'center';
annoText.fillColor = 'black';
annoText.content = 'anno: ';
annoText.fontSize = 16
var annoAddress = new Group([annoBar, annoText]);
annoAddress.visible = false;

var fullNode = new Group([nodeGroup, menuGroup, annoAddress])
// var fullNode = new Group([nodeGroup, menuGroup])
function onFullNodeEnter(event) {
    this.children[1].visible = true;
    this.children[2].visible = true;
}
function onFullNodeLeave(event) {
    this.children[1].visible = false;
    this.children[2].visible = false;
}

function onFullNodeMenuClick(event) {
    // console.log(this);
    this.parent.parent.parent.firstChild.visible = 
        !this.parent.parent.parent.firstChild.visible;
}

/*
GUI Graph
*/
var cp = view.center

var NodeList = new Group([]);
for (var i = 0; i < NodeConfig.length; i++) {
    name = NodeConfig[i]["name"];
    isHealthy = NodeConfig[i]["healthy"];
    prefix = NodeConfig[i]["prefix"];
    n = fullNode.clone();
    n.children[0].visible = true;
    // pos = (cp + {x:0, y:-320}).rotate(360/NodeConfig.length * i, cp) + {x:0, y:-50};
    pos = (cp + {x:0, y:-320}).rotate(360/NodeConfig.length * i, cp);
    n.position = pos;

    n.onMouseEnter = onFullNodeEnter;
    n.onMouseLeave = onFullNodeLeave; 
    n.children[0].children[1].content = name
    n.children[2].children[1].content = "Prefix: " + prefix;
    if (isHealthy) {
        n.children[0].children[0].fillColor = "green";
    } else {
        n.children[0].children[0].fillColor = "red";
    }
    for (var j = 0; j < n.children[1].children.length; j++) {
        if (j == 0) {
            n.children[1].children[j].onMouseEnter = onMenuItemEnter;
        } else {
            n.children[1].children[j].onMouseEnter = onMenuItemEnter2;
        }
        n.children[1].children[j].onMouseLeave = onMenuItemLeave;
    }

    NodeList.addChild(new Group([n]));
}

/*
Interfaces
*/
function interfaceTo(from, to) {
    return from + (to - from)/3;
}

function interfaceAnnotationPos(from, to) {
    return (interfaceTo(from, to) + from) / 2;
}

for (var i = 0; i < NodeConfig.length; i++) {
    var nodeWithInterface = NodeList.children[i]
    var lstInterface = new Group([])
    interfaces = NodeConfig[i]["interfaces"]
    for (var j = 0; j < interfaces.length; j++) {
        src = NodeList.children[i].position
        dst = NodeList.children[interfaces[j]["neighbour"]].position
        lstInterface.addChild(new Path.Line({
            from: src,
            to: interfaceTo(src, dst),
            strokeColor: 'yellow',
            strokeWidth: 10,
        }))
        var anno = annoAddress.clone()
        // anno.position = interfaceAnnotationPos(src, dst);
        anno.position = interfaceTo(src, dst);
        anno.children[0].scale(0.8, 1.4)
        intf = interfaces[j]["intf_name"];
        dst = interfaces[j]["dst"];
        anno.children[1].content = "Interface: eth" + intf + "\n"
            + "Destination(s): " + dst.join();
        anno.children[1].translate(0, -8);
        anno.visible = true;
        lstInterface.addChild(anno);
    }
    lstInterface.visible = false;

    nodeWithInterface.addChild(lstInterface);
    nodeWithInterface.lastChild.sendToBack();
    //  interface+node node+menu menu     first item
    nodeWithInterface.lastChild.children[1].firstChild.onMouseDown = onFullNodeMenuClick;
}

/*
LINKS
*/
var t1 = toggleMousePosGroup.clone().translate(100, 100)
var t2 = toggleMousePosGroup.clone().translate(100, 140)
var t3 = toggleMousePosGroup.clone().translate(100, 180)

// var expectedGroup = new Group([t1])
var l1 = new Group([])
for (var i = 0; i < Links["expected"].length; i++) {
    l1.addChild(new Path.Line({
        from: NodeList.children[Links["expected"][i][0]].position,
        to: NodeList.children[Links["expected"][i][1]].position,
        strokeColor: 'blue',
        strokeWidth: 5,
    }))
    l1.lastChild.dashArray= [13, 10]
}
// var abnormalGroup = new Group([t2])
var l2 = new Group([])
for (var i = 0; i < Links["abnormal"].length; i++) {
    l2.addChild(new Path.Line({
        from: NodeList.children[Links["abnormal"][i][0]].position,
        to: NodeList.children[Links["abnormal"][i][1]].position,
        strokeColor: 'red',
        strokeWidth: 5,
    }))
}

// var normalGroup = new Group([t3])
var l3 = new Group([])
for (var i = 0; i < Links["normal"].length; i++) {
    l3.addChild(new Path.Line({
        from: NodeList.children[Links["normal"][i][0]].position,
        to: NodeList.children[Links["normal"][i][1]].position,
        strokeColor: 'green',
        strokeWidth: 5,
    }))
}
t1.onMouseDown = function() {
    l1.visible = !l1.visible;
}
t2.onMouseDown = function() {
    l2.visible = !l2.visible;
}
t3.onMouseDown = function() {
    l3.visible = !l3.visible;
}

var lstToggles = [t1, t2, t3]
var lstLinks = [l1, l2, l3]
var lstToggleText = ["expected", "abnormal", "normal"]
function onToogleEnter(event) {
    document.body.style.cursor = "pointer";
    this.opacity = 1
}
function onToogleLeave(event) {
    document.body.style.cursor = "default";
    this.opacity = 0.5
}
for (var i = 0; i < lstToggles.length; i++) {
    lstToggles[i].opacity = 0.5;
    lstToggles[i].lastChild.content = "Toggle " + lstToggleText[i] + " links";
    lstToggles[i].onMouseEnter = onToogleEnter;
    lstToggles[i].onMouseLeave = onToogleLeave;
    lstLinks[i].sendToBack();
}

function onResize(event) {
    NodeList.position = view.center + {x:0, y:-50}
    l1.position = view.center + {x:0, y:-50}
    l2.position = view.center + {x:0, y:-50}
    l3.position = view.center + {x:0, y:-211}
}
});
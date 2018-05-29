function random() {
    return {x1: Math.random() * 800, y1: Math.random() * 500};
}
function intersects( rectangle1, rectangle2 ) {
    if ( rectangle1.y1 < rectangle2.y2
        && rectangle1.y2 > rectangle2.y1
        && rectangle1.x2 > rectangle2.x1
        && rectangle1.x1 < rectangle2.x2){
        return true;
    }
}
function rectangle3(rectangle1, rectangle2) {
    let width = Math.max(0, Math.min(rectangle1.x2, rectangle2.x2) - Math.max(rectangle1.x1, rectangle2.x1));
    let height = Math.max(0, Math.min(rectangle1.y2, rectangle2.y2) - Math.max(rectangle1.y1, rectangle2.y1));
    return [width, height]
}
function createRectangle(rectangle) {
    let Min_X = rectangle.x1;
    let Min_Y = rectangle.y1;
    let Max_X = rectangle.x2;
    let Max_Y = rectangle.y2;

    rectangle.x3 = Max_X;
    rectangle.y3 = Min_Y;
    rectangle.x4 = Min_X;
    rectangle.y4 = Max_Y;
    return rectangle;
}

function drawEllipse(ctx, centerX, centerY, radiusEllipse_X, radiusEllipse_Y) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(centerX, centerY);
    ctx.scale(radiusEllipse_X / radiusEllipse_Y, 1);
    ctx.arc(0, 0, radiusEllipse_Y, 0, Math.PI * 2, true);
    ctx.restore();
    ctx.closePath();
    ctx.stroke();
}

function randomIntegerX(x1, x2) {
    let randX = x1 - 0.5 + Math.random() * (x2 - x1 + 1);
    randX = Math.round(randX);
    return randX;
}
function randomIntegerY(y1, y2) {
    let randY = y1 - 0.5 + Math.random() * (y2 - y1 + 1);
    randY = Math.round(randY);
    return randY;
}

function checkpoint (drawX, drawY, centerX, centerY, radiusEllipse_X, radiusEllipse_Y) {
    let result = ((drawX - centerX)**2)/radiusEllipse_X**2 + ((drawY - centerY)**2)/radiusEllipse_Y**2;
    return result < 1;
}

function normalization(point1, point2) {
    return point1.x1 < point2.x1 && point1.y1 < point2.y1;
}
function crossing() {
    let flag = true;
    while (flag) {
        let first = random();
        let second = random();
        let result;
        if (normalization(first, second) === true) {
            result = {x1: first.x1, y1: first.y1, x2: second.x1, y2: second.y1};
            flag = false;
            return createRectangle(result);
        }
    }
}
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let rectangle1 = crossing();
let rectangle2 = crossing();
plotRectangle (rectangle1, rectangle2);
function plotRectangle(rectangle1, rectangle2) {
    let param;
    function compareNumeric(a, b) {
        if(a > b) return 1;
        if(a < b) return -1
    }
    let arr_x = [rectangle1.x1, rectangle1.x2, rectangle2.x1, rectangle2.x2];
    let arr_y = [rectangle1.y1, rectangle1.y2, rectangle2.y1, rectangle2.y2];
    let set_x = arr_x.sort(compareNumeric);
    let set_y = arr_y.sort(compareNumeric);
    if(intersects(rectangle1, rectangle2) === true) {
        param = rectangle3(rectangle1, rectangle2);
        let radiusEllipse_X = param[0]/2;
        let radiusEllipse_Y = param[1]/2;
        let centerX = set_x[1] + radiusEllipse_X;
        let centerY =  set_y[1] + radiusEllipse_Y;
        drawEllipse(ctx, centerX, centerY, radiusEllipse_X, radiusEllipse_Y);
        const array = [];
        while (array.length !== 10) {
            let drawX = randomIntegerX(set_x[1], set_x[2]);
            let drawY = randomIntegerY(set_y[1], set_y[2]);
            if (checkpoint(drawX, drawY, centerX, centerY, radiusEllipse_X, radiusEllipse_Y) === true) {
                array.push({x: drawX, y: drawY});
            }
        }
        for (let i = 0; i < array.length; i++) {
            ctx.fillRect(array[i].x, array[i].y, 2,2);
        }
        console.log(array);
    }
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";
    ctx.lineTo(rectangle1.x1, rectangle1.y1);
    ctx.lineTo(rectangle1.x3, rectangle1.y3);
    ctx.lineTo(rectangle1.x2, rectangle1.y2);
    ctx.lineTo(rectangle1.x4, rectangle1.y4);
    ctx.lineTo(rectangle1.x1, rectangle1.y1);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";
    ctx.lineTo(rectangle2.x1, rectangle2.y1);
    ctx.lineTo(rectangle2.x3, rectangle2.y3);
    ctx.lineTo(rectangle2.x2, rectangle2.y2);
    ctx.lineTo(rectangle2.x4, rectangle2.y4);
    ctx.lineTo(rectangle2.x1, rectangle2.y1);
    ctx.stroke();
}

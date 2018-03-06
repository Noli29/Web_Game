// var Application = PIXI.Application,
//     loader = PIXI.loader,
//     TextureCache = PIXI.utils.TextureCache,
//     resources = PIXI.loader.resources,
//     Sprite = PIXI.Sprite,
//     Graphics = PIXI.Graphics,
//     Text = PIXI.Text,
//     TextStyle = PIXI.TextStyle;
//
// var app = new Application({
//         antialias: true,
//         transparent: false,
//         resolution: 1,
//         backgroundColor: 0x061639
//     }
// );
// app.renderer.view.style.position = "absolute";
// app.renderer.view.style.display = "block";
// app.renderer.autoResize = true;
// app.renderer.resize(window.innerWidth, window.innerHeight);
// document.body.appendChild(app.view);
//
// //load an image and run the `setup` function when it's done
//
// loader
//     .add("../app/images/all.json")
//     .load(setup);
//
// var dungeon, human, carrot, id, state, box;
//
// function setup() {
//     var dungeonTexture = TextureCache["dungeon.png"];
//     dungeon = new Sprite(dungeonTexture);
//     app.stage.addChild(dungeon);
//
//     box = new PIXI.Graphics();
//     box.beginFill(0xCCFF99);
//     box.drawRect(0, 0, 64, 64);
//     box.endFill();
//     box.x = 120;
//     box.y = 96;
//     app.stage.addChild(box);
//
//
//     human = new Sprite(
//         resources["../app/images/all.json"].textures["human.png"]
//     );
//     //human.x = 68;
//     human.y = 96;
//     human.vx = 0;
//     human.vy = 0;
//
//     human.y = app.stage.height / 1 - human.height / 1;
//     human.x = app.stage.width - human.width - 650;
//     app.stage.addChild(human);
//
//     if (hitTestRectangle(human, carrot)) {
//         console.log("yes");
//     } else {
//         console.log("no");
//     }
//
//     id = PIXI.loader.resources["../app/images/all.json"].textures;
//
//
//     carrot = new Sprite(id["carrot.png"]);
//     carrot.x = app.stage.width - carrot.width - 650;
//     carrot.y = app.stage.height / 2 - carrot.height / 4;
//     app.stage.addChild(carrot);
//
//
//     var left = keyboard(37),
//         up = keyboard(38),
//         right = keyboard(39),
//         down = keyboard(40);
//
//     left.press = () => {
//         human.vx = -5;
//         human.vy = 0;
//     };
//
//     left.release = () => {
//         if (!right.isDown && human.vy === 0) {
//             human.vx = 0;
//         }
//     };
//
//     //Up
//     up.press = () => {
//         human.vy = -5;
//         human.vx = 0;
//     };
//     up.release = () => {
//         if (!down.isDown && human.vx === 0) {
//             human.vy = 0;
//         }
//     };
//
//     //Right
//     right.press = () => {
//         human.vx = 5;
//         human.vy = 0;
//     };
//     right.release = () => {
//         if (!left.isDown && human.vy === 0) {
//             human.vx = 0;
//         }
//     };
//
//     //Down
//     down.press = () => {
//         human.vy = 5;
//         human.vx = 0;
//     };
//     down.release = () => {
//         if (!up.isDown && human.vx === 0) {
//             human.vy = 0;
//         }
//     };
//
//     state = play;
//     app.ticker.add(delta => gameLoop(delta));
// }
//
//
//
//
// function gameLoop(delta){
//     state(delta);
// }
//
// function play(delta) {
//     human.x += human.vx;
//     human.y += human.vy
// }
//
// function keyboard(keyCode) {
//     var key = {};
//     key.code = keyCode;
//     key.isDown = false;
//     key.isUp = true;
//     key.press = undefined;
//     key.release = undefined;
//     key.downHandler = event => {
//         if (event.keyCode === key.code) {
//             if (key.isUp && key.press) key.press();
//             key.isDown = true;
//             key.isUp = false;
//         }
//         event.preventDefault();
//     };
//
//     key.upHandler = event => {
//         if (event.keyCode === key.code) {
//             if (key.isDown && key.release) key.release();
//             key.isDown = false;
//             key.isUp = true;
//         }
//         event.preventDefault();
//     };
//
//     window.addEventListener(
//         "keydown", key.downHandler.bind(key), false
//     );
//     window.addEventListener(
//         "keyup", key.upHandler.bind(key), false
//     );
//     return key;
// }
//
// function hitTestRectangle(r1, r2) {
//     var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
//     hit = false;
//     r1.centerX = r1.x + r1.width / 2;
//     r1.centerY = r1.y + r1.height / 2;
//     r2.centerX = r2.x + r2.width / 2;
//     r2.centerY = r2.y + r2.height / 2;
//
//     r1.halfWidth = r1.width / 2;
//     r1.halfHeight = r1.height / 2;
//     r2.halfWidth = r2.width / 2;
//     r2.halfHeight = r2.height / 2;
//
//     vx = r1.centerX - r2.centerX;
//     vy = r1.centerY - r2.centerY;
//
//     combinedHalfWidths = r1.halfWidth + r2.halfWidth;
//     combinedHalfHeights = r1.halfHeight + r2.halfHeight;
//
//     if (Math.abs(vx) < combinedHalfWidths) {
//         if (Math.abs(vy) < combinedHalfHeights) {
//             hit = true;
//         } else {
//             hit = false;
//         }
//     } else {
//         hit = false;
//     }
//     return hit;
// };


var canvas = $("<canvas id='canvas' width='320' height='240'></canvas>");

var mousex = 160,
    mousey = 120;

var finished = false;

var score = 0,
    coinslost = 0;

canvas.appendTo('#center');

var ctx = canvas.get(0).getContext("2d");

var keydown = [];

for(var i=0; i<128; i++)
{
    keydown[i] = false;
}

setInterval(function(){
    update();
    draw();
}, 1000/60);

setInterval(function(){
    if(Math.random()>0.7)
    {
        addCoin();
    }
}, 1000/30);

var player = {
    x: 32,
    y: 120,
    width: 32,
    height: 32,
    yspeed: 0
};

var gravity = .5;

function draw()
{
    if (finished==false)
    {
        ctx.clearRect(0,0,320,240);

        coins.forEach(function(coin){
            if (coin.active)
            {
                coin.draw();
            }
        });

        ctx.fillStyle = "red";
        ctx.fillRect(player.x-(player.width/2), player.y-(player.height/2), player.width, player.height);

        ctx.fillStyle = "black";
        ctx.fillText("Score: " + score, 2, 10);
        ctx.fillText("Coins Lost: " + coinslost, 2, 22);
    }
    else
    {
        ctx.clearRect(0,0,320,240);
        ctx.fillText("You won with " + finishedcoins + " coins lost!", 80, 120);
    }

}

var finishedcoins;

function update()
{
    if (finished)
    {
        exit;
    }
    if (score>=100)
    {
        finished = true;
        finishedcoins = coinslost;
    }
    gravity+=.5;
    player.y += gravity;
    player.y -= player.yspeed;

    if (player.y>240-16)
    {
        gravity = 0;
        player.yspeed = 0;
        player.y=240-16;
    }

    coins.forEach(function(coin){
        if(coin.active)
        {
            coin.update();
        }
    });

    if (keydown[32])
    {
        if (gravity==0)
        {
            player.yspeed = 10;
        }
    }

}

var coins = [];

function addCoin()
{
    var coin = {
        active: true,
        x: Math.random()*320,
        y: -16,
        width: 8,
        height: 16,
        gravity: 0.5,
        draw: function(){

            ctx.fillStyle = "yellow";
            ctx.fillRect(this.x, this.y, this.width, this.height);

        },

        update: function(){

            this.gravity+=.5;
            this.y+=this.gravity;

            if (this.gravity>3)
            {
                this.gravity = 3;
            }

            if(collides(this,player))
            {
                score++;
                this.active = false;
            }

            if(this.y>240)
            {
                this.active = false;
                coinslost++;
            }

        }
    };

    coins.push(coin);

}

$(document).keypress(function(event){
    keydown[event.which] = true;
});

$(document).keyup(function(event){
    keydown[event.which] = false;
});

function collides(a, b) {

    if(b==player)
    {
        b = {

            x: player.x-16,
            y: player.y-16,
            width: player.width,
            height: player.height
        }
    }

    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

$('#canvas').mousedown(function(e){
    if (gravity==0)
    {
        player.yspeed = 12;
    }

    addCoin();
});

$("#canvas").mousemove(function(e){

    mousex = e.pageX-this.offsetLeft;
    mousey = e.pageY-this.offsetTop;

    player.x = e.pageX-this.offsetLeft;

});
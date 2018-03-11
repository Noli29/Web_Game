var Application = PIXI.Application,
    loader = PIXI.loader,
    TextureCache = PIXI.utils.TextureCache,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle;

var app = new Application({
        antialias: true,
        transparent: false,
        resolution: 1,
        backgroundColor: 0x061639
    }
);
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
document.body.appendChild(app.view);


loader
    .add("../app/images/all.json")
    .load(setup);

var dungeon, human, carrot, apple, blueberries, cake, cheese, grapes, lemon, orange, pineapple, raspberry, strawberry, watermelon, id, state, message;

function setup() {
    var dungeonTexture = TextureCache["dungeon.png"];
    dungeon = new Sprite(dungeonTexture);
    app.stage.addChild(dungeon);

    id = PIXI.loader.resources["../app/images/all.json"].textures;

    carrot = new Sprite(id["carrot.png"]);
    carrot.vx = 0;
    carrot.vy = 0;
    carrot.x = app.stage.width - carrot.width - 650;
    carrot.y = app.stage.height / 6 - carrot.height / 6;
    app.stage.addChild(carrot);

    apple = new Sprite(id["apple.png"]);
    apple.vx = 0;
    apple.vy = 0;
    apple.x = app.stage.width - apple.width - 650;
    apple.y = app.stage.height / 2 - apple.height / 2;
    app.stage.addChild(apple);

    blueberries = new Sprite(id["blueberries.png"]);
    blueberries.vx = 0;
    blueberries.vy = 0;
    blueberries.x = app.stage.width - blueberries.width - 450;
    blueberries.y = app.stage.height / 2 - blueberries.height / 4;
    app.stage.addChild(blueberries);

    cake = new Sprite(id["cake.png"]);
    cake.vx = 0;
    cake.vy = 0;
    cake.x = app.stage.width - cake.width - 850;
    cake.y = app.stage.height / 2 - cake.height / 6;
    app.stage.addChild(cake);


    cheese = new Sprite(id["cheese.png"]);
    cheese.vx = 0;
    cheese.vy = 0;
    cheese.x = app.stage.width - cheese.width - 850;
    cheese.y = app.stage.height / 6 - cheese.height / 6;
    app.stage.addChild(cheese);


    grapes = new Sprite(id["grapes.png"]);
    grapes.vx = 0;
    grapes.vy = 0;
    grapes.x = app.stage.width - grapes.width - 50;
    grapes.y = app.stage.height / 2 - grapes.height / 2;
    app.stage.addChild(grapes);


    lemon = new Sprite(id["lemon.png"]);
    lemon.vx = 0;
    lemon.vy = 0;
    lemon.x = app.stage.width - lemon.width - 150;
    lemon.y = app.stage.height / 1 - lemon.height / 1;
    app.stage.addChild(lemon);


    orange = new Sprite(id["orange.png"]);
    orange.vx = 0;
    orange.vy = 0;
    orange.x = app.stage.width - orange.width - 350;
    orange.y = app.stage.height / 4 - orange.height / 4;
    app.stage.addChild(orange);

    pineapple = new Sprite(id["pineapple.png"]);
    pineapple.vx = 0;
    pineapple.vy = 0;
    pineapple.x = app.stage.width - pineapple.width - 950;
    pineapple.y = app.stage.height / 1 - pineapple.height / 1;
    app.stage.addChild(pineapple);

    raspberry = new Sprite(id["raspberry.png"]);
    raspberry.vx = 0;
    raspberry.vy = 0;
    raspberry.x = app.stage.width - raspberry.width - 1050;
    raspberry.y = app.stage.height / 6 - raspberry.height / 6;
    app.stage.addChild(raspberry);

    strawberry = new Sprite(id["strawberry.png"]);
    strawberry.vx = 0;
    strawberry.vy = 0;
    strawberry.x = app.stage.width - strawberry.width - 1050;
    strawberry.y = app.stage.height / 1 - strawberry.height / 1;
    app.stage.addChild(strawberry);


    watermelon = new Sprite(id["watermelon.png"]);
    watermelon.vx = 0;
    watermelon.vy = 0;
    watermelon.x = app.stage.width - lemon.width - 150;
    watermelon.y = app.stage.height / 6 - lemon.height / 16;
    app.stage.addChild(watermelon);

    human = new Sprite(
        resources["../app/images/all.json"].textures["human.png"]
    );

    human.y = 96;
    human.vx = 0;
    human.vy = 0;

    human.y = app.stage.height / 1 - human.height / 1;
    human.x = app.stage.width - human.width - 650;
    app.stage.addChild(human);


    var left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40);

    left.press = () => {
        human.vx = -5;
        human.vy = 0;
    };

    left.release = () => {
        if (!right.isDown && human.vy === 0) {
            human.vx = 0;
        }
    };

    //Up
    up.press = () => {
        human.vy = -5;
        human.vx = 0;
    };
    up.release = () => {
        if (!down.isDown && human.vx === 0) {
            human.vy = 0;
        }
    };

    //Right
    right.press = () => {
        human.vx = 5;
        human.vy = 0;
    };
    right.release = () => {
        if (!left.isDown && human.vy === 0) {
            human.vx = 0;
        }
    };

    //Down
    down.press = () => {
        human.vy = 5;
        human.vx = 0;
    };
    down.release = () => {
        if (!up.isDown && human.vx === 0) {
            human.vy = 0;
        }
    };


    var style = new TextStyle({
        fontFamily: "sans-serif",
        fontSize: 18,
        fill: "white",
    });
    message = new Text("...", style);
    message.position.set(8, 8);
    app.stage.addChild(message);

    state = play;
    app.ticker.add(delta => gameLoop(delta));
}




function gameLoop(delta){
    state(delta);

    carrot.vx = -0.5;
    carrot.vy = 0.5;
    carrot.x += carrot.vx;
    carrot.y += carrot.vy;

    apple.vx = 0.5;
    apple.vy = 0.5;
    apple.x += apple.vx;
    apple.y += apple.vy;

    blueberries.vx = -0.5;
    blueberries.vy = -0.5;
    blueberries.x += blueberries.vx;
    blueberries.y += blueberries.vy;

    cake.vx = 1;
    cake.vy = 0.5;
    cake.x += cake.vx;
    cake.y += cake.vy;

    cheese.vx = 1;
    cheese.vy = 1;
    cheese.x += cheese.vx;
    cheese.y += cheese.vy;

    grapes.vx = -0.5;
    grapes.vy = -0.5;
    grapes.x += grapes.vx;
    grapes.y += grapes.vy;

    lemon.vx = 0.5;
    lemon.vy = -1;
    lemon.x += lemon.vx;
    lemon.y += lemon.vy;

    orange.vx = -1;
    orange.vy = -1;
    orange.x += orange.vx;
    orange.y += orange.vy;

    pineapple.vx = 0.5;
    pineapple.vy = 1;
    pineapple.x += pineapple.vx;
    pineapple.y += pineapple.vy;

}

function play(delta) {
    human.x += human.vx;
    human.y += human.vy;


    if (hitTestRectangle(human, carrot)) {
        carrot.tint = 0xff3300;
        for(var text = 0; text <=1; text++){
            message.text = text;
            if(message.text == 100) {
                message.text = "game over";
            }else{
                message.text == "";
            }
        }
    } else {
        carrot.tint = 0xccff99;
    }


    if (hitTestRectangle(human, apple)) {
        apple.tint = 0xff3300;
        for(var text = 0; text <=1; text++){
            message.text = text;
            if(message.text == 100) {
                message.text = "game over";
            }else{
                message.text == "";
            }
        }
    } else {
        apple.tint = 0xccff99;
    }

    if (hitTestRectangle(human, blueberries)) {
        blueberries.tint = 0xff3300;
        for(var text = 0; text <= 1; text++){
            message.text = text;
            if(message.text == 100) {
                message.text = "game over";
            }else{
                message.text == "";
            }
        }
    } else {
        blueberries.tint = 0xccff99;
    }


    if (hitTestRectangle(human, cake)) {
        cake.tint = 0xff3300;
        for(var text = 0; text <= 1; text++){
            message.text = text;
            if(message.text == 100) {
                message.text = "game over";
            }else{
                message.text == "";
            }
        }
    } else {
        cake.tint = 0xccff99;
    }


    if (hitTestRectangle(human, grapes)) {
        grapes.tint = 0xff3300;
        for(var text = 0; text <= 1; text++){
            message.text = text;
            if(message.text == 100) {
                message.text = "game over";
            }else{
                message.text == "";
            }
        }
    } else {
        grapes.tint = 0xccff99;
    }


    if (hitTestRectangle(human, lemon)) {
        lemon.tint = 0xff3300;
        for(var text = 0; text <= 1; text++){
            message.text = text;
            if(message.text == 100) {
                message.text = "game over";
            }else{
                message.text == "";
            }
        }
    } else {
        lemon.tint = 0xccff99;
    }


    if (hitTestRectangle(human, raspberry)) {
        raspberry.tint = 0xff3300;
        for(var text = 0; text <= 1; text++){
            message.text = text;
            if(message.text == 100) {
                message.text = "game over";
            }else{
                message.text == "";
            }
        }
    } else {
        raspberry.tint = 0xccff99;
    }


    if (hitTestRectangle(human, watermelon)) {
        watermelon.tint = 0xff3300;
        for(var text = 0; text <= 1; text++){
            message.text = text;
            if(message.text == 100) {
                message.text = "game over";
            }else{
                message.text == "";
            }
        }
    } else {
        watermelon.tint = 0xccff99;
    }

    if (hitTestRectangle(human, cheese)) {
        cheese.tint = 0xff3300;
        for(var text = 0; text <= 1; text++){
            message.text = text;
            if(message.text == 100) {
                message.text = "game over";
            }else{
                message.text == "";
            }
        }
    } else {
        cheese.tint = 0xccff99;
    }
}

function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    key.downHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    key.upHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}

function hitTestRectangle(r1, r2) {
    var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
    hit = false;
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    if (Math.abs(vx) < combinedHalfWidths) {
        if (Math.abs(vy) < combinedHalfHeights) {
            hit = true;
        } else {
            hit = false;
        }
    } else {
        hit = false;
    }
    return hit;
};


// var canvas = $("<canvas id='canvas' width='320' height='240'></canvas>");
//
// var mousex = 160,
//     mousey = 120;
//
// var finished = false;
//
// var score = 0,
//     coinslost = 0;
//
// canvas.appendTo('#center');
//
// var ctx = canvas.get(0).getContext("2d");
//
// var keydown = [];
//
// for(var i=0; i<128; i++)
// {
//     keydown[i] = false;
// }
//
// setInterval(function(){
//     update();
//     draw();
// }, 1000/60);
//
// setInterval(function(){
//     if(Math.random()>0.7)
//     {
//         addCoin();
//     }
// }, 1000/30);
//
// var player = resources["../app/images/all.json"].textures["human.png"];
//
// var gravity = .5;
//
// function draw()
// {
//     if (finished==false)
//     {
//         ctx.clearRect(0,0,320,240);
//
//         coins.forEach(function(coin){
//             if (coin.active)
//             {
//                 coin.draw();
//             }
//         });
//
//         ctx.fillStyle = "red";
//         ctx.fillRect(player.x-(player.width/2), player.y-(player.height/2), player.width, player.height);
//
//         ctx.fillStyle = "black";
//         ctx.fillText("Score: " + score, 2, 10);
//         ctx.fillText("Coins Lost: " + coinslost, 2, 22);
//     }
//     else
//     {
//         ctx.clearRect(0,0,320,240);
//         ctx.fillText("You won with " + finishedcoins + " coins lost!", 80, 120);
//     }
//
// }
//
// var finishedcoins;
//
// function update()
// {
//     if (finished)
//     {
//         exit;
//     }
//     if (score>=100)
//     {
//         finished = true;
//         finishedcoins = coinslost;
//     }
//     gravity+=.5;
//     player.y += gravity;
//     player.y -= player.yspeed;
//
//     if (player.y>240-16)
//     {
//         gravity = 0;
//         player.yspeed = 0;
//         player.y=240-16;
//     }
//
//     coins.forEach(function(coin){
//         if(coin.active)
//         {
//             coin.update();
//         }
//     });
//
//     if (keydown[32])
//     {
//         if (gravity==0)
//         {
//             player.yspeed = 10;
//         }
//     }
//
// }
//
// var coins = [];
//
// function addCoin()
// {
//     var coin = {
//         active: true,
//         x: Math.random()*320,
//         y: -16,
//         width: 8,
//         height: 16,
//         gravity: 0.5,
//         draw: function(){
//
//             ctx.fillStyle = "yellow";
//             ctx.fillRect(this.x, this.y, this.width, this.height);
//
//         },
//
//         update: function(){
//
//             this.gravity+=.5;
//             this.y+=this.gravity;
//
//             if (this.gravity>3)
//             {
//                 this.gravity = 3;
//             }
//
//             if(collides(this,player))
//             {
//                 score++;
//                 this.active = false;
//             }
//
//             if(this.y>240)
//             {
//                 this.active = false;
//                 coinslost++;
//             }
//
//         }
//     };
//
//     coins.push(coin);
//
// }
//
// $(document).keypress(function(event){
//     keydown[event.which] = true;
// });
//
// $(document).keyup(function(event){
//     keydown[event.which] = false;
// });
//
// function collides(a, b) {
//
//     if(b==player)
//     {
//         b = {
//
//             x: player.x-16,
//             y: player.y-16,
//             width: player.width,
//             height: player.height
//         }
//     }
//
//     return a.x < b.x + b.width &&
//         a.x + a.width > b.x &&
//         a.y < b.y + b.height &&
//         a.y + a.height > b.y;
// }
//
// $('#canvas').mousedown(function(e){
//     if (gravity==0)
//     {
//         player.yspeed = 12;
//     }
//
//     addCoin();
// });
//
// $("#canvas").mousemove(function(e){
//
//     mousex = e.pageX-this.offsetLeft;
//     mousey = e.pageY-this.offsetTop;
//
//     player.x = e.pageX-this.offsetLeft;
//
// });
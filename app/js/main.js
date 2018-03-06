//Aliases
var Application = PIXI.Application,
    loader = PIXI.loader,
    TextureCache = PIXI.utils.TextureCache,
    Rectangle = PIXI.Rectangle,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

//Create a Pixi Application
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
var stage = new PIXI.Container();
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//load an image and run the `setup` function when it's done

loader
    .add("../app/images/food.png")
    .load(setup);

//This `setup` function will run when the image has loaded
function setup() {

    //Create the `tileset` sprite from the texture
    var texture = TextureCache["../app/images/food.png"];

    //Create a rectangle object that defines the position and
    //size of the sub-image you want to extract from the texture
    //(`Rectangle` is an alias for `PIXI.Rectangle`)
    var rectangle = new Rectangle(110, 110, 13, 13);

    //Tell the texture to use that rectangular section
    texture.frame = rectangle;

    //Create the sprite from the texture
    var rocket = new Sprite(texture);

    //Position the rocket sprite on the canvas
    rocket.x = 32;
    rocket.y = 32;

    //Add the rocket to the stage
    app.stage.addChild(rocket);

    //Render the stage
    app.renderer.render(stage);
}
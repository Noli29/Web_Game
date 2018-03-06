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
    .add("../app/images/all.json")
    .load(setup);

var dungeon, human, carrot, id;

function setup() {

    //There are 3 ways to make sprites from textures atlas frames

    //1. Access the `TextureCache` directly
    var dungeonTexture = TextureCache["dungeon.png"];
    dungeon = new Sprite(dungeonTexture);
    app.stage.addChild(dungeon);

    //2. Access the texture using through the loader's `resources`:
    human = new Sprite(
        resources["../app/images/all.json"].textures["human.png"]
    );
    human.x = 68;

    //Center the explorer vertically
    human.y = app.stage.height / 2 - human.height / 2;
    app.stage.addChild(human);

    //3. Create an optional alias called `id` for all the texture atlas
    //frame id textures.
    id = PIXI.loader.resources["../app/images/all.json"].textures;

    //Make the treasure box using the alias
    carrot = new Sprite(id["carrot.png"]);
    app.stage.addChild(carrot);

    //Position the treasure next to the right edge of the canvas
    carrot.x = app.stage.width - carrot.width - 48;
    carrot.y = app.stage.height / 2 - carrot.height / 2;
    app.stage.addChild(carrot);
}
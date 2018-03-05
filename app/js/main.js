//Create a Pixi Application
var app = new PIXI.Application({
        width: 256,         // default: 800
        height: 256,        // default: 600
        antialias: true,    // default: false
        transparent: false, // default: false
        resolution: 1,      // default: 1
        backgroundColor: 0x061639
    }
)

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//load an image and run the `setup` function when it's done
PIXI.loader
    .add("images/cat.png")
    .load(setup);

//This `setup` function will run when the image has loaded
function setup() {

    //Create the cat sprite
    let cat = new PIXI.Sprite(PIXI.loader.resources["images/cat.png"].texture);

    //Add the cat to the stage
    app.stage.addChild(cat);
}
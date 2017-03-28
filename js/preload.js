var stage, preloadText, queue;
//HTML EFFECTS
document.querySelector('.logo').classList.add('transition-opacity', 'in-view');
setTimeout(function(){
    document.querySelector('.initial-text').classList.add('transition-opacity', 'in-view');
},700);
setTimeout(function(){
    document.querySelector('.logo-screen').classList.add('transition-opacity', 'out-of-view');
},2500);
setTimeout(function(){
    document.querySelector('.logo-screen').classList.add('not-displayed');
    document.querySelector('.choice-screen').classList.remove('not-displayed');
    document.querySelector('.choice-screen').classList.add('in-view');
    document.querySelector('#choiceGame').addEventListener('click',function(){
        document.querySelector('.choice-screen').classList.add('not-displayed');
        preload();
    });
},4000);


//START PRELOADING
function preload(){
    console.log("preload started");

    stage = new createjs.Stage("demoCanvas");
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
    preloadText = new createjs.Text("Loading", "100px Verdana", "#000");
    preloadText.textAlign="center";
    preloadText.textBaseline="middle";
    preloadText.x=stage.canvas.width/2;
    preloadText.y=stage.canvas.height/2;
    stage.addChild(preloadText);
    queue = new createjs.LoadQueue(true);
    queue.on('progress', queueProgress);
    queue.on('complete', queueComplete);
    queue.installPlugin(createjs.Sound);
    queue.loadManifest([
        {id:"background", src:"img/background.png"},
        {id:"explosionSprite", src:"json/explosionSprite.json"},
        {id:"moduleSprites", src:"json/moduleSprite.json"},
        {id:"modules", src:"json/modules.json"},
        {id:"cloudA", src:"img/cloud-a.png"},
        {id:"cloudB", src:"img/cloud-b.png"},
        {id:"heart", src:"img/heart.png"},
        {id:"skip", src:"img/skip.png"},
        {id:"go", src:"img/go.png"},
        {id:"logo", src:"img/logo2.png"},
        {id:"cloudBig", src: "img/cloudBig.png"},
        {id:"shootSound", src: "sounds/laserTrain.wav"},
        {id:"enemyShootSound", src: "sounds/laserShip.wav"},
        {id:"rocketLaunchSound", src: "sounds/rocketLaunch.wav"},
        "js/main.js",
        "js/shootingScene/mechanics.js",
        "js/shootingScene/movement.js",
        "js/firstScene.js",
        "js/reusable.js",
        "js/RocketScene/rocketScene.js",
        "js/RocketScene/RocketSceneUp.js"

    ]);

}

function queueProgress(e){
    //console.log(e.progress);
    preloadText.text = Math.round(e.progress*100)+"%";
    stage.update();
}

function queueComplete(){
    stage.removeChild(preloadText);
    document.querySelector('#demoCanvas').classList.add('preloadDone');
    setTimeout(function(){
        document.querySelector('#demoCanvas').classList.add('show');
    }, 300);

    stage.update();
    console.log("finished");

    init();
}
/**
 * Created by Daria on 31-Jan-17.
 */
var stage, bg, bg2, timeoutResize, startContainer, firstText;
var skipButton, goButton;
var train, gun, enemyShip, platform;
var effectActive=false, moveStop=false, moveToRocket=false;
var shots=[], enemyShots=[];
var renderedTheFirstTime=false;
var cloudA, cloudB, cloudA2, cloudB2;

var controls={
    left:false,
    right:false
};
var direction={
    x:4,
    y:1
};
var heartDrawX, lives=[];

window.addEventListener('resize', resize, false);

function init() {
    if(!renderedTheFirstTime){
        renderedTheFirstTime=true;
    }

    createBackground();
    resize();
    backgroundOpacity(0.2);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', tock);

    stage.enableMouseOver();

    firstText = new createjs.Text("Build your own spaceship!", "30px Verdana", "#000");
    firstText.textAlign="center";
    firstText.textBaseline="middle";

    skipButton = new createjs.Bitmap(queue.getResult("skip"));
    skipButton.scaleX=0.5;
    skipButton.scaleY=0.5;

    goButton = new createjs.Bitmap(queue.getResult("go"));
    goButton.scaleX=0.1;
    goButton.scaleY=0.1;

    goButton.addEventListener("click", game);

    stage.addChild(firstText, skipButton, goButton);

}

function game(){
    document.querySelector('#demoCanvas').classList.remove('preloadDone', "show");
    document.querySelector('#demoCanvas').classList.add('preloadDone');
    setTimeout(function(){
        document.querySelector('#demoCanvas').classList.add('show');
    }, 300);

    stage.removeChild(firstText, skipButton,goButton);

    backgroundOpacity(1);
    createContent();
    resize();


    firstScene();
}

function tock() {
    if (!moveStop){
        moveTrain();
    }
    moveShots();
    moveEnemyShots();
    
    if (effectActive){
        backgroundEffect(2);
        moveSpaceship();
    }
    if (enemyShip){
        moveEnemyShots();
        if(!enemyShip.alive){
            goToRocket();
        }
    }

    if(animation){
        backgroundEffect(4);
        cloudEffect(4);
    }
    cloudEffect(1);

    stage.update();

}

function resize() {
    if (timeoutResize){
        clearTimeout(timeoutResize);
    }
    timeoutResize = setTimeout(function() {
        // Resize the canvas element
        stage.canvas.width = window.innerWidth;
        stage.canvas.height = window.innerHeight;

        // Background: full screen redraw
        bg.graphics.clear();
        bg.graphics.beginBitmapFill(bg.img, "no-repeat").drawRect(0, 0, bg.img.width, bg.img.height);
        bg.x=0;

        bg.scaleX = parseFloat(stage.canvas.width / bg.img.width);
        bg.scaleY = parseFloat(stage.canvas.height / bg.img.height);

        bg2.graphics.clear();
        bg2.graphics.beginBitmapFill(bg.img, "no-repeat").drawRect(0, 0, bg.img.width, bg.img.height);
        bg2.x=bg.x+stage.canvas.width;

        bg2.scaleX = parseFloat(stage.canvas.width / bg.img.width);
        bg2.scaleY = parseFloat(stage.canvas.height / bg.img.height);

        backgroundResize(cloudA);
        cloudA.x=0;

        backgroundResize(cloudA2);
        cloudA2.x=stage.canvas.width;

        backgroundResize(cloudB);
        cloudB.x=stage.canvas.width/4;

        backgroundResize(cloudB2);
        cloudB2.x=stage.canvas.width+stage.canvas.width/4;

        resizeContent();
    },200);

}


function createBackground() {
    bg = new createjs.Shape();
    bg.x=0;
    bg.img = queue.getResult('background');

    bg2 = new createjs.Shape();
    bg2.x=stage.canvas.width;

    cloudA = new createjs.Shape();
    cloudA.x=0;
    cloudA.img=queue.getResult('cloudA');

    cloudA2 = new createjs.Shape();
    cloudA2.x=0;
    cloudA2.img=queue.getResult('cloudA');

    cloudB = new createjs.Shape();
    cloudB.x=0;
    cloudB.img=queue.getResult('cloudB');

    cloudB2 = new createjs.Shape();
    cloudB2.x=stage.canvas.width;
    cloudB2.img=queue.getResult('cloudB');

    stage.addChild(bg, bg2, cloudA, cloudA2, cloudB, cloudB2);

}


function createContent() {

    train = new createjs.Shape();
    train.width=400;
    train.height=100;
    train.graphics.beginFill("#ffe500").drawRect(0,0,train.width,train.height);
    train.speed=6;

    platform = new createjs.Shape();
    platform.width=500;
    platform.height=20;
    platform.graphics.beginFill("#ffe500").drawRect(0,0,platform.width,platform.height);

    gun = new createjs.Shape();
    gun.width=50;
    gun.height=50;
    gun.regX=gun.width/2;
    gun.regY=gun.height/2;
    gun.graphics.beginFill('red').drawRect(0,0,gun.width,gun.height);

    stage.addChild(train, gun, platform)

}

function backgroundResize(bg){
    bg.graphics.clear();
    bg.graphics.beginBitmapFill(bg.img, "no-repeat").drawRect(0, 0, bg.img.width, bg.img.height);

    bg.scaleX = parseFloat(stage.canvas.width / bg.img.width)/1.2;
    bg.scaleY = parseFloat(stage.canvas.height / bg.img.height)/1.2;
}

function backgroundEffect(speed){
    bg.x-=speed;
    bg2.x-=speed;
    if (bg.x<=-stage.canvas.width){
        bg.x=bg2.x+stage.canvas.width;
    }
    if (bg2.x<=-stage.canvas.width){
        bg2.x=bg.x+stage.canvas.width;
    }
}

function backgroundOpacity(n){
    bg.alpha=n;
    bg2.alpha=n;

    cloudA.alpha=n;
    cloudA2.alpha=n;

    cloudB.alpha=n;
    cloudB2.alpha=n;
}

function cloudEffect(speed){
    cloudA.x-=0.3*speed;
    cloudA2.x-=0.3*speed;
    cloudB.x-=0.5*speed;
    cloudB2.x-=0.5*speed;

    if (cloudA.x<=-stage.canvas.width){
        cloudA.x=cloudA2.x+stage.canvas.width;
    }
    if (cloudA2.x<=-stage.canvas.width){
        cloudA2.x=cloudA.x+stage.canvas.width;
    }
    if (cloudB.x<=-stage.canvas.width){
        cloudB.x=cloudB2.x+stage.canvas.width;
    }
    if (cloudB2.x<=-stage.canvas.width){
        cloudB2.x=cloudB.x+stage.canvas.width;
    }
}


function resizeContent(){
    if (train){
        if (arrived || moveToRocket){
            train.x = stage.canvas.width / 2-150;
        }else{
            train.x=stage.canvas.width/2;
        }
        train.y=stage.canvas.height-(stage.canvas.height/5);
    }


    if (platform){
        platform.x=train.x-platform.width;
        platform.y=train.y+(train.height-platform.height);
    }

    if (gun){
        gun.y=train.y-gun.height/2;
        gun.x=train.x+train.width/2;
    }


    if(enemyShip){
        enemyShip.x=window.innerWidth/2;
        enemyShip.y=stage.canvas.height/4;
    }

    if (rocket){
        rocket.y=stage.canvas.height/2;
        rocket.x=4*stage.canvas.width/5;
    }

    if(buttonContainer){
        button.x=stage.canvas.width/5;
        button.y=stage.canvas.height/5;

        buttonText.x=button.x-button.width/2+5;
        buttonText.y=button.y-button.height/2;
    }

    if (grid.length>0 && counter<0) {
        for (row = 0; row < modules.length; row++) {
            for (col = 0; col < modules[row].length; col++) {
                var t = grid[row][col];

                t.x = stage.canvas.width / 3 * (col+0.5);
                t.y = stage.canvas.height / 3 * (row+0.5);

                if (col == 0) {
                    t.x = t.x + stage.canvas.width / 11;
                }
                if (col == modules[row].length - 1) {
                    t.x = t.x - stage.canvas.width / 11;
                }

                if (row == 0) {
                    t.y = t.y + stage.canvas.height / 11;
                }

            }
        }
    }

    if (boxModules.length>0){
        n=0;
        for (var i=0;i<boxModules.length;i++){
            var box=boxModules[i];
            box.y=platform.y-box.height;
            box.x=spaceBetween+platform.x+(i-n)*(spaceBetween+box.width);

            if ((i+1) % 3 == 0) {
                n++;
                box.x = platform.x + spaceBetween * (3 + (n - 1) * 8);
                box.y = platform.y - 2 * box.height;
            }
        }

    }

    if (startContainer){
        buttonStart.x=window.innerWidth-buttonStart.width;
        buttonStart.y=window.innerHeight/2+2*buttonStart.height;

        startText.x=buttonStart.x-buttonStart.width/2+5;
        startText.y=buttonStart.y-buttonStart.height/2;
    }

    firstText.x=stage.canvas.width/2;
    firstText.y=stage.canvas.height/2-100;

    skipButton.x=firstText.x+50;
    skipButton.y=firstText.y+50;

    goButton.x=firstText.x-150;
    goButton.y=skipButton.y+30;

    if (cloudBig){
        cloudBig.x=stage.canvas.width/2;
        cloudBig.y=stage.canvas.height/2;
    }

    if (logo){
        logo.x=stage.canvas.width/2;
        logo.y=stage.canvas.height/2;
    }
}

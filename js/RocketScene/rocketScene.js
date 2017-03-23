/**
 * Created by Daria on 21-Feb-17.
 */
var rocket, button, buttonText, buttonContainer;
var initial=true, launchButton=false, arrived=false;
var counter=-1;

function goToRocket(){
    if (initial){
        effectActive=false;
        moveToRocket=true;
        rocket = new createjs.Shape();
        rocket.width=200;
        rocket.height=500;
        rocket.regX=rocket.width/2;
        rocket.regY=rocket.height/2;
        rocket.graphics.beginFill('red').drawRect(0,0,rocket.width,rocket.height);
        rocket.x=stage.canvas.width+300;
        rocket.y=stage.canvas.height/2;

       /* fire = new createjs.Shape();
        fire.width = 50;
        fire.height = 70;
        fire.regX=fire.width/2;
        fire.regY=fire.height/2;
        fire.graphics.beginFill('orange').drawRect(0,0,fire.width,fire.height);
        fire.x=rocket.x;
        fire.y=rocket.y+rocket.height/2+fire.height/2;*/

        stage.addChild(rocket);
        initial=false;
        window.removeEventListener("keydown", moveOrShootControls);
    }

    if (moveToRocket) {
        if (!arrived){
            if (train.x <= stage.canvas.width / 2-150) {
                train.x += train.speed/2;
                gun.x += train.speed/2;
                platform.x += train.speed/2;
                for (var i=0;i<boxModules.length;i++) {
                    var box = boxModules[i];
                    box.x += train.speed/2;
                }
            }else if (stage.canvas.width/2-150-train.x<=6 && stage.canvas.width/2-150-train.x>=-6){
                    arrived=true;
                    effectActive=true;
            }else{
                train.x -= train.speed/2;
                gun.x -= train.speed/2;
                platform.x -= train.speed/2;
                for (i=0;i<boxModules.length;i++) {
                    box = boxModules[i];
                    box.x -= train.speed / 2;
                }
            }
                backgroundEffect(3);
                cloudEffect(3);
        }

        setTimeout(function(){
            if (rocket.x>=4*stage.canvas.width/5){
                rocket.x -= train.speed;
                /*fire.x -= train.speed;*/

            }else{

                effectActive = false;
                moveToRocket = false;
                if (counter<0){
                    counter+=1;
                    moveBoxes();
                }

            }

        }, 2000);

    }

}

function shake(target){
    var rocketLaunchSound = new createjs.Sound.play("rocketLaunchSound");
    rocketLaunchSound.setVolume(0.5);

    createjs.
    Tween.
    get(target).
    to({
        y:target.y-200}
        , 2500,
        createjs.Ease.bounceInOut
    ).call(function(){
        createjs.
        Tween.
        get(target).
        to({
                y:target.y-1000}
            , 1000,
            createjs.Ease.linear)
            .call(function(){
                setTimeout(UpScene(),500);
            })
    });

}

function buttonLaunch(){
    button = new createjs.Shape();
    button.graphics.clear();
    button.width=150;
    button.height=50;
    button.graphics.beginFill("blue").drawRect(0,0,button.width,button.height);
    button.regX=button.width/2;
    button.regY=button.height/2;
    button.x=stage.canvas.width/4;
    button.y=stage.canvas.height/4;

    buttonText = new createjs.Text("LAUNCH", "30px Arial Black", "#FFF");
    buttonText.x=button.x-button.width/2+5;
    buttonText.y=button.y-button.height/2;

    buttonContainer = new createjs.Container();
    buttonContainer.addChild(button, buttonText);

    stage.addChild(buttonContainer);
    buttonContainer.cursor = "pointer";

    buttonContainer.addEventListener('click', function() {
        shake(rocket);
    });

}

function moveBoxes(){
    if (counter<boxModules.length){
        createjs.
        Tween.
        get(boxModules[boxModules.length-counter-1]).
        to({
                y:rocket.y,
                x:rocket.x}
            , 1000,
            createjs.Ease.linear)
            .call(function(){
                stage.removeChild(boxModules[boxModules.length-counter-1]);
                counter+=1;
                moveBoxes();
            })
    }else{
       //if(!launchButton){
            buttonLaunch();
       /*     launchButton=true;
        }*/
    }

}
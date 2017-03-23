/**
 * Created by Daria on 16-Mar-17.
 */

var logo, cloudBig;


function UpScene() {
    var margin = 40;
    stage.removeAllChildren();
    stage.addChild(cloudA, cloudA2, cloudB, cloudB2, rocket);
    stage.update();
    cloudA.y = cloudA.y + margin;
    cloudA2.y = cloudA2.y + margin;
    cloudB.y = cloudB.y + margin;
    cloudB.y = cloudB2.y + margin;

    rocket.x=stage.canvas.width/2;
    rocket.y = stage.canvas.height+1000;
    createjs.Tween.get(rocket).to({
        y:-1000
        }, 2000, createjs.Ease.linear)
        .call(UpScene2);
}

function UpScene2(){
    rocket.y = stage.canvas.height+1000;
    createjs.Tween.get(rocket).to({
        y:-1000
    }, 2000, createjs.Ease.linear)
        .call(UpScene3);
}

function UpScene3(){
    rocket.y = stage.canvas.height+rocket.height;
    rocket.alpha=1;

    cloudBig = new createjs.Bitmap(queue.getResult("cloudBig"));
    cloudBig.width=1328;
    cloudBig.height=785;
    cloudBig.regX=cloudBig.width/2;
    cloudBig.regY=cloudBig.height/2;
    cloudBig.x=stage.canvas.width/2;
    cloudBig.y=stage.canvas.height/2;
    cloudBig.scaleX=0.7;
    cloudBig.scaleY=0.7;
    cloudBig.alpha=2;

    stage.addChild(cloudBig);

    createjs.Tween.get(rocket).to({
        y:stage.canvas.height/2+100,
        alpha:0
    }, 2000, createjs.Ease.linear)
        .call(showLogo);
}

function showLogo(){
    stage.removeChild(rocket);

    logo = new createjs.Bitmap (queue.getResult("logo"));
    logo.width=400;
    logo.height=400;
    logo.regX=logo.width/2;
    logo.regY=logo.height/2;
    logo.x=stage.canvas.width/2;
    logo.y=stage.canvas.height/2;
    logo.alpha=0;

    stage.addChild(logo);

   /* createjs.Tween.get(cloudBig).to({
        alpha:0
    }, 1000, createjs.Ease.cubicOut)
        .call(function(){
            stage.removeChild(cloudBig);
        });*/

    createjs.Tween.get(logo).to({
        alpha:1
    }, 1000, createjs.Ease.cubicIn);


}

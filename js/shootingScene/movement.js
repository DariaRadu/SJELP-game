/**
 * Created by Daria on 21-Feb-17.
 */
function moveOrShootControls(e){
    switch(e.keyCode){
        case 32:
            shoot();
            break;
        case 37:
            controls.left=true;
            controls.right=false;
            break;
        case 39:
            controls.right=true;
            controls.left=false;
    }
}

function moveTrain(){
    if (controls.left && train.x>=0){
        train.x-=train.speed;
        gun.x-=train.speed;
        platform.x-=train.speed;
        for (var i=0;i<boxModules.length;i++) {
            var box = boxModules[i];
            box.x -= train.speed;
        }
    }
    if (controls.right){
        train.x+=train.speed;
        gun.x+=train.speed;
        platform.x+=train.speed;
        for (i=0;i<boxModules.length;i++) {
            box = boxModules[i];
            box.x += train.speed;
        }
    }
}

function resetControls(e){
    switch(e.keyCode){
        case 37:
            controls.left=false;
            break;
        case 39:
            controls.right=false;
            break;
    }
}

function moveShots() {
    for( var i=shots.length-1; i >= 0; i-- ) {
        var shot = shots[i];
        shot.y-= shot.speed;
        // remove shot if outside canvas
        if( shot.y < 0) {
            removeShot( shot , shots);
        }
        if(hitTest1(enemyShip, shot)){
            console.log("hit");
            removeShot(shot, shots);
            stage.removeChild(lives[enemyShip.health-1]);
            lives.splice( enemyShip.health-1, 1 );
            heartDrawX-=64;
            enemyShip.health-=1;
            if(enemyShip.health===0){
                explode();
                enemyShip.alive=false;
            }

        }
    }
}

function moveSpaceship(){
    enemyShip.x+=direction.x;
    enemyShip.y+=direction.y;
    if (enemyShip.x===window.innerWidth/2+200|| enemyShip.x===window.innerWidth/2-200){
        direction.x=0;
        direction.y=-2;
    }
    if (enemyShip.y===stage.canvas.height/4-50){
        if (enemyShip.x<=window.innerWidth/2){
            direction.x=4;
        }else{
            direction.x=-4;
        }

        direction.y=1;
    }
}

function moveEnemyShots(){
    for( var i=enemyShots.length-1; i >= 0; i-- ) {
        var shot = enemyShots[i];
        shot.y+= shot.speed;
        // remove shot if outside canvas
        if( shot.y > stage.canvas.height) {
            removeShot( shot , enemyShots);
        }
        if(hitTest2(train, shot) || hitTest2(gun, shot) ){
            removeShot( shot , enemyShots);
            train.alpha=0.9;
            setTimeout(function(){
                train.alpha=1;
            },200);
        }
    }
}
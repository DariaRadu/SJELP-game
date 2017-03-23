/**
 * Created by Daria on 02-Mar-17.
 */
var modules, grid=[], boxModules=[];
var gridWidth=220, gridHeight=112;
var spaceBetween, n=0, animation;

function firstScene(){
    var row, col, img;

    buttonStart = new createjs.Shape();
    /*buttonStart.graphics.clear();*/
    buttonStart.width=150;
    buttonStart.height=50;
    buttonStart.graphics.beginFill("blue").drawRect(0,0,buttonStart.width,buttonStart.height);
    buttonStart.regX=buttonStart.width/2;
    buttonStart.regY=buttonStart.height/2;
    buttonStart.x=window.innerWidth-buttonStart.width;
    buttonStart.y=window.innerHeight/2+2*buttonStart.height;

    startText = new createjs.Text("DONE", "30px Arial Black", "#FFF");
    startText.x=buttonStart.x-buttonStart.width/2+5;
    startText.y=buttonStart.y-buttonStart.height/2;

    startContainer = new createjs.Container();
    startContainer.addChild(buttonStart, startText);
    stage.addChild(startContainer);
    startContainer.cursor = "pointer";

    startContainer.addEventListener('click', goToSpaceship);

    modules = queue.getResult("modules").tiles;

    var sheet = new createjs.SpriteSheet(queue.getResult("moduleSprites"));

    for (row = 0; row < modules.length; row++) {
        grid.push([]);
        for (col=0; col<modules[row].length; col++){
            switch(modules[row][col]){
                case 1:
                    img = "module1";
                    break;
                case 2:
                    img = "module2";
                    break;
                case 3:
                    img = "module3";
                    break;
            }

            var t = new createjs.Sprite(sheet, img);

            t.row = row;
            t.col = col;

            t.regX=gridWidth/2;
            t.regY=gridHeight/2;

           /* t.x=stage.canvas.width/3*col;
            t.y=stage.canvas.height/3*row;*/

           /* if (col==0){
                t.x=t.x+stage.canvas.width/6;
            }
            if (col==modules[row].length-1){
                t.x=t.x-stage.canvas.width/6;
            }

            if (row==0){
                t.y=t.y+stage.canvas.height/6
            }*/

            t.clicked=0;
            t.cursor = "pointer";

            grid[row].push(t);
            stage.addChild(t);

            addModules();
        }
    }
}

function addModules(){
    for (var row=0;row<grid.length;row++){
        for (var col=0; col<grid[row].length;col++){
            var t = grid[row][col];
            t.addEventListener('click', moduleEffect);
            }
        }
    }



function moduleEffect(e){

    e.target.clicked++;
    console.log(e.target.clicked)
    //e.target.removeEventListener(e.type, arguments.callee);
    /*e.target.addEventListener('click', removeModule);*/
    if(e.target.clicked % 2 ==0){
        removeModule();

    } else {
        //add stuff
        var box = new createjs.Shape();
        box.width=60;
        box.height=50;
        box.graphics.beginFill("#f7bf76").drawRect(0,0, box.width,box.height);
        box.alpha=0;

        spaceBetween=box.width/3;

        box.y=platform.y-box.height;
        box.x=spaceBetween+platform.x+(boxModules.length-n)*(spaceBetween+box.width);
        boxModules.push(box);

        if(boxModules.length>0) {
            if (boxModules.length % 3 == 0) {
                n++;
                box.x = platform.x + spaceBetween * (3 + (n - 1) * 8);
                box.y = platform.y - 2 * box.height;
            }
        }

        stage.addChild(box);

        createjs.
        Tween.
        get(box).
        to({
                alpha:1}
            , 300,
            createjs.Ease.linear)

    }


}

function removeModule(){
    if (boxModules.length % 3 == 0){
        n--;
    }
    stage.removeChild( boxModules[boxModules.length-1]);
    boxModules.splice( boxModules.length-1, 1 );

    /*e.target.removeEventListener(e.type, arguments.callee);
    e.target.addEventListener('click', moduleEffect);*/
}

function goToSpaceship(){
    for (var row=0;row<grid.length;row++){
        for (var col=0;col<grid[row].length;col++){
            let t=grid[row][col];
            createjs.
            Tween.
            get(t).
            to({
                    alpha:0}
                , 300,
                createjs.Ease.linear)
            .call(function(){
                    stage.removeChild(t, startContainer);
                    animation=1;
                    setTimeout(function(){
                        animation=0;
                        effectActive=1;

                    },3000);
                })
        }
    }
    setTimeout(shootingScene, 3000)

}

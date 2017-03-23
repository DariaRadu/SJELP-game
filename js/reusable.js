/**
 * Created by Daria on 21-Feb-17.
 */

function removeShot( shot, array ) {
    stage.removeChild( shot );
    array.splice( array.indexOf(shot), 1 );
}

function hitTest1( obj1, obj2 ) {
    if( obj1.x - obj1.width/2< obj2.x+obj2.width &&
        obj1.x+obj1.width/2 > obj2.x &&
        obj1.y - obj1.height/2< obj2.y+obj2.height &&
        obj1.y + obj1.height/2 > obj2.y ) {
        return true;
    }

    return false;
}
function hitTest2(rect1,rect2) {
    if ( rect1.x >= rect2.x + rect2.width
        || rect1.x + rect1.width <= rect2.x
        || rect1.y >= rect2.y + rect2.height
        || rect1.y + rect1.height <= rect2.y )
    {
        return false;
    }
    return true;
}

function R(max,min){
    return Math.random()*(max-min)+min
};
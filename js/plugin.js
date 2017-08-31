
function play () {
	document.getElementById('myTune').play();
}
function stop () {
document.getElementById('myTune').pause(); 
document.getElementById('myTune').currentTime = 0;
}
function volUp () {
document.getElementById('myTune').volume+=0.1;
}
function volDown () {
	document.getElementById('myTune').volume-=0.1;
}

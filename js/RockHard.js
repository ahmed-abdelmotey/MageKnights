$(document).ready(function () {


var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    }
    else {
        return valString;
    }
}
    curscore = 0;
function IncreaseKill() {
    number = parseInt($('.number').text());
    number += 20;
    window.curscore += 20;
    $('.number').text(number);
    if (number >= 100){
        $('#Levelup').fadeIn(5000);
        endaudio.play();
        var str1 = $('#scr td').text();
        $('#scr td').text(str1 + 100);
        for (var i = 1;i < 99999; i++){
            window.clearInterval(i);
            window.clearTimeout(i);
        }
    }
}
var x = 10;

var Otop;

var bulletHolder = document.getElementById("divActivites");

var MaxLeft = parseInt(bulletHolder.style.width) - 50;

var MaxTop = parseInt(bulletHolder.style.height) - 50;

var HP2 = document.getElementById("HHP");
var HPnumber = document.getElementById("HPNum");


var bullet = [];
var bats = [];

var Dir = [];
//


for (var i = 0; i < rorox.length; i++) {
    Dir[i] = 1;
}

setInterval(MoveRocks, 50);

var BulletLife = [];
var Bcount = 0;

///////////////////////////////////////////////////////////////////////////////////////////////////////
bulletHolder.addEventListener("click", getClickPosition, false);
var xPosition = [];
var yPosition = [];
var slope = [];
var xs = [];
var ys = [];
var fact = [];
function getClickPosition(e) {
    xPosition[Bcount] = e.clientX;
    yPosition[Bcount] = e.clientY;

    bullet[Bcount] = document.createElement("IMG");
    bullet[Bcount].src = "../img/bullet.png";
    bullet[Bcount].width = 25;
    bullet[Bcount].style.position = "absolute";
    bullet[Bcount].style.left = roro.style.left;
    bullet[Bcount].style.top = roro.style.top;
    bulletHolder.appendChild(bullet[Bcount]);


    xs[Bcount] = (xPosition[Bcount] - parseInt(bullet[Bcount].style.left));
    ys[Bcount] = (yPosition[Bcount] - parseInt(bullet[Bcount].style.top));
    fact[Bcount] = 0.1;
    slope[Bcount] = (ys / xs);

    var BullDist = [];
    BullDist = Math.sqrt((xs[Bcount] * xs[Bcount]) + (ys[Bcount] * ys[Bcount]));
    //  alert(BullDist);
    BulletLife[Bcount] = 1;
    audio.play();
    for (var i = 0; i < 50; i++) {

        $(bullet[Bcount]).animate({
            left: (xs[Bcount] * fact[Bcount] + parseInt(roro.style.left)),
            top: ((ys[Bcount] * fact[Bcount] + parseInt(roro.style.top)))
        }, BullDist / 4);
        fact[Bcount] += .2;

    }
    //  bullet[Bcount].style.display = "none";
    Bcount++;

}

function MoveRocks() {

    for (var i = 0; i < rorox.length; i++) {

        rorox[i].style.left = (parseInt(rorox[i].style.left) + (10 * Dir[i]));
        //alert(rorox[i].style.left);
        if (parseInt(rorox[i].style.left) > MaxLeft || parseInt(rorox[i].style.left) < 0) {
            Dir[i] *= -1;
        }
    }
}
/////////////////////////////// Damage

var damage = setInterval(damager, 50);
var damageBack = setInterval(ReRunDamager, 3000);
clearInterval(damageBack);

function ReRunDamager() {
    roro.style.opacity = "1";
    clearInterval(damage);
    clearInterval(damageBack);
    damage = setInterval(damager, 50);
}

function damager() {
    for (var i = 0; i < bats.length; i++) {

        var rect1 = roro.getBoundingClientRect();

        var rect3 = bats[i].getBoundingClientRect();
        var overlap2 = !(rect1.right < rect3.left || rect1.left > rect3.right || rect1.bottom < rect3.top || rect1.top > rect3.bottom);
//        <audio id="end"><source src="../sound/free.mp3"></audio>
        var endaudio = new Audio("../sound/free.mp3");

        function DieEvent() {
            $('#Die').fadeIn(5000);
            endaudio.play();
            var str1 = $('#scr td').text();
            var str2 = $('.number').text();
            var str =  str1 + str2;

            str.replace(str.substring(str.length-1,str.length),'  ');
            // str = str.substring(0,str.length);
            $('#scr td').text(str);
            // $('#scr td').text($(this).text().substring(0,$(this).text().length-2));


            for (var i = 1;i < 99999; i++){
                window.clearInterval(i);
                window.clearTimeout(i);
            }
        }
        for (var j = 0; j < rorox.length; j++) {
            var rect1 = roro.getBoundingClientRect();
            var rect2 = rorox[j].getBoundingClientRect();

            var overlap = !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);

            if (overlap) {

                HP2.style.width = parseInt(HP2.style.width) - 100;
                HPnumber.innerHTML = parseInt(HP2.style.width);
                clearInterval(damage);
                damageBack = setInterval(ReRunDamager, 3000);

                roro.style.opacity = "0.5";

                if (parseInt(HP2.style.width) <= 0) {
                    DieEvent();
                    overlap2 = false;
                }
                break;
            }

        }

        if (overlap2) {

            HP2.style.width = parseInt(HP2.style.width) - 50;
            HPnumber.innerHTML = parseInt(HP2.style.width);
            clearInterval(damage);
            damageBack = setInterval(ReRunDamager, 3000);

            roro.style.opacity = "0.5";

            if (parseInt(HP2.style.width) <= 0) {
                DieEvent();
            }
            break;


        }
    }
}

//##//##//##//##//Jumper
function jump() {

    // alert("hello")

    roro.style.top = ((parseInt(roro.style.top)) - x);
    roro.style.left = ((parseInt(roro.style.left)) + x);
    // alert(roro.style.top);


}
//##//##//##//##//Jumper\

////BAT
var Btop;
var BL;
var BT;
var RL;
var RT;
var Ldiff;
var Tdiff;
setInterval(batMover, 1000);

function batMover() {
    BL = parseInt(bat[0].style.left);
    BT = parseInt(bat[0].style.top);
    RL = parseInt(roro.style.left);
    RT = parseInt(roro.style.top);
    Ldiff = BL - RL;
    Tdiff = BT - RT;
    Btop = 0;


    for (var i = 0; i < bats.length; i++) {


        $(bats[i]).animate({left: RL, top: RT}, 5000, 'linear');

    }

}
////BAT
/////////////////////////////////////////////////////////////////
//Bat Generator
BatCounter = 0;

setInterval(Bater, 2000);

function Bater() {


    bats[BatCounter] = document.createElement("IMG");
    bats[BatCounter].src = "../img/bat.gif";
    bats[BatCounter].width = 50;
    bats[BatCounter].style.position = "absolute";
    // generate random


    bats[BatCounter].style.left = getRandomArbitrary(100, 1400);
    bats[BatCounter].style.top = getRandomArbitrary(50, 250);
    //
    bulletHolder.appendChild(bats[BatCounter]);

    BatCounter++
}

/////Bat killer

setInterval(BatKill, 50);

function BatKill() {
    for (var i = 0; i < bats.length; i++) {

        if (bullet.length != 0) {
            for (var j = 0; j < bullet.length; j++) {


                var rect5 = bats[i].getBoundingClientRect();
                var rect6 = bullet[j].getBoundingClientRect();
                var overlap3 = !(rect5.right < rect6.left || rect5.left > rect6.right || rect5.bottom < rect6.top || rect5.top > rect6.bottom);
                if (overlap3) {
                    IncreaseKill();
                    bats[i].style.display = "none";
//                        bats.splice(i, 1);
                }
            }
        }

    }


}
var ReturnY;
setInterval(Cgrav, 25);

var Tbefore;
FloatG = document.getElementsByName("Floating");
function Cgrav() {

    ReturnY = parseInt(roro.style.top);
    Tbefore = parseInt(roro.style.top) + 50;
    roro.style.top = ((parseInt(roro.style.top)) + x);

    for (var i = 0; i < Floating.length; i++) {


        var rectK = roro.getBoundingClientRect();
        var rectG = Floating[i].getBoundingClientRect();

        var overlap = !(rectK.right < rectG.left || rectK.left > rectG.right || rectK.bottom < rectG.top || rectK.top > rectG.bottom);

        var overlap2 = parseInt(Floating[i].style.top) == Tbefore;


        if (overlap && overlap2) {
            roro.style.top = ReturnY;


            overlap = false;
            overlap2 = false;
        }
    }

    if ((parseInt(roro.style.top) > MaxTop)) {
        roro.style.top = MaxTop;

    }
}

///moving charcter


//)))))))))))))))))))))))))


var Oleft2;
var Otop2;
var Oleft3;
var Otop3;
var map = {68: false, 32: false, 65: false};

$(document).keydown(function (e) {
    if ((parseInt(roro.style.top) == MaxTop) || (parseInt(roro.style.top) == 500 || parseInt(roro.style.top) == 300)) {
        if (e.keyCode in map) {
            map[e.keyCode] = true;
            if (!map[68] && !map[65] && map[32]) {

                $(roro).animate({
                    top: (parseInt(roro.style.top) - 200)
                }, 500);


            }
            if (map[68] && map[32]) {

                Oleft2 = (parseInt(roro.style.left)) + 200;
                Otop2 = (parseInt(roro.style.top)) - 200;

                Oleft3 = Oleft2 + 200;
                Otop3 = Otop;
                $(roro).animate({left: Oleft2, top: Otop2}, 200, 'linear');
                $(roro).animate({left: Oleft3, top: Otop3}, 200, 'linear');

            }
            if (map[65] && map[32]) {

                Oleft2 = (parseInt(roro.style.left)) - 200;
                Otop2 = (parseInt(roro.style.top)) - 200;

                Oleft3 = Oleft2 - 200;
                Otop3 = Otop;
                $(roro).animate({left: Oleft2, top: Otop2}, 200, 'linear');
                $(roro).animate({left: Oleft3, top: Otop3}, 200, 'linear');


            }
        }
    }
}).keyup(function (e) {
    if (e.keyCode in map) {
        map[e.keyCode] = false;
    }
});


function anim(e) {
    // alert(e.keyCode);

    Oleft = parseInt(roro.style.left);
    Otop = parseInt(roro.style.top);

    if ((parseInt(roro.style.top) == MaxTop)) {

        if (e.keyCode == 32) {

        }
    }
    if (e.keyCode == 65 || e.keyCode == 37) {
        // alert("hellow");

        roro.style.left = ((parseInt(roro.style.left)) - x);
    }
    if (e.keyCode == 68 || e.keyCode == 39) {
        // alert("hellow");
        roro.style.left = ((parseInt(roro.style.left)) + x);
    }
    if (e.keyCode == 83 || e.keyCode == 40) {
        // alert("hellow");
        roro.style.top = ((parseInt(roro.style.top)) + x);
    }
    if (e.keyCode == 87 || e.keyCode == 38) {
        // alert("hellow");
        roro.style.top = ((parseInt(roro.style.top)) - x);
    }

    if ((parseInt(roro.style.top) > MaxTop)) {
        roro.style.top = MaxTop;

    }
    if ((parseInt(roro.style.left)) > MaxLeft) {

        roro.style.left = MaxLeft;
    }

    if ((parseInt(roro.style.top) < 0)) {
        roro.style.top = 1;

    }
    if ((parseInt(roro.style.left)) < 5) {

        roro.style.left = 5;
    }
}
    document.onkeydown = anim;
    var audio = new Audio('../sound/preFire.mp3');
    var audio2 = new Audio('../sound/BachBWV565.mp3');
    audio2.play();
})

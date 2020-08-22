var array = [9];
var X = [9];
var O = [9];
var tmp = 0;
var cek = false;
let NilaiComp = 0;
let NilaiUser = 0;
for(var i = 0; i < 9 ; i++){
    array[i] = parseInt(0);
}
for(var i = 0; i < 9 ; i++){
    X[i] = parseInt(0);
}
for(var i = 0; i < 9 ; i++){
    O[i] = parseInt(0);
}

function click(id){
    document.getElementById(id).src = document.getElementById("XSIGN").src;
    array[parseInt(id)] = 1;
    X[parseInt(id)] = 1;
}
function Opponent(tmp){
    while(tmp != 9){
        var randomNumber = Math.floor(Math.random() * 9);
        if(array[randomNumber] === 0){
            array[randomNumber] = parseInt(1);
            O[randomNumber] = parseInt(1);
            console.log(randomNumber);
            document.getElementById(randomNumber).src = document.getElementById("OSIGN").src;
            break;
        }
    }
}
function codeX(){
    if(X[0] === 1 && X[1] === 1 && X[2] === 1 ||
    X[0] === 1 && X[3] === 1 && X[6] === 1 ||
    X[6] === 1 && X[7] === 1 && X[8] === 1 ||
    X[2] === 1 && X[5] === 1 && X[8] === 1 ||
    X[0] === 1 && X[4] === 1 && X[8] === 1 ||
    X[2] === 1 && X[4] === 1 && X[6] === 1 ||
    X[1] === 1 && X[4] === 1 && X[7] === 1 ||
    X[3] === 1 && X[4] === 1 && X[5] === 1 ){
        document.getElementById("Hasil").innerHTML = "You Win";
        setTimeout(function(){reset()}, 1000);
        UserWin();
        cek = true;
    }
}
function codeO(){
    if(O[0] == 1 && O[1] == 1 && O[2] == 1 ||
        O[0] == 1 && O[3] == 1 && O[6] == 1 ||
        O[6] == 1 && O[7] == 1 && O[8] == 1 ||
        O[2] == 1 && O[5] == 1 && O[8] == 1 ||
        O[0] == 1 && O[4] == 1 && O[8] == 1 ||
        O[2] == 1 && O[4] == 1 && O[6] == 1 ||
        O[1] == 1 && O[4] == 1 && O[7] == 1 ||
        O[3] == 1 && O[4] == 1 && O[5] == 1 ){
            document.getElementById("Hasil").innerHTML = "You Lose";
            setTimeout(function(){reset()}, 1000);
            CompWin();
            cek = true;
        }
}
function CompWin(){
    NilaiComp++;
    document.getElementById("Computer-Score").innerHTML = NilaiComp;
}
function UserWin(){
    NilaiUser++;
    document.getElementById("User-Score").innerHTML = NilaiUser;
}
function reset(){
    for(var i = 0; i < 9 ; i++){
        array[i] = parseInt(0);
    }
    for(var i = 0; i < 9 ; i++){
        X[i] = parseInt(0);
    }
    for(var i = 0; i < 9 ; i++){
        O[i] = parseInt(0);
    }
    for(var i = 0; i < 9; i++){
        document.getElementById(i).src = document.getElementById("Blank").src;
    }
    tmp = 0;
}
function restart(){
    reset();
    NilaiComp = 0;
    document.getElementById("Computer-Score").innerHTML = NilaiComp;
    NilaiUser = 0;
    document.getElementById("User-Score").innerHTML = NilaiUser;
    document.getElementById("Hasil").innerHTML = "Click and Play it, Have Fun";
}

function change(id){
    document.getElementById("Hasil").innerHTML = "Click and Play it, Have Fun";
    if(array[parseInt(id)] == 0){
        click(id);
        tmp++;
        codeX();
        if(tmp === 9){
            if(cek === false){
                document.getElementById("Hasil").innerHTML = "Its a tie";
                setTimeout(function(){reset()}, 1000);
                cek = true;
            }
        }
        if(cek === false){
            Opponent(tmp);
            tmp++;
            codeO();
        }
        else{
            cek = false;
        }
    }
    else{
        alert("Choice another cell")
    }
}


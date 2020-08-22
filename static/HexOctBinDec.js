
function Hex(){
    var HexInput = document.getElementById("Hex-Type").value;
    if(HexInput === ""){
        Reset();
    }else{
        var dec = parseInt(HexInput, 16);
        var bin = (dec).toString(2);
        var oct = (dec).toString(8);
        document.getElementById("Bin-Type").value = bin;
        document.getElementById("Dec-Type").value = dec;
        document.getElementById("Oct-Type").value = oct;
    }
}
function Dec(){
    var dec = parseInt(document.getElementById("Dec-Type").value);
    if(document.getElementById("Dec-Type").value === ""){
        Reset();
    }else{
        var bin = dec.toString(2);
        var oct = (dec).toString(8);
        var hex = (dec).toString(16).toUpperCase();
        document.getElementById("Bin-Type").value = bin;
        document.getElementById("Oct-Type").value = oct;
        document.getElementById("Hex-Type").value = hex;
    }
}
function Oct(){
    var OctInput = document.getElementById("Oct-Type").value;
    if(OctInput === ""){
        Reset();
    }else{
        var dec = parseInt(OctInput, 8);
        var bin = (dec).toString(2);
        var Hex = (dec).toString(16).toUpperCase();
        document.getElementById("Bin-Type").value = bin;
        document.getElementById("Dec-Type").value = dec;
        document.getElementById("Hex-Type").value = Hex;
    }
}
function Bin(){
    var BinInput = document.getElementById("Bin-Type").value;
    if(BinInput === ""){
        Reset();
    }else{
        var dec = parseInt(BinInput, 2);
        var hex = (dec).toString(16).toUpperCase();
        var oct = (dec).toString(8);
        document.getElementById("Hex-Type").value = hex;
        document.getElementById("Dec-Type").value = dec;
        document.getElementById("Oct-Type").value = oct;
    }
}
function Reset(){
    document.getElementById("Dec-Type").value = "";
    document.getElementById("Bin-Type").value = "";
    document.getElementById("Oct-Type").value = "";
    document.getElementById("Hex-Type").value = "";
}
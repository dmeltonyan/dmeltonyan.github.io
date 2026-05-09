function makeBigger() {
    document.getElementById("textBox").style.fontSize = "24pt";
}

function fancifyText() {
    var textBox = document.getElementById("textBox");
    var fancy = document.getElementById("fancy");

    if (fancy.checked) {
        alert("FancyShmancy selected!");
        textBox.style.fontWeight = "bold";
        textBox.style.color = "blue";
        textBox.style.textDecoration = "underline";
    } else {
        alert("BoringBetty selected!");
        textBox.style.fontWeight = "normal";
        textBox.style.color = "black";
        textBox.style.textDecoration = "none";
    }
}

function mooText() {
    var textBox = document.getElementById("textBox");

    var text = textBox.value;
    text = text.toUpperCase();

    var sentences = text.split(".");
    text = sentences.join("-Moo.");

    textBox.value = text;
}
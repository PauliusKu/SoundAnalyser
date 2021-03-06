var audioContext;
var recorder;
var isRecording;
var isInitialized = false;

var words = ["apple", "allocator", "arrow","bottle", "boolean", "bomb", "throw the jew down the well", "case", "cancer", "drum", "double", "nuts", "else", "ebola", "erect",
"false", "for", "fail", "gobble", "gulag", "George W. Bush", "jews", "Hiroshima", "harambe", "inbred", "ironic", "Israel", "Gudas", "John Cena", "jiggle", "Saulius", "Giedrelis",
"kebabas su astriu ir cesnakiniu padazu issinesimui", "keylogger", "linux", "load", "lego", "Mein kampf", "MySQL", "mind", "native", "Daugis", "nemo",
"Osama", "opera", "octopus", "private", "public", "pipe", "return", "runescape", "rainbows", "std", "squid", "santa", "try", "this", "turkey", "ur mum", "using", "undefined",
"violin", "void", "vampire", "while", "winter", "what"]

function startUserMedia(stream) {
    var input = audioContext.createMediaStreamSource(stream);
    recorder = new Recorder(input);
}


function initialize() {
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia = navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);
        window.URL = window.URL || window.webkitURL;
        audioContext = new AudioContext;
        isRecording = false;
        isInitialized = true;
        // document.getElementById("generate_images_button").disabled = true;
    } catch (e) {
        alert('No web audio support in this browser!');
    }
    
    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {});
}

function start(){
    if (!isInitialized)
        initialize();
    recordStop();
}

function recordStop(){
    var button = document.getElementById("record_stop_button");
    if (!isRecording){
        isRecording = true;
        button.innerHTML = "<i class=\"fa fa-pause\"></i>";
        document.getElementById("arrow").style.content = "tryhttyhrt";
        if (window.innerWidth > 1180)
            document.getElementById("arrow").innerHTML = "&#x2190; Press to stop<br>&nbsp;";
        else document.getElementById("arrow").innerHTML = "&#x2191; Press to stop<br>&nbsp;";
        recorder && recorder.record();
    } else {
        isRecording = false;
        button.innerHTML = "<i class=\"fa fa-play\"></i>";
        recorder && recorder.stop();
        createAudioObject();
        recorder.clear();
        document.getElementById("arrow").style.content = "trhtrhrtht";
        if (window.innerWidth > 1180)
            document.getElementById("arrow").innerHTML = "&#x2190; Press to record again<br>or view results &#x2192;";
        else document.getElementById("arrow").innerHTML = "&#x2191; Press to record again<br>or view results &#x2193;";
        document.getElementById("generate_images_button").style.visibility = "visible";
    }
}


function createAudioObject() {
    recorder && recorder.exportWAV(function(blob) {
        var url = URL.createObjectURL(blob);
        var audioPlayer = document.getElementById("audioPlayer");

        audioPlayer.controls = true;
        audioPlayer.src = url;
    });
}

function generateImages() {
    document.getElementById("resultsView").style.visibility = "visible";
    document.getElementById("wordView").style.visibility = "visible";
    document.getElementById("resultsView").style.display = "block";
    document.getElementById("wordView").style.display = "block";
    insertImage("spectrum_image", "images/spectrum.jpg");
    document.getElementById("spectrum_settings_button").setAttribute("style", "display: inline");
    document.getElementById("spectrum_download_button").setAttribute("style", "display: inline");
    document.getElementById("spectrum_download_button_a").setAttribute("href", "images/spectrum.jpg");
    insertImage("cepstrum_image", "images/cepstrum.png");
    document.getElementById("cepstrum_settings_button").setAttribute("style", "display: inline");
    document.getElementById("cepstrum_download_button").setAttribute("style", "display: inline");
    document.getElementById("cepstrum_download_button_a").setAttribute("href", "images/cepstrum.png");
    for (var i = 1; i <= 10; i++)
        insertWord("guess"+i, words[Math.floor(Math.random() * words.length)]);
}

function insertImage(destination, source){
    var image = document.getElementById(destination);
    image.setAttribute("src", source);
    //galima prideti daugiau atributu
}

function insertWord(destination, source){
    var word = document.getElementById(destination);
    word.innerHTML = source;
}

function openSpectrumSettings(){
    document.getElementById("spectrum_settings").style.display = "block";
}

function openCepstrumSettings(){
    document.getElementById("cepstrum_settings").style.display = "block";
}

function closeSpectrumSettings(){
    document.getElementById("spectrum_settings").style.display = "none";
}

function closeCepstrumSettings(){
    document.getElementById("cepstrum_settings").style.display = "none";
}
var audioContext;
var recorder;
var isRecording;

function startUserMedia(stream) {
    var input = audioContext.createMediaStreamSource(stream);
    recorder = new Recorder(input);
}


function initialize() {
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        window.URL = window.URL || window.webkitURL;
        audioContext = new AudioContext;
        isRecording = false;
        document.getElementById("generate_images_button").disabled = true;
    } catch (e) {
        alert('No web audio support in this browser!');
    }
    
    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {});
}

function recordStop(){
    var button = document.getElementById("record_stop_button");
    if (!isRecording){
        isRecording = true;
        button.value = "stop";
        recorder && recorder.record();
    } else {
        isRecording = false;
        button.value = "record";
        recorder && recorder.stop();
        createAudioObject();
        recorder.clear();
        document.getElementById("generate_images_button").disabled = false;
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
    insertImage("spectrum_image", "images/spectrum.jpg");
    document.getElementById("spectrum_settings").setAttribute("style", "display: inline");
    document.getElementById("spectrum_download").setAttribute("style", "display: inline");
    insertImage("cepstrum_image", "images/cepstrum.png");
    document.getElementById("cepstrum_settings").setAttribute("style", "display: inline");
    document.getElementById("cepstrum_download").setAttribute("style", "display: inline");
}

function insertImage(destination, source){
    var image = document.getElementById(destination);
    image.setAttribute("src", source);
    //galima prideti daugiau atributu
}


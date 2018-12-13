var audioContext;
var recorder;
var isRecording;
var buffer;

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
        createPlaybackNode();
        recorder.clear();
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


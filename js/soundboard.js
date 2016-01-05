/* globals AudioContext, BufferLoader */
window.onload = init;
var context;
var bufferLoader;

function init() {
  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
  1;
  bufferLoader = new BufferLoader(
    context,
    [
      'sounds/alarm.mp3',
      'sounds/bloody.mp3',
      'sounds/haha-williams.mp3',
      'sounds/hello-mr-villiams.mp3',
      'sounds/i-need-some-money-immediately.mp3',
      'sounds/i-realize-that.mp3',
      'sounds/ok-sir.mp3',
      'sounds/post-all-the-letters.mp3',
      'sounds/sooo.mp3',
      'sounds/yes-im-not.mp3',
      'sounds/ouu.mp3',
      'sounds/shh-silence.mp3',
      'sounds/im-not-a-fool.mp3',
    ],
    finishedLoading
    );

  bufferLoader.load();
}

function finishedLoading(bufferList) {
  // Create two sources and play them both together.

  function play(index, slow) {
    var source = context.createBufferSource();
    source.buffer = bufferList[index];
    source.connect(context.destination);
    source.start(0);
    slow ? source.playbackRate.value = 0.5 : source.playbackRate.value = 1;
  }

  document.onkeypress = function(e) {

    console.log(e.charCode);

    switch (e.charCode){

      case 49:
        play(0);
      break;

      case 50:
        play(1);
      break;

      case 51:
        play(2);
      break;

      case 52:
        play(3);
      break;

      case 53:
        play(4);
      break;

      case 54:
        play(5);
      break;

      case 55:
        play(6);
      break;

      case 56:
        play(7);
      break;

      case 57:
        play(8);
      break;

      case 48:
        play(9);
      break;

      case 113:
        play(10);
      break;

      case 119:
        play(11);
      break;

      case 101:
        play(12);
      break;

//// SLOWED DOWN

      case 33:
        play(0, true);
      break;

      case 34:
        play(1, true);
      break;

      case 167:
        play(2, true);
      break;

      case 36:
        play(3, true);
      break;

      case 37:
        play(4, true);
      break;

      case 38:
        play(5, true);
      break;

      case 47:
        play(6, true);
      break;

      case 40:
        play(7, true);
      break;

      case 41:
        play(8, true);
      break;

      case 61:
        play(9, true);
      break;

      case 81:
        play(10, true);
      break;

      case 87:
        play(11, true);
      break;

      case 69:
        play(12, true);
      break;
    }
  };

}

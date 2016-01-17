/* globals AudioContext, BufferLoader */
window.onload = init;

var context;
var bufferLoader;

var mapping =
  [{
    high: '!',
    regular: '1',
    low: '¡',
  }, {
    high: '"',
    regular: '2',
    low: '“',
  }, {
    high: '§',
    regular: '3',
    low: '¶',
  }, {
    high: '$',
    regular: '4',
    low: '¢',
  }, {
    high: '%',
    regular: '5',
    low: '[',
  }, {
    high: '&',
    regular: '6',
    low: ']',
  }, {
    high: '/',
    regular: '7',
    low: '|',
  }, {
    high: '(',
    regular: '8',
    low: '{',
  }, {
    high: ')',
    regular: '9',
    low: '}',
  }, {
    high: '=',
    regular: '0',
    low: '≠',
  }, {
    high: 'Q',
    regular: 'q',
    low: '«',
  }, {
    high: 'W',
    regular: 'w',
    low: '∑',
  }, {
    high: 'E',
    regular: 'e',
    low: '€',
  },
];

function init() {

  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
  1;
  bufferLoader = new BufferLoader(
    context, [
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

  function start(index, speed) {
    var source = context.createBufferSource();
    source.connect(context.destination);
    source.playbackRate.value = speed;
    source.buffer = bufferList[index];
    source.start(0);
  }

  function play(keyCode) {
    mapping.map(function(value, key) {
      if (keyCode === value.high) {
        start(key, 1.2);
      }

      if (keyCode === value.regular) {
        start(key, 1);
      }

      if (keyCode === value.low) {
        start(key, 0.8);
      }
    });
  }

  document.onkeydown = function(e) {
    document.getElementById('char').value = '';
    document.getElementById('char').focus();
  };

  document.onkeyup = function(e) {
    e.preventDefault();
    var character = document.getElementById('char').value;
    console.log(character);
    play(character);
  };

  var clickTargets = document.getElementsByClassName('clickable');

  for (var i = 0; i < clickTargets.length; i++) {
    clickTargets[i].addEventListener('click', function() {
      console.log(this.attributes['data-keycode'].value);
      play(this.attributes['data-keycode'].value);
    });
  }

}

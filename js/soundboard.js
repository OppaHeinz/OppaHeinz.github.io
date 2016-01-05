/* globals AudioContext, BufferLoader */
window.onload = init;

var context;
var bufferLoader;

var mapping =
  [{
    high: 161,
    regular: 49,
    low: 33,
  }, {
    high: 8220,
    regular: 50,
    low: 34,
  }, {
    high: 182,
    regular: 51,
    low: 167,
  }, {
    high: 162,
    regular: 52,
    low: 36,
  }, {
    high: 91,
    regular: 53,
    low: 37,
  }, {
    high: 93,
    regular: 54,
    low: 38,
  }, {
    high: 124,
    regular: 55,
    low: 47,
  }, {
    high: 123,
    regular: 56,
    low: 40,
  }, {
    high: 125,
    regular: 57,
    low: 41,
  }, {
    high: 8800,
    regular: 48,
    low: 61,
  }, {
    high: 171,
    regular: 113,
    low: 81,
  }, {
    high: 8721,
    regular: 119,
    low: 87,
  }, {
    high: 8364,
    regular: 101,
    low: 69,
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
  // Create two sources and play them both together.

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

  document.onkeypress = function(e) {
    e.preventDefault();
    console.log(e.keyCode);
    play(e.keyCode);
  };

  var clickTargets = document.getElementsByClassName('clickable');

  for (var i = 0; i < clickTargets.length; i++) {
    clickTargets[i].addEventListener('click', function() {
      console.log(this.attributes['data-keycode'].value);
      play(parseInt(this.attributes['data-keycode'].value));
    });
  }

}

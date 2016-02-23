/* globals AudioContext, BufferLoader */
window.onload = init;

var context;
var bufferLoader;
var _this = {};
var offsetElm = 0;

var mapping = [{
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
},];

function init() {

  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
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
  console.log('finished');

  function start(index, speed) {
    var source = context.createBufferSource();
    source.connect(context.destination);
    source.playbackRate.value = speed;
    source.buffer = bufferList[index];
    source.start(0);
  }

  function play(keyCode) {
    mapping.map(function (value, key) {
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

  function playMobile(keyCode, speed) {

    mapping.map(function (value, key) {

      if (keyCode === value.regular) {
        start(key, speed);
      }
    });
  }

  document.onkeydown = function (e) {
    document.getElementById('char').value = '';
    document.getElementById('char').focus();
  };

  document.onkeyup = function (e) {
    e.preventDefault();
    var character = document.getElementById('char').value;
    console.log(character);
    play(character);
  };

  var clickTargets = document.getElementsByClassName('clickable');

  for (var i = 0; i < clickTargets.length; i++) {

    clickTargets[i].addEventListener('touchstart', function (e) {
      e.preventDefault();
      offset = e.touches[0].clientY;
      _this = this;
      _this.setAttribute('style', '');
    });

    clickTargets[i].addEventListener('touchmove', function (e) {
      e.preventDefault();
      offsetElm = (e.touches[0].clientY - offset) / 3;
      if (offsetElm >= 0) {
        _this.setAttribute('style', 'transition: none; transform: rotateX(0deg);');
        _this.children[1].setAttribute('style', 'transition: none; transform: scaleY(0); opacity: 0');
        if (offsetElm <= 30) {
          _this.setAttribute('style', 'transition: none; transform: rotateX(' + 45 * offsetElm / 30 + 'deg) translateY(' + -offsetElm / 3 + 'px);');
          _this.children[2].setAttribute('style', 'transition: none; transform: scaleY(' + offsetElm / 30 + '); opacity:' + 100 / 30 * offsetElm / 100) + ';';
        } else {
          _this.setAttribute('style', 'transition: none; transform: rotateX(45deg) translateY(-10px);');
          _this.children[2].setAttribute('style', 'transition: none; transform: scaleY(1); opacity: 1');
        }
      } else {
        _this.setAttribute('style', 'transition: none; transform: rotateX(0deg);');
        _this.children[2].setAttribute('style', 'transition: none; transform: translateY(0); opacity: 0');
        if (offsetElm >= -30) {
          _this.setAttribute('style', 'transition: none; transform: rotateX(' + 45 * offsetElm / 30 + 'deg) translateY(' + -offsetElm / 3 + 'px);');
          _this.children[1].setAttribute('style', 'transition: none; transform: scaleY(' + -offsetElm / 30 + '); opacity:' + 100 / 30 * -offsetElm / 100) + ';';
        } else {
          _this.setAttribute('style', 'transition: none; transform: rotateX(45deg) translateY(10px);');
          _this.children[1].setAttribute('style', 'transition: none; transform: scaleY(1); opacity: 1');
        }
      }
    });

    clickTargets[i].addEventListener('touchend', function (e) {
      e.preventDefault();
      _this.children[1].setAttribute('style', '');
      _this.children[2].setAttribute('style', '');
      _this.setAttribute('style', 'animation: highlight .3s');
      if (offsetElm < -30) {
        offsetElm = -30;
      } else if (offsetElm > 30) {
        offsetElm = 30;
      } else {
        offsetElm = offsetElm;
      }

      if (offsetElm > 0) {
        offsetElm = offsetElm / 2;
      }

      var speed = 1 + -(offsetElm / 30);
      playMobile(_this.attributes['data-keycode'].value, speed);
      offsetElm = 0;
    });
  }

}

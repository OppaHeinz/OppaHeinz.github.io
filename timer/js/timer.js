(function () {

var tasks = [];
var totalTasks = 0;
var interval = 0;
var interval2 = 0;
var activeTask = 0;
var totalTime = 0;
var maxTime = 60 * 60 *  8;
var startTime;
var currentTime;

// Helper

function addZero(timeValue) {
  if (timeValue < 10) {
    return '0' + timeValue;
  }

  return timeValue;
}

function timeFormat(seconds) {
  var hours = Math.floor(seconds / 3600);
  var mins = Math.floor((seconds - (hours * 3600)) / 60);
  var secs = Math.floor(seconds % 60);
  return addZero(hours) + ':' + addZero(mins) + ':' + addZero(secs);
}

// End Helper

// Task Class

var Task = function () {
  this.textMessage = '';
  this.timeStore = 0;
  this.taskStartTime = 0;
  this.workingTime = 0;
  this.elementId = 't' + totalTasks;
  this.taskId = totalTasks;
  this.now = 0;
};

Task.prototype.addSecond = function () {
  var now = new Date();
  var progress = now.getTime() - this.taskStartTime;
  this.workingTime = this.timeStore + progress;
};

Task.prototype.getElementId = function () {
  return this.elementId;
};

Task.prototype.getSeconds = function () {
  return this.workingTime / 1000;
};

var uiCalculateMinuteRadius = function () {
  var minutes = totalTime % 60;
  if (Math.round(minutes) === 0) {
    minutes = 60;
  }

  if (Math.round(minutes) === 1) {
    $('#c3').hide();
    window.setTimeout(function () {$('#c3').show();}, 20);
  }

  return Math.round((60 * Math.PI * 2) / (maxTime / 60 / 8) * minutes);
};

var renderProgress = function () {
  $('.current-total-progress-time').text(timeFormat(totalTime));

  var statusHours = (75 * Math.PI * 2) / maxTime * totalTime;
  var statusMinutes = uiCalculateMinuteRadius();

  $('#c2').css('stroke-dasharray', statusHours + ',' + (75 * Math.PI * 2));
  $('#c3').css('stroke-dasharray', statusMinutes + ',' + (60 * Math.PI * 2));
};

var trackTotalTime = function () {
  var now = new Date();
  var currentTime = now.getTime() - startTime;
  totalTime = Math.floor(currentTime / 1000);
};

var increaseWorkingTime = function () {
  trackTotalTime();
  tasks[activeTask].addSecond();
  $('#p' + tasks[activeTask].taskId).text(timeFormat(tasks[activeTask].getSeconds()));
};

var startTimer = function () {
  var d = new Date();
  interval = window.setInterval(increaseWorkingTime, 100);
  interval2 = window.setInterval(renderProgress, 1000);
  startTime = d.getTime();
  currentTime = startTime;
};

var changeTask = function (elem) {

  if (tasks[elem].textMessage !== '') {
    activeTask = tasks[elem].taskId;

    var d = new Date();
    tasks[elem].taskStartTime = d.getTime();
    tasks[elem].timeStore = tasks[elem].workingTime;

    $('.item').removeClass('active');
    $('#i' + elem).parent().parent().parent().addClass('active');
    if (interval === 0) {
      $('#progress').addClass('animate');
      startTimer();
    }

    var target = $('#i' + elem);
    $('html,body').animate({
      scrollTop: target.offset().top - $('.time-overview').outerHeight() - 5,
    }, 300);
  }

};

var uiAddItem = function (item) {
  changeTask($(item).attr('data-id'));
  $('.item').removeClass('active');
  $(item).parent().parent().addClass('active');
};

var uiRenderItem = function (currentId) {
  return '<div class="item"><div class="task-item"><form data-id="' + currentId + '" action="#"><input placeholder="Hi, please enter task name" type="text" id="i' + currentId + '" required="required"><div class="time"><span id="p' + currentId + '">00:00:00</span></div><button type="submit">⏱ <span></span></button></div></form></div>';
};

var addTask = function () {
  totalTasks++;
  var currentId = totalTasks;
  tasks[currentId] = new Task();
  $('#timer').append(uiRenderItem(currentId));
  $('#i' + currentId).focus();
};

var init = function () {
  $('#timer').append(uiRenderItem(totalTasks));
  tasks[totalTasks] = new Task();
};

////////

init();

///////

$('#timer').on('change', 'input', function () {
  var id = $(this).attr('id').replace('i', '');
  tasks[id].textMessage = $(this).val();
});

$('#add').on('click', function () {
  addTask();
});

$('#timer').on('submit', 'form', function (e) {
  e.preventDefault();
  uiAddItem(this);
  $(this).find('input').blur();
});

$(document).on('keyup', function (e) {
  e.preventDefault();
  if ((e.keyCode === 187 || e.keyCode === 107)  && $('input:focus').length === 0) {
    addTask();
  }

  if ($('input:focus').length === 0) {

    switch (e.keyCode){
      // 1
      case 49:
        changeTask(0);
      break;

      // 2
      case 50:
        changeTask(1);
      break;

      // 3
      case 51:
        changeTask(2);
      break;

      // 4
      case 52:
        changeTask(3);
      break;

      // 5
      case 53:
        changeTask(4);
      break;

      // 6
      case 54:
        changeTask(5);
      break;

      // 7
      case 55:
        changeTask(6);
      break;

      // 8
      case 56:
        changeTask(7);
      break;

      // 9
      case 57:
        changeTask(8);
      break;
    }
  }
});

})();

// Імпорт Vimeo плеєра
import Player from '@vimeo/player';

// Підключення 'lodash.throttle'
var throttle = require('lodash.throttle');

// Ініціалізація плеєра
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);


const onTimeUpDateUser = function (data) {
      localStorage.setItem('videoplayer-current-time', data.seconds);
  };

player.on('timeupdate', throttle(onTimeUpDateUser, 1000));

const currentTime = Number(localStorage.getItem('videoplayer-current-time'))

player.setCurrentTime(currentTime).then(function(seconds) {
   // seconds = the actual time that the player seeked to
}).catch(function(error) {
  switch (error.name) {
      case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

      default:
          // some other error occurred
          break;
  }
});


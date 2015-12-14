var chalk = require('chalk');

module.exports = function (text, palette) {
  var colors = palette.split(' ').map(function (color) { return chalk[color] });
  var index = 0;

  function rainbow(character) {
    return colors[index++ % colors.length](character);
  }

  return text.split('').map(rainbow).join('')
}

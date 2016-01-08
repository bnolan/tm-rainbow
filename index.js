var chalk = require('chalk');
var tinygradient = require('tinygradient')
var colors = require('ansi-256-colors')

function simple (text, palette) {
  var colors = palette.split(' ').map(function (color) { return chalk[color] });
  var index = 0;

  function rainbow(character) {
    return colors[index++ % colors.length](character);
  }

  return text.split('').map(rainbow).join('')
}

function gradual (text, palette, length) {
	var gradient = tinygradient(palette.split(' ')).rgb(length)

	function ansiColor(c) {
		return colors.fg.getRgb(parseInt(c._r / 43), parseInt(c._g / 43), parseInt(c._b / 43));
	}

	var result = '';
	var start = 0;
	var i = start;

	for (j=0;j<text.length;j++) {
		result += ansiColor(gradient[i % length]) + text[j];

		i++;

		if (text[j] == '\n'){
			start++;
			i = start;
		}
	}

	return result;
}

module.exports = function (text, palette, cycleLength) {

  if (!cycleLength) {
  	return simple(text, palette);
  } else {
  	return gradual(text, palette, cycleLength);
  }
}

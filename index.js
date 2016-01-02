/*jslint node: true*/

/*
	type-checking inspired by npm's
	massively popular isArray package
	
	name inspired by Mavis Beacon
*/
var type;
(function () {
	'use strict';

	function check(data) {
		var string = Object.prototype.toString.call(data);
		return string.match(/^\[object (\w+)\]$/)[1].toLowerCase();
	}

	type = function (data) {
		if (!arguments.length) {
			return null;
		}
		var description = check(data);

		switch (description) {
		case 'number':
			if (isNaN(data)) {
				return 'NaN';
			}
			if (!isFinite(data)) {
				return 'infinity';
			}
			break;

		case 'function':
			if (data.constructor.name === 'GeneratorFunction') {
				return 'generator';
			}
			break;

		case 'window':
			return 'global';

		case 'math':
		case 'json':
			return 'object';

		case 'regexp':
			return 'RegExp';
		}

		if (description.match(/html/i)) {
			return 'html';
		}

		return description;
	};

	type.is = function (actual, Expected) {
		if (arguments.length < 2) {
			throw new Error('Not enough arguments');
		}
		if (type(Expected) === 'function') {
			Expected = type(new Expected());
		}
		if (type(Expected) !== 'string') {
			Expected = type(Expected);
		}
		return type(actual) === Expected;
	};

}());


if (typeof module !== 'undefined') {
	module.exports = type;
}

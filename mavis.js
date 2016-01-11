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

	type.is = function (input, comparison) {
		if (arguments.length < 2) {
			throw new Error('Not enough arguments');
		}
		var match, actual, expected;
		expected = type(comparison);
		actual = type(input);

		switch (expected) {
		case 'string':
			return actual === comparison;
		case 'array':
			match = comparison.filter(function (expected) {
				return actual === expected && expected;
			});
			return !!match.length && match[0];
		case 'function':
			throw new TypeError('Constructors are deprecated');
		}
	};

}());


if (typeof module !== 'undefined') {
	module.exports = type;
}

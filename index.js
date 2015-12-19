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
		var description = check(data);
		switch (description) {
		case 'number':
			if (isNaN(data)) {
				return 'NaN';
			}
			break;
		case 'function':
			if (Function.prototype.isGenerator) {
				if (data.isGenerator()) {
					return 'generator';
				}
			}
			break;
		}

		return description;
	};

}());


if (typeof module !== 'undefined') {
	module.exports = type;
}
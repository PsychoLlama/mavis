/*jslint node: true*/
/*globals describe, it, expect*/
'use strict';

var type = require('../index.js');

describe('mavis', function () {
	it('should recognize undefined', function () {
		var val = type();
		expect(val).toBe('undefined');
	});
	it('should recognize booleans', function () {
		expect(type(true)).toBe('boolean');
		expect(type(false)).toBe('boolean');
	});
	it('should recognize null', function () {
		expect(type(null)).toBe('null');
	});
	it('should recognize objects', function () {
		var val = type({});
		expect(val).toBe('object');
	});
	it('should recognize arrays', function () {
		var val = type([]);
		expect(val).toBe('array');
	});
	it('should recognize numbers', function () {
		expect(type(5)).toBe('number');
		expect(type(0)).toBe('number');
		expect(type(10e15)).toBe('number');
		expect(type(Infinity)).toBe('number');
	});
	it('should recognize NaN', function () {
		var val = type(NaN);
		expect(val).toBe('NaN');
	});
	it('should recognize functions', function () {
		var val = type(function () {});
		expect(val).toBe('function');
	});
	it('should recognize strings', function () {
		var val = type('sup');
		expect(val).toBe('string');
	});
	it('should identify instances by their type', function () {
		function Potato() {}
		var val = type(new Potato());
		expect(val).toBe('object');
	});
});
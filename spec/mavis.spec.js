/*jslint node: true*/
/*globals describe, it, expect, jasmine*/
'use strict';

var type = require('../index.js');

describe('mavis', function () {
	it('should return null without input', function () {
		expect(type()).toBe(null);
	});

	it('should recognize undefined', function () {
		var val = type(undefined);
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
	});

	it('should recognize NaN', function () {
		var val = type(NaN);
		expect(val).toBe('NaN');
	});

	it('should recognize infinity', function () {
		expect(type(Infinity)).toBe('infinity');
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

	it('should call math an object', function () {
		var val = type(Math);
		expect(val).toBe('object');
	});

	it('should capitalize RegExp', function () {
		var val = type(/test/);
		expect(val).toBe('RegExp');
	});

	it('should call json an object', function () {
		expect(type(JSON)).toBe('object');
	});

	describe('type comparison', function () {

		it('should throw when insufficient ' +
			'arguments are given',
			function () {
				expect(type.is).toThrow();
			});

		it('should be a function', function () {
			expect(type.is).toEqual(jasmine.any(Function));
		});

		it('should return false for non-matching primitives', function () {
			expect(type.is('string', 'number')).toBe(false);
		});

		it('should return true for matching primitives', function () {
			expect(type.is(10, 'number')).toBe(true);
			expect(type.is('test', 'string')).toBe(true);
			expect(type.is(10, 'number')).toBe(true);
		});

		it('should return true for matching non-primitives', function () {
			expect(type.is({}, 'object')).toBe(true);
			expect(type.is([], 'array')).toBe(true);
			expect(type.is([], 'object')).toBe(false);
			expect(type.is({}, 'array')).toBe(false);
		});

		it('should accept constructors to match against', function () {
			expect(type.is([], Array)).toBe(true);
			expect(type.is({}, Object)).toBe(true);
			expect(type.is(5, Number)).toBe(true);
			expect(type.is(Infinity, Infinity)).toBe(true);
			expect(type.is('string', String)).toBe(true);
		});

		it('should take non-constructors as raw values', function () {
			expect(type.is(null, undefined)).toBe(false);
			expect(type.is(null, null)).toBe(true);
			expect(type.is('string', undefined)).toBe(false);
			expect(type.is(Number(), 10)).toBe(true);
		});

	});
});

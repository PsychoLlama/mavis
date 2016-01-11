# Mavis
[![Travis](https://img.shields.io/travis/PsychoLlama/mavis.svg?style=flat-square)](https://travis-ci.org/PsychoLlama/mavis.svg?branch=master)[![npm](https://img.shields.io/npm/dt/mavis.svg?style=flat-square)](https://www.npmjs.com/package/mavis)[![npm](https://img.shields.io/npm/v/mavis.svg?style=flat-square)](https://www.npmjs.com/package/mavis)

Reliable, light-weight, highly-specific type checking for javascript. Like a thorough `typeof`.

I found myself writing this code over and over, so I figured I'd make a package out of it and send it to the internet.

## Usage

Mavis works both in node and the browser. Simply include it as a `<script>` tag or 

`$ npm install mavis` and `require('mavis')` from your app.

### examples
```javascript
// node
var type = require('mavis')
```
```html
<!-- browser -->
<script src="mavis.js"></script>
```

```javascript
// objects
type({}) // 'object'
type([]) // 'array'

function Example() {}
type(new Example) // 'object'

// functions
type(JSON.parse) // 'function'
type(function () {}) // 'function'
type(function* () {}) // 'generator'

// numbers
type(0) // 'number'
type(-100) // 'number'
type(Infinity) // 'infinity'
type(NaN) // 'NaN'

// strings
type('string') // 'string'
type(`template $(string)`) // 'string'

// errors
type(new Error) // 'error'
type(new TypeError) // 'error'
type(new SyntaxError) // 'error'
type(new EvalError) // 'error'
type(new RangeError) // 'error'
type(new ReferenceError) // 'error'

// html
type(new Image) // 'html'
type(new Audio) // 'html'
type(document) // 'html'

function element(type) {
	return document.createElement(type);
}
type(element('table')) // 'html'
type(element('div')) // 'html'
type(element('h1')) // 'html'
type(element('li')) // 'html'

// special
type(window) // 'global'
type(localStorage) // 'storage'
type(new Date) // 'date'
type(new Map) // 'map'
type(new Set) // 'set'
type(new Promise(func)) // 'promise'
type(arguments) // 'arguments'
type(/matcher/) // 'RegExp'
type(new Uint16Array) // 'uint16array'
```

### type.is(actual, expected)

Mavis comes with type comparison. The result of a comparison is a boolean, unless you pass an array to match against, in which case the matching type is returned.

```javascript
type.is('string', 'string') // true
type.is([1, 2, 3], 'html') // false
type.is(JSON, 'object') // true
type.is(5, ['object', 'number', 'array']) // 'number'

type.is(/exp/, 'RegExp') // true
type.is(/exp/, ['number', 'generator']) // false
type.is(/exp/, ['number', 'RegExp']) // 'RegExp'
type.is(/exp/, 'string') // false
```

## advantages
Mavis is intentionally string-based. Some libraries check by constructor, although this forces you to ensure the type is defined before using it. By using strings, type-checking is completely backwards/forwards compatible. If a type you need to check against isn't supported in your browser, you can check for it without worrying. It's just a string!

## final words

If you have any issues, problems, or questions, please submit an issue on [GitHub](https://github.com/PsychoLlama/mavis).

Thanks for using Mavis!
# Mavis
[![Travis](https://img.shields.io/travis/PsychoLlama/mavis.svg?style=flat-square)](https://travis-ci.org/PsychoLlama/mavis.svg?branch=master)[![npm](https://img.shields.io/npm/dt/mavis.svg?style=flat-square)](https://www.npmjs.com/package/mavis)[![npm](https://img.shields.io/npm/v/mavis.svg?style=flat-square)](https://www.npmjs.com/package/mavis)

Reliable, light-weight type checking for javascript. Like a thorough `typeof`.

I found myself writing this code over and over, so I figured I'd make a package out of it and send it to the internet.

## Usage

Mavis works both in node and the browser. Simply include it as a `<script>` tag or `$ npm install mavis` and `require('mavis')` from your app.

```javascript
var type = require('mavis')
type('data') // 'string'
type([]) // 'array'
type(NaN) // 'NaN'
type(new CustomClassInstance) // 'object'
type(function*() {}) // 'generator'
type(htmlElement) // 'html'
```

> **warning:** Some built-in objects have more specific types. For example, type(JSON) returns 'json' and localStorage returns 'storage'. This only applies to built-in values.
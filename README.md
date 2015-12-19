# Mavis
Reliable, light-weight type checking for javascript. Like a thorough `typeof`.

I found myself writing this code over and over, so I figured I'd make a package out of it and send it to the internet.

## Usage

Mavis works both in node and the browser. Simply include it as a `<script>` tag or `$ npm install mavis` and `require('mavis')` from your app.

```javascript
var type = require('mavis')
type('data') // 'string'
type([]) // 'array'
type(NaN) // 'NaN'
type(new ArbitraryClassInstance) // 'object'
type(function*() {}) // 'generator'
```
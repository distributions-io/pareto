pareto
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Pareto distribution.


## Installation

``` bash
$ npm install distributions-pareto
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage


``` javascript
var createDist = require( 'distributions-pareto' );
```

To create a distribution,

``` javascript
var dist = createDist();
```

The distribution is configurable and has the following methods...


#### dist.support()

Returns the distribution support.

``` javascript
dist.support();
// returns
```


#### dist.mean( [value] )

This method is a setter/getter. If no `value` is provided, returns the distribution `mean`. To set the distribution `mean`,

``` javascript
dist.mean( 100 );
```


#### dist.variance( [value] )

This method is a setter/getter. If no `value` is provided, returns the distribution `variance`. To set the distribution `variance`,

``` javascript
dist.variance();
```


#### dist.median()

Returns the distribution `median`.

``` javascript
var median = dist.median();
// equals
```


#### dist.mode()

Returns the distribution `mode`.

``` javascript
var mode = dist.mode();
// equals
```


#### dist.skewness()

Returns the distribution `skewness`.

``` javascript
var skewness = dist.skewness();
// returns
```

#### dist.ekurtosis()

Returns the distribution `excess kurtosis`.

``` javascript
var excess = dist.ekurtosis();
// returns
```


#### dist.information()

Returns the [Fisher information](http://en.wikipedia.org/wiki/Fisher_information).

``` javascript
var info = dist.information();
// returns [...]
```


#### dist.entropy()

Returns the distribution's [differential entropy](http://en.wikipedia.org/wiki/Differential_entropy).

``` javascript
var entropy = dist.entropy();
//
```

#### dist.pdf( [x] )

If no argument is provided, returns the probability density function (PDF). If a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix) is provided, evaluates the PDF for each element.

``` javascript
var data = [ 0, 0.2, 0.5, 0.8 ];

var pdf = dist.pdf( data );
// returns [...]
```

#### dist.cdf( [x] )

If no argument is provided, returns the cumulative distribution function (CDF). If a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix) is provided, evaluates the CDF for each element.


``` javascript
var data = [ 0, 0.2, 0.5, 0.8 ];

var cdf = dist.cdf( data );
// returns [...]
```


#### dist.quantile( [p] )

If no argument is provided, returns the inverse cumulative distribution (quantile) function. If a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix) of probabilities is provided, evaluates the quantile function for each element.

``` javascript
var probs = [ 0.025, 0.5, 0.975 ];

var quantiles = dist.quantile( probs );
// returns [...]
```

Note: all values must exist on the interval `[0, 1]`. The function returns `NaN` for a value not satisfying this condition.

#### dist.mgf( [t] )

If no argument is provided, returns the moment generating function (MGF) of the distribution. If a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix) is provided, evaluates the MGF for each input element.

``` javascript
var t = [ 0, 0.5, 1, 1.5, 2 ];

var mgf = dist.mgf( t );
// returns [...]
```

## Examples

``` javascript
var createDist = require( 'distributions-pareto' );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ open reports/coverage/lcov-report/index.html
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Distributions.io](https://github.com/distributions-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-pareto.svg
[npm-url]: https://npmjs.org/package/distributions-pareto

[travis-image]: http://img.shields.io/travis/distributions-io/pareto/master.svg
[travis-url]: https://travis-ci.org/distributions-io/pareto

[coveralls-image]: https://img.shields.io/coveralls/distributions-io/pareto/master.svg
[coveralls-url]: https://coveralls.io/r/distributions-io/pareto?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/pareto.svg
[dependencies-url]: https://david-dm.org/distributions-io/pareto

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/pareto.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/pareto

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/pareto.svg
[github-issues-url]: https://github.com/distributions-io/pareto/issues

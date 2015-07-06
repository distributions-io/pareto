'use strict';

// MODULES //

var isPositive = require( 'validate.io-positive'),
	isObject = require( 'validate.io-object' );

// FUNCTIONS //

var getPDF = require( './pdf.js' ),
	getCDF = require( './cdf.js' ),
	getQuantileFunction = require( './quantile.js' ),
	getMGF = require( './mgf.js' ),
	apply = require( './apply.js' );


// DISTRIBUTION //

/**
* FUNCTION: Distribution( [opts] )
*	Distribution constructor.
*
* @constructor
* @param {Object} [opts] - function options
* @param {Number} [opts.shape=1] - shape parameter
* @param {Number} [opts.scale=1] - scale parameter
* @returns {Distribution} Distribution instance
*/
function Distribution( options ) {

	var opts = {};

	if ( arguments.length > 0 ) {
		if ( !isObject( options ) ) {
			return new TypeError( 'constructor()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
		}
		if ( opts.hasOwnProperty( 'shape' ) ) {
			if ( !isPositive( options.shape ) ) {
				throw new TypeError( 'constructor()::invalid option. Shape parameter `shape` must be a positive number. Value: `' + options.shape + '`' );
			} else {
				opts.shape = options.shape;
			}
		}
		if ( opts.hasOwnProperty( 'scale' ) ) {
			if ( !isPositive( options.scale ) ) {
				throw new TypeError( 'constructor()::invalid option. Scale parameter `scale` must be a positive number. Value: `' + options.scale + '`' );
			} else {
				opts.scale = options.scale;
			}
		}
	}

	this._shape = opts.shape || 1 ; // shape parameter ( 0 not a valid input, so || valid to set default )
	this._scale = opts.scale || 1; // scale parameter ( 0 not a valid input, so || valid to set default )
	return this;
} // end FUNCTION Distribution()

/**
* METHOD: support()
*	Returns the distribution support.
*
* @returns {Array} distribution support
*/
Distribution.prototype.support = function() {
	return [ this._scale, +Infinity ];
}; // end METHOD support()

/**
* METHOD: shape( [value] )
*	`shape` setter and getter. If a value is provided, sets the shape parameter. If no value is provided, returns it.
*
* @param {Number} [value] - shape parameter
* @returns {Distribution|Number} Distribution instance or `shape` parameter
*/
Distribution.prototype.shape = function( value ) {
	if ( !arguments.length ) {
		return this._shape;
	}
	if ( !isPositive( value ) ) {
		throw new TypeError( 'shape()::invalid input argument. Shape parameter `shape` must be a positive number. Value: `' + value + '`' );
	}
	this._shape = value;
	return this;
}; // end METHOD shape()

/**
* METHOD: scale( [value] )
*	`scale` setter and getter. If a value is provided, sets the scale parameter. If no value is provided, returns it.
*
* @param {Number} [value] - scale parameter
* @returns {Distribution|Number} Distribution instance or `scale` parameter
*/
Distribution.prototype.scale = function( value ) {
	if ( !arguments.length ) {
		return this._scale;
	}
	if ( !isPositive( value ) ) {
		throw new TypeError( 'scale()::invalid input argument. Scale parameter `scale` must be a positive number. Value: `' + value + '`' );
	}
	this._scale = value;
	return this;
}; // end METHOD scale()

/**
* METHOD: mean()
*	Returns the distribution mean.
*
* @returns {Number} mean value
*/
Distribution.prototype.mean = function() {
	var a = this._shape;
	var b = this._scale;
	return a <= 1 ? +Infinity : ( a * b ) / ( a - 1 );
}; // end METHOD mean()

/**
* METHOD: variance()
*	Returns the distribution variance.
*
* @returns {Number} variance
*/
Distribution.prototype.variance = function() {
	var a = this._shape;
	var b = this._scale;
	if ( a > 0.5 && a <= 2) {
		return +Infinity;
	} else if ( a > 2 ) {
		return Math.pow( b / ( a - 1 ), 2 ) * ( a / ( a - 2 ) );
	} else {
		return NaN;
	}
}; // end METHOD variance()

/**
* METHOD: median()
*	Returns the distribution median.
*
* @returns {Number} median
*/
Distribution.prototype.median = function() {
	var a = this.shape;
	return this._scale * Math.pow( 2, 1/a );
}; // end METHOD median()

/**
* METHOD: mode()
*	Returns the distribution mode.
*
* @returns {Number} mode
*/
Distribution.prototype.mode = function() {
	return this._scale;
}; // end METHOD mode()

/**
* METHOD: skewness()
*	Returns the distribution skewness.
*
* @returns {Number} skewness
*/
Distribution.prototype.skewness = function() {
	var a = this._shape;
	if ( a > 3 ) {
		return ( 2 * ( 1 + a ) / ( a - 3 ) ) * Math.sqrt( ( a - 2 ) / a );
	} else {
		return NaN;
	}
}; // end METHOD skewness()

/**
* METHOD: ekurtosis()
*	Returns the distribution excess kurtosis.
*
* @returns {Number} excess kurtosis
*/
Distribution.prototype.ekurtosis = function() {
	var num, denom,
		a = this._shape;

	if ( a > 4 ) {
		num = 6 * ( Math.pow( a, 3 ) + Math.pow( a, 2 ) - 6 * a - 2 );
		denom = a * ( a - 3 ) * ( a - 4 );
		return num / denom;
	} else {
		return NaN;
	}
}; // end METHOD ekurtosis()

/**
* METHOD: entropy()
*	Returns the entropy.
*
* @returns {Number} entropy
*/
Distribution.prototype.entropy = function() {
	var a = this._shape;
	var b = this._scale;
	return Math.log( b / a ) + 1/a + 1;
}; // end METHOD entropy()

/**
* METHOD: pdf( [x] )
*	If provided an input `x`, evaluates the distribution PDF for each element. If no input argument is provided, returns the PDF.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} [x] - input values
* @returns {Function|Array|Matrix|Number} distribution PDF or evaluated PDF
*/
Distribution.prototype.pdf = function( x ) {
	var pdf;

	pdf = getPDF( this._shape, this._scale );

	if ( !arguments.length ) {
		return pdf;
	}
	return apply( pdf, x );
}; // end METHOD pdf()

/**
* METHOD: cdf( [x] )
*	If provided an input `x`, evaluates the distribution CDF for each element. If no input argument is provided, returns the CDF.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} [x] - input values
* @returns {Function|Array|Matrix|Number} distribution CDF or evaluated CDF
*/
Distribution.prototype.cdf = function( x ) {
	var cdf;

	cdf = getCDF( this._shape, this._scale );

	if ( !arguments.length ) {
		return cdf;
	}
	return apply( cdf, x );

}; // end METHOD cdf()

/**
* METHOD: quantile( [p] )
*	If provided an input `p`, evaluates the distribution quantile function for each element. If no input argument is provided, returns the quantile function.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} [p] - input values
* @returns {Function|Array|Matrix|Number} distribution quantile function or evaluated quantile function
*/
Distribution.prototype.quantile = function( p ) {
	var q;

	q = getQuantileFunction( this._shape, this._scale );
	if ( !arguments.length ) {
		return q;
	}
	return apply( q, p );
}; // end METHOD quantile()


/**
* METHOD: mgf( [t] )
*	If provided an input `t`, evaluates the moment generating function for each element. If no input argument is provided, returns the moment generating function.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} [t] - input values
* @returns {Function|Array|Matrix|Number} moment generating function or evaluated moment generating function
*/
Distribution.prototype.mgf = function( t ) {
	var m;

	m = getMGF( this._shape, this._scale );

	if ( !arguments.length ) {
		return m;
	}
	return apply( m, t );
}; // end METHOD mgf()

// EXPORTS //

module.exports = function createDistribution( options ) {
	return new Distribution( options );
};

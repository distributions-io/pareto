'use strict';

// MODULES //

var gammainc = require( 'compute-gammainc' );


/**
* FUNCTION: getMGF( mu, b )
*	Returns a moment generating function for a Pareto distribution with with scale parameter `b` and shape parameter `a`.
*
* @private
* @param {Number} a - shape parameter
* @param {Number} b - scale prameter
* @returns {Function} moment generating function (MGF)
*/
function getMGF( a, b ) {
	/**
	* FUNCTION: mgf( t )
	*	Evaluates the moment generating function at input value `t`.
	*
	* @private
	* @param {Number} t - input value
	* @returns {Number} evaluated MGF
	*/
	return function mgf( t ) {
		if ( t < 0 ) {
			var gVal = gammainc( -b * t, -a, {
				'regularized': false,
				'tail': 'upper'
			});
			return a * Math.pow( - b * t, a ) * gVal;
		} else if ( t === 0 ) {
			return 1;
		} else {
			return NaN;
		}
	};
} // end FUNCTION getMGF()


// EXPORTS //

module.exports = getMGF;

'use strict';

/**
* FUNCTION: getCDF( a, b )
*	Returns a cumulative distribution function for a Pareto distribution with with scale parameter `b` and shape parameter `a`.
*
* @private
* @param {Number} a - shape parameter
* @param {Number} b - scale prameter
* @returns {Function} cumulative density function (CDF)
*/
function getCDF( a, b ) {
	/**
	* FUNCTION: cdf( x )
	*	Evaluates the cumulative distribution function at input value `x`.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated CDF
	*/
	return function cdf( x ) {
    	if ( x >= b ) {
			return 1 - Math.pow( b / x, a );
		} else {
			return 0;
		}
	};
} // end FUNCTION getCDF()


// EXPORTS //

module.exports = getCDF;

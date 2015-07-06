'use strict';

/**
* FUNCTION: getQuantileFunction( a, b )
*	Returns a quantile function for a Pareto distribution with with scale parameter `b` and shape parameter `a`.
*
* @private
* @param {Number} a - shape parameter
* @param {Number} b - scale prameter
* @returns {Function} quantile function
*/
function getQuantileFunction( a, b ) {
	/**
	* FUNCTION: quantile( p )
	*	Evaluates the quantile function at input value `p`.
	*
	* @private
	* @param {Number} p - input value
	* @returns {Number} evaluated quantile function
	*/
	return function quantile( p ) {
		if ( 0 <= p && p < 1 ) {
			return b / Math.pow( 1 - p, 1/a );
		} else {
			return NaN;
		}
	};
} // end FUNCTION getQuantileFunction()


// EXPORTS //

module.exports = getQuantileFunction;

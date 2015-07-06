'use strict';

/**
* FUNCTION: getPDF( a, b )
*	Returns a probability density function for a Pareto distribution with with scale parameter `b` and shape parameter `a`.
*
* @private
* @param {Number} a - shape parameter
* @param {Number} b - scale prameter
* @returns {Function} probability density function (PDF)
*/
function getPDF( a, b ) {
	/**
	* FUNCTION: pdf( x )
	*	Evaluates the probability distribution function at input value `x`.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated PDF
	*/
	return function pdf( x ) {
		var num, denom;
		if ( x >= b ) {
			num = a * Math.pow( b, a );
			denom = Math.pow( x, a + 1 );
			return num / denom;
		} else {
			return 0;
		}
	};
} // end FUNCTION getPDF()


// EXPORTS //

module.exports = getPDF;

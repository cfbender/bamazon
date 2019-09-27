/**
 *
 *
 * @param {string} str Any text to center pad to given length
 * @param {number} endLength The full length of the padded string
 * @returns {string} centered string with roughly even whitespace on each end of length endLength
 */
module.exports = (str, endLength) => {
  let padStr = str ? str.toString() : "";
  let left = Math.floor((endLength - padStr.length) / 2) + padStr.length;
  let right = Math.floor((endLength - padStr.length) / 2) + left;
  return padStr.padStart(left + 1, " ").padEnd(right, " ");
};

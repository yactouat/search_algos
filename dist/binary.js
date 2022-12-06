"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortArr = exports.getMidElIdx = exports.binSearch = void 0;
/**
 *
 * performs a binary search to return the index of the seached value (needle) or -1 if not found
 *
 * @param  {Array<number>} haystack
 * @param  {number} needle
 * @param  {number} leftIdx
 * @param  {number} rightIdx
 * @returns number
 */
const binSearch = (haystack, needle, leftIdx, rightIdx) => {
    haystack = (0, exports.sortArr)(haystack);
    if (rightIdx >= leftIdx) {
        const midIdx = (0, exports.getMidElIdx)(leftIdx, rightIdx);
        if (haystack[midIdx] === needle) {
            return midIdx;
        }
        if (haystack[midIdx] > needle) {
            return (0, exports.binSearch)(haystack, needle, leftIdx, midIdx - 1);
        }
        return (0, exports.binSearch)(haystack, needle, midIdx + 1, rightIdx);
    }
    return -1;
};
exports.binSearch = binSearch;
/**
 *
 * gets the middle index between two boundaries
 *
 * @param  {number} leftIdx
 * @param  {number} rightIdx
 * @returns number
 */
const getMidElIdx = (leftIdx, rightIdx) => {
    return Math.floor((leftIdx + rightIdx) / 2);
};
exports.getMidElIdx = getMidElIdx;
/**
 *
 * takes an input array and returns it sorted
 *
 * TODO sort other data types than numbers
 *
 * @param  {Array<unknown>} arr the array of values to sort
 * @returns Array the sorted array
 */
const sortArr = (arr) => {
    const sortedArr = arr;
    sortedArr.sort((a, b) => {
        if (typeof a === 'number' && typeof b === 'number') {
            return a - b;
        }
        return 0;
    });
    return sortedArr;
};
exports.sortArr = sortArr;

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
export const binSearch = (haystack: Array<number>, needle: number, leftIdx: number, rightIdx: number): number => {
    haystack = sortArr(haystack);
    if (rightIdx >= leftIdx) {
        const midIdx = getMidElIdx(leftIdx, rightIdx);
        if (haystack[midIdx] === needle) {
            return midIdx;
        }
        if (haystack[midIdx] > needle) {
            return binSearch(haystack, needle, leftIdx, midIdx - 1);
        }
        return binSearch(haystack, needle, midIdx + 1, rightIdx);
    }
    return -1;
}

/**
 * 
 * gets the middle index between two boundaries
 * 
 * @param  {number} leftIdx
 * @param  {number} rightIdx
 * @returns number
 */
export const getMidElIdx = (leftIdx: number, rightIdx: number): number => {
    return Math.floor((leftIdx  + rightIdx) / 2);
}

/**
 * 
 * takes an input array and returns it sorted
 * 
 * TODO sort other data types than numbers
 * 
 * @param  {Array<unknown>} arr the array of values to sort
 * @returns Array the sorted array
 */
 export const sortArr = (arr: Array<number>): Array<number> => {
    const sortedArr = arr;
    sortedArr.sort((a: number, b:number): number => {
        if (typeof a === 'number' && typeof b === 'number') {
            return a - b;
        }
        return 0;
    });
    return sortedArr;
}
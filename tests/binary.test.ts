import {getMidElIdx, sortArr, binSearch} from '../src/binary';

describe('testing `getMidEl`', () => {

    test('mid-element index with odd array length is rounded down', () => {
        const input = [
            10,
            20,
            30,
            40,
            50,
            60,
            70,
            80,
            90,
            100
        ];
        const expected = 4;
        const actual = getMidElIdx(0, input.length - 1);
        expect(actual).toBe(expected);
    });

    test('sort arrays with numbers array containing `10` and `100` values', () => {
        const input = [
            90,
            20,
            30,
            50,
            60,
            70,
            80,
            10,
            100,
            40
        ];
        const expected = [
            10,
            20,
            30,
            40,
            50,
            60,
            70,
            80,
            90,
            100  
        ];
        const actual = sortArr(input);
        expect(actual).toEqual(expected);
    });

    test('bin search happy path', () => {
        const haystack = [
            10,
            20,
            30,
            40,
            50,
            60,
            70,
            80,
            90,
            100
        ];
        const expected = 6;
        const actual = binSearch(haystack, 70, 0, haystack.length - 1);
        expect(actual).toBe(expected);
    });

    test('bin search unhappy path', () => {
        const haystack = [
            10,
            20,
            30,
            40,
            50,
            60,
            70,
            80,
            90,
            100
        ];
        const expected = -1;
        const actual = binSearch(haystack, 120, 0, haystack.length - 1);
        expect(actual).toBe(expected);
    });

    test('bin search win unsorted array', () => {
        const haystack = [
            20,
            50,
            40,
            60,
            80,
            90,
            30,
            100,
            70,
            10
        ];
        const expected = 6;
        const actual = binSearch(haystack, 70, 0, haystack.length - 1);
        expect(actual).toBe(expected);
    });

    test('bin search with empty array', () => {
        const haystack: number[] = [];
        const expected = -1;
        const actual = binSearch(haystack, 70, 0, haystack.length - 1);
        expect(actual).toBe(expected);
    });

    test('bin search with 1 element array and needle in it', () => {
        const haystack: number[] = [70];
        const expected = 0;
        const actual = binSearch(haystack, 70, 0, haystack.length - 1);
        expect(actual).toBe(expected);
    });

    test('bin search with 1 element array and needle not in it', () => {
        const haystack: number[] = [70];
        const expected = -1;
        const actual = binSearch(haystack, 80, 0, haystack.length - 1);
        expect(actual).toBe(expected);
    });

});
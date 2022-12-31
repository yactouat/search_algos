import Node from "../../src/dfs/node";
import SinglyLinkedList from "../../src/dfs/singly-linked-list";

describe('testing `SinglyLinkedList` class', () => {

    test('appending a new node on list with head', () => {
        const expected = 'bar';
        const actual = new SinglyLinkedList<string>((a, b) => a === b, new Node('foo'));
        actual.append('bar');
        expect(actual.head?.next?.data).toBe(expected);
    });

    test('new instance has head data set', () => {
        const expected = 'bar';
        const actual = new SinglyLinkedList<string>((a, b) => a === b, new Node(expected));
        expect(actual.head?.data).toBe(expected);
    });

    test('appending a new node on list with multiple values', () => {
        const expected = 'baz';
        const actual = new SinglyLinkedList<string>((a, b) => a === b, new Node('foo'));
        actual.append('bar');
        actual.append('baz');
        expect(actual.head?.next?.data).toBe('bar');
        expect(actual.head?.next?.next?.data).toBe('baz');
    });

    test('simple instance comparator works with different strings', () => {
        const actual = new SinglyLinkedList<string>((a, b) => a === b, new Node('bar'));
        if (actual.head) {
            expect(actual.equalityComparator('foo', actual.head.data)).toBe(false);
        }
        // else consider this is a failure
        else expect(false).toBe(true);
    });

    test('simple instance comparator works with same strings', () => {
        const actual = new SinglyLinkedList<string>((a, b) => a === b, new Node('bar'));
        if (actual.head) {
            expect(actual.equalityComparator('bar', actual.head.data)).toBe(true);
        }
        // else consider this is a failure
        else expect(false).toBe(true);
    });

    test('delete a node resets the chain correctly', () => {
        const expected = 'baz';
        const actual = new SinglyLinkedList<string>((a, b) => a === b, new Node('foo'));
        actual.append('bar');
        actual.append('baz');
        actual.delete('bar');
        expect(actual.head?.next?.data).toBe(expected);
    });

    test('delete an unexisting node does nothing to the list', () => {
        const expected = 'baz';
        const actual = new SinglyLinkedList<string>((a, b) => a === b, new Node('foo'));
        actual.append('bar');
        actual.append('baz');
        actual.delete('test');
        expect(actual.head?.next?.next?.data).toBe(expected);
    });

    test('delete the head with multiple values in list updates the head', () => {
        const expected = 'bar';
        const actual = new SinglyLinkedList<string>((a, b) => a === b, new Node('foo'));
        actual.append('bar');
        actual.append('baz');
        actual.delete('foo');
        expect(actual.head?.data).toBe(expected);
    });

    test('delete the head with one node in list nullifies the head', () => {
        const expected = null;
        const actual = new SinglyLinkedList<string>((a, b) => a === b, new Node('foo'));
        actual.delete('foo');
        expect(actual.head).toBe(expected);
    });

    test('search for non existing node returns null', () => {
        const expected = null;
        const actual = new SinglyLinkedList<string>((a, b) => a === b, new Node('foo'));
        actual.append('bar');
        actual.append('baz');
        expect(actual.search('test')).toBe(expected);
    });

    test('search for existing node returns correct node', () => {
        const expected = 'bar';
        const actual = new SinglyLinkedList<string>((a, b) => a === b, new Node('foo'));
        actual.append('bar');
        actual.append('baz');
        expect(actual.search('bar')?.data).toEqual(expected);
    });

});
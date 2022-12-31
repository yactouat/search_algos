import DFSGraph from '../../src/dfs/dfs-graph';
import Node from '../../src/dfs/node';
import SinglyLinkedList from '../../src/dfs/singly-linked-list';

describe('testing `DFSGraph` class', () => {

    test('new instance sets the right number of singly linked lists', () => {
        const actual = new DFSGraph(5);
        actual.adjacencyLists.forEach(list => {
            expect(list).toBeInstanceOf(SinglyLinkedList);
        });
    });

    test('instance adjacency lists are zero-indexed', () => {
        const actual = new DFSGraph(5);
        expect(actual.adjacencyLists[0]).toBeInstanceOf(SinglyLinkedList);
    });

    test('adding an edge to a vertex', () => {
        const actual = new DFSGraph(5);
        actual.addEdge(0, 1);
        expect(actual.adjacencyLists[0].head?.data).toBe(1);
    });

    test('adding multiple edges to the same vertex', () => {
        const actual = new DFSGraph(5);
        actual.addEdge(0, 1);
        actual.addEdge(0, 3);
        actual.addEdge(0, 4);
        expect(actual.adjacencyLists[0].search(3)).toBeInstanceOf(Node);
        expect(actual.adjacencyLists[0].search(3)?.data).toBe(3);
    });

    // test('fill stack from source node', () => {
    //     // TODO
    // });

    // test('depth-first search from first vertex', () => {
    //     const expected = [0, 1, 2, 3, 4];
    //     const actual = new DFSGraph(5);
    //     actual.addEdge(0, 1);
    //     actual.addEdge(0, 2);
    //     actual.addEdge(0, 3);
    //     actual.addEdge(1, 0);
    //     actual.addEdge(1, 2);
    //     actual.addEdge(2, 0);
    //     actual.addEdge(2, 1);
    //     actual.addEdge(2, 4);
    //     actual.addEdge(3, 0);
    //     actual.dfs(0);
    //     expect(actual.visited.sort()).toEqual(expected);
    // });

});
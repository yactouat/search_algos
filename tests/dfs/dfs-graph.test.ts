import Graph from '../../src/dfs/dfs-graph';
import Node from '../../src/dfs/node';
import SinglyLinkedList from '../../src/dfs/singly-linked-list';

describe('testing `Graph` class', () => {

    test('new instance sets the right number of singly linked lists', () => {
        const actual = new Graph(5);
        actual.adjacencyLists.forEach(list => {
            expect(list).toBeInstanceOf(SinglyLinkedList);
        });
    });

    test('instance adjacency lists are zero-indexed', () => {
        const actual = new Graph(5);
        expect(actual.adjacencyLists[0]).toBeInstanceOf(SinglyLinkedList);
    });

    test('adding an edge to a vertex', () => {
        const actual = new Graph(5);
        actual.addEdge(0, 1);
        expect(actual.adjacencyLists[0].head?.data).toBe(1);
    });

    test('adding multiple edges to the same vertex', () => {
        const actual = new Graph(5);
        actual.addEdge(0, 1);
        actual.addEdge(0, 3);
        actual.addEdge(0, 4);
        expect(actual.adjacencyLists[0].search(3)).toBeInstanceOf(Node);
        expect(actual.adjacencyLists[0].search(3)?.data).toBe(3);
    });

    test('fill stack from existing source node with an empty stack', () => {
        const expected = [1, 3, 4];
        const graph = new Graph(5);
        graph.addEdge(0, 1);
        graph.addEdge(0, 3);
        graph.addEdge(0, 4);
        const actual = graph.getDFSStackFromSrcNode(0);
        expect(actual.sort()).toEqual(expected);
    });

    test('fill stack from existing source node with pre filled stack', () => {
        const expected = [1, 3, 4];
        const graph = new Graph(5);
        graph.addEdge(0, 1);
        graph.addEdge(0, 3);
        graph.addEdge(0, 4);
        const actual = graph.getDFSStackFromSrcNode(0, [1, 4]);
        expect(actual.sort()).toEqual(expected);
    });

    test('fill stack from non existing source node with no prior stack returns empty array', () => {
        const expected: any[] = [];
        const graph = new Graph(5);
        graph.addEdge(0, 1);
        graph.addEdge(0, 3);
        graph.addEdge(0, 4);
        const actual = graph.getDFSStackFromSrcNode(9);
        expect(actual).toEqual(expected);
    });

    test('fill stack from non existing source node with pre filled stack returns the same stack', () => {
        const expected = [1, 3, 4];
        const graph = new Graph(5);
        graph.addEdge(0, 1);
        graph.addEdge(0, 3);
        graph.addEdge(0, 4);
        const actual = graph.getDFSStackFromSrcNode(9, expected);
        expect(actual).toEqual(expected);
    });

    // test('depth-first search from first vertex', () => {
    //     const expected = [0, 1, 2, 3, 4];
    //     const actual = new Graph(5);
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
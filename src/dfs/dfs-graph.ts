import SinglyLinkedList from "./singly-linked-list";

export default class DFSGraph {

    /**
     * 
     * this will hold all of the edges associated to each vertex, represented as a number
     * 
     * @private
     * @type {SinglyLinkedList<number>[]}
     * */    
    private _adjacencyLists: SinglyLinkedList<number>[] = [];
  
    /**
     * 
     * initializes a graph with its number of vertices
     * 
     * sets a linked lists array for each of the vertices
     * 
     * @param {number} vertices
     */
    constructor(vertices: number) {
      for (let index = 0; index < vertices; index++) {
        this._adjacencyLists[index] = new SinglyLinkedList((a, b): boolean => {
            return a === b;
        });
      }
    }

    /**
     * 
     * gets the adjacency lists of the graph
     * 
     * each index of the array represents a vertex with its associated edges
     * 
     * @returns {SinglyLinkedList<number>[]}
     */
    public get adjacencyLists(): SinglyLinkedList<number>[] {
        return this._adjacencyLists;
    }

    /**
     * 
     * adds an edge to a vertex
     * 
     * @param  {number} srcVertex
     * @param  {number} destVertex
     * @returns void
     */
    addEdge(srcVertex: number, destVertex: number): void {
        this._adjacencyLists[srcVertex].append(destVertex);
    }

    /**
     * 
     * TODO
     * 
     * performs a depth-first search of the graph from a given vertex
     * 
     * updates the visited and the stack arrays of the graph during the traversal
     * 
     * @param  {number} vertex
     * @returns void
     */
    dfs(vertex: number): void {
        throw new Error('not implemented');
    }

    // TODO test finding a set of nodes that satisfy a condition

}
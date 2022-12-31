import Node from "./node";
import SinglyLinkedList, { EqualityComparator } from "./singly-linked-list";

/**
 * 
 * represents a graph that ships with a depth-first search algorithm
 * */
export default class Graph<T> {

    /**
     * 
     * this will hold all of the edges associated to each vertex
     * 
     * @private
     * @type {SinglyLinkedList<T>[]}
     * */    
    private _adjacencyLists: SinglyLinkedList<T>[] = [];
  
    /**
     * 
     * initializes a graph with its number of vertices
     * 
     * sets a linked lists array for each of the vertices
     * 
     * @param {number|Array<T>} vertices
     * @param {EqualityComparator<T>|null} equalityComparator must be provided if vertices is an array
     */
    constructor(private _vertices: number|Array<T>, private _equalityComparator: EqualityComparator<T>|null = null) {
        let index = 0;
        if((typeof this._vertices === 'number' && this._vertices > 0)) {
            while(index < this._vertices) {
                this._adjacencyLists[index] = new SinglyLinkedList((a, b): boolean => {
                    return a === b;
                });
                index++;
            }
        } else if (Array.isArray(this._vertices) && this._equalityComparator != null) {
            for (let index = 0; index < this._vertices.length; index++) {
                this._adjacencyLists[index] = new SinglyLinkedList(this._equalityComparator);
            }
        } else {
            throw new Error('equality comparator must be provided if vertices is an array');
        }
    }

    /**
     * 
     * gets the adjacency lists of the graph
     * 
     * @returns {SinglyLinkedList<T>[]}
     */
    public get adjacencyLists() {
        return this._adjacencyLists;
    }

    /**
     * 
     * adds an edge to a vertex represented in the adjacency lists
     * 
     * @param {number} srcVertex
     * @param {T} destVertex
     * @returns void
     */
    addEdge(srcVertexIndex: number, destVertex: T): void {
        this._adjacencyLists[srcVertexIndex].append(destVertex);
    }

    /**
     * 
     * TODO: refactor this method
     * 
     * performs a depth-first search of the graph from a given node
     * 
     * @param  {T} startNode from which node to start the search
     * @returns {T[]} returns an array of visited vertices
     */
    dfs(startNode: T): T[] {
        // initialize the stack and visited arrays
        const stack: T[] = [];
        let visited: T[] = [];
        // get the adjacency list of the start vertex
        let adjacencyList = null;
        if (
            typeof this._vertices === 'number' 
            && typeof startNode === 'number' 
            && this._adjacencyLists[startNode]
        ) {
            adjacencyList = this._adjacencyLists[startNode];
        } else if ( Array.isArray(this._vertices)) {
            adjacencyList = this._adjacencyLists.find((list) => {
                return list.head && list.head.data === startNode;
            });
        }
        /**
         * push `startNode` to the visited array,
         * if exists in the adjacency list,
         * and is not already in the visited array
         */
        if (adjacencyList && !visited.includes(startNode)) {
            visited.push(startNode);
        }
        // get all the nodes of the start vertex adjacency list
        const nodes = adjacencyList ? adjacencyList.getAllListNodes() : [];
        /**
         * push all the nodes of the start vertex adjacency list to the stack of nodes to visit,
         * if they have not been visited yet and are not already in the stack
         */
        nodes.forEach((node) => {
            if (!visited.includes(node.data) && !stack.includes(node.data)) {
                stack.push(node.data);
            }
        });
        return visited;
    }

    /**
     * 
     * derives the stack of nodes to visit from a given source node data
     * 
     * @param {T} srcNodeData
     * @param {T[]} stack of nodes data or empty array if none
     * @returns {T[]}
     * */
    public getDFSStackFromSrcNode(srcNodeData: T, stack: T[] = []): T[] {
        // get the adjacency list of the src node
        let adjacencyList = null;
        if (
            typeof this._vertices === 'number' 
            && typeof srcNodeData === 'number' 
            && this._adjacencyLists[srcNodeData]
        ) {
            adjacencyList = this._adjacencyLists[srcNodeData];
        } else if ( Array.isArray(this._vertices)) {
            adjacencyList = this._adjacencyLists.find((list) => {
                return list.head && list.head.data === srcNodeData;
            });
        }
        // get all the nodes of the src node adjacency list
        const nodes = adjacencyList ? adjacencyList.getAllListNodes() : [];
        /**
         * push all the nodes of the src node adjacency list to the stack of nodes to visit,
         * if they are not already in the stack
         */
        nodes.forEach((node) => {
            if (!stack.includes(node.data)) {
                stack.push(node.data);
            }
        });
        return stack;
    }

    // TODO test finding a set of nodes that satisfy a condition

}
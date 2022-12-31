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
     * performs a depth-first search of the graph from a node's data
     * 
     * @param {T} nodeData
     * @param {T[]} stack
     * @param {T[]} visited
     * @returns {T[]} returns an array of visited vertices
     */
    dfs(nodeData: T, stack: T[] = [], visited: T[] = []): T[] {
        // initializing the stack of adjacent nodes to visit from the source node data
        stack = this.getDFSStackFromSrcNode(nodeData, stack);
        // pushing the src node data to the visited nodes array if not already visited
        if (!visited.includes(nodeData)) {
            visited.push(nodeData);
        }
        // getting the next node data to visit from the stack
        let nextNodeData = stack.pop();
        // repeating the process with the next stack item until the stack is empty
        while (nextNodeData) {
            if (!visited.includes(nextNodeData)) {
                // remove duplicates from the visited and stack arrays with Sets as recursion may keep duplicates
                stack = [...new Set(stack.concat(this.getDFSStackFromSrcNode(
                    nextNodeData, 
                    [...new Set(stack)]
                )))];
                visited = [...new Set(visited.concat(
                    this.dfs(
                        nextNodeData, 
                        stack, 
                        [...new Set(visited)]
                    ))
                )];
            }
            // allowing the next node data from the stack to be visited in the next iteration
            nextNodeData = stack.pop();
        }
        return visited;

    }

    /**
     * 
     * gets the adjacency list of the graph with a given source node data as input
     * 
     * @param {T} srcNodeData
     * @returns {SinglyLinkedList<T>|null}
     * */
    public getAdjacencyListFromSrcNode(srcNodeData: T): SinglyLinkedList<T> | null {
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
        return !adjacencyList ? null : adjacencyList;
    }

    /**
     * 
     * derives the stack of nodes to visit from a given source node data
     * 
     * @param {T} srcNodeData
     * @param {T[]} stack of nodes data or empty array if none
     * @returns {T[]} returns a stack of items to visit
     * */
    public getDFSStackFromSrcNode(srcNodeData: T, stack: T[] = []): T[] {
        // get the adjacency list of the src node
        const adjacencyList = this.getAdjacencyListFromSrcNode(srcNodeData);
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
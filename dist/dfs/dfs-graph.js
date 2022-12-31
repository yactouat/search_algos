"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const singly_linked_list_1 = __importDefault(require("./singly-linked-list"));
/**
 *
 * represents a graph that ships with a depth-first search algorithm
 * */
class Graph {
    /**
     *
     * initializes a graph with its number of vertices
     *
     * sets a linked lists array for each of the vertices
     *
     * @param {number|Array<T>} vertices
     * @param {EqualityComparator<T>|null} equalityComparator must be provided if vertices is an array
     */
    constructor(_vertices, _equalityComparator = null) {
        this._vertices = _vertices;
        this._equalityComparator = _equalityComparator;
        /**
         *
         * this will hold all of the edges associated to each vertex
         *
         * @private
         * @type {SinglyLinkedList<T>[]}
         * */
        this._adjacencyLists = [];
        let index = 0;
        if ((typeof this._vertices === 'number' && this._vertices > 0)) {
            while (index < this._vertices) {
                this._adjacencyLists[index] = new singly_linked_list_1.default((a, b) => {
                    return a === b;
                });
                index++;
            }
        }
        else if (Array.isArray(this._vertices) && this._equalityComparator != null) {
            for (let index = 0; index < this._vertices.length; index++) {
                this._adjacencyLists[index] = new singly_linked_list_1.default(this._equalityComparator);
            }
        }
        else {
            throw new Error('equality comparator must be provided if vertices is an array');
        }
    }
    /**
     *
     * gets the adjacency lists of the graph
     *
     * @returns {SinglyLinkedList<T>[]}
     */
    get adjacencyLists() {
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
    addEdge(srcVertexIndex, destVertex) {
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
    dfs(startNode) {
        // initialize the stack and visited arrays
        const stack = [];
        let visited = [];
        // get the adjacency list of the start vertex
        let adjacencyList = null;
        if (typeof this._vertices === 'number'
            && typeof startNode === 'number'
            && this._adjacencyLists[startNode]) {
            adjacencyList = this._adjacencyLists[startNode];
        }
        else if (Array.isArray(this._vertices)) {
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
    getDFSStackFromSrcNode(srcNodeData, stack = []) {
        // get the adjacency list of the src node
        let adjacencyList = null;
        if (typeof this._vertices === 'number'
            && typeof srcNodeData === 'number'
            && this._adjacencyLists[srcNodeData]) {
            adjacencyList = this._adjacencyLists[srcNodeData];
        }
        else if (Array.isArray(this._vertices)) {
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
}
exports.default = Graph;

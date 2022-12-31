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
     * performs a depth-first search of the graph from a root node's data
     *
     * no target is specified here, so the search will be performed on the entire graph
     *
     * @param {T} nodeData
     * @param {T[]} stack
     * @param {T[]} visited
     * @returns {T[]} returns an array of visited vertices
     */
    dfs(nodeData, stack = [], visited = []) {
        // initializing the stack of adjacent nodes to visit from the source node data
        stack = this.getDFSStackFromSrcNode(nodeData);
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
                visited = [...new Set(visited.concat(this.dfs(nextNodeData, stack, visited)))];
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
    getAdjacencyListFromSrcNode(srcNodeData) {
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
    getDFSStackFromSrcNode(srcNodeData, stack = []) {
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
}
exports.default = Graph;

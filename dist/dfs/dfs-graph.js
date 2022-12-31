"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const singly_linked_list_1 = __importDefault(require("./singly-linked-list"));
class DFSGraph {
    /**
     *
     * initializes a graph with its number of vertices
     *
     * sets a linked lists array for each of the vertices
     *
     * @param {number} vertices
     */
    constructor(vertices) {
        /**
         *
         * this will hold all of the edges associated to each vertex, represented as a number
         *
         * @private
         * @type {SinglyLinkedList<number>[]}
         * */
        this._adjacencyLists = [];
        for (let index = 0; index < vertices; index++) {
            this._adjacencyLists[index] = new singly_linked_list_1.default((a, b) => {
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
    get adjacencyLists() {
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
    addEdge(srcVertex, destVertex) {
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
    dfs(vertex) {
        throw new Error('not implemented');
    }
}
exports.default = DFSGraph;

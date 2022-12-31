"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    /**
     *
     * intializes a node's data
     *
     * @param {T} data
     * @param {Node<T>|null} next
     */
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}
exports.default = Node;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// node and linked list classes taken from https://ricardoborges.dev/data-structures-in-typescript-linked-list
const node_1 = __importDefault(require("./node"));
// TODO test singly linked list
class SinglyLinkedList {
    /**
     *
     * initializes the linked list with an equality comparator function
     *
     * @param  {(a:T, b:T) => boolean} equalityComparator
     */
    constructor(equalityComparator, _head = null) {
        this.equalityComparator = equalityComparator;
        this._head = _head;
    }
    get head() {
        return this._head;
    }
    /**
     *
     * appends a new node to the list
     *
     * @param  {T} data
     * @returns void
     */
    append(data) {
        if (!this._head) {
            this._head = new node_1.default(data);
        }
        else {
            let current = this._head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = new node_1.default(data);
        }
    }
    /**
     *
     * deletes a node from the list and updates the next link in the previous node if node to delete exists
     *
     * @param  {T} data
     * @returns void
     */
    delete(data) {
        // doing nothing in case the list is empty (has no head)
        if (!this._head)
            return;
        // check if the head node is the node to be removed (unlinking the original head if that's the case)
        if (this.equalityComparator(this._head.data, data)) {
            this._head = this._head.next;
            return;
        }
        // initializing current node to be traversed
        let current = this._head.next;
        let previous = this._head;
        // search for the node to be removed and keep track of its previous node
        while (current) {
            // actually deleting the node in the linked list and updating the next link in the chain
            if (this.equalityComparator(current.data, data)) {
                current = null;
                previous.next = previous.next ? previous.next.next : null;
            }
            else {
                // continuing the traversal of the linked list
                previous = current;
                current = current.next;
            }
        }
    }
    /**
     *
     * searches for a node and returns it if found
     *
     * @param  {T} data
     * @returns {Node|null}
     */
    search(data) {
        let current = this._head;
        while (current) {
            if (this.equalityComparator(current.data, data)) {
                return current;
            }
            current = current.next;
        }
        return current;
    }
}
exports.default = SinglyLinkedList;

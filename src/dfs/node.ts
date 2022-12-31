export default class Node<T> {

    /**
     * 
     * intializes a node's data
     * 
     * @param {T} data
     * @param {Node<T>|null} next
     */
    constructor(public data: T, public next: Node<T> | null = null) {}
}

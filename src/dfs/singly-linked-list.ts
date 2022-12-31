// node and linked list classes taken from https://ricardoborges.dev/data-structures-in-typescript-linked-list
import Node from "./node";

export type EqualityComparator<T> = (a: T, b: T) => boolean;

export default class SinglyLinkedList<T> {
  /**
   *
   * initializes the linked list with an equality comparator function
   *
   * @param  {(a:T, b:T) => boolean} equalityComparator
   */
  constructor(
    public equalityComparator: EqualityComparator<T>,
    private _head: Node<T> | null = null
  ) {}

  public get head(): Node<T> | null {
    return this._head;
  }

  /**
   *
   * appends a new node to the list
   *
   * @param  {T} data
   * @returns void
   */
  append(data: T): void {
    if (!this._head) {
      this._head = new Node(data);
    } else {
      let current = this._head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = new Node(data);
    }
  }

  /**
   *
   * deletes a node from the list and updates the next link in the previous node if node to delete exists
   *
   * @param  {T} data
   * @returns void
   */
  delete(data: T): void {
    // doing nothing in case the list is empty (has no head)
    if (!this._head) return;
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
      } else {
        // continuing the traversal of the linked list
        previous = current;
        current = current.next;
      }
    }
  }

  /**
   * 
   * gets all the nodes in the list
   * 
   * @returns {Node<T>[]} 
   */
  getAllListNodes(): Node<T>[] {
    const nodes: Node<T>[] = [];
    let current = this._head;
    while (current) {
      nodes.push(current);
      current = current.next;
    }
    return nodes;
  }

  /**
   *
   * searches for a node and returns it if found
   *
   * @param  {T} data
   * @returns {Node|null}
   */
  search(data: T): Node<T> | null {
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

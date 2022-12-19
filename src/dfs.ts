// node and linked list classes taken from https://ricardoborges.dev/data-structures-in-typescript-linked-list

export class Node<T> {
    next: Node<T> | null = null;
    
    /**
     * 
     * intializes a node's data
     * 
     * @param {T} data
     */
    constructor(public data: T) {}
}

export class SinglyLinkedList<T> {
    head: Node<T> | null = null;
    
    /**
     * 
     * initializes the linked list with a comparator function
     * 
     * @param  {(a:T, b:T) => boolean} comparator
     */
    constructor(public comparator: (a: T, b: T) => boolean) {}
  
    /**
     * 
     * appends a new node to the list
     * 
     * @param  {T} data
     * @returns void
     */
    append(data: T): void {
      if (!this.head) {
        this.head = new Node(data);
      } else {
        let current = this.head;
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
      if (!this.head) return;
      // check if the head node is the node to be removed (unlinking the original head if that's the case)
      if (this.comparator(this.head.data, data)) {
        this.head = this.head.next;
        return;
      }
      // initializing current node to be traversed
      let current = this.head.next;
      let previous = this.head;
      // search for the node to be removed and keep track of its previous node
      while (current) {
        // actually deleting the node in the linked list
        if (this.comparator(current.data, data)) {
          current = null;
        } else {
          // continuing the traversal of the linked list 
          previous = current;
          current = current.next;
        }
      }
      /**
       * re setting the link to the next node in the previous one after deletion,
       * or doing nothing if no deletion occured or deleted node is the last of the list
       */
      previous.next = previous.next ? previous.next.next : null;
    }

    /**
     * 
     * gets the next element of the list or null if not exists
     * 
     * @returns {Node<T>|null}
     */
    getNext(data: T): Node<T>|null {
      const node = this.search(data);
      return node;
    }
    
    /**
     * 
     * searches for a node and returns it if found
     * 
     * @param  {T} data
     * @returns Node|null
     */
    search(data: T): Node<T> | null {
      let current = this.head;
      while (current) {
        if (this.comparator(current.data, data)) {
          return current;
        }
        current = current.next;
      }
      return null;
    }
}

export class DFSGraph {

  // this will hold all of the edges associated to each vertex, represented as a number
  private adjacencyLists: SinglyLinkedList<number>[] = [];

  // this will hold all the visited vertices during the search
  private visited: number[] = [];

  /**
   * 
   * initializes a graph with its number of vertices
   * 
   * sets a linked list for each of the vertices
   * 
   * @param {number} vertices
   */
  constructor(vertices: number) {
    for (let index = 0; index < vertices; index++) {
      this.adjacencyLists[index] = new SinglyLinkedList((a, b): boolean => {
        return a === b;
      });
    }
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
    this.adjacencyLists[srcVertex].append(destVertex);
  }

  /**
   * 
   * performs a recursive depth-first search of the graph
   * 
   * fills the visited array of the graph during the traversal
   * 
   * @param  {number} vertex
   * @returns void
   */
  dfs(vertex: number): void {
    this.visited.push(vertex);
    const vertexAdjacencyList = this.adjacencyLists[vertex];
    let iterated = vertexAdjacencyList.head;
    while (iterated?.next != null) {
      iterated = iterated.next;
      if (!this.visited.includes(iterated.data)) {
        this.dfs(iterated.data);
      }
    }
  }

  /**
   * 
   * gets the visited vertices (if a search was executed) and resets the visited array of the graph
   * 
   * @returns {number[]}
   */
  getVisitedAndReset(): number[] {
    const visited = this.visited;
    this.visited = [];
    return visited;
  }

}

// TODO test DFSGraph class methods
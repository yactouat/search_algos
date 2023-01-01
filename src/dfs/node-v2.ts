// rudimentary node types, to be developed later
type NodeDataType = "NUMBER" | "PERSON";

interface NodeData<T> {
  type: NodeDataType;
  content: T;
}

export default class Node<T> {
  /**
   *
   * intializes a node with its data and its pointers to other nodes or null
   *
   * @param {NodeData} data
   * @param {Node<T>[]|null} pointsTo
   */
  constructor(
    public data: NodeData<T>,
    public pointsTo: Node<T>[] | null = null
  ) {}

  isLeaf(): boolean {
    return this.pointsTo === null;
  }
}

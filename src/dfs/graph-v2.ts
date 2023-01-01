import Node from "./node-v2";

/**
 * generic representation of how an edge should be stored in the edge list
 *
 * weight is optional and can be of any type
 */
interface EdgeListEntry<T> {
  v: number;
  u: number;
  w?: T;
}

/**
 *
 * this generic class represents a graph, which is a collection of nodes represented in a specific way
 *
 */
export default class Graph<T> {
  /**
   * stores the edges of the graph in a simple list
   * */
  private _edgeList: EdgeListEntry<T>[] = [];

  /**
   * stores the vertices in a map with their corresponding identifying numbers
   */
  private _verticesIdsMap: Map<Node<T>, number> = new Map();

  /**
   *
   * initializes a graph with a collection of nodes
   *
   * maps each node to an identifying number,
   * TODO pushes each node's edges to the edge list
   *
   * @param nodesCollection
   */
  constructor(nodesCollection: Node<T>[]) {
    this._setVerticesIdsMap(nodesCollection);
  }

  /**
   *
   * get the nodes/ids mapping
   *
   * @returns Map
   */
  get verticesIdsMap(): Map<Node<T>, number> {
    return this._verticesIdsMap;
  }

  // TODO push each vertex edge to the edge list
  // TODO: implement a simple edge list like so => [ [0,1], [0,6], [0,8], [1,4], [1,6], [1,9], [2,4], [2,6], [3,4], [3,5], [3,8], [4,5], [4,9], [7,8], [7,9] ]

  /**
   * @private
   * @returns number
   */
  private _getNextIdToStoreInMap(): number {
    return this._verticesIdsMap.size + 1;
  }

  /**
   *
   * maps a node to an id in the graph if not already mapped
   *
   * @param node
   * @param id
   */
  private _mapNode(node: Node<T>, id: number): void {
    if (!this._verticesIdsMap.has(node)) {
      this._verticesIdsMap.set(node, id);
    }
  }

  /**
   *
   * maps each node in the input collection to an identifying number
   *
   * also takes care of each node's pointed nodes
   *
   * @param  {Node<T>[]} nodesCollection
   */
  private _setVerticesIdsMap(nodesCollection: Node<T>[]) {
    nodesCollection.forEach((node) => {
      this._mapNode(node, this._getNextIdToStoreInMap());
      // if iterated node has pointer(s)
      if (node.pointsTo) {
        // also map each pointed node to an identifying number
        node.pointsTo.forEach((pointedNode) => {
          this._mapNode(pointedNode, this._getNextIdToStoreInMap());
        });
      }
    });
  }

  // TODO: implement an adjacency matrix, an adjacency matrix can be represented like so =>
  /**
   * [ [0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
   *   [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
   *   [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
   *   [0, 0, 0, 0, 1, 1, 0, 0, 1, 0],
   *   [0, 1, 1, 1, 0, 1, 0, 0, 0, 1],
   *   [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
   *   [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
   *   [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
   *   [1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
   *   [0, 1, 0, 0, 1, 0, 0, 1, 0, 0] ]
   */

  // TODO: implement adjacency list as an array of arrays

  // TODO: implement adjacency list as an array of linked lists

  // TODO: get the vertex set V and the edge set E

  // TODO: add a method to add an edge

  // TODO implement directional graphs

  // TODO: determine if a given edge is in the graph

  // TODO: find all the neighbors of a vertex

  // TODO: UI to visualize the graph

  // TODO: represent 'the number of edges is the degree of the vertex'

  // TODO: get the shortest path between two vertices

  // TODO: add method to scan a graph for existing cycles

  // TODO: implement weights for edges

  // TODO: find strongly connected components in a directed graph

  // TODO: model out and in degress of a vertex in a directed graph

  // TODO: experiment with a social network graph

  // TODO: experiment with a roadmap graph of cities/distance between them + find the shortest path in the weighted graph
}

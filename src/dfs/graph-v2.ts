import Node from "./node-v2";

/**
 * generic representation of how an edge should be stored in a graph's edge list
 *
 * weight is optional and can be of any type
 */
export interface EdgeListEntry<T> {
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
   * stores the vertices in a map with their corresponding identifying numbers
   */
  private _verticesIdsMap: Map<Node<T>, number> = new Map();

  /**
   *
   * initializes a graph with a collection of nodes
   *
   * maps each node to an identifying number
   *
   * @param nodesCollection
   */
  constructor(nodesCollection: Node<T>[] = []) {
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

  /**
   *
   * adds a single node to the graph's collection
   *
   * @param  {Node<T>} node
   * @returns void
   */
  addNodeToGraph(node: Node<T>): void {
    this._setVerticesIdsMap([node]);
  }

  /**
   *
   * adds several nodes to the graph's collection
   *
   * @param  {Node<T>[]} nodes
   * @returns void
   */
  addNodesToGraph(nodes: Node<T>[]): void {
    this._setVerticesIdsMap(nodes);
  }

  /**
   *  gets all the edges of the graph in a simple list representation
   *
   * an example edge list would look like so => [ [0,1], [0,6], [0,8], [1,4], [1,6], [1,9] ]
   *
   * @returns {EdgeListEntry<T>[]}
   */
  getEdgeListRepr(): EdgeListEntry<T>[] {
    const edgeList: EdgeListEntry<T>[] = [];
    for (const [node, id] of this._verticesIdsMap) {
      if (node.pointsTo) {
        node.pointsTo.forEach((pointedNode) => {
          edgeList.push({
            v: id,
            u: this._verticesIdsMap.get(pointedNode) as number,
          });
          // push the reciprocal edge since its an undirected graph by default
          edgeList.push({
            v: this._verticesIdsMap.get(pointedNode) as number,
            u: id,
          });
        });
      }
    }
    // return a sorted edge list for convenience since its a common practice
    return edgeList.sort((a, b) => a.v - b.v);
  }

  /**
   *
   * gets the unique ids of the graph's vertices from an input edge list elements
   *
   * this method considers v and u vertices
   *
   * @param  {EdgeListEntry<T>[]} edgeList
   * @returns number
   */
  getUniqueIdsFromEdgeList(edgeList: EdgeListEntry<T>[]): number[] {
    const uniqueVerticesIds: number[] = [];
    edgeList.forEach((edge) => {
      if (!uniqueVerticesIds.includes(edge.v)) {
        uniqueVerticesIds.push(edge.v);
      }
      if (!uniqueVerticesIds.includes(edge.u)) {
        uniqueVerticesIds.push(edge.u);
      }
    });
    return uniqueVerticesIds.sort();
  }

  /**
   *
   * TODO test this method
   *
   * updates the graph's vertices ids map with an input edge list
   *
   * ! destroys the previous graph's state
   * also, updating the edge list does not update each node's data, only their pointers;
   * this means that listed nodes must be already present in the graph's collection,
   * this also means that existing nodes that are not listed in the edge list will be deleted
   *
   * @param  {EdgeListEntry<T>[]} edgeList
   * @returns void
   */
  updateVerticesIdMapWithEdgeList(edgeList: EdgeListEntry<T>[]): void {
    // we extract each unique vertex id from the edge list to get a sorted list of ids
    const uniqueVerticesIds = this.getUniqueIdsFromEdgeList(edgeList);
    // we initialize an inversed map of vertices ids
    const inversedVerticesIdMap: Map<number, Node<T>> = new Map();
    // we check if these ids exist in the current map
    for (const [node, id] of this._verticesIdsMap) {
      if (!uniqueVerticesIds.includes(id)) {
        // we delete previous nodes from the existing map if they dont exist in the new edge list
        this._verticesIdsMap.delete(node);
      } else {
        // we reset the pointer of the corresponding nodes to an empty array
        node.pointsTo = [];
        // we add the corresponding v and u nodes to the inversed map
        inversedVerticesIdMap.set(id, node);
      }
    }
    // now we can iterate over the edge list and update the inversed map easily
    edgeList.forEach((edge) => {
      // we get the corresponding v and u node from the inversed map with the edge's v and u ids
      const vNode = inversedVerticesIdMap.get(edge.v) as Node<T>;
      const uNode = inversedVerticesIdMap.get(edge.u) as Node<T>;
      // we set the v node's pointer to the u node
      const vNodePreviousPointedNodes = vNode.pointsTo ? vNode.pointsTo : [];
      vNode.pointsTo = [...vNodePreviousPointedNodes, uNode];
      // we update the inversed map with the updated v node
      inversedVerticesIdMap.set(edge.v, vNode);
    });
    // we extract a collection of nodes from the inversed map
    const newNodesCollection: Node<T>[] = [];
    for (const [id, node] of inversedVerticesIdMap) {
      newNodesCollection.push(node);
    }
    // we update the graph's vertices ids map with the new collection
    this._setVerticesIdsMap(newNodesCollection);
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

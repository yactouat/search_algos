import Graph from "../../src/dfs/graph-v2";
import Node from "../../src/dfs/node-v2";

describe("test `Graph` class", () => {
  test("setting vertices/id map with no internal pointers in nodes", () => {
    const FooNode = new Node({ type: "NUMBER", content: 1 });
    const BarNode = new Node({ type: "NUMBER", content: 2 });
    const BazNode = new Node({ type: "NUMBER", content: 3 });
    const expected = new Map();
    expected.set(FooNode, 1);
    expected.set(BarNode, 2);
    expected.set(BazNode, 3);
    const actual = new Graph([FooNode, BarNode, BazNode]);
    expect(actual.verticesIdsMap).toEqual(expected);
  });

  test("setting vertices/id map with internal pointers in nodes", () => {
    const FooNode = new Node({ type: "NUMBER", content: 1 });
    const BarNode = new Node({ type: "NUMBER", content: 2 });
    const BazNode = new Node({ type: "NUMBER", content: 3 });
    FooNode.pointsTo = [BazNode];
    const expected = new Map();
    expected.set(FooNode, 1);
    expected.set(BazNode, 2);
    expected.set(BarNode, 3);
    const actual = new Graph([FooNode, BarNode, BazNode]);
    expect(actual.verticesIdsMap.get(FooNode)).toEqual(1);
    expect(actual.verticesIdsMap.get(BazNode)).toEqual(2);
    expect(actual.verticesIdsMap.get(BarNode)).toEqual(3);
  });

  test("adding a single node with no pointer to the graph's collection", () => {
    const FooNode = new Node({ type: "NUMBER", content: 1 });
    const BarNode = new Node({ type: "NUMBER", content: 2 });
    const BazNode = new Node({ type: "NUMBER", content: 3 });
    const AddedNode = new Node({ type: "NUMBER", content: 4 });
    const expected = new Map();
    expected.set(FooNode, 1);
    expected.set(BarNode, 2);
    expected.set(BazNode, 3);
    expected.set(AddedNode, 4);
    const actual = new Graph([FooNode, BarNode, BazNode]);
    actual.addNodeToGraph(AddedNode);
    expect(actual.verticesIdsMap).toEqual(expected);
  });

  test("adding a single node with a pointer to the graph's collection", () => {
    const FooNode = new Node({ type: "NUMBER", content: 1 });
    const BarNode = new Node({ type: "NUMBER", content: 2 });
    const BazNode = new Node({ type: "NUMBER", content: 3 });
    const AddedNode = new Node({ type: "NUMBER", content: 4 });
    const AddedPointedNode = new Node({ type: "NUMBER", content: 5 });
    AddedNode.pointsTo = [AddedPointedNode];
    const expected = new Map();
    expected.set(FooNode, 1);
    expected.set(BarNode, 2);
    expected.set(BazNode, 3);
    expected.set(AddedNode, 4);
    expected.set(AddedPointedNode, 5);
    const actual = new Graph([FooNode, BarNode, BazNode]);
    actual.addNodeToGraph(AddedNode);
    expect(actual.verticesIdsMap).toEqual(expected);
  });

  test("adding several nodes to the graph's collection with no internal pointers", () => {
    const FooNode = new Node({ type: "NUMBER", content: 1 });
    const BarNode = new Node({ type: "NUMBER", content: 2 });
    const BazNode = new Node({ type: "NUMBER", content: 3 });
    const OneMoreNode = new Node({ type: "NUMBER", content: 4 });
    const AndYetAnotherOne = new Node({ type: "NUMBER", content: 5 });
    const expected = new Map();
    expected.set(FooNode, 1);
    expected.set(BarNode, 2);
    expected.set(BazNode, 3);
    expected.set(OneMoreNode, 4);
    expected.set(AndYetAnotherOne, 5);
    const actual = new Graph([FooNode, BarNode, BazNode]);
    actual.addNodesToGraph([OneMoreNode, AndYetAnotherOne]);
    expect(actual.verticesIdsMap).toEqual(expected);
  });

  test("adding several nodes to the graph's collection with internal pointers", () => {
    const FooNode = new Node({ type: "NUMBER", content: 1 });
    const BarNode = new Node({ type: "NUMBER", content: 2 });
    const BazNode = new Node({ type: "NUMBER", content: 3 });
    const OneMoreNode = new Node({ type: "NUMBER", content: 4 });
    const PointedNode = new Node({ type: "NUMBER", content: 5 });
    OneMoreNode.pointsTo = [PointedNode];
    const AndYetAnotherOne = new Node({ type: "NUMBER", content: 6 });
    const expected = new Map();
    expected.set(FooNode, 1);
    expected.set(BarNode, 2);
    expected.set(BazNode, 3);
    expected.set(OneMoreNode, 4);
    expected.set(PointedNode, 5);
    expected.set(AndYetAnotherOne, 6);
    const actual = new Graph([FooNode, BarNode, BazNode]);
    actual.addNodesToGraph([OneMoreNode, AndYetAnotherOne]);
    expect(actual.verticesIdsMap).toEqual(expected);
  });

  test("get edge list representation", () => {
    const FooNode = new Node({ type: "NUMBER", content: 1 });
    const BarNode = new Node({ type: "NUMBER", content: 2 });
    const BazNode = new Node({ type: "NUMBER", content: 3 });
    FooNode.pointsTo = [BarNode, BazNode];
    BazNode.pointsTo = [BarNode];
    const expected = [
      { v: 1, u: 2 },
      { v: 1, u: 3 },
      { v: 2, u: 1 },
      { v: 2, u: 3 },
      { v: 3, u: 1 },
      { v: 3, u: 2 },
    ];
    const graph = new Graph([FooNode, BarNode, BazNode]);
    const actual = graph.getEdgeListRepr();
    expect(actual).toEqual(expected);
  });
});

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
});

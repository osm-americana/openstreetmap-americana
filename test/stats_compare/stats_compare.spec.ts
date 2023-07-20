import { calculateDifference } from "../../scripts/object_compare";
import { expect } from "chai";

const a = 3;
const b = 4;

const simpleA = { a };
const simpleB = { b };

const complexA = { foo: { a } };
const complexB = { bar: { b } };

const simpleA0 = { a: 0 };
const complexA0 = { foo: { a: 0 } };

const negSimpleA = { a: -a };
const negComplexA = { foo: { a: -a } };

const diffSimpleAB = { a: -a, b };
const diffComplexAB = { foo: { a: -a }, bar: { b } };

describe("stats_compare", function () {
  it("tests stats equality", function () {
    expect(calculateDifference(simpleA, simpleA)).to.deep.equal(simpleA0);
    expect(calculateDifference(complexA, complexA)).to.deep.equal(complexA0);
  });
  it("tests stats remove", function () {
    expect(calculateDifference(simpleA, null)).to.deep.equal(negSimpleA);
    expect(calculateDifference(complexA, null)).to.deep.equal(negComplexA);
  });
  it("tests stats add", function () {
    expect(calculateDifference(null, simpleA)).to.deep.equal(simpleA);
    expect(calculateDifference(null, complexA)).to.deep.equal(complexA);
  });
  it("tests stats diff", function () {
    expect(calculateDifference(simpleA, simpleB)).to.deep.equal(diffSimpleAB);
    expect(calculateDifference(complexA, complexB)).to.deep.equal(
      diffComplexAB
    );
  });
});

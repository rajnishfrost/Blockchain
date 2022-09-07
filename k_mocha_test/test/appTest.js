const assert = require("chai").assert;
const hello = require("../app").hello;
const add = require("../app").add;

describe("App", function () {
  it("App Should Return Hello", function () {
    assert.equal(hello(), "hello");
  });
  it("add Number should Above 5 " , function(){
    let result = add(3,3);
    assert.isAbove(result , 5)
  })
});

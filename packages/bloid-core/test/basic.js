import { BloidCore } from '../index.js'
import { assert } from 'chai';  // Using Assert style

describe("bloid-core", function() {
  it("should be able to add and complete TODOs", function() {
    let core = new BloidCore({name: "CoolCore"})
    assert.equal(core.name, 'CoolCore');
  });

});

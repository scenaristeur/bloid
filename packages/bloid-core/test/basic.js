import { BloidCore } from '../index.js'
import { assert } from 'chai';  // Using Assert style

describe("bloid-core", function() {
  let core = new BloidCore({name: "CoolCore"})

  it("core name should be 'CoolCore'", function() {
    assert.equal(core.name, 'CoolCore');
  });

  it("core config.type should be 'config'", function() {
    assert.equal(core.config.type, 'config');
  });

  it("core commander.type should be 'commander'", function() {
    assert.equal(core.commander.type, 'commander');
  });

  it("core filesystem.type should be 'filesystem'", function() {
    assert.equal(core.filesystem.type, 'filesystem');
  });

});

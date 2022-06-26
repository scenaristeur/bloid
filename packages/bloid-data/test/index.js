import { BloidData } from '../index.js'
import { assert } from 'chai';  // Using Assert style

describe("bloid-data", function() {
    let db = new BloidData({name: "CoolBase", base: "https://a_fake_url/path/or_not"})
  // let core = new BloidCore({name: "CoolCore", debug: true})

  it("db name should be 'CoolBase'", function() {
    assert.equal(db.name, 'CoolBase');
  });

  it("db base should be 'https://a_fake_url/path/or_not'", function() {
    assert.equal(db.base, 'https://a_fake_url/path/or_not');
  });


});

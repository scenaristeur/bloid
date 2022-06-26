import { BloidData } from '../index.js'
import { assert } from 'chai';  // Using Assert style



var manu = {
  "@context": {
    "name": "http://xmlns.com/foaf/0.1/name",
    "homepage": {
      "@id": "http://xmlns.com/foaf/0.1/homepage",
      "@type": "@id"
    }
  },
  "@id": "http://dodo.sporny.org#person",
  "name": "Dodo",
  "homepage": "http://dod.sporny.org/"
};



describe("bloid-data", function() {
  let b_data = new BloidData({name: "CoolBase", base: "https://a_fake_url/path/or_not"})
  // let core = new BloidCore({name: "CoolCore", debug: true})

  it("b_data name should be 'CoolBase'", function() {
    assert.equal(b_data.name, 'CoolBase');
  });

  it("db_datab base should be 'https://a_fake_url/path/or_not'", function() {
    assert.equal(b_data.base, 'https://a_fake_url/path/or_not');
  });



  it("b_data put should not return error", function() {
    b_data.db.jsonld.put(manu, function(err, obj) {
      assert.equal(err, null);
    });

  });

  it("b_data put result.name should return 'Dodo'", function() {
    b_data.db.jsonld.put(manu, function(err, obj) {
      assert.equal(obj.name, 'Dodo');
    });
    
  });


  // it("db base should be 'https://a_fake_url/path/or_not'", function() {
  //   assert.equal(db.base, 'https://a_fake_url/path/or_not');
  // });


});

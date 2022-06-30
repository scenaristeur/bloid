var assert = require('assert');
var crypto = require('crypto');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
// var db = new sqlite3.Database('./database.sqlite3-test-users');


describe("bloid-users-base", function() {
  //let core = new BloidCore({name: "CoolCore", config: config})
  // let core = new BloidCore({name: "CoolCore", debug: true})

  it("create table, insert and select", function() {
    db.serialize(() => {
        db.run("CREATE TABLE lorem (info TEXT)");

        const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
        for (let i = 0; i < 10; i++) {
            stmt.run("Ipsum " + i);
        }
        stmt.finalize();

        db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
            console.log(row.id + ": " + row.info);
            if(row.id == 10){
              assert.equal(row.info, 'Ipsum 9');
            }
        });
    });

    db.close();
  });


})

const multilevel = require('@bkrith/multilevel');

const db = new multilevel();

db.connect({
    address: '127.0.0.1',
    port: 22500
});

db.put('foo', "test "+Date.now())

db.get('foo')
.then((value) => {
    console.log("val",value);
})
.catch((err) => {
    console.log("err",err);
});


db.get('http://manu.sporny.org#person').then((value) => {
    console.log("val",value);
})
.catch((err) => {
    console.log("err",err);
});

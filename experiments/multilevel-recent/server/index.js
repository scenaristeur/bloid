const multilevel = require('@bkrith/multilevel');

const db = new multilevel();

db.level('./myDB');

db.listen({ port: 22500 });

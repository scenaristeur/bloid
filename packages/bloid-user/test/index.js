var linuxUser = require('linux-sys-user');

// linuxUser.addUser({username:"bloid_user", create_home:true, shell:null}, function (err, user) {
//   if(err) {
//     return console.error(err);
//   }
//   console.log(user);
//   // ------------------------------------------
//   // { username: 'gkuchan',
//   //   password: 'x',
//   //   uid: 1001,
//   //   gid: 1001,
//   //   fullname: '',
//   //   homedir: '/home/gkuchan',
//   //   shell: '/usr/sbin/nologin' }
//   // ------------------------------------------
// });


linuxUser.getUsers(function (err, users) {
  if(err) {
    return console.error(err);
  }
  console.log(users);
  // ------------------------------------------
  // [ { username: 'root',
  //   password: 'x',
  //   uid: 0,
  //   gid: 0,
  //   fullname: 'root',
  //   homedir: '/root',
  //   shell: '/bin/bash' },
  // { username: 'daemon',
  //   password: 'x',
  //   uid: 1,
  //   gid: 1,
  //   fullname: 'daemon',
  //   homedir: '/usr/sbin',
  //   shell: '/usr/sbin/nologin' },
  // { username: 'bin',
  //   password: 'x',
  //   uid: 2,
  //   gid: 2,
  //   fullname: 'bin',
  //   homedir: '/bin',
  //   shell: '/usr/sbin/nologin' } ]
  //   ------------------------------------------
  });

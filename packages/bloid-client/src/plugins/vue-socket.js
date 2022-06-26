
//import "../js/socket.io.min.js"
//window.socket = io(':3000');
import { io } from "socket.io-client";

const plugin = {
  install(Vue, opts = {}) {
    let store = opts.store
    // vatch-vue hosted on github can access your local storage
    //let socket = Vue.prototype.$socket = io('http://localhost:3000');
    // share your localhost storage on your localnetwork
    let location = window.location.toString()
    let server = 'http://localhost:3000'
    if(location.startsWith("https://scenaristeur.github.io/vatch-vue/")){
      console.info("Vatch Client Location: "+location+" -> Connecting to your local filesystem through socket.io on ", server)
    }else{
      server = ':3000'
      console.info("Vatch Client Location: "+location+" -> Sharing your local filesystem to your local network through socket.io on ", server)
    }


    let socket = Vue.prototype.$socket = io(server);

    socket.on('init', function(init) {
      console.log('init',init)
      store.commit("vatch/updatepathSep", init.pathsep)
    });

    socket.on('users', function(users) {
      console.log("users",users)
      store.commit("vatch/setUsers", users)
    });

    socket.on('watcher event', function(ressources) {
      console.log("Watcher event",ressources)
      store.commit("vatch/updateLocalResources", ressources)
    });

    socket.on('walker', function(ressources) {
      console.log("Walker",ressources)
      store.commit("vatch/updateLocalResources", ressources)
    });

    socket.on('cat file', function(file) {
      console.log(file)
      if(file.callback != undefined){
        store.dispatch(file.callback, file)
      }else{
        console.log("TODO PROCESSFILE cat file", file)
        store.commit("vatch/setFile", file)
      }

    });

    socket.on('chat message', function(msg) {
      console.log('chat message',msg)
      store.commit("vatch/addChatMessage", msg)
    });

    socket.on('connect', () => {
      store.commit("vatch/setUser", socket.id)
    });
    socket.on('disconnect', () => {
      store.commit("vatch/setUser", null)
    });

  },
}

// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin

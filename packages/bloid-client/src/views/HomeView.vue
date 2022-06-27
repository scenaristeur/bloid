<template>
  <div class="home">
    see <a href="https://scenaristeur.github.io/vatch-vue">https://scenaristeur.github.io/vatch-vue/</a>
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
<ul>
  <li>
    config to select bloid server
</li>
<li>
  terminal like in agent
<TerminalView />
</li>


  </ul>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    // HelloWorld
        'TerminalView': ()=>import('@/views/TerminalView'),
  }
}
</script>

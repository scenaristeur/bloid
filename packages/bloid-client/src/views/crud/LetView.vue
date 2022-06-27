<template>
  <b-modal id="modal-letview" title="Let" size="lg" @ok="save"
  :ok-disabled="thing.name==undefined || thing.name.length==0"
  :ok-variant="thing.name==undefined || thing.name.length==0 ? 'secondary' : 'success'"
  >
  <!-- <p class="my-4">Hello from modal! -->
  <!-- {{createParams}}

  <hr>
  {{thing}} -->
  <div class="scroll">
    <div v-for="(val, k) in thing" :key="k">

      <b-row v-if="!k.startsWith('@')" class="my-1" >

        <b-col sm="3">
          <label :for="`field-${k}`">{{k}}</label>
        </b-col>
        <b-col sm="9">
          <b-form-input v-if="k == 'name'" :id="`field-${k}`" autofocus :state="thing[k].length>0" v-model="thing[k]" :placeholder="'{'+k+'}'"></b-form-input>
          <b-form-input v-else :id="`field-${k}`" v-model="thing[k]" :placeholder="'{'+k+'}'"></b-form-input>

          <!--
          <b-form-input v-if="thing[k].split('^^').length > 0" :type="thing[k].split('^^')[1]" v-model="thing[k].split('^^')[0]" >

        </b-form-input>
        <b-form-input v-else :id="`field-${k}`" v-model="thing[k]"></b-form-input> -->
      </b-col>


    </b-row>
  </div>

</div>
<b-row class="my-1">

  <b-col sm="6">
    <b-form-input id="add_filed" v-model="new_field" placeholder="new field" size="sm"></b-form-input>
  </b-col>
  <b-col sm="3">
    <b-form-input placeholder="type" disabled size="sm" />
  </b-col>
  <b-col sm="3">
    <b-button @click="add" :disabled="new_field == null || new_field.length== 0" size="sm" :variant="new_field == null || new_field.length == 0? 'secondary' : 'success'" >Add field</b-button>
  </b-col>
</b-row>



<!-- <b-list-group>
<b-list-group-item v-for="(v, k) in thing" :key="k">  {{k}} -> {{v}}</b-list-group-item>
</b-list-group> -->

<!-- <b-row v-for="(v, k) in thing" :key="k" >
{{k}} -> {{v}}
</b-row> -->
<!-- </p> -->

</b-modal>
</template>

<script>

import { v4 as uuidv4 } from 'uuid';

export default {
  name: "LetView",
  data() {
    return {
      thing: {},
      new_field: null
    }
  },
  watch: {
    createParams() {
      let template = {
        "@context": {
          "@vocab": "http://xmlns.com/foaf/0.1/",
          "homepage": { "@type": "@id" },
          "knows": { "@type": "@id" },
          "based_near": { "@type": "@id" }
        },
        "@id": "{@id}",
        "name": "",
        "type": "",
        "description": "",
        "version": "",
        "creator": ""
      }
      this.thing = template
      this.thing['@id'] = "http://local/base/"+uuidv4()

      let action = this.createParams.array.shift()
      let params = this.createParams.array
      console.log(action, params)

      if(params.length == 1 && params[0].split('=')[1] == undefined){
        this.thing.name = params[0]
      }else{
        params.forEach((item, i) => {
          let splitted = item.split('=')
          console.log(i,item, splitted)
          this.thing[splitted[0]] = splitted[1]
        });
      }
      console.log(this.thing)

    }
  },
  methods: {

    save(){
      console.log("save ", this.thing)
    },
    add(){
      if(this.new_field.length > 0){
        this.thing[this.new_field] == undefined ? this.thing[this.new_field] = "" :alert("already exist")
      }
      console.log(this.thing)
      this.new_field = ""

    }
  },
  computed: {
    createParams() {
      return this.$store.state.crud.createParams
    },
  }
}
</script>

<style>
.scroll{
  max-height: 65vh;
  /*margin-bottom: 10px;*/
  overflow-y:scroll;
  overflow-x:hidden;
  -webkit-overflow-scrolling: touch;
}
</style>

import modele from './template.js'

export { BloidTemplate }

class BloidTemplate {
  constructor(options = {}) {
    Object.assign(this, modele);
    this.type = "template"
    Object.assign(this, options);
    if(options.debug == true){this.showdebug()}
  }
  showdebug(){
    console.log(this)
  }
}

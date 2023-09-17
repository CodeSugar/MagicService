//Componente para mostrar un archivo necesita uid,ke
Vue.component('file', {
  template: `
    <div>
      
    </div>
  `,
  props : ["uid",'ke'],
  data: function () {
    return {
      file:{
        date:'',
        file:''
      }
    };
  },
  computed : {
    fecha : function(){
      if(this.file.date=='')
        return "S/N";
      return (new Date(this.file.date)).toLocaleDateString('en',{hour:'2-digit',minute:'2-digit'});
    }
  },
  methods: {

  },
  updated: function(){
  },
  mounted: function(){
      
  }
})
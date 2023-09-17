//Componente para mostrar un archivo necesita uid,ke
Ind = Vue.component('ind', {
  template: `
  <div class="container ">
  <div class="row">
    <div class="col s12 m12 l12">
      <div class="white">
        <h1 class="card-title">Inicio Prototipo</h1>
        <p> Aplicacion WEB que permite almacenar archivos, y realizar transferencia de estilo a imágenes via redes neuronales.</p>
        <p class="card-action center">
        
                <router-link v-if="iniciado" to="/app" >
                  App
                </router-link>
        <router-link v-if="iniciado" to="/login" >
            Salir
        </router-link>
        <router-link v-else to="/login" >
            Entrar
        </router-link>
        <router-link v-if="!iniciado" to="/idk" >
            Registrar
          </router-link>
        </p>
      </div>

    </div>
  </div>
    <div class="row">
      <div class="row white">
          <div class="col l6 s12">
            Proyecto escolar, sin ánimos de lucro.<br>
            School project, non-profit.
          </div>
          <div class="col l6 s12">
            <p>Funcionando gracias a Firebase, JavaScript, Bootstrap, Python, Tensorflow, Keras.</p>
            <p>Usando <a href="https://arxiv.org/pdf/1705.08086.pdf">Style Transfer via Feature Transforms by Li et al</a></p>
            <p>Usando <a href="https://cs.stanford.edu/people/jcjohns/eccv16/">Perceptual Losses for Real-Time Style Transfer 
            and Super-Resolution</a></p>
          </div>
      </div>
    </div>
  </div>
  </div>
  `,
  props : ["uid"],
  data: function () {
    return {};
  },
  computed : {
    iniciado : function(){
      if(this.uid =='' || this.uid==0)
        return false;
      return true;
    }
  },
  methods: {

  },
  updated: function(){
  },
  mounted: function(){
      console.log("Mounted Index");
  }
})
//Componente para el login :D
Login = Vue.component('login-form', {
  template: `
      <div>
          <div class="section"></div>
          <div class="white">
              <!-- Card Content Begin -->
              <div class="card-content container">
                  <!-- Title Begin -->
                  <span class="card-title">
                      <h3>Inicia Sesi&oacute;n</h3>
                  </span>
                  <!-- Title End -->
                  <!-- Form Begin -->
                  <div class="row">
                      <form class="col s12" v-on:submit.prevent="login">
                          <!-- Input Section Begin -->
                          <div class="row">
                              <email-input 
                                  v-bind:value-path="'email'" 
                                  v-bind:setter="setValue" 
                                  v-bind:input-id="'email'">
                              </email-input>
                              <password-input
                                  v-bind:value-path="'password'" 
                                  v-bind:setter="setValue" 
                                  v-bind:input-id="'password'">
                              </password-input>
                          </div>
                          <!-- Input Section Begin -->
                          <!-- Submit Button Begin -->
                          <div class="row">
                              <div class="col s12 offset-m6 m6">
                                  <button type="submit" v-bind:class="{ disabled : !validData }"
                                      class="btn waves-effect waves-light blue-grey lighten-1 col s12">
                                      Iniciar
                                      <i class="material-icons right">send</i>
                                  </button>
                              </div>
                          </div>
                          <!-- Submit Button End -->
                      </form>
                  </div>
                  <!-- Form End -->
              </div>
              <!-- Card Content End -->
              <!-- Card Action Begin -->
              <div class="card-action">
              </div>
              <!-- Card Action End -->
          </div>
      </div>
  `,
  data : function () {
      return {
          password : null,
          email : null
      };
  },
  props : ["uid"],
  mounted : function(){
      M.updateTextFields();
      if(this.uid!=0){
        firebase.auth().signOut().then(function() {
            console.log("Salio correctamente");
            this.mensaje = "Salio Correctamente :/";
            router.push("/index");
          }).catch(function(error) {
            console.log("Un error al intentar salir de sesion");
            this.mensaje = "Salio Incorrectamente  Jajajaja xD";
          });
      }
  },
  computed : {
      validData : function(){
          if(!this.password) 
              return false;
          if(!this.email) 
              return false;
          return true;
      }
  },
  methods : {
      login : function(){
          if(!this.validData) return;
          console.log(this.email+":"+this.password);
          firebase.auth()
              .signInWithEmailAndPassword(this.email, this.password)
              .catch(function(error){
                  var errorToast = function(msg){
                      M.toast({ 
                          classes : 'red',
                          html : msg
                      });
                  };
                  const errorCode = error.code;
                  console.log(error.code);
                  if(errorCode === 'auth/wrong-password'){
                      errorToast('Contraseña incorrecta.');
                  }
                  if(errorCode === 'auth/invalid-email'){
                      errorToast('El correo es inválido.');
                  }
                  if(errorCode === 'auth/user-not-found'){
                      errorToast('El usuario no existe.');
                  }
              });
      },
      setValue : function(path, value){
          var obj = this;
          path.split('.').filter(Boolean)
              .map(function(token, idx, tokens){
                  if(idx == tokens.length - 1)
                      obj[token] = value;
                  else
                      obj = obj[token];
              });
      }
  }
});
//Componente para mostrar un archivo necesita uid,ke
Vue.component('uploadFileModal', {
  template: `
    <div>
      <div class="modal-content">
        <h4>Subir Archivo</h4>
        <div class="file-field input-field">
          <div class="btn">
            <span>File</span>
            <input type="file" 
                @change="filesChange($event.target.files)"/>
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a @click="uploadFile" class="waves-effect waves-green btn-flat">Subir Archivo</a>
        <a class="modal-close waves-effect waves-green btn-flat">Cancelar</a>
      </div>
    </div>
  `,
  props : ["uid"],
  data: function () {
    return {
      nuevo :{
        file:0
      },
      errorToast:0,
      validToast:0
    };
  },
  computed : {
    iniciado : function(){
      if(this.uid =='')
        return false;
      return true;
    }
  },
  methods: {
    uploadFile: function(){
      var file    = this.nuevo.file;
      var reader  = new FileReader();
      var uri = "";

      //+++++++++++++++++++++++++++++++++++++++++++Agregar visor para todo tipo de elemento
      reader.onloadend = function () {
          uri = reader.result;
      }

      if (file) {
          reader.readAsDataURL(file);
          let fechaSubido = Date.now();
      }
      console.log("Subiendo");
      let base = {
          date:(Date.now()),
          file:file.name
      };
      let key = firebase.database().ref('files/' + this.uid + "/").push(base).key;;
      let storageRefNuevo = firebase.storage().ref().child("" + this.uid + "/" + key + "/" + file.name);
      storageRefNuevo.put(file).then(function(snapshot) {
          this.validToast("Archivo subido Exitosamente");
          console.log("Subido exitosamente");
      }.bind(this));
    },
    filesChange: function(listaArchivos){
      this.nuevo.file = listaArchivos[0];
    }
  },
  updated: function(){
  },
  mounted: function(){
    instances = M.Modal.init(elems);
    this.errorToast = function(msg){
      M.toast({ 
          classes : 'red',
          html : msg
      });
    };
    this.validToast = function(msg){
      M.toast({ 
          classes : 'green',
          html : msg
      });
    };
  }
});
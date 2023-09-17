//Componente para mostrar un archivo necesita uid,ke
AppMain = Vue.component('appMain', {
  template: `
  <div class="container ">
    <div class="row">
      <div class="col s12 m12 l12 card white">
        <h2>Lista de Archivos</h2>
        <ul class="collection">
          <li class="collection-item white" v-for="(archivo,ke) in listaArchivos">
            <div class="row">
              <div class="col s6 m6 l6">
                <div class="col s4 l4 m4" v-if="archivo.uri">
                  <img v-bind:src="archivo.uri" alt="" class="responsive-img">
                </div>
                <h5>{{archivo.file.substr(0,20)}}</h5>
                <br>
                Subido: {{fecha(archivo.date)}}
              </div>
              <div class="col s6 m6 l6">
                <div class="row">
                  <button v-if="archivo.uri" @click="downloadUri(archivo.uri,archivo.file)" class="waves-effect waves-light btn-small right">
                    Download <i class="large material-icons">cloud_download</i>
                  </button> 
                  <button v-else @click="downloadFile(ke)" class="waves-effect waves-light btn-small right">
                    Download <i class="large material-icons">cloud_download</i>
                  </button>  
                  <button v-if="archivo.uriData && archivo.uriData.includes('image')" @click="openModal2(ke)" class="waves-effect waves-light btn-small right">
                    Style <i class="large material-icons">style</i>
                  </button>
                </div>
                <div class="row">
                  <button @click="deleteFile(ke)" class="red lighten-1 waves-effect waves-light btn-small right">
                    Delete <i class="large material-icons">delete</i>
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="col s12 m12 l12 card white">
        <h3>Lista de Archivos Por Aplicar Estilo</h3>
        <ul class="collection white">
          <li class="collection-item" v-for="(archivo,ke) in listaArchivosBatch">
            <div class="row">
              <div class="col s6 m6 l6">
                Aplicando estilo a {{archivo.fileBase}}
              </div>
              <div class="col s6 m6 l6">
                Subido: {{fecha(archivo.date)}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="fixed-action-btn">
      <button data-target="modal1" class="btn-floating btn-large blue modal-trigger">
        <i class="large material-icons">publish</i>
      </button>
    </div>
    <div id="modal1" class="modal" ref="modal">
      <div class="modal-content">
        <h4>Subir Archivo</h4>
        <form>
          <div class="file-field input-field">
            <div class="btn">
              <span>Archivo</span>
              <input type="file" 
                  @change="filesChange($event.target.files)"
                  ref="fileupload"/>
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text" ref="fileupload2">
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <a v-bind:class="{ disabled : !fileValidUpload }" @click="uploadFile" class="waves-effect waves-green btn-flat">
          Subir Archivo
        </a>
        <a class="modal-close waves-effect waves-green btn-flat">Cancelar</a>
      </div>
    </div>
    <div id="modal2" class="modal" ref="modal2">
      <div class="modal-content">
        <h4>Aplicar Estilo</h4>
        <div class="input-field col s12">
          <select v-model="selected">
            <option>Estilo Simple</option>
            <option>Fast Style Transfer</option>
            <option>Universal Style Transfer</option>
          </select>
          <label>Selecciona el Estilo</label>
        </div>
        <div v-if="selected == 'Universal Style Transfer'">
          <p>Inserte una imagen la cual servirá de estilo</p>
          <form class="row">
            <div class="col s2 l2 m2">
            <img v-bind:src="imagen1" alt="" class="responsive-img">
            </div>
            
            <div class="file-field input-field">
              <div class="btn">
                <span>Estilo</span>
                <input type="file" 
                    @change="filesChange($event.target.files)"
                    ref="fileupload3"/>
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text" ref="fileupload4">
              </div>
            </div>
          </form>
          <a v-bind:class="{ disabled : !fileValidUpload}" @click="uploadEstilo" class="waves-effect waves-green btn-flat">
            Aplicar Estilo
          </a>
        </div>
        <div v-if="selected == 'Fast Style Transfer'">
          <p>Se aplica un estilo con una red neuronal que ha sido entrenada para
            aplicar un único estilo de manera rápida, son arquitecturas que
            se utilizan en museos.
          </p>
          <div class="row">
            <div class="col s2 l2 m2">
              <img src="data/RAIN-PRINCESS.jpg" alt="" class="responsive-img">
            </div>
            <a @click="uploadEstiloFast" class="btn waves-effect waves-green">Aplicar Estilo</a>
          </div>
        </div>
        <div v-if="selected == 'Estilo Simple'">
          <p>Se aplica un estilo con un algoritmo simple, ejemplos de esto son:
            filtros con contraste, colores, etc. 
          </p>
          <h3>Vuelva Pronto ;)</h3>
        </div>
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-green btn-flat">Cancelar</a>
      </div>
    </div>
  </div>
  `,
  props : ["uid"],
  data: function () {
    return {
      imagen1:"data/test.jpg",
      nuevo :{
        file:0
      },
      listaArchivos:[],
      listaArchivosBatch:[],
      errorToast:0,
      validToast:0,
      tempArchivoEstilo:0,
      selected:"Fast Style Transfer"
    };
  },
  computed : {
    iniciado : function(){
      if(this.uid =='')
        return false;
      return true;
    },
    fileValidUpload : function(){
      return (this.nuevo.file!=0);
    }
  },
  methods: {
    downloadUri : function(url, filename){
        /*fetch(url)
    .then(res => res.blob())
    .then(function(blob){
        console.log(blob);
        var element = document.createElement('a');
        element.setAttribute('href', blob);
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        var fileURL = URL.createObjectURL(blob);
        window.open(fileURL)
      });*/
      var element = document.createElement('a');
        element.setAttribute('href', url);
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    },
    downloadFile : function(ke){
      firebase.storage().ref().child(this.uid + "/" + ke + "/" + this.listaArchivos[ke].file).getDownloadURL().then(function(url) { 
        window.open(url,'_blank');
      }.bind(this)).catch(function(error) {
        console.log(error);
      });
    },
    uploadEstilo : function(){
      console.log("Subiendo");
      var file    = this.nuevo.file;
      var reader  = new FileReader();
      var uri = "";

      //+++++++++++++++++++++++++++++++++++++++++++Agregar visor para todo tipo de elemento
      reader.onloadend = function () {
          uri = reader.result;
          console.log(uri.split(";")[0]);
          if(!uri.split(";")[0].includes("image")){
            this.errorToast("El estilo no es una imagen");
            this.clear();
            return;
          }
          console.log(this.tempArchivoEstilo);
          console.log(this.listaArchivos);
          let base = {
            date:(Date.now()),
            fileEstilo:file.name,
            uriEstilo:uri,
            tipo:"0",
            fileBase:this.listaArchivos[this.tempArchivoEstilo].file,
            uriBase:this.listaArchivos[this.tempArchivoEstilo].uri
          };
          firebase.database().ref('batch/' + this.uid + "/").push(base).then(function(){
            this.validToast("Tarea Subida, espera un momento");
            const moda = this.$refs.modal2;
            var instance = M.Modal.getInstance(moda);
            instance.close();
            this.clear();
          }.bind(this));
      }.bind(this);
      if (file) {
          reader.readAsDataURL(file);
      }
    },
    uploadEstiloFast : function(){
      console.log("Subiendo");
      let base = {
        date:(Date.now()),
        tipo:"1",
        estilo:"0",
        fileBase:this.listaArchivos[this.tempArchivoEstilo].file,
        uriBase:this.listaArchivos[this.tempArchivoEstilo].uri
      };
      firebase.database().ref('batch/' + this.uid + "/").push(base).then(function(){
        this.validToast("Tarea Subida, espera un momento");
        const moda = this.$refs.modal2;
        var instance = M.Modal.getInstance(moda);
        instance.close();
        this.clear();
      }.bind(this));
    },
    openModal2 : function(ke){
      this.tempArchivoEstilo = ke;
      this.imagen1 = this.listaArchivos[ke].uri;
      const moda = this.$refs.modal2;
      var instance = M.Modal.getInstance(moda);
      instance.open();
    },

    fecha : function(fecha){
      return (new Date(fecha)).toLocaleDateString('es',{hour:'2-digit',minute:'2-digit'});
    },
    deleteFile : function(ke){
      firebase.database().ref('files/' + this.uid + "/" + ke).set(null).then(this.validToast("Eliminado"));
    },
    clear : function(){
      console.log("clear");
      const input = this.$refs.fileupload;
      input.type = 'text';
      input.type = 'file';
      const input2 = this.$refs.fileupload2;
      input2.type = 'file';
      input2.type = 'text';
      const input3 = this.$refs.fileupload3;
      if(input3){
      input3.type = 'text';
      input3.type = 'file';
      }
      const input4 = this.$refs.fileupload4;
      if(input4){
      input4.type = 'file';
      input4.type = 'text';
      }
      this.nuevo.file = 0;
    },
    uploadFile: function(){
      console.log("Subiendo");
      var file    = this.nuevo.file;
      var reader  = new FileReader();
      var uri = "";

      //+++++++++++++++++++++++++++++++++++++++++++Agregar visor para todo tipo de elemento
      reader.onloadend = function () {
          uri = reader.result;
          console.log(uri.split(";")[0]);
          let base = {
            date:(Date.now()),
            file:file.name,
            uriData:(uri.split(";")[0]),
          };
          if(uri.split(";")[0].includes("image"))
            base.uri = uri;
          console.log(base);
          let key = firebase.database().ref('files/' + this.uid + "/").push(base).key;
          if(!uri.split(";")[0].includes("image")){
            let storageRefNuevo = firebase.storage().ref(this.uid + "/" + key + "/" + file.name);
            storageRefNuevo.put(file).then(function(snapshot) {
                const moda = this.$refs.modal;
                var instance = M.Modal.getInstance(moda);
                instance.close();
                this.validToast("Archivo Subido.");
                console.log("asdasd-storage");
                this.clear();
            }.bind(this));
          }else{
            const moda = this.$refs.modal;
            var instance = M.Modal.getInstance(moda);
            instance.close();
            this.validToast("Archivo Subido");
            this.clear();
          }
      }.bind(this);
      if (file) {
          reader.readAsDataURL(file);
      }
    },
    filesChange: function(listaArchivos){
      this.nuevo.file = listaArchivos[0];
    }
  },
  updated: function(){
  },
  watch:{
    listaArchivosBatch : function(nueva,vieja){
      let nueva_cantidad=0;
      let vieja_cantidad=0;
      for(let key in nueva)
        nueva_cantidad ++;
      for(let key in vieja)
        vieja ++;
        console.log(nueva_cantidad);
        console.log(vieja_cantidad);
      if(nueva_cantidad<vieja_cantidad)
        this.validToast("Una tarea ha teminado :D");
    }
  },
  mounted: function(){
    elems = document.querySelectorAll('.fixed-action-btn');
    instances = M.FloatingActionButton.init(elems);
    elems = document.querySelectorAll('.modal');
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
    firebase.database().ref('files/' + this.uid ).on('value', function(snapshot) {
      this.listaArchivos = snapshot.val();
    }.bind(this));
    firebase.database().ref('batch/' + this.uid ).on('value', function(snapshot) {
      this.listaArchivosBatch = snapshot.val();
    }.bind(this));
    elems = document.querySelectorAll('select');
    instances = M.FormSelect.init(elems);
  }
});

var temp1,temp2;
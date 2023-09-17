// Initialize Firebase
var config = {
  apiKey: "AIzaSyBF2tIfG9Lj1XC9R47AVsg1ciZCMQF9Wxs",
  authDomain: "magicservice-f5e52.firebaseapp.com",
  databaseURL: "https://magicservice-f5e52.firebaseio.com",
  projectId: "magicservice-f5e52",
  storageBucket: "magicservice-f5e52.appspot.com",
  messagingSenderId: "205163648868"
};
firebase.initializeApp(config);

/*
  TODO:
    -Agregar comprobación para ver si tienen acceso a las rutas
      https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards
    -Agregar ruta para validar el acceso de los usuarios nuevos
*/

//Rutas
const router = new VueRouter({
  routes: [
    { 
      path : '/login', 
      component : Login
    },
    { 
      path : '/idk', 
      component : Register
    },
    { 
      path : '/index', 
      component : Ind
    },
    { 
      path : '/app', 
      component : AppMain
    }
  ]
})

//App principal
var app = new Vue({
  el: '#app',
  router,
  data: {
    uid : '',
    iniciado : false,
    user : ''
  },
  methods:{
  },
  mounted:function(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("Usuario Iniciado");
        this.uid = user.uid;
        this.iniciado = true;
        this.user = user;
        router.push("/app");
      }else{
        console.log("No iniciado");
        this.uid = 0;
        this.iniciado = false;
        this.user = '';
        router.push("/index");
      }
    }.bind(this));
    M.AutoInit();
  }
})


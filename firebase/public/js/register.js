//Register component
Register = Vue.component('register-form2', {
    template: `
        <div>
            <div class="section"></div>
            <div class="card white">
                <!-- Card Content Begin -->
                <div class="card-content container">
                    <!-- Title Begin -->
                    <span class="card-title">
                        <h3>Registro</h3>
                    </span>
                    <!-- Title End -->
                    <!-- Form Begin -->
                    <div class="row">
                        <form class="col s12" v-on:submit.prevent="registrar">
                            <!-- Input Section Begin -->
                            <div class="row">
                                <email-input 
                                    v-bind:value-path="'user.email'" 
                                    v-bind:setter="setValue" 
                                    v-bind:input-id="'email'">
                                </email-input>
                                <password-input
                                    v-bind:value-path="'user.password'" 
                                    v-bind:setter="setValue" 
                                    v-bind:input-id="'password'">
                                </password-input>
                            </div>
                            <!-- Input Section Begin -->
                            <!-- Submit Button Begin -->
                            <div class="row">
                                <div class="col s12 offset-m6 m6">
                                    <button type="submit" v-bind:class="{ disabled : !validData }"
                                        class="btn waves-effect waves-light cyan accent-4 col s12">
                                        Registrar
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
            user:{
                email: null,
                password: null,
            }
        };
    },
    mounted : function(){
        M.updateTextFields();
    },
    computed : {
        validData : function(){
            if(!this.user.password) 
                return false;
            if(!this.user.email) 
                return false;
            return true;
        }
    },
    methods : {
        setValue : function(path, value){
            var obj = this;
            path.split('.').filter(Boolean)
                .map(function(token, idx, tokens){
                    if(idx == tokens.length - 1)
                        obj[token] = value;
                    else
                        obj = obj[token];
                });
        },
        registrar : function(){
            console.log(this.user);
            firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password).catch(
                function(error){
                    var errorToast = function(msg){
                        M.toast({ 
                            classes : 'red',
                            html : msg
                        });
                    };
                    console.log(error.code);
                    if(error.code == 'auth/email-already-in-use')
                        errorToast("Oh no! el correo ya esta registrado");
                    else if(error.code == 'auth/invalid-email')
                        errorToast("Oh no! el correo no es válido");
                    else if(error.code == 'auth/operation-not-allowed')
                        errorToast("Operación no válida @n@");
                    else if (error.code == 'auth/weak-password')
                        errorToast("El password es muy debíl, no va resistir :C");
              });
        }
    }
});
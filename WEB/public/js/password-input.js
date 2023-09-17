Vue.component('password-input', {
    props : ['inputId','setter','valuePath'],
    data : function(){
        return {
            errorMessage : '',
            valid : true,
            used : false,
            input : ''
        };
    },
    watch : {
        input : function(){
            this.setter(this.valuePath, null);
            this.valid = false;
            this.used = true;
            if(this.input === ''){
                this.errorMessage = 'Ingresa tu contraseña.';
                return;
            }
            this.setter(this.valuePath, this.input);
            this.valid = true;
        }
    },
    computed : {
        isInvalid : function(){
            return this.used && !this.valid;  
        },
        isValid : function(){
            return this.used && this.valid;
        }
    },
    template : 
        `
        <div class="input-field col s12">
            <input 
                v-bind:class="{ invalid : isInvalid, valid : isValid }"
                type="password" autofocus
                v-model:value="input" 
                v-bind:id="inputId">
            <label v-bind:for="inputId">
                Contrase&ntilde;a
            </label>
            <span class="helper-text" 
                v-bind:data-error="errorMessage">
            </span>
        </div>
        `
});
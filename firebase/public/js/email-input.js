Vue.component('email-input', {
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
                this.errorMessage = 'Ingresa tu correo.';
                return;
            }
            if(!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(this.input)){
                this.errorMessage = 'Ingresa un correo válido.';
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
                placeholder="correo@dominio.com" 
                type="text" autofocus
                v-model:value="input" 
                v-bind:id="inputId">
            <label v-bind:for="inputId">
                Correo
            </label>
            <span class="helper-text" 
                v-bind:data-error="errorMessage">
            </span>
        </div>
        `
});
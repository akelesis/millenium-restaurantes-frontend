<template>
  <div class="settingsPanel">
        <div class="settingsTitle">
            <h1>Configurações iniciais:</h1>
        </div>
        <div class="settingsInputs">
            <div class="settingsInputGroup">
                <label for="company">Nome da Empresa</label>
                <input name="company" id="company" class="settingsInputControl" v-model="settings.company" type="text" placeholder="Ex.: Restaurante do Juca">
            </div>
            <div class="settingsInputGroup">
                <label for="stock">Nome do Depósito</label>
                <input name="stock" id="stock" class="settingsInputControl" v-model="settings.stock" type="text">
            </div>
            <div class="settingsInputGroup">
                <label for="city">Município</label>
                <input name="city" id="city" class="settingsInputControl" v-model="settings.city" type="text">
            </div>
            <div class="settingsInputGroup">
                <label for="zipCode">CEP</label>
                <input name="zipCode" id="zipCode" class="settingsInputControl" v-model="settings.zipCode" type="text">
            </div>
            <div class="settingsInputGroup">
                <label for="neighborhood">Bairro</label>
                <input name="neighborhood" id="neighborhood" class="settingsInputControl" v-model="settings.neighborhood" type="text">
            </div>
            <div class="settingsInputGroup">
                <label for="street">Logradouro</label>
                <input name="street" id="street" class="settingsInputControl" v-model="settings.street" type="text">
            </div>
            <div class="settingsInputGroup">
                <label for="number">Número</label>
                <input name="number" id="number" class="settingsInputControl" v-model="settings.number" type="text">
            </div>
            <div class="settingsInputGroup">
                <label for="number">Código da cidade</label>
                <select class="settingsInputControl" v-model="settings.code">
                    <option value="2914802">Itabuna - 2914802</option>
                    <option value="2913606">Ilhéus - 2913606</option>
                </select>
            </div>
            <div class="settingsButton">
                <button class="settingsRedirectButton" @click="redirect()">Continuar</button>
                <button v-if="settings" class="settingsRedirectButton" @click="redirectBack()">Voltar</button>
            </div>
        </div>
  </div>
</template>

<script>
export default {
data(){
    return{
        settings: null
    }
},
methods: {
    redirect(){
        if(this.settings.company && this.settings.stock && this.settings.city && this.settings.zipCode && this.settings.neighborhood && this.settings.street && this.settings.number){
            localStorage.setItem("_settings", JSON.stringify(this.settings))
            this.$router.push('/restaurant')
        }
        else{
            alert("Preencha todos os campos para continuar!")
        }
    },
    redirectBack(){
        this.$router.push('/restaurant')
    }
}

}
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    .settingsPanel{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .settingsTitle{
        width: 100vw;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #777;
        font-family: 'Roboto', sans-serif;
    }

    .settingsInputs{
        width: 60vw;
        height: auto;
        padding: 50px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        border-radius: 10px;
        background: rgb(166,217,247);
        background: linear-gradient(0deg, rgba(166,217,247,1) 0%, rgba(206,211,220,1) 100%);
    }

    .settingsInputGroup{
        width: 25vw;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 10px 0 10px 0;
    }

    .settingsInputs label{
        margin-right: 10px;
        font-size: 22px;
        font-family: 'Roboto', sans-serif;
        color: #777;
        width: 100%;
    }

    .settingsInputs input::placeholder{
        color: #ccc;
    }

    .settingsInputControl{
        border: none;
        border-radius: 5px;
        padding: 0 10px 0 10px;
        width: 25vw;
        font-size: 22px;
        height: 50px;
        color:#777;
    }

    .settingsButton{
        width: 60vw;
        height: 100px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-end;
    }

    .settingsRedirectButton{
        width: 200px;
        height: 50px;
        margin: 0 20px 0 20px;
        border: none;
        border-radius: 10px;
        box-shadow: 3px 3px 5px #777;
    }

    .settingsRedirectButton:hover{
        background: rgb(255,255,255);
        background: linear-gradient(0deg, rgb(108, 132, 212) 0%, #A8D8F5 80%);
        box-shadow: 1px 1px 5px #777;
        color: #fff;
    }
</style>
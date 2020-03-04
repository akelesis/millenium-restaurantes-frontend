<template>
  <div class="login">
    <div class="login-box">
      <img class="img-login" src="@/assets/logo-millenium-erp.png" alt="logo millenium ERP" />
      <h3 class="login-title">Por favor, insira as suas credenciais:</h3>
      <div class="input-group">
        <input type="text" class="login-input" v-model="email" placeholder="Insira seu email" />
      </div>
      <div class="input-group">
        <input
          type="password"
          class="login-input"
          v-model="password"
          placeholder="Insira sua senha"
        />
      </div>
      <button type="button" class="btn-login" @click="redirect">Entrar</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    redirect(){
      if(localStorage.getItem("_settings")){
        this.$router.push('/restaurant')
      }
      else{
        this.$router.push('/settings')
      }
    }
  }
};
</script>

<style>
.login {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.login-box {
  margin-top: 10vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 30vw;
  height: 50vh;
  background-color: #1e73be;
  box-shadow: 1px 1px 3px #aaa;
}

.img-login{
    height: 100px;
    margin-top: 20px;
}

.login-title {
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.input-group {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
}

.login-input {
  height: 30px;
  width: 300px;
  border-radius: 5px;
  border: 0.5px solid #aaa;
  padding: 5px;
}

.btn-login{
  margin-bottom: 20px;
  height: 40px;
  width: 100px;
  background-color: #fff;
  border-radius: 5px;
  border: #aaa;
}

.btn-login:hover{
    width: 105px;
    height: 45px;
    background-color: #4ea1eb;
    color: #fff;
    font-size: 15px;
}

@media screen and (max-width: 1080px){
    .login-box {
        width: 60vw;
        height: 60vh;
    }
}
@media screen and (max-height: 600px){
    .login{
        height: 500px;
    }
    .login-box {
        margin-top: 2vh;
        width: 500px;
        height: 400px;
    }
}
</style>

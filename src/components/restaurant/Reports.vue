<template>
  <div class="reports-restaurant">
    <div class="report-wrapper">
      <h1 class="report-title">Relatório de entradas do dia:</h1>
      <div class="score-box">
        R$ {{report}}
      </div>
    </div>
      
      <div class="bottom-panel">
        <div class="return-button" @click="returnRestaurant()">
          <i class="fas fa-arrow-left"></i> Retornar
        </div>
      </div>
      
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      report: 0
    };
  },
  methods: {
    calculateDay() {
      this.report = JSON.parse(localStorage.getItem("_report")).toFixed(2).replace('.', ',')
    },
    returnRestaurant(){
      this.$router.push('/restaurant')
    }
  },
  computed: {
    closedTables() {
      return this.$store.state.closedTables;
    }
  },
  mounted(){
    this.calculateDay()
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

.reports-restaurant{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 80vh;
  
}

.report-wrapper{
  text-align: center;
}

.report-title{
  font-size: 35px;
  color: #444;
}

.score-box{
  width: 500px;
  height: 300px;
  background: rgb(166,217,247);
  background: linear-gradient(0deg, rgba(166,217,247,1) 0%, rgba(206,211,220,1) 100%);
  border-radius: 5px;
  box-shadow: 2px 3px 5px #555;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  color:#1fc710;
}

.bottom-panel{
  width: 95vw;
}

.return-button{
  width: 200px;
  height: 50px;
  background: rgb(107,186,237,1);
  background: linear-gradient(0deg, rgba(107,186,237,1) 1%, rgba(107,186,237,1) 51%, rgba(188,214,230,1) 100%); 
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 3px 3px 5px #777;
  color: #fff;
}

.return-button:hover{
  background: rgb(140,198,237);
  background: linear-gradient(0deg, rgba(140,198,237,1) 1%, rgba(188,214,230,1) 100%);  
  cursor: pointer;
}

</style>
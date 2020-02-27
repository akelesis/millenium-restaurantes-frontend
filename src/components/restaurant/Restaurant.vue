<template>
  <div class="restaurant">
    <!-- RESTAURANT TOOLBAR -->
    <div class="restaurant-toolbar">
      <div class="toolcard" @click="$bvModal.show('open-table')">
        <i class="far fa-plus-square"></i>
        <p>Abrir Mesa</p>
      </div>
      <div class="toolcard" @click="goToReports()">
        <i class="fas fa-file-invoice-dollar"></i>
        <p>Relatórios</p>
      </div>
      <!-- <div class="toolcard" @click="$bvModal.show('add-stock-modal')">
        <i class="fas fa-store"></i>
        <p>Add ao estoque</p>
      </div> -->
      <div class="toolcard" @click="$router.push({path: '/dashboard'})">
        <i class="fas fa-home"></i>
        <p>Início</p>
      </div>
      <div class="toolcard" @click="$router.push({path: '/'})">
        <i class="fas fa-door-open"></i>
        <p>Sair</p>
      </div>
    </div>
    <!-- OPEN TABLE -->
    <b-modal id="open-table" hide-footer>
      <template slot="modal-title">Abrir Mesa</template>
      <div class="d-block text-center">
        <b-input-group size="md" prepend="Nome (Opcional)">
          <b-form-input v-model="table.name"></b-form-input>
        </b-input-group>
        <b-input-group size="md" prepend="Número da mesa">
          <b-form-input type="number" v-model="table.number" min="1" max="99"></b-form-input>
        </b-input-group>
        <b-input-group size="md" prepend="Número de clientes">
          <b-form-input type="number" v-model="table.clients" min="1" max="99"></b-form-input>
        </b-input-group>
      </div>
      <b-button class="mt-3" variant="primary" block @click="openTable()">Abrir Mesa</b-button>
    </b-modal>

    <!-- ADD TO STOCK -->
    <!-- <b-modal id="add-stock-modal" size="lg" title="Adicionar ao estoque" hide-footer>
      <b-input-group size="md" prepend="Nome do produto">
        <b-form-input type="text" v-model="product.name"></b-form-input>
      </b-input-group>
      <b-form-textarea
        id="textarea"
        v-model="product.text"
        class="mt-3"
        placeholder="Descrição do produto"
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <b-input-group size="md" prepend="Preço">
        <b-form-input type="text" v-model="product.preco"></b-form-input>
      </b-input-group>
      <b-input-group size="md" prepend="quantidade em estoque">
        <b-form-input type="number" min="0" max="999" v-model="product.quantity"></b-form-input>
      </b-input-group>
      <b-button class="mt-3" variant="primary" block @click="addStock()">Inserir produto</b-button>
    </b-modal> -->

    <!-- MAIN SCREEN -->
    <div class="tablemap-container">
      <div class="table-map">
        <h3>Mapa de mesas:</h3>
        <div
          class="table-card"
          v-for="table in tables"
          :key="table.number"
          @click="addOrder(table)"
        >
          <h3>{{table.number}}</h3>
          <span class="open">Aberta</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from 'axios'

export default {
  data() {
    return {
      product: {},
      pedido: [],
      couvert: 3,
      headers: {}
    };
  },
  methods: {
    retrieveLocalStorage(){
      if(localStorage.getItem("_tables")){
        this.$store.state.tables = JSON.parse(localStorage.getItem("_tables"))
      }
    },
    goToReports() {
      this.$router.push('reports')
    },
    openTable() {
      /**/
      this.table.id = this.tables.length
      this.table.products = []
      let aux = {...this.table}
      this.$store.commit('addTable', aux);
      this.$store.state.table = {}
      aux = {}
      this.$bvModal.hide("open-table");
      localStorage.setItem('_tables', JSON.stringify(this.$store.state.tables))
      //axios.get('http://localhost:8080/api/products', headers)
    },
    addOrder(table) {
      this.$store.commit("getTable", table);
      this.$router.push({ path: "/table" });
    },
    addProd(prod) {
      this.table.order.push(prod);
    }
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    table() {
      return this.$store.state.table;
    },
    tables(){
        return this.$store.state.tables
    }
  },
  mounted(){
      this.retrieveLocalStorage();
  }
};
</script>

<style>
.restaurant-toolbar {
  width: 100vw;
  height: 80px;
  background-color: #ccdbdc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toolcard {
  height: 100%;
  width: 150px;
  text-align: center;
  padding: 10px;
  border-left: 1px solid #999;
  border-right: 1px solid #999;
  margin: 0;
  cursor: pointer;
}

.toolcard:hover {
  background: #a8c0ff; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #005aa7,
    #a8c0ff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #005aa7,
    #a8c0ff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: white;
}

.toolcard i {
  font-size: 25px;
  margin: 7px 0;
}

.tablemap-container {
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  justify-content: center;
}

.table-map {
  width: 70vw;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  margin-top: 50px;
  color: #666;
}

.table-map h3 {
  width: 100%;
}

.table-card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 100px;
  width: 100px;
  background: #eee;
  margin: 2px;
}

.table-card:hover {
  background: #c9d6ff; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    #e2e2e2,
    #c9d6ff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #e2e2e2,
    #c9d6ff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: white;
  cursor: pointer;
}

.open {
  padding: 5px 10px;
  background-color: #0bb802;
  color: #fff;
  width: 100%;
}

.closed {
  padding: 5px 10px;
  background-color: #b80202;
  color: #fff;
  width: 100%;
}
</style>

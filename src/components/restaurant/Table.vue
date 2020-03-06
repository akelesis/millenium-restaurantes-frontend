<template>
  <div class="table-manager">
    <div class="left-panel">
      <div class="product-box">
        <table class="product-table" style="width: 100%">
          <thead>
            <td width="10%">Id</td>
            <td width="50%">Produto</td>
            <td width="20%">Preço</td>
            <td width="20%">Selecionar</td>
          </thead>
          <tbody>
            <tr v-for="prod in products" :key="prod.id">
              <td>{{prod.id}}</td>
              <td>{{prod.name}}</td>
              <td>R$ {{prod.price.toFixed(2)}}</td>
              <td>
                <button type="button" @click="addProd(prod)" class="product-list-button">
                  <i class="fas fa-cart-plus"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <b-input-group size="md" prepend="Produto">
        <b-form-input v-model="product.name"></b-form-input>
      </b-input-group>
      <b-input-group size="md" prepend="quantidade">
        <b-form-input type="number" v-model="quantity" min="0" max="999"></b-form-input>
      </b-input-group>
      <b-button class="mt-3" variant="primary" block @click="insertOrder()">Inserir pedido</b-button>
      <div class="return-arrow">
        <router-link to="/restaurant">
          <i class="fas fa-arrow-left"></i> Retornar
        </router-link>
      </div>
    </div>
    <div class="right-panel">
      <div class="table-box">
        <table class="product-table" style="width: 100%">
          <thead>
            <td width="10%">Id</td>
            <td width="30%">Produto</td>
            <td width="20%">Preço</td>
            <td width="20%">Quantidade</td>
            <td width="20%">Excluir</td>
          </thead>
          <tbody>
            <tr v-for="prod in table.products" :key="prod.id">
              <td>{{prod.id}}</td>
              <td>{{prod.name}}</td>
              <td>R$ {{parseFloat(prod.price).toFixed(2)}}</td>
              <td>{{(prod.quantity)}}</td>
              <td>
                <button type="button" @click="removeProd(prod)" class="table-list-button">
                  <i class="fas fa-times"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="bill">
        Subtotal: R$ {{bill.toFixed(2).replace('.', ',')}}
        <b-input-group size="md" prepend="couvert">
          <b-form-input type="number" v-model="couvert" min="0" max="999" @change="getBill"></b-form-input>
        </b-input-group>
        <p>Dez porcento: R${{tip}}</p>
        <p>Total: R${{total}}</p>
      </div>
      <b-button
        class="mt-3"
        variant="danger"
        block
        @click="$bvModal.show('close-table')"
      >Fechar Mesa</b-button>
    </div>
    <b-modal id="close-table" hide-footer>
      <template slot="modal-title">Fechar Mesa - {{table.name}}</template>
      <div class="d-block text-center">
        <b-form-select v-model="paymentMethod" :options="paymentOpt" class="mb-3"></b-form-select>
        <b-form-select v-model="creditMethod" :options="creditOpt" class="mt-3 mb-4"></b-form-select>
      </div>
      <b-button class="mt-3" variant="primary" block @click="closeTable()">Fechar Mesa</b-button>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      OnTableChange: false,
      product: {},
      quantity: "",
      paymentMethod: null,
      creditMethod: 0,
      paymentOpt: [
        { value: null, text: "Escolha uma forma de pagamento" },
        { value: 0, text: "À vista ou no débito" },
        { value: 1, text: "Cartão de crédito" }
      ],
      creditOpt: [
        { value: 0, text: "Escolha o numero de parcelas em caso de crédito" },
        { value: 1, text: "1x" },
        { value: 2, text: "2x" },
        { value: 3, text: "3x" },
        { value: 4, text: "4x" },
        { value: 5, text: "5x" },
        { value: 6, text: "6x" }
      ],
      bill: 0.0,
      couvert: 0.0,
      total: 0.0,
      tip: 0.0,
      settings: {}
    };
  },
  methods: {
    loadProducts() {
      if (navigator.onLine) {
        const headers = {};
        const credentials = JSON.parse(localStorage.getItem("_credentials"));

        headers.AuthorizationToken = credentials.token;
        headers.User = credentials.email;
        headers.App = credentials.app;

        let db;

        axios.post("http://localhost:8080/api/products", headers).then(res => {
          this.$store.state.products = res.data;
          if (window.indexedDB) {
            const request = window.indexedDB.open("products");
            request.onerror = event => {
              alert("Error on creating Database: " + event.target.errorCode);
            };
            request.onupgradeneeded = event => {
              alert("Database successful created! " + event);
              db = event.target.result;

              const objectStore = db.createObjectStore("stockProducts", {
                keyPath: "id"
              });

              objectStore.createIndex("name", "name", { unique: false });

              objectStore.transaction.oncomplete = () => {
                const productObjStore = db
                  .transaction("stockProducts", "readwrite")
                  .objectStore("stockProducts");

                res.data.forEach(product => {
                  productObjStore.add(product);
                });
              };
            };
          }
        });
      } else {
        const request = window.indexedDB.open("products");
        request.onerror = event => {
          alert("Error on creating Database: " + event.target.errorCode);
        };
        request.onsuccess = event => {
          const db = event.target.result;

          const objectStore = db
            .transaction("stockProducts")
            .objectStore("stockProducts");

          objectStore.getAll().onsuccess = event => {
            this.$store.state.products = event.target.result;
          };
        };
      }
    },

    insertOrder() {
      this.product.quantity = this.quantity;
      let order = this.product;
      this.$store.commit("insertOrder", order);
      this.OnTableChange = true;
      localStorage.setItem("_tables", JSON.stringify(this.$store.state.tables));
    },

    addProd(item) {
      this.product = item;
    },

    removeProd(prod) {
      for (let i = 0; i < this.table.products.length; i++) {
        if (this.table.products[i].id == prod.id) {
          this.table.products.splice(i, 1);
        }
      }
      this.$store.commit("removeProd", this.table);
      localStorage.setItem("_tables", JSON.stringify(this.$store.state.tables));
      this.OnTableChange = true;
    },

    getBill() {
      this.bill = 0;
      for (let i = 0; i < this.table.products.length; i++) {
        this.bill +=
          parseFloat(this.table.products[i].price) *
          parseFloat(this.table.products[i].quantity);
      }
      this.tip = this.bill * 0.1;
      this.total =
        parseFloat(this.bill) +
        parseFloat(this.couvert * this.table.clients) +
        parseFloat(this.tip);
      this.total = this.total.toFixed(2).replace(".", ",");
      this.tip = this.tip.toFixed(2).replace(".", ",");
      this.$forceUpdate();
      this.OnTableChange = false;
    },

    closeTable() {
      const closedTable = {};
      const today = new Date();
      closedTable.bill = this.bill;
      closedTable.date =
        today.getUTCFullYear() +
        "-" +
        today.getUTCMonth() +
        "-" +
        today.getUTCDay() +
        "T" +
        today.getUTCHours() +
        ":" +
        today.getUTCMinutes() +
        ":" +
        today.getUTCSeconds();
      closedTable.date = closedTable.date + "-02:00";
      let tableProds = [];

      let ValorFinal = 0;

      this.settings = JSON.parse(localStorage.getItem("_settings"));

      for (let i = 0; i < this.$store.state.table.products.length; i++) {
        let aux = {};
        aux.Codigo = this.$store.state.table.products[i].codeFromAPI;
        aux.Unidade = "";
        aux.Descricao = this.$store.state.table.products[i].name;
        aux.Quantidade = this.$store.state.table.products[i].quantity;
        aux.ValorUnitario = this.$store.state.table.products[i].price;
        aux.DescontoUnitario = "";
        aux.ValorTotal =
          this.$store.state.table.products[i].price *
          this.$store.state.table.products[i].quantity;
        ValorFinal += aux.ValorTotal;
        tableProds.push(aux);
      }
      let credentials = JSON.parse(localStorage.getItem("_credentials"));

      const headers = {
        AuthorizationToken: credentials.token,
        User: credentials.email,
        App: credentials.app
      };
      const emission = {
        OrigemVenda: "Venda Direta",
        Deposito: this.settings.stock,
        StatusSistema: "Pedido Faturado",
        Status: "",
        Categoria: "",
        Validade: "",
        Empresa: this.settings.company,
        Cliente: "EMPORIO DA CARNE COMERCIO VAREJISTA EIRELI",
        Vendedor: "login@vendedor.com",
        LancarComissaoVendedor: true,
        PlanoDeConta: "ALIMENTACAO",
        FormaPagamento: this.paymentMethod,
        NumeroParcelas: this.creditMethod,
        Transportadora: "",
        DataEnvio: closedTable.date,
        Enviado: false,
        ValorFrete: 0.0,
        FreteContaEmitente: false,
        ValorSeguro: 0.0,
        Descricao: "",
        OutrasDespesas: 0.0,
        ValorFinal: ValorFinal,
        Finalizado: true,
        Lancado: true,
        NumeroNFe: "",
        Municipio: this.settings.city,
        CodigoMunicipio: this.settings.code,
        Pais: "Brasil",
        CEP: this.settings.zipCode,
        UF: "Bahia",
        UFCodigo: "29",
        Bairro: this.settings.neighborhood,
        Logradouro: this.settings.street,
        LogradouroNumero: this.settings.number,
        LogradouroComplemento: "",
        Items: tableProds,
        Pagamentos: [
          {
            DescricaoPagamento: "Pagamento",
            ValorPagamento: ValorFinal,
            BandeiraCartao: "99",
            NumeroTerminal: "1",
            DataTransacao: closedTable.date,
            CredenciadoraCartao: "",
            CredenciadoraCNPJ: "",
            CV_NSU: "",
            CondicaoPagamento: this.paymentMethod,
            Parcelas: this.creditMethod,
            PeriodoParcelas: 0,
            Adiantamento: 0.0,
            Quitar: "true"
          }
        ]
      };

      const pack = {headers, emission };
      if ("serviceWorker" in navigator && "SyncManager" in window) {
        navigator.serviceWorker.ready.then(sw => {
          const request = window.indexedDB.open("invoices", 1)
          let db

          request.onerror = function(event){
            alert("teste ",event.target.result)
          }
          
          request.onupgradeneeded = function(event){
            db = event.target.result
            
            const objStore = db.createObjectStore('sync-invoices', {autoIncrement:true})
            objStore.transaction.oncomplete = function(event){
              alert("Transaction Complete", event.target.result)
            }
            objStore.onerror = function(event){
              alert('error: ', event.target.result)
            }
          }

          request.onsuccess = function(event){
            db = event.target.result

            const transaction = db.transaction("sync-invoices", "readwrite")
            const objectStore = transaction.objectStore('sync-invoices')
            objectStore.add(pack)
          }
          
          sw.sync.register('sync-new-invoice')
        })

        
      }
      else{
        axios.post("http://localhost:8080/api/bills", pack)
        .then(res => {
          return res.data;
        });
      }

      
      closedTable.id = this.table.id
      this.$store.commit('addClosedTable', closedTable)
      localStorage.setItem("_tables", JSON.stringify(this.$store.state.tables))
      this.$router.push('/restaurant')
    }
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    table() {
      return this.$store.state.table;
    },
    closedTables() {
      return this.$store.state.closedTables;
    }
  },
  watch: {
    OnTableChange: function() {
      this.getBill();
    }
  },
  mounted() {
    this.loadProducts(), this.getBill();
  }
};
</script>

<style>
thead {
  background-color: #fff;
}

.table-manager {
  padding-top: 20px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 100px;
}

.left-panel {
  width: 30vw;
  margin-left: 20px;
}

.right-panel {
  width: 30vw;
  margin: 0 0 50px 20px;
}

.table-box,
.product-box {
  height: 600px;
  background-color: #ccc;
  overflow: hidden;
}

.product-table tr {
  background: rgb(191, 191, 191);
  background: linear-gradient(
    0deg,
    rgba(191, 191, 191, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  height: 40px;
}

.product-list-button {
  color: #fff;
  background: #de9151;
  border: none;
  border-radius: 5px;
}

.product-table td {
  text-align: center;
}

.table-list-button {
  color: #fff;
  background: #dc3545;
  border: none;
  border-radius: 5px;
}

.return-arrow {
  margin-left: 10px;
  padding-top: 50px;
  font-size: 20px;
}

.bill {
  font-size: 25px;
  text-align: right;
  color: #00aa00;
}
</style>
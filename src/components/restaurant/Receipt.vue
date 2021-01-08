<template>
  <div class="outer-receipt">
    <div class="receipt">
      <div class="receipt-container" id="receipt">
        <p class="bold-text">{{company.company}}</p>
        <p>{{company.street + ", " + company.neighborhood + ", " + company.number}}</p>
        <p>{{company.city + ", BA - " + company.zipCode}}</p>
        <p>CNPJ: {{company.cnpj}}</p>
        <p class="bold-text">COMPROVANTE DE VENDA</p>
        <p>não fiscal</p>

        <hr />

        <table class="prod-list-receipt">
          <thead>
            <td class="prod">Produto</td>
            <td class="qtd">Qtde</td>
            <td class="value">Valor Unit.</td>
          </thead>
          <tbody>
            <tr v-for="prod in tableProds" :key="prod.ID">
              <td class="prod">{{prod.Nome}}</td>
              <td class="qtd">{{prod.Quantidade}}</td>
              <td class="value">{{prod.ValorUnitario.toFixed(2).replace(".", ",")}}</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <h3>Total: {{total.toFixed(2).replace(".", ",")}}</h3>
        <hr />
        <p>Obrigado pela preferência</p>
      </div>
    </div>
    <button @click="generatePDF" class="print-button">Imprimir</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
        company: {},
        table: {},
        tableProds: [],
        total: 0
    };
  },
  methods: {
    getCompanyData() {
        this.company = JSON.parse(localStorage.getItem("_settings"))
        this.table = JSON.parse(localStorage.getItem("_currentTable"))
        this.tableProds = this.table.products
        this.total = this.tableProds.reduce((total, prod) => total + prod.ValorTotal, 0)
    },
    generatePDF() {
      window.print();
    },
  },
  mounted() {
      this.getCompanyData()
  }
};
</script>

<style>
.outer-receipt {
  width: 100vw;
  margin: 20px;
}

.bold-text {
    font-weight: bold;
}

.print-button {
    border: 1px solid #aaa;
    border-radius: 5px;
}


@media print {

  .receipt {
    width: 100vw;
    margin: 20px 20px 20px 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .prod-list-receipt {
    width: 100%;
  }

  td,
  p {
    font-size: 15px;
  }

  .prod {
    width: 50%;
  }

  .qtd {
    width: 20%;
  }

  .value {
    width: 30%;
  }

  .print-button {
    display: none !important;
  }

  hr {
    height: 1px;
    width: 100%;
  }
}
</style>
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    products: [],
    tables: [],
    closedTables: [],
    table: {
      number: '',
      clients: '',
      products: []
    }
  },
  mutations: {
    addProd(state, payload){
      state.products.push(payload)
    },
    removeProd(state, payload){
      for(let i = 0; i < state.tables.length; i++){
        if(state.tables[i].number == payload.number){
          state.tables[i] = payload
          return
        }
      }
    },
    addClosedTable(state, payload){
      state.tables.splice(state.tables.findIndex(table => table == payload), 1)
      alert(state.tables.findIndex(table => table == payload))
      payload.id = state.closedTables.length
      state.closedTables.push(payload)
    },
    getTable(state, payload){
      state.table = payload
    },
    addTable(state, payload){
 
      state.tables.push(payload)
    },
    insertOrder(state, payload){
      for(let i = 0; i < state.table.products.length; i++){
        if(state.table.products[i].id == payload.id){
          state.table.products[i].quantity = parseInt(state.table.products[i].quantity) + parseInt(payload.quantity)
          return
        }
      }
      state.table.products.push(payload)
      
      for(let i = 0; i < state.tables.length; i++){
        if(state.tables[i].number == payload.number){
          state.tables[i] = payload
          return
        }
      }

    }

  },
  actions: {

  }
})

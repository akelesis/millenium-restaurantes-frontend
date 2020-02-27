<template>
  <div class="reports-restaurant">
    {{day}}
    <router-link to="/restaurant">
      <i class="fas fa-arrow-left"></i> Retornar
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      day: 0
    };
  },
  methods: {
    calculateDay() {
      for (let i = 0; i < this.closedTables.length; i++) {
        this.day += this.closedTables[i].bill;
      }
    }
  },
  computed: {
    closedTables() {
      return this.$store.state.closedTables;
    }
  }
};
</script>

<style>
</style>
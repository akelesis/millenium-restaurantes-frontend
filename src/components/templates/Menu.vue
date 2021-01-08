<template>
    <div class="menu">
        <img src="@/assets/logo-millenium-erp.png" alt="logo millenium erp">
        <h3>Restaurantes</h3>
    </div>
</template>

<script>
export default {

}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    .menu{
        display: flex;
        background-color: #1e43be;
        width: 100%;
        height: 10vh;
        margin: 0;
        box-sizing: content-box;
    }

    .menu img{
        height: 80px;
        margin: 10px;
    }

    .menu h3{
        color: white;
        margin-top: 40px;
        font-family: 'Roboto', sans-serif;
    }

    @media screen and (max-height: 900px){
        .menu img{
            height: 50px;
        }

        .menu{
            height: 70px;
        }
    }

    @media print {
        .menu {
            display: none !important;
        }
    }
</style>

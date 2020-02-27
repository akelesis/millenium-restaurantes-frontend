<template>
    <div class="dashboard">
        <aside class="menu-modules">
            <div>
                <div class="menu-opt"><router-link to="/restaurant">Restaurantes</router-link></div>
                <div class="menu-opt"><router-link to="/hotels">Hotéis</router-link></div>
                <div class="menu-opt"><router-link to="/marketplaces">Mercados e lojas</router-link></div>
            </div>
            <div class="logout"><router-link to="/">Logout</router-link></div>
        </aside>
        <div class="main-content">
            <h3>Seus estabelecimentos:</h3>
            <div class="companies">
                <button class="card-btn" @click="moveRestaurant()">
                    <div class="card">
                        <h4>Boteco Gaúcho</h4>
                        <span>aberto</span>
                        <img src="../../assets/restaurant-icon.png" alt="">
                    </div>
                </button>
                <button class="card-btn">
                    <div class="card">
                        <h4>Palace Hotel</h4>
                        <span>aberto</span>
                        <img src="../../assets/hotel.png" alt="">
                    </div>
                </button>
                <button class="card-btn">
                    <div class="card">
                        <h4>Gilmara Confecções</h4>
                        <span>aberto</span>
                        <img src="../../assets/store.png" alt="">
                    </div>
                </button>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{}
    },
    methods: {
        moveRestaurant(){
            this.$router.push({path: '/restaurant'})
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

.dashboard{
    height: 100%;
    width: 100vw;
    display: flex;
}
.menu-modules{
    background-color: #1e73be;
    width: 15vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.menu-opt {
    list-style: none;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 20px;
    width: 100%;
}

.card-btn{
    border: none;
    background-color: #fff;
}

.menu-opt a{
    color: #fff;
    font-family: 'Roboto', sans-serif;
}

.menu-opt:hover a{
    color:#1e73be;
    text-decoration: none;
}


.menu-opt:hover{
    background: #C9D6FF;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #E2E2E2, #C9D6FF);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #E2E2E2, #C9D6FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.main-content{
    width: 85vw;
}

.main-content h3{
    text-align: center;
    font-family: 'Roboto', sans-serif;
    margin-top: 20px;
    color: #777;
}

.companies{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.card{
    width: 500px;
    height: 200px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: #ccdbdc;
}

.card h4{
    height: 50px;
    color: #555;
    margin: 20px;
}

.card a:hover{
    text-decoration: none;
}

.card span{
    margin: 20px;
    text-align: center;
    color: #fff;
    background-color: #0bb802;
    height: 30px;
    width: 100px;
    padding: 0 10px;
}

.card img{
    height: 100px;
    width: 100px;
    margin: 20px;
    align-self: flex-end;
    justify-self: flex-end;
    position: static;
}

.card:hover{
   background: #005AA7;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, rgb(203, 231, 255), rgb(255, 255, 255));  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, rgb(203, 231, 255), rgb(255, 255, 255)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.logout{
    margin-left: 10px;
    margin-bottom: 10px;
}

.logout a{
    color: #eee;
}
</style>

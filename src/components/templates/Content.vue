<template>
    <div class="content">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Content'
}
</script>

<style>
.content{
    min-height: 65vh;
    width: 99vw;
}
</style>

<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive">
                <!-- 这里是会被缓存的视图组件 -->
            </router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive">
            <!-- 这里是不被缓存的视图组件 -->
        </router-view>
    </div>
</template>

<script>
export default {
    name: "App"
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    font-size: 0.26rem;
    box-sizing: border-box;
}
ul,
ol,
p {
    list-style: none;
    padding: 0;
    margin: 0;
}
a {
    text-decoration: none;
}
</style>

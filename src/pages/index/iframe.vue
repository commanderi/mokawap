<template>
    <div class="iframe">
        <div class="lf_fan" v-on:click="returnFn">
            <img src="../../assets/return988.png">
        </div>
        <iframe :src="link" frameborder="0"></iframe>
    </div>
</template>
<script>
export default {
    name: 'iframe',
    data () {
        return {
            link:null,
        }
    },
    methods:{
      returnFn() {
        window.location.href = 'http://wap.988cp.win/#/';
      },
    },
    mounted(){
        this.link = this.$route.query.url;
    }
}
</script>
<style scoped>
iframe{width: 100%;height: 100vh;}
.lf_fan{width: 50px;height: 50px;position: fixed;top: 5px;left: 5px;right: 0;overflow: hidden;text-align: center;}
.lf_fan>img{width: 100%;height: 100%;}
</style>


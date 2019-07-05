<template>
    <!-- 转盘 -->
    <div class="Turntable">
        <div class="turntable_head">
            <span><router-link to="/">返回首页</router-link></span>
            <span v-on:click="muenClick(1)">更多规则</span>
            <span v-on:click="muenClick(0)">我的红包</span>
            <b>我的抽奖次数：{{ playNumber }}</b>
        </div>
        <img class="turntable_topimg" src="../../assets/5684.png">
        <div class="turntable_con">
            <div class="BigEheel_con">
                <div class="RotaryTable">
                    <template v-if="list!==null">
                        <span v-for="(d,i) in list" :key="i">{{ d.name }}</span>
                    </template>
                </div>
                <i class="Pointer" v-on:click="Pointer"></i>
            </div>
        </div>
        <div class="Mask scale_0">
            <div class="turntable_mask">
                <p class="turntable_mask_title">我的红包<button class="popup-closeBtn center" v-on:click="close(0)"></button></p>
                <div class="turntable_mask_title_p">
                    <template v-if="redList!==null">
                        <span>红包总额&nbsp;： {{ redList.total_money }}元</span>
                        <span>红包个数&nbsp;： {{ redList.total_number }}</span>
                    </template>
                </div>
                <div class="turntable_mask_con">
                    <table width="100%">
                        <thead class="turntable_mask_thead">
                            <th width="33%">时间</th>
                            <th>红包类型</th>
                            <th>金额</th>
                        </thead>
                        <tbody class="turntable_mask_tbody">
                            <template v-if="redList!==null">
                                <tr v-for="(d,i) in redList.data.data" :key="i">
                                    <td width="33%">{{ d.create_at }}</td>
                                    <td>{{ d.type }}</td>
                                    <td>￥{{ d.money }}</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="Mask scale_0">
            <div class="turntable_mask turntable_mask-g">
                <p class="turntable_mask_title">活动规则<button class="popup-closeBtn center" v-on:click="close(1)"></button></p>
                <div class="turntable_mask_con turntable_mask_con-g">
                    <img src="../../assets/51513.jpg">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { getRedList } from '@/axios/api.js' //获取转盘列表
import { getRobTimes } from '@/axios/api.js' //获取可以转转盘的次数
import { doRobRed } from '@/axios/api.js' //转转盘
import { getMyRed } from '@/axios/api.js' //我的转盘记录
import '../../../static/js/jquery.rotate.js'
export default {
    name:'turntable',
    data(){
        return{
            list:null,
            redList:null,
            playNumber:null,//抽奖的次数
            isture:null,//是否正在抽奖
        }
    },
    computed: {
      ...mapState(["loginInfo"])
    },
    components: {},
    destroyed() {},
    mounted() {
        this.getRedListFn();
        this.getRobTimesFn();
    },
    methods: {
        muenClick:function(n){
            if(n==0){
                this.getMyRedFn();
            }
            $('.Mask').eq(n).addClass('scale_1');
        },
        close:function(n){
            $('.Mask').eq(n).removeClass('scale_1');
        },
        Pointer:function(){
            if(this.list==null){
                this.$toast.error('未获取到奖品数据,请刷新重试');
                return
            }else if(this.playNumber==0 || this.playNumber==null){
                this.$toast.error('你未满足抽奖条件或抽奖次数已用完');
                return
            }else{
                if(this.isture===true){
                    this.doRobRedFn();
                    this.getRobTimesFn();
                }else{
                    this.$toast.warning('正在抽奖,请稍等');
                }
            }
        },
        clickfun:function(num,name) {
            switch (num) {
                case 1:
                    this.rotateFun(333, name);
                break;
                case 2:
                    this.rotateFun(280, name);
                break;
                case 3:
                    this.rotateFun(230, name);
                break;
                case 4:
                    this.rotateFun(180, name);
                break;
                case 5:
                    this.rotateFun(127, name);
                break;
                case 6:
                    this.rotateFun(78, name);
                break;
                case 7:
                    this.rotateFun(25, name);
                break;
            }
        },
        rotateFun:function(angle, text) {
            this.isture = false;
            let me = this;
            $('.RotaryTable').rotate({
                duration: 5000,
                animateTo: angle + 3600,
                callback: function () {
                    me.$toast.success('恭喜您,获得了'+text+',奖品已发放至您的账户');
                    me.isture = true;
                    setTimeout(() => {
                        $(this).rotate({angle:0});                        
                    }, 1000);
                }
            });
        },
        // 获取奖品
        doRobRedFn:function(){
            doRobRed({'token':this.loginInfo.token,'uid':this.loginInfo.id}).then(res =>{
                if(res.ret==200){
                    this.clickfun(res.data.id,res.data.name);
                }else{
                    this.$toast.error(res.data.msg);
                }
            })
        },
      
        // 获取抽奖的次数
        getRobTimesFn:function(){
            const loading = this.$loading({text:'正在获取您的抽奖次数,请稍等'});
            getRobTimes({'token':this.loginInfo.token,'uid':this.loginInfo.id}).then(res =>{
                if(res.ret==200){
                    this.isture = true;
                    this.playNumber = res.data.rob_number;
                    loading.close();
                }else{
                    loading.close();
                    this.isture = false;
                    this.playNumber = 0;
                    this.$toast.error(res.data.msg);
                }
            })
        },
        // 获取转盘列表
        getRedListFn:function(){
            const loading = this.$loading({text:'正在获取抽奖数据,请稍等'});
            getRedList({'token':this.loginInfo.token,'uid':this.loginInfo.id}).then(res =>{
                if(res.ret==200){
                    this.list = res.data;
                    loading.close();
                }else{
                    loading.close();
                    this.$toast.error(res.data.msg);
                }
            })
        },
        // 获取转盘记录
        getMyRedFn:function(){
            getMyRed({'token':this.loginInfo.token,'uid':this.loginInfo.id}).then(res =>{
                if(res.ret==200){
                    this.redList = res.data;
                }else{
                    this.$toast.error(res.data.msg);
                }
            })
        },
    },
}
</script>



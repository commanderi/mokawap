<template>
  <div class="lottery-layer">
    <div :class="['Mask','scale_0',isShow?'scale_1':'']">
      <div class="am-modal-wrap">
        <div class="am-modal-content">
          <div class="am-modal-header"><div class="am-modal-title">注单设定</div></div>
          <div class="am-modal-body">
            <div class="betBaseContainer">
              <p class="betBaseContainer_p" v-if="selData!=null">最高赔率：{{ selData.rate }}</p>
              <div class="flex___16JOt moneyInfo___1K8xW">
                <div class="jine">单注金额：</div>
                <div class="am-list-item am-input-item am-list-item-middle moneyBase___2PFgO am-input-focus am-input-android" style="width:40%">
                  <div class="am-list-line">
                    <div class="am-input-control">
                      <input maxlength="7" type="text" v-on:input="getSingleAmount" v-on:focus="fa" v-model="SingleAmount" pattern="[0-9]*" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
                    </div>
                  </div>
                </div>
                <div class="selectMode___3rpny">
                  <!-- modeItemActive -->
                  <div class="modeItem___1u_Tu" :class="YuanAngle==1 ? 'modeItemActive' : ''" v-on:click="setYuanAngle(1)">元</div>
                  <div class="modeItem___1u_Tu" :class="YuanAngle==0.1 ? 'modeItemActive' : ''" v-on:click="setYuanAngle(0.1)">角</div>
                  <div class="modeItem___1u_Tu" :class="YuanAngle==0.01 ? 'modeItemActive' : ''" v-on:click="setYuanAngle(0.01)">分</div>
                </div>
              </div>
              <div class="selectMoney">
                <!-- modeItemActive -->
                <button v-for="(d,i) in SingleAmountArr" :key="i" :class="SingleAmount==d ? 'modeItemActive' : ''" v-on:click="selSingleAmount(d)">{{ d }}</button>
              </div>
              <div class="textInfo">
                <p>注数：{{ selData.note }}</p>
                <p>总金额：{{ TotalAmount }}元</p>
                <p>单注最小金额为<span class="maxBonus">0.01</span>元</p>
              </div>
            </div>
          </div>
          <div class="am-modal-footer">
            <div class="am-modal-button-group-h">
              <button class="am-modal-button" v-on:click="setBetting()">取消</button>
              <button class="am-modal-button" v-on:click="toShoppingCart()">确定</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'lottery-layer',
    data() {
      return {
        selData:{
          note:0, // 注数
          number:null, // 投注号码
          rate:null // 赔率
        },
        YuanAngle:1, //元角分
        SingleAmount:2, //单注金额
        NotesNumber:0, //注数
        TotalAmount:0, //总金额
        SingleAmountArr:[10,50,100,200,500,1000,5000,10000,50000],
      }
    },
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      betData: {
        type: Object,
        default: false
      }
    },
    mounted() {

    },
    watch: {
      betData() {
        this.selData = {
          note: this.betData.betQuantity,
          number: this.betData.betNumber,
          rate: this.betData.rate,
          odd_play: this.betData.odd_play,
          odd_title: this.betData.odd_title,
          cateid: this.betData.cateid,
          title: this.betData.title
        }
        this.TotalAmount = this.selData.note * this.SingleAmount;
        // console.log('selData',this.selData)
        // console.log('betData',this.betData)
      }
    },
    methods: {
      // 设置投注(close layer)
      setBetting:function(){
        this.YuanAngle = 1;
        this.SingleAmount = 2;
        this.TotalAmount = this.changeTwoDecimal_f((this.selData.note*this.SingleAmount)*this.YuanAngle);
        this.$emit('update:isShow', false)
      },
      // 监听单笔金额输入框
      getSingleAmount:function(){
        this.TotalAmount = this.changeTwoDecimal_f((this.selData.note*this.SingleAmount)*this.YuanAngle);
      },
      // 选择的单笔金额
      selSingleAmount:function(num){
        this.SingleAmount = num;
        this.TotalAmount = this.changeTwoDecimal_f((this.selData.note*this.SingleAmount)*this.YuanAngle);
      },
      // 设置元角分
      setYuanAngle:function(num){
        this.YuanAngle = num;
        this.TotalAmount = this.changeTwoDecimal_f((this.selData.note*this.SingleAmount)*this.YuanAngle);
      },
      // 强制保留两位小数点函数
      changeTwoDecimal_f:function (x) {
        var f_x = parseFloat(x);
        if (isNaN(f_x)){
          // console.log('function:changeTwoDecimal->parameter error');
          return false;
        }
        f_x = Math.round(f_x*100)/100;
        var s_x = f_x.toString();
        var pos_decimal = s_x.indexOf('.');
        if (pos_decimal < 0){
          pos_decimal = s_x.length;
          s_x += '.';
        }
        while (s_x.length <= pos_decimal + 2){
          s_x += '0';
        }
        return Number(s_x);
      },
      fa:function(){
        this.SingleAmount = '';
      },
      // 购物车
      toShoppingCart:function(){
        // number:投注号码,odd_play:玩法,note:注数,money:投注总额,one_money:单注投注金额,rate:投注赔率,multiple:投注倍数,cate:彩种id,name:子彩种名称
        this.readyData = {
          number:this.selData.number,
          odd_play:this.selData.odd_play,
          note:this.selData.note,
          money:this.TotalAmount,
          one_money:this.changeTwoDecimal_f(this.SingleAmount*this.YuanAngle),
          rate:this.selData.rate,
          multiple:null,
          odd_title:this.selData.odd_title
        };
        // console.log('提交的数据readyData', this.readyData)
        this.$store.state.cateID = this.selData.cateid;
        this.$store.commit("increment",this.readyData);
        this.$router.push({ path:'/BetBuyListPage', query:{id: this.selData.cateid, title: this.selData.title}});
      },
    }
  }
</script>
<style scoped lang="less"></style>

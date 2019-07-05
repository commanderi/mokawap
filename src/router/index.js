import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const page = name => () => import('@/pages/' + name)

export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      name: 'index',
      component: page('index/index'),
      meta: { keepAlive: false}
    },
    {
      path: '/specialOffer',
      name: 'specialOffer',
      component: page('index/specialOffer'),
      meta: { keepAlive: true}
    },
    {
      path: '/iframe',
      name: 'iframe',
      component: page('index/iframe'),
    },
    {
      path: '/specialOfferDetails',
      name: 'specialOfferDetails',
      component: page('index/specialOfferDetails')
    },
    // 转盘
    {
      path: '/turntable',
      name: 'turntable',
      component: page('index/turntable')
    },
    // 各彩种路由
    {
      path: '/PK10/BJPK10',
      name: 'BJPK10',
      component: page('shoping/PK10/BJPK10')
    },
    {
      path: '/LHC/XGLHC',
      name: 'XGLHC',
      component: page('shoping/LHC/XGLHC')
    },
    {
      path: '/K3/JSK3',
      name: 'JSK3',
      component: page('shoping/K3/JSK3')
    },
    {
      path: '/SSC/CQSSC',
      name: 'CQSSC',
      component: page('shoping/SSC/CQSSC')
    },
    {
      path: '/SSC/SSC',
      name: 'SSC',
      component: page('shoping/SSC/SSC')
    },
    // 各彩种路由结束
    // 购物车
    {
      path: '/BetBuyListPage',
      name: 'BetBuyListPage',
      component: page('shoping/BetBuyListPage')
    },
    {
      path: '/notice',
      name: 'notice',
      component: page('index/notice')
    },
    {
      path: '/topWinnerListPage',
      name: 'topWinnerListPage',
      component: page('index/topWinnerListPage')
    },
    // 购彩
    {
      path: '/shoping',
      name: 'shoping',
      component: page('shoping/shopingIndex'),
      meta: { keepAlive: false}
    },
    // 开奖
    {
      path: '/openLottery',
      name: 'openLottery',
      component: page('openLottery/openLotteryIndex'),
      meta: { keepAlive: false}
    },
    {
      path: '/openLotteryDetails',
      name: 'openLotteryDetails',
        component: page('openLottery/openLotteryDetails')
    },
    {
      path: '/playRule',
      name: 'playRule',
      component: page('openLottery/playRule')
    },
    // 个人中心
    {
      path: '/personal',
      name: 'personal',
      component: page('personal/personalIndex')
    },
    {
      path: '/collectList',
      name: 'collectList',
      component: page('personal/collectList')
    },
    {
      path: '/set',
      name: 'set',
      component: page('personal/set')
    },
    {
      path: '/personalInfo',
      name: 'personalInfo',
      component: page('personal/personalInfo')
    },
    {
      path: '/addBankCard',
      name: 'addBankCard',
      component: page('personal/addBankCard')
    },
    {
      path: '/rechargeManage',
      name: 'rechargeManage',
      component: page('personal/rechargeManage')
    },
    {
      path: '/rechargeList',
      name: 'rechargeList',
      component: page('personal/rechargeList')
    },
    {
      path: '/rechargeMoney',
      name: 'rechargeMoney',
      component: page('personal/rechargeMoney')
    },
    {
      path: '/walletPage',
      name: 'walletPage',
      component: page('personal/walletPage')
    },
    {
      path: '/transactionManage',
      name: 'transactionManage',
      component: page('personal/transactionManage')
    },
    {
      path: '/agentCommission',
      name: 'agentCommission',
      component: page('personal/agentCommission')
    },
    {
      path: '/personReport',
      name: 'personReport',
      component: page('personal/personReport')
    },
    {
      path: '/teamReport',
      name: 'teamReport',
      component: page('personal/teamReport')
    },
    {
      path: '/betRecordList',
      name: 'betRecordList',
      component: page('personal/betRecordList')
    },
    {
      path: '/betRecordDetails',
      name: 'betRecordDetails',
      component: page('personal/betRecordDetails')
    },
    {
      path: '/accountHistoryList',
      name: 'accountHistoryList',
      component: page('personal/accountHistoryList')
    },
    {
      path: '/gameRecord',
      name: 'gameRecord',
      component: page('personal/gameRecord')
    },
    {
      path: '/gameRecordList',
      name: 'gameRecordList',
      component: page('personal/gameRecordList')
    },
    {
      path: '/passwordManage',
      name: 'passwordManage',
      component: page('personal/passwordManage')
    },
    {
      path: '/restLogin',
      name: 'restLogin',
      component: page('personal/restLogin')
    },
    {
      path: '/changeTradePassword',
      name: 'changeTradePassword',
      component: page('personal/changeTradePassword')
    },
    {
      path: '/agentCenter',
      name: 'agentCenter',
      component: page('personal/agentCenter')
    },
    {
      path: '/addAgent',
      name: 'addAgent',
      component: page('personal/addAgent')
    },
    {
      path: '/updatePersonalInfo',
      name: 'updatePersonalInfo',
      component: page('personal/updatePersonalInfo')
    },
    {
      path: '/myMessage',
      name: 'myMessage',
      component: page('personal/myMessage')
    },
    {
      path: '/agentUser',
      name: 'agentUser',
      component: page('personal/agentUser'),
      meta: { keepAlive: false}
    },
    {
      path: '/feedbackManage',
      name: 'feedbackManage',
      component: page('personal/feedbackManage'),
      meta: { keepAlive: false}
    },
    {
      path: '/addFeedback',
      name: 'addFeedback',
      component: page('personal/addFeedback'),
      meta: { keepAlive: false}
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: page('personal/withdraw'),
      meta: { keepAlive: false}
    },
    {
      path: '/transferManage',
      name: 'transferManage',
      component: page('personal/transferManage'),
      meta: { keepAlive: false}
    },
    // 注册
    {
      path: '/register',
      name: 'register',
      component: page('register')
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: page('login')
    }
  ]
})

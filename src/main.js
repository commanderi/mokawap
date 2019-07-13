// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
// auto-font-size
import '../static/js/autoFontSize'
import '../static/css/main.less'
// muse-ui
import MuseUI from 'muse-ui'
import Message from 'muse-ui-message';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui-message/dist/muse-ui-message.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
Vue.use(MuseUI)
Vue.use(Loading)
Vue.use(Message)
Vue.use(Toast, {
  position: 'top-start',               // 弹出的位置
  time: 1500,                       // 显示的时长
  close: false,                      // 是否显示关闭按钮
  successIcon: '',      // 成功信息图标
  infoIcon: '',                 // 信息信息图标
  warningIcon: '',     // 提醒信息图标
  errorIcon: ''              // 错误信息图标
});
Vue.config.productionTip = false

// 复制功能
import clipboard from 'clipboard';
Vue.prototype.clipboard = clipboard;
// 全局切换页面
Vue.prototype.changePage = (path,query) => {
  switch (query.id) {
    case 3:case 4:case 5:case 9:case 11:case 23:case 24:case 25:case 26:case 32:case 33:
      let userdata = JSON.parse(localStorage.getItem('loginInfo'));
      clearInterval(this.time);
      if(userdata!=null){
        Jump(path,query);
      }else{
        Jump('login',query);
      }
    break;
    default:
      Jump(path,query);
    break;
  }
};
function Jump(path,query){
  setTimeout(() => {
    router.push({
      path: path,
      query: query
    });
  }, 100);
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  MuseUI,
  Message,
  Loading,
  Toast,
  components: { App },
  template: '<App/>'
})

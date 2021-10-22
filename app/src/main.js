import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueFormGenerator from "vue-form-generator";
import MessagePlugin from '@/utils/message'
import Multiselect from 'vue-multiselect'
import "vue-form-generator/dist/vfg.css";
import notivuecation from 'notivuecation'

Vue.config.productionTip = false;
Vue.use(VueFormGenerator);
Vue.use(MessagePlugin);
Vue.use(notivuecation);
Vue.component('multiselect', Multiselect);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");

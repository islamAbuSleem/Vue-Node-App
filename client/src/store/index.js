import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import dayOff from './modules/dayOff';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        dayOff
    }
});
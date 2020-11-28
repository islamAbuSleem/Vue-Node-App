import authService from "../../services/dayOffoperations";
// import router from '../../router';
const state = {
    dayOff: {},
    response: ''
}

const getters = {
    dayOff: (state) => state.dayOff,
    response: (state) => state.response
}

const actions = {
    send: ({ commit }, credentials) => {
      
        console.log(credentials)
        authService.registerDayOff(credentials).then(res => {
            commit('setResponse', res)
        })
        if (state.response == '') {
            credentials.failed = true;           
             credentials.success = false;

        } else {
            credentials.success = true;
            credentials.failed = true;           

        }
    }
}



const mutations = {
    setResponse: (state, response) => {
        state.response = response
    }


}

export default {
    state,
    actions,
    mutations,
    getters
}
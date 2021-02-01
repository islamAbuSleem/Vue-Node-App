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
    send: ({ rootState, commit }, credentials) => {

        authService.registerDayOff(credentials).then(res => {
            console.log(res)
            if (rootState.user.userInfo.role == "Manager") {
                if (res.data.offType == rootState.user.items[0]) {
                    rootState.user.userInfo.normal = +rootState.user.userInfo.normal - +res.data.period;
                } else if (res.data.offType == rootState.user.items[1]) {
                    rootState.user.userInfo.urgent = +rootState.user.userInfo.urgent - +res.data.period;
                } else if (res.data.offType == rootState.user.items[2]) {
                    rootState.user.userInfo.quarterDay = 0;
                }
                authService.updateDayOffCount(rootState.user.userInfo.userId, rootState.user.userInfo)
            }

            commit('setResponse', res)
        })
        if (state.response == '') {
            credentials.failed = true;
            credentials.success = false;

        } else {
            credentials.success = true;
            credentials.failed = true;

        }
    },
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
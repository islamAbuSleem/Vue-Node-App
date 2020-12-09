import authService from "../../services/AuthenticationService";
import EzenService from "../../services/ezenOperations";

import router from '../../router';
const state = {
    token: window.localStorage.getItem("login_token"),
    userInfo: JSON.parse(window.localStorage.getItem("userInfo")),
    items: ["اعتيادي", "عارضه", "يوم اداي", "IOD", "نصف يوم"],

}

const getters = {
    isLoggedIn: (state) => !!state.token,
    userInfo: (state) => state.userInfo,
    items: (state) => state.items
}

const actions = {
    login: ({ commit }, credentials) => {

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(credentials.email).toLowerCase())) {
            authService.login(credentials).then((res) => {
                commit('setUserInfo', res.data[0])
                commit('setToken', res.data[0]._id)

                window.localStorage.setItem("userInfo", JSON.stringify(res.data[0]))

                if (
                    credentials.email == res.data[0].email &&
                    credentials.password == res.data[0].password
                ) {
                    credentials.feedback = "";
                    credentials.check = false;

                    router.push({ name: 'user', params: { name: state.userInfo.name } });
                } else {
                    credentials.feedback = "Failed attempt, E-mail or Password is wrong";
                    credentials.check = true;
                }
            });
        } else {
            credentials.feedback = "Please enter a valid E-mail";
            credentials.check = true;
        }
        commit('setToken', state.userInfo._id);
    },
    logout: ({ commit }) => {
        commit('setToken', null);
        window.localStorage.removeItem("login_token");
        commit('userInfo', null);
        window.localStorage.removeItem("userInfo");
        router.push({ name: 'login' });
    },
    postEzen: ({ commit }, credentials) => {
        EzenService.registerEzen(credentials).then(res => {
            commit('setResponse', res)
        })
    },
    // // eslint-disable-next-line no-unused-vars
    // upateCount: ({ commit }, dayoff) => {
    //     updateOffCount.updateDayOffCount(state.userInfo.userId, state.userInfo).then(res => {
    //         commit('setUserInfo', res.data)

    //         console.log(res.data)

    //     })
    // }

}



const mutations = {
    setToken: (state, token) => {
        state.token = token;
        window.localStorage.setItem("login_token", token)
    },
    setUserInfo: (state, userInfo) => {
        state.userInfo = userInfo
        window.localStorage.setItem("userInfo", JSON.stringify(userInfo))
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
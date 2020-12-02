import authService from "../../services/AuthenticationService";
import router from '../../router';
const state = {
    token: window.localStorage.getItem("login_token"),
    userInfo: JSON.parse(window.localStorage.getItem("userInfo"))
}

const getters = {
    isLoggedIn: (state) => !!state.token,
    userInfo: (state) => state.userInfo
}

const actions = {
    login: ({ commit }, credentials) => {

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(credentials.email).toLowerCase())) {
            authService.login(credentials).then((res) => {
                commit('setUserInfo', res.data[0])
                window.localStorage.setItem("login_token", res.data[0]._id)
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
    },
    logout: ({ commit }) => {
        commit('setToken', null);
        window.localStorage.removeItem("login_token");
        commit('userInfo', null);
        window.localStorage.removeItem("userInfo");
        router.push({ name: 'login' });
    }

}



const mutations = {
    setToken: (state, token) => {
        state.token = token;
    },
    setUserInfo: (state, userInfo) => {
        state.userInfo = userInfo
    }

}

export default {
    state,
    actions,
    mutations,
    getters
}
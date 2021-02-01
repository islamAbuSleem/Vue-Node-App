import Api from '@/services/Api';

export default {
    register(credentials) {
        return Api().post('/api/user', credentials);
    },
    login(credentials) {
        return Api().post(`/api/user/login`, credentials)
    },
    updateUserInfo(userId) {
        return Api().get(`/api/user/userId/${userId}`)
    }
}
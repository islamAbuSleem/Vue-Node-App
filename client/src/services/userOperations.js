import Api from '@/services/Api';
export default {
    getAllUsers() {
        return Api().get('/api/user');
    },
    getUser(userId) {
        return Api().get(`/api/user/userId/${userId}`);
    },
}
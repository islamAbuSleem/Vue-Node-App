import Api from '@/services/Api';
export default {
    registerEzen(credentials) {
        return Api().post('/api/ezen', credentials);
    },
    getEzenForUser(id) {
        return Api().get(`/api/ezen/userId/${id}`);
    },
}
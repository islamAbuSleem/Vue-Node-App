import Api from '@/services/Api';
export default {
    registerEzen(credentials) {
        return Api().post('/api/ezen', credentials);
    },
}
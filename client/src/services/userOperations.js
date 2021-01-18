import Api from '@/services/Api';
export default {
    getAllUsers() {
        return Api().get('/api/user');
    }
}
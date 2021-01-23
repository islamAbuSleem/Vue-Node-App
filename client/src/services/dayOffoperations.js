import Api from '@/services/Api';
export default {
    registerDayOff(credentials) {
        return Api().post('/api/dayOff', credentials);
    },
    updateDayOffCount(id, count) {
        return Api().put(`/api/user/userId/${id}`, count);
    },
    getDayOffForInitalApprove(team) {
        return Api().get(`/api/dayOff/team/${team}`);
    },
    getDayOffForApprove(dept) {
        return Api().get(`/api/dayOff/dept/${dept}`);
    },
    updateDayOffStatus(id, data) {
        return Api().put(`/api/dayOff/${id}`, data);
    },
    getDayOfForUser(id) {
        return Api().get(`/api/dayOff/userId/${id}`);
    },
    getAllDayOff() {
        return Api().get(`/api/dayOff`);
    },
}
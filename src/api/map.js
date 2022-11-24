import api from './http.js';

async function getInter(user, success, fail) {
  await api.get(`/map/inter/${user.userId}`).then(success).catch(fail);
}

async function appendInt(body, success, fail) {
  await api.put(`/map/inter/`, body).then(success).catch(fail);
}

async function deleteInt(body, success, fail) {
  await api.delete(`/map/inter/${body.userId}/${body.aptCode}`).then(success).catch(fail);
}

export {getInter, appendInt, deleteInt};
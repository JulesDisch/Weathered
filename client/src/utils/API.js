import axios from "axios";
export default {
 
  getUsers: function () {
    return axios.get("/api/users");
  },
 
  getUser: function (id) {
    return axios.get("/api/users/" + id);
  },
 
  deleteUser: function (id) {
    return axios.delete("/api/users/" + id);
  },
  
  saveUser: function (userData) {
    return axios.post("/api/users", userData);
  },
  checkUser: function (userData) {
    return axios.get("/api/signin", userData);
  },

  
  logIn: function (userData) {
    return axios.post('/api/users/signin', userData)
  },
  savePreference: function (preferenceData) {
    return axios.post("/api/preferences", preferenceData);
  },

  getPreferences: function () {
    return axios.get("/api/preferences");
  },
  
  getPreference: function (id) {
    return axios.get("/api/preferences" + id);
  },
 
  deletePreferences: function (id) {
    return axios.delete("/api/preferences" + id);
  },
  
  
};





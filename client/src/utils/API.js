import axios from "axios";
export default {
  // Gets all books
  getBooks: function () {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  },

  getUsers: function () {
    return axios.get("/api/users");
  },
  // Gets the book with the given id
  getUser: function (id) {
    return axios.get("/api/users/" + id);
  },
  // Deletes the book with the given id
  deleteUser: function (id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a book to the database
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
  // Gets the book with the given id
  getPreference: function (id) {
    return axios.get("/api/preferences" + id);
  },
  // Deletes the book with the given id
  deletePreferences: function (id) {
    return axios.delete("/api/preferences" + id);
  },
  // Saves a book to the database
  
};





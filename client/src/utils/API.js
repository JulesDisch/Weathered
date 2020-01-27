import axios from "axios";
import { Link } from "react-router-dom";
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
  }

};
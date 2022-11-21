import axios from "axios";

// axios 객체 생성
export default axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:80/",
  headers: {
    "Content-Type": "application/json",
=======
  baseURL: "http://localhost/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
>>>>>>> b7c60d922ab768a66697752b5a211fbd880d7e41
  },
});

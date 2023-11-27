import { CanceledError } from "axios";
import axios from "axios";
export default axios.create({
  // baseURL:"https://atl-webpage-mu3u.vercel.app/api",
  baseURL: "http://localhost:3000/api"
});
export {CanceledError}  
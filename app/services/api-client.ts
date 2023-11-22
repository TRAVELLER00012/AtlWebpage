import { CanceledError } from "axios";
import axios from "axios";

export default axios.create({
    baseURL:"https://atl-webpage-mu3u.vercel.app/api",

})
export {CanceledError}
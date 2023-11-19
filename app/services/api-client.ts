import { CanceledError } from "axios";
import axios from "axios";

export default axios.create({
    baseURL:"http://localhost:3000/api"

})
export {CanceledError}
import  express  from "express";
import {getDataFromDb} from '../controllers/controller.js'
const routes = express.Router();
routes.get("/getData",getDataFromDb)
export default routes;
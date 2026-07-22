import express from "express";
import { sendContactMail } from "../Controllers/ContectController.js";

const ContactRouter = express.Router();

ContactRouter.post("/", sendContactMail);

export default ContactRouter;
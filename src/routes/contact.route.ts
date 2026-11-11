import express from "express";
import ContactHandler from "../handlers/contact.handler.js";

const contactRouter = express.Router();
contactRouter.get('/contacts', ContactHandler.getContactList);
contactRouter.post('/contacts/create', ContactHandler.create);
contactRouter.put('/contacts/update/:id', ContactHandler.update);
contactRouter.delete('/contacts/:id', ContactHandler.delete);

export default contactRouter;

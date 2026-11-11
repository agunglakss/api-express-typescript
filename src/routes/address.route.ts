import express from "express";
import AddressHandler from "../handlers/address.handler.js";

const addressRouter = express.Router();
addressRouter.get('/addresses', AddressHandler.getAdrressList);
addressRouter.post('/addresses/create', AddressHandler.create);
addressRouter.put('/addresses/update/:id', AddressHandler.update);
addressRouter.delete('/addresses/:id', AddressHandler.delete);

export default addressRouter;

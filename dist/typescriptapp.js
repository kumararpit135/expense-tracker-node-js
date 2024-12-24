"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//const todosRoutes=require('./typeRouter/todos')
const todos_1 = __importDefault(require("./typeRouter/todos"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(todos_1.default);
app.use('/', (req, res) => {
    console.log('hfdkjhfjk');
    res.send('fsdfhdsk');
});
app.listen(3000);

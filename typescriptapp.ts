import express from 'express';
//const todosRoutes=require('./typeRouter/todos')
import todosRoute from './typeRouter/todos';

import bodyParser from 'body-parser';

const app=express();

app.use(bodyParser.json())
app.use(todosRoute)
app.listen(3000);
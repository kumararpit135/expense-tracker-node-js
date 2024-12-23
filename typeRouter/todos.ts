import {Router} from 'express';
import {Todo} from '../typeModel/todo';
const router=Router();
const todos : Todo[] = []
router.get('/',(req,res,next)=>{
    res.json({todos : todos})
})
router.post('/todo',(req,res,next)=>{
    const newTodo:Todo={
        id:new Date().toISOString(),
        text:req.body.text
    }
    todos.push(newTodo)
})
export default router
import {Router} from 'express';
import {Todo} from '../typeModel/todo';
const router=Router();
const todos : Todo[] = [];
type RequestBody= {text:string}
router.get('/',(req,res,next)=>{
    res.json({todos : todos})
})
router.post('/todo',(req,res,next)=>{
    const body =req.body as RequestBody;
    const newTodo:Todo={
        id:new Date().toISOString(),
        text:req.body.text
    }
    todos.push(newTodo)
    res.status(200).json({message:"done here "})
});
router.put('/todo/:todoId',(req,res,next)=>{
    const tid =req.params.todoId;
    const todoIndex=todos.findIndex((todoItem)=>todoItem.id===tid);
    if(todoIndex>=0){
        todos[todoIndex]={id:todos[todoIndex].id,text:req.body.text};
        res.status(200).json({message:"done here put rerq"})
    }
    res.status(440).json({message:'not done pur req'})
})
router.delete('/todo/:todoId',(req,res,next)=>{
    
    let filter = todos.findIndex((todoItem)=>todoItem.id !==req.params.todoId)
    res.status(200).json("done hrere delete ")
})
export default router
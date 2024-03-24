const {Router} = require("express")
const router = Router();
const ToDoList = require("../modle/todolist")

router.get("/todolist", async (req, res) => {
    try {
        const todos = await ToDoList.find();
        res.status(200).json(todos); 
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.post("/todolist", async(req,res)=>{
    try{
        const { content } = req.body;
        const ToDo = await ToDoList.create({
            content,
        })
         return res.status(200).json(ToDo);

    }catch(error){
        console.log(error,"error");
        return res.status(500).json({error:"Internal Server Error"})
    }
})

router.delete("/delete/:id", async(req,res)=>{
    // console.log(req.params.id)
    try{
        const List = await ToDoList.findByIdAndDelete( req.params.id);
        // console.log(List)
        if(!List){
            return res.status(404).json({error:"To do list not found"})
        }
       return res.status(200).end(); 
    }catch(error){
        console.log("Error", error);
        return res.status(500).json({error:"Internal Server Error"})
    }
})

module.exports = router;
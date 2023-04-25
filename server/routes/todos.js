import {Router} from "express";
import TodoModel from "../models/TodoModel.js";

const router = new Router()


//create
router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const todo = await TodoModel.create({
            text: req.body.text,
            status: req.body.status
        })

        res.status(200).json({
            message: "Todo created successfully",
            todo
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Can't create todo"
        })
    }
})

router.get('/', async (req, res) => {
    try {
        const todos = await TodoModel.find().sort({createdAt: -1})
        res.status(200).json({
            message: "Todos got successfully",
            todos
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Can't get todos"
        })
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id

        const todo = await TodoModel.findOneAndUpdate({_id: id}, {status: req.body.status})

        res.status(200).json({
            message: `Todo ${id} updated`,
            todo
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Can't update todo"
        })
    }
})

export default router
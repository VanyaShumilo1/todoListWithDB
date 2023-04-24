import express from 'express'
import mongoose from "mongoose";
import cors from 'cors'
import todoRoutes from './routes/todos.js'

const PORT = 5000
const DB_URL = 'mongodb+srv://root:root@cluster0.4avgwky.mongodb.net/tasks?retryWrites=true&w=majority'


const app = express()

app.use(express.json())
app.use(cors())

app.use('/todo', todoRoutes)

const start = async () => {
    try {
        await mongoose.connect(DB_URL).then( () => console.log("\nDB Connected"))
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

await start()



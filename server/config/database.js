const mongoose = require('mongoose')
const BASE_URL = "mongodb://localhost:27017/demo_blogpost_project"

mongoose.connect(BASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', ()=>{
    console.log('Database is connected')
})
const app=require('./app')
const port=process.env.port || 22222
app.listen(port,()=>{
    console.log('Express serve listening on port '+port)
})

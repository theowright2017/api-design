import app from './server'
import config from './config'
import * as dotenv from 'dotenv'
dotenv.config()

app.listen(config.port, () => {
    console.log(` hello from ${config.port}`)
})
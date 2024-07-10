import app from './server'
import * as dotenv from 'dotenv'
dotenv.config()

app.listen(3005, () => {
    console.log(' hello from 3005')
})
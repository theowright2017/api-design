import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'
import { createNewUser, signIn } from './handlers/user'

 const app = express()

/* ---  extract to Middleware file? --- */

app.use(cors())

/**
 * global mount for all calls
 * (morgan logs all calls)
 */
app.use(morgan('dev'))

/**
 *  middleware
 *      - allows client to send us json
 */
app.use(express.json())

/**
 *  allows url decoding
 */
app.use(express.urlencoded({extended: true}))

/**
 * More middleware
 */
app.use((req, res, next) => {
    // res.status(400)
    // res.send('Nope')
    
    next()
})

/* ---  end of Middleware --- */


app.get('/', (req, res) => {
    console.log('hello express')
    res.status(200)
    res.json({message: 'hello from inner get /'})
})

/**
 * mount to methods in ./router
 *  /api becomes prefix for all router methods
 */
app.use('/api', protect,  router)


app.post('/user', createNewUser)
app.post('/signin', signIn)

export default app
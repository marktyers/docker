
import { Router } from 'https://deno.land/x/oak@v16.1.0/mod.ts'

const router = new Router()

// the routes defined here
router.get('/', async context => {
	context.response.body = 'Hello, world'
})

router.post('/books', async context => {
	console.log("================================================\nPOST /books")
    console.log(context )
	// const body  = await context.request.body()
	// const data = await body.value
	// console.log(data)

	context.response.status = 201
	context.response.body = JSON.stringify({ status: 'success', msg: 'account created' })
})

export default router


/* post.js */

import { Application, Router, Status, type Context, type Request, type Body } from 'https://deno.land/x/oak/mod.ts'
import { oakCors } from 'https://deno.land/x/cors/mod.ts'
import { Client, type ClientConfig, type ExecuteResult } from 'https://deno.land/x/mysql/mod.ts'

type Quote = {
    author: string
    quote: string
}

const config: ClientConfig = {
    hostname: 'mysqldb',
    port: 3306,
    username: 'websiteuser',
    password: 'Tg9rJv4bDf',
    db: 'website'
}

const client = await new Client().connect(config)

const port = 1993

const app = new Application()
const router = new Router()

router.get('/quotes', async (context: Context) => {
    console.log('GET /quotes')
    const sql = 'SELECT author, quote FROM quotes'
    try {
        const result:ExecuteResult = await client.execute(sql)
        const rows: Quote[] = result.rows
        context.response.status = 200
        context.response.body = JSON.stringify(rows, null, 2)
    } catch(error) {
        console.log(error)
        context.response.status = 400
        context.response.body = JSON.stringify({error: 'database error'}, null, 2)
    }
})

router.post('/quotes', async (context: Context) => {
	console.log('POST /quotes')
	const data: Quote  = await context.request.body.json()
    const sql = `INSERT INTO quotes(author, quote) VALUES("${data.author}", "${data.quote}")`
    // console.log(sql)
    try {
        const result:ExecuteResult = await client.execute(sql)
        console.log('RESULT', result)
        const response = {
            status: 'success',
            msg: 'quote added',
            data: data
        }
        context.response.status = 201
        context.response.body = JSON.stringify(response, null, 2)
    } catch(error) {
        console.log('ERROR')
        console.log(error)
        context.response.status = 400
        context.response.body = JSON.stringify({error: 'database error'}, null, 2)
    }
})

app.use(oakCors())
app.use(router.routes())
app.use(router.allowedMethods())

app.addEventListener('listen', ({ port }) => {
	console.log(`listening on port: ${port}`)
})

await app.listen({ port })

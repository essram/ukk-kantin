import express from 'express'
import cors from 'cors'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import path from 'path'

import MenuRoute from './routers/menuRoute'
import UserRoute from './routers/userRoute'
import OrderRoute from './routers/orderRoute'
import ReportRoute from './routers/reportRoute'
import MethodRoute from './routers/methodRoute'
import PayOrderRoute from './routers/orderPayRoute'
import CategoryRoute from './routers/categoryRoute'
import StatistikRoute from './routers/statistikRoute'
import StanRoute from './routers/stanRoute'
import DiskonRoute from './routers/diskonRoute'


import { PORT } from './global'

const app = express()
app.use(cors())
app.use(express.json())

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Ordering System API',
            version: '1.0.0',
            description: 'API documentation for the ordering system',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: { // Nama skema keamanan
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Format token
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./src/routers/*.ts'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(`/menu`, MenuRoute)
app.use(`/user`, UserRoute)
app.use(`/order`, OrderRoute)
app.use(`/report`, ReportRoute)
app.use(`/pay-method`, MethodRoute)
app.use(`/pay-order`, PayOrderRoute)
app.use(`/category`, CategoryRoute)
app.use(`/statistik`, StatistikRoute)
app.use(`/stan`, StanRoute)
app.use(`/diskon`, DiskonRoute)


// Set public folder as static
app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`)
})
import express from 'express';

const app = express();

import indexRoutes from './routes/index';

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.use(indexRoutes)

app.listen(4000, () => {
    console.log('Server on port', 4000)
})


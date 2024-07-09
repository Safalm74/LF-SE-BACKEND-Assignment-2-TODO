import config from './config';
import express from 'express';
import indexRouter from './routes/'

const app = express();

app.use(express.json());

app.use(indexRouter);

//server port
const serverPort=config.port?config.port:8000
app.listen(
    serverPort,
    ()=>{
        console.log(`Listening in port ${serverPort} `)
    }
);

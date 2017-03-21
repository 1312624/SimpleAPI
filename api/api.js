import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import route from './routes';
import config from './config';

const app = express();

app.use( require('./middlewares/cors') );

const procEnv = process.env.NODE_ENV;

if (procEnv === 'development') {
    //show log with morgan or something...
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use('/api', route);

const dbConnection = (process.env.remote || process.argv.indexOf('remote') !== -1) ? config.DBConnection.remote : config.DBConnection.local;
mongoose.Promise = global.Promise;

mongoose.connect(dbConnection)
    .then(() => {
        console.log(`\n✅ Database connected to ${dbConnection}`);
        app.listen(config.API_PORT, () => {
            console.log(`\n✅ API is running on http://${config.API_HOST}:${config.API_PORT}\n`);
        });
    })
    .catch(err => console.log(err));

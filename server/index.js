const express= require('express');
const router = require('./src/utils/api');

const app=express();

app.use(express());
app.use(express.json());
app.use('/api',router);
const PORT=8000;
app.listen(PORT,()=>console.log(`listening on port ${PORT}`));

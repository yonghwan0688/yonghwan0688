import express from 'express';
import bodyParser from 'body-parser';
import { schedulerRoutes } from './routes/schedulerRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api/scheduler', schedulerRoutes());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
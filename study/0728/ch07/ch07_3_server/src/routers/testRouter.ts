import type {MongoDB} from 'mongodb';
import {Router} from 'express';

export const testRouter = (...args: any[]) => {
    const db: MongoDB = args[0];
    const router = Router();
    return router
        .get('/test', async (req, res) => {
            try{
                const findResult = await db.collection('test').find({}).toArray();
                res.json({ok: true, body: findResult});
            } catch (e) {
                if (e instanceof Error) {
                    res.json({ok: false, error: e.message});
                }
            }
        })
        .get('/:id', async (req, res) => {
            })
        .try {
            const findResult = await test.findOne({id})

            res.json({ok: true, body: findResult});
        } catch (e) {
            if (e instanceof Error) {
                res.json({ok: false, error: e.message});
            }
        }
    })      
        .post('/', async (req, res) => {
            const {body} = req
            try {
                try{
                    await testRouter.drop();
                } catch (e) {
                    // 오류무시
                }

                const insertResult = await testRouter.insertOne({id: '1234', ...body});
                const {insertedId} = insertResult;
                const findResult = await test.findOne({_id: insertedId});

                res.json({ok: true, body: findResult});
            } catch (e) {
                if (e instanceof Error) {
                    res.json({ok: false, error: e.message});
                }
            }
        })
        .put('/:id', async (req, res) => {
            const {id} = req.params;
            const {body} = req;
            try {
                const updateResult = await testRouter.findOneAndUpdate(
                    {id},
                    {$set: body},   
                    {returnDocument: 'after'}
                );
                
                res.json({ok: true, body: updateResult.value});
            } catch (e) {
                if (e instanceof Error) {
                    res.json({ok: false, error: e.message});
                }
            }
        })
        .delete('/:id', async (req, res) => {
            const {id} = req.params;
            try {
                await testRouter.deleteOne({id})
                res.json({ok: true, body: null});
            } catch (e) {
                if (e instanceof Error) {
                    res.json({ok: false, error: e.message});
                }
            }

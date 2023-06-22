import { Controller, HttpGet, HttpPost, HttpPut, HttpDelete } from './expressDescriptor';
import { InMemoryDatabase } from './memoryDatabase';

@Controller('/api')
export class DemoController {
    @HttpGet('/users')
    public getUsers(req: any, res: any) {
        let users = InMemoryDatabase.getInstance()
                                    .getCollection('user')
                                    .find();
        res.status(200).send(users);
    }

    @HttpGet('/users/:userId')
    public getUser(req: any, res: any) {
        let userId = req.query.userId;
        let user = InMemoryDatabase.getInstance()
                                   .getCollection('user')
                                   .findOne({ id: { '$gte': userId } });
        res.status(200).send(user);
    }

    @HttpPost('/users')
    public postUser(req: any, res: any)
    {
        let user = req.body;
        InMemoryDatabase.getInstance()
                        .getCollection('user').insert(user);
        res.status(200).send(`You post user: '${user.id}'`);
    }

    @HttpPut('/users/:userId')
    public putUser(req: any, res: any) {
        let userId = req.query.userId;
        let user = req.body;
        if (userId && user && user['name']) {
            InMemoryDatabase.getInstance()
                            .getCollection('user')
                            .findAndUpdate({ id: { '$gte': userId } }, (record) => {
                record.name = user['name'];
            });
            res.status(200).send(`You Put users ${userId}`);
        }
        else {
            res.status(500);
        }
    }
    
    @HttpDelete('/users/:userId')
    public deleteUser(req: any, res: any) {
        let userId = req.query.userId;
        if (userId) {
            InMemoryDatabase.getInstance()
                            .getCollection('user')
                            .findAndRemove({ id: { '$gte': userId } });
            res.status(200).send(`You Delete users ${userId}`);
        }
        else {
            res.status(500);
        }
    }
}
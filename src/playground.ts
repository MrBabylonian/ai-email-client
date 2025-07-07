import { db } from './server/db';

await db.user.create({
    data: {
        emailAddress: 'test2@gmail.com',
        firstName: 'Testuser1',
        lastName: 'TestUser1',
    },
});

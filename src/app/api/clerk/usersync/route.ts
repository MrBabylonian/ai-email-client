import { db } from '@/server/db';
import { error } from 'console';

export const POST = async (req: Request) => {
    try {
        const { data } = await req.json();
        console.log(`Webhook received ${data}`);

        const emailAddress = data.email_addresses[0].email_address;
        const firstName = data.first_name;
        const lastName = data.last_name;
        const imageUrl = data.image_url;
        const id = data.id;

        await db.user.create({
            data: {
                id: id,
                emailAddress: emailAddress,
                firstName: firstName,
                lastName: lastName,
                imageUrl: imageUrl,
            },
        });

        console.log(`User synced to database`);

        return new Response('Webhook received', { status: 201 });
    } catch (error) {
        console.error(`Webhook error ${error}`);
        return new Response('Webhook error', { status: 400 });
    }
};

import { exchangeCodeForAccessToken, getAccountDetails } from '@/lib/aurinko';
import { db } from '@/server/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse, type NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 },
            );
        }
        console.info('Aser authenticated');
        const params = req.nextUrl.searchParams; // Get the query params
        const status = params.get('status'); // Get the status
        if (status !== 'success') {
            return NextResponse.json(
                { message: 'Failed to link account' },
                { status: 400 },
            );
        }
        // Get the code to exchange for an auth token
        const code = params.get('code');
        if (!code) {
            return NextResponse.json(
                { message: 'No code provided' },
                { status: 400 },
            );
        }
        console.info('Code received successfully');

        const token = await exchangeCodeForAccessToken(code);

        if (!token) {
            return NextResponse.json(
                { message: 'Failed to exchange code for access token' },
                { status: 500 },
            );
        }

        const accountDetails = await getAccountDetails(token.accessToken);

        if (!accountDetails) {
            return NextResponse.json(
                { message: 'Failed to fetch account details' },
                { status: 500 },
            );
        }
        console.info('Account details received successfully');
        await db.account.upsert({
            where: {
                id: token.accountId.toString(),
            },
            update: {
                accessToken: token.accessToken.toString(),
                name: accountDetails.name,
            },
            create: {
                id: token.accountId.toString(),
                userId: userId,
                accessToken: token.accessToken.toString(),
                emailAddress: accountDetails.email,
                name: accountDetails.name,
            },
        });

        console.log('Database updated');

        return NextResponse.redirect(new URL('/mail', req.url));
    } catch (e) {
        console.error(e);
    }
};

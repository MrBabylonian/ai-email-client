import { Account } from '@/lib/email-account';
import { db } from '@/server/db';
import { NextResponse, type NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
    const { accountId, userId } = await req.json();

    if (!accountId || !userId) {
        return NextResponse.json(
            { message: 'Missing Account or User ID' },
            { status: 400 },
        );
    }

    // Find the existing Email account in the database
    const dbAccount = await db.account.findUnique({
        where: {
            id: accountId,
            userId,
        },
    });

    if (!dbAccount) {
        return NextResponse.json(
            { message: 'Account not found' },
            { status: 404 },
        );
    }

    const account = new Account(dbAccount.accessToken);
    const response = await account.performInitialSync();
    if (!response) {
        return NextResponse.json({
            error: 'Initial sync failed',
            status: 500,
        });
    }

    const { emails, deltaToken } = response;
    console.log('emails', emails);

    // Update the account with the new delta token
    // await db.account.update({
    //     where: {
    //         id: accountId,
    //     },
    //     data: {
    //         nextDeltaToken: deltaToken,
    //     },
    // });

    // await syncEmailsToDatabase(emails);

    return NextResponse.json({
        message: 'Sync sync completed successfully',
        status: 200,
    });
};

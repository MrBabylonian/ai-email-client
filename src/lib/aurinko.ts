'use server';

import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/dist/server/web/spec-extension/response';

const getAurinkoAuthUrl = async (serviceType: 'Google' | 'Office365') => {
    try {
        const { userId } = await auth();
        if (!userId) {
            const params = new URLSearchParams({
                clientId: process.env.AURINKO_CLIENT_ID!,
                serviceType,
                scopes: 'Mail.Read Mail.ReadWrite Mail.Send Mail.Drafts Mail.All',
                responseType: 'code',
                returnUrl: `${process.env.NEXT_PUBLIC_URL}/api/aurinko/callback`,
            });
            return `https://api.aurinko.io/v1/auth/authorize?${params.toString()}`;
        }
    } catch (e) {
        console.error('Failed to generate Aurionko Auth URL', e);
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return new NextResponse(`Failed to generate Aurionko Auth URL ${e}`, { status: 401 });
    }
};

export default getAurinkoAuthUrl;

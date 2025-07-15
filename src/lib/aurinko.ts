'use server';

import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/dist/server/web/spec-extension/response';
import axios from 'axios';

export const getAurinkoAuthUrl = async (
    serviceType: 'Google' | 'Office365',
) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        // Construct the query string
        const params = new URLSearchParams({
            clientId: process.env.AURINKO_CLIENT_ID!,
            serviceType,
            scope: 'Mail.Read Mail.ReadWrite Mail.Send Mail.Drafts Mail.All',
            responseType: 'code',
            returnUrl: `${process.env.NEXT_PUBLIC_URL}/api/aurinko/callback`,
        });

        return `https://api.aurinko.io/v1/auth/authorize?${params.toString()}`;
    } catch (e) {
        console.error('Failed to generate Aurionko Auth URL', e);
        return new NextResponse(`Failed to generate Aurionko Auth URL ${e}`, {
            status: 401,
        });
    }
};

export const exchangeCodeForAccessToken = async (code: string) => {
    try {
        const response = await axios.post(
            `https://api.aurinko.io/v1/auth/token/${code}`,
            {}, // Second object represents the body but we don't need one for this request
            {
                auth: {
                    username: process.env.AURINKO_CLIENT_ID!,
                    password: process.env.AURINKO_CLIENT_SECRET!,
                },
            },
        );
        return response.data as {
            accountId: number;
            accessToken: string;
            userId: string;
            userSession: string;
        };
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.error(e.response?.data);
        }
        console.error(e);
    }
};

export const getAccountDetails = async (accesToken: string) => {
    try {
        const response = await axios.get('https://api.aurinko.io/v1/account', {
            headers: {
                Authorization: `Bearer ${accesToken}`,
            },
        });
        return response.data as {
            email: string;
            name: string;
        };
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.error('Error fetching account details', e.response?.data);
        } else {
            console.error('Unexpected error fetching account details', e);
        }
        throw e;
    }
};

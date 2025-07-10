'use client';

import { Button } from './button';
import { getAurinkoAuthUrl } from '@/lib/aurinko';
const LinkAccountButton = () => {
    return (
        <Button
            onClick={async () => {
                const authUrl = await getAurinkoAuthUrl('Google');
                if (typeof authUrl === 'string' && authUrl) {
                    window.location.href = authUrl;
                }
            }}
        >
            Link Account
        </Button>
    );
};

export default LinkAccountButton;

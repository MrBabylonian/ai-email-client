import LinkAccountButton from '@/components/ui/link-account-button';
import { SignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import { Fragment } from 'react';

export default function Home() {
    return (
        <Fragment>
            <SignedOut>
                <div className="flex min-h-screen items-center justify-center">
                    <SignIn />
                </div>
            </SignedOut>

            <SignedIn>
                <div className="container mx-auto p-8">
                    <h1 className="mb-8 text-2xl font-bold">
                        Welcome to AI Email Client
                    </h1>
                    <LinkAccountButton />
                </div>
            </SignedIn>
        </Fragment>
    );
}

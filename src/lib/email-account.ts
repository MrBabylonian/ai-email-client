import axios from 'axios';
import { type SyncUpdatedResponse, type SyncResponse, type EmailMessage } from './types';

export class Account {
    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    // Initiates the Aurinko email sync process. Returns a sync token and readiness status.
    private async startSync() {
        const response = await axios.post<SyncResponse>(
            'https://api.aurinko.io/v1/email/sync',
            {},
            {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
                params: {
                    daysWithin: 2, // Only sync emails from the last 2 days
                    bodyType: 'html', // Request HTML email bodies
                },
            },
        );
        // Response contains syncUpdatedToken and ready flag
        return response.data;
    }

    // Fetches updated emails from Aurinko using deltaToken and optional pageToken for pagination.
    async getUpdatedEmails({
        deltaToken,
        pageToken,
    }: {
        deltaToken?: string;
        pageToken?: string;
    }) {
        // eslint-disable-next-line prefer-const
        let params: Record<string, string> = {};
        if (deltaToken) params.deltaToken = deltaToken;
        if (pageToken) params.pageToken = pageToken;

        const response = await axios.get<SyncUpdatedResponse>(
            `https://api.aurinko.io/v1/email/sync/updated`,
            {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
                params,
            },
        );
        // Response contains nextPageToken, nextDeltaToken, and email records
        return response.data;
    }

    async performInitialSync() {
        try {
            // Starts sync and polls until Aurinko marks sync as ready
            let syncResponse = await this.startSync();
            while (!syncResponse.ready) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                syncResponse = await this.startSync();
            }

            // Use syncUpdatedToken to fetch all updated emails
            let storedDeltaToken: string = syncResponse.syncUpdatedToken;

            // Fetch first page of updated emails
            let updatedResponse = await this.getUpdatedEmails({
                deltaToken: storedDeltaToken,
            });
            if (updatedResponse.nextDeltaToken) {
                // Update deltaToken if sync is complete
                storedDeltaToken = updatedResponse.nextDeltaToken;
            }
            let allEmails: EmailMessage[] = updatedResponse.records;

            // Continue fetching emails if there are more pages
            while (updatedResponse.nextPageToken) {
                updatedResponse = await this.getUpdatedEmails(
                    {pageToken: updatedResponse.nextPageToken}
                );
                allEmails= allEmails.concat(updatedResponse.records);
                if (updatedResponse.nextDeltaToken) {
                    // Update deltaToken if sync is complete
                    storedDeltaToken = updatedResponse.nextDeltaToken;
                }
            }

            // Log total emails fetched after initial sync
            console.log("Initial sync completed. Total emails fetched:", allEmails.length);

            return {
                emails: allEmails,
                deltaToken: storedDeltaToken,
            };
        } catch (e) {
            if (axios.isAxiosError(e)) {
                // Log Aurinko API error details
                console.error('Error during email sync:', JSON.stringify(e.response?.data, null , 2));
            } else {
                console.error('Error during email sync:', e);
            }
        }
    }
}

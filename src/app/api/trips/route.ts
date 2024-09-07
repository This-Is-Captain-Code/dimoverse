import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { DIMO } from '@dimo-network/dimo-node-sdk';

// Replace these with secure methods for handling your tokens
const dimo = new DIMO('Production');
const accessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjMzMjU3ZDFiZjliZTdlNTg4ZDM1OTI3MzhhMmFhOTY5ODU3NWM4OTEifQ.eyJpc3MiOiJodHRwczovL2F1dGguZGltby56b25lIiwicHJvdmlkZXJfaWQiOiJ3ZWIzIiwic3ViIjoiQ2lvd2VHRkVPVEJCTlRZMU4wRXpNMEl5TlRVM016VTVRV0l4T1dGaE9UUTRNREpHTnpNM00wWTNPRGNTQkhkbFlqTSIsImF1ZCI6IjB4YUQ5MEE1NjU3QTMzQjI1NTczNTlBYjE5YWE5NDgwMkY3MzczRjc4NyIsImV4cCI6MTcyNjUyODI5NCwiaWF0IjoxNzI1MzE4Njk0LCJhdF9oYXNoIjoiZEpCODFnZlp4eGFnemFWWDFyUVYwUSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZXRoZXJldW1fYWRkcmVzcyI6IjB4YUQ5MEE1NjU3QTMzQjI1NTczNTlBYjE5YWE5NDgwMkY3MzczRjc4NyJ9.VM47fK07iJLteOmffwEE68gjPFVuZ3YZscrZuDlkteKz3oHdAislYPq3M2rOEZ4KMrvu-b7CqXSB0lfJCTr0yz_o-qbwSPnZ_2fn8DY85InTaLxJeiqLCkoaTudDm2aLG-05ea75Km6e_5XfounOYJhBgHP2gMrad4x4HDnisQztQbE4K0hGUo09d8KBElVEaDAbnRIYvepcohgOQHnxDJUGBX06hN_GLT1x3_OcFH_yZr3KEqTqdc0U2X3mCyW3CKV0tyDcC0HmhNXDVmCRboQrIBfn1C0wYmvlxyMKTYbHlUPH1mhTcRQxdiSF8PO8r4pyKc8plmz6ElR2lGdcNA';
const tokenId = 21957; // Replace with dynamic tokenId if needed

// Function to fetch the trips
const getAllTrips = async (privilegeToken: string, tokenId: number) => {
    try {
        const response = await axios.get(
            `https://trips-api.dimo.zone/v1/vehicle/${tokenId}/trips?page=1`,
            {
                headers: {
                    'Authorization': `Bearer ${privilegeToken}`,
                    'Accept': 'application/json',
                },
            }
        );
        return response.data.trips.slice(0,5);
    } catch (error) {
        console.error('Error fetching trips:', error);
        throw error;
    }
};

// Fetch privilege token
const getPrivilegeToken = async (accessToken: string, tokenId: number) => {
    const privilegesResponse = await dimo.identity.query({
        query: `
            {
                vehicle(tokenId: ${tokenId}) {
                    privileges {
                        nodes {
                            id
                        }
                    }
                }
            }
        `
    });

    const privileges = privilegesResponse.data.vehicle.privileges.nodes.map(
        (priv: { id: number }) => priv.id
    );

    const response = await axios.post('https://token-exchange-api.dimo.zone/v1/tokens/exchange', {
        nftContractAddress: "0xbA5738a18d83D41847dfFbDC6101d37C69c9B0cF",
        privileges,
        tokenId
    }, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    return response.data.token;
};

// API Route to handle GET requests
export async function GET(req: NextRequest) {
    try {
        // Fetch privilege token
        const privilegeToken = await getPrivilegeToken(accessToken, tokenId);

        // Fetch all trips
        const trips = await getAllTrips(privilegeToken, tokenId);

        const res = NextResponse.json(trips);

        // Prevent client-side caching
        res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.headers.set('Pragma', 'no-cache');
        res.headers.set('Expires', '0');
        res.headers.set('Surrogate-Control', 'no-store');

        return res;
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

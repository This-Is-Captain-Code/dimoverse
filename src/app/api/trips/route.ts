import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { DIMO } from '@dimo-network/dimo-node-sdk';

const dimo = new DIMO('Production');
const accessToken = process.env.ACCESS_TOKEN;;
const tokenId = Number(process.env.TOKEN_ID);

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

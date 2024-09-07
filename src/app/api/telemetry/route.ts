import { DIMO } from "@dimo-network/dimo-node-sdk";
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const dimo = new DIMO('Production');
const accessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjMzMjU3ZDFiZjliZTdlNTg4ZDM1OTI3MzhhMmFhOTY5ODU3NWM4OTEifQ.eyJpc3MiOiJodHRwczovL2F1dGguZGltby56b25lIiwicHJvdmlkZXJfaWQiOiJ3ZWIzIiwic3ViIjoiQ2lvd2VHRkVPVEJCTlRZMU4wRXpNMEl5TlRVM016VTVRV0l4T1dGaE9UUTRNREpHTnpNM00wWTNPRGNTQkhkbFlqTSIsImF1ZCI6IjB4YUQ5MEE1NjU3QTMzQjI1NTczNTlBYjE5YWE5NDgwMkY3MzczRjc4NyIsImV4cCI6MTcyNjUyODI5NCwiaWF0IjoxNzI1MzE4Njk0LCJhdF9oYXNoIjoiZEpCODFnZlp4eGFnemFWWDFyUVYwUSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZXRoZXJldW1fYWRkcmVzcyI6IjB4YUQ5MEE1NjU3QTMzQjI1NTczNTlBYjE5YWE5NDgwMkY3MzczRjc4NyJ9.VM47fK07iJLteOmffwEE68gjPFVuZ3YZscrZuDlkteKz3oHdAislYPq3M2rOEZ4KMrvu-b7CqXSB0lfJCTr0yz_o-qbwSPnZ_2fn8DY85InTaLxJeiqLCkoaTudDm2aLG-05ea75Km6e_5XfounOYJhBgHP2gMrad4x4HDnisQztQbE4K0hGUo09d8KBElVEaDAbnRIYvepcohgOQHnxDJUGBX06hN_GLT1x3_OcFH_yZr3KEqTqdc0U2X3mCyW3CKV0tyDcC0HmhNXDVmCRboQrIBfn1C0wYmvlxyMKTYbHlUPH1mhTcRQxdiSF8PO8r4pyKc8plmz6ElR2lGdcNA'; // Replace with a secure method for storing tokens
const tokenId = 81202;

// Fetch all available signals dynamically
const getAvailableSignals = async (privilegeToken: string, tokenId: number) => {
    const result = await dimo.telemetry.query({
        query: `{ availableSignals(tokenId: ${tokenId}) }`,
        headers: {
            'Authorization': `Bearer ${privilegeToken}`,
        },
    });
    return result?.data?.availableSignals || [];
};

// Generate the dynamic query string using available signals
const generateSignalQuery = (availableSignals: string[]) => {
    return availableSignals
        .map((signal) => `${signal}(agg: MED)`)
        .join('\n');
};


// Get all signals dynamically based on available signals
const getAllSignals = async (privilegeToken: string, tokenId: number) => {
    const availableSignals = await getAvailableSignals(privilegeToken, tokenId);
    const signalQuery = generateSignalQuery(availableSignals);
    
    const allSignal = await dimo.telemetry.query({
        query: `
            {
                signals(
                    tokenId: ${tokenId},
                    from: "2024-08-01T00:00:00Z",
                    to: "2024-08-30T00:00:00Z",
                    interval: "24h"
                ) {
                    timestamp
                    ${signalQuery}
                }
            }
        `,
        headers: {
            'Authorization': `Bearer ${privilegeToken}`,
        },
    });
    
    return allSignal;
};

// Get latest signals dynamically based on available signals
const getAllSignalsLatest = async (privilegeToken: string, tokenId: number) => {
    const availableSignals = await getAvailableSignals(privilegeToken, tokenId);
    const signalQuery = availableSignals
        .map((signal) => `${signal} { value }`)
        .join('\n');

    const allSignalLatest = await dimo.telemetry.query({
        query: `
            {
                signalsLatest(
                    tokenId: ${tokenId},
                ) {
                    ${signalQuery}
                }
            }
        `,
        headers: {
            'Authorization': `Bearer ${privilegeToken}`,
        },
    });

    return allSignalLatest;
};

// Fetch the car model based on the tokenId
const getCarModel = async (tokenId: number) => {
    const carModel = await dimo.identity.query({
        query: `
            {
                vehicle(tokenId: ${tokenId}) {
                    definition {
                        make
                        model
                        year
                    }
                }
            }
        `
    });
    return carModel;
};

// Fetch the unique privileges based on the tokenId
const getPrivileges = async (tokenId: number) => {
    const response = await dimo.identity.query({
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

    // Extract privilege ids and filter out duplicates
    const privileges = response.data.vehicle.privileges.nodes;
    const uniquePrivileges = [...new Set(privileges.map((priv: { id: number }) => priv.id))];

    return uniquePrivileges;
};

// Fetch privilege token
const getPrivilegeToken = async (accessToken: string, tokenId: number) => {
    // Fetch the unique privileges
    const privileges = await getPrivileges(tokenId);

    const response = await fetch('https://token-exchange-api.dimo.zone/v1/tokens/exchange', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nftContractAddress: "0xbA5738a18d83D41847dfFbDC6101d37C69c9B0cF",
            privileges: privileges, // Use the privileges fetched
            tokenId: tokenId
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const privilegeToken = await response.json();
    return privilegeToken.token;
};

// Main function to execute the logic
const main = async () => {
    try {
        const privilegeToken = await getPrivilegeToken(accessToken, tokenId);
        const allSignalLatest = await getAllSignalsLatest(privilegeToken, tokenId);
        const carModel = await getCarModel(tokenId);
        const privileges = await getPrivileges(tokenId);

        // console.log("Car Make:", carModel.data.vehicle.definition.make);
        // console.log("Latest Signals:", allSignalLatest?.data?.signalsLatest || "No data");
        // console.log("Privileges: ", privileges );
    } catch (error) {
        console.error('Error:', error);
    }
};

// API handler for GET request
export async function GET(req: NextRequest) {
    try {
        // Fetch a fresh privilege token on each request
        const privilegeToken = await getPrivilegeToken(accessToken, tokenId);
        const allSignalLatest = await getAllSignalsLatest(privilegeToken, tokenId);
        const carModel = await getCarModel(tokenId);
        const signs = await getAvailableSignals(privilegeToken, tokenId);

        console.log("Bearer ", privilegeToken);

        const response = {
            make: carModel.data.vehicle.definition.make,
            model: carModel.data.vehicle.definition.model,
            year: carModel.data.vehicle.definition.year,
            signals: allSignalLatest.data!.signalsLatest,
        };

        const res = NextResponse.json(response);

        // Set headers to disable caching on the client side
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
// Execute the main function
main();

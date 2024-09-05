import { DIMO } from "@dimo-network/dimo-node-sdk";
import { NextRequest, NextResponse } from 'next/server';

const dimo = new DIMO('Production');

const getNumberOfTeslas = async () => {
    return await dimo.identity.query({
        query: '{ vehicles(first: 10, filterBy: { make: "Tesla" }) { totalCount } }',
    });
}

const getAvailableSignals = async (privilegeToken: string) => {
    return await dimo.telemetry.query({
        query: '{ availableSignals(tokenId: 21957)}',
        headers: {
            'Authorization': `Bearer ${privilegeToken}`
        },
    });
}

const getCarModel = async () => {
    const carModel = await dimo.identity.query({
        query: `
            {
                vehicle(tokenId: 21957) {
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
}
const getAverageSpeed = async (privilegeToken: string) => {
    const avgSpeed = await dimo.telemetry.query({
        query: `
            {
                signals(
                    tokenId: 21957,
                    from: "2024-08-01T00:00:00Z",
                    to: "2024-08-30T00:00:00Z",
                    interval: "24h"
                ) {
                    timestamp
                    avgSpeed: speed(agg: AVG)
                }
            }
        `,
        headers: {
            'Authorization': `Bearer ${privilegeToken}`
        },
    });

    if(avgSpeed!)
        return avgSpeed

}


const getAllSignals = async (privilegeToken: string) => {
    const allSignal = await dimo.telemetry.query({
        query: `
            {
                signals(
                    tokenId: 21957,
                    from: "2024-08-01T00:00:00Z",
                    to: "2024-08-30T00:00:00Z",
                    interval: "24h"
                ) {
                    timestamp
                    speed(agg: MED)
                    currentLocationLatitude(agg: RAND)
                    currentLocationLongitude(agg: RAND)
                    dimoAftermarketNSAT(agg: RAND)
                    exteriorAirTemperature(agg: MAX)
                    lowVoltageBatteryCurrentVoltage(agg: MIN)
                    obdBarometricPressure(agg: MIN)
                    obdEngineLoad(agg: MAX)
                    obdIntakeTemp(agg: MAX)
                    powertrainCombustionEngineMAF(agg: MED)
                    powertrainCombustionEngineSpeed(agg: MED)
                    powertrainCombustionEngineTPS(agg: MED)
                    powertrainFuelSystemRelativeLevel(agg: MIN)
                    powertrainTransmissionTravelledDistance(agg: MAX)
                }
            }
        `,
        headers: {
            'Authorization': `Bearer ${privilegeToken}`
        },
    });

    return allSignal;
}

const getAllSignalsLatest = async (privilegeToken: string) => {
    const allSignalLatest = await dimo.telemetry.query({
        query: `
            {
                signalsLatest(
                    tokenId: 21957,
                ) {
                    currentLocationLatitude{
                        value
                    },
                    currentLocationLongitude{
                        value
                    },
                    speed{
                        value
                    },
                    dimoAftermarketNSAT{
                        value
                    },
                    exteriorAirTemperature{
                        value
                    },
                    lowVoltageBatteryCurrentVoltage{
                        value
                    },
                    obdBarometricPressure{
                        value
                    },
                    obdEngineLoad{
                        value
                    },
                    obdIntakeTemp{
                        value
                    },
                    powertrainCombustionEngineMAF{
                        value
                    },
                    powertrainCombustionEngineSpeed{
                        value
                    },
                    powertrainCombustionEngineTPS{
                        value
                    },
                    powertrainFuelSystemRelativeLevel{
                        value
                    },
                    powertrainTransmissionTravelledDistance{
                        value
                    }
                }
            }
        `,
        headers: {
            'Authorization': `Bearer ${privilegeToken}`
        },
    });

    return allSignalLatest;
}

const getAccessToken = async () => {
    return await dimo.auth.getToken({
        client_id: '0xaD90A5657A33B2557359Ab19aa94802F7373F787',
        domain: 'http://localhost:8082',
        private_key: 'bc54f5192f6cf3fc8e713ab25572f758e8b7592cbc73d973924c32110aad6fed'
    });
}

const getPrivilegeToken = async (accessToken: string) => {
    const response = await fetch('https://token-exchange-api.dimo.zone/v1/tokens/exchange', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nftContractAddress: "0xbA5738a18d83D41847dfFbDC6101d37C69c9B0cF",
            privileges: [1, 3, 4, 6],
            tokenId: 21957
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const privilegeToken = await response.json();
    return privilegeToken.token; // Make sure to extract the token properly from the response.
}
const main = async () => {
    try {
        const accessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjMzMjU3ZDFiZjliZTdlNTg4ZDM1OTI3MzhhMmFhOTY5ODU3NWM4OTEifQ.eyJpc3MiOiJodHRwczovL2F1dGguZGltby56b25lIiwicHJvdmlkZXJfaWQiOiJ3ZWIzIiwic3ViIjoiQ2lvd2VHRkVPVEJCTlRZMU4wRXpNMEl5TlRVM016VTVRV0l4T1dGaE9UUTRNREpHTnpNM00wWTNPRGNTQkhkbFlqTSIsImF1ZCI6IjB4YUQ5MEE1NjU3QTMzQjI1NTczNTlBYjE5YWE5NDgwMkY3MzczRjc4NyIsImV4cCI6MTcyNjUyODI5NCwiaWF0IjoxNzI1MzE4Njk0LCJhdF9oYXNoIjoiZEpCODFnZlp4eGFnemFWWDFyUVYwUSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZXRoZXJldW1fYWRkcmVzcyI6IjB4YUQ5MEE1NjU3QTMzQjI1NTczNTlBYjE5YWE5NDgwMkY3MzczRjc4NyJ9.VM47fK07iJLteOmffwEE68gjPFVuZ3YZscrZuDlkteKz3oHdAislYPq3M2rOEZ4KMrvu-b7CqXSB0lfJCTr0yz_o-qbwSPnZ_2fn8DY85InTaLxJeiqLCkoaTudDm2aLG-05ea75Km6e_5XfounOYJhBgHP2gMrad4x4HDnisQztQbE4K0hGUo09d8KBElVEaDAbnRIYvepcohgOQHnxDJUGBX06hN_GLT1x3_OcFH_yZr3KEqTqdc0U2X3mCyW3CKV0tyDcC0HmhNXDVmCRboQrIBfn1C0wYmvlxyMKTYbHlUPH1mhTcRQxdiSF8PO8r4pyKc8plmz6ElR2lGdcNA';
        const tokenId = 21957;
        
        // const accessToken = await getAccessToken();
        // console.log('Access Token:', accessToken);

        const privilegeToken = await getPrivilegeToken(accessToken);
        // console.log('Privilege Token:', privilegeToken);

        // const teslaCount = await getNumberOfTeslas();
        // console.log('Number of Teslas:', teslaCount);

        // const availableSignals = await getAvailableSignals(privilegeToken);
        // console.log('Average Speed of Vehicle:', availableSignals);

        // const avgSpeed = await getAverageSpeed(privilegeToken);
        // console.log('Average Speed of Vehicle:', avgSpeed.data.signals[0].avgSpeed);
        // console.log(avgSpeed ? avgSpeed!.data.signals[5].avgSpeed : {})
        // avgSpeed!.data.signals.map((item:any)=>{
        //     console.log(item.avgSpeed)
        // })

        // const allSignal = await getAllSignals(privilegeToken);

        // if (allSignal && allSignal!.data && allSignal!.data.signals) {
        //     allSignal!.data.signals.forEach((signal: any) => {
        //         console.log('Timestamp:', signal.timestamp);
        //         console.log('Speed:', signal.speed);
        //         console.log('Latitude:', signal.currentLocationLatitude);
        //         console.log('Longitude:', signal.currentLocationLongitude);
        //         console.log('NSAT:', signal.dimoAftermarketNSAT);
        //         console.log('Exterior Air Temperature:', signal.exteriorAirTemperature);
        //         console.log('Low Voltage Battery Current Voltage:', signal.lowVoltageBatteryCurrentVoltage);
        //         console.log('OBD Barometric Pressure:', signal.obdBarometricPressure);
        //         console.log('OBD Engine Load:', signal.obdEngineLoad);
        //         console.log('OBD Intake Temperature:', signal.obdIntakeTemp);
        //         console.log('Engine MAF:', signal.powertrainCombustionEngineMAF);
        //         console.log('Engine Speed:', signal.powertrainCombustionEngineSpeed);
        //         console.log('Engine TPS:', signal.powertrainCombustionEngineTPS);
        //         console.log('Fuel System Relative Level:', signal.powertrainFuelSystemRelativeLevel);
        //         console.log('Transmission Travelled Distance:', signal.powertrainTransmissionTravelledDistance);
        //         console.log('---');
        //     });
        // } else {
        //     console.log('No data available.');
        // }
        
        const allSignalLatest = await getAllSignalsLatest(privilegeToken);
        const carModel = await getCarModel();

        // console.log("the other privilege token: " , privilegeToken);

        // if (allSignalLatest && allSignalLatest!.data && allSignalLatest!.data.signalsLatest) {
        //         //console.log('Timestamp:', signal.timestamp);
        //         console.log('Make:', carModel.data.vehicle.definition.make);
        //         console.log('Speed:', allSignalLatest.data.signalsLatest.speed.value);
        //         console.log('Latitude:', allSignalLatest.data.signalsLatest.currentLocationLatitude.value);
        //         console.log('Longitude:', allSignalLatest.data.signalsLatest.currentLocationLongitude.value);
        //         console.log('NSAT:', allSignalLatest.data.signalsLatest.dimoAftermarketNSAT.value);
        //         console.log('Exterior Air Temperature:', allSignalLatest.data.signalsLatest.exteriorAirTemperature.value);
        //         console.log('Low Voltage Battery Current Voltage:', allSignalLatest.data.signalsLatest.lowVoltageBatteryCurrentVoltage.value);
        //         console.log('OBD Barometric Pressure:', allSignalLatest.data.signalsLatest.obdBarometricPressure.value);
        //         console.log('OBD Engine Load:', allSignalLatest.data.signalsLatest.obdEngineLoad.value);
        //         console.log('OBD Intake Temperature:', allSignalLatest.data.signalsLatest.obdIntakeTemp.value);
        //         console.log('Engine MAF:', allSignalLatest.data.signalsLatest.powertrainCombustionEngineMAF.value);
        //         console.log('Engine Speed:', allSignalLatest.data.signalsLatest.powertrainCombustionEngineSpeed.value);
        //         console.log('Engine TPS:', allSignalLatest.data.signalsLatest.powertrainCombustionEngineTPS.value);
        //         console.log('Fuel System Relative Level:', allSignalLatest.data.signalsLatest.powertrainFuelSystemRelativeLevel.value);
        //         console.log('Transmission Travelled Distance:', allSignalLatest.data.signalsLatest.powertrainTransmissionTravelledDistance.value);
                
        //         console.log('---');
        // } else {
        //     console.log('No data available.');
        // }


        //console.log(allSignalLatest.data.signalsLatest.speed.value);

    } catch (error) {
        console.error('Error:', error);
    }
}

export async function GET(req: NextRequest) {
    try {
        const headers = new Headers({
            'Cache-Control': 'no-store',
        });

        const accessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjMzMjU3ZDFiZjliZTdlNTg4ZDM1OTI3MzhhMmFhOTY5ODU3NWM4OTEifQ.eyJpc3MiOiJodHRwczovL2F1dGguZGltby56b25lIiwicHJvdmlkZXJfaWQiOiJ3ZWIzIiwic3ViIjoiQ2lvd2VHRkVPVEJCTlRZMU4wRXpNMEl5TlRVM016VTVRV0l4T1dGaE9UUTRNREpHTnpNM00wWTNPRGNTQkhkbFlqTSIsImF1ZCI6IjB4YUQ5MEE1NjU3QTMzQjI1NTczNTlBYjE5YWE5NDgwMkY3MzczRjc4NyIsImV4cCI6MTcyNjUyODI5NCwiaWF0IjoxNzI1MzE4Njk0LCJhdF9oYXNoIjoiZEpCODFnZlp4eGFnemFWWDFyUVYwUSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZXRoZXJldW1fYWRkcmVzcyI6IjB4YUQ5MEE1NjU3QTMzQjI1NTczNTlBYjE5YWE5NDgwMkY3MzczRjc4NyJ9.VM47fK07iJLteOmffwEE68gjPFVuZ3YZscrZuDlkteKz3oHdAislYPq3M2rOEZ4KMrvu-b7CqXSB0lfJCTr0yz_o-qbwSPnZ_2fn8DY85InTaLxJeiqLCkoaTudDm2aLG-05ea75Km6e_5XfounOYJhBgHP2gMrad4x4HDnisQztQbE4K0hGUo09d8KBElVEaDAbnRIYvepcohgOQHnxDJUGBX06hN_GLT1x3_OcFH_yZr3KEqTqdc0U2X3mCyW3CKV0tyDcC0HmhNXDVmCRboQrIBfn1C0wYmvlxyMKTYbHlUPH1mhTcRQxdiSF8PO8r4pyKc8plmz6ElR2lGdcNA';  // Use a secure way to handle tokens
        const privilegeToken = await getPrivilegeToken(accessToken);
        // console.log("Privilege Token brrr", privilegeToken);

        const allSignalLatest = await getAllSignalsLatest(privilegeToken);
        const carModel = await getCarModel();
        if (allSignalLatest && allSignalLatest!.data && allSignalLatest!.data.signalsLatest!) {
            return NextResponse.json({
                make: carModel.data.vehicle.definition.make,
                model: carModel.data.vehicle.definition.model,
                year: carModel.data.vehicle.definition.year,
                speed: allSignalLatest.data.signalsLatest!.speed.value,
                latitude: allSignalLatest.data.signalsLatest!.currentLocationLatitude.value,
                longitude: allSignalLatest.data.signalsLatest!.currentLocationLongitude.value,
                NSAT: allSignalLatest.data.signalsLatest!.dimoAftermarketNSAT.value,
                exteriorAirTemperature: allSignalLatest.data.signalsLatest!.exteriorAirTemperature.value,
                lowVoltageBatteryCurrentVoltage: allSignalLatest.data.signalsLatest!.lowVoltageBatteryCurrentVoltage.value,
                obdBarometricPressure: allSignalLatest.data.signalsLatest!.obdBarometricPressure.value,
                obdEngineLoad: allSignalLatest.data.signalsLatest!.obdEngineLoad.value,
                obdIntakeTemp: allSignalLatest.data.signalsLatest!.obdIntakeTemp.value,
                engineMAF: allSignalLatest.data.signalsLatest!.powertrainCombustionEngineMAF.value,
                engineSpeed: allSignalLatest.data.signalsLatest!.powertrainCombustionEngineSpeed.value,
                engineTPS: allSignalLatest.data.signalsLatest!.powertrainCombustionEngineTPS.value,
                fuelSystemRelativeLevel: allSignalLatest.data.signalsLatest!.powertrainFuelSystemRelativeLevel.value,
                transmissionTravelledDistance: allSignalLatest.data.signalsLatest!.powertrainTransmissionTravelledDistance.value,
            });
        } else {
            return NextResponse.json({ message: 'No data available' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error:', error);
        //console.log('Speed:', allSignalLatest!.data.signalsLatest.speed.value);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

main();

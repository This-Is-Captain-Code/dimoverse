"use client";

import { useEffect, useState } from 'react';
import Card from './components/card';
import styles from './page.module.css';

export default function Page() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/hackathon');
            const result = await response.json();
            setData(result);
        }
        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Hackathon Data</h1>
            <div className={styles.cardContainer}>
                {data ? (
                    Object.entries(data).map(([key, value]) => (
                        <Card key={key} title={key} value={value} />
                    ))
                ) : (
                    <p className={styles.loadingText}>Loading...</p>
                )}
            </div>
        </div>
    );
}

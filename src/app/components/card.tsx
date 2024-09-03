import React from 'react';
import styles from './Card.module.css';

interface CardProps {
    title: string;
    value: number | string;
}

export default function Card({ title, value }: CardProps) {
    return (
        <div className={styles.card}>
            <h2 className={styles.cardTitle}>{title}</h2>
            <p className={styles.cardValue}>{value}</p>
        </div>
    );
}

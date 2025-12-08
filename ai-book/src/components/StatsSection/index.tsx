import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const stats = [
  {
    number: '4',
    label: 'Core Modules',
    icon: '📚',
    color: '#2563EB',
  },
  {
    number: '12+',
    label: 'Weeks of Content',
    icon: '⏱️',
    color: '#10B981',
  },
  {
    number: '50+',
    label: 'Hands-on Labs',
    icon: '🔬',
    color: '#8B5CF6',
  },
  {
    number: '1',
    label: 'Capstone Project',
    icon: '🚀',
    color: '#F59E0B',
  },
];

export default function StatsSection(): JSX.Element {
  return (
    <section className={styles.statsSection}>
      <div className="container">
        <div className={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <div key={idx} className={styles.statCard} style={{'--stat-color': stat.color} as React.CSSProperties}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

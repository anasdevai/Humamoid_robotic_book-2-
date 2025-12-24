import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const BuildItems = [
  { icon: '🤖', title: 'Autonomous Navigation', desc: 'Build robots that navigate complex environments' },
  { icon: '🧠', title: 'AI Integration', desc: 'Integrate vision-language models for intelligent behavior' },
  { icon: '🎮', title: 'Digital Twins', desc: 'Create virtual replicas for testing & simulation' },
  { icon: '⚡', title: 'Real-time Control', desc: 'Master ROS2 for robot communication' },
];

export default function WhatYoullBuild(): ReactNode {
  return (
    <section className={clsx('container', styles.whatYoullBuildSection)}>
      <h2 className="text--center">What You'll Build</h2>
      <div className={clsx('row', styles.centerContent)}>
        {BuildItems.map((item, idx) => (
          <div key={idx} className="col col--3">
            <div className={styles.buildCard}>
              <span className={styles.buildIcon}>{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const HardwareOptions = [
  {
    title: 'Cloud-based setup',
    cost: '$205/quarter',
    description: 'Minimum viable setup, leveraging cloud resources for simulation and development.',
  },
  {
    title: 'Workstation + Jetson Kit',
    cost: '$3,000+',
    description: 'Recommended for hands-on learning, providing dedicated hardware for AI and robotics.',
  },
  {
    title: 'Full lab with robot',
    cost: '$20,000+',
    description: 'Premium setup for advanced research and full-scale humanoid robot development.',
  },
];

function HardwareOptionItem({ title, cost, description }): JSX.Element {
  return (
    <div className={clsx('col col--4', styles.hardwareOptionItem)}>
      <h3>{title}</h3>
      <p className={styles.cost}>{cost}</p>
      <p>{description}</p>
    </div>
  );
}

export default function HardwareQuickStart(): JSX.Element {
  return (
    <section className={clsx('container', styles.hardwareQuickStartSection)}>
      <h2 className="text--center">Hardware Quick Start</h2>
      <div className="row">
        {HardwareOptions.map((props, idx) => (
          <HardwareOptionItem key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}

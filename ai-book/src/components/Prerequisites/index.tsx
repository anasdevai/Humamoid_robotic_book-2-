import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const PrerequisiteList = [
  {
    title: 'Intermediate Python programming',
    description: 'Solid understanding of Python syntax, data structures, and object-oriented programming.',
  },
  {
    title: 'Basic understanding of AI/ML concepts',
    description: 'Familiarity with fundamental AI and Machine Learning principles.',
  },
  {
    title: 'Familiarity with Linux command line',
    description: 'Comfortable navigating the terminal and executing basic commands.',
  },
  {
    title: 'Hardware requirements overview',
    description: 'Understanding of the hardware components needed for physical AI development.',
  },
];

function PrerequisiteItem({ title, description }): JSX.Element {
  return (
    <div className={clsx('col col--6', styles.prerequisiteItem)}>
      <h3>✓ {title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Prerequisites(): JSX.Element {
  return (
    <section className={clsx('container', styles.prerequisitesSection)}>
      <h2 className="text--center">Prerequisites</h2>
      <div className="row">
        {PrerequisiteList.map((props, idx) => (
          <PrerequisiteItem key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}

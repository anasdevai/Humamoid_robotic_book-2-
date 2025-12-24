import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Hands-On Learning',
    icon: '🔧',
    description: (
      <>
        Build real robots with step-by-step tutorials. From ROS2 basics to
        advanced humanoid control systems.
      </>
    ),
  },
  {
    title: 'Industry-Ready Skills',
    icon: '🎯',
    description: (
      <>
        Learn the same tools used by leading robotics companies &mdash; NVIDIA Isaac,
        Gazebo simulation, and VLA models.
      </>
    ),
  },
  {
    title: 'AI-Powered Robotics',
    icon: '🧠',
    description: (
      <>
        Integrate cutting-edge AI with physical robots. Vision-language models,
        autonomous navigation, and more.
      </>
    ),
  },
];

function Feature({ title, icon, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}


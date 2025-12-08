import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import ModuleCards from '@site/src/components/ModuleCards';
import LearningPath from '@site/src/components/LearningPath';
import WhatYoullBuild from '@site/src/components/WhatYoullBuild';
import Prerequisites from '@site/src/components/Prerequisites';
import HardwareQuickStart from '@site/src/components/HardwareQuickStart';
import StatsSection from '@site/src/components/StatsSection';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/chapter-1-introduction-to-physical-ai">
            🚀 Start Learning
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/module-1-ros2/week-3-ros2-foundations/chapter-6-ros2-architecture-and-core-concepts">
            📚 Explore Modules
          </Link>
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="A comprehensive guide to Physical AI and Humanoid Robotics.">
      <HomepageHeader />
      <main>
        <StatsSection />
        <ModuleCards />
        <LearningPath />
        <WhatYoullBuild />
        <Prerequisites />
        <HardwareQuickStart />
      </main>
    </Layout>
  );
}

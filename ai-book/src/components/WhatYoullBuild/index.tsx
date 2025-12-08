import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function WhatYoullBuild(): JSX.Element {
  return (
    <section className={clsx('container', styles.whatYoullBuildSection)}>
      <h2 className="text--center">What You'll Build</h2>
      <div className={clsx('row', styles.centerContent)}>
        <div className="col col--8">
          <div className={styles.videoPlaceholder}>
            {/* Placeholder for autonomous humanoid robot demo video/GIF */}
            <p>Autonomous humanoid robot demo video/GIF will go here.</p>
            <img src="img/docusaurus.png" alt="Autonomous Humanoid Robot" />
          </div>
        </div>
      </div>
    </section>
  );
}

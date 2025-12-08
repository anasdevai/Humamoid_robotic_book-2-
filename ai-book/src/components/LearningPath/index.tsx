import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    mermaid: any;
  }
}

function MermaidChart({ chart }: { chart: string }) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
    }
  }, [chart]);

  return (
    <div className="mermaid" ref={chartRef}>
      {chart}
    </div>
  );
}

export default function LearningPath(): JSX.Element {
  const flowchart = `
graph TD
    A[Prerequisites] --> B(Foundations)
    B --> C1(Module 1: ROS 2)
    C1 --> C2(Module 2: Digital Twin)
    C2 --> C3(Module 3: NVIDIA Isaac)
    C3 --> C4(Module 4: VLA)
    C4 --> D[Capstone Project]

    style A fill:#2E5EAA,stroke:#333,stroke-width:2px
    style B fill:#6B7280,stroke:#333,stroke-width:2px
    style C1 fill:#22C55E,stroke:#333,stroke-width:2px
    style C2 fill:#A855F7,stroke:#333,stroke-width:2px
    style C3 fill:#F97316,stroke:#333,stroke-width:2px
    style C4 fill:#14B8A6,stroke:#333,stroke-width:2px
    style D fill:#F59E0B,stroke:#333,stroke-width:2px
  `;

  return (
    <section className={clsx('container', styles.learningPathSection)}>
      <h2 className="text--center">Learning Path</h2>
      <div className="text--center">
        <MermaidChart chart={flowchart} />
      </div>
    </section>
  );
}

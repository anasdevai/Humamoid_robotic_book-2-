// import React from 'react';
// import clsx from 'clsx';
// import styles from './styles.module.css';

// type ModuleItem = {
//   title: string;
//   description: string;
//   link: string;
//   color: string;
// };

// const ModuleList: ModuleItem[] = [
//   {
//     title: 'Module 1: The Robotic Nervous System (ROS 2)',
//     description: 'Learn ROS 2 Architecture, Nodes, Topics, Services, and Actions. Build ROS 2 packages with Python and rclpy, bridging Python agents to ROS controllers. Master Launch Files, Parameter Management, and URDF for humanoids.',
//     link: '/docs/module-1-ros2/week-3-ros2-foundations/chapter-6-ros2-architecture-and-core-concepts',
//     color: 'var(--module-color-module-1-ros2)', // Green
//   },
//   {
//     title: 'Module 2: The Digital Twin (Gazebo & Unity)',
//     description: 'Explore Robot Simulation with Gazebo, including environment setup, URDF/SDF descriptions, and simulating physics, gravity, and collisions. Dive into Sensor Simulation (LiDAR, Depth Cameras, IMUs) and advanced Unity for high-fidelity rendering, human-robot interaction, and Gazebo integration with ROS 2.',
//     link: '/docs/module-2-digital-twin/week-6-gazebo-simulation/chapter-15-introduction-to-robot-simulation',
//     color: 'var(--module-color-module-2-digital-twin)', // Purple
//   },
//   {
//     title: 'Module 3: The AI-Robot Brain (NVIDIA Isaac)',
//     description: 'Discover the NVIDIA Isaac Platform, Isaac Sim setup, and photorealistic simulation. Generate synthetic data, leverage Isaac ROS for hardware-accelerated VSLAM, and implement AI-Powered Perception. Master Nav2 for bipedal humanoid movement, Path Planning Algorithms, Reinforcement Learning for Robot Control, and Sim-to-Real Transfer Techniques.',
//     link: '/docs/module-3-isaac/week-8-isaac-platform-introduction/chapter-23-nvidia-isaac-platform-overview',
//     color: 'var(--module-color-module-3-isaac)', // Orange
//   },
//   {
//     title: 'Module 4: Vision-Language-Action (VLA)',
//     description: 'Delve into Humanoid Robot Kinematics and Dynamics, Bipedal Locomotion, and Balance Control. Explore Natural Human-Robot Interaction Design, Multi-Modal Sensing, and Voice-to-Action pipelines. Integrate OpenAI Whisper and GPT Models for Conversational AI, Cognitive Planning with LLMs, and translating Natural Language to ROS 2 Actions.',
//     link: '/docs/module-4-vla/week-11-humanoid-development/chapter-34-humanoid-robot-kinematics-and-dynamics',
//     color: 'var(--module-color-module-4-vla)', // Teal
//   },
// ];

// function ModuleItem({title, description, link, color}: ModuleItem) {
//   return (
//     <div className={clsx('col col--6', styles.moduleCard)}>
//       <a href={link} className={styles.moduleCardLink}>
//         <div className={styles.moduleCardContent} style={{borderColor: color}}>
//           <h3>{title}</h3>
//           <p>{description}</p>
//         </div>
//       </a>
//     </div>
//   );
// }

// export default function ModuleCards(): JSX.Element {
//   return (
//     <section className={styles.modules}>
//       <div className="container">
//         <h2 className="text--center">Course Overview</h2>
//         <div className="row">
//           {ModuleList.map((props, idx) => (
//             <ModuleItem key={idx} {...props} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link'; // <-- Docusaurus Link import
import styles from './styles.module.css';

type ModuleItem = {
  title: string;
  description: string;
  link: string;
  color: string;
};

const ModuleList: ModuleItem[] = [
  {
    title: 'Module 1: The Robotic Nervous System (ROS 2)',
    description: 'Learn ROS 2 Architecture, Nodes, Topics, Services, and Actions. Build ROS 2 packages with Python and rclpy, bridging Python agents to ROS controllers. Master Launch Files, Parameter Management, and URDF for humanoids.',
    link: '/docs/module-1-ros2/week-3-ros2-foundations/chapter-6-ros2-architecture-and-core-concepts',
    color: 'var(--module-color-module-1-ros2)',
  },
  {
    title: 'Module 2: The Digital Twin (Gazebo & Unity)',
    description: 'Explore Robot Simulation with Gazebo, including environment setup, URDF/SDF descriptions, and simulating physics, gravity, and collisions. Dive into Sensor Simulation (LiDAR, Depth Cameras, IMUs) and advanced Unity for high-fidelity rendering, human-robot interaction, and Gazebo integration with ROS 2.',
    link: '/docs/module-2-digital-twin/week-6-gazebo-simulation/chapter-15-introduction-to-robot-simulation',
    color: 'var(--module-color-module-2-digital-twin)',
  },
  {
    title: 'Module 3: The AI-Robot Brain (NVIDIA Isaac)',
    description: 'Discover the NVIDIA Isaac Platform, Isaac Sim setup, and photorealistic simulation. Generate synthetic data, leverage Isaac ROS for hardware-accelerated VSLAM, and implement AI-Powered Perception. Master Nav2 for bipedal humanoid movement, Path Planning Algorithms, Reinforcement Learning for Robot Control, and Sim-to-Real Transfer Techniques.',
    link: '/docs/module-3-isaac/week-8-isaac-platform-introduction/chapter-23-nvidia-isaac-platform-overview',
    color: 'var(--module-color-module-3-isaac)',
  },
  {
    title: 'Module 4: Vision-Language-Action (VLA)',
    description: 'Delve into Humanoid Robot Kinematics and Dynamics, Bipedal Locomotion, and Balance Control. Explore Natural Human-Robot Interaction Design, Multi-Modal Sensing, and Voice-to-Action pipelines. Integrate OpenAI Whisper and GPT Models for Conversational AI, Cognitive Planning with LLMs, and translating Natural Language to ROS 2 Actions.',
    link: '/docs/module-4-vla/week-11-humanoid-development/chapter-34-humanoid-robot-kinematics-and-dynamics',
    color: 'var(--module-color-module-4-vla)',
  },
];

function ModuleItem({title, description, link, color}: ModuleItem) {
  return (
    <div className={clsx('col col--6', styles.moduleCard)}>
      <Link to={link} className={styles.moduleCardLink}> {/* <-- Link component */}
        <div className={styles.moduleCardContent} style={{borderColor: color}}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default function ModuleCards(): JSX.Element {
  return (
    <section className={styles.modules}>
      <div className="container">
        <h2 className="text--center">Course Overview</h2>
        <div className="row">
          {ModuleList.map((props, idx) => (
            <ModuleItem key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

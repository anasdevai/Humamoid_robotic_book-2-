import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'From Digital Brain to Physical Body',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-github-username.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/hackaton-book/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'anthropic', // Usually your GitHub org/user name.
  projectName: 'hackaton-book', // Usually your repo name.


  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },


  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/anthropic/hackaton-book/tree/1-physical-ai-book/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/anthropic/hackaton-book/tree/1-physical-ai-book/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    require.resolve('@docusaurus/theme-mermaid'),
    require.resolve('@docusaurus/plugin-ideal-image'),
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Physical AI & Humanoid Robotics',
      logo: {
        alt: 'Robot icon',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'dropdown',
          label: 'Content',
          position: 'left',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started/chapter-1-introduction-to-physical-ai',
            },
            {
              label: 'Module 1: ROS 2',
              to: '/docs/module-1-ros2/week-3-ros2-foundations/chapter-6-ros2-architecture-and-core-concepts',
            },
            {
              label: 'Module 2: Digital Twin',
              to: '/docs/module-2-digital-twin/week-6-gazebo-simulation/chapter-15-introduction-to-robot-simulation',
            },
            {
              label: 'Module 3: Isaac',
              to: '/docs/module-3-isaac/week-8-isaac-platform-introduction/chapter-23-nvidia-isaac-platform-overview',
            },
            {
              label: 'Module 4: VLA',
              to: '/docs/module-4-vla/week-11-humanoid-development/chapter-34-humanoid-robot-kinematics-and-dynamics',
            },
            {
              label: 'Hardware & Lab Setup',
              to: '/docs/hardware/chapter-46-understanding-hardware-requirements',
            },
            {
              label: 'Capstone Project',
              to: '/docs/capstone/chapter-51-capstone-project-overview',
            },
          ],
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          to: '/docs/resources/glossary-of-terms',
          label: 'Resources',
          position: 'left',
        },
        {
          href: 'https://github.com/anthropic/hackaton-book',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'search',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started/chapter-1-introduction-to-physical-ai',
            },
            {
              label: 'ROS 2',
              to: '/docs/module-1-ros2/week-3-ros2-foundations/chapter-6-ros2-architecture-and-core-concepts',
            },
            {
              label: 'Digital Twin',
              to: '/docs/module-2-digital-twin/week-6-gazebo-simulation/chapter-15-introduction-to-robot-simulation',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Issues',
              href: 'https://github.com/anthropic/hackaton-book/issues',
            },
            {
              label: 'Discord',
              href: '#', // TODO: Add Discord link
            },
            {
              label: 'X',
              href: '#', // TODO: Add X link
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/anthropic/hackaton-book',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Anthropic. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'bash', 'yaml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

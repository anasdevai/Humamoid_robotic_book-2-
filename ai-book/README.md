# Physical AI & Humanoid Robotics: From Digital Brain to Physical Body

A comprehensive, AI-native book built with Docusaurus, guiding developers through the fascinating world of Physical AI and Humanoid Robotics. This book covers fundamental concepts, practical implementations, and advanced topics across four core modules: ROS 2, Digital Twin (Gazebo & Unity), NVIDIA Isaac, and Vision-Language-Action (VLA).

## ✨ Key Features

- **4-Module Curriculum**: Structured learning path from foundational concepts to advanced humanoid robotics.
- **Interactive Landing Page**: Dynamic overview of the course, learning path, and prerequisites.
- **Detailed Chapter Summaries**: All 60 chapters include high-level overviews, learning objectives, and key concepts.
- **Module-Specific Color Coding**: Visual cues to easily identify content belonging to each module.
- **Mermaid Diagram Support**: Integrate flowcharts and diagrams for complex concepts.
- **Optimized for Learning**: Designed for clarity, progression, and practical application.
- **Automated Deployment**: CI/CD pipeline with GitHub Actions for seamless updates to GitHub Pages.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18.x or v20.x LTS recommended)
- npm (Node Package Manager)
- Git

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/anthropic/hackaton-book.git
    cd hackaton-book/ai-book
    ```
    *Note: If you are working in a different branch, ensure you clone the correct branch or switch to it after cloning.*
2.  **Install dependencies:**
    ```bash
    npm install
    ```

## 💻 Local Development

Run the following commands in the `ai-book/` directory:

-   **Start the development server:**
    ```bash
    npm start
    ```
    This command starts a local development server and opens a browser window. Most changes are reflected live without having to restart the server.
-   **Build the static site:**
    ```bash
    npm run build
    ```
    This command generates static content into the `build` directory and can be served using any static content hosting service.
-   **Serve the production build locally:**
    ```bash
    npm run serve
    ```
    This command will serve the static `build` output locally, allowing you to preview the production site.
-   **Clear cache:**
    ```bash
    npm run clear
    ```
    If you encounter issues, clearing the Docusaurus cache might help.

## 🚢 Deployment

This project uses GitHub Actions for automated deployment to GitHub Pages.

-   **Workflow**:
    -   Pushes to the `1-physical-ai-book` branch automatically trigger the `deploy.yml` GitHub Actions workflow.
    -   The workflow builds the Docusaurus site and deploys it to the `gh-pages` branch, which then serves the content on GitHub Pages.

## 📂 Project Structure

```
.
├── .github/                       # GitHub Actions workflows
│   └── workflows/
│       └── deploy.yml             # CI/CD for GitHub Pages
├── docs/                          # All book chapters organized by modules
│   ├── getting-started/
│   ├── module-1-ros2/
│   ├── module-2-digital-twin/
│   ├── module-3-isaac/
│   ├── module-4-vla/
│   ├── hardware/
│   ├── capstone/
│   └── resources/                 # Glossary, FAQ, Troubleshooting
├── src/
│   ├── components/                # React components for landing page
│   ├── css/                       # Custom CSS styles
│   └── pages/                     # Landing page (index.tsx)
├── docusaurus.config.ts           # Docusaurus configuration
├── package.json                   # Project dependencies and scripts
├── sidebars.ts                    # Sidebar navigation configuration
└── tsconfig.json                  # TypeScript configuration
```

## 🤝 Contributing

We welcome contributions! Please refer to the `COMMUNITY_GUIDELINES.md` (coming soon) for details on how to contribute.

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file (coming soon) for details.

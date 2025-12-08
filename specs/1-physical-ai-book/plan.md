## Architecture Sketch

Technology Stack:
- Framework: Static site generator (e.g., Docusaurus 3.6.0+)
- Content: Markdown/MDX files organized by 4 modules
- Deployment: Automated deployment to a static hosting platform (e.g., GitHub Pages) via CI/CD (e.g., GitHub Actions)
- Node Version: 18.x or 20.x LTS

Directory Structure:
physical-ai-book/
├── docs/
│   ├── getting-started/ (Weeks 1-2, 5 chapters)
│   ├── module-1-ros2/ (Weeks 3-5, 9 chapters)
│   ├── module-2-digital-twin/ (Weeks 6-7, 8 chapters)
│   ├── module-3-isaac/ (Weeks 8-10, 11 chapters)
│   ├── module-4-vla/ (Weeks 11-13, 12 chapters)
│   ├── hardware/ (5 chapters)
│   ├── capstone/ (9 chapters)
│   └── resources/ (glossary, FAQ, troubleshooting)
├── src/pages/index.js (landing page)
├── docusaurus.config.js
└── sidebars.js

## Section Structure

Phase 1: Foundation (Days 1-2)
- Initialize static site project
- Configure site metadata and theme
- Configure content navigation structure
- Create landing page with hero section, module overview cards, learning path
- Setup GitHub Actions deployment workflow
- Create all directory structure

Phase 2: Content Skeleton (Days 3-5)
- Create all 60 markdown files with frontmatter
- Write 200-400 word summaries per chapter
- Add learning objectives (3-5 per chapter)
- Add prerequisites and time estimates
- Include key concepts list
- Add placeholder notes for detailed content

Phase 3: Validation & Deployment (Day 6)
- Test build locally
- Verify all navigation links
- Test mobile responsiveness
- Deploy to static hosting platform
- Validate acceptance criteria

Chapter Template Structure:
---
title: "Chapter Title"
sidebar_position: X
---
# Chapter Title
**Week X | Module Y | Time: Z hours**

## Learning Objectives
- Objective 1-3

## Prerequisites
- Required knowledge

## Overview
[2-3 paragraphs]

## Key Concepts
- Concepts list

## What You'll Build
[Hands-on component]

---
*Detailed content in Phase 2*

## Development Approach

Strategy: Structure-first, then iterative deep-dive per module
- Phase 1 (Current): Complete structure + high-level summaries (all 60 chapters)
- Phase 2 (Next): Detailed content for Module 1 (ROS 2)
- Phase 3-5: Detailed content for Modules 2-4
- Phase 6: Hardware guides + final polish

Benefits: Early validation, deployable at each phase, iterative feedback

## Decisions Needing Documentation

Decision 1: Docusaurus Version
Options: v3.6.0 (latest) vs v2.4.x (stable)
Recommendation: v3.6.0 - Better performance, improved MDX, active development
Tradeoff: Slightly less stable but manageable with version locking

Decision 2: Content Format
Options: Pure Markdown vs MDX
Recommendation: Hybrid - .md for simple content (80%), .mdx for interactive components
Tradeoff: More complexity but enables richer content

Decision 3: Code Examples
Options: Inline only vs Separate repo vs Embedded playgrounds
Recommendation: Inline (<50 lines) + Separate GitHub repo for complete projects
Tradeoff: Two repos to maintain but better organization

Decision 4: Diagrams
Options: Screenshots only vs Mermaid.js vs Mix
Recommendation: Mix - Mermaid for architecture/flows, screenshots for UI/results
Tradeoff: More initial work but better maintainability

Decision 5: Deployment
Options: Manual vs GitHub Actions (every push) vs (release tags only)
Recommendation: GitHub Actions on every push to main
Tradeoff: Higher build minutes but within free tier, immediate error detection

Decision 6: Search
Options: Built-in local vs Algolia DocSearch vs None initially
Recommendation: Built-in local initially, upgrade to Algolia when content stable
Tradeoff: Less powerful but no external dependencies

## Testing Strategy

Build Validation (Automated via CI/CD pipeline):
✓ npm run build completes without errors
✓ No broken internal links
✓ Build output < 50MB
✓ Build time < 3 minutes
✓ Lighthouse Performance score > 90
✓ Lighthouse Accessibility score > 90

Navigation Validation:
✓ Sidebar hierarchy matches 4-module structure
✓ All sidebar items link to existing pages
✓ Breadcrumbs show correct path
✓ Previous/Next links functional
✓ Search returns relevant results

Content Validation (Per Chapter):
✓ Frontmatter present (title, sidebar_position)
✓ Learning objectives listed (3-5 items)
✓ Prerequisites specified
✓ Summary 200-400 words
✓ Key concepts listed
✓ Consistent heading hierarchy (H1→H2→H3)
✓ Module color-coding applied
✓ Week references accurate

Performance Validation:
✓ Page load time < 2 seconds
✓ First Contentful Paint < 1 second
✓ Images optimized (WebP format)
✓ Lazy loading enabled

Deployment Validation:
✓ Build succeeds locally
✓ Preview works on localhost:3000
✓ Tested on Chrome, Firefox, Safari
✓ Site accessible at published URL
✓ All assets load (no 404s)
✓ HTTPS enabled

Acceptance Criteria from Specification:
✓ Book structure mirrors 4-module, 13-week course
✓ Clear progression: foundations → ROS 2 → simulation → Isaac → VLA
✓ Sidebar navigation intuitive
✓ All chapters have learning objectives and summaries
✓ Landing page explains learning path
✓ Builds and deploys to hosting platform successfully
✓ All navigation links functional
✓ Mobile responsive on 3+ devices
✓ Dark mode works correctly

## Technical Details

Development Workflow:
# Local development
npm install
npm start               # Dev server with hot reload
npm run build          # Production build
npm run serve          # Test production build locally
npm run clear          # Clear cache if issues

# Git workflow
git checkout -b content/module-1-ros2
git add docs/module-1-ros2/
git commit -m "Add Module 1 Week 3 content"
git push origin content/module-1-ros2

# Deployment (automatic)
Push to main → GitHub Actions → Build → Deploy to gh-pages → Live

Key Configuration (example: docusaurus.config.js):
- Project Title: "Physical AI & Humanoid Robotics"
- Project Tagline: "From Digital Brain to Physical Body"
- Theme Configuration: Dark mode default, color-coded modules
- Navigation Bar: Home, Content dropdown, Resources, Version Control Repository, Search
- Footer: Quick links, License (MIT/CC), Feedback
- Content Plugins (examples: ideal-image, mermaid)
- Code Highlighting Languages (examples: python, bash, xml, yaml)

Content Navigation Strategy:
- Automatically generated from content structure
- Collapsible categories for major sections (e.g., modules)
- Maximum hierarchy depth: 3 levels (e.g., Module → Week → Chapter)
- Manual ordering of content items within categories (e.g., via metadata in content files)

Quality Assurance:
Before each commit: Local build, check warnings, preview
Before each release: Full validation, multi-browser test, mobile check, link verification
Weekly: Content consistency audit, performance check, feedback review

Risk Mitigation:
- Build failures: Local testing + CI/CD catches early
- Content inconsistency: Templates + style guide + regular audits
- Deployment issues: Test pipeline early, staging branch, manual backup docs
- Performance issues: Regular Lighthouse audits, image optimization, code splitting

Success Metrics for Phase 1:
✓ All 60 chapter files created with summaries
✓ Build succeeds without errors
✓ Deployed to GitHub Pages
✓ All navigation functional
✓ Landing page complete with module cards
✓ Hardware guide outlined
✓ Resources section (glossary, FAQ, troubleshooting) populated
✓ README with setup instructions
✓ GitHub Actions workflow configured

Next Steps After Plan Approval:
1. Initialize static site project (npx create-docusaurus)
2. Configure docusaurus.config.js and sidebars.js
3. Create complete directory structure
4. Build landing page with React components
5. Create all 60 chapter markdown files with templates
6. Write high-level summaries for all chapters
7. Setup GitHub Actions deployment
8. Validate build and navigation
9. Deploy Phase 1 to GitHub Pages
10. Document in README and create Phase 2 specification
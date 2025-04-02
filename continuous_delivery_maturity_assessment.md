# Continuous Delivery Maturity Assessment Questionnaire

This questionnaire will help determine your organization's maturity level in the Continuous Delivery Maturity Model across eight key practice areas. For each practice area, select the statement that best describes your current state.

## 1. Build Management & Continuous Integration

**Which statement best describes your build and integration processes?**

- [ ] **Level -1:** Manual processes for building software. No management of dependencies.
- [ ] **Level 0:** Regular automated build & testing. Any build can be re-created from source control using automated process.
- [ ] **Level 1:** Automated build & test cycle every time a change is committed. Dependencies managed. In use of scripts & tools.
- [ ] **Level 2:** Build metrics gathered, made visible, & acted on. Builds are not left broken.
- [ ] **Level 3:** Teams regularly meet to discuss integration & fix them with automation, faster feedback, & better visibility.

## 2. Environments & Provisioning

**Which statement best describes your environment management and provisioning?**

- [ ] **Level -1:** Manual process for deploying software. Environment-specific binaries & deployments.
- [ ] **Level 0:** Automated deployment to some environments. Creation of new environments is cheap. All configuration is externalized & versioned.
- [ ] **Level 1:** Fully automated, self service push-button process for deploying software. Same process to deploy to every environment.
- [ ] **Level 2:** Orchestrated deployments managed. Release & rollback processes tested.
- [ ] **Level 3:** All environments managed effectively. Provisioning fully automated. Virtualization used if applicable.

## 3. Release Management & Compliance

**Which statement best describes your release management and compliance processes?**

- [ ] **Level -1:** Infrequent & unreliable releases.
- [ ] **Level 0:** Painful & infrequent, but reliable releases. Limited traceability from requirements to release.
- [ ] **Level 1:** Change management & approvals processes defined & enforced. Regulatory & compliance conditions met.
- [ ] **Level 2:** Environment & application health monitored & proactively managed. Cycle time is monitored.
- [ ] **Level 3:** Operations & delivery teams regularly collaborate to manage risks & reduce cycle time.

## 4. Testing

**Which statement best describes your testing practices?**

- [ ] **Level -1:** Manual testing after development.
- [ ] **Level 0:** Automated tests written as part of story development.
- [ ] **Level 1:** Automated unit & acceptance tests, the latter written with testers. Testing part of the development process.
- [ ] **Level 2:** Quality metrics & trends tracked. Non-functional requirements defined & measured.
- [ ] **Level 3:** Production rollbacks rare. Defects found & fixed immediately.

## 5. Data Management

**Which statement best describes your data management practices?**

- [ ] **Level -1:** Data migrations performed manually.
- [ ] **Level 0:** Changes to databases done with automated scripts versioned with application.
- [ ] **Level 1:** Database changes performed automated as part of deployment process.
- [ ] **Level 2:** Database upgrades & rollbacks tested with every deployment. Database performance monitored & optimized.
- [ ] **Level 3:** Release to release faithful copy of database performance & deployment process.

## 6. Configuration Management

**Which statement best describes your configuration management practices?**

- [ ] **Level -1:** Version control either not used, or check-ins happen infrequently.
- [ ] **Level 0:** Version control in use for everything required to recreate software: source code, configuration, build & deploy scripts, data migrations.
- [ ] **Level 1:** Libraries & dependencies managed. Version control branching strategies determined by change management process.
- [ ] **Level 2:** Developers check in to mainline at least once a day. Mainline only used for releases.
- [ ] **Level 3:** Regular updates to CM policy supports effective collaboration, feature development, & auditable change management processes.

## 7. Application

**Which statement best describes your application architecture?**

- [ ] **Level -1:** Monolithic sites, messy config, everything connects to everything, fragile and/or unclear dependencies.
- [ ] **Level 0:** Non-monolithic sites (system components are separate applications), almost no overlap of runtime is required between components.
- [ ] **Level 1:** Multi-server with shared storage system for shared components. Unestablished sessions, horizontal scaling & application layer.
- [ ] **Level 2:** Session management, robust failure state management, partially decoupled components from application (e.g. CDN), multi-region storage, & feature flags.
- [ ] **Level 3:** Technical, automated service discovery, no shared file system required for component sharing (full CDN integration), apps are directly tied to data sources.

## 8. Observability

**Which statement best describes your observability practices?**

- [ ] **Level -1:** Human feedback is the primary source of detection.
- [ ] **Level 0:** Local log files, SSH loop scripts to view/collect metrics, DevOps alerting manually added servers, inconsistent retention of logs & metrics.
- [ ] **Level 1:** Centralized log files, agent-based monitoring, manual alert configuration, manual addition & removal of servers.
- [ ] **Level 2:** Automatic environment detection, no manual decoupled components from adding/removing agents, log files (improved over messages as data, can be CDN), multi-region storage, & feature flags.
- [ ] **Level 3:** Automatic error detection, environment analysis tools, self-correction.

## Scoring Guide

After completing the questionnaire, count the number of selections at each level for each practice area. Your maturity level in each practice area is the highest level where you meet all criteria. Your overall maturity level is typically the lowest level across all practice areas.

## Action Plan

Based on your assessment results:
1. Focus first on bringing all practice areas to at least Level 0
2. Then work on advancing each practice area to the next level
3. Pay special attention to the lowest-scoring practice areas as they represent your biggest constraints
4. Create specific, measurable improvement goals for each practice area

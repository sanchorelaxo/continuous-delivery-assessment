/**
 * Continuous Delivery Maturity Assessment Question Database
 */

const questionDatabase = {
    // 1. Build Management & Continuous Integration
    buildManagement: [
        {
            id: "BM1",
            text: "Version Control Implementation",
            weight: 3,
            options: [
                { text: "No version control system in place", value: -1 },
                { text: "Basic version control system implemented (e.g., Git) with all code and build scripts stored", value: 0 },
                { text: "Version control with branching strategy and automated merges", value: 1 },
                { text: "Advanced version control with feature toggles and trunk-based development", value: 2 },
                { text: "Sophisticated version control with automated compliance and security checks", value: 3 }
            ]
        },
        {
            id: "BM2",
            text: "Build Tool Implementation",
            weight: 3,
            options: [
                { text: "Manual build process", value: -1 },
                { text: "Simple build tool (e.g., Maven, Gradle) implemented to standardize the build process", value: 0 },
                { text: "Build tool with dependency management and artifact versioning", value: 1 },
                { text: "Advanced build configuration with modular builds and caching", value: 2 },
                { text: "Optimized build system with distributed caching and parallel execution", value: 3 }
            ]
        },
        {
            id: "BM3",
            text: "Continuous Integration Server Usage",
            weight: 3,
            options: [
                { text: "No CI server", value: -1 },
                { text: "Basic CI server (e.g., Jenkins) implemented to trigger builds on code commits", value: 0 },
                { text: "CI server with automated test execution and reporting", value: 1 },
                { text: "Advanced CI with quality gates and deployment pipelines", value: 2 },
                { text: "Fully automated CI/CD pipeline with canary deployments", value: 3 }
            ]
        },
        {
            id: "BM4",
            text: "Automated Testing Implementation",
            weight: 3,
            options: [
                { text: "Manual testing only", value: -1 },
                { text: "Minimal set of automated unit tests running during builds for quick feedback", value: 0 },
                { text: "Comprehensive test suite with unit and integration tests", value: 1 },
                { text: "Advanced testing with performance and security automated tests", value: 2 },
                { text: "Full test automation with AI-powered test generation", value: 3 }
            ]
        },
        {
            id: "BM5",
            text: "Team Collaboration and Integration Practices",
            weight: 3,
            options: [
                { text: "Infrequent code commits and integration", value: -1 },
                { text: "Team trained on committing code frequently (at least daily) to encourage integration", value: 0 },
                { text: "Regular code reviews and pair programming practices", value: 1 },
                { text: "Advanced collaboration with inner source practices", value: 2 },
                { text: "High-performing team with continuous knowledge sharing", value: 3 }
            ]
        },
        {
            id: "BM6",
            text: "Build Replication and Automation",
            weight: 3,
            options: [
                { text: "Builds cannot be replicated consistently", value: -1 },
                { text: "Any build can be automatically replicated from the source code using this process", value: 0 },
                { text: "Reproducible builds with deterministic outputs", value: 1 },
                { text: "Immutable builds with full artifact provenance", value: 2 },
                { text: "Self-healing build system with automatic optimization", value: 3 }
            ]
        }
    ],

    // 2. Environments & Provisioning
    environments: [
        {
            id: "ENV1",
            text: "Environment Provisioning",
            weight: 3,
            options: [
                { text: "Manual environment setup with no documentation", value: -1 },
                { text: "Basic scripted environment setup with documentation", value: 0 },
                { text: "Automated environment provisioning with configuration management", value: 1 },
                { text: "Infrastructure as Code with version-controlled templates", value: 2 },
                { text: "Self-service environment provisioning with compliance checks", value: 3 }
            ]
        },
        {
            id: "ENV2",
            text: "Environment Consistency",
            weight: 3,
            options: [
                { text: "Environments differ significantly", value: -1 },
                { text: "Production-like environments with documented differences", value: 0 },
                { text: "Consistent environments with automated configuration", value: 1 },
                { text: "Immutable infrastructure with container orchestration", value: 2 },
                { text: "Dynamic scaling with automated environment optimization", value: 3 }
            ]
        },
        {
            id: "ENV3",
            text: "Environment Access Control",
            weight: 3,
            options: [
                { text: "No access control", value: -1 },
                { text: "Basic role-based access control", value: 0 },
                { text: "Automated access management with audit trails", value: 1 },
                { text: "Fine-grained access control with temporary credentials", value: 2 },
                { text: "Zero-trust security model with automated compliance", value: 3 }
            ]
        }
    ],

    // 3. Release Management & Compliance
    releaseManagement: [
        {
            id: "RM1",
            text: "Release Process",
            weight: 3,
            options: [
                { text: "Manual, undocumented releases", value: -1 },
                { text: "Documented release process with basic automation", value: 0 },
                { text: "Automated release pipeline with approvals", value: 1 },
                { text: "Continuous deployment with automated rollbacks", value: 2 },
                { text: "Progressive delivery with feature flags and A/B testing", value: 3 }
            ]
        },
        {
            id: "RM2",
            text: "Compliance and Auditing",
            weight: 3,
            options: [
                { text: "No compliance tracking", value: -1 },
                { text: "Basic compliance documentation and manual audits", value: 0 },
                { text: "Automated compliance checks in pipeline", value: 1 },
                { text: "Continuous compliance monitoring with automated reporting", value: 2 },
                { text: "AI-driven compliance with predictive risk analysis", value: 3 }
            ]
        }
    ],

    // 4. Testing
    testing: [
        {
            id: "TEST1",
            text: "Test Automation",
            weight: 3,
            options: [
                { text: "Manual testing only", value: -1 },
                { text: "Basic automated unit tests", value: 0 },
                { text: "Comprehensive test automation suite", value: 1 },
                { text: "Advanced testing with performance and security", value: 2 },
                { text: "AI-powered testing with automatic test generation", value: 3 }
            ]
        },
        {
            id: "TEST2",
            text: "Test Environment Management",
            weight: 3,
            options: [
                { text: "No dedicated test environments", value: -1 },
                { text: "Basic test environments with manual setup", value: 0 },
                { text: "Automated test environment provisioning", value: 1 },
                { text: "On-demand test environments with data management", value: 2 },
                { text: "Self-healing test environments with monitoring", value: 3 }
            ]
        }
    ],

    // 5. Data Management
    dataManagement: [
        {
            id: "DATA1",
            text: "Database Change Management",
            weight: 3,
            options: [
                { text: "Manual database changes", value: -1 },
                { text: "Version-controlled database scripts", value: 0 },
                { text: "Automated database migrations", value: 1 },
                { text: "Zero-downtime database updates", value: 2 },
                { text: "Automated schema evolution with backwards compatibility", value: 3 }
            ]
        },
        {
            id: "DATA2",
            text: "Data Security and Privacy",
            weight: 3,
            options: [
                { text: "No data security measures", value: -1 },
                { text: "Basic data encryption and access controls", value: 0 },
                { text: "Comprehensive data security with monitoring", value: 1 },
                { text: "Advanced data protection with audit trails", value: 2 },
                { text: "Zero-trust data access with automated compliance", value: 3 }
            ]
        }
    ],

    // 6. Configuration Management
    configurationManagement: [
        {
            id: "CM1",
            text: "Configuration Storage",
            weight: 3,
            options: [
                { text: "Hardcoded configuration", value: -1 },
                { text: "External configuration files in version control", value: 0 },
                { text: "Centralized configuration management", value: 1 },
                { text: "Dynamic configuration with feature flags", value: 2 },
                { text: "AI-driven configuration optimization", value: 3 }
            ]
        },
        {
            id: "CM2",
            text: "Secret Management",
            weight: 3,
            options: [
                { text: "Secrets in plain text", value: -1 },
                { text: "Basic secret management with encryption", value: 0 },
                { text: "Centralized secret management service", value: 1 },
                { text: "Dynamic secrets with automatic rotation", value: 2 },
                { text: "Zero-trust secrets management", value: 3 }
            ]
        }
    ],

    // 7. Application Architecture
    application: [
        {
            id: "APP1",
            text: "Application Architecture",
            weight: 3,
            options: [
                { text: "Monolithic architecture", value: -1 },
                { text: "Basic modular architecture", value: 0 },
                { text: "Microservices architecture", value: 1 },
                { text: "Cloud-native architecture", value: 2 },
                { text: "Self-healing, adaptive architecture", value: 3 }
            ]
        },
        {
            id: "APP2",
            text: "Deployment Independence",
            weight: 3,
            options: [
                { text: "Coupled deployments", value: -1 },
                { text: "Basic deployment isolation", value: 0 },
                { text: "Independent service deployments", value: 1 },
                { text: "Zero-downtime deployments", value: 2 },
                { text: "Autonomous service lifecycle", value: 3 }
            ]
        }
    ],

    // 8. Observability
    observability: [
        {
            id: "OBS1",
            text: "Monitoring and Alerting",
            weight: 3,
            options: [
                { text: "No monitoring in place", value: -1 },
                { text: "Basic system monitoring and alerts", value: 0 },
                { text: "Comprehensive monitoring with SLOs", value: 1 },
                { text: "Advanced observability with tracing", value: 2 },
                { text: "AI-powered observability and prediction", value: 3 }
            ]
        },
        {
            id: "OBS2",
            text: "Logging and Debugging",
            weight: 3,
            options: [
                { text: "No centralized logging", value: -1 },
                { text: "Basic centralized logging", value: 0 },
                { text: "Structured logging with search", value: 1 },
                { text: "Distributed tracing and profiling", value: 2 },
                { text: "AI-assisted debugging and root cause analysis", value: 3 }
            ]
        }
    ]
};

// Export the question database for use in the assessment
if (typeof module !== 'undefined') {
    module.exports = { questionDatabase };
}

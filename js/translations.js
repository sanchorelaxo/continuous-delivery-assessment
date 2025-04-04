window.translations = {
    ui: {
        en_CA: {
            calculateResults: "Calculate Results",
            exportCsv: "Export as CSV",
            restart: "Start Over",
            legend: "Legend",
            initial: "Initial",
            managed: "Managed",
            defined: "Defined",
            measured: "Measured",
            optimizing: "Optimizing",
            resultsTitle: "Assessment Results",
            overallMaturity: "Overall Maturity Level",
            practiceAreaMaturity: "Practice Area Maturity",
            maturityRadar: "Maturity Radar",
            recommendedActions: "Recommended Actions",
            needsImprovement: "Needs Immediate Attention",
            developing: "Areas for Development",
            strong: "Strong Areas",
            nextSteps: "Next Steps",
            standard: "Standard",
            important: "Important",
            critical: "Critical",
            normalWeight: "Normal weight",
            doubleWeight: "Double weight",
            tripleWeight: "Triple weight",
            practiceAreas: "Practice Areas",
            scrollToTop: "Top",
            questionWeight: "Question Weight",
            progressLabel: "Assessment Progress",
            shareResults: "Share these results with your team and stakeholders",
            createRoadmap: "Create an improvement roadmap focusing on the lowest maturity areas",
            setGoals: "Set specific, measurable goals for each practice area",
            reassess: "Reassess your maturity in 3-6 months to track progress",
            maturityLevel: "Maturity Level",
            level: "Level",
            recommendationPrefix: "Your organization is at the",
            maturityLevelSuffix: "level of continuous delivery maturity",
            recommendationInitial: "Focus on establishing basic automation and standardizing your processes.",
            recommendationManaged: "Focus on improving reliability and consistency across your delivery pipeline.",
            recommendationDefined: "Focus on enhancing monitoring, metrics, and feedback loops.",
            recommendationMeasured: "Focus on optimization and predictive capabilities.",
            recommendationOptimizing: "Focus on innovation and maintaining your excellent practices."
        },
        fr_CA: {
            calculateResults: "Calculer les Résultats",
            exportCsv: "Exporter en CSV",
            restart: "Recommencer",
            legend: "Légende",
            initial: "Initial",
            managed: "Géré",
            defined: "Défini",
            measured: "Mesuré",
            optimizing: "Optimisé",
            resultsTitle: "Résultats de l'Évaluation",
            overallMaturity: "Niveau de Maturité Global",
            practiceAreaMaturity: "Maturité par Domaine de Pratique",
            maturityRadar: "Radar de Maturité",
            recommendedActions: "Actions Recommandées",
            needsImprovement: "Nécessite une Attention Immédiate",
            developing: "Domaines à Développer",
            strong: "Points Forts",
            nextSteps: "Prochaines Étapes",
            standard: "Standard",
            important: "Important",
            critical: "Critique",
            normalWeight: "Poids normal",
            doubleWeight: "Poids double",
            tripleWeight: "Poids triple",
            practiceAreas: "Domaines de Pratique",
            scrollToTop: "Haut",
            questionWeight: "Poids de la Question",
            progressLabel: "Progression de l'évaluation",
            shareResults: "Partagez ces résultats avec votre équipe et vos parties prenantes",
            createRoadmap: "Créez une feuille de route d'amélioration en vous concentrant sur les domaines les moins matures",
            setGoals: "Définissez des objectifs spécifiques et mesurables pour chaque domaine de pratique",
            reassess: "Réévaluez votre maturité dans 3 à 6 mois pour suivre les progrès",
            maturityLevel: "Niveau de Maturité",
            level: "Niveau",
            recommendationPrefix: "Votre organisation est au",
            maturityLevelSuffix: "de maturité en livraison continue",
            recommendationInitial: "Concentrez-vous sur la mise en place d'une automatisation de base et la standardisation de vos processus.",
            recommendationManaged: "Concentrez-vous sur l'amélioration de la fiabilité et de la cohérence de votre pipeline de livraison.",
            recommendationDefined: "Concentrez-vous sur l'amélioration de la surveillance, des métriques et des boucles de rétroaction.",
            recommendationMeasured: "Concentrez-vous sur l'optimisation et les capacités prédictives.",
            recommendationOptimizing: "Concentrez-vous sur l'innovation et le maintien de vos excellentes pratiques."
        }
    },
    questionDatabase: {
        buildManagement: [
            {
                id: "BM1",
                text: "Version Control Implementation",
                weight: 3,
                options: [
                    { text: "No version control system in place", value: -1 },
                    { text: "Basic version control (e.g., Git) with code and scripts stored", value: 0 },
                    { text: "Version control with branching strategy and automated merges", value: 1 },
                    { text: "Advanced version control with feature toggles", value: 2 },
                    { text: "Sophisticated version control with automated compliance", value: 3 }
                ]
            },
            {
                id: "BM2",
                text: "Build Tool Implementation",
                weight: 3,
                options: [
                    { text: "Manual build process", value: -1 },
                    { text: "Simple build tool implemented", value: 0 },
                    { text: "Build tool with dependency management", value: 1 },
                    { text: "Advanced build configuration with caching", value: 2 },
                    { text: "Optimized build system with parallel execution", value: 3 }
                ]
            },
            {
                id: "BM3",
                text: "Continuous Integration Server Usage",
                weight: 3,
                options: [
                    { text: "No CI server", value: -1 },
                    { text: "Basic CI server implementation", value: 0 },
                    { text: "CI server with automated tests", value: 1 },
                    { text: "Advanced CI with quality gates", value: 2 },
                    { text: "Fully automated CI/CD pipeline", value: 3 }
                ]
            },
            {
                id: "BM4",
                text: "Build Automation Level",
                weight: 3,
                options: [
                    { text: "Manual build steps", value: -1 },
                    { text: "Basic automated build scripts", value: 0 },
                    { text: "Automated builds with dependencies", value: 1 },
                    { text: "Fully automated builds with optimization", value: 2 },
                    { text: "Self-healing build system with AI", value: 3 }
                ]
            },
            {
                id: "BM5",
                text: "Build Performance Monitoring",
                weight: 3,
                options: [
                    { text: "No performance monitoring", value: -1 },
                    { text: "Basic build metrics", value: 0 },
                    { text: "Comprehensive performance monitoring", value: 1 },
                    { text: "Advanced performance analytics", value: 2 },
                    { text: "Predictive performance optimization", value: 3 }
                ]
            },
            {
                id: "BM6",
                text: "Build Replication",
                weight: 3,
                options: [
                    { text: "Builds cannot be replicated", value: -1 },
                    { text: "Basic build replication", value: 0 },
                    { text: "Reproducible builds with deterministic results", value: 1 },
                    { text: "Immutable builds with full traceability", value: 2 },
                    { text: "Self-optimizing build system", value: 3 }
                ]
            }
        ],
        environments: [
            {
                id: "ENV1",
                text: "Environment Provisioning",
                weight: 3,
                options: [
                    { text: "Manual configuration without documentation", value: -1 },
                    { text: "Basic scripted configuration with docs", value: 0 },
                    { text: "Automated provisioning with config management", value: 1 },
                    { text: "Infrastructure as Code with versioned templates", value: 2 },
                    { text: "Self-service provisioning with governance", value: 3 }
                ]
            },
            {
                id: "ENV2",
                text: "Environment Consistency",
                weight: 3,
                options: [
                    { text: "Environments significantly differ", value: -1 },
                    { text: "Similar environments with documented differences", value: 0 },
                    { text: "Consistent environments with automated config", value: 1 },
                    { text: "Immutable infrastructure with orchestration", value: 2 },
                    { text: "Dynamic scaling with optimization", value: 3 }
                ]
            },
            {
                id: "ENV3",
                text: "Environment Access Control",
                weight: 3,
                options: [
                    { text: "No access control", value: -1 },
                    { text: "Basic role-based access control", value: 0 },
                    { text: "Automated access management with audit", value: 1 },
                    { text: "Fine-grained access with temporary credentials", value: 2 },
                    { text: "Zero-trust security model with compliance", value: 3 }
                ]
            },
            {
                id: "ENV4",
                text: "Cloud Integration",
                weight: 3,
                options: [
                    { text: "No cloud infrastructure", value: -1 },
                    { text: "Basic cloud service usage", value: 0 },
                    { text: "Multi-cloud strategy with auto-provisioning", value: 1 },
                    { text: "Cloud-native with serverless components", value: 2 },
                    { text: "Advanced cloud optimization with cost mgmt", value: 3 }
                ]
            },
            {
                id: "ENV5",
                text: "Disaster Recovery",
                weight: 3,
                options: [
                    { text: "No recovery plan", value: -1 },
                    { text: "Basic backup and restore procedures", value: 0 },
                    { text: "Automated backup with regular testing", value: 1 },
                    { text: "Multi-region failover with minimal loss", value: 2 },
                    { text: "Zero-downtime recovery with auto-failover", value: 3 }
                ]
            },
            {
                id: "ENV6",
                text: "Environment Monitoring",
                weight: 3,
                options: [
                    { text: "No monitoring", value: -1 },
                    { text: "Basic system monitoring and alerts", value: 0 },
                    { text: "Comprehensive monitoring with dashboards", value: 1 },
                    { text: "Predictive monitoring with auto-scaling", value: 2 },
                    { text: "AI-powered monitoring with self-healing", value: 3 }
                ]
            }
        ],
        releaseManagement: [
            {
                id: "RM1",
                text: "Release Process",
                weight: 3,
                options: [
                    { text: "Manual undocumented releases", value: -1 },
                    { text: "Documented process with basic automation", value: 0 },
                    { text: "Automated release pipeline with approvals", value: 1 },
                    { text: "Continuous deployment with auto-rollback", value: 2 },
                    { text: "Progressive delivery with A/B testing", value: 3 }
                ]
            },
            {
                id: "RM2",
                text: "Compliance and Audit",
                weight: 3,
                options: [
                    { text: "No compliance tracking", value: -1 },
                    { text: "Manual compliance documentation and audits", value: 0 },
                    { text: "Automated compliance checks", value: 1 },
                    { text: "Continuous monitoring with automated reports", value: 2 },
                    { text: "AI compliance with predictive risk analysis", value: 3 }
                ]
            },
            {
                id: "RM3",
                text: "Release Planning",
                weight: 3,
                options: [
                    { text: "No release planning", value: -1 },
                    { text: "Basic planning with manual coordination", value: 0 },
                    { text: "Automated planning with dependencies", value: 1 },
                    { text: "Advanced orchestration with analytics", value: 2 },
                    { text: "AI-powered release optimization", value: 3 }
                ]
            },
            {
                id: "RM4",
                text: "Change Management",
                weight: 3,
                options: [
                    { text: "No change management process", value: -1 },
                    { text: "Basic change tracking and approvals", value: 0 },
                    { text: "Automated change management workflow", value: 1 },
                    { text: "Risk-based change management", value: 2 },
                    { text: "AI-driven change impact analysis", value: 3 }
                ]
            },
            {
                id: "RM5",
                text: "Release Validation",
                weight: 3,
                options: [
                    { text: "No release validation", value: -1 },
                    { text: "Basic smoke tests post-deployment", value: 0 },
                    { text: "Automated validation suite with monitoring", value: 1 },
                    { text: "Advanced validation with synthetic monitoring", value: 2 },
                    { text: "AI-powered release quality assessment", value: 3 }
                ]
            },
            {
                id: "RM6",
                text: "Release Documentation",
                weight: 3,
                options: [
                    { text: "No release documentation", value: -1 },
                    { text: "Basic release notes and logs", value: 0 },
                    { text: "Automated documentation generation", value: 1 },
                    { text: "Comprehensive docs with metrics", value: 2 },
                    { text: "AI-assisted docs with impact analysis", value: 3 }
                ]
            }
        ],
        testing: [
            {
                id: "TEST1",
                text: "Test Automation",
                weight: 3,
                options: [
                    { text: "Manual testing only", value: -1 },
                    { text: "Basic automated unit tests", value: 0 },
                    { text: "Comprehensive automated test suite", value: 1 },
                    { text: "Advanced testing with perf and security", value: 2 },
                    { text: "AI testing with auto-generation", value: 3 }
                ]
            },
            {
                id: "TEST2",
                text: "Test Environment Management",
                weight: 3,
                options: [
                    { text: "No dedicated test environments", value: -1 },
                    { text: "Basic test environments with manual config", value: 0 },
                    { text: "Automated test environment provisioning", value: 1 },
                    { text: "On-demand environments with data management", value: 2 },
                    { text: "Self-healing environments with monitoring", value: 3 }
                ]
            },
            {
                id: "TEST3",
                text: "Test Data Management",
                weight: 3,
                options: [
                    { text: "No test data management", value: -1 },
                    { text: "Test datasets with manual refresh", value: 0 },
                    { text: "Automated data generation and cleanup", value: 1 },
                    { text: "Advanced test data versioning", value: 2 },
                    { text: "AI-powered test data generation", value: 3 }
                ]
            },
            {
                id: "TEST4",
                text: "Performance Testing",
                weight: 3,
                options: [
                    { text: "No performance testing", value: -1 },
                    { text: "Basic load testing for critical paths", value: 0 },
                    { text: "Regular performance tests with benchmarks", value: 1 },
                    { text: "Continuous performance monitoring", value: 2 },
                    { text: "AI-driven performance optimization", value: 3 }
                ]
            },
            {
                id: "TEST5",
                text: "Security Testing",
                weight: 3,
                options: [
                    { text: "No security testing", value: -1 },
                    { text: "Basic security scans and vulnerability checks", value: 0 },
                    { text: "Regular security testing with compliance", value: 1 },
                    { text: "Continuous security testing with modeling", value: 2 },
                    { text: "AI-assisted security testing", value: 3 }
                ]
            },
            {
                id: "TEST6",
                text: "Test Coverage",
                weight: 3,
                options: [
                    { text: "No coverage metrics", value: -1 },
                    { text: "Basic code coverage tracking", value: 0 },
                    { text: "Full coverage with quality gates", value: 1 },
                    { text: "Advanced coverage with mutation testing", value: 2 },
                    { text: "AI-optimized test coverage", value: 3 }
                ]
            }
        ],
        dataManagement: [
            {
                id: "DATA1",
                text: "Database Change Management",
                weight: 3,
                options: [
                    { text: "Manual database changes", value: -1 },
                    { text: "Versioned database scripts", value: 0 },
                    { text: "Automated database migrations", value: 1 },
                    { text: "Zero-downtime updates", value: 2 },
                    { text: "Automated schema evolution", value: 3 }
                ]
            },
            {
                id: "DATA2",
                text: "Data Security and Privacy",
                weight: 3,
                options: [
                    { text: "No data security measures", value: -1 },
                    { text: "Basic encryption and access controls", value: 0 },
                    { text: "Comprehensive security with monitoring", value: 1 },
                    { text: "Advanced protection with audit trails", value: 2 },
                    { text: "Zero-trust access with automated compliance", value: 3 }
                ]
            },
            {
                id: "DATA3",
                text: "Backup Strategy",
                weight: 3,
                options: [
                    { text: "No backup strategy", value: -1 },
                    { text: "Basic periodic backups", value: 0 },
                    { text: "Automated backup with retention policies", value: 1 },
                    { text: "Point-in-time recovery with geo-replication", value: 2 },
                    { text: "Zero-loss architecture with instant recovery", value: 3 }
                ]
            },
            {
                id: "DATA4",
                text: "Data Migration",
                weight: 3,
                options: [
                    { text: "No migration process", value: -1 },
                    { text: "Manual migration with basic validation", value: 0 },
                    { text: "Automated migration with verification", value: 1 },
                    { text: "Zero-downtime migration", value: 2 },
                    { text: "AI-optimized migrations", value: 3 }
                ]
            },
            {
                id: "DATA5",
                text: "Data Quality Management",
                weight: 3,
                options: [
                    { text: "No quality controls", value: -1 },
                    { text: "Basic validation rules", value: 0 },
                    { text: "Automated quality checks", value: 1 },
                    { text: "Proactive quality monitoring", value: 2 },
                    { text: "AI-driven quality optimization", value: 3 }
                ]
            },
            {
                id: "DATA6",
                text: "Data Governance",
                weight: 3,
                options: [
                    { text: "No data governance", value: -1 },
                    { text: "Basic policies and procedures", value: 0 },
                    { text: "Comprehensive governance framework", value: 1 },
                    { text: "Automated policy enforcement", value: 2 },
                    { text: "AI-assisted governance", value: 3 }
                ]
            }
        ],
        configurationManagement: [
            {
                id: "CM1",
                text: "Configuration Storage",
                weight: 3,
                options: [
                    { text: "Hardcoded configuration", value: -1 },
                    { text: "Versioned external config files", value: 0 },
                    { text: "Centralized configuration management", value: 1 },
                    { text: "Dynamic configuration with feature flags", value: 2 },
                    { text: "AI-optimized configuration", value: 3 }
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
            },
            {
                id: "CM3",
                text: "Environment Configuration",
                weight: 3,
                options: [
                    { text: "No environment-specific configuration", value: -1 },
                    { text: "Basic environment variables", value: 0 },
                    { text: "Environment-specific configuration files", value: 1 },
                    { text: "Dynamic environment configuration", value: 2 },
                    { text: "AI-powered environment optimization", value: 3 }
                ]
            },
            {
                id: "CM4",
                text: "Configuration Validation",
                weight: 3,
                options: [
                    { text: "No configuration validation", value: -1 },
                    { text: "Basic syntax validation", value: 0 },
                    { text: "Schema-based configuration validation", value: 1 },
                    { text: "Runtime configuration validation", value: 2 },
                    { text: "AI-assisted configuration validation", value: 3 }
                ]
            },
            {
                id: "CM5",
                text: "Configuration Version Control",
                weight: 3,
                options: [
                    { text: "No version control for configuration", value: -1 },
                    { text: "Basic version control integration", value: 0 },
                    { text: "Configuration change tracking", value: 1 },
                    { text: "Configuration versioning with rollback", value: 2 },
                    { text: "Advanced configuration version management", value: 3 }
                ]
            },
            {
                id: "CM6",
                text: "Configuration Distribution",
                weight: 3,
                options: [
                    { text: "Manual configuration distribution", value: -1 },
                    { text: "Basic automated distribution", value: 0 },
                    { text: "Centralized configuration distribution", value: 1 },
                    { text: "Real-time configuration updates", value: 2 },
                    { text: "Zero-downtime configuration updates", value: 3 }
                ]
            }
        ],
        applicationArchitecture: [
            {
                id: "APP1",
                text: "Application Architecture",
                weight: 3,
                options: [
                    { text: "Monolithic architecture", value: -1 },
                    { text: "Basic modular architecture", value: 0 },
                    { text: "Microservices architecture", value: 1 },
                    { text: "Cloud-native architecture", value: 2 },
                    { text: "Self-adapting architecture", value: 3 }
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
            },
            {
                id: "APP3",
                text: "API Design",
                weight: 3,
                options: [
                    { text: "No API standards", value: -1 },
                    { text: "Basic API documentation", value: 0 },
                    { text: "RESTful API design principles", value: 1 },
                    { text: "API versioning and backward compatibility", value: 2 },
                    { text: "API-first design with contract testing", value: 3 }
                ]
            },
            {
                id: "APP4",
                text: "Scalability",
                weight: 3,
                options: [
                    { text: "No scalability considerations", value: -1 },
                    { text: "Basic vertical scaling", value: 0 },
                    { text: "Horizontal scaling with load balancing", value: 1 },
                    { text: "Auto-scaling with performance optimization", value: 2 },
                    { text: "Predictive scaling with AI/ML", value: 3 }
                ]
            },
            {
                id: "APP5",
                text: "Resilience",
                weight: 3,
                options: [
                    { text: "No resilience patterns", value: -1 },
                    { text: "Basic error handling", value: 0 },
                    { text: "Circuit breakers and fallbacks", value: 1 },
                    { text: "Advanced resilience patterns", value: 2 },
                    { text: "Self-healing architecture", value: 3 }
                ]
            },
            {
                id: "APP6",
                text: "Technical Debt",
                weight: 3,
                options: [
                    { text: "Unmanaged technical debt", value: -1 },
                    { text: "Basic technical debt tracking", value: 0 },
                    { text: "Regular technical debt reduction", value: 1 },
                    { text: "Proactive technical debt management", value: 2 },
                    { text: "Zero technical debt architecture", value: 3 }
                ]
            }
        ],
        observability: [
            {
                id: "OBS1",
                text: "Monitoring and Alerting",
                weight: 3,
                options: [
                    { text: "No monitoring in place", value: -1 },
                    { text: "Basic system monitoring and alerts", value: 0 },
                    { text: "Comprehensive monitoring with SLOs", value: 1 },
                    { text: "Advanced monitoring with anomaly detection", value: 2 },
                    { text: "AI-powered predictive monitoring", value: 3 }
                ]
            },
            {
                id: "OBS2",
                text: "Logging",
                weight: 3,
                options: [
                    { text: "No centralized logging", value: -1 },
                    { text: "Basic application logging", value: 0 },
                    { text: "Centralized log aggregation", value: 1 },
                    { text: "Advanced log analysis and correlation", value: 2 },
                    { text: "AI-powered log analytics", value: 3 }
                ]
            },
            {
                id: "OBS3",
                text: "Tracing",
                weight: 3,
                options: [
                    { text: "No request tracing", value: -1 },
                    { text: "Basic request tracking", value: 0 },
                    { text: "Distributed tracing implementation", value: 1 },
                    { text: "Advanced tracing with context propagation", value: 2 },
                    { text: "AI-assisted trace analysis", value: 3 }
                ]
            },
            {
                id: "OBS4",
                text: "Metrics",
                weight: 3,
                options: [
                    { text: "No metrics collection", value: -1 },
                    { text: "Basic performance metrics", value: 0 },
                    { text: "Comprehensive metrics with dashboards", value: 1 },
                    { text: "Advanced metrics with business KPIs", value: 2 },
                    { text: "AI-driven metrics analysis", value: 3 }
                ]
            },
            {
                id: "OBS5",
                text: "Debugging",
                weight: 3,
                options: [
                    { text: "Manual debugging only", value: -1 },
                    { text: "Basic debugging tools", value: 0 },
                    { text: "Remote debugging capabilities", value: 1 },
                    { text: "Advanced debugging with profiling", value: 2 },
                    { text: "AI-assisted debugging", value: 3 }
                ]
            },
            {
                id: "OBS6",
                text: "Incident Management",
                weight: 3,
                options: [
                    { text: "No incident management process", value: -1 },
                    { text: "Basic incident tracking", value: 0 },
                    { text: "Structured incident response", value: 1 },
                    { text: "Advanced incident analysis", value: 2 },
                    { text: "AI-powered incident prevention", value: 3 }
                ]
            }
        ]
    },
    questions: {
        fr_CA: {
            buildManagement: {
                BM1: {
                    text: "Implémentation du Contrôle de Version",
                    options: [
                        "Aucun système de contrôle de version en place",
                        "Système de contrôle de version de base (ex: Git) avec code et scripts stockés",
                        "Contrôle de version avec stratégie de branches et fusions automatisées",
                        "Contrôle de version avancé avec bascules de fonctionnalités",
                        "Contrôle de version sophistiqué avec vérifications automatisées"
                    ]
                },
                BM2: {
                    text: "Implémentation de l'Outil de Build",
                    options: [
                        "Processus de build manuel",
                        "Outil de build simple pour standardiser le processus",
                        "Outil de build avec gestion des dépendances",
                        "Configuration de build avancée avec builds modulaires",
                        "Système de build optimisé avec cache distribué"
                    ]
                },
                BM3: {
                    text: "Utilisation du Serveur d'Intégration Continue",
                    options: [
                        "Pas de serveur d'IC",
                        "Serveur d'IC de base pour déclencher les builds",
                        "Serveur d'IC avec exécution et rapports de tests",
                        "IC avancée avec contrôles qualité",
                        "Pipeline CI/CD entièrement automatisé"
                    ]
                },
                BM4: {
                    text: "Niveau d'Automatisation du Build",
                    options: [
                        "Étapes de build manuelles",
                        "Scripts de build de base",
                        "Builds automatisés avec gestion des dépendances",
                        "Builds entièrement automatisés avec optimisation",
                        "Système de build auto-réparant avec optimisation IA"
                    ]
                },
                BM5: {
                    text: "Surveillance des Performances du Build",
                    options: [
                        "Aucune surveillance des performances",
                        "Métriques de build de base",
                        "Surveillance complète des performances",
                        "Analyse avancée des performances",
                        "Optimisation prédictive des performances"
                    ]
                },
                BM6: {
                    text: "Réplication et Automatisation du Build",
                    options: [
                        "Les builds ne peuvent pas être répliqués",
                        "Réplication automatique basique des builds",
                        "Builds reproductibles avec résultats déterministes",
                        "Builds immuables avec traçabilité complète",
                        "Système de build auto-optimisant"
                    ]
                }
            },
            environments: {
                ENV1: {
                    text: "Provisionnement des Environnements",
                    options: [
                        "Configuration manuelle sans documentation",
                        "Configuration scriptée de base avec documentation",
                        "Provisionnement automatisé avec gestion de config",
                        "Infrastructure as Code avec templates versionnés",
                        "Provisionnement en libre-service avec contrôles"
                    ]
                },
                ENV2: {
                    text: "Cohérence des Environnements",
                    options: [
                        "Les environnements diffèrent significativement",
                        "Environnements similaires avec différences documentées",
                        "Environnements cohérents avec config automatisée",
                        "Infrastructure immuable avec orchestration",
                        "Mise à l'échelle dynamique avec optimisation"
                    ]
                },
                ENV3: {
                    text: "Contrôle d'Accès aux Environnements",
                    options: [
                        "Aucun contrôle d'accès",
                        "Contrôle d'accès basé sur les rôles de base",
                        "Gestion automatisée des accès avec audit",
                        "Contrôle d'accès fin avec identifiants temporaires",
                        "Modèle de sécurité Zero-Trust avec conformité"
                    ]
                },
                ENV4: {
                    text: "Intégration Cloud",
                    options: [
                        "Pas d'infrastructure cloud",
                        "Utilisation basique des services cloud",
                        "Stratégie multi-cloud avec provisionnement auto",
                        "Architecture cloud-native avec composants serverless",
                        "Optimisation cloud avancée avec gestion des coûts"
                    ]
                },
                ENV5: {
                    text: "Reprise après Sinistre",
                    options: [
                        "Aucun plan de reprise",
                        "Procédures basiques de sauvegarde et restauration",
                        "Sauvegarde automatisée avec tests réguliers",
                        "Basculement multi-région avec perte minimale",
                        "Reprise sans interruption avec basculement auto"
                    ]
                },
                ENV6: {
                    text: "Surveillance des Environnements",
                    options: [
                        "Aucune surveillance",
                        "Surveillance système et alertes de base",
                        "Surveillance complète avec tableaux de bord",
                        "Surveillance prédictive avec mise à l'échelle auto",
                        "Surveillance IA avec capacités d'auto-réparation"
                    ]
                }
            },
            releaseManagement: {
                RM1: {
                    text: "Processus de Release",
                    options: [
                        "Releases manuelles non documentées",
                        "Processus documenté avec automatisation basique",
                        "Pipeline de release automatisé avec approbations",
                        "Déploiement continu avec rollbacks automatisés",
                        "Livraison progressive avec tests A/B"
                    ]
                },
                RM2: {
                    text: "Conformité et Audit",
                    options: [
                        "Aucun suivi de conformité",
                        "Documentation de conformité et audits manuels",
                        "Vérifications de conformité automatisées",
                        "Surveillance continue avec rapports automatisés",
                        "Conformité IA avec analyse prédictive des risques"
                    ]
                },
                RM3: {
                    text: "Planification des Releases",
                    options: [
                        "Aucune planification de release",
                        "Planning basique avec coordination manuelle",
                        "Planification automatisée avec dépendances",
                        "Orchestration avancée avec analytique",
                        "Optimisation IA des releases"
                    ]
                },
                RM4: {
                    text: "Gestion des Changements",
                    options: [
                        "Aucun processus de gestion des changements",
                        "Suivi basique des changements et approbations",
                        "Workflow automatisé de gestion des changements",
                        "Gestion des changements basée sur les risques",
                        "Analyse d'impact IA des changements"
                    ]
                },
                RM5: {
                    text: "Validation des Releases",
                    options: [
                        "Aucune validation des releases",
                        "Tests de fumée basiques après déploiement",
                        "Suite de validation automatisée avec monitoring",
                        "Validation avancée avec monitoring synthétique",
                        "Évaluation IA de la qualité des releases"
                    ]
                },
                RM6: {
                    text: "Documentation des Releases",
                    options: [
                        "Aucune documentation des releases",
                        "Notes de version et journaux de base",
                        "Génération automatisée de documentation",
                        "Documentation complète avec métriques",
                        "Documentation assistée par IA avec analyse d'impact"
                    ]
                }
            },
            testing: {
                TEST1: {
                    text: "Automatisation des Tests",
                    options: [
                        "Tests manuels uniquement",
                        "Tests unitaires automatisés de base",
                        "Suite complète de tests automatisés",
                        "Tests avancés avec performance et sécurité",
                        "Tests IA avec génération automatique"
                    ]
                },
                TEST2: {
                    text: "Gestion des Environnements de Test",
                    options: [
                        "Pas d'environnements de test dédiés",
                        "Environnements de test basiques avec config manuelle",
                        "Provisionnement automatisé des env. de test",
                        "Environnements à la demande avec gestion des données",
                        "Environnements auto-réparants avec monitoring"
                    ]
                },
                TEST3: {
                    text: "Gestion des Données de Test",
                    options: [
                        "Pas de gestion des données de test",
                        "Jeux de données de test avec rafraîchissement manuel",
                        "Génération et nettoyage automatisés des données",
                        "Versionnement avancé des données de test",
                        "Génération IA des données de test"
                    ]
                },
                TEST4: {
                    text: "Tests de Performance",
                    options: [
                        "Pas de tests de performance",
                        "Tests de charge basiques pour chemins critiques",
                        "Tests de performance réguliers avec benchmarks",
                        "Monitoring continu des performances",
                        "Optimisation IA des performances"
                    ]
                },
                TEST5: {
                    text: "Tests de Sécurité",
                    options: [
                        "Pas de tests de sécurité",
                        "Scans de sécurité et vulnérabilités de base",
                        "Tests de sécurité réguliers avec conformité",
                        "Tests de sécurité continus avec modélisation",
                        "Tests de sécurité assistés par IA"
                    ]
                },
                TEST6: {
                    text: "Couverture des Tests",
                    options: [
                        "Pas de métriques de couverture",
                        "Suivi basique de la couverture de code",
                        "Couverture complète avec seuils qualité",
                        "Couverture avancée avec tests de mutation",
                        "Optimisation IA de la couverture"
                    ]
                }
            },
            dataManagement: {
                DATA1: {
                    text: "Gestion des Changements de Base de Données",
                    options: [
                        "Changements manuels de base de données",
                        "Scripts de base de données versionnés",
                        "Migrations automatisées de base de données",
                        "Mises à jour sans interruption",
                        "Évolution automatisée des schémas"
                    ]
                },
                DATA2: {
                    text: "Sécurité et Confidentialité des Données",
                    options: [
                        "Aucune mesure de sécurité des données",
                        "Chiffrement de base et contrôles d'accès",
                        "Sécurité complète avec surveillance",
                        "Protection avancée avec pistes d'audit",
                        "Accès Zero-Trust avec conformité automatisée"
                    ]
                },
                DATA3: {
                    text: "Stratégie de Sauvegarde",
                    options: [
                        "Pas de stratégie de sauvegarde",
                        "Sauvegardes périodiques basiques",
                        "Sauvegarde auto avec politiques de rétention",
                        "Récupération ponctuelle avec géo-réplication",
                        "Architecture sans perte avec récup instantanée"
                    ]
                },
                DATA4: {
                    text: "Migration des Données",
                    options: [
                        "Pas de processus de migration",
                        "Migration manuelle avec validation basique",
                        "Migration automatisée avec vérification",
                        "Migration sans interruption",
                        "Optimisation IA des migrations"
                    ]
                },
                DATA5: {
                    text: "Gestion de la Qualité des Données",
                    options: [
                        "Pas de contrôles qualité",
                        "Règles basiques de validation",
                        "Vérifications automatisées de la qualité",
                        "Surveillance proactive de la qualité",
                        "Optimisation IA de la qualité"
                    ]
                },
                DATA6: {
                    text: "Gouvernance des Données",
                    options: [
                        "Pas de gouvernance des données",
                        "Politiques et procédures basiques",
                        "Cadre complet de gouvernance",
                        "Application automatisée des politiques",
                        "Gouvernance assistée par IA"
                    ]
                }
            },
            configurationManagement: {
                CM1: {
                    text: "Stockage de Configuration",
                    options: [
                        "Configuration en dur dans le code",
                        "Fichiers de config externes versionnés",
                        "Gestion centralisée de la configuration",
                        "Configuration dynamique avec bascules",
                        "Optimisation IA de la configuration"
                    ]
                },
                CM2: {
                    text: "Gestion des Secrets",
                    options: [
                        "Secrets en texte clair",
                        "Gestion basique des secrets avec chiffrement",
                        "Service centralisé de gestion des secrets",
                        "Secrets dynamiques avec rotation auto",
                        "Gestion Zero-Trust des secrets"
                    ]
                },
                CM3: {
                    text: "Configuration des Environnements",
                    options: [
                        "Pas de config spécifique aux environnements",
                        "Variables d'environnement basiques",
                        "Fichiers de config par environnement",
                        "Configuration dynamique des environnements",
                        "Optimisation IA des environnements"
                    ]
                },
                CM4: {
                    text: "Validation de la Configuration",
                    options: [
                        "Pas de validation de configuration",
                        "Validation syntaxique basique",
                        "Validation basée sur des schémas",
                        "Validation en temps réel",
                        "Validation assistée par IA"
                    ]
                },
                CM5: {
                    text: "Contrôle de Version de la Configuration",
                    options: [
                        "Pas de contrôle de version pour la config",
                        "Intégration basique du contrôle de version",
                        "Suivi des changements de configuration",
                        "Versionnement avec retour arrière",
                        "Gestion avancée des versions de config"
                    ]
                },
                CM6: {
                    text: "Distribution de la Configuration",
                    options: [
                        "Distribution manuelle de la configuration",
                        "Distribution automatisée basique",
                        "Distribution centralisée de la configuration",
                        "Mises à jour en temps réel",
                        "Mises à jour sans interruption"
                    ]
                }
            },

            observability: {
                OBS1: {
                    text: "Monitoring et Alertes",
                    options: [
                        "Pas de monitoring en place",
                        "Monitoring système et alertes basiques",
                        "Monitoring complet avec SLOs",
                        "Monitoring avancé avec traçage",
                        "Observabilité IA avec prédiction"
                    ]
                },
                OBS2: {
                    text: "Journalisation",
                    options: [
                        "Pas de journalisation centralisée",
                        "Journalisation applicative basique",
                        "Agrégation centralisée des logs",
                        "Analyse avancée et corrélation des logs",
                        "Analytique IA des logs"
                    ]
                },
                OBS3: {
                    text: "Traçage",
                    options: [
                        "Pas de traçage des requêtes",
                        "Suivi basique des requêtes",
                        "Implémentation du traçage distribué",
                        "Traçage avancé avec propagation",
                        "Analyse des traces assistée par IA"
                    ]
                },
                OBS4: {
                    text: "Métriques",
                    options: [
                        "Pas de collecte de métriques",
                        "Métriques de performance basiques",
                        "Métriques complètes avec tableaux de bord",
                        "Métriques avancées avec KPIs métier",
                        "Analyse IA des métriques"
                    ]
                },
                OBS5: {
                    text: "Débogage",
                    options: [
                        "Débogage manuel uniquement",
                        "Outils de débogage basiques",
                        "Capacités de débogage à distance",
                        "Débogage avancé avec profilage",
                        "Débogage assisté par IA"
                    ]
                },
                OBS6: {
                    text: "Gestion des Incidents",
                    options: [
                        "Pas de processus de gestion des incidents",
                        "Suivi basique des incidents",
                        "Réponse structurée aux incidents",
                        "Analyse avancée des incidents",
                        "Prévention des incidents par IA"
                    ]
                }
            }
        },
        en_CA: {
            buildManagement: {
                BM1: {
                    text: "Version Control Implementation",
                    weight: 3,
                    options: [
                        "No version control system in place",
                        "Basic version control system implemented (e.g., Git) with all code and build scripts stored",
                        "Version control with branching strategy and automated merges",
                        "Advanced version control with feature toggles and trunk-based development",
                        "Sophisticated version control with automated compliance and security checks"
                    ]
                },
                BM2: {
                    text: "Build Tool Implementation",
                    weight: 3,
                    options: [
                        "Manual build process",
                        "Simple build tool (e.g., Maven, Gradle) implemented to standardize the build process",
                        "Build tool with dependency management and artifact versioning",
                        "Advanced build configuration with modular builds and caching",
                        "Optimized build system with distributed caching and parallel execution"
                    ]
                },
                BM3: {
                    text: "Continuous Integration Server Usage",
                    weight: 3,
                    options: [
                        "No CI server",
                        "Basic CI server (e.g., Jenkins) implemented to trigger builds on code commits",
                        "CI server with automated test execution and reporting",
                        "Advanced CI with quality gates and deployment pipelines",
                        "Fully automated CI/CD pipeline with canary deployments"
                    ]
                },
                BM4: {
                    text: "Build Automation Level",
                    weight: 2,
                    options: [
                        "Manual build steps",
                        "Basic automated build scripts",
                        "Automated builds with dependency management",
                        "Fully automated builds with optimization",
                        "Self-healing build system with AI/ML optimization"
                    ]
                },
                BM5: {
                    text: "Build Performance Monitoring",
                    weight: 2,
                    options: [
                        "No build performance monitoring",
                        "Basic build time tracking",
                        "Detailed build metrics and trending",
                        "Automated build performance optimization",
                        "Predictive build optimization with ML"
                    ]
                },
                BM6: {
                    text: "Build Security Integration",
                    weight: 2,
                    options: [
                        "No security checks in build",
                        "Basic security scanning",
                        "Automated security testing in pipeline",
                        "Advanced security gates with policy enforcement",
                        "Continuous security monitoring and remediation"
                    ]
                }
            },
            environments: {
                ENV1: {
                    text: "Environment Provisioning",
                    weight: 3,
                    options: [
                        "Manual environment setup with no documentation",
                        "Basic scripted environment setup with documentation",
                        "Automated environment provisioning with configuration management",
                        "Infrastructure as Code with version control",
                        "Self-service environment provisioning with compliance checks"
                    ]
                },
                ENV2: {
                    text: "Environment Consistency",
                    weight: 3,
                    options: [
                        "Inconsistent environments",
                        "Basic environment standardization",
                        "Consistent environments with configuration management",
                        "Immutable infrastructure with versioning",
                        "Self-healing environments with automated recovery"
                    ]
                },
                ENV3: {
                    text: "Environment Scalability",
                    weight: 2,
                    options: [
                        "Manual scaling only",
                        "Basic horizontal scaling",
                        "Automated scaling based on metrics",
                        "Predictive scaling with analytics",
                        "AI-driven dynamic resource optimization"
                    ]
                },
                ENV4: {
                    text: "Cloud Integration",
                    weight: 2,
                    options: [
                        "No cloud usage",
                        "Basic cloud services usage",
                        "Hybrid cloud implementation",
                        "Multi-cloud strategy",
                        "Cloud-native architecture with full automation"
                    ]
                },
                ENV5: {
                    text: "Disaster Recovery",
                    weight: 3,
                    options: [
                        "No disaster recovery plan",
                        "Basic backup and restore procedures",
                        "Automated backup with regular testing",
                        "Full DR automation with failover testing",
                        "Zero-downtime DR with geographic redundancy"
                    ]
                },
                ENV6: {
                    text: "Environment Security",
                    weight: 3,
                    options: [
                        "Basic security controls",
                        "Standard security practices",
                        "Automated security controls",
                        "Advanced security with continuous monitoring",
                        "Zero-trust security model with full automation"
                    ]
                }
            },
            releaseManagement: {
                RM1: {
                    text: "Deployment Process",
                    weight: 3,
                    options: [
                        "Manual, undocumented deployments",
                        "Basic documented deployment procedures",
                        "Automated deployment scripts with rollback capability",
                        "Fully automated deployment pipeline with staging",
                        "Zero-downtime deployments with automated verification"
                    ]
                },
                RM2: {
                    text: "Release Planning",
                    weight: 3,
                    options: [
                        "Ad-hoc releases without planning",
                        "Basic release schedule with manual coordination",
                        "Planned releases with change management",
                        "Automated release planning and tracking",
                        "Continuous delivery with automated release notes"
                    ]
                },
                RM3: {
                    text: "Compliance and Governance",
                    weight: 3,
                    options: [
                        "No compliance considerations",
                        "Basic compliance documentation",
                        "Automated compliance checks in pipeline",
                        "Integrated governance and compliance automation",
                        "AI-driven compliance monitoring and reporting"
                    ]
                },
                RM4: {
                    text: "Release Coordination",
                    weight: 2,
                    options: [
                        "No coordination between teams",
                        "Basic release coordination meetings",
                        "Coordinated releases with communication plan",
                        "Automated coordination and notification system",
                        "Self-service release management platform"
                    ]
                },
                RM5: {
                    text: "Release Validation",
                    weight: 2,
                    options: [
                        "Manual validation only",
                        "Basic automated smoke tests",
                        "Comprehensive validation suite",
                        "Automated validation with performance testing",
                        "AI-powered release validation and verification"
                    ]
                },
                RM6: {
                    text: "Release Rollback",
                    weight: 2,
                    options: [
                        "No rollback capability",
                        "Manual rollback procedures",
                        "Automated rollback scripts",
                        "One-click rollback with state management",
                        "Automated rollback with data consistency"
                    ]
                }
            },
            testing: {
                TEST1: {
                    text: "Test Automation Coverage",
                    weight: 3,
                    options: [
                        "No automated tests",
                        "Basic unit test coverage",
                        "Integration and unit test automation",
                        "Comprehensive test automation suite",
                        "AI-driven test generation and execution"
                    ]
                },
                TEST2: {
                    text: "Test Environment Management",
                    weight: 3,
                    options: [
                        "Shared, manually managed test environments",
                        "Dedicated test environments",
                        "Automated test environment provisioning",
                        "On-demand test environments with data refresh",
                        "Self-healing test environments with monitoring"
                    ]
                },
                TEST3: {
                    text: "Test Data Management",
                    weight: 3,
                    options: [
                        "Production data copies used in testing",
                        "Basic test data generation",
                        "Automated test data management",
                        "On-demand test data provisioning",
                        "AI-driven test data generation"
                    ]
                },
                TEST4: {
                    text: "Performance Testing",
                    weight: 2,
                    options: [
                        "No performance testing",
                        "Basic load testing",
                        "Regular performance test execution",
                        "Automated performance testing in pipeline",
                        "Continuous performance monitoring and testing"
                    ]
                },
                TEST5: {
                    text: "Security Testing",
                    weight: 2,
                    options: [
                        "No security testing",
                        "Basic security scans",
                        "Regular security testing",
                        "Automated security testing in pipeline",
                        "Continuous security testing and monitoring"
                    ]
                },
                TEST6: {
                    text: "Test Result Analysis",
                    weight: 2,
                    options: [
                        "Manual test result review",
                        "Basic test reporting",
                        "Automated test result analysis",
                        "Advanced analytics with trend analysis",
                        "AI-powered test result analysis and insights"
                    ]
                }
            },
            dataManagement: {
                DATA1: {
                    text: "Database Change Management",
                    weight: 3,
                    options: [
                        "No database version control",
                        "Basic database scripts in version control",
                        "Database migration tools with versioning",
                        "Automated schema evolution with zero-downtime",
                        "Advanced schema management with automated validation"
                    ]
                },
                DATA2: {
                    text: "Data Backup Strategy",
                    weight: 3,
                    options: [
                        "Manual or no backup process",
                        "Scheduled backups with basic retention",
                        "Automated backups with verification",
                        "Point-in-time recovery capability",
                        "Continuous backup with instant recovery"
                    ]
                },
                DATA3: {
                    text: "Data Security",
                    weight: 3,
                    options: [
                        "Basic access controls only",
                        "Encrypted data storage",
                        "Data encryption in transit and at rest",
                        "Advanced data protection with key rotation",
                        "Zero-trust data security model"
                    ]
                },
                DATA4: {
                    text: "Data Migration Process",
                    weight: 2,
                    options: [
                        "Manual data migration",
                        "Scripted data migration",
                        "Automated migration with basic validation",
                        "Automated migration with comprehensive testing",
                        "Zero-downtime data migration with rollback"
                    ]
                },
                DATA5: {
                    text: "Data Quality Management",
                    weight: 2,
                    options: [
                        "No data quality checks",
                        "Basic data validation rules",
                        "Automated data quality checks",
                        "Real-time data quality monitoring",
                        "AI-driven data quality optimization"
                    ]
                },
                DATA6: {
                    text: "Data Lifecycle Management",
                    weight: 2,
                    options: [
                        "No data lifecycle policy",
                        "Basic data retention rules",
                        "Automated data archival process",
                        "Policy-driven data lifecycle management",
                        "Intelligent data lifecycle optimization"
                    ]
                }
            },
            configurationManagement: {
                CM1: {
                    text: "Configuration Storage",
                    weight: 3,
                    options: [
                        "Configuration embedded in code",
                        "External configuration files",
                        "Version-controlled configuration management",
                        "Centralized configuration service",
                        "Dynamic configuration management with validation"
                    ]
                },
                CM2: {
                    text: "Secret Management",
                    weight: 3,
                    options: [
                        "Hardcoded secrets in configuration",
                        "External secrets file with basic encryption",
                        "Dedicated secrets management service",
                        "Automated secret rotation",
                        "Zero-trust secrets management with audit"
                    ]
                },
                CM3: {
                    text: "Environment Configuration",
                    weight: 3,
                    options: [
                        "Manual environment configuration",
                        "Environment-specific config files",
                        "Automated environment configuration",
                        "Dynamic environment configuration",
                        "Self-tuning environment configuration"
                    ]
                },
                CM4: {
                    text: "Configuration Validation",
                    weight: 2,
                    options: [
                        "No configuration validation",
                        "Basic syntax validation",
                        "Automated configuration testing",
                        "Configuration validation in pipeline",
                        "AI-assisted configuration validation"
                    ]
                },
                CM5: {
                    text: "Configuration Versioning",
                    weight: 2,
                    options: [
                        "No version control for configs",
                        "Basic version control",
                        "Configuration versioning with history",
                        "Full configuration auditability",
                        "Automated configuration versioning and rollback"
                    ]
                },
                CM6: {
                    text: "Configuration Distribution",
                    weight: 2,
                    options: [
                        "Manual configuration updates",
                        "Basic automated distribution",
                        "Centralized configuration distribution",
                        "Real-time configuration updates",
                        "Zero-downtime configuration updates"
                    ]
                }
            },
            applicationArchitecture: {
                APP1: {
                    text: "Component Coupling",
                    weight: 3,
                    options: [
                        "Tightly coupled monolith",
                        "Modular monolith with clear boundaries",
                        "Service-oriented architecture with defined interfaces",
                        "Microservices with loose coupling",
                        "Event-driven architecture with full decoupling"
                    ]
                },
                APP2: {
                    text: "API Design",
                    weight: 3,
                    options: [
                        "No formal API design",
                        "Basic REST APIs",
                        "RESTful APIs with documentation",
                        "API-first design with versioning",
                        "Comprehensive API gateway with management"
                    ]
                },
                APP3: {
                    text: "Scalability Design",
                    weight: 3,
                    options: [
                        "No scalability considerations",
                        "Basic horizontal scaling",
                        "Distributed system design",
                        "Cloud-native architecture",
                        "Auto-scaling with predictive analytics"
                    ]
                },
                APP4: {
                    text: "Resilience Patterns",
                    weight: 2,
                    options: [
                        "No resilience patterns",
                        "Basic error handling",
                        "Circuit breakers and retries",
                        "Comprehensive fault tolerance",
                        "Self-healing architecture"
                    ]
                },
                APP5: {
                    text: "Security Architecture",
                    weight: 2,
                    options: [
                        "Basic security controls",
                        "Standard security patterns",
                        "Security-by-design implementation",
                        "Zero-trust architecture",
                        "AI-driven security architecture"
                    ]
                },
                APP6: {
                    text: "Technical Debt Management",
                    weight: 2,
                    options: [
                        "No technical debt tracking",
                        "Ad-hoc technical debt management",
                        "Regular technical debt assessment",
                        "Proactive technical debt prevention",
                        "Continuous architecture optimization"
                    ]
                }
            },
            observability: {
                OBS1: {
                    text: "Logging Implementation",
                    weight: 3,
                    options: [
                        "No centralized logging",
                        "Basic log aggregation",
                        "Structured logging with search",
                        "Advanced log analytics",
                        "AI-powered log analysis"
                    ]
                },
                OBS2: {
                    text: "Monitoring Coverage",
                    weight: 3,
                    options: [
                        "Basic system monitoring",
                        "Infrastructure and application monitoring",
                        "End-to-end monitoring",
                        "Full-stack observability",
                        "AIOps-driven monitoring"
                    ]
                },
                OBS3: {
                    text: "Metrics Collection",
                    weight: 3,
                    options: [
                        "No metrics collection",
                        "Basic performance metrics",
                        "Custom metrics with alerting",
                        "Comprehensive metrics with SLOs",
                        "Predictive analytics with ML"
                    ]
                },
                OBS4: {
                    text: "Tracing Implementation",
                    weight: 2,
                    options: [
                        "No request tracing",
                        "Basic request tracking",
                        "Distributed tracing",
                        "Full-stack tracing with context",
                        "AI-enhanced trace analysis"
                    ]
                },
                OBS5: {
                    text: "Alerting Strategy",
                    weight: 2,
                    options: [
                        "Manual system checks",
                        "Basic threshold alerts",
                        "Smart alerting with routing",
                        "Automated incident response",
                        "ML-based predictive alerting"
                    ]
                },
                OBS6: {
                    text: "Debugging Capabilities",
                    weight: 2,
                    options: [
                        "Manual debugging only",
                        "Basic debugging tools",
                        "Advanced debugging with profiling",
                        "Production debugging capabilities",
                        "AI-assisted debugging"
                    ]
                }
            }
        },
        fr_CA: {
            buildManagement: {
                BM1: {
                    text: "Implémentation du Contrôle de Version",
                    weight: 3,
                    options: [
                        "Pas de système de contrôle de version",
                        "Système de contrôle de version basique (ex: Git) avec stockage du code et des scripts",
                        "Contrôle de version avec stratégie de branches et fusions automatisées",
                        "Contrôle de version avancé avec bascules de fonctionnalités et développement sur trunk",
                        "Contrôle de version sophistiqué avec vérifications automatisées de conformité et sécurité"
                    ]
                },
                BM2: {
                    text: "Implémentation de l'Outil de Build",
                    weight: 3,
                    options: [
                        "Processus de build manuel",
                        "Outil de build simple (ex: Maven, Gradle) pour standardiser le processus",
                        "Outil de build avec gestion des dépendances et versioning des artefacts",
                        "Configuration de build avancée avec builds modulaires et mise en cache",
                        "Système de build optimisé avec cache distribué et exécution parallèle"
                    ]
                },
                BM3: {
                    text: "Utilisation du Serveur d'Intégration Continue",
                    weight: 3,
                    options: [
                        "Pas de serveur IC",
                        "Serveur IC basique (ex: Jenkins) pour déclencher les builds sur les commits",
                        "Serveur IC avec exécution et rapport de tests automatisés",
                        "IC avancée avec gates de qualité et pipelines de déploiement",
                        "Pipeline CI/CD entièrement automatisé avec déploiements canary"
                    ]
                },
                BM4: {
                    text: "Niveau d'Automatisation des Builds",
                    weight: 2,
                    options: [
                        "Étapes de build manuelles",
                        "Scripts de build automatisés basiques",
                        "Builds automatisés avec gestion des dépendances",
                        "Builds entièrement automatisés avec optimisation",
                        "Système de build auto-réparant avec optimisation IA/ML"
                    ]
                },
                BM5: {
                    text: "Surveillance de la Performance des Builds",
                    weight: 2,
                    options: [
                        "Pas de surveillance de performance des builds",
                        "Suivi basique du temps de build",
                        "Métriques détaillées et tendances des builds",
                        "Optimisation automatique de la performance des builds",
                        "Optimisation prédictive des builds avec ML"
                    ]
                },
                BM6: {
                    text: "Intégration de la Sécurité dans les Builds",
                    weight: 2,
                    options: [
                        "Pas de vérifications de sécurité dans les builds",
                        "Analyse de sécurité basique",
                        "Tests de sécurité automatisés dans le pipeline",
                        "Gates de sécurité avancées avec application des politiques",
                        "Surveillance continue de la sécurité et remédiation"
                    ]
                }
            },
            releaseManagement: {
                RM1: {
                    text: "Processus de Déploiement",
                    weight: 3,
                    options: [
                        "Déploiements manuels non documentés",
                        "Procédures de déploiement documentées basiques",
                        "Scripts de déploiement automatisés avec capacité de rollback",
                        "Pipeline de déploiement entièrement automatisé avec staging",
                        "Déploiements sans interruption avec vérification automatisée"
                    ]
                },
                RM2: {
                    text: "Planification des Versions",
                    weight: 3,
                    options: [
                        "Versions ad-hoc sans planification",
                        "Calendrier de versions basique avec coordination manuelle",
                        "Versions planifiées avec gestion des changements",
                        "Planification et suivi automatisés des versions",
                        "Livraison continue avec notes de version automatisées"
                    ]
                },
                RM3: {
                    text: "Conformité et Gouvernance",
                    weight: 3,
                    options: [
                        "Aucune considération de conformité",
                        "Documentation de conformité basique",
                        "Vérifications de conformité automatisées dans le pipeline",
                        "Automatisation intégrée de la gouvernance et de la conformité",
                        "Surveillance et rapports de conformité basés sur l'IA"
                    ]
                },
                RM4: {
                    text: "Coordination des Versions",
                    weight: 2,
                    options: [
                        "Aucune coordination entre les équipes",
                        "Réunions basiques de coordination des versions",
                        "Versions coordonnées avec plan de communication",
                        "Système automatisé de coordination et de notification",
                        "Plateforme de gestion des versions en libre-service"
                    ]
                },
                RM5: {
                    text: "Validation des Versions",
                    weight: 2,
                    options: [
                        "Validation manuelle uniquement",
                        "Tests de fumée automatisés basiques",
                        "Suite de validation complète",
                        "Validation automatisée avec tests de performance",
                        "Validation et vérification des versions basées sur l'IA"
                    ]
                },
                RM6: {
                    text: "Retour Arrière des Versions",
                    weight: 2,
                    options: [
                        "Aucune capacité de retour arrière",
                        "Procédures manuelles de retour arrière",
                        "Scripts automatisés de retour arrière",
                        "Retour arrière en un clic avec gestion d'état",
                        "Retour arrière automatisé avec cohérence des données"
                    ]
                }
            },
            testing: {
                TEST1: {
                    text: "Couverture des Tests Automatisés",
                    weight: 3,
                    options: [
                        "Aucun test automatisé",
                        "Couverture basique des tests unitaires",
                        "Automatisation des tests d'intégration et unitaires",
                        "Suite complète de tests automatisés",
                        "Génération et exécution de tests basées sur l'IA"
                    ]
                },
                TEST2: {
                    text: "Gestion des Environnements de Test",
                    weight: 3,
                    options: [
                        "Environnements de test partagés, gérés manuellement",
                        "Environnements de test dédiés",
                        "Provisionnement automatisé des environnements de test",
                        "Environnements de test à la demande avec actualisation des données",
                        "Environnements de test auto-réparants avec surveillance"
                    ]
                },
                TEST3: {
                    text: "Gestion des Données de Test",
                    weight: 3,
                    options: [
                        "Copies des données de production utilisées pour les tests",
                        "Génération basique de données de test",
                        "Gestion automatisée des données de test",
                        "Provisionnement des données de test à la demande",
                        "Génération de données de test basée sur l'IA"
                    ]
                },
                TEST4: {
                    text: "Tests de Performance",
                    weight: 2,
                    options: [
                        "Aucun test de performance",
                        "Tests de charge basiques",
                        "Exécution régulière des tests de performance",
                        "Tests de performance automatisés dans le pipeline",
                        "Surveillance et tests continus de la performance"
                    ]
                },
                TEST5: {
                    text: "Tests de Sécurité",
                    weight: 2,
                    options: [
                        "Aucun test de sécurité",
                        "Analyses de sécurité basiques",
                        "Tests de sécurité réguliers",
                        "Tests de sécurité automatisés dans le pipeline",
                        "Tests et surveillance continus de la sécurité"
                    ]
                },
                TEST6: {
                    text: "Analyse des Résultats de Test",
                    weight: 2,
                    options: [
                        "Revue manuelle des résultats de test",
                        "Rapports de test basiques",
                        "Analyse automatisée des résultats de test",
                        "Analyses avancées avec analyse des tendances",
                        "Analyse des résultats de test et insights basés sur l'IA"
                    ]
                }
            },
            dataManagement: {
                DATA1: {
                    text: "Gestion des Changements de Base de Données",
                    weight: 3,
                    options: [
                        "Pas de contrôle de version de base de données",
                        "Scripts de base de données basiques dans le contrôle de version",
                        "Outils de migration de base de données avec versioning",
                        "Évolution automatisée des schémas sans interruption",
                        "Gestion avancée des schémas avec validation automatisée"
                    ]
                },
                DATA2: {
                    text: "Stratégie de Sauvegarde des Données",
                    weight: 3,
                    options: [
                        "Processus de sauvegarde manuel ou inexistant",
                        "Sauvegardes planifiées avec rétention basique",
                        "Sauvegardes automatisées avec vérification",
                        "Capacité de récupération à un moment précis",
                        "Sauvegarde continue avec récupération instantanée"
                    ]
                },
                DATA3: {
                    text: "Sécurité des Données",
                    weight: 3,
                    options: [
                        "Contrôles d'accès basiques uniquement",
                        "Stockage de données chiffré",
                        "Chiffrement des données en transit et au repos",
                        "Protection avancée des données avec rotation des clés",
                        "Modèle de sécurité zero-trust pour les données"
                    ]
                },
                DATA4: {
                    text: "Processus de Migration des Données",
                    weight: 2,
                    options: [
                        "Migration manuelle des données",
                        "Migration des données scriptée",
                        "Migration automatisée avec validation basique",
                        "Migration automatisée avec tests complets",
                        "Migration des données sans interruption avec rollback"
                    ]
                },
                DATA5: {
                    text: "Gestion de la Qualité des Données",
                    weight: 2,
                    options: [
                        "Pas de vérification de qualité des données",
                        "Règles de validation basiques",
                        "Vérifications automatisées de la qualité des données",
                        "Surveillance en temps réel de la qualité des données",
                        "Optimisation de la qualité des données basée sur l'IA"
                    ]
                },
                DATA6: {
                    text: "Gestion du Cycle de Vie des Données",
                    weight: 2,
                    options: [
                        "Pas de politique de cycle de vie des données",
                        "Règles basiques de rétention des données",
                        "Processus d'archivage automatisé des données",
                        "Gestion du cycle de vie basée sur des politiques",
                        "Optimisation intelligente du cycle de vie des données"
                    ]
                }
            },
            configurationManagement: {
                CM1: {
                    text: "Stockage de la Configuration",
                    weight: 3,
                    options: [
                        "Configuration intégrée dans le code",
                        "Fichiers de configuration externes",
                        "Gestion de configuration avec contrôle de version",
                        "Service de configuration centralisé",
                        "Gestion dynamique de la configuration avec validation"
                    ]
                },
                CM2: {
                    text: "Gestion des Secrets",
                    weight: 3,
                    options: [
                        "Secrets codés en dur dans la configuration",
                        "Fichier de secrets externe avec chiffrement basique",
                        "Service dédié de gestion des secrets",
                        "Rotation automatisée des secrets",
                        "Gestion des secrets zero-trust avec audit"
                    ]
                },
                CM3: {
                    text: "Configuration des Environnements",
                    weight: 3,
                    options: [
                        "Configuration manuelle des environnements",
                        "Fichiers de configuration spécifiques aux environnements",
                        "Configuration automatisée des environnements",
                        "Configuration dynamique des environnements",
                        "Configuration auto-adaptative des environnements"
                    ]
                },
                CM4: {
                    text: "Validation de la Configuration",
                    weight: 2,
                    options: [
                        "Pas de validation de configuration",
                        "Validation syntaxique basique",
                        "Tests automatisés de la configuration",
                        "Validation de la configuration dans le pipeline",
                        "Validation de la configuration assistée par IA"
                    ]
                },
                CM5: {
                    text: "Versioning de la Configuration",
                    weight: 2,
                    options: [
                        "Pas de contrôle de version pour les configurations",
                        "Contrôle de version basique",
                        "Versioning de la configuration avec historique",
                        "Traçabilité complète de la configuration",
                        "Versioning et rollback automatisés de la configuration"
                    ]
                },
                CM6: {
                    text: "Distribution de la Configuration",
                    weight: 2,
                    options: [
                        "Mises à jour manuelles de la configuration",
                        "Distribution automatisée basique",
                        "Distribution centralisée de la configuration",
                        "Mises à jour en temps réel de la configuration",
                        "Mises à jour de configuration sans interruption"
                    ]
                }
            },
            applicationArchitecture: {
                APP1: {
                    text: "Couplage des Composants",
                    weight: 3,
                    options: [
                        "Monolithe fortement couplé",
                        "Monolithe modulaire avec des limites claires",
                        "Architecture orientée services avec interfaces définies",
                        "Microservices avec couplage faible",
                        "Architecture événementielle avec découplage complet"
                    ]
                },
                APP2: {
                    text: "Conception d'API",
                    weight: 3,
                    options: [
                        "Pas de conception formelle d'API",
                        "APIs REST basiques",
                        "APIs RESTful avec documentation",
                        "Conception API-first avec versionnement",
                        "Passerelle API complète avec gestion"
                    ]
                },
                APP3: {
                    text: "Conception de l'Évolutivité",
                    weight: 3,
                    options: [
                        "Pas de considérations d'évolutivité",
                        "Mise à l'échelle horizontale basique",
                        "Conception de système distribué",
                        "Architecture native cloud",
                        "Auto-scaling avec analytique prédictive"
                    ]
                },
                APP4: {
                    text: "Modèles de Résilience",
                    weight: 2,
                    options: [
                        "Pas de modèles de résilience",
                        "Gestion d'erreurs basique",
                        "Disjoncteurs et réessais",
                        "Tolérance aux pannes complète",
                        "Architecture auto-réparatrice"
                    ]
                },
                APP5: {
                    text: "Architecture de Sécurité",
                    weight: 2,
                    options: [
                        "Contrôles de sécurité basiques",
                        "Modèles de sécurité standard",
                        "Implémentation de la sécurité dès la conception",
                        "Architecture zéro confiance",
                        "Architecture de sécurité basée sur l'IA"
                    ]
                },
                APP6: {
                    text: "Gestion de la Dette Technique",
                    weight: 2,
                    options: [
                        "Pas de gestion de la dette technique",
                        "Suivi basique de la dette technique",
                        "Processus de remboursement planifié",
                        "Gestion proactive de la dette",
                        "Prévention automatisée de la dette"
                    ]
                }
            },
            environments: {
                ENV1: {
                    text: "Provisionnement des Environnements",
                    weight: 3,
                    options: [
                        "Configuration manuelle sans documentation",
                        "Configuration scriptée basique avec documentation",
                        "Provisionnement automatisé avec gestion de la configuration",
                        "Infrastructure as Code avec contrôle de version",
                        "Provisionnement en libre-service avec vérifications de conformité"
                    ]
                },
                ENV2: {
                    text: "Cohérence des Environnements",
                    weight: 3,
                    options: [
                        "Environnements incohérents",
                        "Standardisation basique des environnements",
                        "Environnements cohérents avec gestion de la configuration",
                        "Infrastructure immuable avec versioning",
                        "Environnements auto-réparants avec récupération automatisée"
                    ]
                },
                ENV3: {
                    text: "Évolutivité des Environnements",
                    weight: 2,
                    options: [
                        "Mise à l'échelle manuelle uniquement",
                        "Mise à l'échelle horizontale basique",
                        "Mise à l'échelle automatisée basée sur les métriques",
                        "Mise à l'échelle prédictive avec analytique",
                        "Optimisation dynamique des ressources par IA"
                    ]
                },
                ENV4: {
                    text: "Intégration Cloud",
                    weight: 2,
                    options: [
                        "Pas d'utilisation du cloud",
                        "Utilisation basique des services cloud",
                        "Implémentation cloud hybride",
                        "Stratégie multi-cloud",
                        "Architecture cloud-native avec automatisation complète"
                    ]
                },
                ENV5: {
                    text: "Reprise après Sinistre",
                    weight: 3,
                    options: [
                        "Pas de plan de reprise",
                        "Procédures basiques de sauvegarde et restauration",
                        "Sauvegarde automatisée avec tests réguliers",
                        "Automatisation DR complète avec tests de basculement",
                        "DR sans temps d'arrêt avec redondance géographique"
                    ]
                },
                ENV6: {
                    text: "Sécurité des Environnements",
                    weight: 3,
                    options: [
                        "Contrôles de sécurité basiques",
                        "Pratiques de sécurité standard",
                        "Contrôles de sécurité automatisés",
                        "Sécurité avancée avec surveillance continue",
                        "Modèle de sécurité zero-trust avec automatisation complète"
                    ]
                }
            },

            observability: {
                OBS1: {
                    text: "Implémentation de la Journalisation",
                    weight: 3,
                    options: [
                        "Pas de journalisation centralisée",
                        "Agrégation basique des journaux",
                        "Journalisation structurée avec recherche",
                        "Analyse avancée des journaux",
                        "Analyse des journaux basée sur l'IA"
                    ]
                },
                OBS2: {
                    text: "Couverture de la Surveillance",
                    weight: 3,
                    options: [
                        "Surveillance système basique",
                        "Surveillance de l'infrastructure et des applications",
                        "Surveillance de bout en bout",
                        "Observabilité full-stack",
                        "Surveillance pilotée par AIOps"
                    ]
                },
                OBS3: {
                    text: "Collecte des Métriques",
                    weight: 3,
                    options: [
                        "Pas de collecte de métriques",
                        "Métriques de performance basiques",
                        "Métriques personnalisées avec alertes",
                        "Métriques complètes avec SLOs",
                        "Analytique prédictive avec ML"
                    ]
                },
                OBS4: {
                    text: "Implémentation du Traçage",
                    weight: 2,
                    options: [
                        "Pas de traçage des requêtes",
                        "Suivi basique des requêtes",
                        "Traçage distribué",
                        "Traçage full-stack avec contexte",
                        "Analyse des traces améliorée par l'IA"
                    ]
                },
                OBS5: {
                    text: "Stratégie d'Alerte",
                    weight: 2,
                    options: [
                        "Vérifications manuelles du système",
                        "Alertes basiques sur seuil",
                        "Alertes intelligentes avec routage",
                        "Réponse automatisée aux incidents",
                        "Alertes prédictives basées sur le ML"
                    ]
                },
                OBS6: {
                    text: "Capacités de Débogage",
                    weight: 2,
                    options: [
                        "Débogage manuel uniquement",
                        "Outils de débogage basiques",
                        "Débogage avancé avec profilage",
                        "Capacités de débogage en production",
                        "Débogage assisté par l'IA"
                    ]
                }
            }
        }
    },
    practiceAreas: {
        en_CA: {
            buildManagement: "Build Management & CI",
            environments: "Environments & Provisioning",
            releaseManagement: "Release Management & Compliance",
            testing: "Testing",
            dataManagement: "Data Management",
            configurationManagement: "Configuration Management",
            applicationArchitecture: "Application Architecture",
            observability: "Observability"
        },
        fr_CA: {
            buildManagement: "Gestion des Builds & IC",
            environments: "Environnements & Provisionnement",
            releaseManagement: "Gestion des Versions & Conformité",
            testing: "Tests",
            dataManagement: "Gestion des Données",
            configurationManagement: "Gestion de la Configuration",
            applicationArchitecture: "Architecture Applicative",
            observability: "Observabilité"
        }
    },
    recommendations: {
        en_CA: {
            buildManagement: {
                "-1_0": [
                    "Implement basic version control for all code",
                    "Set up a simple CI server",
                    "Create basic build scripts"
                ],
                "0_1": [
                    "Automate build and test processes",
                    "Implement code review practices",
                    "Set up automated dependency management"
                ],
                "1_2": [
                    "Implement build metrics and monitoring",
                    "Set up parallel builds for performance",
                    "Integrate security scanning in builds"
                ],
                "2_3": [
                    "Implement predictive build optimization",
                    "Set up advanced caching strategies",
                    "Implement ML-based build analytics"
                ]
            },
            releaseManagement: {
                "-1_0": [
                    "Document basic deployment procedures",
                    "Implement version tracking",
                    "Create release checklists"
                ],
                "0_1": [
                    "Automate deployment scripts",
                    "Implement rollback capabilities",
                    "Set up release planning"
                ],
                "1_2": [
                    "Implement blue-green deployments",
                    "Set up automated compliance checks",
                    "Implement release metrics"
                ],
                "2_3": [
                    "Implement canary deployments",
                    "Set up automated governance",
                    "Implement predictive release analytics"
                ]
            },
            testing: {
                "-1_0": [
                    "Implement basic unit tests",
                    "Create test documentation",
                    "Set up test environments"
                ],
                "0_1": [
                    "Implement automated testing",
                    "Set up integration tests",
                    "Create test coverage metrics"
                ],
                "1_2": [
                    "Implement performance testing",
                    "Set up security testing",
                    "Implement test automation framework"
                ],
                "2_3": [
                    "Implement AI-driven testing",
                    "Set up chaos engineering",
                    "Implement predictive test selection"
                ]
            },
            dataManagement: {
                "-1_0": [
                    "Implement basic database version control",
                    "Create backup procedures",
                    "Document data structures"
                ],
                "0_1": [
                    "Implement automated backups",
                    "Set up data migration scripts",
                    "Create data security policies"
                ],
                "1_2": [
                    "Implement zero-downtime migrations",
                    "Set up data quality monitoring",
                    "Implement data lifecycle management"
                ],
                "2_3": [
                    "Implement predictive data optimization",
                    "Set up AI-driven data quality",
                    "Implement automated compliance"
                ]
            },
            configurationManagement: {
                "-1_0": [
                    "Create configuration documentation",
                    "Implement basic config files",
                    "Set up environment variables"
                ],
                "0_1": [
                    "Implement config version control",
                    "Set up config validation",
                    "Create config management tools"
                ],
                "1_2": [
                    "Implement secret management",
                    "Set up config automation",
                    "Create config testing"
                ],
                "2_3": [
                    "Implement dynamic configuration",
                    "Set up AI-driven config optimization",
                    "Implement zero-trust config management"
                ]
            },
            applicationArchitecture: {
                "-1_0": [
                    "Document current architecture",
                    "Identify system boundaries",
                    "Create component diagrams"
                ],
                "0_1": [
                    "Implement modular design",
                    "Set up API guidelines",
                    "Create scalability plan"
                ],
                "1_2": [
                    "Implement microservices",
                    "Set up service mesh",
                    "Create resilience patterns"
                ],
                "2_3": [
                    "Implement event-driven architecture",
                    "Set up AI-driven optimization",
                    "Create self-healing systems"
                ]
            },
            environments: {
                "-1_0": [
                    "Document environment setup",
                    "Create basic provisioning scripts",
                    "Set up environment tracking"
                ],
                "0_1": [
                    "Implement infrastructure as code",
                    "Set up environment automation",
                    "Create environment testing"
                ],
                "1_2": [
                    "Implement immutable infrastructure",
                    "Set up auto-scaling",
                    "Create disaster recovery"
                ],
                "2_3": [
                    "Implement predictive scaling",
                    "Set up self-healing environments",
                    "Create AI-driven optimization"
                ]
            },
            observability: {
                "-1_0": [
                    "Implement basic logging",
                    "Set up system monitoring",
                    "Create alert rules"
                ],
                "0_1": [
                    "Implement centralized logging",
                    "Set up metrics collection",
                    "Create dashboards"
                ],
                "1_2": [
                    "Implement distributed tracing",
                    "Set up SLO monitoring",
                    "Create automated analysis"
                ],
                "2_3": [
                    "Implement AI-driven observability",
                    "Set up predictive analytics",
                    "Create autonomous operations"
                ]
            }
        },
        fr_CA: {
            buildManagement: {
                "-1_0": [
                    "Mettre en place le contrôle de version de base",
                    "Configurer un serveur d'IC simple",
                    "Créer des scripts de build basiques"
                ],
                "0_1": [
                    "Automatiser les processus de build et de test",
                    "Implémenter des pratiques de revue de code",
                    "Configurer la gestion automatisée des dépendances"
                ],
                "1_2": [
                    "Implémenter des métriques de build",
                    "Configurer des builds parallèles",
                    "Intégrer l'analyse de sécurité dans les builds"
                ],
                "2_3": [
                    "Implémenter l'optimisation prédictive des builds",
                    "Configurer des stratégies de cache avancées",
                    "Implémenter l'analyse des builds basée sur le ML"
                ]
            },
            releaseManagement: {
                "-1_0": [
                    "Documenter les procédures de déploiement",
                    "Implémenter le suivi des versions",
                    "Créer des listes de contrôle de version"
                ],
                "0_1": [
                    "Automatiser les scripts de déploiement",
                    "Implémenter les capacités de rollback",
                    "Configurer la planification des versions"
                ],
                "1_2": [
                    "Implémenter les déploiements blue-green",
                    "Configurer les vérifications de conformité",
                    "Implémenter les métriques de version"
                ],
                "2_3": [
                    "Implémenter les déploiements canary",
                    "Configurer la gouvernance automatisée",
                    "Implémenter l'analytique prédictive des versions"
                ]
            },
            testing: {
                "-1_0": [
                    "Implémenter des tests unitaires basiques",
                    "Créer la documentation des tests",
                    "Configurer les environnements de test"
                ],
                "0_1": [
                    "Implémenter les tests automatisés",
                    "Configurer les tests d'intégration",
                    "Créer des métriques de couverture de test"
                ],
                "1_2": [
                    "Implémenter les tests de performance",
                    "Configurer les tests de sécurité",
                    "Implémenter un framework de test automatisé"
                ],
                "2_3": [
                    "Implémenter les tests pilotés par l'IA",
                    "Configurer l'ingénierie du chaos",
                    "Implémenter la sélection prédictive des tests"
                ]
            },
            dataManagement: {
                "-1_0": [
                    "Implémenter le contrôle de version de base de données",
                    "Créer des procédures de sauvegarde",
                    "Documenter les structures de données"
                ],
                "0_1": [
                    "Implémenter les sauvegardes automatisées",
                    "Configurer les scripts de migration",
                    "Créer des politiques de sécurité des données"
                ],
                "1_2": [
                    "Implémenter les migrations sans interruption",
                    "Configurer la surveillance de la qualité des données",
                    "Implémenter la gestion du cycle de vie des données"
                ],
                "2_3": [
                    "Implémenter l'optimisation prédictive des données",
                    "Configurer la qualité des données pilotée par l'IA",
                    "Implémenter la conformité automatisée"
                ]
            },
            configurationManagement: {
                "-1_0": [
                    "Créer la documentation de configuration",
                    "Implémenter des fichiers de config basiques",
                    "Configurer les variables d'environnement"
                ],
                "0_1": [
                    "Implémenter le contrôle de version de config",
                    "Configurer la validation de config",
                    "Créer des outils de gestion de config"
                ],
                "1_2": [
                    "Implémenter la gestion des secrets",
                    "Configurer l'automatisation de config",
                    "Créer des tests de configuration"
                ],
                "2_3": [
                    "Implémenter la configuration dynamique",
                    "Configurer l'optimisation de config par l'IA",
                    "Implémenter la gestion de config zero-trust"
                ]
            },
            applicationArchitecture: {
                "-1_0": [
                    "Documenter l'architecture actuelle",
                    "Identifier les limites du système",
                    "Créer des diagrammes de composants"
                ],
                "0_1": [
                    "Implémenter une conception modulaire",
                    "Configurer les directives d'API",
                    "Créer un plan d'évolutivité"
                ],
                "1_2": [
                    "Implémenter les microservices",
                    "Configurer le service mesh",
                    "Créer des modèles de résilience"
                ],
                "2_3": [
                    "Implémenter l'architecture événementielle",
                    "Configurer l'optimisation pilotée par l'IA",
                    "Créer des systèmes auto-réparants"
                ]
            },
            environments: {
                "-1_0": [
                    "Documenter la configuration des environnements",
                    "Créer des scripts de provisionnement basiques",
                    "Configurer le suivi des environnements"
                ],
                "0_1": [
                    "Implémenter l'infrastructure as code",
                    "Configurer l'automatisation des environnements",
                    "Créer des tests d'environnement"
                ],
                "1_2": [
                    "Implémenter l'infrastructure immuable",
                    "Configurer l'auto-scaling",
                    "Créer la reprise après sinistre"
                ],
                "2_3": [
                    "Implémenter la mise à l'échelle prédictive",
                    "Configurer les environnements auto-réparants",
                    "Créer l'optimisation pilotée par l'IA"
                ]
            },
            observability: {
                "-1_0": [
                    "Implémenter la journalisation de base",
                    "Configurer la surveillance du système",
                    "Créer des règles d'alerte"
                ],
                "0_1": [
                    "Implémenter la journalisation centralisée",
                    "Configurer la collecte de métriques",
                    "Créer des tableaux de bord"
                ],
                "1_2": [
                    "Implémenter le traçage distribué",
                    "Configurer la surveillance des SLO",
                    "Créer l'analyse automatisée"
                ],
                "2_3": [
                    "Implémenter l'observabilité pilotée par l'IA",
                    "Configurer l'analytique prédictive",
                    "Créer les opérations autonomes"
                ]
            }
        }
    },
    en_CA: {
        title: "Continuous Delivery Maturity Assessment",
        validation: {
            incomplete: "Please answer all questions before submitting.",
            unansweredQuestions: "Unanswered Questions:",
            scrollTo: "Scroll to unanswered questions"
        },
        subtitle: "Evaluate your organization's maturity across 8 key practice areas",
        calculate: "Calculate Results",
        restart: "Start Over",
        results: {
            title: "Assessment Results",
            overallMaturity: "Overall Maturity Level",
            detailedResults: "Detailed Results by Practice Area",
            recommendedActions: "Recommended Actions"
        },
        legend: "Maturity Level Legend",
        errors: {
            incomplete: "Please complete all sections before calculating results. Missing"
        },
        calculate: "Calculate Results",
        restart: "Start Over",
        practiceAreas: "Practice Areas",
        scrollToTop: "Top",
        legend: "Legend",
        results: {
            title: "Assessment Results",
            overallMaturity: "Overall Maturity Level",
            detailedResults: "Detailed Results by Area",
            recommendedActions: "Recommended Actions",
            practiceArea: "Practice Area",
            maturityLevel: "Maturity Level",
            score: "Score",
            exportCsv: "Export as CSV",
            maturityLevels: {
                "-1": "Initial",
                "0": "Managed",
                "1": "Defined",
                "2": "Measured",
                "3": "Optimized"
            },
            maturityDescriptions: {
                "-1": "Basic practices with manual processes",
                "0": "Some automation and standardization",
                "1": "Defined processes and tooling",
                "2": "Measured and controlled processes",
                "3": "Continuous optimization and innovation"
            }
        }
    },
    fr_CA: {
        title: "Évaluation de la Maturité de la Livraison Continue",
        validation: {
            incomplete: "Veuillez répondre à toutes les questions avant de soumettre.",
            unansweredQuestions: "Questions sans réponse:",
            scrollTo: "Aller aux questions sans réponse"
        },
        subtitle: "Évaluez la maturité de votre organisation dans 8 domaines clés",
        calculate: "Calculer les Résultats",
        restart: "Recommencer",
        practiceAreas: "Domaines de Pratique",
        scrollToTop: "Haut",
        legend: "Légende",
        results: {
            title: "Résultats de l'Évaluation",
            overallMaturity: "Niveau de Maturité Global",
            detailedResults: "Résultats Détaillés par Domaine",
            recommendedActions: "Actions Recommandées",
            practiceArea: "Domaine de Pratique",
            maturityLevel: "Niveau de Maturité",
            score: "Score",
            exportCsv: "Exporter en CSV",
            maturityLevels: {
                "-1": "Initial",
                "0": "Géré",
                "1": "Défini",
                "2": "Mesuré",
                "3": "Optimisé"
            },
            maturityDescriptions: {
                "-1": "Pratiques de base avec processus manuels",
                "0": "Certaine automatisation et standardisation",
                "1": "Processus et outils définis",
                "2": "Processus mesurés et contrôlés",
                "3": "Optimisation et innovation continues"
            }
        }
    }
};

// Translations for UI elements and question database (legacy)
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
            recommendationOptimizing: "Focus on innovation and maintaining your excellent practices.",
                        scoringExplanation: "For each category:<br>1. Each question has a weight (1-3) and each answer has a value (maturity level -1 to 3)<br>2. For each question: weighted score = answer value × question weight<br>3. For each question: max possible score = 3 × question weight<br>4. For each practice area:<br>&nbsp;&nbsp;- Total weighted score = sum of all weighted scores<br>&nbsp;&nbsp;- Total max score = sum of all max possible scores<br>&nbsp;&nbsp;- Normalized score = (totalWeightedScore + totalMaxScore) / (2 × totalMaxScore)<br>&nbsp;&nbsp;- This normalized score (0-100%) maps to maturity levels:<br>&nbsp;&nbsp;&nbsp;&nbsp;* < 20% = -1<br>&nbsp;&nbsp;&nbsp;&nbsp;* 20-40% = 0<br>&nbsp;&nbsp;&nbsp;&nbsp;* 40-60% = 1<br>&nbsp;&nbsp;&nbsp;&nbsp;* 60-80% = 2<br>&nbsp;&nbsp;&nbsp;&nbsp;* > 80% = 3<br>5. The overall maturity level is the minimum (lowest) level across all practice areas<br><br>So it's not a simple average.",
            // Nouveaux champs d'information
            assessmentInfo: "Assessment Information",
            authorEmail: "Author Email",
            authorEmailPlaceholder: "Enter your email address",
            teamName: "Team/Squad Name",
            teamNamePlaceholder: "Enter your team or squad name",
            systemName: "System Name",
            systemNamePlaceholder: "Enter system name (optional)",
            requiredField: "This field is required",
            invalidEmail: "Please enter a valid email address",
            saveToConfluence: "Save to Confluence",
            confluenceSaving: "Saving to Confluence...",
            confluenceSuccess: "Successfully saved to Confluence!",
            confluenceError: "Error saving to Confluence. Please try again.",
            assessmentSaved: "Assessment saved successfully! You can view it in your",
            assessmentHistory: "assessment history",
            // Authentication UI
            login: "Login",
            register: "Register",
            logout: "Logout",
            username: "Username",
            email: "Email",
            password: "Password",
            confirmPassword: "Confirm Password",
            role: "Role",
            loginButton: "Login",
            registerButton: "Register",
            welcomeUser: "Welcome",
            adminDashboard: "Admin Dashboard",
            userManagement: "User Management",
            groupManagement: "Group Management",
            assessmentHistory: "Assessment History",
            addUser: "Add User",
            editUser: "Edit User",
            deleteUser: "Delete User",
            addGroup: "Add Group",
            editGroup: "Edit Group",
            deleteGroup: "Delete Group",
            manageMembers: "Manage Members",
            manageAssessments: "Manage Assessments",
            groupName: "Group Name",
            groupDescription: "Group Description",
            members: "Members",
            assessments: "Assessments",
            actions: "Actions",
            save: "Save",
            cancel: "Cancel",
            delete: "Delete",
            edit: "Edit",
            add: "Add",
            remove: "Remove",
            close: "Close",
            confirm: "Confirm",
            yes: "Yes",
            no: "No",
            loading: "Loading...",
            success: "Success",
            error: "Error",
            warning: "Warning",
            info: "Information",
            sysAdmin: "System Administrator",
            assessmentAdmin: "Assessment Administrator",
            assessmentUser: "Assessment User",
            anonymous: "Anonymous",
            selectRole: "Select Role",
            selectGroups: "Select Groups",
            availableGroups: "Available Groups",
            selectedGroups: "Selected Groups",
            noGroupsSelected: "No groups selected",
            manageUsers: "Manage Users",
            manageUsersDesc: "Manage users and their roles",
            manageGroups: "Manage Groups",
            manageGroupsDesc: "Create and manage user groups",
            assessmentAnalytics: "Assessment Analytics",
            viewAnalytics: "View Analytics",
            viewAnalyticsDesc: "View assessment statistics and trends",
            myProfile: "My Profile",
            myAssessments: "My Assessments",
            allUsers: "All Users",
            allGroups: "All Groups",
            allAssessments: "All Assessments",
            createdAt: "Created At",
            updatedAt: "Updated At",
            lastLogin: "Last Login",
            status: "Status",
            active: "Active",
            inactive: "Inactive",
            searchUsers: "Search users...",
            searchGroups: "Search groups...",
            searchAssessments: "Search assessments...",
            noResults: "No results found",
            confirmDelete: "Are you sure you want to delete this item?",
            deleteSuccess: "Item deleted successfully",
            saveSuccess: "Item saved successfully",
            updateSuccess: "Item updated successfully",
            addSuccess: "Item added successfully",
            operationFailed: "Operation failed",
            invalidInput: "Invalid input",
            requiredFields: "Please fill in all required fields",
            passwordMismatch: "Passwords do not match",
            emailExists: "Email already exists",
            usernameExists: "Username already exists",
            loginFailed: "Login failed",
            registrationFailed: "Registration failed",
            unauthorized: "Unauthorized access",
            forbidden: "Access forbidden",
            notFound: "Item not found",
            serverError: "Server error occurred",
            networkError: "Network error occurred",
            tryAgain: "Please try again",
            backToLogin: "Back to Login",
            forgotPassword: "Forgot Password?",
            rememberMe: "Remember Me",
            stayLoggedIn: "Stay logged in",
            sessionExpired: "Session expired. Please login again.",
            logoutSuccess: "Logged out successfully",
            profileUpdated: "Profile updated successfully",
            changePassword: "Change Password",
            currentPassword: "Current Password",
            newPassword: "New Password",
            confirmNewPassword: "Confirm New Password",
            passwordChanged: "Password changed successfully",
            profile: "Profile",
            settings: "Settings",
            preferences: "Preferences",
            account: "Account",
            security: "Security",
            privacy: "Privacy",
            notifications: "Notifications",
            language: "Language",
            theme: "Theme",
            timezone: "Timezone",
            dateFormat: "Date Format",
            timeFormat: "Time Format",
            // Additional UI elements
            view: "View",
            compare: "Compare",
            compareAssessments: "Compare Assessments",
            selectAssessments: "Select assessments to compare",
            noAssessments: "No assessments found",
            loadingAssessments: "Loading assessments...",
            assessmentDetails: "Assessment Details",
            overallLevel: "Overall Level",
            practiceAreaScores: "Practice Area Scores",
            comparisonResults: "Comparison Results",
            firstAssessment: "First Assessment",
            secondAssessment: "Second Assessment",
            improvement: "Improvement",
            decline: "Decline",
            noChange: "No Change",
            selectTwoAssessments: "Please select exactly two assessments to compare",
            backToHistory: "Back to History",
            exportComparison: "Export Comparison",
            printComparison: "Print Comparison"
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
            recommendationOptimizing: "Concentrez-vous sur l'innovation et le maintien de vos excellentes pratiques.",
                        scoringExplanation: "Pour chaque catégorie :<br>1. Chaque question a un poids (1-3) et chaque réponse a une valeur (niveau de maturité -1 à 3)<br>2. Pour chaque question : score pondéré = valeur de réponse × poids de la question<br>3. Pour chaque question : score maximum possible = 3 × poids de la question<br>4. Pour chaque domaine de pratique :<br>&nbsp;&nbsp;- Score pondéré total = somme de tous les scores pondérés<br>&nbsp;&nbsp;- Score maximum total = somme de tous les scores maximum possibles<br>&nbsp;&nbsp;- Score normalisé = (scorePondéréTotal + scoreMaximumTotal) / (2 × scoreMaximumTotal)<br>&nbsp;&nbsp;- Ce score normalisé (0-100%) correspond aux niveaux de maturité :<br>&nbsp;&nbsp;&nbsp;&nbsp;* < 20% = -1<br>&nbsp;&nbsp;&nbsp;&nbsp;* 20-40% = 0<br>&nbsp;&nbsp;&nbsp;&nbsp;* 40-60% = 1<br>&nbsp;&nbsp;&nbsp;&nbsp;* 60-80% = 2<br>&nbsp;&nbsp;&nbsp;&nbsp;* > 80% = 3<br>5. Le niveau de maturité global est le niveau minimum (le plus bas) de tous les domaines de pratique<br><br>Ce n'est donc pas une simple moyenne.",
            // Nouveaux champs d'information
            assessmentInfo: "Informations sur l'Évaluation",
            authorEmail: "Courriel de l'Auteur",
            authorEmailPlaceholder: "Entrez votre adresse courriel",
            teamName: "Nom de l'Équipe/Escouade",
            teamNamePlaceholder: "Entrez le nom de votre équipe ou escouade",
            systemName: "Nom du Système",
            systemNamePlaceholder: "Entrez le nom du système (facultatif)",
            requiredField: "Ce champ est obligatoire",
            invalidEmail: "Veuillez entrer une adresse courriel valide",
            saveToConfluence: "Sauvegarder dans Confluence",
            confluenceSaving: "Sauvegarde dans Confluence...",
            confluenceSuccess: "Sauvegardé avec succès dans Confluence !",
            confluenceError: "Erreur lors de la sauvegarde dans Confluence. Veuillez réessayer.",
            assessmentSaved: "Évaluation sauvegardée avec succès ! Vous pouvez la consulter dans votre",
            assessmentHistory: "historique des évaluations",
            // Authentication UI
            login: "Connexion",
            register: "S'inscrire",
            logout: "Déconnexion",
            username: "Nom d'utilisateur",
            email: "Courriel",
            password: "Mot de passe",
            confirmPassword: "Confirmer le mot de passe",
            role: "Rôle",
            loginButton: "Se connecter",
            registerButton: "S'inscrire",
            welcomeUser: "Bienvenue",
            adminDashboard: "Tableau de bord administrateur",
            userManagement: "Gestion des utilisateurs",
            groupManagement: "Gestion des groupes",
            assessmentHistory: "Historique des évaluations",
            addUser: "Ajouter un utilisateur",
            editUser: "Modifier l'utilisateur",
            deleteUser: "Supprimer l'utilisateur",
            addGroup: "Ajouter un groupe",
            editGroup: "Modifier le groupe",
            deleteGroup: "Supprimer le groupe",
            manageMembers: "Gérer les membres",
            manageAssessments: "Gérer les évaluations",
            groupName: "Nom du groupe",
            groupDescription: "Description du groupe",
            members: "Membres",
            assessments: "Évaluations",
            actions: "Actions",
            save: "Sauvegarder",
            cancel: "Annuler",
            delete: "Supprimer",
            edit: "Modifier",
            add: "Ajouter",
            remove: "Retirer",
            close: "Fermer",
            confirm: "Confirmer",
            yes: "Oui",
            no: "Non",
            loading: "Chargement...",
            success: "Succès",
            error: "Erreur",
            warning: "Avertissement",
            info: "Information",
            sysAdmin: "Administrateur système",
            assessmentAdmin: "Administrateur d'évaluation",
            assessmentUser: "Utilisateur d'évaluation",
            anonymous: "Anonyme",
            selectRole: "Sélectionner un rôle",
            selectGroups: "Sélectionner des groupes",
            availableGroups: "Groupes disponibles",
            selectedGroups: "Groupes sélectionnés",
            noGroupsSelected: "Aucun groupe sélectionné",
            manageUsers: "Gérer les utilisateurs",
            manageUsersDesc: "Gérer les utilisateurs et leurs rôles",
            manageGroups: "Gérer les groupes",
            manageGroupsDesc: "Créer et gérer les groupes d'utilisateurs",
            assessmentAnalytics: "Analytiques d'évaluation",
            viewAnalytics: "Voir les analytiques",
            viewAnalyticsDesc: "Voir les statistiques et tendances d'évaluation",
            myProfile: "Mon profil",
            myAssessments: "Mes évaluations",
            allUsers: "Tous les utilisateurs",
            allGroups: "Tous les groupes",
            allAssessments: "Toutes les évaluations",
            createdAt: "Créé le",
            updatedAt: "Modifié le",
            lastLogin: "Dernière connexion",
            status: "Statut",
            active: "Actif",
            inactive: "Inactif",
            searchUsers: "Rechercher des utilisateurs...",
            searchGroups: "Rechercher des groupes...",
            searchAssessments: "Rechercher des évaluations...",
            noResults: "Aucun résultat trouvé",
            confirmDelete: "Êtes-vous sûr de vouloir supprimer cet élément ?",
            deleteSuccess: "Élément supprimé avec succès",
            saveSuccess: "Élément sauvegardé avec succès",
            updateSuccess: "Élément mis à jour avec succès",
            addSuccess: "Élément ajouté avec succès",
            operationFailed: "Opération échouée",
            invalidInput: "Entrée invalide",
            requiredFields: "Veuillez remplir tous les champs obligatoires",
            passwordMismatch: "Les mots de passe ne correspondent pas",
            emailExists: "Le courriel existe déjà",
            usernameExists: "Le nom d'utilisateur existe déjà",
            loginFailed: "Échec de la connexion",
            registrationFailed: "Échec de l'inscription",
            unauthorized: "Accès non autorisé",
            forbidden: "Accès interdit",
            notFound: "Élément non trouvé",
            serverError: "Erreur du serveur",
            networkError: "Erreur de réseau",
            tryAgain: "Veuillez réessayer",
            backToLogin: "Retour à la connexion",
            forgotPassword: "Mot de passe oublié ?",
            rememberMe: "Se souvenir de moi",
            stayLoggedIn: "Rester connecté",
            sessionExpired: "Session expirée. Veuillez vous reconnecter.",
            logoutSuccess: "Déconnexion réussie",
            profileUpdated: "Profil mis à jour avec succès",
            changePassword: "Changer le mot de passe",
            currentPassword: "Mot de passe actuel",
            newPassword: "Nouveau mot de passe",
            confirmNewPassword: "Confirmer le nouveau mot de passe",
            passwordChanged: "Mot de passe changé avec succès",
            profile: "Profil",
            settings: "Paramètres",
            preferences: "Préférences",
            account: "Compte",
            security: "Sécurité",
            privacy: "Confidentialité",
            notifications: "Notifications",
            language: "Langue",
            theme: "Thème",
            timezone: "Fuseau horaire",
            dateFormat: "Format de date",
            timeFormat: "Format d'heure",
            // Additional UI elements
            view: "Voir",
            compare: "Comparer",
            compareAssessments: "Comparer les évaluations",
            selectAssessments: "Sélectionnez les évaluations à comparer",
            noAssessments: "Aucune évaluation trouvée",
            loadingAssessments: "Chargement des évaluations...",
            assessmentDetails: "Détails de l'évaluation",
            overallLevel: "Niveau global",
            practiceAreaScores: "Scores par domaine de pratique",
            comparisonResults: "Résultats de la comparaison",
            firstAssessment: "Première évaluation",
            secondAssessment: "Deuxième évaluation",
            improvement: "Amélioration",
            decline: "Déclin",
            noChange: "Aucun changement",
            selectTwoAssessments: "Veuillez sélectionner exactement deux évaluations à comparer",
            backToHistory: "Retour à l'historique",
            exportComparison: "Exporter la comparaison",
            printComparison: "Imprimer la comparaison"
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
                    "Adopt a version control system (e.g., Git) & ensure all code & build scripts are stored there - This includes source code, configuration files, build scripts, and deployment configurations",
                    "Set up a simple build tool (e.g., Maven, Gradle) to standardize the build process - Implement consistent build scripts that can be run both locally and on CI servers",
                    "Introduce a basic Continuous Integration (CI) server (e.g., Jenkins) to trigger builds on code commits - Configure automated builds that run on every commit to maintain code quality",
                    "Write a minimal set of automated unit tests to run during builds, ensuring quick feedback - Focus on critical path testing to catch major issues early",
                    "Train the team on committing code frequently (at least daily) to encourage integration - Establish guidelines for regular commits and merges to minimize integration conflicts",
                    "Create basic build scripts"
                ],
                "0_1": [
                    "Automate build and test processes completely - Eliminate manual steps in the build pipeline and implement automated test suites for unit, integration, and functional tests",
                    "Implement mandatory code review practices - Set up pull request workflows with required approvals and automated quality checks",
                    "Set up automated dependency management - Use tools like Dependabot to automatically track and update dependencies with security patches",
                    "Configure build notifications and dashboards - Implement real-time build status notifications and create dashboards for build health monitoring",
                    "Establish branch management strategies - Implement GitFlow or trunk-based development with protected branches and automated merging policies"
                ],
                "1_2": [
                    "Implement comprehensive build metrics and monitoring - Track build times, success rates, test coverage, and code quality metrics with trending analysis",
                    "Set up parallel builds for performance optimization - Configure distributed builds and test execution to reduce pipeline duration",
                    "Integrate security scanning in builds - Implement SAST, DAST, and dependency vulnerability scanning in the build pipeline",
                    "Automate environment provisioning in builds - Include infrastructure-as-code for test environments in the build process",
                    "Implement artifact management and versioning - Set up artifact repositories with semantic versioning and automated publishing"
                ],
                "2_3": [
                    "Implement predictive build optimization - Use AI/ML to predict build failures and optimize build order based on historical data",
                    "Set up advanced caching strategies - Implement intelligent layer caching and distributed caching systems for faster builds",
                    "Deploy self-healing build infrastructure - Implement automated recovery and scaling of build agents with monitoring",
                    "Enable cross-team build analytics - Provide organization-wide build insights and performance metrics for continuous improvement",
                    "Implement chaos engineering in build pipeline - Regularly test build system resilience through controlled failure injection"
                ]
            },
            releaseManagement: {
                "-1_0": [
                    "Document detailed deployment procedures - Create step-by-step guides for all deployment processes, including pre and post-deployment checks",
                    "Implement basic version tracking - Establish a versioning scheme and maintain a deployment history log",
                    "Create comprehensive release checklists - Develop standardized checklists covering all aspects of the release process",
                    "Establish emergency rollback procedures - Document manual rollback steps and recovery processes",
                    "Define release communication protocols - Create templates for release announcements and stakeholder communications"
                ],
                "0_1": [
                    "Automate deployment scripts - Create repeatable deployment scripts with environment-specific configurations",
                    "Implement automated rollback capabilities - Set up automated rollback triggers and procedures for failed deployments",
                    "Establish release planning framework - Implement release calendars and coordination processes across teams",
                    "Set up deployment validation tests - Create automated smoke tests and basic health checks post-deployment",
                    "Implement artifact versioning - Establish consistent artifact naming and versioning conventions"
                ],
                "1_2": [
                    "Implement blue-green deployments - Set up parallel environments for zero-downtime deployments",
                    "Automate compliance and security checks - Integrate automated security scans and compliance validations in the deployment pipeline",
                    "Implement comprehensive release metrics - Track deployment frequency, success rates, and mean time to recovery",
                    "Set up automated environment promotion - Create automated promotion paths between environments with appropriate gates",
                    "Implement feature toggles - Deploy code with feature flags for controlled feature rollouts"
                ],
                "2_3": [
                    "Implement sophisticated canary deployments - Use traffic shifting and automated analysis for gradual rollouts",
                    "Set up advanced automated governance - Implement policy-as-code and automated compliance reporting",
                    "Deploy predictive release analytics - Use AI/ML for deployment risk assessment and optimal timing",
                    "Implement automated incident response - Create self-healing deployment processes with automated remediation",
                    "Enable cross-team release coordination - Implement dependency management and release train automation"
                ]
            },
            testing: {
                "-1_0": [
                    "Implement foundational unit tests - Create basic test cases for critical business logic and core functionality",
                    "Create comprehensive test documentation - Document test strategies, test cases, and testing procedures for manual and automated tests",
                    "Set up dedicated test environments - Establish isolated environments that mirror production for reliable testing",
                    "Define test data management - Create processes for managing test data and maintaining test data sets",
                    "Establish basic test reporting - Implement simple test result tracking and defect reporting procedures"
                ],
                "0_1": [
                    "Implement automated testing pipeline - Set up continuous testing in the CI pipeline with automated test execution",
                    "Develop integration test suite - Create automated tests for API endpoints, service interactions, and system interfaces",
                    "Establish test coverage metrics - Implement code coverage tracking and set minimum coverage requirements",
                    "Create automated regression tests - Build a suite of regression tests for critical user journeys",
                    "Implement test environment automation - Automate test environment provisioning and configuration"
                ],
                "1_2": [
                    "Implement comprehensive performance testing - Set up load testing, stress testing, and performance monitoring with defined SLAs",
                    "Establish security testing framework - Integrate automated security scans, penetration testing, and vulnerability assessments",
                    "Deploy advanced test automation framework - Implement behavior-driven development (BDD) and test-driven development (TDD) practices",
                    "Set up parallel test execution - Enable distributed test execution for faster feedback cycles",
                    "Implement test data automation - Create automated test data generation and management systems"
                ],
                "2_3": [
                    "Implement AI-driven test automation - Use machine learning for test case generation and optimization",
                    "Establish chaos engineering practices - Systematically inject failures to test system resilience",
                    "Deploy smart test selection - Use AI to predict which tests to run based on code changes",
                    "Implement visual testing automation - Use AI-powered visual regression testing for UI changes",
                    "Create self-healing test automation - Implement AI-driven test maintenance and automatic test repair"
                ]
            },
            dataManagement: {
                "-1_0": [
                    "Implement database version control - Set up version control for database schemas, migrations, and stored procedures using tools like Flyway or Liquibase",
                    "Create comprehensive backup procedures - Establish regular backup schedules, verification processes, and documented recovery procedures",
                    "Document data structures and relationships - Create detailed documentation of database schemas, tables, relationships, and data dictionaries",
                    "Establish basic data governance - Define data ownership, access controls, and basic data quality standards",
                    "Set up database monitoring - Implement basic monitoring for database health, performance, and storage usage"
                ],
                "0_1": [
                    "Implement automated backup and recovery - Set up automated backup processes with verification and automated recovery testing",
                    "Establish migration automation - Create repeatable database migration scripts with rollback capabilities",
                    "Implement data security policies - Define and enforce data encryption, access controls, and audit logging",
                    "Set up data validation rules - Implement automated checks for data integrity and consistency",
                    "Create database performance baselines - Establish monitoring for key performance metrics and query optimization"
                ],
                "1_2": [
                    "Implement zero-downtime migrations - Design and implement database changes with no service interruption",
                    "Set up comprehensive data quality monitoring - Implement automated data quality checks, profiling, and anomaly detection",
                    "Establish data lifecycle management - Implement automated data retention, archiving, and purging processes",
                    "Create advanced security measures - Implement row-level security, dynamic data masking, and advanced encryption",
                    "Deploy database performance optimization - Implement query optimization, indexing strategies, and automated performance tuning"
                ],
                "2_3": [
                    "Implement AI-driven data quality management - Use machine learning for data quality monitoring, prediction, and automated correction",
                    "Set up automated compliance monitoring - Deploy AI-powered tools for regulatory compliance checking and reporting",
                    "Establish predictive database management - Implement AI-driven capacity planning and performance optimization",
                    "Create self-healing data systems - Deploy automated error detection and correction mechanisms",
                    "Implement advanced data governance - Use AI for data classification, privacy protection, and policy enforcement"
                ]
            },
            configurationManagement: {
                "-1_0": [
                    "Create configuration documentation - Document all configurations, their purposes, defaults, and system impacts",
                    "Implement basic config files - Establish separate configuration files for different environments with explanatory comments",
                    "Set up environment variables - Define and document essential environment variables with secure defaults",
                    "Establish config standards - Create standardized naming conventions and structure for configurations",
                    "Implement basic security - Set up basic protection for sensitive configuration values"
                ],
                "0_1": [
                    "Implement config version control - Set up version control for all configuration files with change tracking",
                    "Set up config validation - Implement automated validation of configuration files and values",
                    "Create config management tools - Develop tools for configuration deployment and updates",
                    "Implement environment separation - Establish clear separation of configurations across environments",
                    "Set up configuration reviews - Implement review processes for configuration changes"
                ],
                "1_2": [
                    "Implement secret management - Deploy secure secret management with rotation and access control",
                    "Set up config automation - Automate configuration deployment and validation processes",
                    "Create config testing - Implement comprehensive testing of configuration changes",
                    "Establish config monitoring - Set up monitoring for configuration usage and impacts",
                    "Implement configuration as code - Treat configuration as code with proper version control and testing"
                ],
                "2_3": [
                    "Implement dynamic configuration - Deploy real-time configuration updates without restarts",
                    "Set up AI-driven config optimization - Use machine learning for configuration optimization",
                    "Implement zero-trust config management - Deploy advanced security with strict access controls",
                    "Establish predictive analysis - Deploy AI for predicting configuration impacts",
                    "Implement advanced security - Set up advanced encryption and access controls for configurations"
                ]
            },
            applicationArchitecture: {
                "-1_0": [
                    "Document current architecture - Create detailed documentation of existing architecture, including data flows and dependencies",
                    "Identify system boundaries - Clearly define interfaces and integration points between different components",
                    "Create component diagrams - Develop detailed diagrams showing component relationships and interactions",
                    "Establish coding standards - Define and document coding conventions and best practices",
                    "Set up architecture review - Establish regular review process to evaluate architectural alignment"
                ],
                "0_1": [
                    "Implement modular design - Restructure application into independent modules with well-defined interfaces",
                    "Set up API guidelines - Establish REST standards, OpenAPI documentation, and interface contracts",
                    "Create scalability plan - Develop architectural evolution strategy with measurable objectives",
                    "Implement separation of concerns - Clearly separate business logic, data access, and user interface",
                    "Establish architectural metrics - Define and measure architectural quality indicators"
                ],
                "1_2": [
                    "Implement microservices - Design and deploy microservices architecture with well-defined business domains",
                    "Set up service mesh - Implement service mesh for traffic management, security, and observability",
                    "Create resilience patterns - Implement resilience patterns like Circuit Breaker, Bulkhead, and Fallback",
                    "Implement asynchronous communication - Set up messaging systems and queues",
                    "Establish service contracts - Define and maintain strict service contracts between components"
                ],
                "2_3": [
                    "Implement event-driven architecture - Set up event-driven system with CQRS and Event Sourcing",
                    "Set up AI-driven optimization - Use machine learning to optimize architectural decisions",
                    "Create self-healing systems - Implement auto-healing and self-optimization mechanisms",
                    "Implement adaptive architecture - Develop systems that automatically adapt to load changes",
                    "Establish advanced architectural governance - Set up automated architectural validation and optimization processes"
                ]
            },
            environments: {
                "-1_0": [
                    "Document environment setup - Create detailed documentation of all environments, including configurations and dependencies",
                    "Create basic provisioning scripts - Develop scripts to automate consistent environment creation",
                    "Set up environment tracking - Implement version tracking and change management for environments",
                    "Establish environment standards - Define standard configurations for each environment type",
                    "Implement secrets management - Set up secure management of sensitive information"
                ],
                "0_1": [
                    "Implement infrastructure as code - Use tools like Terraform or CloudFormation for infrastructure management",
                    "Set up environment automation - Implement automated pipelines for environment provisioning",
                    "Create environment testing - Develop automated tests to validate environment compliance",
                    "Implement configuration management - Use configuration management tools like Ansible or Chef",
                    "Establish environment metrics - Define and monitor environment performance indicators"
                ],
                "1_2": [
                    "Implement immutable infrastructure - Adopt immutable infrastructure practices with containers and system images",
                    "Set up auto-scaling - Implement automatic scaling based on load and metrics",
                    "Create disaster recovery - Implement automated recovery and failover strategies",
                    "Implement automated security - Integrate automated security controls into provisioning",
                    "Establish continuous compliance - Set up automated compliance checks"
                ],
                "2_3": [
                    "Implement predictive scaling - Use AI to predict and automatically adjust resources",
                    "Set up self-healing environments - Deploy self-healing mechanisms for infrastructure issues",
                    "Create AI-driven optimization - Implement automated resource and cost optimization",
                    "Implement autonomous orchestration - Develop intelligent orchestration systems for environment management",
                    "Establish advanced governance - Set up automated governance with continuous validation and optimization"
                ]
            },
            observability: {
                "-1_0": [
                    "Implement basic logging - Set up structured logging system with appropriate severity levels",
                    "Set up system monitoring - Establish baseline monitoring for essential system metrics",
                    "Create alert rules - Define thresholds for critical incident alerting",
                    "Establish logging formats - Standardize log formats to facilitate analysis",
                    "Set up log rotation - Implement efficient log storage management"
                ],
                "0_1": [
                    "Implement centralized logging - Deploy centralized log collection and analysis system",
                    "Set up metrics collection - Implement automated collection of application and system metrics",
                    "Create dashboards - Develop clear visualizations for system health monitoring",
                    "Implement log aggregation - Set up tools for log correlation and analysis",
                    "Establish advanced alerting - Configure alerts based on complex conditions"
                ],
                "1_2": [
                    "Implement distributed tracing - Set up transaction tracing across distributed services",
                    "Set up SLO monitoring - Establish and monitor service level objectives",
                    "Create automated analysis - Develop automated systems for incident and performance analysis",
                    "Implement anomaly detection - Set up automated detection of abnormal behavior",
                    "Establish business dashboards - Create business-oriented visualizations for KPI tracking"
                ],
                "2_3": [
                    "Implement AI-driven observability - Use machine learning to enhance detection and analysis",
                    "Set up predictive analytics - Implement systems for incident and performance prediction",
                    "Create autonomous operations - Develop self-adaptive systems for incident management",
                    "Implement self-diagnosis - Deploy automated diagnostic and resolution capabilities",
                    "Establish continuous optimization - Set up data-driven continuous optimization systems"
                ]
            }
        },
        fr_CA: {
            buildManagement: {
                "-1_0": [
                    "Adopter un système de contrôle de version (ex: Git) et s'assurer que tout le code et les scripts de build y sont stockés - Inclure le code source, les fichiers de configuration, les scripts de build et les configurations de déploiement",
                    "Mettre en place un outil de build simple (ex: Maven, Gradle) pour standardiser le processus de build - Implémenter des scripts de build cohérents qui peuvent être exécutés localement et sur les serveurs CI",
                    "Introduire un serveur d'Intégration Continue (IC) basique (ex: Jenkins) pour déclencher des builds lors des commits - Configurer des builds automatisés qui s'exécutent à chaque commit pour maintenir la qualité du code",
                    "Écrire un ensemble minimal de tests unitaires automatisés à exécuter pendant les builds, assurant un retour rapide - Se concentrer sur les tests des chemins critiques pour détecter les problèmes majeurs tôt",
                    "Former l'équipe à commiter le code fréquemment (au moins quotidiennement) pour encourager l'intégration - Établir des directives pour les commits et les fusions réguliers afin de minimiser les conflits d'intégration",
                    "Créer des scripts de build basiques"
                ],
                "0_1": [
                    "Automatiser complètement les processus de build et de test - Éliminer les étapes manuelles dans le pipeline de build et implémenter des suites de tests automatisés pour les tests unitaires, d'intégration et fonctionnels",
                    "Mettre en place des pratiques obligatoires de revue de code - Configurer des workflows de pull request avec approbations requises et vérifications automatisées de qualité",
                    "Configurer la gestion automatisée des dépendances - Utiliser des outils comme Dependabot pour suivre et mettre à jour automatiquement les dépendances avec les correctifs de sécurité",
                    "Configurer les notifications et tableaux de bord de build - Implémenter des notifications en temps réel de l'état des builds et créer des tableaux de bord pour surveiller la santé des builds",
                    "Établir des stratégies de gestion des branches - Implémenter GitFlow ou le développement trunk-based avec des branches protégées et des politiques de fusion automatisées"
                ],
                "1_2": [
                    "Implémenter des métriques complètes de build et monitoring - Suivre les temps de build, taux de succès, couverture de tests et métriques de qualité du code avec analyse des tendances",
                    "Configurer des builds parallèles pour l'optimisation - Configurer des builds distribués et l'exécution des tests pour réduire la durée du pipeline",
                    "Intégrer l'analyse de sécurité dans les builds - Implémenter SAST, DAST et l'analyse des vulnérabilités des dépendances dans le pipeline de build",
                    "Automatiser le provisionnement d'environnement dans les builds - Inclure l'infrastructure-as-code pour les environnements de test dans le processus de build",
                    "Implémenter la gestion et le versionnement des artefacts - Mettre en place des dépôts d'artefacts avec versionnement sémantique et publication automatisée"
                ],
                "2_3": [
                    "Implémenter l'optimisation prédictive des builds - Utiliser l'IA/ML pour prédire les échecs de build et optimiser l'ordre des builds basé sur les données historiques",
                    "Configurer des stratégies de cache avancées - Implémenter la mise en cache intelligente des couches et des systèmes de cache distribués pour des builds plus rapides",
                    "Déployer une infrastructure de build auto-réparatrice - Implémenter la récupération automatique et la mise à l'échelle des agents de build avec monitoring",
                    "Activer l'analyse des builds inter-équipes - Fournir des insights et métriques de performance à l'échelle de l'organisation pour l'amélioration continue",
                    "Implémenter l'ingénierie du chaos dans le pipeline de build - Tester régulièrement la résilience du système de build par l'injection contrôlée de pannes"
                ]
            },
            releaseManagement: {
                "-1_0": [
                    "Documenter les procédures de déploiement détaillées - Créer des guides étape par étape pour tous les processus de déploiement, y compris les vérifications avant et après déploiement",
                    "Implémenter le suivi de version de base - Établir un schéma de versionnement et maintenir un journal d'historique des déploiements",
                    "Créer des listes de contrôle de version complètes - Développer des listes standardisées couvrant tous les aspects du processus de version",
                    "Établir des procédures de rollback d'urgence - Documenter les étapes de rollback manuel et les processus de récupération",
                    "Définir des protocoles de communication de version - Créer des modèles pour les annonces de version et les communications aux parties prenantes"
                ],
                "0_1": [
                    "Automatiser les scripts de déploiement - Créer des scripts de déploiement répétables avec des configurations spécifiques à l'environnement",
                    "Implémenter les capacités de rollback automatisé - Mettre en place des déclencheurs et procédures de rollback automatisés pour les déploiements échoués",
                    "Établir un cadre de planification des versions - Implémenter des calendriers de version et des processus de coordination entre les équipes",
                    "Mettre en place des tests de validation de déploiement - Créer des tests de fumée automatisés et des vérifications de santé de base post-déploiement",
                    "Implémenter le versionnement des artefacts - Établir des conventions cohérentes de nommage et de versionnement des artefacts"
                ],
                "1_2": [
                    "Implémenter les déploiements blue-green - Mettre en place des environnements parallèles pour des déploiements sans temps d'arrêt",
                    "Automatiser les vérifications de conformité et de sécurité - Intégrer des analyses de sécurité automatisées et des validations de conformité dans le pipeline de déploiement",
                    "Implémenter des métriques de version complètes - Suivre la fréquence des déploiements, les taux de succès et le temps moyen de récupération",
                    "Mettre en place la promotion automatisée des environnements - Créer des chemins de promotion automatisés entre les environnements avec des portes appropriées",
                    "Implémenter les bascules de fonctionnalités - Déployer du code avec des indicateurs de fonctionnalités pour des lancements contrôlés"
                ],
                "2_3": [
                    "Implémenter des déploiements canary sophistiqués - Utiliser le basculement de trafic et l'analyse automatisée pour des déploiements progressifs",
                    "Mettre en place une gouvernance automatisée avancée - Implémenter la politique-as-code et les rapports de conformité automatisés",
                    "Déployer l'analytique prédictive des versions - Utiliser l'IA/ML pour l'évaluation des risques de déploiement et le timing optimal",
                    "Implémenter la réponse automatisée aux incidents - Créer des processus de déploiement auto-réparateurs avec remédiation automatisée",
                    "Activer la coordination des versions inter-équipes - Implémenter la gestion des dépendances et l'automatisation des trains de version"
                ]
            },
            testing: {
                "-1_0": [
                    "Implémenter des tests unitaires fondamentaux - Créer des cas de test de base pour la logique métier critique et les fonctionnalités principales",
                    "Créer une documentation complète des tests - Documenter les stratégies, les cas de test et les procédures pour les tests manuels et automatisés",
                    "Mettre en place des environnements de test dédiés - Établir des environnements isolés qui reflètent la production pour des tests fiables",
                    "Définir la gestion des données de test - Créer des processus pour gérer les données de test et maintenir les jeux de données",
                    "Établir des rapports de test basiques - Implémenter le suivi des résultats de test et les procédures de signalement des défauts"
                ],
                "0_1": [
                    "Implémenter un pipeline de tests automatisés - Mettre en place des tests continus dans le pipeline CI avec exécution automatisée",
                    "Développer une suite de tests d'intégration - Créer des tests automatisés pour les points d'API, les interactions de services et les interfaces système",
                    "Établir des métriques de couverture de tests - Implémenter le suivi de la couverture de code et définir des exigences minimales",
                    "Créer des tests de régression automatisés - Construire une suite de tests de régression pour les parcours utilisateurs critiques",
                    "Implémenter l'automatisation des environnements de test - Automatiser le provisionnement et la configuration des environnements de test"
                ],
                "1_2": [
                    "Implémenter des tests de performance complets - Mettre en place des tests de charge, de stress et la surveillance des performances avec des SLA définis",
                    "Établir un cadre de tests de sécurité - Intégrer des analyses de sécurité automatisées, des tests de pénétration et des évaluations de vulnérabilité",
                    "Déployer un framework de test avancé - Implémenter des pratiques de développement piloté par le comportement (BDD) et par les tests (TDD)",
                    "Mettre en place l'exécution parallèle des tests - Permettre l'exécution distribuée des tests pour des cycles de feedback plus rapides",
                    "Implémenter l'automatisation des données de test - Créer des systèmes automatisés de génération et de gestion des données de test"
                ],
                "2_3": [
                    "Implémenter l'automatisation des tests pilotée par l'IA - Utiliser l'apprentissage automatique pour la génération et l'optimisation des cas de test",
                    "Établir des pratiques d'ingénierie du chaos - Injecter systématiquement des pannes pour tester la résilience du système",
                    "Déployer la sélection intelligente des tests - Utiliser l'IA pour prédire quels tests exécuter en fonction des changements de code",
                    "Implémenter l'automatisation des tests visuels - Utiliser des tests de régression visuelle pilotés par l'IA pour les changements d'interface",
                    "Créer une automatisation des tests auto-réparante - Implémenter la maintenance des tests pilotée par l'IA et la réparation automatique des tests"
                ]
            },
            dataManagement: {
                "-1_0": [
                    "Implémenter le contrôle de version de base de données - Mettre en place un contrôle de version pour les schémas, migrations et procédures stockées en utilisant des outils comme Flyway ou Liquibase",
                    "Créer des procédures de sauvegarde complètes - Établir des calendriers de sauvegarde réguliers, des processus de vérification et des procédures de récupération documentées",
                    "Documenter les structures et relations de données - Créer une documentation détaillée des schémas de base de données, tables, relations et dictionnaires de données",
                    "Établir une gouvernance de données de base - Définir la propriété des données, les contrôles d'accès et les normes de qualité de données de base",
                    "Mettre en place la surveillance des bases de données - Implémenter une surveillance de base pour la santé, les performances et l'utilisation du stockage"
                ],
                "0_1": [
                    "Implémenter la sauvegarde et la récupération automatisées - Mettre en place des processus de sauvegarde automatisés avec vérification et tests de récupération automatisés",
                    "Établir l'automatisation des migrations - Créer des scripts de migration de base de données reproductibles avec capacités de rollback",
                    "Implémenter des politiques de sécurité des données - Définir et appliquer le chiffrement des données, les contrôles d'accès et la journalisation des audits",
                    "Configurer des règles de validation des données - Implémenter des vérifications automatisées pour l'intégrité et la cohérence des données",
                    "Créer des références de performance - Établir une surveillance des métriques de performance clés et l'optimisation des requêtes"
                ],
                "1_2": [
                    "Implémenter des migrations sans interruption - Concevoir et implémenter des changements de base de données sans interruption de service",
                    "Configurer une surveillance complète de la qualité des données - Implémenter des vérifications automatisées de la qualité des données, le profilage et la détection d'anomalies",
                    "Établir la gestion du cycle de vie des données - Implémenter des processus automatisés de rétention, d'archivage et de purge des données",
                    "Créer des mesures de sécurité avancées - Implémenter la sécurité au niveau des lignes, le masquage dynamique des données et le chiffrement avancé",
                    "Déployer l'optimisation des performances - Implémenter l'optimisation des requêtes, les stratégies d'indexation et l'ajustement automatique des performances"
                ],
                "2_3": [
                    "Implémenter la gestion de la qualité des données pilotée par l'IA - Utiliser l'apprentissage automatique pour la surveillance, la prédiction et la correction automatique de la qualité des données",
                    "Configurer la surveillance automatisée de la conformité - Déployer des outils pilotés par l'IA pour la vérification et le reporting de la conformité réglementaire",
                    "Établir la gestion prédictive des bases de données - Implémenter la planification de la capacité et l'optimisation des performances pilotées par l'IA",
                    "Créer des systèmes de données auto-réparateurs - Déployer des mécanismes automatisés de détection et de correction des erreurs",
                    "Implémenter une gouvernance avancée des données - Utiliser l'IA pour la classification des données, la protection de la vie privée et l'application des politiques"
                ]
            },
            configurationManagement: {
                "-1_0": [
                    "Créer la documentation de configuration complète - Documenter toutes les configurations, leurs objectifs, valeurs par défaut et impacts sur le système",
                    "Implémenter des fichiers de config basiques - Établir des fichiers de configuration séparés pour différents environnements avec des commentaires explicatifs",
                    "Configurer les variables d'environnement - Définir et documenter les variables d'environnement essentielles avec des valeurs par défaut sécurisées",
                    "Établir des standards de nommage - Créer des conventions de nommage cohérentes pour les paramètres de configuration",
                    "Mettre en place la validation de base - Implémenter des vérifications simples pour les valeurs de configuration critiques"
                ],
                "0_1": [
                    "Implémenter le contrôle de version de config - Mettre en place un système de gestion de version pour tous les fichiers de configuration",
                    "Configurer la validation de config avancée - Créer des schémas de validation pour garantir l'intégrité des configurations",
                    "Créer des outils de gestion de config - Développer des utilitaires pour la gestion et le déploiement des configurations",
                    "Implémenter la séparation des configurations - Séparer les configurations par environnement et par composant",
                    "Établir des processus de revue - Mettre en place des procédures de revue pour les changements de configuration"
                ],
                "1_2": [
                    "Implémenter la gestion des secrets - Mettre en place un système sécurisé de gestion des secrets avec rotation automatique",
                    "Configurer l'automatisation de config - Automatiser le déploiement et la validation des configurations",
                    "Créer des tests de configuration - Développer des tests automatisés pour valider les configurations",
                    "Implémenter la détection des dérives - Mettre en place la surveillance des changements de configuration non autorisés",
                    "Établir l'audit des configurations - Créer des pistes d'audit détaillées pour tous les changements de configuration"
                ],
                "2_3": [
                    "Implémenter la configuration dynamique - Mettre en place un système de configuration en temps réel avec rollback automatique",
                    "Configurer l'optimisation de config par l'IA - Utiliser l'apprentissage automatique pour optimiser les paramètres de configuration",
                    "Implémenter la gestion de config zero-trust - Établir une sécurité maximale avec validation continue des configurations",
                    "Créer des systèmes auto-adaptatifs - Développer des configurations qui s'ajustent automatiquement selon les conditions",
                    "Établir une gouvernance avancée - Implémenter des politiques de configuration pilotées par l'IA avec conformité automatisée"
                ]
            },
            applicationArchitecture: {
                "-1_0": [
                    "Documenter l'architecture actuelle - Créer une documentation détaillée de l'architecture existante, incluant les flux de données et les dépendances",
                    "Identifier les limites du système - Définir clairement les interfaces et les points d'intégration entre les différents composants",
                    "Créer des diagrammes de composants - Développer des diagrammes détaillés montrant les relations entre les composants et leurs interactions",
                    "Établir des standards de code - Définir et documenter les conventions de codage et les meilleures pratiques",
                    "Mettre en place la revue d'architecture - Établir un processus de revue régulier pour évaluer l'alignement architectural"
                ],
                "0_1": [
                    "Implémenter une conception modulaire - Restructurer l'application en modules indépendants avec des interfaces bien définies",
                    "Configurer les directives d'API - Établir des standards REST, la documentation OpenAPI et les contrats d'interface",
                    "Créer un plan d'évolutivité - Développer une stratégie d'évolution architecturale avec des objectifs mesurables",
                    "Implémenter la séparation des préoccupations - Séparer clairement la logique métier, l'accès aux données et l'interface utilisateur",
                    "Établir des métriques architecturales - Définir et mesurer des indicateurs de qualité architecturale"
                ],
                "1_2": [
                    "Implémenter les microservices - Concevoir et déployer une architecture de microservices avec des domaines métier bien définis",
                    "Configurer le service mesh - Mettre en place un maillage de services pour la gestion du trafic, la sécurité et l'observabilité",
                    "Créer des modèles de résilience - Implémenter des patterns de résilience comme Circuit Breaker, Bulkhead et Fallback",
                    "Implémenter la communication asynchrone - Mettre en place des systèmes de messagerie et de files d'attente",
                    "Établir des contrats de service - Définir et maintenir des contrats de service stricts entre les composants"
                ],
                "2_3": [
                    "Implémenter l'architecture événementielle - Mettre en place un système d'architecture pilotée par les événements avec CQRS et Event Sourcing",
                    "Configurer l'optimisation pilotée par l'IA - Utiliser l'apprentissage automatique pour optimiser les décisions architecturales",
                    "Créer des systèmes auto-réparants - Implémenter des mécanismes d'auto-guérison et d'auto-optimisation",
                    "Implémenter l'architecture adaptative - Développer des systèmes qui s'adaptent automatiquement aux changements de charge",
                    "Établir une gouvernance architecturale avancée - Mettre en place des processus automatisés de validation et d'optimisation architecturale"
                ]
            },
            environments: {
                "-1_0": [
                    "Documenter la configuration des environnements - Créer une documentation détaillée de tous les environnements, incluant les configurations et dépendances",
                    "Créer des scripts de provisionnement basiques - Développer des scripts pour automatiser la création d'environnements cohérents",
                    "Configurer le suivi des environnements - Mettre en place un système de suivi des versions et des modifications d'environnement",
                    "Établir des standards d'environnement - Définir des configurations standard pour chaque type d'environnement",
                    "Implémenter la gestion des secrets - Mettre en place une gestion sécurisée des informations sensibles"
                ],
                "0_1": [
                    "Implémenter l'infrastructure as code - Utiliser des outils comme Terraform ou CloudFormation pour gérer l'infrastructure",
                    "Configurer l'automatisation des environnements - Mettre en place des pipelines automatisés pour le provisionnement d'environnements",
                    "Créer des tests d'environnement - Développer des tests automatisés pour valider la conformité des environnements",
                    "Implémenter la gestion des configurations - Utiliser des outils de gestion de configuration comme Ansible ou Chef",
                    "Établir des métriques d'environnement - Définir et surveiller des indicateurs de performance des environnements"
                ],
                "1_2": [
                    "Implémenter l'infrastructure immuable - Adopter des pratiques d'infrastructure immuable avec des conteneurs et des images système",
                    "Configurer l'auto-scaling - Mettre en place la mise à l'échelle automatique basée sur la charge et les métriques",
                    "Créer la reprise après sinistre - Implémenter des stratégies de récupération et de basculement automatisées",
                    "Implémenter la sécurité automatisée - Intégrer des contrôles de sécurité automatisés dans le provisionnement",
                    "Établir la conformité continue - Mettre en place des vérifications automatisées de conformité"
                ],
                "2_3": [
                    "Implémenter la mise à l'échelle prédictive - Utiliser l'IA pour prédire et ajuster automatiquement les ressources",
                    "Configurer les environnements auto-réparants - Déployer des mécanismes d'auto-guérison pour les problèmes d'infrastructure",
                    "Créer l'optimisation pilotée par l'IA - Implémenter l'optimisation automatique des ressources et des coûts",
                    "Implémenter l'orchestration autonome - Développer des systèmes d'orchestration intelligents pour la gestion des environnements",
                    "Établir une gouvernance avancée - Mettre en place une gouvernance automatisée avec validation et optimisation continues"
                ]
            },
            observability: {
                "-1_0": [
                    "Implémenter la journalisation de base - Mettre en place un système de journalisation structuré avec des niveaux de gravité appropriés",
                    "Configurer la surveillance du système - Établir une surveillance de base pour les métriques système essentielles",
                    "Créer des règles d'alerte - Définir des seuils d'alerte pour les incidents critiques",
                    "Établir des formats de journalisation - Standardiser les formats de logs pour faciliter l'analyse",
                    "Mettre en place la rotation des logs - Implémenter une gestion efficace du stockage des journaux"
                ],
                "0_1": [
                    "Implémenter la journalisation centralisée - Déployer un système centralisé de collecte et d'analyse des logs",
                    "Configurer la collecte de métriques - Mettre en place une collecte automatisée des métriques applicatives et système",
                    "Créer des tableaux de bord - Développer des visualisations claires pour surveiller l'état du système",
                    "Implémenter l'agrégation des logs - Mettre en place des outils pour corréler et analyser les journaux",
                    "Établir des alertes avancées - Configurer des alertes basées sur des conditions complexes"
                ],
                "1_2": [
                    "Implémenter le traçage distribué - Mettre en place le traçage des transactions à travers les services distribués",
                    "Configurer la surveillance des SLO - Établir et surveiller les objectifs de niveau de service",
                    "Créer l'analyse automatisée - Développer des systèmes d'analyse automatique des incidents et des performances",
                    "Implémenter la détection d'anomalies - Mettre en place des systèmes de détection automatique des comportements anormaux",
                    "Établir des tableaux de bord métier - Créer des visualisations orientées métier pour suivre les KPIs"
                ],
                "2_3": [
                    "Implémenter l'observabilité pilotée par l'IA - Utiliser l'apprentissage automatique pour améliorer la détection et l'analyse",
                    "Configurer l'analytique prédictive - Mettre en place des systèmes de prédiction des incidents et des performances",
                    "Créer les opérations autonomes - Développer des systèmes auto-adaptatifs pour la gestion des incidents",
                    "Implémenter l'auto-diagnostic - Déployer des capacités d'auto-diagnostic et de résolution automatisée",
                    "Établir l'optimisation continue - Mettre en place des systèmes d'optimisation continue basés sur l'analyse des données"
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

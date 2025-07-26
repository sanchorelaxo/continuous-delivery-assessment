/**
 * Complete French translations for all 48 questions in MongoDB
 */

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '../../.env' });

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cd_assessment';
const dbName = 'cd_assessment';

// Complete French translations for all practice areas
const frenchTranslations = {
  // Release Management
  RM1: {
    text: "Stratégie de Déploiement",
    options: [
      "Déploiements manuels",
      "Déploiements scriptés de base",
      "Déploiements automatisés avec rollback",
      "Déploiements bleu-vert/canary",
      "Déploiements adaptatifs par IA"
    ]
  },
  RM2: {
    text: "Gestion des Versions",
    options: [
      "Aucun versioning",
      "Versioning manuel",
      "Versioning sémantique automatisé",
      "Versioning avec métadonnées",
      "Versioning intelligent par IA"
    ]
  },
  RM3: {
    text: "Planification des Versions",
    options: [
      "Aucune planification de version",
      "Planification basique avec coordination manuelle",
      "Planification automatisée avec dépendances",
      "Orchestration avancée avec analytiques",
      "Optimisation de version par IA"
    ]
  },
  RM4: {
    text: "Gestion du Changement",
    options: [
      "Aucun processus de gestion du changement",
      "Suivi et approbations basiques des changements",
      "Workflow automatisé de gestion du changement",
      "Gestion du changement basée sur les risques",
      "Analyse d'impact du changement par IA"
    ]
  },
  RM5: {
    text: "Validation des Versions",
    options: [
      "Aucune validation de version",
      "Tests de fumée basiques post-déploiement",
      "Suite de validation automatisée avec surveillance",
      "Validation avancée avec surveillance synthétique",
      "Évaluation de qualité de version par IA"
    ]
  },
  RM6: {
    text: "Documentation des Versions",
    options: [
      "Aucune documentation de version",
      "Notes de version et logs basiques",
      "Génération automatisée de documentation",
      "Documentation complète avec métriques",
      "Documentation assistée par IA avec analyse d'impact"
    ]
  },

  // Testing
  TEST1: {
    text: "Tests Unitaires",
    options: [
      "Aucun test unitaire",
      "Tests unitaires basiques",
      "Tests unitaires avec couverture",
      "Tests unitaires avec mutation testing",
      "Tests unitaires optimisés par IA"
    ]
  },
  TEST2: {
    text: "Tests d'Intégration",
    options: [
      "Aucun test d'intégration",
      "Tests d'intégration manuels",
      "Tests d'intégration automatisés",
      "Tests d'intégration avec environnements dédiés",
      "Tests d'intégration adaptatifs par IA"
    ]
  },
  TEST3: {
    text: "Tests de Performance",
    options: [
      "Aucun test de performance",
      "Tests de performance ad-hoc",
      "Tests de performance automatisés",
      "Tests de performance avec profiling",
      "Optimisation de performance par IA"
    ]
  },
  TEST4: {
    text: "Tests de Sécurité",
    options: [
      "Aucun test de sécurité",
      "Scans de sécurité basiques",
      "Tests de sécurité automatisés",
      "Tests de sécurité avec threat modeling",
      "Sécurité prédictive par IA"
    ]
  },
  TEST5: {
    text: "Tests d'Acceptation",
    options: [
      "Aucun test d'acceptation",
      "Tests d'acceptation manuels",
      "Tests d'acceptation automatisés",
      "BDD avec tests d'acceptation",
      "Tests d'acceptation intelligents par IA"
    ]
  },
  TEST6: {
    text: "Stratégie de Test",
    options: [
      "Aucune stratégie de test",
      "Stratégie de test basique",
      "Stratégie de test complète",
      "Stratégie de test adaptative",
      "Stratégie de test optimisée par IA"
    ]
  },

  // Data Management
  DATA1: {
    text: "Gestion des Données",
    options: [
      "Gestion manuelle des données",
      "Scripts de gestion des données",
      "Gestion automatisée des données",
      "Gestion des données avec gouvernance",
      "Gestion des données par IA"
    ]
  },
  DATA2: {
    text: "Sauvegarde et Récupération",
    options: [
      "Aucune sauvegarde",
      "Sauvegardes manuelles",
      "Sauvegardes automatisées",
      "Sauvegardes avec test de récupération",
      "Sauvegardes intelligentes par IA"
    ]
  },
  DATA3: {
    text: "Versioning des Données",
    options: [
      "Aucun versioning des données",
      "Versioning manuel des schémas",
      "Migrations automatisées de schémas",
      "Versioning avec rollback",
      "Évolution de schéma par IA"
    ]
  },
  DATA4: {
    text: "Migration des Données",
    options: [
      "Aucun processus de migration",
      "Migration manuelle avec validation basique",
      "Migration automatisée avec vérification",
      "Migration sans interruption",
      "Optimisation de migration par IA"
    ]
  },
  DATA5: {
    text: "Qualité des Données",
    options: [
      "Aucun contrôle qualité",
      "Règles basiques de validation",
      "Vérifications automatisées de qualité",
      "Surveillance proactive de la qualité",
      "Optimisation de qualité par IA"
    ]
  },
  DATA6: {
    text: "Conformité des Données",
    options: [
      "Aucune conformité",
      "Conformité basique",
      "Conformité automatisée",
      "Conformité avec audit trail",
      "Conformité intelligente par IA"
    ]
  },

  // Configuration Management
  CM1: {
    text: "Gestion de Configuration",
    options: [
      "Configuration manuelle",
      "Fichiers de configuration",
      "Configuration comme code",
      "Configuration avec validation",
      "Configuration adaptative par IA"
    ]
  },
  CM2: {
    text: "Gestion des Secrets",
    options: [
      "Secrets en dur dans le code",
      "Fichiers de secrets séparés",
      "Coffre-fort de secrets",
      "Rotation automatique des secrets",
      "Gestion de secrets par IA"
    ]
  },
  CM3: {
    text: "Dérive de Configuration",
    options: [
      "Aucune détection de dérive",
      "Vérifications manuelles",
      "Détection automatisée de dérive",
      "Correction automatique de dérive",
      "Prévention de dérive par IA"
    ]
  },
  CM4: {
    text: "Gestion des Environnements",
    options: [
      "Environnements configurés manuellement",
      "Environnements standardisés",
      "Environnements reproductibles",
      "Environnements immutables",
      "Environnements adaptatifs par IA"
    ]
  },
  CM5: {
    text: "Audit de Configuration",
    options: [
      "Aucun audit",
      "Audit manuel",
      "Audit automatisé",
      "Audit avec conformité",
      "Audit intelligent par IA"
    ]
  },
  CM6: {
    text: "Rollback de Configuration",
    options: [
      "Aucun rollback",
      "Rollback manuel",
      "Rollback automatisé",
      "Rollback avec validation",
      "Rollback prédictif par IA"
    ]
  },

  // Observability
  OBS1: {
    text: "Surveillance des Applications",
    options: [
      "Aucune surveillance",
      "Logs basiques",
      "Métriques et alertes",
      "Surveillance complète (logs, métriques, traces)",
      "Surveillance intelligente par IA"
    ]
  },
  OBS2: {
    text: "Gestion des Logs",
    options: [
      "Aucune gestion de logs",
      "Logs locaux",
      "Logs centralisés",
      "Logs structurés avec recherche",
      "Analyse de logs par IA"
    ]
  },
  OBS3: {
    text: "Métriques et Alertes",
    options: [
      "Aucune métrique",
      "Métriques basiques",
      "Métriques avec alertes",
      "Métriques avec SLI/SLO",
      "Métriques prédictives par IA"
    ]
  },
  OBS4: {
    text: "Traçage Distribué",
    options: [
      "Aucun traçage",
      "Traçage basique",
      "Traçage distribué",
      "Traçage avec analyse de performance",
      "Traçage intelligent par IA"
    ]
  },
  OBS5: {
    text: "Tableaux de Bord",
    options: [
      "Aucun tableau de bord",
      "Tableaux de bord statiques",
      "Tableaux de bord interactifs",
      "Tableaux de bord adaptatifs",
      "Tableaux de bord par IA"
    ]
  },
  OBS6: {
    text: "Analyse des Incidents",
    options: [
      "Aucune analyse d'incident",
      "Post-mortems manuels",
      "Analyse automatisée d'incidents",
      "Analyse prédictive d'incidents",
      "Prévention d'incidents par IA"
    ]
  }
};

async function addAllFrenchTranslations() {
  const client = new MongoClient(mongoUri);
  
  try {
    await client.connect();
    console.log('🔌 Connected to MongoDB');
    
    const db = client.db(dbName);
    const collection = db.collection('questions');
    
    let updatedCount = 0;
    let notFoundCount = 0;
    
    console.log('🔄 Adding French translations to all questions...\n');
    
    // Update each question with French translations
    for (const [questionId, frenchData] of Object.entries(frenchTranslations)) {
      const question = await collection.findOne({ id: questionId });
      
      if (question && question.options) {
        const updatedOptions = question.options.map((option, index) => ({
          ...option,
          text: {
            ...option.text,
            fr_CA: frenchData.options[index] || option.text.en_CA
          }
        }));
        
        await collection.updateOne(
          { id: questionId },
          {
            $set: {
              'text.fr_CA': frenchData.text,
              options: updatedOptions,
              updatedAt: new Date()
            }
          }
        );
        
        updatedCount++;
        console.log(`✅ ${questionId}: ${frenchData.text}`);
      } else {
        notFoundCount++;
        console.log(`❌ Question ${questionId} not found`);
      }
    }
    
    console.log(`\n🎉 Translation Summary:`);
    console.log(`   ✅ Updated: ${updatedCount} questions`);
    console.log(`   ❌ Not found: ${notFoundCount} questions`);
    
    // Verify the total count
    const totalWithFrench = await collection.countDocuments({ 'text.fr_CA': { $exists: true, $ne: '' } });
    console.log(`   📊 Total questions with French: ${totalWithFrench}/48`);
    
    // Show a sample
    const sample = await collection.findOne({ id: 'RM1' });
    if (sample) {
      console.log(`\n📋 Sample verification (${sample.id}):`);
      console.log(`   EN: ${sample.text.en_CA}`);
      console.log(`   FR: ${sample.text.fr_CA}`);
      console.log(`   Option 1 EN: ${sample.options[0].text.en_CA}`);
      console.log(`   Option 1 FR: ${sample.options[0].text.fr_CA}`);
    }
    
  } catch (error) {
    console.error('❌ Error updating translations:', error);
  } finally {
    await client.close();
    console.log('\n🔌 MongoDB connection closed');
  }
}

// Run the script
addAllFrenchTranslations();

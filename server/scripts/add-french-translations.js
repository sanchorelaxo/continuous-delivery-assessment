/**
 * Add French translations to existing questions in MongoDB
 * This script updates the database with proper French translations
 */

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '../../.env' });

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cd_assessment';
const dbName = 'cd_assessment';

// French translations for questions and options
const frenchTranslations = {
  // Build Management
  BM1: {
    text: "Implémentation du Contrôle de Version",
    options: [
      "Aucun système de contrôle de version en place",
      "Contrôle de version de base (ex. Git) avec code et scripts stockés",
      "Contrôle de version avec stratégie de branchement et fusions automatisées",
      "Contrôle de version avancé avec bascules de fonctionnalités",
      "Contrôle de version sophistiqué avec conformité automatisée"
    ]
  },
  BM2: {
    text: "Intégration Continue",
    options: [
      "Aucune intégration continue",
      "Builds manuels avec tests de base",
      "Pipeline CI automatisé avec tests unitaires",
      "CI avancé avec tests d'intégration et déploiement",
      "CI optimisé par IA avec prédiction de qualité"
    ]
  },
  BM3: {
    text: "Gestion des Artefacts",
    options: [
      "Aucune gestion d'artefacts",
      "Stockage basique des artefacts",
      "Référentiel d'artefacts avec versioning",
      "Gestion avancée avec métadonnées et traçabilité",
      "Optimisation IA de la gestion d'artefacts"
    ]
  },
  BM4: {
    text: "Gestion des Dépendances",
    options: [
      "Aucune gestion des dépendances",
      "Gestion manuelle des dépendances",
      "Gestion automatisée avec résolution de conflits",
      "Analyse avancée des vulnérabilités",
      "Optimisation IA des dépendances"
    ]
  },
  BM5: {
    text: "Qualité du Code",
    options: [
      "Aucune vérification de qualité",
      "Revues de code manuelles",
      "Analyse statique automatisée",
      "Métriques de qualité avec seuils",
      "Amélioration IA de la qualité"
    ]
  },
  BM6: {
    text: "Gestion de la Configuration de Build",
    options: [
      "Configuration de build manuelle",
      "Scripts de build basiques",
      "Configuration comme code",
      "Builds reproductibles avec cache",
      "Optimisation IA des builds"
    ]
  },

  // Environments & Provisioning
  ENV1: {
    text: "Provisionnement d'Infrastructure",
    options: [
      "Provisionnement manuel",
      "Scripts d'automatisation basiques",
      "Infrastructure comme Code (IaC)",
      "Provisionnement auto-réparant",
      "Infrastructure adaptative par IA"
    ]
  },
  ENV2: {
    text: "Gestion des Environnements",
    options: [
      "Environnements gérés manuellement",
      "Environnements standardisés",
      "Environnements à la demande",
      "Environnements éphémères automatisés",
      "Optimisation IA des environnements"
    ]
  },
  ENV3: {
    text: "Gestion de la Configuration",
    options: [
      "Configuration manuelle",
      "Fichiers de configuration centralisés",
      "Gestion automatisée de la configuration",
      "Configuration avec validation et rollback",
      "Configuration adaptative par IA"
    ]
  },
  ENV4: {
    text: "Surveillance de l'Infrastructure",
    options: [
      "Aucune surveillance",
      "Surveillance basique des métriques",
      "Surveillance automatisée avec alertes",
      "Surveillance prédictive",
      "Surveillance autonome par IA"
    ]
  },
  ENV5: {
    text: "Sécurité de l'Infrastructure",
    options: [
      "Sécurité basique",
      "Politiques de sécurité définies",
      "Sécurité automatisée avec scanning",
      "Sécurité proactive avec remédiation",
      "Sécurité adaptative par IA"
    ]
  },
  ENV6: {
    text: "Récupération après Sinistre",
    options: [
      "Aucun plan de récupération",
      "Sauvegardes manuelles",
      "Récupération automatisée",
      "Récupération géo-distribuée",
      "Récupération prédictive par IA"
    ]
  },

  // Application Architecture
  APP1: {
    text: "Architecture d'Application",
    options: [
      "Architecture monolithique",
      "Architecture modulaire de base",
      "Architecture microservices",
      "Architecture cloud-native",
      "Architecture auto-adaptative"
    ]
  },
  APP2: {
    text: "Découplage des Services",
    options: [
      "Services étroitement couplés",
      "Découplage basique",
      "Services faiblement couplés",
      "Architecture événementielle",
      "Orchestration IA des services"
    ]
  },
  APP3: {
    text: "Gestion des API",
    options: [
      "Aucune gestion d'API",
      "APIs documentées",
      "Passerelle API avec versioning",
      "Gestion complète du cycle de vie API",
      "APIs auto-évolutives par IA"
    ]
  },
  APP4: {
    text: "Résilience de l'Application",
    options: [
      "Aucune résilience",
      "Gestion basique des erreurs",
      "Patterns de résilience (circuit breaker, retry)",
      "Auto-guérison et tolérance aux pannes",
      "Résilience prédictive par IA"
    ]
  },
  APP5: {
    text: "Évolutivité",
    options: [
      "Évolutivité manuelle",
      "Évolutivité verticale",
      "Évolutivité horizontale automatique",
      "Évolutivité élastique",
      "Évolutivité prédictive par IA"
    ]
  },
  APP6: {
    text: "Gestion d'État",
    options: [
      "État géré localement",
      "État centralisé",
      "État distribué",
      "État répliqué avec cohérence",
      "Gestion d'état optimisée par IA"
    ]
  }
};

async function addFrenchTranslations() {
  const client = new MongoClient(mongoUri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    const collection = db.collection('questions');
    
    let updatedCount = 0;
    
    // Update each question with French translations
    for (const [questionId, frenchData] of Object.entries(frenchTranslations)) {
      const result = await collection.updateOne(
        { id: questionId },
        {
          $set: {
            'text.fr_CA': frenchData.text,
            'options.$[].text.fr_CA': frenchData.options[0], // This won't work for arrays
            updatedAt: new Date()
          }
        }
      );
      
      if (result.matchedCount > 0) {
        // Update options individually since MongoDB doesn't support array updates easily
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
          console.log(`✅ Updated ${questionId}: ${frenchData.text}`);
        }
      } else {
        console.log(`❌ Question ${questionId} not found`);
      }
    }
    
    console.log(`\n🎉 Successfully updated ${updatedCount} questions with French translations`);
    
    // Verify a sample
    const sample = await collection.findOne({ id: 'BM1' });
    console.log('\n📋 Sample verification:');
    console.log('EN:', sample.text.en_CA);
    console.log('FR:', sample.text.fr_CA);
    console.log('Option 1 EN:', sample.options[0].text.en_CA);
    console.log('Option 1 FR:', sample.options[0].text.fr_CA);
    
  } catch (error) {
    console.error('❌ Error updating translations:', error);
  } finally {
    await client.close();
    console.log('\n🔌 MongoDB connection closed');
  }
}

// Run the script
addFrenchTranslations();

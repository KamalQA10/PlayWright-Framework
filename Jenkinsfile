pipeline {
    agent any

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['qa_UI', 'int_UI', 'qa_API', 'int_API'], description: 'Select test type and environment')
    }

    environment {
        ALLURE_RESULTS_DIR = 'src/reporting/allure-results'
        ALLURE_REPORT_DIR = 'src/reporting/allure-report'
        PLAYWRIGHT_REPORT_DIR = 'playwright-report'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm ci'
                bat 'npm run install:playwright'
            }
        }

        stage('Clean Allure Reports') {
            steps {
                bat 'npm run clean:allure'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    if (params.ENVIRONMENT == 'qa_UI') {
                        bat 'npm run test:qa'
                    } else if (params.ENVIRONMENT == 'int_UI') {
                        bat 'npm run test:int'
                    } else if (params.ENVIRONMENT == 'qa_API') {
                        bat 'npm run test:api_QA'
                    } else if (params.ENVIRONMENT == 'int_API') {
                        bat 'npm run test:api_INT'

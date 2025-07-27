pipeline {
    agent any

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['qa', 'int'], description: 'Select environment to run tests')
    }

    environment {
        ALLURE_RESULTS_DIR = 'src/reporting/allure-results'
        ALLURE_REPORT_DIR = 'src/reporting/allure-report'
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
                bat 'npx playwright install'
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
                    if (params.ENVIRONMENT == 'qa') {
                        bat 'npm run test:qa'
                    } else if (params.ENVIRONMENT == 'int') {
                        bat 'npm run test:int'
                    } else {
                        error "Unknown environment: ${params.ENVIRONMENT}"
                    }
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                bat "npx allure generate ${env.ALLURE_RESULTS_DIR} -o ${env.ALLURE_REPORT_DIR}"
            }
        }

        stage('Publish Allure Report') {
            steps {
                publishHTML(target: [
                    reportDir: env.ALLURE_REPORT_DIR,
                    reportFiles: 'index.html',
                    reportName: 'Allure Report',
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: "${env.ALLURE_RESULTS_DIR}/**/*", allowEmptyArchive: true
        }
    }
}

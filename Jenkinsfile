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
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Clean Allure Reports') {
            steps {
                sh 'npm run clean:allure'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    if (params.ENVIRONMENT == 'qa') {
                        sh 'npm run test:qa'
                    } else if (params.ENVIRONMENT == 'int') {
                        sh 'npm run test:int'
                    } else {
                        error "Unknown environment: ${params.ENVIRONMENT}"
                    }
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh "npx allure generate ${ALLURE_RESULTS_DIR} --clean -o ${ALLURE_REPORT_DIR}"
            }
        }

        stage('Publish Allure Report') {
            steps {
                publishHTML(target: [
                    reportDir: ALLURE_REPORT_DIR,
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
            archiveArtifacts artifacts: "${ALLURE_RESULTS_DIR}/**/*", allowEmptyArchive: true
        }
    }
}

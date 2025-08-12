pipeline {
    agent any

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['qa_UI', 'int_UI', 'qa_API', 'int_API'], description: 'Select test type and environment')
    }

    environment {
        IMAGE_NAME = 'playwrite_framework'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat "docker build -t %IMAGE_NAME% ."
                }
            }
        }

        stage('Run Tests in Docker') {
            steps {
                script {
                    def command = ""

                    if (params.ENVIRONMENT == 'qa_UI') {
                        command = "npm run test:qa"
                    } else if (params.ENVIRONMENT == 'int_UI') {
                        command = "npm run test:int"
                    } else if (params.ENVIRONMENT == 'qa_API') {
                        command = "npm run test:api_QA"
                    } else if (params.ENVIRONMENT == 'int_API') {
                        command = "npm run test:api_INT"
                    } else {
                        error "Unknown environment: ${params.ENVIRONMENT}"
                    }

                    // Docker run with command
                    bat "docker run --rm %IMAGE_NAME% cmd /c \"${command}\""
                }
            }
        }
    }
}

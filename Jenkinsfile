pipeline {
    agent any

    tools {
        nodejs 'node18'
    }

    environment {
        DOCKER_IMAGE = "testkgpath:latest"
    }

    stages {

        stage('Clone Repo') {
            steps {
                git 'https://github.com/kgsharadhaskill-edu/testkgpath.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh 'sonar-scanner'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker rm -f testkgpath || true
                docker run -d -p 80:80 --name testkgpath $DOCKER_IMAGE
                '''
            }
        }
    }
}

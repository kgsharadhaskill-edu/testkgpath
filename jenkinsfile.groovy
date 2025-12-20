pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "nodeapp:testkgpath"
    }

    stages {

        stage('Clone Repository') {
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

        stage('Run Docker Container') {
            steps {
                sh '''
                docker stop nodeapp || true
                docker rm nodeapp || true
                docker run -d --name nodeapp -p 3000:3000 $DOCKER_IMAGE
                '''
            }
        }
    }
}

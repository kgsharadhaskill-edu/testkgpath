pipeline {
    agent any

    tools {
        nodejs 'NodeJS'   // exact name from Global Tool Config
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'jenkins-git',
                    url: 'https://github.com/kgsharadhaskill-edu/testkgpath.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'npm install'
            }
        }

        stage('Unit Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}


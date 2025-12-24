pipeline {
    agent any

    tools {
        nodejs 'node16'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'KGpath',
                    url: 'https://github.com/kgsharadhaskill-edu/testkgpath.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                  node -v
                  npm -v
                  npm install
                '''
            }
        }

        stage('Unit Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}

pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Checkout') {
            steps {
                deleteDir()
                git branch: 'main',
                    credentialsId: 'jenkins-git',
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
                sh '''
                if npm run | grep -q "test"; then
                  npm test
                else
                  echo "No test script found, skipping"
                fi
                '''
            }
        }
    }
}


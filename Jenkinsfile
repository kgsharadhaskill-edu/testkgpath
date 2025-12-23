pipeline {
    agent {
        docker { image 'node:20-bullseye' } // official Node image
    }
    stages {
        stage('GitHub') {
            steps {
                git branch: 'main', credentialsId: 'jenkins-git', url: 'https://github.com/kgsharadhaskill-edu/testkgpath.git'
            }
        }
        stage('Unit Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }
    }
}


pipeline {
    agent any
    tools {
        nodejs 'NodeJS' // Must match the NodeJS installation name in Jenkins
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


pipeline {
    agent any
    tools {
        nodejs 'NodeJS' // must match name in Jenkins Global Tool Configuration
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


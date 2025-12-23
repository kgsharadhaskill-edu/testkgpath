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
        sh 'docker run --rm -v $PWD:/app -w /app node:20-bullseye npm install'
        sh 'docker run --rm -v $PWD:/app -w /app node:20-bullseye npm test'
           }
        }

    }
}


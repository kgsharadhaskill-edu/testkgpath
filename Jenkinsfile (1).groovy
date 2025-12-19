pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/kgsharadhaskill-edu/testkgpath.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t jenkins-httpd .'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh '''
                docker rm -f httpd_container || true
                docker run -d -p 8080:80 --name httpd_container jenkins-httpd
                '''
            }
        }
    }
}

pipeline {
       agent any
       tools {
           nodejs 'NodeJS'
        }
       stages {
               stage('GitHub'){
                      steps {
                             git branch: 'main', credentialsId: 'jenkins-git', url: 'https://github.com/kgsharadhaskill-edu/testkgpath.git'

                  }
             }
              stage('Unit Test') {
                 steps {
                         sh 'npm test'
                         sh '''npm install'''
             
              }
          }
      }


}

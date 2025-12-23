pipeline {
    agent any
    stages {
           stage('GitHub'){
               steps {
                      git branch: 'main', credentialsId: 'jenkins-configure-git', url: 'https://github.com/kgsharadhaskill-edu/testkgpath.git'

                  }
              } 
          )
     }

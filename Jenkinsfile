pipeline {
  agent any
    tools {
	nodejs "npm"
    }
    stages {
		stage('Cloning Git') {
			steps {
					git 'https://github.com/PowPat83/pet-grooming-react.git'
			}		
        stage('Build NPM ') {
            steps { 
                    sh 'pwd'      
                    sh 'npm install'
            }
        }        
        stage('Copy Artifact') {
           steps { 
                   sh 'pwd'
                   sh 'cp -r target/*.jar docker'
           }
        }
         
        stage('Build docker image') {
           steps {
               script {						 
                 def customImage = docker.build('buzz83sg76/docker-test', "./docker")				
                 docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                 customImage.push("${env.BUILD_NUMBER}")
                 }                     
           }
        }
	  }
    }
}

pipeline {
	agent any
	stages {
		stage('Clone Git Repo'){
				steps{
					git 'https://github.com/Nischal47/passin-frontend.git'
                    
		    }
		}
		stage('Install Dependencies'){
				steps{
					bat 'npm install'
				}
		}
		stage('Run Server'){
				steps{
					bat 'npm start'
				}
		}
		stage('Run Tests'){
				steps{
					bat 'npm run cy:test'
				}
		}
	}
}
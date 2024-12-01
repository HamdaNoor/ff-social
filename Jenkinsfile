pipeline {
    agent {
        docker {
            image 'node:18'
        }
    }
    environment {
        DOCKER_IMAGE = 'ffsocial'
        GITHUB_REPO = 'hhttps://github.com/HamdaNoor/ff-social.git'
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: "${env.GITHUB_REPO}"
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${env.DOCKER_IMAGE}")
                }
            }
        }
        stage('Run Container') {
            steps {
                sh 'docker run -d -p 3000:3000 ${env.DOCKER_IMAGE}'
            }
        }
    }
}

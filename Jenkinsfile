def dist_dir
def dist_dir_final

pipeline {

    agent {
        label 'master'
    }

    environment {
        TREESCALE_PASSWORD = credentials('treescale-password')
    }

    stages {
        stage('buildApp') {
            agent {
                docker {
                    image 'tgcoding/dockerized-node-build:latest'
					args '-v $HOME/node_modules:/usr/src/build/node_modules'
                }
            }
            steps {
                sh "npm install"
                sh "npm run build-prod"
                script {
                    dist_dir = "${env.WORKSPACE}"
                }
                sh 'echo dist: dist_dir'
                echo "$dist_dir"
            }
        }
        stage('buildImage') {
            steps {
                sh 'echo push: dist_dir'
                echo "$dist_dir"
                script {
                    dist_dir_final = dist_dir+'/dist'
                }

                sh 'echo push: dist_dir_final'
                echo "$dist_dir_final"
                sh "ls -la ${dist_dir_final}"

                sh "cp -r ${dist_dir_final} ."
                sh "ls -la"
				
                sh "docker build -t repo.treescale.com/tgcoding/meals-calendar-ui:0.0.1-${env.GIT_COMMIT} -t repo.treescale.com/tgcoding/meals-calendar-ui:latest ."
            }
        }
        stage('pushImage') {
            steps {
                sh "echo $TREESCALE_PASSWORD | docker login -u tgcoding --password-stdin repo.treescale.com"
                sh "docker push repo.treescale.com/tgcoding/meals-calendar-ui:0.0.1-${env.GIT_COMMIT}"
                sh "docker push repo.treescale.com/tgcoding/meals-calendar-ui:latest"

                sh 'docker ps'
            }
        }
    }
}
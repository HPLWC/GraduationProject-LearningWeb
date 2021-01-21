pipeline {
  agent any
  stages {
    stage('hpc-test') {
      steps {
        sh '''
          echo $JOB_NAME
        '''
      }
    }
    stage('Build') {
      steps {
        sh '''
          cd web
          npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/ --unsafe-perm=true --allow-root
          npm install --unsafe-perm=true --allow-root
          npm run build
        '''
      }
    }
  }
}
pipeline {
  agent any
  stages {
    stage('hpc-test') {
      steps {
        sh '''
          echo $JOB_NAME
          echo $VUE_APP_BASE_URL .env.production
        '''
      }
    }
    stage('Build') {
      steps {
        sh '''
          cd web
          npm
          npm install
        '''
      }
    }
  }
}
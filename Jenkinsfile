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
          npm install --unsafe-perm=true --allow-root
          npm run build
        '''
      }
    }
  }
}
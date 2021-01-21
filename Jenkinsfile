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
          sudo npm install
          npm run build
        '''
      }
    }
  }
}
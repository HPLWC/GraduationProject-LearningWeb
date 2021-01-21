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
    stage('Deploy') {
      steps {
        sshPublisher(publishers: [
          sshPublisherDesc(
            configName: '120.26.162.237',
            transfers: [
              sshTransfer: [
                sshTransfer(
                  cleanRemote: true,
                  excludes: '',
                  execCommand: ''' echo 'Deploy Success' ''',
                  execTimeout: 120000,
                  flatten: false,
                  makeEmptyDirs: false,
                  noDefaultExcludes: false,
                  patternSeparator: '[, ]+',
                  remoteDirectory: '/home/hplwc/GraduationProject-LearningWeb/dist',
                  remoteDirectorySDF: false,
                  removePrefix: 'dist',
                  sourceFiles: 'dist/**'
                )
              ],
              usePromotionTimestamp: false,
              useWorkspaceInPromotion: false,
              verbose: false
            ]
          )
        ])
      }
    }
  }
}
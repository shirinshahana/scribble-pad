module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/home/qburst/project/workspace',
      deployTo: '/home/qburst/project/deploy_to',
      repositoryUrl: '-b development git@codebase.qburst.com:vishnuc/scribble-pad.git',
      ignores: ['.git', 'node_modules', 'bower_components'],
      keepReleases: 2,
      deleteOnRollback: false,
      key: '~/.ssh/id_rsa',
      shallowClone: true
    },
    staging: {
      servers: 'qburst@localhost'
    }
  });

  shipit.blTask('npm-install', function(){
    return shipit.remote('(cd ' + shipit.currentPath + ' &&  npm install');
  });

  shipit.blTask('bower-install', function(){
    return shipit.remote('(cd ' + shipit.currentPath + ' &&  bower install');
  });

  shipit.blTask('pm2-start', function(){
    return shipit.remote('(cd ' + shipit.currentPath + ' &&  pm2 start && pm2/pm2-stag.json');
  });

  shipit.task('post-publish', ['npm-install', 'bower-install', 'pm2-start']);
};
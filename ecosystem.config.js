module.exports = {
  apps: [
    {
      name: 'kozcuoglu-nakliyat',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '/var/www/vhosts/kozcuoglunakliyat.com.tr/httpdocs',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0',
      },
      error_file: './pm2-logs/err.log',
      out_file: './pm2-logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 4000,
    },
  ],
};

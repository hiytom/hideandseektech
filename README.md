# Hide and Seek Tech Website

Static website for `hideandseektech.com`.

## Files

- `index.html` - company and e-commerce operations overview
- `privacy.html` - privacy policy
- `terms.html` - terms of service
- `security.html` - data security statement
- `styles.css` - shared styling

## Deploy

This site is static. It can be deployed to any web server that serves HTML and CSS files.

## Automatic server deployment

This repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

When code is pushed to the `main` branch, GitHub Actions will deploy the site to your server over SSH with `rsync`.

Create these GitHub repository secrets:

- `SERVER_HOST` - server host or IP address
- `SERVER_PORT` - SSH port, optional; defaults to `22`
- `SERVER_USER` - SSH username
- `SERVER_SSH_KEY` - private SSH key that can log in to the server
- `SERVER_PATH` - website directory on the server, for example `/var/www/hideandseektech.com`

The server should point `hideandseektech.com` at `SERVER_PATH` through Nginx, Apache, Caddy, or another static web server.

Use `https://hideandseektech.com` as the company website.

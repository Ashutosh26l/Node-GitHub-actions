# Node-GitHub-actions

A simple Node.js + Express app containerized with Docker and auto-deployed to AWS EC2 using GitHub Actions.

## Project Overview
- Runtime: Node.js (`node:22-alpine` in Docker)
- Framework: Express 5
- App entry: `index.js`
- Default port: `8080`
- Health endpoint: `GET /`

The app returns JSON:

```json
{"msg":"Hello from the server! checking after restarting the server"}
```

## Repository Structure
- `index.js` - Express server
- `Dockerfile` - Container build instructions
- `docker-compose.yaml` - Local/EC2 container orchestration
- `.github/workflows/deploy.yaml` - CI/CD deployment workflow to EC2
- `package.json` - Node project metadata and scripts

## Prerequisites
- Node.js 22+ (recommended)
- npm
- Docker + Docker Compose
- GitHub repository with Actions enabled
- AWS EC2 instance with Docker and Docker Compose installed

## Run Locally (Without Docker)
```bash
npm install
node index.js
```

Open: `http://localhost:8080`

## Run with Docker
```bash
docker compose up -d --build
```

Open: `http://localhost:8080`

Stop:
```bash
docker compose down
```

## GitHub Actions Deployment (EC2)
Deployment workflow triggers on push to `main`:
- Checks out code
- Connects to EC2 over SSH
- Runs:
  - `cd /home/ubuntu/Node-GitHub-actions`
  - `git pull`
  - `sudo docker compose up -d --build`

Workflow file: `.github/workflows/deploy.yaml`

### Required GitHub Secrets
Add these in **GitHub Repo -> Settings -> Secrets and variables -> Actions**:
- `SSH_HOST` - Public IP or DNS of EC2 instance
- `SSH_KEY` - Private SSH key content for the EC2 login user

> Username is hardcoded as `ubuntu` in the workflow. Keep this aligned with your EC2 AMI/user.

## EC2 Setup Notes
On your EC2 instance, ensure:
1. Repository is cloned at `/home/ubuntu/Node-GitHub-actions`
2. Docker engine is installed and running
3. Docker Compose is available (`docker compose version`)
4. Port `8080` is allowed in EC2 Security Group inbound rules

## Security Warning (Important)
This repository currently contains a committed private key file (`private`).

Recommended immediate actions:
1. Revoke/rotate that key in AWS/EC2 now.
2. Remove private key files from the repository and history.
3. Keep private keys only in secure secret managers (GitHub Secrets, AWS Secrets Manager, SSM Parameter Store).

## Improvements You May Want
- Add a proper test script (current `npm test` starts the app)
- Add healthcheck endpoint (`/health`) and container `HEALTHCHECK`
- Pin GitHub Action versions (avoid `@master` for production workflows)
- Use `CMD ["node", "index.js"]` in Dockerfile for explicit entrypoint

## License
ISC

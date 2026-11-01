#!/usr/bin/env bash
# Deploy the API stack and write its URL into site/config.js.
# Usage: AWS_PROFILE=aws-i2c ALLOWED_ORIGIN=https://main.xxxx.amplifyapp.com ./scripts/deploy-api.sh
# Then commit site/config.js and push: Amplify redeploys the site automatically.
set -euo pipefail
STACK="${STACK:-ivan-dmitriev-site-api}"
REGION="${REGION:-eu-south-2}"
cd "$(dirname "$0")/.."

sam build
sam deploy --stack-name "$STACK" --region "$REGION" --resolve-s3 \
  --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset \
  --parameter-overrides "AllowedOrigin=${ALLOWED_ORIGIN:-*}"

API_URL="$(aws cloudformation describe-stacks --stack-name "$STACK" --region "$REGION" \
  --query "Stacks[0].Outputs[?OutputKey=='ApiUrl'].OutputValue" --output text)"
printf "// Written by scripts/deploy-api.sh. Empty apiUrl = offline demo mode.\nwindow.SITE_CONFIG = { apiUrl: '%s' };\n" "$API_URL" > site/config.js
echo "API: ${API_URL}/request"
echo "Now: git add site/config.js && git commit -m 'Point site at live API' && git push"

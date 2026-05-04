#!/usr/bin/env bash
# One-shot deploy of the combined HCP Engagement app to fe-vm-hls-amer.
# Run this after resolving the workspace 100-app slot cap (see README / commit message).

set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR="/tmp/hcp-engagement-deploy"
WS_PATH="/Workspace/Users/antonio.farias@databricks.com/hcp-engagement"
PROFILE="fe-vm-hls-amer"

echo "==> Building"
cd "$REPO_DIR"
npm install
npm run build

echo "==> Staging slim deploy bundle"
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"
cp app.yaml "$DEPLOY_DIR/"
cp -R dist "$DEPLOY_DIR/"

echo "==> Creating Databricks App (idempotent — skips if it already exists)"
if ! databricks apps get hcp-engagement --profile "$PROFILE" >/dev/null 2>&1; then
  databricks apps create hcp-engagement --profile "$PROFILE" \
    --description "HCP Engagement Demo: Rep & MSL views over a single lakehouse"
else
  echo "  hcp-engagement already exists — skipping create"
fi

echo "==> Pushing source to workspace"
databricks workspace import-dir "$DEPLOY_DIR" "$WS_PATH" --profile "$PROFILE" --overwrite

echo "==> Triggering deploy"
databricks apps deploy hcp-engagement --source-code-path "$WS_PATH" --profile "$PROFILE"

echo "==> Done. App URL:"
databricks apps get hcp-engagement --profile "$PROFILE" | python3 -c 'import json,sys;print(json.load(sys.stdin).get("url"))'

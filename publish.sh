#!/bin/bash
set -e

# Usage: ./publish.sh [patch|minor|major]
if [ -z "$1" ]; then
  echo "Usage: $0 [patch|minor|major]"
  exit 1
fi

# Ensure we're on the main branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "Error: Must be on main branch to publish. Currently on: $CURRENT_BRANCH"
  exit 1
fi

# Ensure working directory is clean
if ! git diff-index --quiet HEAD --; then
  echo "Error: Working directory is not clean. Please commit or stash changes."
  exit 1
fi

# Pull latest changes
git pull origin main

# Run tests and build
echo "Running tests and building..."
npm run lint
npm run build

# Bump version, create commit and annotated tag
NEW_TAG=$(npm version $1 -m "chore(release): bump version to %s")
echo "Created git tag $NEW_TAG"

# Push both commit and tag to remote
git push origin main --follow-tags

# Publish to npm
echo "Publishing to npm..."
npm publish

echo "Successfully published $NEW_TAG to npm!"
echo "Repository: https://github.com/j-shelfwood/n8n-nodes-outline"
echo "NPM: https://www.npmjs.com/package/n8n-nodes-outline"

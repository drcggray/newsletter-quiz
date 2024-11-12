#!/bin/bash

# Add all changes
git add .

# Create commit message with current date
commit_message="Update quiz questions for newsletter $(date +%Y-%m-%d)"
git commit -m "$commit_message"

# Push to main branch
git push origin main

echo "Quiz updates successfully pushed to GitHub!"

# Māori Health Newsletter Quiz

A React-based quiz application for the weekly Māori health newsletter.

## Updating Quiz Questions

To update the quiz questions for a new newsletter:

1. Provide the new questions and answers to the AI assistant in the chat
2. The AI will update the Quiz.js file with the new content
3. Run the update script to deploy:
   ```bash
   ./update-quiz.sh
   ```
   This will automatically:
   - Stage all changes
   - Create a commit with the current date
   - Push to GitHub

## Development

To run the quiz locally:

```bash
npm install
npm start
```

This will start the development server at http://localhost:3000

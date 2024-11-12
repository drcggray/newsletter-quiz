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

## Important Technical Notes

1. Node.js Version:
   - The project uses Node.js 16 (specified in .nvmrc)
   - This version is stable and compatible with Netlify deployment
   - Do not modify the Node.js version without testing deployment

2. Deployment Process:
   - Update quiz questions in src/components/Quiz.js
   - Use ./update-quiz.sh script to deploy changes
   - The script handles git commit and push automatically
   - Netlify will auto-deploy from the main branch

3. Project Structure:
   - Quiz questions are stored directly in Quiz.js component
   - No backend/database is used - all changes are made through code updates
   - React app with Tailwind CSS for styling

4. Version Management:
   - Keep .nvmrc file to maintain Node.js version consistency
   - Don't modify the React version in package.json unless necessary
   - Use the update script rather than manual git commands for consistency

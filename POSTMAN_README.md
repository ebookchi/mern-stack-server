Postman collection for Ebookchi Magic Link API

Files created:

- .postman/ebookchi-magic-link.postman_collection.json -> Postman Collection (v2.1)
- .postman/ebookchi.postman_environment.json -> Postman Environment (local)

Quick steps

1. Start the server locally:

   - Ensure MongoDB is running and set MONGO_URI in your `.env`.
   - Ensure `APP_URI` and `PORT` are set if your code depends on them (defaults in code may be missing).
   - Run: npm run dev

2. Import the collection and environment into Postman:

   - In Postman: Import -> choose `.postman/ebookchi-magic-link.postman_collection.json` and `.postman/ebookchi.postman_environment.json`.
   - Select the "Ebookchi Local" environment.

3. Run requests:
   - Use the "Generate Magic Link" request with the default `testEmail`.
   - After the request, check your Mailtrap inbox or your server logs for the magic link (the project currently uses Mailtrap SMTP config in `src/controllers/auth.ts`).
   - Copy token and userId into environment variables `token` and `userId` to test the "Verify Token (example)" request.

Run via Newman (optional):

- Install newman globally or as a dev dependency: npm i -g newman
- Run: newman run .postman/ebookchi-magic-link.postman_collection.json -e .postman/ebookchi.postman_environment.json

Notes and limitations

- I couldn't run the collection from this environment because the API requires a running MongoDB and local server; you need to start the server and provide the database connection.
- If you'd like, I can try to run the server and execute the collection here, but I will need either a reachable MongoDB connection string (set in `.env`) or to modify the project to use an in-memory Mongo (dev-only change). Ask which you prefer.

Next steps I can do for you

- Attempt to run the collection automatically here (requires DB or code change to use in-memory DB).
- Create a Postman Mock Server and wire expected responses so you can exercise the collection without starting the API.
- Add a Newman script to `package.json` for CI-friendly runs.

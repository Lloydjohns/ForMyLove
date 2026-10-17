This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

The site uses a small Node API and the Resend email API. Copy `.env.example` to `.env` and set:

- `ANNIVERSARY_DATE` to your real anniversary as `YYYY-MM-DD`. The server checks the entered date; it is not sent to the email provider.
- `SESSION_SECRET` to a long random secret. The successful date check creates a two-hour token stored only in the current browser tab.
- `RESEND_API_KEY`, `EMAIL_TO`, and `EMAIL_FROM` to your Resend API key, the inbox that should receive messages, and a verified sender address.

Run `npm run dev` and `npm run dev:api` in separate terminals. Vite forwards `/api` requests to the API on port 3001. To run a production build, host the static `dist` site and run `npm run server` alongside it, with your hosting platform routing `/api/*` to the Node server. Keep `.env` private and configure the same variables in your hosting provider.

The anniversary gate is a private-entry check, not strong identity verification: anyone who knows the date can enter. Only the message and optional display name from the note form are emailed.
=======
>>>>>>> 40e44f78e863831174a796b998ab02718672267e

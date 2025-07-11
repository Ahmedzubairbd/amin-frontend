# Amin Diagnostics & Medical Services

This project is a modern, full-featured medical diagnostics and healthcare CMS built with Next.js, React, and MUI. It includes:

- Public pages: Home, About Us, Services, Doctors, Contact Us, Book Appointment, FAQs, Find Doctor
- Patient, Doctor, and Admin dashboards
- Phone/SMS OTP authentication, Google/GitHub OAuth
- Real-time features, file upload, and PostgreSQL backend

## Main Routes

- `/` — Home
- `/about-us` — About Us
- `/services` — Services
- `/doctors` — Doctors
- `/contact-us` — Contact Us
- `/book-appointment` — Book Appointment
- `/faqs` — FAQs
- `/find-doctor` — Find Doctor
- `/dashboard` — Dashboard (role-based)

## Navigation

All navigation and links use the `paths` constants from `src/routes/paths.ts` and the `RouterLink` component for client-side routing.

## Adding New Pages

1. Create a new folder in `src/app/` with a `page.tsx` file for your route.
2. Add your view/component in `src/sections/` if needed.
3. Update `src/routes/paths.ts` and navigation config if you want it in the main menu.

## Development

- Run `npm install` to install dependencies
- Run `npm run dev` to start the development server

## Backend

See `BACKEND_INTEGRATION_GUIDE.md` for backend setup and integration.

---

For any issues, please open an issue or contact support@amin.com


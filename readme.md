# Hotel Internal Booking Tracking System

## Overview

This is an internal hotel management system built with React.js and Styled Components. It serves as the backend management interface for hotel employees to manage bookings, cabins, and guest information.

## Live

Internal Website (this repo): [https://hotel-booking-system-internal.vercel.app/](https://hotel-booking-system-internal.vercel.app/login)
External Website: [https://hotel-booking-system-external.vercel.app/](https://hotel-booking-system-external.vercel.app/), Repo: [https://github.com/urahara897/hotel-booking-system-external](https://github.com/urahara897/hotel-booking-system-external)

## System Architecture

- Frontend: React.js with Styled Components
- Backend: Supabase (Database and Authentication)
- State Management: React Query
- Routing: React Router
- Charts: Recharts
- Styling: Styled Components
- Form Handling: React Hook Form
- Notifications: React Hot Toast

## Key Features

1. **Authentication & User Management**

   - Employee login/logout
   - Employee onboarding (only existing employees can onboard new employees)
   - Email verification for new employees
   - Profile management (avatar, name, password updates)

2. **Cabin Management**

   - Add/Edit/Delete cabins
   - Set cabin details (description, capacity, pricing)
   - Manage discounts
   - Image upload for cabins

3. **Booking Management**

   - View all bookings
   - Check-in/Check-out functionality
   - Booking status tracking
   - Filter and sort bookings
   - Pagination support

4. **Dashboard & Analytics**

   - Sales statistics
   - Booking trends visualization
   - Occupancy rates
   - Daily check-in/check-out overview

5. **Settings**

   - Manage minimum booking duration
   - Set breakfast pricing
   - Configure maximum guests per booking

6. **UI/UX**
   - Dark/Light mode toggle
   - Responsive design (desktop)
   - Interactive charts and statistics
   - Toast notifications

## Related Systems

- Internal System (This repo): [https://hotel-booking-system-internal.vercel.app/](https://hotel-booking-system-internal.vercel.app/)
- External Customer-Facing System: [https://hotel-booking-system-external.vercel.app/](https://hotel-booking-system-external.vercel.app/)
  - Source Code: [https://github.com/urahara897/hotel-booking-system-external](https://github.com/urahara897/hotel-booking-system-external)

## Demo Access

To access the demo system, use the following credentials:

- Email: bowob16579@heweek.com
- Password: passwordabc

## Note

This webapp is currently optimized for desktop use and is not responsive for mobile users.

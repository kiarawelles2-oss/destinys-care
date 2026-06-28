# Lumea & Destiny's Care - Unified Platform

A comprehensive platform combining:
- **Lumea**: Local delivery ordering system
- **Destiny's Care**: E-commerce skincare/haircare shop

## Features

### 🏠 Public Site
- Home page with hero banner
- Featured products from both Lumea and Destiny's Care
- Customer ordering system
- WhatsApp integration for confirmations

### 🔐 Admin Dashboard
- Product management (add/edit/delete)
- Order management with status tracking
- Customer management
- Driver management
- Expense tracking
- Sales reports and analytics
- Delivery settings configuration

### 🚚 Driver Portal
- View assigned deliveries
- Customer information
- Delivery status updates
- WhatsApp communication

### 🛒 Customer Features
- Browse products
- Place orders
- Track deliveries
- Order history

## Tech Stack
- **Frontend**: Next.js, React, Tailwind CSS
- **Database**: PostgreSQL, Prisma ORM
- **Authentication**: PIN-based (Admin: 8888, Driver: 2326)

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run migrations: `npm run prisma:migrate`
5. Start dev server: `npm run dev`

## Brand Colors
- Primary: Baby Pink (#FFB6D9)
- Secondary: White (#FFFFFF)
- Accent: Gold (#FFD700)

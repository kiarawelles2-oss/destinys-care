# Lumea & Destiny's Care - Complete Platform

## 🎉 Platform Overview

A unified full-stack web application combining:
- **Destiny's Care**: E-commerce shop for skincare, haircare, and beauty products
- **Lumea**: Order delivery system with admin dashboard and driver portal

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and settings

# Set up database
npm run prisma:migrate

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Home page
│   ├── bestellen/               # Customer ordering
│   ├── cart/                    # Shopping cart
│   ├── pin-login/               # PIN authentication
│   ├── admin/                   # Admin dashboard
│   │   ├── dashboard/           # Main dashboard
│   │   ├── products/            # Product management
│   │   ├── orders/              # Order management
│   │   ├── customers/           # Customer list
│   │   ├── drivers/             # Driver management
│   │   ├── expenses/            # Expense tracking
│   │   ├── reports/             # Analytics & reports
│   │   └── settings/            # Delivery settings
│   ├── driver-portal/           # Driver portal
│   │   ├── dashboard/           # Driver dashboard
│   │   ├── deliveries/          # Active deliveries
│   │   └── earnings/            # Earnings tracking
│   ├── api/                     # Backend API routes
│   │   ├── products/            # Product CRUD
│   │   ├── orders/              # Order management
│   │   ├── admin/               # Admin endpoints
│   │   ├── driver/              # Driver endpoints
│   │   └── settings/            # Settings
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── lib/
│   ├── prisma.ts                # Prisma client
│   └── utils.ts                 # Utility functions
├── store/
│   ├── authStore.ts             # Authentication state
│   └── cartStore.ts             # Shopping cart state
└── components/
    └── ProtectedRoute.tsx        # Route protection
```

## 🔐 Authentication

### Admin Dashboard
- **PIN**: `8888`
- Full access to all admin features
- Manage products, orders, drivers, expenses, and settings
- Access: `/admin/dashboard`

### Driver Portal
- **PIN**: `2326`
- Limited to delivery management only
- View assigned deliveries and earnings
- Access: `/driver-portal/dashboard`

## 📱 Features

### 🏠 Home Page
- Hero banner with featured products
- Product browsing by category
- "Shop Now" call-to-action
- Admin login button

### 🛍️ Customer Ordering System (`/bestellen`)
- Browse all products
- Add to cart
- Multi-step checkout:
  1. Personal information
  2. Delivery & payment options
  3. Order review
- Automatic WhatsApp confirmation
- Order number generation

### 🛒 Shopping Cart (`/cart`)
- View cart items
- Adjust quantities
- Remove items
- Order summary with totals
- Proceed to checkout

### 👨‍💼 Admin Dashboard (`/admin`)

#### Dashboard
- Total orders count
- Revenue statistics
- Paid vs unpaid breakdown
- Orders placed today
- Pending deliveries
- Recent orders
- Top selling products

#### Products Management
- Add new products with:
  - Name, description, price
  - Category (Skin Care, Hair Care, Body Care, Gift Sets)
  - Stock quantity
  - Product image URL
  - Active/inactive status
- Edit existing products
- Delete products
- Real-time inventory updates

#### Orders Management
- View all orders
- Filter by status (Nieuw, Bevestigd, Onderweg, Afgeleverd, Geannuleerd)
- Customer information
- Order details with items and pricing
- Payment status tracking
- Print invoices
- Send WhatsApp to customer

#### Customer Management
- View all customers
- Order history per customer
- Total spent tracking
- Contact information

#### Driver Management
- Add/edit drivers
- Track active deliveries
- WhatsApp driver communication
- Broadcast deliveries to drivers

#### Expense Tracking
- Record business expenses
- Date, description, amount
- View total expenses
- Monthly reports

#### Reports & Analytics
- Daily sales chart
- Monthly sales trends
- Product performance
- Revenue vs expenses
- Profit analysis

#### Delivery Settings
- Editable delivery fees:
  - **Paramaribo**: Free (default)
  - **Outside Paramaribo**: SRD 150 (default)
- Update fees without code changes

### 🚚 Driver Portal (`/driver-portal`)

#### Dashboard
- Pending deliveries count
- Completed deliveries count
- Total earnings

#### Deliveries
- View pending deliveries
- Customer address and phone
- Update delivery status:
  - Pending → In Transit → Delivered
- Send WhatsApp to customer
- Completed deliveries history

#### Earnings
- Total earnings from completed deliveries
- Current month earnings
- Number of completed deliveries
- Payment information

## 🎨 Design & Branding

### Color Scheme
- **Primary**: Baby Pink (#FFB6D9)
- **Secondary**: White (#FFFFFF)
- **Accent**: Gold (#FFD700)

### Typography
- Font: Poppins (Google Fonts)
- Clean, modern, and professional

## 🔗 API Endpoints

### Products
- `GET /api/products` - Get all active products
- `POST /api/products` - Create product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Orders
- `GET /api/orders` - Get all orders (admin)
- `POST /api/orders` - Create new order (customer)

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics

### Driver
- `GET /api/driver/deliveries` - Get driver's deliveries
- `PUT /api/driver/deliveries/[id]` - Update delivery status
- `GET /api/driver/earnings` - Get driver earnings

### Settings
- `GET /api/settings` - Get delivery settings
- `PUT /api/settings` - Update delivery settings (admin)

## 📊 Database Schema

### Models
- **Product**: Store product information
- **Customer**: Customer details and contact info
- **Order**: Order records with items and status
- **OrderItem**: Individual items in an order
- **Delivery**: Delivery tracking and driver assignment
- **Driver**: Driver information and status
- **Expense**: Business expense records
- **DeliverySetting**: Configurable delivery fees

## 🚀 Deployment

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Environment Variables (Production)
```
DATABASE_URL=your_production_db_url
NEXT_PUBLIC_API_URL=your_production_url
ADMIN_PIN=8888
DRIVER_PIN=2326
```

## 📝 Features Implemented

✅ Complete home page with hero banner
✅ Product browsing and filtering
✅ Shopping cart system
✅ Multi-step checkout process
✅ Automatic WhatsApp order confirmation
✅ Admin dashboard with full management
✅ Product management (CRUD)
✅ Order tracking and management
✅ Customer management
✅ Driver management and delivery tracking
✅ Expense tracking
✅ Analytics and reports
✅ PIN-based authentication
✅ Driver portal with earnings tracking
✅ Delivery status updates
✅ Real-time notifications via WhatsApp
✅ Responsive design (mobile, tablet, desktop)
✅ Baby pink & gold luxury branding

## 🔄 Automatic Features

✅ Orders save instantly to database
✅ Products auto-appear on customer page
✅ Live stock updates after orders
✅ WhatsApp confirmation opens automatically
✅ Admin receives order notifications
✅ Order numbers generated automatically
✅ Fully responsive design
✅ Delivery fees calculated automatically

## 📞 Support

For issues or questions, please check the GitHub issues or contact support.

## 📄 License

This project is proprietary and confidential.

---

**Built with ❤️ for Destiny's Care & Lumea**

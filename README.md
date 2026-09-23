# ARCANE 21 (BETA)

**A full-stack e-commerce web application built for a commercial clothing brand.**

> **Note:** Developed from scratch as a commercial project, including UI implementation, API architecture, database design, cloud media management, and Stripe integration.

> **Backend Repository:** [ARCANE 21 Backend](https://github.com/Artemmm008/shirts-shop-node)

---

## What It Is

A modern online clothing store must solve two primary challenges: providing customers with a lightning-fast, responsive UI and offering the brand owner an intuitive system to manage products, media assets, and orders.

- **For Customers:** An instant-loading catalog, simple shopping cart, and secure online checkout even for guest users without registration.
- **For Brand Owners:** A custom-built admin drawer for creating products and managing orders.

The application is engineered as a production-grade e-commerce platform designed to handle scale while keeping client-side performance high.

---

## How to Use It

### For Customers
1. **Browse the Catalog.** Instantly filter clothing items by size and sort them by price.
2. **Select Products.** Interactive product cards displaying high-resolution imagery, size selectors, and detailed product descriptions.
3. **Manage Cart.** Easily add or remove items with a single click. Your cart automatically saves in the browser, so items stay preserved even if you refresh or close the page.
4. **Seamless Checkout.** Fast redirection to a secure Stripe payment flow with automated order confirmation.
5. **Track Orders.** Customers can check their order history simply by opening the account/registration drawer—no registration required.

## Test Payment Credentials
You can test the full checkout flow using official Stripe test credentials.

> **Note:** Use any valid future expiry date (e.g., `12/30`) and any 3-digit CVC (e.g., `123`).

| **Successful Payment** | `4242 4242 4242 4242` | `123` |

| **Declined Card** | `4000 0000 0000 0002` | `123` |

### For Administrators
1. **Authentication.** Secure login to the admin control panel.
2. **Product Management (CRUD).** Create new items, update size availability, add custom size guides, modify pricing, assign categories, and change product status.
3. **Media Uploads.** Upload product pictures directly to Cloudinary.
4. **Order Management.** View incoming customer orders and update order statuses in real time.

---

## Data Sources & Backend Architecture

Built with a modern full-stack architecture: Next.js on the frontend and Node.js on the backend.

| Module / Service | Technology | System Role | Core Benefit |
| --- | --- | --- | --- |
| **Database** | MongoDB | Data Persistence | Stores products, orders, and users |
| **Media Server** | Cloudinary API | Cloud Asset Hosting | Provides cloud photo storage and automatic image optimization |
| **Payment Gateway** | Stripe API + Webhooks | Payment Processing | Secure credit card processing, checkout sessions, and background webhooks |
| **Guest Sessions** | HTTP-Only Cookies / Storage | User Identification | Allows non-registered users to complete checkout sessions |

### Cart Management & Persistence

The shopping cart operates fully on the client side and persists across browser sessions using `localStorage`, allowing guest users to save their items without needing an account.

---

## Image Management Pipeline

Product images are stored and served through Cloudinary:

1. The administrator uploads product photos via the admin panel.
2. Images are automatically saved and hosted in Cloudinary.
3. The frontend fetches product images directly from Cloudinary to display on the site.

---

## Architecture & Tech Stack

**Technology Stack:**

* **Frontend:** Next.js · React · TypeScript · React Query · Axios · Zustand · CSS Modules
* **Backend:** Node.js · Express.js · MongoDB
* **Integrations:** Stripe SDK · Cloudinary SDK
* **Infrastructure:** Vercel (Frontend) · Render (Backend)

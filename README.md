# TrustBazar Frontend Web App

TrustBazar Frontend is a React-based web application for product authentication, barcode-based product verification, product management, and consumer-facing product information display.

The web app allows users to browse registered products, verify a product by scanning its barcode, and view product authenticity results. It also provides admin-side functionality for adding products, uploading product images, managing product status, and viewing products in a table format.

---

## Overview

TrustBazar is designed to reduce counterfeit product risks by allowing consumers to verify whether a product is registered as an original product.

The system uses a barcode-based verification workflow:

```text
Admin adds product
→ Product image is uploaded
→ Product data is stored through backend API
→ Barcode is generated from serial number
→ Consumer scans barcode
→ Backend checks product record
→ Frontend shows verification result
```

---

## Core Features

- Professional homepage
- Product listing page
- Product details page
- Barcode-based product verification
- Manual serial number verification
- Verified product success banner
- Invalid barcode error banner
- Admin product creation page
- Product image upload through backend and Cloudinary
- Product table for admin-side management
- Empty database banner
- Backend unavailable banner
- Reusable component-based frontend structure
- API communication using Axios
- Responsive UI using Tailwind CSS

---

## Tech Stack

| Layer              | Technology        |
| ------------------ | ----------------- |
| Frontend Framework | React             |
| Build Tool         | Vite              |
| Language           | JavaScript / JSX  |
| Routing            | React Router DOM  |
| API Client         | Axios             |
| UI Styling         | Tailwind CSS      |
| UI Components      | Material UI       |
| Barcode Scanner    | html5-qrcode      |
| Backend API        | Node.js / Express |
| Database           | MongoDB           |
| Image Storage      | Cloudinary        |
| Deployment         | Vercel            |

---

## Project Structure

```text
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── home/
│   │   │   ├── FeatureCard.jsx
│   │   │   ├── HomeFooterCTA.jsx
│   │   │   ├── HomeHero.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── SectionTitle.jsx
│   │   │   ├── SecurityFeatures.jsx
│   │   │   ├── TrustMetrics.jsx
│   │   │   └── VerificationCTA.jsx
│   │   │
│   │   ├── BackendErrorBanner.jsx
│   │   ├── BackendGuard.jsx
│   │   ├── Form.jsx
│   │   ├── Loading.jsx
│   │   ├── Navbar.jsx
│   │   └── ProductCard.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductTable.jsx
│   │   ├── NewProduct.jsx
│   │   ├── ProductDetails.jsx
│   │   └── VerifyProduct.jsx
│   │
│   ├── routes/
│   │   └── index.jsx
│   │
│   ├── utils/
│   │   ├── makeRequest.js
│   │   ├── FormSource.js
│   │   └── TableSource.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

---

## Main Pages

### Home Page

The homepage introduces the TrustBazar platform and explains the product verification process. It includes reusable homepage sections such as hero banner, trust metrics, how-it-works section, security features, and verification call-to-action.

### Products Page

Displays all registered products for general users. If no products are available, the page shows a clean empty-database banner.

### Product Details Page

Shows detailed product information, including product image, brand, category, origin, price, manufacturing date, expiration date, and barcode-related information.

### Verify Product Page

Allows users to verify a product by scanning the barcode printed on the product label. Users can also manually enter a serial number if camera scanning is unavailable.

Verification result behavior:

```text
Valid barcode
→ Shows Verified Original Product banner

Invalid barcode
→ Shows Product Not Verified error banner

Backend unavailable
→ Shows backend error banner
```

### Product Table Page

Admin-side table view for managing products. It displays registered products and allows product selling status updates.

### New Product Page

Admin-side product creation form. It allows an admin to add product information, upload product images, and register a new product through the backend API.

---

## Backend API Integration

The frontend communicates with the backend using Axios.

API configuration is handled in:

```text
src/utils/makeRequest.js
```

Example configuration:

```js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
```

---

## Environment Variables

Create a `.env` file inside the `client/` directory.

```env
VITE_API_URL=https://trustbazar-backend.onrender.com/api
```

For local development:

```env
VITE_API_URL=http://localhost:5000/api
```

Do not store backend secrets, MongoDB credentials, or Cloudinary API secrets in the frontend environment.

---

## API Endpoints Used by Frontend

| Feature               | Method | Endpoint                         |
| --------------------- | -----: | -------------------------------- |
| Backend health check  |    GET | `/health`                        |
| Get all products      |    GET | `/products/all`                  |
| Create product        |   POST | `/products/create`               |
| Upload product image  |   POST | `/products/upload-image`         |
| Verify product        |   POST | `/products/verify`               |
| Get single product    |    GET | `/products/single/:serialNumber` |
| Update selling status |    PUT | `/products/:serialNumber`        |
| Undo selling status   |    PUT | `/products/undo/:serialNumber`   |
| Delete product        | DELETE | `/products/:serialNumber`        |

---

## Product Image Upload Flow

Product images are uploaded through the backend and stored in Cloudinary.

```text
Frontend selects image
→ Sends image to backend endpoint
→ Backend uploads image to Cloudinary
→ Cloudinary returns image URL
→ Frontend stores image URL as productImg
→ Product record is saved through backend API
```

The frontend upload endpoint:

```http
POST /products/upload-image
```

The backend returns:

```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "imageUrl": "https://res.cloudinary.com/...",
  "publicId": "trustbazar/products/..."
}
```

---

## Product Verification Flow

The verification page scans a barcode and sends the decoded serial number to the backend.

```http
POST /products/verify
```

Request body:

```json
{
  "serialNumber": "SCANNED_BARCODE_VALUE"
}
```

Successful verification response:

```json
{
  "success": true,
  "code": "PRODUCT_VERIFIED",
  "product": {}
}
```

Invalid barcode response:

```json
{
  "success": false,
  "code": "PRODUCT_NOT_VERIFIED"
}
```

The frontend controls the user-facing messages and banners based on the response code.

---

## Backend Guard

Most pages depend on the backend server. The frontend uses a reusable backend guard to check whether the backend and database are available before showing protected pages.

The homepage remains visible even if the backend is unavailable.

Backend-dependent pages include:

```text
/products
/products-table
/products/new
/verify-product
/product details page
```

If the backend is down, these pages show a backend unavailable banner instead of broken content.

---

## Empty Database Handling

When the backend returns an empty product list, the frontend shows a clean empty-state banner.

Example backend response:

```json
{
  "success": true,
  "code": "EMPTY_PRODUCTS",
  "isEmpty": true,
  "message": "No products are available in the database.",
  "count": 0,
  "products": []
}
```

The frontend shows:

```text
No Products Found
```

This applies to both the public products page and the admin product table page.

---

## Installation

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Deployment

The frontend is designed to be deployed on Vercel.

Before deployment, add the backend API URL as an environment variable:

```env
VITE_API_URL=https://trustbazar-backend.onrender.com/api
```

Then deploy the `client/` directory to Vercel.

---

## Security Notes

- The frontend does not directly access MongoDB.
- The frontend does not store Cloudinary API secrets.
- The frontend does not store backend environment secrets.
- All product verification requests are sent to the backend API.
- Product authenticity is verified server-side.
- Image upload is handled through the backend, not directly from frontend secrets.
- Admin-side features should be protected with authentication in a production deployment.

---

## Current Scope

The current frontend supports:

- Public product browsing
- Barcode-based product verification
- Manual verification fallback
- Product authenticity result display
- Admin product creation
- Product image upload
- Product table management
- Empty database handling
- Backend unavailable handling
- Reusable homepage and UI components

---

## Future Improvements

- Admin authentication
- Role-based access control
- QR code support
- Product verification history
- Fake product reporting
- Blockchain transaction hash display
- Product recall warning system
- Pagination and search for products
- Better admin dashboard analytics
- Multi-language support
- Dark mode support

---

## License

This project is developed for academic and prototype purposes. Update this section with the appropriate license before public release.

---

## Author

TrustBazar Product Authentication System
Frontend Web Application

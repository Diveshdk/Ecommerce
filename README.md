# Mock E-Commerce Cart - Full Stack Application

A full-stack shopping cart application built for Vibe Commerce screening assignment. This application demonstrates basic e-commerce functionality including product display, cart management, and mock checkout process.

## 🚀 Features

### Backend Features
- ✅ **GET /api/products** - Fetch 8 mock products with id, name, and price
- ✅ **POST /api/cart** - Add items to cart with productId and quantity
- ✅ **DELETE /api/cart/:id** - Remove specific items from cart
- ✅ **GET /api/cart** - Retrieve cart items with calculated totals
- ✅ **POST /api/checkout** - Process mock checkout and generate receipt

### Frontend Features
- ✅ **Products Grid** - Display products with "Add to Cart" functionality
- ✅ **Cart Management** - View cart items, update quantities, remove items
- ✅ **Checkout Form** - Customer information form (name/email)
- ✅ **Receipt Modal** - Display order confirmation with total and timestamp
- ✅ **Responsive Design** - Works across desktop and mobile devices

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing
- **PostgreSQL** - Database (schema included, but using in-memory for demo)

### Frontend
- **React** - Frontend library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Hot Toast** - Toast notifications

## 📁 Project Structure

```
├── backend/
│   ├── app.js                  # Express app configuration
│   ├── index.js               # Server entry point
│   ├── package.json           # Backend dependencies
│   ├── controller/
│   │   ├── cart.controller.js  # Cart API logic
│   │   └── product.controller.js # Product API logic
│   ├── routes/
│   │   ├── cart.route.js      # Cart API routes
│   │   └── product.route.js   # Product API routes
│   └── database/
│       └── database.sql       # Database schema
├── frontend/
│   ├── src/
│   │   ├── App.js             # Main React component
│   │   ├── components/
│   │   │   ├── Cards.jsx      # Product card component
│   │   │   └── Navbar.jsx     # Navigation component
│   │   └── pages/
│   │       ├── Home.jsx       # Products grid page
│   │       └── Cart.jsx       # Cart and checkout page
│   ├── package.json           # Frontend dependencies
│   └── tailwind.config.js     # Tailwind configuration
└── README.md                  # This file
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   node index.js
   ```
   
   The backend will run on `http://localhost:4000`

### Frontend Setup

1. Open a new terminal and navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   
   The frontend will run on `http://localhost:3000`

### Access the Application

1. Open your browser and go to `http://localhost:3000`
2. Browse products on the home page
3. Add items to cart using "Add to Cart" buttons
4. Navigate to cart page using the cart icon in navigation
5. Proceed to checkout by filling in customer information
6. View the receipt modal after successful checkout

## 🔗 API Endpoints

### Products
- **GET** `/api/products` - Get all available products
  ```json
  {
    "success": true,
    "products": [
      {"id": 1, "name": "Laptop", "price": 999.99},
      {"id": 2, "name": "Smartphone", "price": 699.99}
    ]
  }
  ```

### Cart Management
- **POST** `/api/cart` - Add item to cart
  ```json
  // Request body
  {"productId": 1, "qty": 2}
  
  // Response
  {"success": true, "message": "Item added to cart", "cart": [...]}
  ```

- **GET** `/api/cart` - Get cart with totals
  ```json
  {
    "success": true,
    "cart": [...],
    "total": "1299.98"
  }
  ```

- **DELETE** `/api/cart/:id` - Remove item from cart
  ```json
  {"success": true, "message": "Item removed from cart"}
  ```

### Checkout
- **POST** `/api/checkout` - Process checkout
  ```json
  // Request body
  {"cartItems": [...], "customerInfo": {"name": "John", "email": "john@example.com"}}
  
  // Response
  {
    "success": true,
    "receipt": {
      "id": 1699123456789,
      "total": "1299.98",
      "timestamp": "2024-11-07T10:30:00.000Z",
      "status": "completed"
    }
  }
  ```

## 🎯 Key Implementation Details

### Mock Data Approach
- Products are hardcoded in the backend controller for demonstration
- Cart uses in-memory storage (resets on server restart)
- In production, this would connect to a proper database

### Responsive Design
- Mobile-first approach using Tailwind CSS
- Responsive grid layout for products
- Mobile-friendly navigation with hamburger menu

### Error Handling
- Frontend displays user-friendly error messages
- Backend returns consistent error responses
- Network error handling for API calls

### User Experience
- Loading states during API calls
- Toast notifications for user feedback
- Modal-based checkout and receipt display
- Intuitive cart management interface

## 🧪 Testing the Application

1. **Add Products to Cart**
   - Click "Add to Cart" on any product
   - Verify the button changes to "Added"
   - Check that items appear in cart

2. **Cart Management**
   - Navigate to cart page
   - Verify items display with correct pricing
   - Test remove functionality
   - Verify total calculations

3. **Checkout Process**
   - Click "Checkout" button
   - Fill in customer information form
   - Submit and verify receipt modal appears
   - Confirm cart is cleared after checkout

## 🔮 Future Enhancements

- **Database Integration** - Replace in-memory storage with PostgreSQL
- **User Authentication** - Add user accounts and persistent carts
- **Product Images** - Integrate with image storage service
- **Payment Integration** - Add real payment processing
- **Inventory Management** - Track stock levels
- **Order History** - Store and display past orders
- **Product Search** - Add search and filtering capabilities

_ Demo Screenshots : 
<img width="1440" height="900" alt="Screenshot 2025-11-08 at 2 57 46 AM" src="https://github.com/user-attachments/assets/18da3e68-d35e-42cc-8ba8-4cc482bedcd8" />
<img width="1440" height="900" alt="Screenshot 2025-11-08 at 2 58 00 AM" src="https://github.com/user-attachments/assets/1ac25702-8cda-4fda-bd5b-6d58f47efcc9" />
<img width="1440" height="900" alt="Screenshot 2025-11-08 at 2 58 07 AM" src="https://github.com/user-attachments/assets/bdc8df61-1a52-4cfe-815b-4e25cb1222ab" />
<img width="1440" height="900" alt="Screenshot 2025-11-08 at 2 58 16 AM" src="https://github.com/user-attachments/assets/1fa219e8-bc3b-4244-8cfb-c0b72bf7f8c1" />
<img width="1440" height="900" alt="Screenshot 2025-11-08 at 2 58 18 AM" src="https://github.com/user-attachments/assets/d49a5caa-2a90-428b-aacd-429ab8b8e477" />

---

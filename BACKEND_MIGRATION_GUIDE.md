# Backend Migration Guide

This guide explains how to migrate from mock data to a real backend database and implement the new API services.

## Overview

We've created a comprehensive backend connection system that replaces all mock data with real API calls. The system includes:

1. **Type Definitions** (`src/types/api.ts`) - Complete TypeScript interfaces for all data structures
2. **API Services** (`src/services/api.ts`) - Service classes for all CRUD operations
3. **React Query Hooks** (`src/hooks/use-api-simple.ts`) - Easy-to-use hooks for data fetching and mutations
4. **Query Provider** (`src/providers/query-provider.tsx`) - React Query setup for caching and state management

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(100) NOT NULL,
  avatar_url TEXT,
  cover_url TEXT,
  phone_number VARCHAR(50),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  zip_code VARCHAR(20),
  country VARCHAR(100),
  company VARCHAR(255),
  is_verified BOOLEAN DEFAULT FALSE,
  status ENUM('active', 'pending', 'banned', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id VARCHAR(255) PRIMARY KEY,
  order_number VARCHAR(100) UNIQUE NOT NULL,
  customer_id VARCHAR(255) NOT NULL,
  status ENUM('pending', 'completed', 'cancelled', 'refunded') DEFAULT 'pending',
  sub_total DECIMAL(10,2) NOT NULL,
  shipping DECIMAL(10,2) DEFAULT 0,
  discount DECIMAL(10,2) DEFAULT 0,
  taxes DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  total_quantity INT NOT NULL,
  shipping_address JSON,
  payment_info JSON,
  delivery_info JSON,
  history JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES users(id)
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
  id VARCHAR(255) PRIMARY KEY,
  order_id VARCHAR(255) NOT NULL,
  sku VARCHAR(100) NOT NULL,
  quantity INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  cover_url TEXT,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);
```

### Products Table
```sql
CREATE TABLE products (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  cover_url TEXT,
  price DECIMAL(10,2) NOT NULL,
  price_sale DECIMAL(10,2),
  colors JSON,
  status ENUM('sale', 'new', '') DEFAULT '',
  inventory_type ENUM('in_stock', 'low_stock', 'out_of_stock') DEFAULT 'in_stock',
  total_rating DECIMAL(3,2) DEFAULT 0,
  total_review INT DEFAULT 0,
  tags JSON,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Invoices Table
```sql
CREATE TABLE invoices (
  id VARCHAR(255) PRIMARY KEY,
  invoice_number VARCHAR(100) UNIQUE NOT NULL,
  customer_id VARCHAR(255) NOT NULL,
  sent INT DEFAULT 0,
  status ENUM('paid', 'pending', 'overdue', 'draft') DEFAULT 'draft',
  total_amount DECIMAL(10,2) NOT NULL,
  balance DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  items JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES users(id)
);
```

### Jobs Table
```sql
CREATE TABLE jobs (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  type VARCHAR(100),
  location VARCHAR(255),
  salary VARCHAR(100),
  experience VARCHAR(100),
  employment_type ENUM('Full time', 'Part time', 'On demand', 'N/A') DEFAULT 'N/A',
  role VARCHAR(255),
  skills JSON,
  benefits JSON,
  description TEXT,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Tours Table
```sql
CREATE TABLE tours (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cover_url TEXT,
  price DECIMAL(10,2) NOT NULL,
  price_sale DECIMAL(10,2),
  total_views INT DEFAULT 0,
  tags JSON,
  duration VARCHAR(100),
  rating_number DECIMAL(3,2) DEFAULT 0,
  total_reviews INT DEFAULT 0,
  description TEXT,
  services JSON,
  tour_guide JSON,
  gallery JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Files Table
```sql
CREATE TABLE files (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  size BIGINT NOT NULL,
  type VARCHAR(100) NOT NULL,
  url TEXT,
  preview TEXT,
  is_favorited BOOLEAN DEFAULT FALSE,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Backend API Implementation

### Required Backend Technologies
- **Node.js/Express.js** or **Python/Django/FastAPI** or **PHP/Laravel**
- **Database**: PostgreSQL, MySQL, or MongoDB
- **Authentication**: JWT tokens
- **File Upload**: Multer (Node.js) or similar
- **Validation**: Joi, Yup, or similar

### API Endpoints Structure

#### Users API
```
GET    /api/users                    - Get users list with pagination/filters
GET    /api/users/:id                - Get user by ID
POST   /api/users                    - Create new user
PUT    /api/users/:id                - Update user
DELETE /api/users/:id                - Delete user
GET    /api/users/:id/about          - Get user about info
GET    /api/users/:id/followers      - Get user followers
GET    /api/users/:id/friends        - Get user friends
GET    /api/users/:id/gallery        - Get user gallery
GET    /api/users/:id/feeds          - Get user feeds
GET    /api/users/cards              - Get user cards
GET    /api/users/:id/payments       - Get user payments
GET    /api/users/:id/addresses      - Get user addresses
GET    /api/users/:id/invoices       - Get user invoices
GET    /api/users/plans              - Get user plans
GET    /api/users/status-options     - Get user status options
```

#### Orders API
```
GET    /api/orders                   - Get orders list with pagination/filters
GET    /api/orders/:id               - Get order by ID
POST   /api/orders                   - Create new order
PUT    /api/orders/:id               - Update order
DELETE /api/orders/:id               - Delete order
PATCH  /api/orders/:id/status        - Update order status
GET    /api/orders/status-options    - Get order status options
```

#### Products API
```
GET    /api/products                 - Get products list with pagination/filters
GET    /api/products/:id             - Get product by ID
POST   /api/products                 - Create new product
PUT    /api/products/:id             - Update product
DELETE /api/products/:id             - Delete product
GET    /api/products/search          - Search products
GET    /api/products/categories      - Get product categories
```

#### Invoices API
```
GET    /api/invoices                 - Get invoices list with pagination
GET    /api/invoices/:id             - Get invoice by ID
POST   /api/invoices                 - Create new invoice
PUT    /api/invoices/:id             - Update invoice
DELETE /api/invoices/:id             - Delete invoice
GET    /api/invoices/status-options  - Get invoice status options
```

#### Jobs API
```
GET    /api/jobs                     - Get jobs list with pagination
GET    /api/jobs/:id                 - Get job by ID
POST   /api/jobs                     - Create new job
PUT    /api/jobs/:id                 - Update job
DELETE /api/jobs/:id                 - Delete job
GET    /api/jobs/search              - Search jobs
```

#### Tours API
```
GET    /api/tours                    - Get tours list with pagination
GET    /api/tours/:id                - Get tour by ID
POST   /api/tours                    - Create new tour
PUT    /api/tours/:id                - Update tour
DELETE /api/tours/:id                - Delete tour
GET    /api/tours/search             - Search tours
```

#### Files API
```
GET    /api/files                    - Get files list with pagination
GET    /api/files/:id                - Get file by ID
POST   /api/files/upload             - Upload file
DELETE /api/files/:id                - Delete file
PATCH  /api/files/:id/favorite       - Toggle file favorite
```

#### Overview API
```
GET    /api/overview/analytics       - Get analytics data
GET    /api/overview/revenue-chart   - Get revenue chart data
GET    /api/overview/sales-chart     - Get sales chart data
GET    /api/overview/orders-chart    - Get orders chart data
```

## Frontend Implementation

### 1. Setup React Query Provider

Update your main layout or app component:

```tsx
// app/layout.tsx or similar
import QueryProvider from 'src/providers/query-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
```

### 2. Replace Mock Data with API Calls

#### Before (using mock data):
```tsx
import { _userList } from 'src/_mock/_user';

export default function UserListView() {
  const users = _userList;
  
  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

#### After (using API):
```tsx
import { useUsers } from 'src/hooks/use-api-simple';

export default function UserListView() {
  const { data, isLoading, error } = useUsers();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data?.data.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

### 3. Using Mutations

```tsx
import { useCreateUser, useUpdateUser, useDeleteUser } from 'src/hooks/use-api-simple';

export default function UserForm() {
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const handleCreate = (userData) => {
    createUser.mutate(userData, {
      onSuccess: () => {
        // Handle success
        console.log('User created successfully');
      },
      onError: (error) => {
        // Handle error
        console.error('Failed to create user:', error);
      },
    });
  };

  const handleUpdate = (id, userData) => {
    updateUser.mutate({ id, userData }, {
      onSuccess: () => {
        console.log('User updated successfully');
      },
    });
  };

  const handleDelete = (id) => {
    deleteUser.mutate(id, {
      onSuccess: () => {
        console.log('User deleted successfully');
      },
    });
  };

  return (
    <div>
      {/* Your form components */}
    </div>
  );
}
```

### 4. Environment Configuration

Update your `.env.local` file:

```env
# Backend API URL
NEXT_PUBLIC_HOST_API=http://localhost:3001/api

# Assets URL (if different from backend)
NEXT_PUBLIC_ASSETS_API=http://localhost:3001/assets

# Mapbox API (if using maps)
NEXT_PUBLIC_MAPBOX_API=your_mapbox_token_here
```

## Migration Steps

### Phase 1: Backend Setup
1. Set up your backend server (Node.js/Express, Python/Django, etc.)
2. Create database and tables using the provided schema
3. Implement authentication system (JWT)
4. Create API endpoints following the structure above
5. Add validation and error handling
6. Test all endpoints with Postman or similar

### Phase 2: Frontend Integration
1. Install React Query: `npm install @tanstack/react-query`
2. Set up QueryProvider in your app
3. Replace mock data imports with API hooks
4. Update components to handle loading and error states
5. Test all functionality

### Phase 3: Data Migration
1. Export mock data to JSON format
2. Create migration scripts to populate database
3. Run data migration
4. Verify data integrity

### Phase 4: Testing & Optimization
1. Test all CRUD operations
2. Implement error boundaries
3. Add loading states and skeletons
4. Optimize queries and caching
5. Performance testing

## Example Backend Implementation (Node.js/Express)

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3001;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(cors());
app.use(express.json());

// Users API
app.get('/api/users', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status, role } = req.query;
    const offset = (page - 1) * limit;
    
    let query = 'SELECT * FROM users WHERE 1=1';
    const params = [];
    
    if (search) {
      query += ' AND (name ILIKE $1 OR email ILIKE $1)';
      params.push(`%${search}%`);
    }
    
    if (status) {
      query += ` AND status = $${params.length + 1}`;
      params.push(status);
    }
    
    if (role) {
      query += ` AND role = $${params.length + 1}`;
      params.push(role);
    }
    
    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);
    
    const result = await pool.query(query, params);
    
    // Get total count
    const countQuery = 'SELECT COUNT(*) FROM users';
    const countResult = await pool.query(countQuery);
    
    res.json({
      data: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(countResult.rows[0].count),
        totalPages: Math.ceil(countResult.rows[0].count / limit),
      },
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
      });
    }
    
    res.json({
      data: result.rows[0],
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
});

// Add more endpoints for other entities...

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

## Benefits of This Migration

1. **Real Data**: Replace static mock data with dynamic database data
2. **Scalability**: Handle large datasets and multiple users
3. **Performance**: Implement caching and optimization
4. **Security**: Add authentication and authorization
5. **Maintainability**: Centralized data management
6. **Real-time Updates**: Implement WebSocket for live updates
7. **Analytics**: Track user behavior and system performance

## Next Steps

1. Choose your backend technology stack
2. Set up the database and create tables
3. Implement the API endpoints
4. Update the frontend to use the new API services
5. Test thoroughly and deploy

This migration will transform your application from a static demo to a fully functional, production-ready system. 
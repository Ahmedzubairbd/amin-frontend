# Amin Diagnostics - Backend Integration Guide

## Overview

This guide provides comprehensive instructions for setting up the backend infrastructure for Amin Diagnostics & Medical Services, including database setup, API endpoints, authentication, SMS integration, file upload, and real-time features.

## Table of Contents

1. [Database Setup](#database-setup)
2. [API Endpoints](#api-endpoints)
3. [Authentication System](#authentication-system)
4. [SMS OTP Integration](#sms-otp-integration)
5. [File Upload System](#file-upload-system)
6. [Real-time Features](#real-time-features)
7. [Environment Configuration](#environment-configuration)
8. [Deployment](#deployment)

## Database Setup

### PostgreSQL Database Schema

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'doctor', 'patient')),
    phone VARCHAR(20),
    avatar_url TEXT,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Doctors table
CREATE TABLE doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    specialty VARCHAR(100) NOT NULL,
    experience_years INTEGER NOT NULL,
    education TEXT,
    license_number VARCHAR(50) UNIQUE NOT NULL,
    availability JSONB,
    consultation_fee DECIMAL(10,2),
    rating DECIMAL(3,2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patients table
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
    blood_group VARCHAR(5),
    emergency_contact VARCHAR(20),
    medical_history TEXT,
    allergies TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments table
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Medical tests table
CREATE TABLE medical_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
    test_name VARCHAR(100) NOT NULL,
    test_type VARCHAR(50) NOT NULL,
    test_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed')),
    results TEXT,
    report_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Files table
CREATE TABLE files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    upload_type VARCHAR(50) NOT NULL CHECK (upload_type IN ('medical-report', 'patient-document', 'profile-image', 'test-result')),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('info', 'success', 'warning', 'error')),
    read BOOLEAN DEFAULT FALSE,
    related_id UUID,
    related_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- OTP table for SMS verification
CREATE TABLE otp_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number VARCHAR(20) NOT NULL,
    otp_code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- OAuth accounts table
CREATE TABLE oauth_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(20) NOT NULL,
    provider_id VARCHAR(255) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(provider, provider_id)
);

-- Chat messages table
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'file', 'image')),
    file_url TEXT,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_doctors_specialty ON doctors(specialty);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_medical_tests_status ON medical_tests(status);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, read);
CREATE INDEX idx_otp_phone_expires ON otp_codes(phone_number, expires_at);
CREATE INDEX idx_chat_messages_sender_receiver ON chat_messages(sender_id, receiver_id);
```

## API Endpoints

### Authentication Endpoints

```typescript
// POST /api/auth/register
interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'doctor' | 'patient';
  phone?: string;
}

// POST /api/auth/login
interface LoginRequest {
  email: string;
  password: string;
}

// POST /api/auth/send-otp
interface SendOTPRequest {
  phone: string;
}

// POST /api/auth/verify-otp
interface VerifyOTPRequest {
  phone: string;
  otp: string;
}

// POST /api/auth/oauth
interface OAuthRequest {
  provider: 'google' | 'github';
  providerId: string;
  email: string;
  name: string;
  image?: string;
}

// POST /api/auth/refresh
interface RefreshRequest {
  refreshToken: string;
}
```

### User Management Endpoints

```typescript
// GET /api/users
// GET /api/users/:id
// POST /api/users
// PUT /api/users/:id
// DELETE /api/users/:id
// GET /api/users/email?email=user@example.com
```

### Doctor Management Endpoints

```typescript
// GET /api/doctors
// GET /api/doctors/:id
// POST /api/doctors
// PUT /api/doctors/:id
// GET /api/search/doctors?q=query
```

### Patient Management Endpoints

```typescript
// GET /api/patients
// GET /api/patients/:id
// POST /api/patients
// PUT /api/patients/:id
// GET /api/search/patients?q=query
```

### Appointment Management Endpoints

```typescript
// GET /api/appointments
// GET /api/appointments/:id
// POST /api/appointments
// PUT /api/appointments/:id
// GET /api/search/appointments?q=query
```

### Medical Tests Endpoints

```typescript
// GET /api/medical-tests
// GET /api/medical-tests/:id
// POST /api/medical-tests
// PUT /api/medical-tests/:id
```

### File Upload Endpoints

```typescript
// POST /api/upload
// GET /api/files/:id
// DELETE /api/files/:id
// GET /api/files/:id/download
// GET /api/files/:id/thumbnail
```

### Notification Endpoints

```typescript
// GET /api/notifications/:userId
// PUT /api/notifications/:id/read
// POST /api/notifications
```

### Dashboard Endpoints

```typescript
// GET /api/dashboard/stats/:userId?role=admin
// GET /api/dashboard/activity/:userId?limit=10
```

## Authentication System

### JWT Token Structure

```typescript
interface JWTPayload {
  sub: string; // User ID
  email: string;
  role: string;
  phone?: string;
  iat: number; // Issued at
  exp: number; // Expiration
}
```

### Authentication Flow

1. **Email/Password Login**
   - User submits email and password
   - Backend validates credentials
   - Returns JWT access token and refresh token

2. **Phone OTP Login**
   - User submits phone number
   - Backend sends OTP via SMS
   - User submits OTP for verification
   - Returns JWT tokens upon successful verification

3. **OAuth Login**
   - User clicks OAuth provider button
   - Redirected to provider for authorization
   - Provider returns authorization code
   - Backend exchanges code for user info
   - Creates/updates user in database
   - Returns JWT tokens

### Middleware for Protected Routes

```typescript
// Middleware to verify JWT token
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Role-based authorization
const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
  };
};
```

## SMS OTP Integration

### Sonali SMS Configuration

```typescript
// SMS service configuration
const smsConfig = {
  apiKey: process.env.SONALI_SMS_API_KEY,
  secretKey: process.env.SONALI_SMS_SECRET_KEY,
  senderId: process.env.SONALI_SMS_SENDER_ID,
  baseUrl: process.env.SONALI_SMS_BASE_URL,
  alternateUrl: process.env.SONALI_SMS_ALTERNATE_URL,
};

// Send OTP endpoint
app.post('/api/auth/send-otp', async (req, res) => {
  const { phone } = req.body;
  
  try {
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP in database with expiration
    await db.query(
      'INSERT INTO otp_codes (phone_number, otp_code, expires_at) VALUES ($1, $2, $3)',
      [phone, otp, new Date(Date.now() + 5 * 60 * 1000)] // 5 minutes
    );
    
    // Send SMS via Sonali SMS
    const message = `Your Amin Diagnostics OTP is: ${otp}. Valid for 5 minutes.`;
    const response = await sendSMS(phone, message);
    
    if (response.success) {
      res.json({ success: true, message: 'OTP sent successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
```

### SMS Service Functions

```typescript
// Send SMS function
async function sendSMS(phoneNumber: string, message: string) {
  const params = new URLSearchParams({
    apikey: smsConfig.apiKey,
    secretkey: smsConfig.secretKey,
    callerID: smsConfig.senderId,
    toUser: phoneNumber,
    messageContent: message,
  });

  try {
    // Try primary URL first
    const response = await fetch(`${smsConfig.baseUrl}/sendtext?${params}`);
    const data = await response.json();
    
    if (data.Status === '0' && data.Text === 'ACCEPTD') {
      return { success: true, messageId: data.Message_ID };
    } else {
      // Try alternate URL
      const altResponse = await fetch(`${smsConfig.alternateUrl}/sendtext?${params}`);
      const altData = await altResponse.json();
      
      if (altData.Status === '0' && altData.Text === 'ACCEPTD') {
        return { success: true, messageId: altData.Message_ID };
      }
    }
    
    return { success: false, error: 'SMS sending failed' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

## File Upload System

### File Upload Configuration

```typescript
// File upload configuration
const uploadConfig = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'],
  uploadPath: './uploads',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
};

// File upload endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const { type, metadata } = req.body;
    
    // Validate file
    if (!file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    
    if (file.size > uploadConfig.maxSize) {
      return res.status(400).json({ success: false, message: 'File too large' });
    }
    
    if (!uploadConfig.allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ success: false, message: 'File type not allowed' });
    }
    
    // Upload to Cloudinary or local storage
    let fileUrl;
    if (process.env.USE_CLOUDINARY === 'true') {
      fileUrl = await uploadToCloudinary(file, type);
    } else {
      fileUrl = await saveToLocalStorage(file, type);
    }
    
    // Save file info to database
    const fileRecord = await db.query(
      'INSERT INTO files (user_id, file_name, file_url, file_size, file_type, upload_type, metadata) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [req.user.id, file.originalname, fileUrl, file.size, file.mimetype, type, metadata]
    );
    
    res.json({
      success: true,
      fileId: fileRecord.rows[0].id,
      fileUrl,
      fileName: file.originalname,
      fileSize: file.size,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Upload failed' });
  }
});
```

## Real-time Features

### Socket.IO Server Setup

```typescript
// Socket.IO server configuration
import { Server } from 'socket.io';

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
});

// Authentication middleware
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error'));
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    socket.userId = decoded.sub;
    socket.userRole = decoded.role;
    next();
  } catch (error) {
    next(new Error('Authentication error'));
  }
});

// Connection handling
io.on('connection', (socket) => {
  console.log(`User ${socket.userId} connected`);
  
  // Join user-specific room
  socket.join(`user:${socket.userId}`);
  
  // Join role-based room
  socket.join(`role:${socket.userRole}`);
  
  // Handle chat messages
  socket.on('send_message', async (data) => {
    try {
      // Save message to database
      const message = await db.query(
        'INSERT INTO chat_messages (sender_id, receiver_id, message, message_type, file_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [socket.userId, data.receiverId, data.message, data.type, data.fileUrl]
      );
      
      // Emit to receiver
      io.to(`user:${data.receiverId}`).emit('chat_message', message.rows[0]);
    } catch (error) {
      socket.emit('error', 'Failed to send message');
    }
  });
  
  // Handle typing indicators
  socket.on('typing', (data) => {
    socket.to(`user:${data.receiverId}`).emit('chat_typing', {
      userId: socket.userId,
      isTyping: data.isTyping,
    });
  });
  
  // Handle room joining
  socket.on('join_room', (data) => {
    socket.join(data.roomId);
  });
  
  // Handle room leaving
  socket.on('leave_room', (data) => {
    socket.leave(data.roomId);
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User ${socket.userId} disconnected`);
  });
});
```

### Real-time Notifications

```typescript
// Function to send real-time notifications
async function sendNotification(userId: string, notification: any) {
  try {
    // Save notification to database
    const savedNotification = await db.query(
      'INSERT INTO notifications (user_id, title, message, type, related_id, related_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, notification.title, notification.message, notification.type, notification.relatedId, notification.relatedType]
    );
    
    // Emit to user via Socket.IO
    io.to(`user:${userId}`).emit('notification', savedNotification.rows[0]);
    
    return savedNotification.rows[0];
  } catch (error) {
    console.error('Failed to send notification:', error);
  }
}

// Example usage
sendNotification(userId, {
  title: 'Appointment Confirmed',
  message: 'Your appointment with Dr. Smith has been confirmed for tomorrow at 2:00 PM.',
  type: 'success',
  relatedId: appointmentId,
  relatedType: 'appointment',
});
```

## Environment Configuration

### Backend Environment Variables

```bash
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/amin_diagnostics
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=amin_diagnostics
POSTGRES_USER=your_db_username
POSTGRES_PASSWORD=your_db_password

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# SMS Configuration
SONALI_SMS_API_KEY=your-sonali-sms-api-key
SONALI_SMS_SECRET_KEY=your-sonali-sms-secret-key
SONALI_SMS_SENDER_ID=AMINDIAG
SONALI_SMS_BASE_URL=http://api.sonalisms.com:7788
SONALI_SMS_ALTERNATE_URL=http://103.177.125.106:7788

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# File Upload
UPLOAD_MAX_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,application/pdf,text/plain
UPLOAD_PATH=./uploads
USE_CLOUDINARY=true
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Real-time
SOCKET_IO_SECRET=your-socket-io-secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-email-app-password
EMAIL_FROM=noreply@amindiagnostics.com

# Security
CORS_ORIGIN=http://localhost:3000
ENCRYPTION_KEY=your-encryption-key

# Development
NODE_ENV=development
PORT=8000
LOG_LEVEL=debug
```

## Deployment

### Docker Configuration

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "8000:8000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/amin_diagnostics
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=amin_diagnostics
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### Production Checklist

- [ ] Set up PostgreSQL database
- [ ] Configure environment variables
- [ ] Set up SMS provider credentials
- [ ] Configure OAuth providers
- [ ] Set up file storage (Cloudinary or local)
- [ ] Configure SSL certificates
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline
- [ ] Configure load balancing
- [ ] Set up caching (Redis)
- [ ] Configure rate limiting
- [ ] Set up error tracking
- [ ] Configure health checks

## Testing

### API Testing with Postman

1. **Authentication Tests**
   - Test email/password login
   - Test phone OTP login
   - Test OAuth login
   - Test token refresh

2. **CRUD Operations Tests**
   - Test user management
   - Test doctor management
   - Test patient management
   - Test appointment management
   - Test medical tests

3. **File Upload Tests**
   - Test file upload
   - Test file validation
   - Test file download
   - Test file deletion

4. **Real-time Tests**
   - Test Socket.IO connection
   - Test chat functionality
   - Test notifications
   - Test typing indicators

## Security Considerations

1. **JWT Security**
   - Use strong secret keys
   - Implement token refresh
   - Set appropriate expiration times
   - Validate token on each request

2. **Database Security**
   - Use parameterized queries
   - Implement proper access controls
   - Regular security updates
   - Database encryption

3. **File Upload Security**
   - Validate file types
   - Scan for malware
   - Implement file size limits
   - Secure file storage

4. **API Security**
   - Rate limiting
   - Input validation
   - CORS configuration
   - HTTPS enforcement

5. **SMS Security**
   - OTP expiration
   - Rate limiting for OTP requests
   - Secure SMS provider credentials
   - Audit logging

## Monitoring and Logging

### Application Monitoring

```typescript
// Winston logger configuration
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
```

### Health Check Endpoint

```typescript
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    await db.query('SELECT 1');
    
    // Check Redis connection
    await redis.ping();
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
    });
  }
});
```

This comprehensive guide provides all the necessary information to set up a production-ready backend for Amin Diagnostics & Medical Services. Follow the steps carefully and ensure all security measures are properly implemented. 

---

## 1. **Database Initialization**
- Make sure you have a file at `database/init.sql` with the schema from `BACKEND_INTEGRATION_GUIDE.md` (the SQL section).
- If you don’t, let me know and I’ll generate it for you.

---

## 2. **Environment Variables & API Keys**
- Copy `.env.example` to `.env` if you haven’t already:
  ```sh
  cp .env.example .env
  ```
- **Fill in these keys:**
  - **Google OAuth:**  
    - Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
    - Create OAuth 2.0 Client ID (Web)
    - Set redirect URI: `http://localhost:3000/api/auth/callback/google`
    - Copy `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to your `.env`
  - **GitHub OAuth:**  
    - Go to [GitHub Developer Settings](https://github.com/settings/developers)
    - Register a new OAuth app
    - Set callback: `http://localhost:3000/api/auth/callback/github`
    - Copy `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` to your `.env`
  - **Cloudinary:**  
    - [Sign up](https://cloudinary.com/) and get your `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
    - Add to `.env`
  - **Sonali SMS:**  
    - Use the credentials from your provider or `SONALI_SMS.md`
    - Add to `.env`
  - **Other secrets:**  
    - Set `NEXTAUTH_SECRET`, `JWT_SECRET`, etc. to strong random values (use `openssl rand -base64 32`)

---

## 3. **Start Backend Services**
- Make sure Docker is running.
- Start everything:
  ```sh
  docker compose up -d
  ```
- This will start:
  - PostgreSQL (DB)
  - Redis (cache)
  - Backend API (you need to provide the backend code in `./backend`)
  - Socket server (real-time)
  - pgAdmin (DB GUI at [http://localhost:5050](http://localhost:5050), login: admin@amindiagnostics.com / admin123)

---

## 4. **Test Your Setup**
- Use pgAdmin to check the database.
- Use the frontend to register/login, book appointments, upload files, etc.
- If you need a backend template, see [docker_compose_nodejs_backend_recipe](https://github.com/proartmateur/docker_compose_nodejs_backend_recipe) or [microservice-setup](https://github.com/3dln/microservice-setup) for inspiration.

---

## 5. **If You Need Backend Code**
- If you don’t have a backend yet, let me know and I can generate a Node.js/Express/Prisma backend starter for you, ready to connect to this setup.

---

**Let me know if you want the full `init.sql` or a backend starter template, or if you need help with any specific API key setup!** 

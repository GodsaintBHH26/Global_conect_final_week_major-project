# 🌐 Global_Connect

Global_Connect is a full-stack social networking platform where users can connect with others, share posts, apply for jobs, and chat in real-time.  
Built with **Node.js, Express, MongoDB, Cloudinary, and Socket.io**.

---

## 🚀 Features
- **Authentication** → Register, Login, JWT Auth, Forgot/Reset Password
- **User Profiles** → Update profile, add bio/skills, manage connections
- **Posts** → Create posts with images (Cloudinary), like, and comment
- **Jobs** → Post job opportunities and view available jobs
- **Messaging** → Real-time private chat with Socket.io
- **Admin Panel** → Manage users

---

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcryptjs
- **File Uploads**: Cloudinary + Multer
- **Real-Time**: Socket.io
- **Mail Service**: Nodemailer (Gmail/SendGrid/Mailtrap)

---

## ⚙️ Installation

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/global_connect.git
cd global_connect/server
2. Install Dependencies
bash
Copy code
npm install
3. Setup Environment Variables
Create a .env file in the root:

env
Copy code
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key

# Email (choose Gmail / Mailtrap / SendGrid)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL
CLIENT_URL=http://localhost:3000
4. Start the Server
bash
Copy code
npm run dev
Server runs at: http://localhost:5000

📡 API Endpoints
🔑 Auth
POST /api/auth/register → Register new user

POST /api/auth/login → Login user

POST /api/auth/forgot-password → Send reset link

POST /api/auth/reset-password/:token → Reset password

👤 Users
GET /api/users/:id → Get user profile

PUT /api/users/:id → Update user

POST /api/users/:id/connect → Send connection request

POST /api/users/:id/accept → Accept connection

📝 Posts
POST /api/posts/ → Create new post

GET /api/posts/ → Get all posts

POST /api/posts/:id/like → Like a post

POST /api/posts/:id/comment → Comment on a post

💼 Jobs
POST /api/jobs/ → Create job

GET /api/jobs/ → Get jobs

💬 Messages
POST /api/messages/ → Send message

GET /api/messages/:receiverId → Get conversation

👨‍💼 Admin
GET /api/admin/users → Get all users

DELETE /api/admin/users/:id → Delete user

🔥 Example Requests
Create Post
bash
Copy code
POST /api/posts/
Headers: Authorization: Bearer <token>
Body (form-data):
  content = "My first post 🚀"
  image = (file)
Response:

json
Copy code
{
  "_id": "6520b1c81234567890abcdef",
  "content": "My first post 🚀",
  "image": "https://res.cloudinary.com/demo/posts/abc.jpg",
  "likes": [],
  "comments": []
}
👨‍💻 Development Notes
Use Mailtrap for testing password reset emails

Replace Gmail password with App Password if using Gmail SMTP

Use Postman or import the Postman Collection for quick testing

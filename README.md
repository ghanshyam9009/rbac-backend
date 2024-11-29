# Role-Based Access Control (RBAC) API

This project implements a **Role-Based Access Control (RBAC)** system using **Node.js**, **Express**, and **MongoDB**. It is designed to manage users, roles, and permissions efficiently, ensuring secure and role-specific access to resources.

---

## Key Features

1. **Authentication**:
   - Secure login and registration using hashed passwords with bcrypt.
   - JSON Web Tokens (JWT) for session management.

2. **Authorization**:
   - Fine-grained access control based on roles and permissions.
   - Middleware for verifying roles and permissions dynamically.

3. **Role Management**:
   - Assign roles (Admin, Manager, User) during user creation.
   - Allow Admins to change any user's role.
   - Managers can change their role to User and promote Users to Manager.

4. **Permission Management**:
   - Admins can grant/revoke permissions (Read, Write, Update, Delete) for any user or Manager.
   - Managers can manage permissions for Users (except Delete unless granted by Admin).
   - Users have default Read and Write permissions but can be granted or revoked permissions by Managers or Admins.

5. **Account Management**:
   - Users, Managers, and Admins can delete their own accounts.
   - Admins can delete any account, and Managers can delete User accounts.

6. **Dynamic Role and Permission Middleware**:
   - Role-based middleware dynamically enforces access control for routes.

---

## Roles and Permissions

| **Role**   | **Default Permissions**                   | **Capabilities**                                                                          |
|------------|-------------------------------------------|------------------------------------------------------------------------------------------|
| **Admin**  | Read, Write, Update, Delete               | - Full access to all resources<br>- Grant/revoke permissions for anyone<br>- Change roles for anyone<br>- Delete any account |
| **Manager**| Read, Write, Update                       | - Manage User permissions (except Delete unless granted by Admin)<br>- Change own role to User or promote Users to Manager<br>- Delete User accounts |
| **User**   | Read, Write                               | - Perform actions based on granted permissions<br>- Delete own account                   |

---

## Project Structure

```plaintext
project/
├── controllers/
│   ├── authController.js           # Handles user authentication (register, login, logout)
│   ├── permissionController.js     # Manages permission assignments and revocations
│   ├── roleController.js           # Manages role assignments and permissions
│   └── userController.js           # Manages user operations (access, permissions)
├── middlewares/
│   ├── authMiddleware.js           # Verifies JWT tokens and authenticates users
│   ├── rbacMiddleware.js           # Role-based access control checks (Admin, Manager, User)
├── models/
│   ├── User.js                     # User data, roles, and permissions schema
│   ├── Role.js                     # Role definitions and associated permissions
│   └── Permission.js               # Optional: Separate permissions schema
├── routes/
│   ├── authRoutes.js               # Authentication routes
│   ├── permissionRoutes.js         # Permission management routes (assign, revoke)
│   ├── roleRoutes.js               # Role management routes (create, assign)
│   ├── userRoutes.js               # User management routes (view, update, permission assignment)
├── utils/
│   ├── generateToken.js            # JWT token generation and verification utility
├── server.js                       # Main entry point (server configuration)
└── package.json                    # Project dependencies





API Endpoints

Authentication Routes (/auth)

Method	Endpoint	          Description	            Access
POST	/auth/register	   Register a new user	        Public
POST	/auth/login	   Login and get a JWT token	    Public
POST	/auth/logout	Logout user (invalidate token)	Logged-in users




User Routes (/users)
Method	               Endpoint             	Description	Access
GET	/users	       Get all users	            Admin, Manager
GET	/users/:id	   Get a single user's details	Admin, Manager, Self
PUT	/users/:id	   Update user details	        Admin, Manager, Self
DELETE	/users/:id	Delete a user	            Admin, Manager, Self




Role Routes (/roles)
Method           	Endpoint            	Description	Access
POST /roles/assign	Assign a role to a user	Admin
PUT	/roles/change	Change a user's role	Admin, Manager (Limited)


Permission Routes (/permissions)
Method	                           Endpoint	                Description	Access
POST/permissions/grant   	Grant permissions to a user 	Admin, Manager (Limited)
DELETE/permissions/revoke	Revoke permissions from a user	Admin, Manager (Limited)



Setup Instructions
Clone the repository:

git clone https://github.com/your-repo-name/rbac-api.git
cd rbac-api
Install dependencies:

npm install
Set up environment variables: Create a .env file in the root directory and add the following:

npm start
Test the API: Use Postman or any REST client to test the endpoints listed above.

Insights and Recommendations
Scalability:

The system can be extended by adding more roles and permissions.
Fine-grained permissions for specific resources can be added.
Security:

Use HTTPS in production for secure communication.
Rotate the JWT_SECRET periodically and implement token expiration.
Error Handling:

Comprehensive error handling is implemented with appropriate HTTP status codes.
Future Enhancements:

Integrate email notifications for role or permission changes.
Implement multi-factor authentication (MFA) for increased security.
Add activity logging for admin and manager actions.


Conclusion
This project demonstrates a robust Role-Based Access Control (RBAC) system suitable for applications requiring hierarchical user management. The clear separation of roles and permissions ensures scalability and maintainability, while JWT-based authentication provides secure access control.
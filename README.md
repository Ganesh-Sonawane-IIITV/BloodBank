# BloodBank Application

The BloodBank application is a simple implementation of authentication and user management using **JWT (JSON Web Token)**. This application does not currently include specific functionalities for blood bank operations, but it sets up the groundwork for a secure and scalable backend using **Node.js**, **Express**, **MongoDB**, and **React**.

---

## File Structure

BloodBank
|-- client
    |-- .gitignore
    |-- package-lock.json
    |-- package.json
    |-- public
        |-- index.html
        |-- manifest.json
        |-- robots.txt
    |-- README.md
    |-- src
        |-- apicalls
            |-- index.js
            |-- inventory.js
            |-- users.js
        |-- App.js
        |-- components
            |-- ProtectedPages.js
            |-- Spinner.js
        |-- index.css
        |-- index.js
        |-- pages
            |-- Home
                |-- index.js
            |-- Login
                |-- index.js
                |-- Register
                    |-- index.js
                    |-- OrgHospitalForm.js
            |-- Profile
                |-- index.js
                |-- Inventory
                    |-- index.js
                    |-- InventoryForm.js
        |-- redux
            |-- loaderSlice.js
            |-- store.js
            |-- userSlice.js
        |-- reportWebVitals.js
        |-- setupTests.js
        |-- utils
            |-- helpers.js
    |-- tailwind.config.js
|-- filestructure.py
|-- nodemon.json
|-- package-lock.json
|-- package.json
|-- server
    |-- .env
    |-- config
        |-- dbconfig.js
    |-- middlewares
        |-- authMiddleware.js
    |-- models
        |-- inventoryModal.js
        |-- UserModel.js
    |-- routes
        |-- inventoryRoutes.js
        |-- UsersRoute.js
    |-- server.js

## Database Information

### Inventory Collection

- **inventoryType**: Indicates the type of inventory entry.
  - Type: `String`
  - Required: `true`
  - Values: `['in', 'out']`

- **bloodGroup**: The blood group for the inventory record.
  - Type: `String`
  - Required: `true`

- **quantity**: The quantity of blood in units.
  - Type: `Number`
  - Required: `true`

- **email**: Email address associated with the inventory record.
  - Type: `String`
  - Required: `true`

- **organization**: Reference to the organization managing the inventory.
  - Type: `ObjectId`
  - References: `organizations` collection
  - Required: `true`

- **hospital**: Reference to the hospital using the inventory.
  - Type: `ObjectId`
  - References: `users` collection
  - Required: Only when `inventoryType` is `'out'`

- **donor**: Reference to the donor providing the inventory.
  - Type: `ObjectId`
  - References: `users` collection
  - Required: Only when `inventoryType` is `'in'`

- **Timestamps**: Records the `createdAt` and `updatedAt` fields automatically.

---

### User Collection

- **userType**: The type of user.
  - Type: `String`
  - Required: `true`
  - Values: `['donor', 'organization', 'hospital', 'admin']`

- **name**: Full name of the user.
  - Type: `String`
  - Required: For `donor` and `admin` users.

- **hospitalName**: Name of the hospital (if userType is `hospital`).
  - Type: `String`
  - Required: Only when `userType` is `hospital`.

- **organizationName**: Name of the organization (if userType is `organization`).
  - Type: `String`
  - Required: Only when `userType` is `organization`.

- **website**: Website of the organization or hospital.
  - Type: `String`
  - Required: For `organization` and `hospital`.

- **address**: Address of the organization or hospital.
  - Type: `String`
  - Required: For `organization` and `hospital`.

- **email**: User's email address.
  - Type: `String`
  - Required: `true`
  - Unique: `true`

- **password**: User's password.
  - Type: `String`
  - Required: `true`

- **phone**: Contact number of the user.
  - Type: `String`
  - Required: `true`

# BloodBank Application

A Node.js and React-based application designed to demonstrate the use of JWT for authentication. Future enhancements aim to incorporate full blood bank functionality.

---

## Getting Started

### Prerequisites

To run this application, ensure you have the following installed:

- **Node.js** and **npm**
- A **MongoDB** instance (local or MongoDB Atlas)

---

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/BloodBank.git

2. **Install server dependencies**:
    ```bash
    npm install
3. **Navigate to the client folder**:
    ```bash
    cd client
4. **Install client dependencies**:
    ```bash
    npm install

### Running the application
1. **Configure the environment variables**:
    Create the enviornment variables 
    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```
2. **Start the server**
    ```bash
    npm start
3. **Start the client**
    ```
    cd client
    npm start
    ```
**The server will run on http://localhost:5000, and the client will run on http://localhost:3000.**

## Features

- **JWT Authentication**: Secure and scalable user authentication.
- **Role-Based Access Control**: Includes roles such as donor, organization, hospital, and admin.
- **Modular Codebase**: Organized file structure for efficient development and maintenance.
- **React Frontend**: Built using reusable components for easy UI/UX improvements.

---

## Future Work

1. **Add full blood bank functionality**:
   - Record and manage blood donations.
   - Maintain and update inventory for blood stocks.
   - Implement a search and request feature for blood.

2. **Enhance role-based access controls** for fine-grained user permissions.

3. **Improve frontend UI/UX** for a seamless user experience.

4. **Deploy the application** to cloud platforms like **Heroku** or **AWS**.

5. **Add comprehensive testing** for both the backend and frontend.

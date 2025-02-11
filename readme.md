# Account Verification

This project implements a user account verification system, providing a secure method for users to confirm their email addresses during the registration process.

## Features

- **User Registration**: Allows users to create an account with a unique email and password.
- **Email Verification**: Sends a verification link to the user's email address upon registration.
- **Account Activation**: Activates the user's account upon successful email verification.

## Project Structure

The project is divided into two main parts:

- **Frontend**: Handles the user interface and experience.
- **Backend**: Manages the server-side logic, including user authentication and email verification.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/BishalKushwar/account-verification.git
   cd account-verification
   ```

2. **Install Dependencies**:

   For the backend:

   ```bash
   cd backend
   npm install
   ```

   For the frontend:

   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

1. **Backend**:

   - Create a `.env` file in the `backend` directory with the following variables:

     ```env
     PORT=3000
     DATABASE_URL=your_database_url
     EMAIL_SERVICE=Mailtrap
     EMAIL_USER=your_email_address
     EMAIL_PASS=your_email_password
     ```

   - Replace `your_database_url`, `your_email_service_provider`, `your_email_address`, and `your_email_password` with your actual database connection string and email service credentials.

2. **Frontend**:

   - Update the API endpoint in the frontend configuration to match your backend URL.

### Running the Application

1. **Start the Backend Server**:

   ```bash
   cd backend
   npm start
   ```

2. **Start the Frontend Application**:

   ```bash
   cd ../frontend
   npm start
   ```

   The frontend should now be accessible at `http://localhost:3000`.

## Usage

1. **Register a New Account**:

   - Navigate to the registration page.
   - Fill in the required details and submit the form.

2. **Verify Email**:

   - Check your email inbox for a verification link.
   - Click the link to activate your account.

3. **Login**:

   - After verification, log in using your credentials.

## Technologies Used

- **Frontend**: [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [MongoDB](https://www.mongodb.com/)
- **Email Service**: [Nodemailer](https://nodemailer.com/)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- Thanks to the open-source community for the tools and resources that made this project possible.


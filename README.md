<div style="display: flex; justify-content: space-around;">

  <img src="https://github.com/user-attachments/assets/f447e70e-c0d7-44ee-b6bc-ee9a73af1e32" alt="Screenshot 2024-12-04 193405" width="270"/>

  <img src="https://github.com/user-attachments/assets/6c41e31d-b188-49c1-a307-629dc671d983" alt="Screenshot 2024-12-04 193455" width="250"/>

  <img src="https://github.com/user-attachments/assets/5221b1d5-685d-4ccb-8e58-a371d36d5dbd" alt="Screenshot 2024-12-04 193522" width="270"/>

</div>

# Banking system with Next.js & TypeScript

This project is a simple Next.js application integrated with Docker for easy deployment and management. It includes features like a form for adding bank accounts with validation and a backend connection for fetching and displaying account data.

## **Features**

- 🏦 Add bank accounts with validation (e.g., IBAN format).
- 📋 Fetch and display a list of bank accounts.
- 🔒 Built with Next.js and React Hook Form for efficient form handling.
- 🐳 Dockerized for seamless deployment.
- ⚡ Fully customizable and easy to extend.

---

## **Getting Started**

### **Prerequisites**

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org) (v18 or later recommended)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

### **Installation**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MooudMohammady/banking-system.git
   cd banking-system

   ```

2. **Install dependencies**:

```bash
npm install --force
```

3. **Set up environment variables**: Create a `.env` file in the root directory and add the necessary environment variables:

```env
DATABASE_URL=your-postgresql-database-url
```

---

### Running Locally

1. **Development server**: Start the Next.js development server:

```bash
npm run dev
```

2. **Access the application**: Open your browser and visit: http://localhost:3000

### Using Docker

1. **Build the Docker image**:

```bash
docker build -t banking-system .
```

2. **Run the Docker container**:

```bash
docker run -p 3000:3000 banking-system
```

3. **Access the application**: Open your browser and visit: http://localhost:3000

#### ⚠ Running Only the Database Service with Docker Compose

**If you want** to run only the PostgreSQL database using Docker Compose, use the following command:

```bash
docker-compose up postgres
```

This will start only the `postgres` service defined in docker-compose.yml file. Ensure that your .env file contains the correct `DATABASE_URL` pointing to this database instance.

---

### Project Structure

```plaintext
banking-system/
├── public # Public assets
├── src/
│ ├── actions/ # API actions for data fetching and mutations
│ ├── app/ # Next.js pages
│ ├── components/ # Shared UI components
│ │ ├── ui/ # Reusable UI elements (Button, Input, etc.)
│ ├── lib/ # additional features
├── docker-compose.yml # Docker configuration for postgres DB
├── dockerfile # Docker configuration
├── README.md # Project documentation
├── .env # Environment variables (not exist by default)
├── package.json # Project dependencies and scripts
└── tsconfig.json # TypeScript configuration
```

---

### Scripts

- If this is the first time you run the project, be sure to execute this command first:

```bash
npm run prisma:prepare
```

- Enter this command if you need sample information:

```bash
npm run prisma:seed
```

- **Start development server**:

```bash
npm run dev
```

- **Build the application**:

```bash
npm run build
```

- **Run production server**:

```bash
npm run start
```

---

### Form Validation

The project uses `zod` and `react-hook-form` for validation. The bank account form includes:

- **Bank Name**: Minimum 3 characters.
- **IBAN**: Matches the standard IBAN format.
- **Balance**: Valid numeric value.

---

### **Design System**

This project utilizes **TailwindCSS** and **ShadCN** to build a scalable and reusable design system.

#### **TailwindCSS**

- A utility-first CSS framework for rapid UI development.
- Provides a consistent and highly customizable styling system.
- Enables responsive design and theming with ease.

#### **ShadCN**

- A collection of accessible and customizable UI components built with Radix and TailwindCSS.
- Ensures consistent design language across the project.
- Simplifies the development of reusable and composable components.

---

### License

This project is licensed under the MIT License.

---

### Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature-name"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

#### Suggested Tasks for Contributors

If you're looking for specific tasks to contribute, here are some areas where help is needed:

- **Build the Deposit Page and Logic**: Design and implement the user interface and backend logic for depositing funds.
- **Build the Withdraw Page and Logic**: Create the page and functionality for withdrawing funds from accounts.
- **Write Automated Tests**: Use tools like **Cypress** or **Jest** to write robust test cases for the application.
- **Bug Fixes and Enhancements**: Complete pending details, optimize existing features, and resolve reported bugs.
- **Add Pagination and Filters**: Implement pagination and filtering for the transaction history page to improve usability.
- **Other Outstanding Tasks**: Review the issue tracker for other tasks that need attention or discuss with the team for additional ideas.

Your contributions make a difference!

---

### Contact

For any questions or issues, please feel free to reach out:

- **Email**: mooudmohammadi@gmail.com
- **GitHub**: https://github.com/MooudMohammady

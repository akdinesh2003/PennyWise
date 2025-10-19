# PennyWise 🪙

**Save Smart. Achieve Big.**

PennyWise is a modern personal finance dashboard designed to help you manage your money, track your spending, and achieve your savings goals with the power of AI-driven insights. This application provides a clean, intuitive interface to give you a clear overview of your financial health.

## ✨ Features

-   **Dashboard Overview**: A comprehensive view of your total balance, savings, investments, and returns.
-   **Send & Receive Money**: Easily send funds to others and receive money via a personal QR code.
-   **Savings Goals**: Create and track multiple savings goals with visual progress bars.
-   **Investment Tracking**: Invest in different asset classes like Stocks, Crypto, and Mutual Funds and see expected returns.
-   **Transaction History**: A clear log of all your financial activities.
-   **AI-Powered Insights**: Get personalized savings suggestions by telling the AI about your spending habits and financial goals.
-   **Customizable Settings**: Includes theme toggling (light/dark mode), notification preferences, and privacy controls.
-   **Authentication**: Secure sign-up and login functionality.

## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
-   **Generative AI**: [Firebase Genkit](https://firebase.google.com/docs/genkit) with Google Gemini
-   **Backend & Database**: [Firebase](https://firebase.google.com/) (Authentication & Firestore)
-   **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

Follow these steps to get the PennyWise application running on your local machine.

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn

### 1. Environment Variables

This project uses Firebase Genkit with the Google Gemini model for its AI capabilities. You need to provide your own API key for these features to work.

1.  Create a `.env` file in the root of the project.
2.  Add your Google AI API key to the file:

    ```bash
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```

    > **Important**: Without this key, the AI Insights feature will not work. You can get a key from the [Google AI Studio](https://aistudio.google.com/app/apikey).

### 2. Installation

Clone the repository and install the dependencies.

```bash
# Clone the repository
git clone https://github.com/your-username/pennywise.git

# Navigate to the project directory
cd pennywise

# Install dependencies
npm install
```

### 3. Running the Application

To run the application in development mode, use the following command. This will start the Next.js development server.

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).

## ✍️ Author

-   **Name**: AK DINESH
-   **Website**: https://github.com/akdinesh2003

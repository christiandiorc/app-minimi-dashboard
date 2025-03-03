# OTA-Minimi Dashboard
Coding Challenge: Data Discovery Dashboard
This is a Next.js project template. It provides a simple starting point for building React applications using the Next.js framework.

## Table of Contents

- [Installation Guide](#installation-guide)
- [About the Application](#about-the-application)

## Installation Guide

To get started with this project, follow these steps:

### 1. Clone the Repository

Clone this repository to your local machine using Git:

```bash
git clone https://github.com/your-username/your-repo-name.git
```

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies with npm:

```bash
cd your-repo-name
npm install
```

### 3. Running the Application

Once you have installed the dependencies, you can run the application in development mode.

```bash
npm run dev
```

### 4. Access the Application

After the development server starts, open your browser and navigate to:

```arduino
http://localhost:3000
```

## About the Application

The application includes a **Dashboard page**, which fulfills the base requirements. However, several additional features have been implemented to enhance the **dashboard experience** and provide a more dynamic, interactive interface. These features were not part of the original scope but were added to improve the overall look and feel of the dashboard.

One notable addition is the **data grid component**, where additional information from a dataset is displayed. Users can access this information by clicking the "View Hidden Columns" button, which reveals non-realistic data meant for demonstration purposes.

Below is a list of the **Additional Features** that were incorporated to enrich the dashboard experience.

- **Dashboard Metrics**
- **Wildcard Search Filter**
- **Add New Button** (Clicking it displays a Feedback toast)
- **Export Button** (Clicking it displays a Feedback toast)
- **Interactive and Rich Grid Component** from (AG-GRID)
  - Ag Grid table includes:
    - Column Sorting
    - Column Resizing
    - Column Filter
    - Checkbox Row Selection
    - Pagination

Bonus Points

- <span style="color: green;">✅</span> **1. Handle error states (e.g., what happens if the API fails to load data)** .

  - Errors handled through the reusable `Toast` component with respective error message and color.
  - Try to tweak the api call and attempt to make a failed api call. Error message should appear.

- <span style="color: green;">✅</span> **2. Add a loading indicator while fetching the data** .

  - **_Loader_** Component used to indicate a loading state for the Datatable component.
  - **_Skeleton_** Component used to indicate a loading state for the mutable texts.

- <span style="color: green;">❌</span> **3. Implement tests (unit tests or integration tests) using Jest or React Testing Library.**

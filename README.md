# 🤖 AI Data Analyst

### Ask questions. Understand your data. Get insights instantly.

AI Data Analyst is an AI-powered data analysis application that allows users to interact with their datasets using *natural language*.

Instead of manually writing SQL queries or Python code, users can simply upload their data and ask questions such as:

> "How many orders are there?"

> "Which product has the highest sales?"

> "What is the total sales amount?"

The application processes the data, understands the user's question, performs the required analysis, and returns a clear, meaningful answer.

---

## ✨ Why AI Data Analyst?

Traditional data analysis often requires knowledge of SQL, Python, or other analytical tools.

*AI Data Analyst simplifies this process.*

It provides a natural-language interface between the user and their data, making data analysis more accessible even for users who are not familiar with programming or SQL.

---

## 🚀 Key Features

- 📂 *Data Upload*  
  Upload datasets directly through the web interface.

- 💬 *Natural Language Queries*  
  Ask questions about your data in simple English.

- 🤖 *AI-Powered Analysis*  
  The AI understands the user's question and determines the required analysis.

- 📊 *Data Insights*  
  Get meaningful answers based on the uploaded dataset.

- ⚡ *FastAPI Backend*  
  A lightweight and efficient backend handles file processing and AI requests.

- 🎨 *Interactive Web Interface*  
  A simple and user-friendly frontend makes the application easy to use.

---

## 🧠 How It Works

```text
                USER
                  │
                  ▼
          Upload Dataset
                  │
                  ▼
          ┌───────────────┐
          │   FastAPI     │
          │    Backend    │
          └───────┬───────┘
                  │
                  ▼
            Data Processing
                  │
                  ▼
            AI Data Analysis
                  │
                  ▼
          Generate Insight
                  │
                  ▼
               USER

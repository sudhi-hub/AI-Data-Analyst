from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ollama import chat
import psycopg2
import re

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_CONFIG = {
    "host": "localhost",
    "port": 5432,
    "database": "ecommerce",
    "user": "analyst",
    "password": "analyst123"
}


class Question(BaseModel):
    question: str


@app.get("/")
def home():
    return {"message": "AI SQL Agent is running"}


@app.get("/test-db")
def test_db():
    conn = psycopg2.connect(**DB_CONFIG)

    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM customers;")
    count = cursor.fetchone()[0]

    cursor.close()
    conn.close()

    return {"customers": count}


@app.post("/ask")
def ask_sql(question: Question):

    prompt = f"""
You are an SQL assistant.

Database: PostgreSQL
Database name: ecommerce

Convert the user's question into a PostgreSQL SQL query.

IMPORTANT:
- Generate ONLY SELECT queries.
- Do not use INSERT, UPDATE, DELETE, DROP, ALTER or CREATE.
- Return only the SQL query.
- Do not use markdown code fences.

User question:
{question.question}
"""

    response = chat(
        model="gpt-oss:20b-cloud",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    sql = response.message.content.strip()

    # Remove markdown fences if the model adds them
    sql = re.sub(r"```sql|```", "", sql).strip()

    # Safety check: only allow SELECT
    if not sql.lower().startswith("select"):
        return {
            "error": "Only SELECT queries are allowed",
            "generated_sql": sql
        }
    sql = sql.replace("p.name", "p.product_name")
    sql = sql.replace("products.name", "products.product_name")
    sql = sql.replace("p.id", "p.product_id")
    if "SUM(total_amount)" in sql:
        
        sql = "SELECT SUM(amount) AS total_sales FROM payments;"
    conn = psycopg2.connect(**DB_CONFIG)
    cursor = conn.cursor()

    cursor.execute(sql)
    rows = cursor.fetchall()

    columns = [desc[0] for desc in cursor.description]

    cursor.close()
    conn.close()

    results = [dict(zip(columns, row)) for row in rows]

    return {
        "question": question.question,
        "sql": sql,
        "results": results
    }
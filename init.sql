-- ============================================
-- AI SQL DATA ANALYST AGENT
-- E-COMMERCE SALES DATABASE
-- ============================================

DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;

-- ============================================
-- 1. CUSTOMERS TABLE
-- ============================================

CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    city VARCHAR(100),
    signup_date DATE
);

-- ============================================
-- 2. PRODUCTS TABLE
-- ============================================

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(150) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER
);


-- ============================================
-- 3. ORDERS TABLE
-- ============================================

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    order_date DATE NOT NULL,
    status VARCHAR(50),

    FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
);


-- ============================================
-- 4. ORDER ITEMS TABLE
-- ============================================

CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (order_id)
        REFERENCES orders(order_id),

    FOREIGN KEY (product_id)
        REFERENCES products(product_id)
);


-- ============================================
-- 5. PAYMENTS TABLE
-- ============================================

CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    payment_date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50),
    payment_status VARCHAR(50),

    FOREIGN KEY (order_id)
        REFERENCES orders(order_id)
);


-- ============================================
-- CUSTOMERS DATA
-- ============================================

INSERT INTO customers
(customer_name, email, city, signup_date)
VALUES
('Rahul Sharma', 'rahul@example.com', 'Chennai', '2025-01-15'),
('Priya Kumar', 'priya@example.com', 'Bangalore', '2025-02-10'),
('Arun Raj', 'arun@example.com', 'Coimbatore', '2025-02-22'),
('Divya Singh', 'divya@example.com', 'Mumbai', '2025-03-05'),
('Karthik M', 'karthik@example.com', 'Chennai', '2025-03-18'),
('Sneha Patel', 'sneha@example.com', 'Hyderabad', '2025-04-02'),
('Vijay Kumar', 'vijay@example.com', 'Bangalore', '2025-04-20'),
('Anu Priya', 'anu@example.com', 'Mumbai', '2025-05-11'),
('Mohul', 'mohul@example.com', 'Delhi', '2025-06-01'),
('Meena S', 'meena@example.com', 'Pune', '2025-06-15');


-- ============================================
-- PRODUCTS DATA
-- ============================================

INSERT INTO products
(product_name, category, price, stock_quantity)
VALUES
('Laptop Pro 15', 'Electronics', 75000.00, 25),
('Wireless Headphones', 'Electronics', 5000.00, 100),
('Smartphone X', 'Electronics', 45000.00, 40),
('Office Chair', 'Furniture', 12000.00, 30),
('Mechanical Keyboard', 'Accessories', 4500.00, 80),
('Wireless Mouse', 'Accessories', 2000.00, 120),
('Monitor 24 Inch', 'Electronics', 15000.00, 50),
('Standing Desk', 'Furniture', 22000.00, 20),
('USB-C Hub', 'Accessories', 3000.00, 75),
('Tablet Pro', 'Electronics', 35000.00, 35);


-- ============================================
-- ORDERS DATA
-- ============================================

INSERT INTO orders
(customer_id, order_date, status)
VALUES
(1, '2026-01-05', 'Completed'),
(2, '2026-01-12', 'Completed'),
(3, '2026-01-20', 'Completed'),
(4, '2026-02-03', 'Completed'),
(5, '2026-02-15', 'Completed'),
(1, '2026-02-25', 'Completed'),
(6, '2026-03-04', 'Completed'),
(7, '2026-03-12', 'Completed'),
(8, '2026-03-21', 'Completed'),
(9, '2026-04-02', 'Completed'),
(10, '2026-04-15', 'Completed'),
(2, '2026-04-25', 'Completed'),
(3, '2026-05-05', 'Completed'),
(4, '2026-05-18', 'Completed'),
(5, '2026-06-01', 'Completed'),
(7, '2026-06-12', 'Completed'),
(8, '2026-07-03', 'Completed'),
(9, '2026-07-15', 'Completed'),
(1, '2026-08-02', 'Completed'),
(6, '2026-08-10', 'Completed');


-- ============================================
-- ORDER ITEMS DATA
-- ============================================

INSERT INTO order_items
(order_id, product_id, quantity, unit_price)
VALUES
(1, 1, 1, 75000),
(1, 6, 2, 2000),

(2, 3, 1, 45000),
(2, 2, 1, 5000),

(3, 4, 2, 12000),
(3, 6, 1, 2000),

(4, 1, 1, 75000),
(4, 5, 1, 4500),

(5, 7, 2, 15000),
(5, 9, 1, 3000),

(6, 10, 1, 35000),
(6, 2, 2, 5000),

(7, 8, 1, 22000),
(7, 6, 2, 2000),

(8, 1, 1, 75000),
(8, 7, 1, 15000),

(9, 3, 2, 45000),

(10, 4, 1, 12000),
(10, 5, 2, 4500),

(11, 10, 1, 35000),
(11, 9, 2, 3000),

(12, 1, 1, 75000),
(12, 2, 1, 5000),

(13, 7, 2, 15000),
(13, 6, 2, 2000),

(14, 8, 1, 22000),
(14, 4, 1, 12000),

(15, 3, 1, 45000),
(15, 5, 1, 4500),

(16, 1, 1, 75000),
(16, 9, 1, 3000),

(17, 10, 2, 35000),
(17, 2, 1, 5000),

(18, 7, 1, 15000),
(18, 6, 3, 2000),

(19, 1, 1, 75000),
(19, 5, 1, 4500),

(20, 3, 1, 45000),
(20, 9, 2, 3000);


-- ============================================
-- PAYMENTS DATA
-- ============================================

INSERT INTO payments
(order_id, payment_date, amount, payment_method, payment_status)
VALUES
(1, '2026-01-05', 79000, 'UPI', 'Paid'),
(2, '2026-01-12', 50000, 'Credit Card', 'Paid'),
(3, '2026-01-20', 26000, 'UPI', 'Paid'),
(4, '2026-02-03', 79500, 'Credit Card', 'Paid'),
(5, '2026-02-15', 33000, 'Debit Card', 'Paid'),
(6, '2026-02-25', 45000, 'UPI', 'Paid'),
(7, '2026-03-04', 26000, 'UPI', 'Paid'),
(8, '2026-03-12', 90000, 'Credit Card', 'Paid'),
(9, '2026-03-21', 90000, 'Credit Card', 'Paid'),
(10, '2026-04-02', 21000, 'UPI', 'Paid'),
(11, '2026-04-15', 41000, 'Debit Card', 'Paid'),
(12, '2026-04-25', 80000, 'Credit Card', 'Paid'),
(13, '2026-05-05', 34000, 'UPI', 'Paid'),
(14, '2026-05-18', 34000, 'UPI', 'Paid'),
(15, '2026-06-01', 49500, 'Credit Card', 'Paid'),
(16, '2026-06-12', 78000, 'Credit Card', 'Paid'),
(17, '2026-07-03', 75000, 'UPI', 'Paid'),
(18, '2026-07-15', 21000, 'Debit Card', 'Paid'),
(19, '2026-08-02', 79500, 'Credit Card', 'Paid'),
(20, '2026-08-10', 51000, 'UPI', 'Paid');
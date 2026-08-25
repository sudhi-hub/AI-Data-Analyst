// ============================================
// AI SQL DATA ANALYST
// ============================================

const API_URL = "http://127.0.0.1:8001";


// ============================================
// ELEMENTS
// ============================================

const questionInput =
    document.getElementById("question");

const askBtn =
    document.getElementById("askBtn");

const sqlResult =
    document.getElementById("sqlResult");

const copyBtn =
    document.getElementById("copyBtn");

const loading =
    document.getElementById("loading");

const resultBox =
    document.getElementById("resultBox");

const queryResultsBox =
    document.getElementById("queryResultsBox");


// ============================================
// NAVIGATION
// ============================================

const navItems =
    document.querySelectorAll(".nav-item");

const pageSections =
    document.querySelectorAll(".page-section");


navItems.forEach(item => {

    item.addEventListener("click", function () {

        const sectionId =
            this.dataset.section;


        // Remove active from all nav items

        navItems.forEach(nav => {

            nav.classList.remove("active");

        });


        // Activate clicked item

        this.classList.add("active");


        // Hide all sections

        pageSections.forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


        // Show selected section

        const selectedSection =
            document.getElementById(sectionId);


        if (selectedSection) {

            selectedSection.classList.add(
                "active-section"
            );

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    });

});


// ============================================
// ASK AI
// ============================================

askBtn.addEventListener(
    "click",
    askQuestion
);


// ============================================
// ENTER KEY
// ============================================

questionInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            askQuestion();

        }

    }
);


// ============================================
// EXAMPLE QUESTIONS
// ============================================

document
    .querySelectorAll("[data-question]")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                questionInput.value =
                    this.dataset.question;

                askQuestion();

            }
        );

    });


// ============================================
// ASK QUESTION
// ============================================

async function askQuestion() {

    const question =
        questionInput.value.trim();


    if (!question) {

        alert("Please enter a question.");

        questionInput.focus();

        return;

    }


    // Show loading

    loading.classList.remove(
        "loading-hidden"
    );

    askBtn.disabled = true;

    askBtn.textContent =
        "Thinking...";


    sqlResult.textContent =
        "Generating SQL...";


    try {

        const response =
            await fetch(
                `${API_URL}/ask`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        question: question
                    })

                }
            );


        if (!response.ok) {

            throw new Error(
                `Backend error: ${response.status}`
            );

        }


        const data =
            await response.json();


        console.log(
            "Backend response:",
            data
        );


        // ====================================
        // GENERATED SQL
        // ====================================

        if (data.sql) {

            sqlResult.textContent =
                data.sql;

        } else {

            sqlResult.textContent =
                "No SQL query generated.";

        }


        // ====================================
        // DISPLAY RESULT
        // ====================================

        displayResults(
            data.results
        );


        // ====================================
        // UPDATE QUERY RESULTS PAGE
        // ====================================

        updateQueryResultsPage(
            data.results
        );


        // ====================================
        // UPDATE DASHBOARD
        // ====================================

        updateDashboard(
            question,
            data.results
        );


        // ====================================
        // OPEN QUERY RESULTS
        // ====================================

        showSection(
            "queryResultsSection"
        );


    } catch (error) {

        console.error(
            "Error:",
            error
        );


        sqlResult.textContent =
            "Unable to generate SQL.";


        if (resultBox) {

            resultBox.innerHTML = `

                <div class="error">

                    ❌ Cannot connect to backend.

                    <br><br>

                    ${error.message}

                </div>

            `;

        }


        if (queryResultsBox) {

            queryResultsBox.innerHTML = `

                <div class="error">

                    ❌ Unable to load query result.

                    <br><br>

                    ${error.message}

                </div>

            `;

        }

    } finally {

        loading.classList.add(
            "loading-hidden"
        );

        askBtn.disabled = false;

        askBtn.textContent =
            "Ask AI →";

    }

}


// ============================================
// DISPLAY RESULTS IN ASK DATABASE
// ============================================

function displayResults(results) {

    if (!resultBox) {

        return;

    }


    if (
        !results ||
        results.length === 0
    ) {

        resultBox.innerHTML = `

            <div class="empty-result">

                📊 No data found.

            </div>

        `;

        return;

    }


    resultBox.innerHTML =
        createTableHTML(results);

}


// ============================================
// QUERY RESULTS PAGE
// ============================================

function updateQueryResultsPage(results) {

    if (!queryResultsBox) {

        return;

    }


    if (
        !results ||
        results.length === 0
    ) {

        queryResultsBox.innerHTML = `

            <div class="empty-result">

                📊 No data found.

            </div>

        `;

        return;

    }


    queryResultsBox.innerHTML =
        createTableHTML(results);

}


// ============================================
// CREATE TABLE
// ============================================

function createTableHTML(results) {

    const columns =
        Object.keys(results[0]);


    let html = `

        <div class="result-table-wrapper">

            <table class="result-table">

                <thead>

                    <tr>

    `;


    columns.forEach(column => {

        html += `
            <th>${formatColumnName(column)}</th>
        `;

    });


    html += `

                    </tr>

                </thead>

                <tbody>

    `;


    results.forEach(row => {

        html += `<tr>`;


        columns.forEach(column => {

            let value =
                row[column];


            if (
                value === null ||
                value === undefined
            ) {

                value = "-";

            }


            html += `
                <td>${value}</td>
            `;

        });


        html += `</tr>`;

    });


    html += `

                </tbody>

            </table>

        </div>

    `;


    return html;

}


// ============================================
// FORMAT COLUMN NAMES
// ============================================

function formatColumnName(column) {

    return column
        .replaceAll("_", " ")
        .replace(/\b\w/g, char =>
            char.toUpperCase()
        );

}


// ============================================
// UPDATE DASHBOARD CARDS
// ============================================

function updateDashboard(
    question,
    results
) {

    if (
        !results ||
        results.length === 0
    ) {

        return;

    }


    const q =
        question.toLowerCase();


    const first =
        results[0];


    // ====================================
    // CUSTOMERS
    // ====================================

    if (
        q.includes("customer") &&
        first.total_customers !== undefined
    ) {

        const customerValue =
            document.getElementById(
                "customersValue"
            );

        if (customerValue) {

            customerValue.textContent =
                first.total_customers;

        }

    }


    // ====================================
    // ORDERS
    // ====================================

    if (
        q.includes("order") &&
        first.total_orders !== undefined
    ) {

        const orderValue =
            document.getElementById(
                "ordersValue"
            );

        if (orderValue) {

            orderValue.textContent =
                first.total_orders;

        }

    }


    // ====================================
    // SALES
    // ====================================

    if (
        q.includes("sales") ||
        q.includes("revenue")
    ) {

        let value =
            first.total_sales ||
            first.total_sales_amount ||
            first.total_revenue;


        if (value !== undefined) {

            const number =
                Number(value);


            if (!isNaN(number)) {

                const salesValue =
                    document.getElementById(
                        "salesValue"
                    );


                if (salesValue) {

                    salesValue.textContent =
                        "₹" +
                        number.toLocaleString(
                            "en-IN"
                        );

                }

            }

        }

    }


    // ====================================
    // TOP PRODUCT
    // ====================================

    if (
        q.includes("product")
    ) {

        if (
            first.product_name
        ) {

            const topProduct =
                document.getElementById(
                    "topProductValue"
                );


            if (topProduct) {

                topProduct.textContent =
                    first.product_name;

            }

        }

    }

}


// ============================================
// COPY SQL
// ============================================

copyBtn.addEventListener(
    "click",
    async function () {

        const sql =
            sqlResult.textContent;


        if (
            !sql ||
            sql ===
            "Your SQL query will appear here..."
        ) {

            return;

        }


        try {

            await navigator
                .clipboard
                .writeText(sql);


            copyBtn.textContent =
                "Copied ✓";


            setTimeout(
                () => {

                    copyBtn.textContent =
                        "Copy";

                },
                1500
            );


        } catch (error) {

            console.error(
                "Copy failed:",
                error
            );

        }

    }
);


// ============================================
// SHOW SECTION
// ============================================

function showSection(sectionId) {

    pageSections.forEach(section => {

        section.classList.remove(
            "active-section"
        );

    });


    navItems.forEach(nav => {

        nav.classList.remove("active");

    });


    const section =
        document.getElementById(sectionId);


    if (section) {

        section.classList.add(
            "active-section"
        );

    }


    const activeNav =
        document.querySelector(
            `[data-section="${sectionId}"]`
        );


    if (activeNav) {

        activeNav.classList.add(
            "active"
        );

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ============================================
// INITIAL PAGE
// ============================================

showSection(
    "dashboardSection"
);
// DASHBOARD DATA

let activities = 0;
let contentTotal = 0;


// SECTION NAVIGATION

function showSection(sectionId) {

    let sections = document.querySelectorAll(".section");

    sections.forEach(function(section) {
        section.classList.add("hidden");
    });

    document.getElementById(sectionId).classList.remove("hidden");

    let links = document.querySelectorAll(".sidebar a");

    links.forEach(function(link) {
        link.classList.remove("active");
    });

    let clickedLink = document.querySelector(
        '.sidebar a[onclick="showSection(\'' + sectionId + '\')"]'
    );

    if (clickedLink) {
        clickedLink.classList.add("active");
    }

}


// UPDATE DASHBOARD

function updateDashboard() {

    document.getElementById("activityCount").innerText = activities;

    document.getElementById("contentCount").innerText = contentTotal;

    document.getElementById("taskCount").innerText = tasks.length;

}


// AI CHAT

function sendMessage() {

    let input = document.getElementById("chatInput");

    let message = input.value.trim();

    if (message === "") {
        alert("Please enter your question!");
        return;
    }

    let messages = document.getElementById("chatMessages");

    let userMessage = document.createElement("div");

    userMessage.className = "user-message";

    userMessage.innerText = message;

    messages.appendChild(userMessage);

    let response = getAIResponse(message);

    setTimeout(function() {

        let botMessage = document.createElement("div");

        botMessage.className = "bot-message";

        botMessage.innerText = response;

        messages.appendChild(botMessage);

        messages.scrollTop = messages.scrollHeight;

    }, 500);

    activities++;

    updateDashboard();

    input.value = "";

}


function getAIResponse(message) {

    message = message.toLowerCase();

    if (message.includes("marketing")) {

        return "To improve your marketing, focus on social media content, customer engagement, and consistent branding.";

    }

    else if (message.includes("sales")) {

        return "To increase sales, improve product presentation, offer excellent customer service, and understand customer needs.";

    }

    else if (message.includes("business idea")) {

        return "You can explore e-commerce, digital services, online education, and technology-based businesses.";

    }

    else if (message.includes("customer")) {

        return "Always respond professionally to customers, understand their problems, and provide clear solutions.";

    }

    else if (message.includes("website")) {

        return "A professional business website should include a homepage, products or services, contact information, and clear calls to action.";

    }

    else {

        return "I am Maaz AI Business Assistant. I can help with marketing, sales, customer support, business ideas, and website planning. Please ask a related question.";

    }

}


// CONTENT GENERATOR

function generateContent() {

    let business = document.getElementById("businessName").value;

    let type = document.getElementById("contentType").value;

    let topic = document.getElementById("contentTopic").value;

    let result = document.getElementById("contentResult");

    if (business === "" || topic === "") {

        alert("Please fill all fields!");

        return;

    }

    let content = "";

    if (type === "social") {

        content = "🚀 Discover something amazing!\n\n" +
        "Introducing " + topic + " by " + business + ".\n\n" +
        "Quality, reliability, and customer satisfaction are our priorities.\n\n" +
        "Contact us today to learn more!\n\n#Business #Quality #Shopping";

    }

    else if (type === "product") {

        content = "Product: " + topic + "\n\n" +
        "Welcome to " + business + "!\n\n" +
        "Explore our " + topic + " and discover a product designed with your needs in mind.\n\n" +
        "Contact us for more information.";

    }

    else {

        content = "SPECIAL BUSINESS OFFER!\n\n" +
        business + " brings you " + topic + ".\n\n" +
        "Discover quality and value in one place.\n\n" +
        "Contact us today and explore our services!";

    }

    result.innerText = content;

    contentTotal++;

    activities++;

    updateDashboard();

}


// CUSTOMER SUPPORT

function generateSupport() {

    let name = document.getElementById("customerName").value;

    let question = document.getElementById("customerQuestion").value;

    let result = document.getElementById("supportResult");

    if (name === "" || question === "") {

        alert("Please fill all fields!");

        return;

    }

    let reply = "Hello " + name + ",\n\n" +
    "Thank you for contacting our business.\n\n" +
    "We have received your query:\n" +
    question + "\n\n" +
    "Our team will review your request and provide further assistance.\n\n" +
    "Thank you for choosing our services!\n\n" +
    "Best Regards,\nCustomer Support Team";

    result.innerText = reply;

    activities++;

    updateDashboard();

}


// BUSINESS IDEAS

function generateIdeas() {

    let category = document.getElementById("ideaCategory").value;

    let ideas = {

        Technology: [
            "AI Website Development Agency",
            "Online Software Solutions",
            "Mobile Application Development",
            "Digital Productivity Tools"
        ],

        "E-commerce": [
            "Organic Products Store",
            "Electronics Online Store",
            "Fashion Shopping Website",
            "Customized Gift Store"
        ],

        Education: [
            "Online Coding Academy",
            "Digital Learning Platform",
            "Student Assignment Portal",
            "Online Skills Training"
        ],

        "Digital Marketing": [
            "Social Media Management",
            "SEO Services Agency",
            "Content Creation Agency",
            "Digital Advertising Services"
        ]

    };

    let output = category + " Business Ideas:\n\n";

    ideas[category].forEach(function(idea, index) {

        output += (index + 1) + ". " + idea + "\n";

    });

    document.getElementById("ideasResult").innerText = output;

    activities++;

    updateDashboard();

}


// EMAIL GENERATOR

function generateEmail() {

    let recipient = document.getElementById("recipient").value;

    let purpose = document.getElementById("emailPurpose").value;

    let result = document.getElementById("emailResult");

    if (recipient === "" || purpose === "") {

        alert("Please fill all fields!");

        return;

    }

    let email = "Subject: " + purpose + "\n\n" +

    "Dear " + recipient + ",\n\n" +

    "I hope you are doing well.\n\n" +

    "I am writing to you regarding " + purpose + ".\n\n" +

    "Please let me know if you need any additional information.\n\n" +

    "Thank you for your time and consideration.\n\n" +

    "Best Regards,\nMaaz Coder";

    result.innerText = email;

    activities++;

    updateDashboard();

}


// TASK MANAGER

let tasks = JSON.parse(localStorage.getItem("businessTasks")) || [];


function saveTasks() {

    localStorage.setItem("businessTasks", JSON.stringify(tasks));

    updateDashboard();

}


function displayTasks() {

    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        let div = document.createElement("div");

        div.className = "task";

        let taskName = document.createElement("span");

        taskName.innerText = task;

        let button = document.createElement("button");

        button.innerText = "Delete";

        button.className = "delete-btn";

        button.onclick = function() {

            deleteTask(index);

        };

        div.appendChild(taskName);

        div.appendChild(button);

        taskList.appendChild(div);

    });

    updateDashboard();

}


function addTask() {

    let input = document.getElementById("taskInput");

    let task = input.value.trim();

    if (task === "") {

        alert("Please enter a task!");

        return;

    }

    tasks.push(task);

    input.value = "";

    saveTasks();

    displayTasks();

}


function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    displayTasks();

}


// INITIALIZE APP

displayTasks();

updateDashboard();
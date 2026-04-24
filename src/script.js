// --- Page-Specific Logic

//Uncomment this after making changes to navbar (it's memoized)
//sessionStorage.clear();

const pages = ["home", "about", "projects", "experience"];
const currentPage = findCurrentPage();
const SCROLL_AMOUNT = 300;
// Needs 'preview' suffix
const resumeViewLink =
	"https://drive.google.com/file/d/1gfWslz_L7FLRq0cZqmiqHNbCOOSe_ZX2/preview";

var projectContent = null; // Gets populated if we're on projects

/**
 * Main onLoad
 * - Handles generation of dynamuc objects
 */
window.onload = function () {
	generateNavbar();
	if (currentPage === 3) {
		injectResume();
	} else if (currentPage === 2) {
		populateProjects();
	}
};

function findCurrentPage() {
	var path = window.location.pathname;
	var page = path.split("/").pop();
	var pageName = page.split(".")[0];
	for (var i = 0; i < pages.length; i++) {
		if (pageName === pages[i]) {
			return i;
		}
	}
}

// --- Projects

// Dynamic Carousel
// Any objects in projects (Conforming to this structure) will be added to the carousel
const projects = [
	{
		title: "Hampage",
		imgSrc: "../assets/projects/Hampage.png",
		description:
			"My Senior Project from CSULB's Computer Science Program, Hampage is a 3d character action & platforming game starring a handsome Hamster. Featuring enemies, unique movement mechanics, and more!<br /><br />Build will be avaliable soon!",
		link: "https://drive.google.com/file/d/1tMD2DYDlRBcDSNCorgxRyoc85Nkqx5qk/preview",
		linkText: "Watch the Trailer!",
	},
	{
		title: "FoodVerse",
		imgSrc: "../assets/projects/FVThumb.png",
		description:
			"Snap Engineering Academy 2020 Hackathon Submission - Foodverse is a Web App that Uses Yelp API to make eating locally a social experience!<br /><br />EDIT: Site is currently down, check back soon!",
		link: "http://foodverse.herokuapp.com/",
		linkText: "Enter The FoodVerse!",
	},
	{
		title: "Turret Trouble",
		imgSrc: "../assets/projects/TurretTrouble.png",
		description:
			"CSULB VGDA 2019 'Best Gameplay' Winner - Turret Trouble is a Unity Game Engine project developed by myself with 3D art designed by Alexander Radchuk. Turret Trouble is an endless wave-based shooter defence game avaliable for download free for Windows and Mac!<br /><br />Check It Out:",
		link: "https://gio-epic123.itch.io/turret-trouble",
		linkText: "To My itch.io Page!",
	},
	// {
	// 	title: "Text",
	// 	imgSrc: "../assets/profilePic.jpg",
	// 	description: "Project Details Here",
	// 	link: "https://gioepic123.github.io/",
	// 	linkText: "To Website!",
	// },
];

function populateProjects() {
	populateProjectContent();
	const rightArrow = document.querySelector(".arrow.right");
	var firstProjectDone = false;
	projects.forEach((project) => {
		const projectBox = document.createElement("div");
		projectBox.className = "project-box";
		if (!firstProjectDone) {
			firstProjectDone = true;
			projectBox.id = "first-project";
		}

		projectBox.innerHTML = `
            <h3 class="montserrat-subheading">${project.title}</h3>
            <div class="image-container">
                <img src="${project.imgSrc}" />
            </div>
            <p class="montserrat-subheading">${project.description}</p>
            <a class="project-link" href="${project.link}" target="_blank" rel="noopener noreferrer">${project.linkText}</a>
        `;

		projectContent.insertBefore(projectBox, rightArrow);
	});
}

// Carousel Scrolling for Projects Page
if (currentPage === 2) {
	populateProjectContent();

	// Get the arrow elements
	var leftArrow = document.querySelector(".arrow.left");
	var rightArrow = document.querySelector(".arrow.right");

	// Hide arrows if there's no scrolling to be done
	projectContent.addEventListener("scroll", function () {
		if (isScrollAtStart()) {
			leftArrow.classList.add("hidden-arrow");
		} else {
			leftArrow.classList.remove("hidden-arrow");
		}
		if (isScrollAtEnd()) {
			rightArrow.classList.add("hidden-arrow");
		} else {
			rightArrow.classList.remove("hidden-arrow");
		}
	});
}
// These only get hit on projects page

function populateProjectContent() {
	if (projectContent === null) {
		projectContent = document.getElementById("project-content");
	}
}

function scrollCarouselLeft() {
	projectContent.scrollLeft -= SCROLL_AMOUNT;
}

function isScrollAtEnd() {
	const possibleScroll =
		projectContent.scrollWidth - projectContent.clientWidth;
	return projectContent.scrollLeft >= possibleScroll - 1;
}

function isScrollAtStart() {
	return projectContent.scrollLeft == 0;
}

function scrollCarouselRight() {
	projectContent.scrollLeft += SCROLL_AMOUNT;
}

// --- Navbar

/**
 * Inject Navbar from navbar.html
 */
function generateNavbar() {
	var navbar = document.getElementById("navbar");

	var navbarHTML = sessionStorage.getItem("navbar");
	if (!navbarHTML) {
		fetch("components/navbar.html")
			.then((response) => response.text())
			.then((data) => {
				sessionStorage.setItem("navbar", data);
				navbar.innerHTML = data;
			});
	} else {
		navbar.innerHTML = navbarHTML;
		setActiveTab();
	}
}

/**
 * Add active tab highlight for current page in navbar
 */
function setActiveTab() {
	// Remove old active tab
	var previousActiveTab = document.getElementById("active-tab");
	if (previousActiveTab) {
		previousActiveTab.removeAttribute("id");
	}
	// Add the id to the current active tab
	var currentActiveTab = document.querySelectorAll("nav ul li")[currentPage];
	currentActiveTab.id = "active-tab";
}

// ---------------------------- Presentation

// --- Background Scrolling Text
// Makes a massive block of text to scroll in the background
// takes the form of various print statements in different languages, with different colors
function generateScrollingText() {
	const printStatements = [
		"System.out.println",
		"console.log",
		"document.write",
		"print",
		"printf",
		"Debug.Log",
		"SELECT",
		"NSLog",
	];
	const internalStrings = [
		"Hello there!",
		"Hia :)",
		"How's it going?",
		"Hey, what's up?",
		"Hiya!",
		"Greetings!",
		"Hey there!",
		"Server running on port <3<3",
		"Hi there!",
		"Nice weather we're having",
		"You look great today!",
		"Everything is going to be alright!",
		"...help me...",
		"Good day!",
		"Hello, world!",
		"Hello, user!",
		"Welcome back!",
		"Long time no see!",
		"Good to see you again!",
	];
	let text = "";
	let colorClasses = ["violet", "blue", "yellow"];
	let lastColorIndex = -1;

	for (let i = 0; i < 200; i++) {
		let printStatement =
			printStatements[Math.floor(Math.random() * printStatements.length)];
		let internalString =
			internalStrings[Math.floor(Math.random() * internalStrings.length)];

		let randomIndex;
		do {
			randomIndex = Math.floor(Math.random() * colorClasses.length);
		} while (randomIndex === lastColorIndex);

		let colorClass = colorClasses[randomIndex];
		lastColorIndex = randomIndex;

		if (printStatement === "SELECT") {
			text += `<span class="${colorClass}">${printStatement} '${internalString}' AS greeting;</span> `;
		} else if (printStatement === "NSLog") {
			text += `<span class="${colorClass}">${printStatement}(@"${internalString}");</span> `;
		} else {
			text += `<span class="${colorClass}">${printStatement}("${internalString}");</span> `;
		}
	}

	return text;
}

// Generate background text & colorize
const p = document.querySelector("#background-text p");
if (p) {
	var scrollingText = sessionStorage.getItem("scrollingText");
	if (!scrollingText) {
		var scrollingText = generateScrollingText();
		sessionStorage.setItem("scrollingText", scrollingText);
	}
	p.innerHTML = scrollingText;
}

// Inject resume if page is experience
function injectResume() {
	const iframe = document.createElement("iframe");
	iframe.src = resumeViewLink;
	document.getElementById("iframe-placeholder").appendChild(iframe);
}

// --- Scroll Transition (WIP, needs additional scrollable content)
/*
var currentPage = 0;
var pages = ["index", "about", "projects", "experience", "contact"];

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", addScrollListener);
} else {
	addScrollListener();
}

var lastScrollTop = 0;

function addScrollListener() {
	window.addEventListener("scroll", function () {
		var threshold = window.innerHeight / 2;
		var st = window.pageYOffset || document.documentElement.scrollTop;
		var direction;

		if (st > lastScrollTop) {
			direction = "down";
		} else {
			direction = "up";
		}
		lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

		if (window.scrollY > threshold) {
			navigateToNextPage(direction);
		} else {
			navigateToNextPage(direction);
		}
	});
}

function navigateToNextPage(direction) {
	var nextPage;
	switch (direction) {
		case "down":
			console.log("Down");
			nextPage = pages[currentPage + 1] || pages.length - 1;
		case "up":
			console.log("Up");
			nextPage = pages[currentPage - 1] || 0;
	}
	//window.location.href = pages[nextPage] + ".html";
}
*/

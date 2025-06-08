const PREFERS_COLOR_SCHEME_MEDIA_QUERY = "(prefers-color-scheme: dark)";
const BUTTON_ID = "chrome_slack_theme_switcher_button";
const THEME_ICON =
	'<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-moon-icon lucide-sun-moon"><path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 17.7-1.4 1.4"/><path d="m19.1 4.9-1.4 1.4"/></svg>';

let desiredTheme: "light" | "dark" = "light";

function setTheme() {
	openUserMenu();
}

function openUserMenu() {
	const navUserButton = document.evaluate(
		"//button[contains(@class, 'nav__user__button')]",
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null,
	).singleNodeValue as HTMLElement | null;

	if (navUserButton) {
		navUserButton.click();
		setTimeout(clickPreferences, 1000);
	}
}

function clickPreferences() {
	const preferencesDiv = document.evaluate(
		"//div[text()='Preferences']",
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null,
	).singleNodeValue as HTMLElement | null;

	if (preferencesDiv) {
		preferencesDiv.click();
		setTimeout(clickAppearance, 1000);
	}
}

function clickAppearance() {
	const appearanceSpan = document.evaluate(
		"//span[text()='Appearance']",
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null,
	).singleNodeValue as HTMLElement | null;

	if (appearanceSpan) {
		appearanceSpan.click();
		setTimeout(clickColorMode, 1000);
	}
}

function clickColorMode() {
	const colorModeInput = document.getElementsByName("color-mode")[
		desiredTheme === "light" ? 0 : 1
	] as HTMLElement | null;

	if (colorModeInput) {
		colorModeInput.click();
		setTimeout(closeDialog, 1000);
	}
}

function closeDialog() {
	const modalCloseButton = document.evaluate(
		"//button[contains(@class, 'modal__close_button')]",
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null,
	).singleNodeValue as HTMLElement | null;

	modalCloseButton?.click();
}

window
	.matchMedia(PREFERS_COLOR_SCHEME_MEDIA_QUERY)
	.addEventListener("change", (e) => {
		desiredTheme = e.matches ? "dark" : "light";
		setTheme();
	});

let addButtonTries = 0;

function addButton() {
	addButtonTries++;

	const topNavRightContainer = document.evaluate(
		"//div[contains(@class, 'top_nav__right_container')]",
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null,
	).singleNodeValue;

	if (!topNavRightContainer) {
		if (addButtonTries < 10) {
			setTimeout(addButton, 5 * 1000);
		}

		return;
	}

	const button = document.createElement("button");

	button.id = BUTTON_ID;
	button.innerHTML = THEME_ICON;

	button.setAttribute(
		"style",
		[
			"margin-left: 6px",
			"margin-right: 4px",
			"width: 22px",
			"height: 22px",
			"border-radius: 4px",
			"color: var(--dt_color-theme-content-inv-pry)",
		].join("; "),
	);

	button.onclick = () => {
		desiredTheme = window.matchMedia(PREFERS_COLOR_SCHEME_MEDIA_QUERY).matches
			? "dark"
			: "light";

		setTheme();
	};

	topNavRightContainer.appendChild(button);
}

setTimeout(addButton, 5 * 1000);

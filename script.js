const banner = [
  "    ___                    __       ____             ",
  "   /   | __  ____  _______/ /_     / __ \\____ ______ ",
  "  / /| |/ / / / / / / ___/ __ \\   / / / / __ `/ ___/ ",
  " / ___ / /_/ / /_/ (__  ) / / /  / /_/ / /_/ (__  )  ",
  "/_/  |_\\__, /\\__,_/____/_/ /_/  /_____/\\__,_/____/   ",
  "      /____/                                         ",
  "                                                     ",
  "Welcome to my interactive web terminal.",
  "For a list of available commands, type 'help'.",
];

const help = [
  "whois         Who is Ayush?",
  "social        Display social networks",
  "projects      View coding projects",
  "history       View command history",
  "help          You obviously already know what this does",
  "email         Do not email me",
  "clear         Clear terminal",
  "banner        Display the header",
];

const whois = [
  "Hey, I'm Ayush!👋.",
  "Passionate about crafting elegant solutions to complex problems,",
  "I'm a software developer with a flair for creating robust,",
  "scalable applications that delight users and drive business success.",
  "I'm proficient in JavaScript, Python & Rust.",
  "Currently I'm working for JP Morgan.",
];

const projects = ["Coming soon...."];

const social = [
  ["linkedin", "      ", "https://www.linkedin.com/in/ayush-das-b969361a4/"],
  ["github", "        ", "https://github.com/coderapperr/"],
];

const commandHistory = [];
let historyIndex = commandHistory.length;

const consoleElement = document.querySelector(".console");
const consoleInput = document.querySelector(".console-input");
const historyContainer = document.querySelector(".console-history");

function displayBanner() {
  const bannerElement = document.createElement("pre");
  bannerElement.classList.add("console-output-log");
  bannerElement.textContent = banner.join("\n");
  historyContainer.append(bannerElement);
}

function convertTextToLinks(text) {
  return text.replace(/(https?:\/\/[^\s]+)/g, (url) => {
    return `<a href="${url}" target="_blank">${url}</a>`;
  });
}

function addResult(command, output, isHTML = false) {
  const inputLogElement = document.createElement("div");
  const outputLogElement = document.createElement("pre");

  inputLogElement.classList.add("console-input-log");
  outputLogElement.classList.add("console-output-log");

  inputLogElement.textContent = `visitor@ayushdas641:~$ ${command}`;

  if (isHTML) {
    outputLogElement.innerHTML = output;
  } else {
    outputLogElement.textContent = output;
  }

  historyContainer.append(inputLogElement, outputLogElement);

  consoleElement.scrollTop = consoleElement.scrollHeight;
  consoleInput.focus();
}

const commandFunctions = {
  help: () => help.join("\n"),
  banner: () => banner.join("\n"),
  whois: () => whois.join("\n"),
  social: () =>
    social
      .map(([name, space, url]) => `${name}${space}${convertTextToLinks(url)}`)
      .join("\n"),
  projects: () => projects.join("\n"),
  history: () => commandHistory.join("\n"),
  clear: () => {
    historyContainer.innerHTML = "";
    // displayBanner(); // Re-display the banner after clearing
    // return "Terminal cleared.";
  },
  email: () => {
    // Handle the email command as needed
    return "Please use your email client to send an email to ayushdas641@gmail.com.";
  },
};

function executeCommand(command) {
  const commandFunction = commandFunctions[command];
  if (command === "clear") {
    commandFunction();
    return;
  }
  if (commandFunction) {
    addResult(command, commandFunction(), command === "social");
  } else {
    addResult(
      command,
      "Command not found. For a list of commands, type 'help'."
    );
  }
}

function updateInputFromHistory() {
  const command = commandHistory[historyIndex] || "";
  consoleInput.value = command;
  consoleInput.setSelectionRange(command.length, command.length);
}

consoleElement.addEventListener("click", () => {
  consoleInput.focus();
});

document.addEventListener("DOMContentLoaded", () => {
  consoleInput.focus();
});

displayBanner();

consoleInput.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    e.preventDefault();
    historyIndex = Math.max(0, historyIndex - 1);
    updateInputFromHistory();
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    historyIndex = Math.min(historyIndex + 1, commandHistory.length);
    updateInputFromHistory();
  } else if (e.key === "Enter") {
    e.preventDefault();
    const command = consoleInput.value.trim();
    if (command) {
      commandHistory.push(command);
      historyIndex = commandHistory.length;
      executeCommand(command);
    }
    consoleInput.value = "";
  }
});

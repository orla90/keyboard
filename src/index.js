import "./styles.scss";
import lang from "./translate.js";

const Keyboard = {
  content: {
    mainContainer: null,
    displayWindow: null,
    discriptionWindow: null,
    keyboardWindow: null,
    keyboardWrapper: null,
    keys: []
  },

  data: {
    upperCase: false,
    lang: "en",
    text: ""
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  renderKeyboard() {
    // Create content
    this.content.mainContainer = document.createElement("div");
    this.content.discriptionWindow = document.createElement("div");
    this.content.displayWindow = document.createElement("textarea");
    this.content.keyboardWindow = document.createElement("div");
    this.content.keyboardWrapper = document.createElement("div");

    // Add classes
    this.content.mainContainer.classList.add("container");
    this.content.displayWindow.classList.add("display-window");
    this.content.discriptionWindow.classList.add("description-window");
    this.content.keyboardWindow.classList.add("keyboard-window");
    this.content.keyboardWrapper.classList.add("keyboard-wrapper");

    // Build DOM
    document.body.appendChild(this.content.mainContainer);
    this.content.keyboardWrapper.appendChild(this.buildKeys());
    this.content.keyboardWindow.appendChild(this.content.keyboardWrapper);
    this.content.mainContainer.appendChild(this.content.displayWindow);
    this.content.discriptionWindow.innerHTML = `<span class="description-window_text">Для переключения языка используйте сочетание  клавиш: 
        Left Shift+Alt(Option).<br>Клавиатура создана в операционной системе MacOS</span>`;
    this.content.mainContainer.appendChild(this.content.discriptionWindow);
    this.content.mainContainer.appendChild(this.content.keyboardWindow);

    document.querySelectorAll(".display-window").forEach((e) => {
      e.addEventListener("focus", () => {
        this.highlightKeyboard(e);
        this.open(e.value, (newValue) => {
          e.value = newValue;
        });
      });
    });

    document.querySelector("textarea").addEventListener("change", () => {
      const display = document.querySelector("textarea");
      if (this.isEnglishInput(display.value)) {
        this.toggleLanguage();
      }

      if (this.isRussianInput(display.value)) {
        this.toggleLanguage();
      }
    });

    document.addEventListener("keydown", event => {
      Keyboard.highlightKeyboard(event);
      if (event.shiftKey && event.altKey) {
        Keyboard.toggleLanguage();
      }
      const keysArr = document.querySelectorAll(".keyboard__key");
      for (let i = 0; i < keysArr.length; i += 1) {
        if (event.code === keysArr[i].getAttribute("name")) {
          keysArr[i].classList.add("active");
        }
      }
    });

    document.addEventListener("keyup", event => {
      const keysArr = document.querySelectorAll(".keyboard__key");
      for (let i = 0; i < keysArr.length; i += 1) {
        if (event.code === keysArr[i].getAttribute("name")) {
          keysArr[i].classList.remove("active");
        }
      }
    });
  },

  buildKeys() {
    const fragment = document.createDocumentFragment();

    lang[this.data.lang].forEach((keyLine) => {
      const keysLine = document.createElement("div");
      keysLine.classList.add("key-line");

      keyLine.forEach((key) => {
        this.content.keys.push(key);
        const keyElement = document.createElement("div");

        // Add attributes/classes
        keyElement.setAttribute("name", `${key[1]}`);
        keyElement.classList.add("keyboard__key");

        switch (key[0]) {
          case "backspace":
            keyElement.innerText = `${key[0]}`.slice(0, 1).toUpperCase() + `${key[0]}`.slice(1);
            keyElement.addEventListener("click", () => {
              let cursorPosition = document.querySelector("textarea").selectionStart;
              this.data.text = this.data.text.slice(0, cursorPosition - 1)
              + this.data.text.slice(cursorPosition);
              this.triggerEvent("oninput");
              document.querySelector("textarea").selectionStart = cursorPosition - 1;
            });

            break;

          case "del":
            keyElement.innerText = `${key[0]}`.slice(0, 1).toUpperCase() + `${key[0]}`.slice(1);
            keyElement.addEventListener("click", () => {
              let cursorPosition = document.querySelector("textarea").selectionStart;
              this.data.text = this.data.text.slice(0, cursorPosition)
              + this.data.text.slice(cursorPosition + 1);
              this.triggerEvent("oninput");
              document.querySelector("textarea").selectionStart = cursorPosition;
            });
            break;

          case "win":
            keyElement.innerText = `${key[0]}`.slice(0, 1).toUpperCase() + `${key[0]}`.slice(1);
            break;

          case "caps":
            keyElement.innerText = `${key[0]}`.slice(0, 1).toUpperCase() + `${key[0]}`.slice(1);
            keyElement.addEventListener("click", () => {
              this.toggleCaps();
            });

            break;

          case "ctrl":
            keyElement.innerText = `${key[0]}`.slice(0, 1).toUpperCase() + `${key[0]}`.slice(1);
            break;

          case "alt":
            keyElement.innerText = `${key[0]}`.slice(0, 1).toUpperCase() + `${key[0]}`.slice(1);
            break;

          case "tab":
            keyElement.innerText = `${key[0]}`.slice(0, 1).toUpperCase() + `${key[0]}`.slice(1);
            keyElement.addEventListener("click", () => {
              this.data.text += "    ";
              this.triggerEvent("oninput");
            });

            break;

          case "enter":
            keyElement.innerText = `${key[0]}`.slice(0, 1).toUpperCase() + `${key[0]}`.slice(1);

            keyElement.addEventListener("click", () => {
              this.data.text += "\n";
              this.triggerEvent("oninput");
            });

            break;

          case "space":
            keyElement.innerText = `${key[0]}`.slice(0, 1).toUpperCase() + `${key[0]}`.slice(1);

            keyElement.classList.add("keyboard__key_wide");
            keyElement.addEventListener("click", () => {
              this.data.text += " ";
              this.triggerEvent("oninput");
            });

            break;

          case "shift":
            keyElement.innerText = `${key[0]}`.slice(0, 1).toUpperCase() + `${key[0]}`.slice(1);
            break;

          default:
            keyElement.innerText = this.data.upperCase
              ? key[0].toUpperCase()
              : key[0].toLowerCase();

            keyElement.addEventListener("click", () => {
              this.data.text
                  += this.data.upperCase && key[0].length === 1
                  ? key[0].toUpperCase()
                  : key[0].toLowerCase();
              this.triggerEvent("oninput");
            });

            break;
        }

        keysLine.appendChild(keyElement);
        fragment.appendChild(keysLine);
      });
    });
    return fragment;
  },

  highlightKeyboard(e) {
    if (this.isEnglishInput(e) && e.key.length === 1) {
      this.data.lang = "rus";
      this.toggleLanguage();
    }
    if (this.isRussianInput(e)) {
      this.data.lang = "en";
      this.toggleLanguage();
    }
  },

  isEnglishInput(e) {
    let isEn = false;
    if (e.key) {
      isEn = /[a-zA-Z]/.test(e.key);
    }
    return isEn;
  },

  isRussianInput(e) {
    let isRus = false;
    if (e.key) {
      isRus = /[а-яА-ЯЁё]/.test(e.key);
    }
    return isRus;
  },

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === "function") {
      this.eventHandlers[handlerName](this.data.text);
    }
  },

  open(initialValue, oninput, onclose) {
    this.data.text = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
  },

  toggleCaps() {
    this.data.upperCase = !this.data.upperCase;
    for (let i = 0; i < this.content.keys.length; i += 1) {
      if (this.content.keys[i].innerText) {
        if (this.data.upperCase) {
          this.content.keys[i].innerText = this.content.keys[i].innerText.toUpperCase();
          this.content.keys[i].setAttribute("name", `${this.content.keys[i].toUpperCase()}`);
        } else {
          this.content.keys[i].innerText = this.content.keys[i].innerText.toLowerCase();
          this.content.keys[i].setAttribute("name", `${this.content.keys[i].toLowerCase()}`);
        }
      }
    }
    localStorage.setItem("caps", this.data.upperCase);
  },

  toggleLanguage() {
    this.data.lang = this.data.lang === "en" ? "rus" : "en";
    while (Keyboard.content.keyboardWrapper.firstChild) {
      Keyboard.content.keyboardWrapper.removeChild(Keyboard.content.keyboardWrapper.firstChild);
    }
    localStorage.setItem("lang", this.data.lang);
    Keyboard.content.keyboardWrapper.appendChild(Keyboard.buildKeys());
  },

  getLocalStorage() {
    if (localStorage.getItem("lang")) {
      const currentLang = localStorage.getItem("lang");
      this.data.lang = currentLang;
      while (Keyboard.content.keyboardWrapper.firstChild) {
        Keyboard.content.keyboardWrapper.removeChild(Keyboard.content.keyboardWrapper.firstChild);
      }
      Keyboard.content.keyboardWrapper.appendChild(Keyboard.buildKeys());
    }
    if (localStorage.getItem("caps")) {
      const currentCaps = localStorage.getItem("caps");
      this.data.upperCase = currentCaps;
      while (Keyboard.content.keyboardWrapper.firstChild) {
        Keyboard.content.keyboardWrapper.removeChild(Keyboard.content.keyboardWrapper.firstChild);
      }
      Keyboard.content.keyboardWrapper.appendChild(Keyboard.buildKeys());
    }
  },

  close() {
    this.data.text = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
  }
};

window.onload = () => {
  Keyboard.renderKeyboard();
  window.addEventListener("load", Keyboard.getLocalStorage());
};

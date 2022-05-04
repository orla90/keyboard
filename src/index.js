import "./styles.scss";

const Keyboard = {
    content: {
      mainContainer: null,
      displayWindow: null,
      discriptionWindow: null,
      keyboardWindow: null,
      keyboardWrapper: null,
      keys: [],
    },
  
    data: {
      upperCase: false,
      lang: "en",
      text: "",
    },
  
    eventHandlers: {
      oninput: null,
      onclose: null,
    },
  
    lang: {
      en: [
        [
          ["1", "Digit1"],
          ["2", "Digit2"],
          ["3", "Digit3"],
          ["4", "Digit4"],
          ["5", "Digit5"],
          ["6", "Digit6"],
          ["7", "Digit7"],
          ["8", "Digit8"],
          ["9", "Digit9"],
          ["0", "Digit0"],
          ["-", "Minus"],
          ["=", "Equal"],
          ["backspace", "Backspace"],
        ],
        [
          ["tab", "Tab"],
          ["q", "KeyQ"],
          ["w", "KeyW"],
          ["e", "KeyE"],
          ["r", "KeyR"],
          ["t", "KeyT"],
          ["y", "KeyY"],
          ["u", "KeyU"],
          ["i", "KeyI"],
          ["o", "KeyO"],
          ["p", "KeyP"],
          ["[", "BracketLeft"],
          ["]", "BracketRight"],
          ["del", "Delete"],
        ],
        [
          ["caps", "CapsLock"],
          ["a", "KeyA"],
          ["s", "KeyS"],
          ["d", "KeyD"],
          ["f", "KeyF"],
          ["g", "KeyG"],
          ["h", "KeyH"],
          ["j", "KeyJ"],
          ["k", "KeyK"],
          ["l", "KeyL"],
          [";", "Semicolon"],
          ["\"", "Quote"],
          ["\\", "Backslash"],
          ["enter", "Enter"],
        ],
        [
          ["shift", "ShiftLeft"],
          ["z", "KeyZ"],
          ["x", "KeyX"],
          ["c", "KeyC"],
          ["v", "KeyV"],
          ["b", "KeyB"],
          ["n", "KeyN"],
          ["m", "KeyM"],
          [",", "Comma"],
          [".", "Period"],
          ["↑", "ArrowUp"],
          ["/", "Slash"],
          ["shift", "ShiftRight"],
        ],
        [
          ["ctrl", "ControlLeft"],
          ["win", "MetaLeft"],
          ["alt", "AltLeft"],
          ["space", "Space"],
          ["alt", "AltRight"],
          ["←", "ArrowLeft"],
          ["↓", "ArrowDown"],
          ["→", "ArrowRight"],
          ["ctrl", "ControlRight"],
        ],
      ],
  
      rus: [
        [
          ["1", "Digit1"],
          ["2", "Digit2"],
          ["3", "Digit3"],
          ["4", "Digit4"],
          ["5", "Digit5"],
          ["6", "Digit6"],
          ["7", "Digit7"],
          ["8", "Digit8"],
          ["9", "Digit9"],
          ["0", "Digit0"],
          ["-", "Minus"],
          ["=", "Equal"],
          ["backspace", "Backspace"],
        ],
        [
          ["tab", "Tab"],
          ["й", "KeyQ"],
          ["ц", "KeyW"],
          ["у", "KeyE"],
          ["к", "KeyR"],
          ["е", "KeyT"],
          ["н", "KeyY"],
          ["г", "KeyU"],
          ["ш", "KeyI"],
          ["щ", "KeyO"],
          ["з", "KeyP"],
          ["х", "BracketLeft"],
          ["ъ", "BracketRight"],
          ["del", "Delete"],
        ],
        [
          ["caps", "CapsLock"],
          ["ф", "KeyA"],
          ["ы", "KeyS"],
          ["в", "KeyD"],
          ["а", "KeyF"],
          ["п", "KeyG"],
          ["р", "KeyH"],
          ["о", "KeyJ"],
          ["л", "KeyK"],
          ["д", "KeyL"],
          ["ж", "Semicolon"],
          ["э", "Quote"],
          ["ё", "Backslash"],
          ["enter", "Enter"],
        ],
  
        [
          ["shift", "ShiftLeft"],
          ["я", "KeyZ"],
          ["ч", "KeyX"],
          ["с", "KeyC"],
          ["м", "KeyV"],
          ["и", "KeyB"],
          ["т", "KeyN"],
          ["ь", "KeyM"],
          ["б", "Comma"],
          ["ю", "Period"],
          ["↑", "ArrowUp"],
          ["/", "Slash"],
          ["shift", "ShiftRight"],
        ],
        [
          ["ctrl", "ControlLeft"],
          ["win", "MetaLeft"],
          ["alt", "AltLeft"],
          ["space", "Space"],
          ["alt", "AltRight"],
          ["←", "ArrowLeft"],
          ["↓", "ArrowDown"],
          ["→", "ArrowRight"],
          ["ctrl", "ControlRight"],
        ],
      ],
    },
  
    renderKeyboard() {
      //Create content
      this.content.mainContainer = document.createElement("div");
      this.content.discriptionWindow = document.createElement("div");
      this.content.displayWindow = document.createElement("textarea");
      this.content.keyboardWindow = document.createElement("div");
      this.content.keyboardWrapper = document.createElement("div");
  
      //Add classes
      this.content.mainContainer.classList.add("container");
      this.content.displayWindow.classList.add("display-window");
      this.content.discriptionWindow.classList.add("description-window");
      this.content.keyboardWindow.classList.add("keyboard-window");
      this.content.keyboardWrapper.classList.add("keyboard-wrapper");
  
      //Build DOM
      document.body.appendChild(this.content.mainContainer);
      this.content.keyboardWrapper.appendChild(this._buildKeys());
      this.content.keyboardWindow.appendChild(this.content.keyboardWrapper);
      this.content.mainContainer.appendChild(this.content.displayWindow);
      this.content.discriptionWindow.innerHTML =
        `<span class="description-window_text">Для переключения языка используйте сочетание  клавиш: 
        Left Shift+Alt(Option).<br>Клавиатура создана в операционной системе MacOS</span>`;
      this.content.mainContainer.appendChild(this.content.discriptionWindow);
      this.content.mainContainer.appendChild(this.content.keyboardWindow);
  
      document.querySelectorAll(".display-window").forEach((e) => {
        e.addEventListener("focus", () => {
          console.log(e);
          this._highlightKeyboard(e);
          this.open(e.value, (newValue) => {
            e.value = newValue;
          });
        });
      });
  
      document.querySelector("textarea").addEventListener("change", () => {
        const display = document.querySelector("textarea");
        console.log(display.value);
        if (this._isEnglishInput(display.value)) {
          console.log("en");
          this._toggleLanguage();
        }
  
        if (this._isRussianInput(display.value)) {
          console.log("rus");
          this._toggleLanguage();
        }
      });
  
      document.addEventListener("keydown", function (event) {
        Keyboard._highlightKeyboard(event);
        if (event.shiftKey && event.altKey) {
          Keyboard._toggleLanguage();
        }
        const keysArr = document.querySelectorAll(".keyboard__key");
        for (let i = 0; i < keysArr.length; i++) {
          if (event.code == keysArr[i].getAttribute("name")) {
            keysArr[i].classList.add("active");
          }
        }
      });
  
      document.addEventListener("keyup", function (event) {
        const keysArr = document.querySelectorAll(".keyboard__key");
        for (let i = 0; i < keysArr.length; i++) {
          if (event.code == keysArr[i].getAttribute("name")) {
            keysArr[i].classList.remove("active");
          }
        }
      });
    },
  
    _buildKeys() {
      const fragment = document.createDocumentFragment();
  
      this.lang[this.data.lang].forEach((keyLine) => {
        const keysLine = document.createElement("div");
        keysLine.classList.add("key-line");
  
        keyLine.forEach((key) => {
          this.content.keys.push(key);
          const keyElement = document.createElement("div");
  
          // Add attributes/classes
          keyElement.setAttribute("name", `${key[1]}`);
          keyElement.classList.add("keyboard__key");
  
          const caseUpText = document.createElement("span");
          caseUpText.classList.add("case-up");
  
          const caseDownText = document.createElement("span");
          caseDownText.classList.add("case-down");
  
          const rusLang = document.createElement("div");
          rusLang.classList.add("rus");
  
          switch (key[0]) {
            case "backspace":
              keyElement.innerText =
                `${key[0]}`.slice(0, 1).toUpperCase() + `${key[0]}`.slice(1);
              keyElement.addEventListener("click", () => {
                this.data.text = this.data.text.slice(0, -1);
                this._triggerEvent("oninput");
              });
  
              break;
  
            case "del":
              keyElement.innerText =
                `${key[0]}`.slice(0, 1).toUpperCase() + `${key[0]}`.slice(1);
              keyElement.addEventListener("click", () => {
                this.data.text = this.data.text.slice(0, -1);
                this._triggerEvent("oninput");
              });
              break;
  
            case "win":
              keyElement.innerText =
                `${key[0]}`.slice(0, 1).toUpperCase() + `${key[0]}`.slice(1);
              break;
  
            case "caps":
              keyElement.innerText =
                `${key[0]}`.slice(0, 1).toUpperCase() + `${key[0]}`.slice(1);
              keyElement.addEventListener("click", () => {
                this._toggleCaps();
              });
  
              break;
  
            case "ctrl":
              keyElement.innerText =
                `${key[0]}`.slice(0, 1).toUpperCase() + `${key[0]}`.slice(1);
              break;
  
            case "alt":
              keyElement.innerText =
                `${key[0]}`.slice(0, 1).toUpperCase() + `${key[0]}`.slice(1);
              break;
  
            case "tab":
              keyElement.innerText =
                `${key[0]}`.slice(0, 1).toUpperCase() + `${key[0]}`.slice(1);
              keyElement.addEventListener("click", () => {
                this.data.text += "    ";
                this._triggerEvent("oninput");
              });
  
              break;
  
            case "enter":
              keyElement.innerText =
                `${key[0]}`.slice(0, 1).toUpperCase() + `${key[0]}`.slice(1);
  
              keyElement.addEventListener("click", () => {
                this.data.text += "\n";
                this._triggerEvent("oninput");
              });
  
              break;
  
            case "space":
              keyElement.innerText =
                `${key[0]}`.slice(0, 1).toUpperCase() + `${key[0]}`.slice(1);
  
              keyElement.classList.add("keyboard__key_wide");
              keyElement.addEventListener("click", () => {
                this.data.text += " ";
                this._triggerEvent("oninput");
              });
  
              break;
  
            case "shift":
              keyElement.innerText =
                `${key[0]}`.slice(0, 1).toUpperCase() + `${key[0]}`.slice(1);
              break;
  
            default:
              keyElement.textContent = key[0];
  
              keyElement.addEventListener("click", () => {
                this.data.text +=
                  this.data.upperCase && key[0].length === 1
                    ? key[0].toUpperCase()
                    : key[0].toLowerCase();
                this._triggerEvent("oninput");
              });
  
              break;
          }
  
          rusLang.appendChild(caseUpText);
          rusLang.appendChild(caseDownText);
          keyElement.appendChild(rusLang);
  
          const enLang = rusLang.cloneNode(true);
          enLang.classList.remove("rus");
          enLang.classList.add("en");
  
          keyElement.appendChild(enLang);
  
          keysLine.appendChild(keyElement);
          fragment.appendChild(keysLine);
        });
      });
      return fragment;
    },
  
    _highlightKeyboard(e) {
      if (this._isEnglishInput(e) && e.key.length === 1) {
        this.data.lang = "rus";
        this._toggleLanguage();
      }
      if (this._isRussianInput(e)) {
        this.data.lang = "en";
        this._toggleLanguage();
      }
    },
  
    _isEnglishInput(e) {
      let isEn = false;
      if (e.key) {
        isEn = /[a-zA-Z]/.test(e.key);
      }
      return isEn;
    },
  
    _isRussianInput(e) {
      let isRus = false;
      if (e.key) {
        isRus = /[а-яА-ЯЁё]/.test(e.key);
      }
      return isRus;
    },
  
    _triggerEvent(handlerName) {
      if (typeof this.eventHandlers[handlerName] == "function") {
        this.eventHandlers[handlerName](this.data.text);
      }
    },
  
    open(initialValue, oninput, onclose) {
      this.data.text = initialValue || "";
      this.eventHandlers.oninput = oninput;
      this.eventHandlers.onclose = onclose;
    },
  
    _toggleCaps() {
      this.data.upperCase = !this.data.upperCase;
  
      for (const key of this.content.keys) {
        if (key.innerText) {
          if (this.data.upperCase) {
            key.innerText = key.innerText.toUpperCase();
            key.setAttribute("name", `${key.toUpperCase()}`);
          } else {
            key.innerText = key.innerText.toLowerCase();
            key.setAttribute("name", `${key.toLowerCase()}`);
          }
        }
      }
    },
  
    _toggleLanguage() {
      this.data.lang = this.data.lang === "en" ? "rus" : "en";
      while (Keyboard.content.keyboardWrapper.firstChild) {
        Keyboard.content.keyboardWrapper.removeChild(Keyboard.content.keyboardWrapper.firstChild);
      }
      localStorage.setItem("lang", this.data.lang);
      Keyboard.content.keyboardWrapper.appendChild(Keyboard._buildKeys());
    },

    getLocalStorage() {
      console.log(this.data.lang);
      if(localStorage.getItem("lang")) {
        const lang = localStorage.getItem("lang");
        this.data.lang = lang;
        while (Keyboard.content.keyboardWrapper.firstChild) {
          Keyboard.content.keyboardWrapper.removeChild(Keyboard.content.keyboardWrapper.firstChild);
        }
        console.log(this.data.lang);
        Keyboard.content.keyboardWrapper.appendChild(Keyboard._buildKeys());
      }
    },

    close() {
      this.data.text = "";
      this.eventHandlers.oninput = oninput;
      this.eventHandlers.onclose = onclose;
    }
  };
  
  window.onload = function () {
    Keyboard.renderKeyboard();
    window.addEventListener("load", Keyboard.getLocalStorage());
  };
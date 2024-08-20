import {
  NumberFuncs,
  StringFuncs,
  DateFuncs,
  Dom,
  Fetch,
} from "./scripts/Funcs.js";
import "./types.js";

// utils
export const numFn = new NumberFuncs();
export const strFn = new StringFuncs();
export const dateFn = new DateFuncs();
export const dom = new Dom();
export const fetchFn = new Fetch();

// datas
/** @type {Com[]} */
const comments = await fetchFn.get("./assets/datas/comments.json");
/** @type {Tool[]} */
const tools = await fetchFn.get("./assets/datas/tools.json");
/** @type {Social[]} */
const socials = await fetchFn.get("./assets/datas/socials.json");
const title = dom.select("h1");

// app
function setTools() {
  const toolsDom = dom.select("#tools");
  if (!toolsDom) return;

  const toolImg = toolsDom.querySelector("img");
  const toolSm = toolsDom.querySelector(".opt-sm");
  const toolBg = toolsDom.querySelector(".opt-bg");
  const toolAside = toolsDom.querySelector("aside");
  let i = 0;

  for (let i = 0; i < tools.length; i++) {
    const button = dom.create("button", {
      class: "bt",
      "data-id": tools[i].id,
    });
    toolAside.append(button);
  }

  /**
   * @param {Tool} tool
   */
  const setTool = (tool) => {
    const syncBt = toolAside.querySelector(`button[data-id="${tool.id}"]`);
    const selected = toolAside.querySelector(".slct-tool");

    if (selected) dom.modClass(selected, "slct-tool", "del");
    dom.modClass(syncBt, "slct-tool");
    toolImg.src = tool.img.src;
    toolImg.alt = tool.img.alt;
    toolSm.textContent = tool.smdesc;
    toolBg.textContent = tool.bgdesc;
  };
  const interval = () =>
    setInterval(() => {
      i++;
      i = i < tools.length ? i : 0;
      setTool(tools[i]);
    }, 10000);

  setTool(tools[i]);
  let interId = interval();
  toolAside.addEventListener("click", (e) => {
    clearInterval(interId);
    const bt = e.target;
    if (!(bt instanceof HTMLButtonElement)) return;

    const id = bt.dataset.id;
    i = id - 1;
    setTool(tools[i]);
    interId = interval();
  });
}
function setComments() {
  const commentsDom = dom.select("#comments");
  for (let i = 0; i < comments.length; i++) {
    const article = dom.create("article", { class: "comment" });
    const profil = dom.create("img", {
      src: comments[i].img,
      alt: `Photo de ${comments[i].name}`,
    });
    const name = dom.create("h3");
    const content = dom.create("p");
    name.textContent = comments[i].name;
    content.textContent = comments[i].content;
    article.append(profil, name, content);
    commentsDom.append(article);
  }
}
function setSocials() {
  const socialsDom = dom.select("#socials");
  for (let i = socials.length - 1; i >= 0; i--) {
    const link = dom.create("a", { class: "link", href: socials[i].link });
    const img = dom.create("img", { src: socials[i].img });
    link.append(img, socials[i].name);
    socialsDom.append(link);
  }
}
function handleForm() {
  const form = dom.select("form.form");
  const response = dom.create("h3");

  const validate = (value, limit = 100) => {
    return value && typeof value === "string" && value.length <= limit;
  };
  const submitMessage = (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name").trim();
    const mail = formData.get("mail").trim();
    const message = formData.get("message").trim();
    if (!validate(name) || !validate(mail) || !validate(message)) {
      dom.notify("Informations incomplète.", "error");
    } else {
      // Fetch to server treatment...
      dom.removeChildren(form);
      response.textContent = `Merci ${name} ! Nous vous contacterons sur ${mail} 👍`;
      form.append(response);
    }
  };

  form.addEventListener("submit", submitMessage);
}

setTools();
setComments();
setSocials();
handleForm();
dom.handleTheme([title]);
dom.setCopyright();

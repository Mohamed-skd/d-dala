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
/** @type {Service[]} */
const services = await fetchFn.get("./assets/datas/services.json");
/** @type {Com[]} */
const comments = await fetchFn.get("./assets/datas/comments.json");
/** @type {Social[]} */
const socials = await fetchFn.get("./assets/datas/socials.json");
const title = dom.select("h1");
const imgs = await loadServImgs();

// app
dom.handleTheme([title]);
dom.setCopyright();

function loadServImgs() {
  const prs = [];

  for (let i = 0; i < services.length; i++) {
    const pr = new Promise((res) => {
      const img = new Image();
      img.src = services[i].img;
      img.alt = services[i].name;
      res(img);
    });

    prs.push(pr);
  }

  return Promise.all(prs);
}
function setServices() {
  const servicesDom = dom.select("#services");
  const servicesAside = servicesDom.querySelector("aside");
  const grid = dom.create("div", { class: "grid" });

  /**
   * @param {Service} service
   */
  const renderService = (service) => {
    const article = dom.create("article", {
      class: "grid service",
      "data-id": service.id,
    });
    const textContent = dom.create("div", { class: "grid" });
    const title = dom.create("h3");
    const img = imgs.filter((i) => i.alt === service.name)[0];
    const info = dom.create("p");

    title.textContent = service.name;
    info.textContent = service.desc;
    textContent.append(title, info);
    article.append(img, textContent);
    grid.append(article);
  };
  const selectService = (e) => {
    const target = e.target;
    if (!(target instanceof HTMLButtonElement)) return;

    const prevSelected = dom.select("#services .bt.selected");
    const serviceId = parseInt(target.dataset.service);
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    dom.modClass(prevSelected, "selected", "del");
    dom.modClass(target, "selected");
    dom.removeChildren(grid);
    renderService(service);
  };

  for (let i = 0; i < services.length; i++) {
    const bt = dom.create("button", {
      class: i === 0 ? "bt selected" : "bt",
      "data-service": services[i].id,
    });
    bt.textContent = services[i].name;
    servicesAside.append(bt);
  }

  renderService(services[0]);
  servicesAside.addEventListener("click", selectService);
  servicesDom.append(grid);
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

setServices();
setComments();
setSocials();
handleForm();

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

dom.setCopyright();

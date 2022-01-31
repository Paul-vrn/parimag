
import { writable } from "svelte/store";

export const viewMain = writable(localStorage.getItem('viewMain') || '')
viewMain.subscribe((val) => localStorage.setItem("viewMain", val))

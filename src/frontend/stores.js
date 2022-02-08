
import { writable } from "svelte/store";

export const viewMain = writable(localStorage.getItem('viewMain') || 'accueil')
viewMain.subscribe((val) => localStorage.setItem("viewMain", val))

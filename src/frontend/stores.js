
import { writable } from "svelte/store";

export const viewMain = writable(localStorage.getItem('viewMain') || 'accueil')
viewMain.subscribe((val) => localStorage.setItem("viewMain", val))


export const locationName = writable(localStorage.getItem('locationName') || '')
locationName.subscribe((val) => localStorage.setItem('locationName', val))

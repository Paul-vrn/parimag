
import { writable } from "svelte/store";

export const viewMain = writable(localStorage.getItem('viewMain') || 'accueil')
viewMain.subscribe((val) => localStorage.setItem("viewMain", val))


export const locationName = writable(localStorage.getItem('locationName') || '')
locationName.subscribe((val) => localStorage.setItem('locationName', val))

export const jwt = writable(localStorage.getItem('jwt') || null)
jwt.subscribe(val => localStorage.setItem('jwt', val))

export const user = writable(localStorage.getItem('user') || null)
user.subscribe(val => localStorage.setItem('user', val))

export const viewAdmin = writable(localStorage.getItem('viewAdmin') || 'AA')
viewAdmin.subscribe((val) => localStorage.setItem("viewAdmin", val))
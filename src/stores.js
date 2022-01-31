
import { writable } from "svelte/store";

export const viewMain = writable(localStorage.getItem('viewMain') || '')
viewMain.subscribe((val) => localStorage.setItem("viewMain", val))

export const carouselIndex = writable(parseInt(localStorage.getItem('carouselIndex')) || 0)
carouselIndex.subscribe((val) => localStorage.setItem("carouselIndex", val))
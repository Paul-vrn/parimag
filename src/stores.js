
import { writable } from "svelte/store";

export const tabSaved = writable(localStorage.getItem('tabSaved') || 'page_pres')
tabSaved.subscribe((val) => localStorage.setItem("tabSaved", val))

export const carouselIndex = writable(parseInt(localStorage.getItem('carouselIndex')) || 0)
carouselIndex.subscribe((val) => localStorage.setItem("carouselIndex", val))
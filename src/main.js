import App from './App.svelte';
import Admin from './Admin.svelte';

new App({
	target: document.body,
	props: {
		name: 'world'
	}
});


new Admin({
	target: document.querySelector('#login'),
	props:{}
})

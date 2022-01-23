<script>
	import Routeur, {location} from 'svelte-spa-router'
	import Admin from "./admin_page/admin_page.svelte"
	import Home from "./main_page/main_page.svelte"
	
</script>

<Routeur routes={{
	'/': Home,
	'/login':Admin
}}
/>

<style>
</style>
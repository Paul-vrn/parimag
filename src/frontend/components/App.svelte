<script>
	import { Router, Route } from "svelte-routing"
	export let url = "";
	import Admin from "./admin/admin.svelte"
	import Home from "./main/main.svelte"
	import Login from "./admin/login.svelte"
</script>

<Router url="{url}">
	<Route path="/*"><Home/></Route>
	<Route path="/login"><Login/></Route>
	<Route path="/admin"><Admin/></Route>
  </Router>

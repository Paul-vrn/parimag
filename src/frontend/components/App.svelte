<script>
	import { Router, Route } from "svelte-routing"
	export let url = "";
	import Admin from "./admin/admin.svelte"
	import Home from "./main/main.svelte"
</script>

<Router url="{url}">
	<Route path="/*"><Home/></Route>
	<Route path="admin" component="{Admin}" />
  </Router>

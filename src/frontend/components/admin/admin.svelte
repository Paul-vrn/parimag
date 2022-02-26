<script>
	import Stock from './stocks/stock.svelte'
	import PanneauCommandes from './commandes/panneau_commandes.svelte'
	import BanderoleModule from './banderoleModule/banderole_module.svelte'
	import {Toasts} from "as-toast"
</script>

<Toasts/>
<main>
	<h1>Module admin</h1>
	<div id="admin">
		<PanneauCommandes/>
		<div id="gauche">
			<Stock/>
			<BanderoleModule/>
		</div>
	</div>
</main>

<style>
div#admin {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: flex-start;
	gap:2em;
	margin:1em;
}
div#admin div#gauche {
	display: flex;
	flex-direction: column;
	width: 30%;
	align-items: center;
}
</style>

<script>
	import Stock from './stocks/stock.svelte'
	import PanneauCommandes from './commandes/panneau_commandes.svelte'
</script>

<main>
	<h1>Module admin</h1>
	<div id="admin">
		<PanneauCommandes/>
		<Stock/>
	</div>
</main>

<style>
div#admin {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: flex-start;
	height: 100vh;
}
</style>

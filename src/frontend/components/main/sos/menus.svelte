<script>
	import Produits from './menus/produits.svelte'
	import Panier from './menus/panier.svelte'

	let panier = []
	function aff(){
		console.log(panier)
	}
	function updatePanier(){
		panier = [...panier]
	}
</script>

<main id="menus">
	<button on:click={aff}>test</button>
	<Produits panier={panier} {updatePanier}/>
	<Panier panier={panier}/>
</main>

<style>
	main#menus {
		width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		margin-top: 115px;
	}
@media screen and (max-width: 640px) {
  main#menus {
	  flex-direction: column;
	  height: auto;
  }
}
</style>
<script>
	import Produits from './menus/produits.svelte'
	import Panier from './menus/panier.svelte'
	let panier = []
	function updatePanier(newPanier){
		panier = [...newPanier]
	}

	
</script>

<main id="menus">
	<Produits panier={panier} {updatePanier}/>
	<Panier panier={panier} {updatePanier}/>
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
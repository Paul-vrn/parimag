<script>
	import Produits from './menus/produits.svelte'
	import Panier from './menus/panier.svelte'
	let panier = []
	let commandeEnCours = {
		panier:[]
	}
	function updatePanier(newPanier){
		commandeEnCours.panier = [...newPanier]
	}

	
</script>

<main id="menus">
	<Produits commandeEnCours={commandeEnCours} updatePanier={updatePanier}/>
	<Panier commandeEnCours={commandeEnCours} updatePanier={updatePanier}/>
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
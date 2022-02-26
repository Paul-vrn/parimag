<script>
	import Panier from './menus/panier.svelte'
	import TabCommande from './menus/tab_commande.svelte'
	let panier = []
	let commandeEnCours = {
		panier:[]
	}
	function updatePanier(newPanier){
		commandeEnCours.panier = [...newPanier]
	}
	let scripts = document.head.querySelectorAll('script')
</script>

<main id="menus">
	<Panier commandeEnCours={commandeEnCours} updatePanier={updatePanier}/>
	<TabCommande commandeEnCours={commandeEnCours} updatePanier={updatePanier}/>
</main>

<style>
	main#menus {
		width: 100%;
		min-height: 80%;
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		margin-top: 120px;
		
	}
@media screen and (max-width: 800px) {
  main#menus {
	  flex-direction: column;
	  height: auto;
  }
}
</style>
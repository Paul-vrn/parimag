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
	function resetCommande(){
		commandeEnCours = {panier:[]}
	}
</script>

<main id="menus">
	<Panier commandeEnCours={commandeEnCours} updatePanier={updatePanier} {resetCommande}/>
	<TabCommande commandeEnCours={commandeEnCours} updatePanier={updatePanier}/>
</main>

<style>
	main#menus {
		width: 100%;
		min-height: calc(100% - 120px);
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
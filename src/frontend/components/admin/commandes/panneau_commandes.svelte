<script>
	import { onMount } from "svelte";
    import {getCommandes} from '../../../api/commande'
    import {getLivreurs} from '../../../api/livreur'
    import {getQGs} from '../../../api/qg'
    import {TabPane, TabContent} from 'sveltestrap'
    import TableCommandes from "./table_commandes.svelte";
    import {viewAdmin} from "../../../stores"
    let commandes = []
    let livreurs = []
    let qgs = []
    onMount(async () => {
        commandes = await getCommandes()
        commandes.forEach(co => {
          co.trajets = JSON.parse(co.trajets)
        });
        console.log(commandes)
        livreurs = await getLivreurs()
        qgs = await getQGs()
        
})
    async function updateCommandes(){
      commandes = await getCommandes()
      commandes.forEach(co => {
          co.trajets = JSON.parse(co.trajets)
        });
    }
</script>

<TabContent id="TabPanneau" on:tab={(ev) => $viewAdmin = ev.detail}>
  {#each qgs as qg}
    <TabPane tabId={qg.nom} tab={qg.nom} active={$viewAdmin===qg.nom}>
      <TableCommandes commandes={commandes.filter(co => co.QGNom === qg.nom)} livreurs={livreurs.filter(liv => liv.QGNom === qg.nom)} qgs={qgs} updateCommandes={updateCommandes}/>
    </TabPane>   
  {/each}
</TabContent>

<style>
:global(#TabPanneau){
  width: 70%;
}
</style>

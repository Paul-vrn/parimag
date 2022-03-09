<script>
	import { onMount } from "svelte";
    import {getCommandes} from '../../../api/commande'
    import {getLivreurs} from '../../../api/livreur'
    import {getQGs} from '../../../api/qg'
    import {TabPane, TabContent, Button} from 'sveltestrap'
    import TableCommandes from "./table_commandes.svelte";
    import {viewAdmin} from "../../../stores"
import { addToast } from "as-toast";
    let commandes = []
    let livreurs = []
    let qgs = []
    onMount(async () => {
        commandes = await getCommandes()
        commandes.forEach(co => {
          co.trajets = JSON.parse(co.trajets)
        });
        console.log("onmount")
        console.log(commandes)
        livreurs = await getLivreurs()
        qgs = await getQGs()
        
})
    async function updateCommandes(){
      commandes = await getCommandes()
      commandes.forEach(co => {
          co.trajets = JSON.parse(co.trajets)
        });
        console.log("updateCommandes")
        console.log(commandes)
    }
</script>
<div class=" w-100">
  <Button class="colored" on:click={updateCommandes}>
    <img src={'images/icons/reload.svg'} alt="reload" width="20" height="20"/>
  </Button>
  <TabContent id="TabPanneau" on:tab={(ev) => $viewAdmin = ev.detail}>
    {#each qgs as qg}
      <TabPane tabId={qg.nom} tab={qg.nom} active={$viewAdmin===qg.nom}>
        <TableCommandes commandes={commandes.filter(co => co.QGNom === qg.nom)} livreurs={livreurs.filter(liv => liv.QGNom === qg.nom)} qgs={qgs} updateCommandes={updateCommandes}/>
      </TabPane>   
    {/each}
  </TabContent>  
</div>

<style>
:global(#TabPanneau){
  width: 100%;
}
</style>

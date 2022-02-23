<script>
	import { onMount } from "svelte";
    import {getCommandes} from '../../../api/commande'
    import {getLivreurs} from '../../../api/livreur'
    import {TabPane, TabContent} from 'sveltestrap'
    import TableCommandes from "./table_commandes.svelte";
    import {viewAdmin} from "../../../stores"
    let commandes = []
    let livreurs = []
    onMount(async () => {
        commandes = await getCommandes()
        livreurs = await getLivreurs()
        
})
</script>

<TabContent id="TabPanneau" on:tab={(ev) => $viewAdmin = ev.detail}>
  <TabPane tabId="AA" tab="AA" active={$viewAdmin==="AA"}>
    <TableCommandes commandes={commandes.filter(co => co.QGNom === "AA")} livreurs={livreurs.filter(liv => liv.QGNom === "AA")}/>
  </TabPane>
  <TabPane tabId="PPM" tab="PPM" active={$viewAdmin==="PPM"}>
    <TableCommandes commandes={commandes.filter(co => co.QGNom === "PPM")} livreurs={livreurs.filter(liv => liv.QGNom === "PPM")}/>
  </TabPane>
  <TabPane tabId="SMH" tab="SMH" active={$viewAdmin==="SMH"}>
    <TableCommandes commandes={commandes.filter(co => co.QGNom === "SMH")} livreurs={livreurs.filter(liv => liv.QGNom === "SMH")}/>
  </TabPane>
</TabContent>

<style>
:global(#TabPanneau){
  width: 70%;
}
</style>

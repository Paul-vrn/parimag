<script>
	import { onMount } from "svelte";
    import {getCommandes} from '../../../api/commande'
    import {TabPane, TabContent} from 'sveltestrap'
    import TableCommandes from "./table_commandes.svelte";
    let commandes = []
    onMount(async () => {
        commandes = await getCommandes()
        console.log(commandes)
    })
</script>

<TabContent id="TabPanneau">
  <TabPane tabId="AA" tab="AA" active>
    <TableCommandes commandes={commandes.filter(co => co.QGNom === "AA")}/>
  </TabPane>
  <TabPane tabId="PPM" tab="PPM">
    <TableCommandes commandes={commandes.filter(co => co.QGNom === "PPM")}/>
  </TabPane>
  <TabPane tabId="SMH" tab="SMH">
    <TableCommandes commandes={commandes.filter(co => co.QGNom === "SMH")}/>
  </TabPane>
</TabContent>

<style>
:global(#TabPanneau){
  width: 65%;
}
</style>

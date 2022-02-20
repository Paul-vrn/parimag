<script>
import { Table, Button } from 'sveltestrap';
let commandes = []
import { onMount } from 'svelte';
import {getCommandes} from '../../../api/commande'

onMount(async () => {
        const res = await getCommandes();
        commandes = res.filter(co => co.etat !== "LV");
    });

	const etat = {
		"LV":"Livrée",
		"EAP":"En attente de payement",
		"CPC":"Commande prise en charge"
	}
	
</script>

<main id="commandes">
	<h1>Commandes</h1>
	<Table>
		<thead>
			<tr>
				<th><Button>Reload</Button></th>
				<th>Code</th>
				<th>État</th>
			</tr>
		</thead>
		<tbody>
			{#each commandes as commande, i (commande.code)}
				<tr>
					<th>{i+1}</th>
					<th>{commande.code}</th>
					<th>{etat[commande.etat]}</th>
				</tr>
			{/each}
		</tbody>
	</Table>
</main>

<style>
	main#commandes {
		margin-top: 115px;
	}
</style>
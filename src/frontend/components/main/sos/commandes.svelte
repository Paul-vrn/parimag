<script>
import { Table, Button } from 'sveltestrap';
let commandes = []
import { onMount } from 'svelte';

onMount(async () => {
        const res = await getCommandes();
        commandes = res;
    });

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
					<th>{commande.etat}</th>
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
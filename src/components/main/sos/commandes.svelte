<script>
import { ListGroup, ListGroupItem } from 'sveltestrap';
let commandes = ["a", "b", "c", "d"]

</script>

<main id="commandes">
	<h1>Commandes</h1>
	<ListGroup flush class="mx-5">
		<ListGroupItem>
			<p>id</p>
			<p>État</p>
			<p>Temps d'attente estimé</p>
			<p>id</p>
		</ListGroupItem>
		{#each commandes as commande, index}
			<ListGroupItem>
				<p>{commande}</p>
			</ListGroupItem>
		{/each}
	</ListGroup>
</main>

<style>
</style>
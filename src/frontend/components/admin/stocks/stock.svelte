<script>
    import { onMount } from 'svelte';
    import {Table, Button} from 'sveltestrap'
    function reload() {

    }
    const stocks = []
    onMount(async ()=> {
        //stocks = await getStocks();
    })
</script>


<div>
    <Table>
		<thead>
			<tr>
				<th><Button on:click={reload}>Reload</Button></th>
                {#each stocks as stock}
                    <th>{stock.QGNom}</th>
                {/each}
            </tr>
		</thead>
		<tbody>
			{#each stocks as stock, i (stock.id)}
				<tr>
                    <th>{stock.produitId}</th>
                </tr>
			{/each}
		</tbody>
	</Table>
</div>

<style>

</style>
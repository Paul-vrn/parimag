<script>
    import { onMount } from 'svelte';
    import {Table, Button, Input} from 'sveltestrap'
    import { getStocks, updateStock } from '../../../api/stock'
    async function reload() {
        const res = await getStocks();
        let j = 0
        for (let i = 0; i < res.length; i += 3) {
            rows[j] = [res[i], res[i+1], res[i+2]]
            j++
        }
    }
    let rows = []
    onMount(async ()=> {
        const res = await getStocks();
        let j = 0
        for (let i = 0; i < res.length; i += 3) {
            rows[j] = [res[i], res[i+1], res[i+2]]
            j++
        }
    })
    function submit(event){
        if (event.key === "Enter"){
            updateStock(event.target.id, {quantite:event.target.value})
            .then(res => {
                console.log(res)
                //TODO ajouter un toast
            })
        }
    }
</script>

<Table bordered>
    <thead>
        <tr>
            <th><Button on:click={reload}>Reload</Button></th>
            <th>AA</th>
            <th>PPM</th>
            <th>SMH</th>
        </tr>
    </thead>
    <tbody>
        {#each rows as row, i}
            <tr>
                <th>{row[0].produit.nom}</th>
                {#each row as stock}
                    <th><Input value={stock.quantite} id={stock.id} on:keydown={submit}/></th>
                {/each}
            </tr>
        {/each}
    </tbody>
</Table>

<style>
    :global(table){
        width: 30% !important;
        height: auto;
    }
    :global(table input) {
        width:50px;
        text-align: end;
    }
</style>
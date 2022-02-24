<script>
    import { onMount } from 'svelte';
    import {Table, Button, Input} from 'sveltestrap'
    import { getStocks, updateStock } from '../../../api/stock'
    import { getQGs } from '../../../api/qg'
    import { Toasts, addToast } from 'as-toast';

    async function reload() {
        const res = await getStocks();
        let j = 0
        for (let i = 0; i < res.length; i += 3) {
            rows[j] = [res[i], res[i+1], res[i+2]]
            j++
        }
    }
    let qgs = []
    let rows = []
    onMount(async ()=> {
        const res = await getStocks();
        let j = 0
        for (let i = 0; i < res.length; i += 3) {
            rows[j] = [res[i], res[i+1], res[i+2]]
            j++
        }
        qgs = await getQGs()
    })
    function submit(event){
        if (event.key === "Enter"){
            updateStock(event.target.id, {quantite:event.target.value})
            .then(res => {
                console.log(res)
                if (res.error !== undefined){
                    addToast(res.error.message, "warn", 2000)
                } else {
                    addToast("Stock bien mis à jour", "info", 2000)
                }
            })
        }
    }
</script>

<Toasts/>
<Table bordered>
    <thead>
        <tr>
            <th>
                <Button on:click={reload} size="sm"><img src={'images/icons/reload.svg'} alt="reload" width="20" height="20"/></Button>
            </th>
            {#each qgs as qg}
                <th>{qg.nom}</th>
            {/each}
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
        width: 80% !important;
        height: auto;
    }
    :global(table input) {
        width:50px;
        text-align: end;
    }
</style>
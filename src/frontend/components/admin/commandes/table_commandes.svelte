<script>
	import { onMount } from "svelte";
    import {Table, Button, Input} from 'sveltestrap'
    export let commandes;
    console.log("commandes"+commandes)
    function validate(){

    }
    function livred(){

    }
</script>

<Table bordered class="w-100">
    <thead>
        <tr>
            <th>#</th>
            <th>etat</th>
            <th>adresse</th>
            <th>tel</th>
            <th>Valider le payement</th>
            <th>Valider la livraison</th>
        </tr>
    </thead>
    <tbody>
        {#each commandes as commande}
            <tr>
                <th>{commande.code}</th>
                <th>
                    {commande.etat}
                </th>
                <th>{commande.adresse}</th>
                <th>{commande.tel}</th>
                <th><Button on:click={validate(commande)} color="primary">
                    <img src={'images/icons/check.svg'} alt="validate" width="20" height="20"/>
                </Button>
                </th>
                <th><Button on:click={livred(commande)} color="secondary">
                        <img src={'images/icons/check.svg'} alt="validate" width="20" height="20"/>
                    </Button>
                </th>
            </tr>
        {/each}
    </tbody>
</Table>
<style>

</style>

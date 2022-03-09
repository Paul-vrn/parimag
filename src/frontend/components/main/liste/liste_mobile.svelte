<script>
    import { onMount } from "svelte";
    import { getListe } from "../../../api/getListe";
    import { Accordion, AccordionItem, Image } from 'sveltestrap';
    import MembreMobile from "./membre/membre_mobile.svelte"
    let liste = []; // table qui contient le liste.json
    let poleSelected;
    let membres=[];
    onMount(async () => {
      const res = await getListe();
      liste = res;
      poleSelected = liste[0].nom
      membres = liste[0].membres
    });
    function changePole(e, pole){
        console.log(e.detail)
        window.scrollTo(0,0)
    }
  </script>
  
<main id="liste" class="d-flex">
    <Accordion on:toggle={changePole} id="accordion">
        {#each liste as pole}
            <AccordionItem header={pole.nom} id={pole.nom} on:toggle={(e) => changePole(e, pole)}>
                <Image alt="Photo de {pole.photo}" src={`images/liste/${pole.photo}.jpg`} class="w-100"/>
                {#each pole.membres as membre}
                    <MembreMobile membre={membre}/>
                {/each}
            </AccordionItem>
        {/each}
    </Accordion>
</main>
  
<style>
:global(div#accordion) {
    padding-top: 85px;
    width: 100%;
}
:global(.accordion-header button){
    color: #D7C378 !important;
    background-color: #D7C378;
    font-size: 1.2em;
}
:global(.accordion-header button.collapsed){
    background-color: white !important;
}
:global(.accordion-button:not(.collapsed)){
    background-color: white !important;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
}
:global(.accordion-header .accordion-button:focus){
    border-color: #D7C378 !important;
    box-shadow: 0 0 0 0.25rem rgb(215 195 120 / 25%) !important;
}
:global(.accordion-body){
    padding: 0 !important;
}

</style>
  
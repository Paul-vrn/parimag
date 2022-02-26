<script>
  import { onMount } from "svelte";
  import { getListe } from "../../../api/getListe";
  import Membre from "./membre/membre.svelte";
  let liste = []; // table qui contient le liste.json
  let poleSelected;
  let membres=[];
  onMount(async () => {
    const res = await getListe();
    liste = res;
    console.log(liste);
    poleSelected = liste[0].nom
    membres = liste[0].membres
  });
  function changePole(val){
    poleSelected = val
    membres = liste.find(pl => pl.nom===poleSelected).membres
    window.scrollTo(0,0); 

}
</script>

<main id="liste" class="d-flex">
  <!-- TODO : page de la liste -->
  <div class="sidebar">
    {#each liste as pole}
      <div class={"pole " + ((poleSelected===pole.nom)?'poleSelect':'')} on:click={changePole(pole.nom)}>
        <h4 class="m-0 p-0" on:click={changePole(pole.nom)}>{pole.nom}</h4>
      </div>
    {/each}
  </div>
  <div class="content pt-2">
    {#each membres as membre,i}
      <Membre membre={membre} sens={i%2==0}/>
    {/each}
  </div>
</main>

<style>
  main#liste {
    width: 100%;
    padding-top: 85px;
    background-color: #d7c378;

  }

  .sidebar {
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 17%;
    height: calc(100vh - 85px);
    background-color: white;
  }
div.sidebar div {
  flex-shrink: 0;
  flex-grow: 1;
}
div.sidebar div.poleSelect {
  background-color: #d7c378;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
}

div.content {
  background-color: #d7c378;
  width: 83%;
  margin-left: auto;
  min-height: 100vh;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 30px;
}
  :global(.pole) {
    text-align: center;
    font-family: Paris2024Regular;
    cursor: pointer;
    height: 55px;
    vertical-align: middle;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  :global(.pole:hover){
    background-color: #d7c378;
    border-style: solid;
    animation: PoleKeyFrame 0.4s forwards;
    border-color: white;
  }
  @keyframes PoleKeyFrame {
    from {
      box-shadow: inset 0px 0px 0px rgba(0, 0, 0, 0.25);;
      border-width: 0.4em;

    }
    to {
      border-width: 0.5em;
      box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
  }

</style>

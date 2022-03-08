<script>
  import { onMount } from "svelte";
  import { getListe } from "../../../api/getListe";
  import Membre from "./membre/membre.svelte";
  let liste = []; // table qui contient le liste.json
  let poleSelected = {
    membres:[]
  };
  onMount(async () => {
    const res = await getListe();
    liste = res;
    poleSelected = liste[0]
  });
  function changePole(val){
    poleSelected = val
    window.scrollTo(0,0); 
}
</script>

<main id="liste" class="d-flex">
  <!-- TODO : page de la liste -->
  <div class="sidebar">
    {#each liste as pole}
      <div class={"pole " + ((poleSelected.nom===pole.nom)?'poleSelect':'')} on:click={changePole(pole)}>
        <h4 class="m-0 p-0" on:click={changePole(pole)}>{pole.nom}</h4>
      </div>
    {/each}
  </div>
  <div class="content">
      <img alt="Photo de {poleSelected.photo}" src={`images/liste/${poleSelected.photo}.jpg`} class="photo_pole"/>
    <hr class="w-75 mx-auto"/>
    {#each poleSelected.membres as membre,i}
      <Membre membre={membre} sens={i%2==0}/>
      <hr class="w-50 mx-auto"/>
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
.photo_pole {
  max-width: 80%;
  text-align: center;
  box-shadow: inset 0px 0px 150px 75px rgba(0, 0, 0, 0.5);
  filter: drop-shadow(0px 5px 20px rgba(0, 0, 0, 0.5));
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
  align-items: center;
  padding-top: 2em;
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

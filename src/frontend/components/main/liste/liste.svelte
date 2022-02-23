<script>
  import { onMount } from "svelte";
  import { getListe } from "../../../api/getListe";
  import Membre from "./membre/membre.svelte";
  let liste = []; // table qui contient le liste.json
  onMount(async () => {
    const res = await getListe();
    liste = res;
    console.log(liste);
  });
</script>

<main id="liste">
  <!-- TODO : page de la liste -->
  <div class="sidebar">
    <div class="pole"><div class="hovered_pole">Prez</div></div>
    <div class="pole"><div class="hovered_pole">SOS</div></div>
    <div class="pole"><div class="hovered_pole">Film</div></div>
    <div class="pole"><div class="hovered_pole">Com'</div></div>
    <div class="pole"><div class="hovered_pole">Rap</div></div>
    <div class="pole"><div class="hovered_pole">Paris</div></div>
    <div class="pole"><div class="hovered_pole">Trez'</div></div>
    <div class="pole"><div class="hovered_pole">Chorée</div></div>
    <div class="pole"><div class="hovered_pole">Activités</div></div>
    <div class="pole"><div class="hovered_pole">Goodies</div></div>
  </div>
</main>

<style>
  main#liste {
    width: 100%;
    height: 100vh;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    background-color: #d7c378;
    width: 10%;
    height: 100%;
    justify-content: space-between;
    padding-top: 69px;
  }

  .pole {
    text-align: center;
    font-family: Paris2024Regular;
    cursor: pointer;
    height: 55px;
    vertical-align: middle;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .hovered_pole {
    height: 90%;
    width: 90%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .hovered_pole:hover {
    background-color: whitesmoke;
  }
  @font-face {
    font-family: Paris2024Regular;
    src: url("../../../../../public/fonts/Paris2024Regular.ttf");
  }

  @font-face {
    font-family: VarelaRound;
    src: url("../../../../../public/fonts/VarelaRound.ttf");
  }
</style>

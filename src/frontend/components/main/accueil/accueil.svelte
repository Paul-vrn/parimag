<script>
  import Blogs from "./blog/blogs.svelte";
</script>

<main id="accueil" class="container-fluid p-0">
  <div class="d-flex justify-content-center flex-column">
    <div class="mb-5">
      <h1 class="text-center varela">LISTE BDS PAR'IMAG 2024</h1>
      <hr class="bg-white w-75 mx-auto my-5 " />
      <p class="text-center w-75 mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Massa tincidunt dui
        ut ornare. Vel quam elementum pulvinar etiam non quam. Egestas purus
        viverra accumsan in. Tempus imperdiet nulla malesuada pellentesque.
      </p>
    </div>
    <div id="svg">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"
        ><path
          fill="#D7C378"
          fill-opacity="1"
          d="M0,32L80,53.3C160,75,320,117,480,133.3C640,149,800,139,960,112C1120,85,1280,43,1360,21.3L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        />
        <text
          class="varela"
          x="50%"
          y="75%"
          dominant-baseline="middle"
          text-anchor="middle">Notre Blog</text
        >
        <text
          class="varela"
          x="50%"
          y="80%"
          dominant-baseline="middle"
          text-anchor="middle">ˬ</text
        >
      </svg>
    </div>
  </div>
</main>
<Blogs />

<style>
  main#accueil {
    background-image: url("/images/fond.png");
    background-color: #d7c378;

    background-repeat: no-repeat;
    box-shadow: inset 0px 5px 10px rgba(0, 0, 0, 0.5);
    background-size: 100%;
  }
  main#accueil > div {
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    box-shadow: inset 0px 5px 10px rgba(0, 0, 0, 0.5);
  }
  main#accueil > div div#svg {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  main#accueil > div h1 {
    font-style: normal;
    font-weight: normal;
    font-size: 3em;
    color: #ffffff;
  }
  main#accueil > div text {
    font-style: normal;
    font-weight: normal;
    font-size: 2.5em;
    fill: #ffffff;
  }
  main#accueil > div p {
    color: #ffffff;
    font-size: 1.2em;
  }

  @media (max-width: 640px) {
    main#accueil {
      background-size: auto;
    }
    main#accueil h1 {
      width: 80%;
      margin-right: auto;
      margin-left: auto;
    }
  }
</style>

<script>
  import Blogs from "./blog/blogs.svelte";
</script>

<main id="accueil" class="container-fluid p-0">
  <div class="d-flex justify-content-center flex-column">
    <div class="mb-5">
      <h1 class="text-center varela">LISTE BDS PAR'IMAG 2024</h1>
      <hr class="bg-white w-75 mx-auto my-5 " />
      <p class="text-center w-50 mx-auto">
        La relève est assurée pour vous faire découvrir une autre facette du sport. Équipe motivée et soudée, les Golds débarquent à l’Ensimag pour casser des records. 
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


<footer class="py-3 mt-auto">
	<div class="mb-2">
		<a target="_blank" href="https://www.facebook.com/profile.php?id=100078652846582">
			<img src={'images/icons/facebook_white.png'} width="50px" height="50px" alt="facebook"/>
		</a>
		<a target="_blank" href="https://www.instagram.com/parimag_2024/">
			<img src={'images/icons/instagram_white.png'} width="50px" height="50px" alt="instagram"/>
		</a>
		<a target="_blank" href="https://www.youtube.com/channel/UCXfbbgSwqXX-as6WQIj01yw">
			<img src={'images/icons/youtube_white.png'} width="50px" height="50px" alt="youtube"/>
		</a>
		<a target="_blank" href="https://github.com/Paul-vrn/benzimag">
			<img src={'images/icons/github_white.png'} width="50px" height="50px" alt="github"/>
		</a>	
	</div>
	<h3 class="p-0 m-0">PAR'IMAG 2024</h3>
</footer>
<style>
footer {
	background-color: rgba(38,38,38,1);
	color: white;
	text-align: center;
	z-index: 5;
	position: absolute;
	width: 100%;
}
footer div {
	display: flex;
	justify-content: space-around;
	align-items: center;
}
  main#accueil {
    background-image: url("/images/fond.jpg");
    background-color: #d7c378;
    background-position: center;

    background-repeat: no-repeat;
    box-shadow: inset 0px 5px 10px rgba(0, 0, 0, 0.5);
    background-size: 100%;
  }
  main#accueil > div {
    position: relative;
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
    font-size: 3rem;
    fill: #ffffff;
  }
  main#accueil > div p {
    color: #ffffff;
    font-size: 1.2em;
  }

  @media (max-width: 1000px) {
    main#accueil {
      background-size: cover;
    }
    main#accueil h1 {
      width: 80%;
      margin-right: auto;
      margin-left: auto;
    }
    main#accueil > div text {
      font-size: 5rem;
    }
  }
</style>

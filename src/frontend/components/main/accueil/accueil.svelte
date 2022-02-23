<script>
	import Blogs from './blog/blogs.svelte'
</script>
<main id="accueil" class="container-fluid p-0">
	<div class="d-flex justify-content-center flex-column">
		<div class="mb-5">
			<h1 class="text-center varela">LISTE BDS PAR'IMAG 2024</h1>
			<hr class="bg-white w-75 mx-auto my-5 "/>
			<p class="text-center w-75 mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa tincidunt dui ut ornare. Vel quam elementum pulvinar etiam non quam. Egestas purus viverra accumsan in. Tempus imperdiet nulla malesuada pellentesque.</p>	
		</div>
		<div id="svg">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#D7C378" fill-opacity="1" 
				d="M0,256L40,234.7C80,213,160,171,240,144C320,117,400,107,480,128C560,149,640,203,720,192C800,181,880,107,960,74.7C1040,43,1120,53,1200,74.7C1280,96,1360,128,1400,144L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
				<text class="varela" x="50%" y="75%" dominant-baseline="middle" text-anchor="middle">Notre Blog</text>    
				<text class="varela" x="50%" y="80%" dominant-baseline="middle" text-anchor="middle">ˬ</text>    
			</svg>
		</div>
	</div>
				
</main>
<Blogs/>
<style>

main#accueil{
	background-image: url("/images/fond.png");
	background-color: #D7C378;

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
	color: #FFFFFF;
}
main#accueil > div text {
	font-style: normal;
	font-weight: normal;
	font-size: 2.5em;
	fill: #FFFFFF;
}
main#accueil > div p {
	color: #FFFFFF;
	font-size: 1.2em;
}

@media (max-width: 640px) {
	main#accueil{
	background-size: auto;
	}
	main#accueil h1 {
		width:80%;
		margin-right: auto;
		margin-left: auto;
	}
}
</style>
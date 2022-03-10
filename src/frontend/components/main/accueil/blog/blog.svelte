<script>
    import Youtube from 'svelte-youtube'
    export let blog;
    let options = {
        width:'100%',
        height:'500px',
        controls:'2'
    }
</script>

{#if blog.photo !== undefined}
<div class="blog d-flex justify-content-end flex-column" style="background-image: url(/images/blog/{blog.photo}">
    <h1 class="text-center">{blog.titre}</h1>
</div>
{:else}
<div class="blog d-flex justify-content-end flex-column" style="overflow: hidden;">
    <iframe width="100%" height="100%" src={blog.video} title="YouTube video player" on:click={() => console.log("click video")}
    frameborder="0"
    showinfo="0"
    controls="0"
    autohide="1"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

{/if}

<style>
div.blog {
    width: 500px;
    height: 500px;
    background-size:cover;
    background-position: center;
    background-repeat: no-repeat;
    border-style: solid;
    box-shadow: inset 0px 0px 150px 75px rgba(0, 0, 0, 0.5);
    filter: drop-shadow(0px 5px 20px rgba(0, 0, 0, 0.5));
    border-radius: 1em;
    margin-bottom: 10%;
}
div.blog h1 {
    color: white;
    font-family:Paris2024Regular;
    margin-bottom: 0.5em;
}

@media (max-width: 640px) {
	div.blog {
        width: 80%;
        height: 40vh;
    }
}

</style>
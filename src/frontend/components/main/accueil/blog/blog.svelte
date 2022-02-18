<script>
    export let blog;
</script>


<div class="blog d-flex justify-content-end flex-column" style="background-image: url(/images/{blog.photo}.jpg">
    <h1 class="text-center">{blog.titre}</h1>
</div>

<style>
div.blog {
    width: 500px;
    height: 500px;
    border-style: solid;
    background-size:cover;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: inset 0px 0px 150px 75px rgba(0, 0, 0, 0.5);
    filter: drop-shadow(0px 5px 20px rgba(0, 0, 0, 0.5));
    border-radius: 1em;
    margin-bottom: 10%;
}
div.blog h1 {
    color: white;
    font-family:Paris2024Regular;
}

@media (max-width: 640px) {
	div.blog {
        width: 80%;
        height: 20em;
    }
}

</style>
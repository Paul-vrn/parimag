<script>
    import { onMount } from "svelte";
    import { getBlogs } from '../../../../api/getBlogs'
    let blogs = [];
    onMount(async () => {
        const res = await getBlogs();
        blogs = res;
    });

</script>


<div id="blog">
    <div>
        {#each blogs as blog}
            <div class="blog">
                <h1>{blog.titre}</h1>
            </div>
        {/each}
    </div>
</div>

<style>

div#blog {
    widows: 100%;
    background-color: #D7C378;
}
div#blog > div {
    padding-top: 115px;
    width:100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap:8%;
}
div#blog > div div {
    width: 500px;
    height: 500px;
    border-style: solid;
    border-radius: 1em;
    margin-bottom: 10%;
}

</style>
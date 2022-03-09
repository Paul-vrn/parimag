<script>
    import { onMount } from "svelte";
    import { getBlogs } from '../../../../api/getBlogs'
    import Blog from './blog.svelte'
    let blogs = [];
    onMount(async () => {
        const res = await getBlogs();
        blogs = res;
        console.log(blogs)
    });
</script>


<div id="blog">
    <div>
        {#each blogs as blog}
            <Blog blog={blog}/>
        {/each}
    </div>
</div>

<style>

div#blog {
    widows: 100%;
    background-color: #D7C378;
}
div#blog > div {
    padding-top: 120px;
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
    background-image: url("/images/blog_1.jpg");
    background-size:cover;
    background-position: center;
    background-repeat: no-repeat;

    box-shadow: inset 0px 0px 150px 75px rgba(0, 0, 0, 0.5);
    filter: drop-shadow(0px 5px 20px rgba(0, 0, 0, 0.5));
    border-radius: 1em;
    margin-bottom: 10%;
}

</style>
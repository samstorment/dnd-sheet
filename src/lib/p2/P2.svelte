<script>
    import TextArea from "$lib/TextArea.svelte";
    import Allies from "./Allies.svelte";
import Header from "./Header.svelte";

</script>
<article class="shadow-lg shadow-zinc-700 flex flex-col rounded-md print:rounded-none">
    <Header />

    <div class="main-grid">
        <section class="appearance">
            <TextArea name="Character Appearance" class="h-full rounded-md" />
        </section>
        <section class="story">
            <TextArea name="Character Backstory" class="h-full rounded-md" />
        </section>
        <section class="allies">
            <Allies />
        </section>
        <section class="additional">
            <TextArea name="Additional Features & Traits" class="h-full rounded-md" />
        </section>
        <section class="treasure">
            <TextArea name="Treasure" class="h-full rounded-md" />
        </section>
    </div>
</article>

<style>
    .main-grid {
        display: grid;
        gap: .5rem;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1.5fr 1.5fr 1fr;
        height: 100%;
        grid-template-areas: 
            "appearance allies allies"
            "story additional additional"
            "story treasure treasure";
    }

    .appearance { grid-area: appearance; }
    .story { grid-area: story; }
    .allies { grid-area: allies; }
    .additional { grid-area: additional; }
    .treasure { grid-area: treasure; }
    
    .main-grid > * {
        @apply bg-zinc-100 rounded-md;
    }


</style>
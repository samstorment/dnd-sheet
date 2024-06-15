<script>
    const { level = 1, class: className = '' } = $props();

</script>


<div class="flex items-center mb-1 {className}">
    <p class="level relative text-xl font-bold text-zinc-600 border border-zinc-800 py-2 px-3 rounded-lg bg-white" data-level={level}>{level}</p>
    {#if level > 0}
        <div class="flex">
            <div class="relative">
                <label 
                    for="slots_total_{level}" 
                    class="text-xs text-zinc-400 absolute bottom-full left-1/2 font-bold -translate-x-1/2 text-center"
                    class:sr-only={level !== 1}
                >
                    Slots Total
                </label>
                <input type="number" id="slots_total_{level}" class="w-full p-1 flex-[3] text-center border-y border-zinc-800 font-bold text-zinc-600">
            </div>
            <div class="relative">
                <label 
                    for="slots_expended_{level}" 
                    class="text-xs text-zinc-400 absolute bottom-full left-1/2 font-bold -translate-x-1/2 text-center"
                    class:sr-only={level !== 1}
                >
                    Slots Expended
                </label>
                <input type="number" id="slots_expended_{level}" class="w-full p-1 flex-[4] text-center border border-zinc-800 rounded-r-full font-bold text-zinc-600">
            </div>
        </div>
    {:else}
        <div class="border-y border-r border-zinc-600 w-full p-1 rounded-r-full uppercase text-zinc-600 font-bold text-center">Cantrips</div>
    {/if}
</div>



<style lang="postcss">

    [data-level='1']::before {
        content: 'SPELL LEVEL';
        position: absolute;
        width: 3.5rem;
        bottom: calc(100% + .2rem);
        left: 0;
        line-height: 1;
        font-size: .7rem;
        @apply text-zinc-400;
    }
</style>
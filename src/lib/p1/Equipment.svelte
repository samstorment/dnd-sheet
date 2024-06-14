{#snippet currency(type)}
    <div class="flex -translate-x-2 w-fit items-center">
        <label for={type} class="text-xs text-zinc-600 font-bold border border-zinc-600 leading-none bg-white w-8 py-2 text-center rounded-md">{type}</label>
        <input type="number" class="w-16 border-r border-y border-zinc-600 rounded-r-md leading-none p-1 text-xs text-center font-bold">
    </div>
{/snippet}

<div class="flex flex-col border border-zinc-800 rounded-md p-1 h-full gap-1">
    <div class="flex flex-1">
        <div class="flex flex-col gap-2 py-2">
            {#each [ 'CP', 'SP', 'EP', 'GP', 'PP' ] as c}
                {@render currency(c)}
            {/each}
        </div>
        <textarea id="equipment" class="p-1 w-full resize-none text-xs"></textarea>
    </div>
    <label for="equipment" class="font-bold text-zinc-600 uppercase block text-center text-xs w-full">Equipment</label>
</div>



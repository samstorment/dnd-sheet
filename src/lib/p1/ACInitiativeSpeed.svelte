<script lang="ts">
    const { label }: { label: string } = $props();

    const ac = label === 'Armor Class';
    const id = label.replaceAll(' ', '_').toLowerCase();
</script>

<div class:ac class="flex flex-col border border-zinc-800 flex-1 rounded-md"
    class:rounded-b-[100px]={ac}
>
    <div class="px-1 pt-1">
        <input id={id} type="number" class="w-full text-center h-10 text-xl font-bold">
    </div>
    {#if ac}
        <label for={id} class="text-zinc-600 font-bold text-xs w-1/2 py-1 text-center mx-auto leading-none">{label}</label>
    {:else}
        <label for={id} class="text-zinc-600 font-bold text-xs py-1 text-center flex-1 flex items-center justify-center">{label}</label>
    {/if}
</div>



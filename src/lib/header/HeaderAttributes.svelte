<script lang="ts">
    import { domify, isAlphanumeric } from "$lib";

    const { fields }: { fields: string[] } = $props();
</script>

<section class="grid grid-cols-3 gap-2">
    {#each fields as f}
        <div class="flex flex-col">
            <input type="text" id={domify(f)} class="p-1 text-xs">
            <label class="text-zinc-600 uppercase text-xs font-bold" for={domify(f)}>
                {f}
            </label>
        </div>
    {/each}
</section>
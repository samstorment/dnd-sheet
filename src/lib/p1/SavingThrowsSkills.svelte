<script lang="ts">
    import { Lock, LockOpen } from "lucide-svelte";

    const { list = $bindable(), type, class: className = '' }: Props = $props();

    let locked = $state(false);

    interface Props {
        type: string;
        class?: string;
        list: Array<{
            name: string; paren?: string;
        }>
    }
</script>


{#snippet row({ name, paren })}
    <div class="flex">
        <input type="checkbox" class="w-4 h-4" name={type.replaceAll(' ', '_').toLowerCase()} value="{name}" disabled={locked}>
        <input type="number" class="w-6 h-4 border-b border-zinc-600 text-sm text-center bg-transparent" disabled={locked}>
        <label for="{name.toLowerCase()}_save" class="text-xs leading-normal">
            {name}
            {#if paren}
                <span class="text-xs text-zinc-600 ml-auto">({paren})</span>
            {/if}
        </label>
    </div>
{/snippet}

<div class="flex flex-col justify-between border border-zinc-800 p-1 rounded-md text-zinc-800 group {className}">
    {#each list as l}
        {@render row(l)}
    {/each}

    <div class="flex gap-1 justify-between">
        <button class="text-xs print:invisible text-zinc-400 group-hover:text-inherit group-focus-within:text-inherit" onclick={() => locked = !locked}>
            {#if locked}
                <Lock class="w-4 h-4"/>
            {:else}
                <LockOpen class="w-4 h-4"/>
            {/if}
        </button>
        <p class="text-xs font-bold text-zinc-600 uppercase mt-1">{type}</p>
        <span class="w-4"></span>
    </div>
</div>

<script>
    import { domify } from "$lib";
    import Header from "$lib/header/BaseHeader.svelte";
    import HeaderLeft from "$lib/header/HeaderLeft.svelte";
    import HeaderRight from "$lib/header/HeaderRight.svelte";

</script>

{#snippet spellStat(label)}
    <div class="flex flex-col align-center gap-1">
        <input type="text" id={domify(label)} class="w-full px-1 py-4 border border-zinc-600 rounded-3xl text-center font-bold text-xl">
        <label for={domify(label)} class="text-center text-xs uppercase text-zinc-600 font-bold">{label}</label>
    </div>
{/snippet}

<Header>
    <HeaderLeft label="Spellcasting Class" />
    <HeaderRight>
        <div class="flex gap-4 px-4">
            {#each [ 'Spellcasting Ability', 'Spell Save DC', 'Spell Attack Bonus'] as s}
                {@render spellStat(s)}
            {/each}
        </div>
    </HeaderRight>
</Header>
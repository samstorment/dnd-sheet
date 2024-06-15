<script lang="ts">
    import { domify } from "$lib";

    const { label }: { label: string } = $props();
</script>


<section class="flex flex-col min-w-[275px]">
    <textarea id={domify(label)} class="text-lg border border-zinc-600 py-1 px-2 text-center rounded-md resize-none"></textarea>
    <label class="text-zinc-600 uppercase text-xs font-bold" for={domify(label)}>{label}</label>
</section>
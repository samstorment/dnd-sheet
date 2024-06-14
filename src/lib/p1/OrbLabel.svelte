<script lang="ts">
    const { label }: Props = $props();

    interface Props {
        label: string;
    }

    const name = label.replaceAll(' ', '_').toLowerCase();
</script>

<div class="flex items-center border-y border-r border-zinc-800 rounded-md h-8">
    <input class="rounded-md w-12 h-9 border border-zinc-800 text-center text-lg font-bold" type="text" id={name}>
    <label class="text-xs uppercase font-bold text-zinc-600 px-1 w-full" for={name}>{label}</label>
</div>
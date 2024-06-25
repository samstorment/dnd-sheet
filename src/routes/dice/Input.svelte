
<script lang="ts">
    import { tick } from "svelte";
    import { scanner, type Token } from "./scanner";
    import SyntaxHighlight from "./SyntaxHighlight.svelte";

    let q = $state('');
    let tokens: Token[] = $derived(scanner(q).scan());

    let textarea: HTMLTextAreaElement;

    let scroll = $state(0);
</script>

<div class="p-4 bg-zinc-950 h-screen isolate">
    <div class="relative text-5xl ring-zinc-600 focus-within:ring-8 overflow-hidden rounded-md">
        <SyntaxHighlight {tokens} {scroll} />
        <div class="absolute inset-0 bg-zinc-800 -z-20"></div>
        <textarea 
            bind:value={q} 
            bind:this={textarea}
            rows="1"
            spellcheck="false"
            class="w-full p-4 text-transparent caret-zinc-400 bg-transparent font-mono max-h-[12ex] resize-none" 
            onscroll={e => {
                scroll = textarea.scrollTop;
            }}
            oninput={async () => {
                textarea.style.removeProperty('height');
                textarea.style.height = `${textarea.scrollHeight}px`;
            }}
            onkeypress={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    textarea.closest("form")?.submit();
                }
            }}
        ></textarea>
    </div>
</div>

<!-- <pre>{JSON.stringify(tokens, null, 2)}</pre> -->
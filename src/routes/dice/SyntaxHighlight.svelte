<script lang="ts">
    import type { Token } from "./scanner";

    let { tokens, scroll }: { tokens: Token[], scroll: number } = $props();
</script>


<pre 
    style="translate: 0 -{scroll}px;"
    class="absolute p-4 w-full -z-10">{#each tokens.filter(t => t.type !== 'eof') as t}<span data-token={t.type}>{t.lexeme}</span>{/each}</pre>


<style>

    pre {
        white-space: preserve;
        word-wrap: break-word;
    }


    [data-token='number'] {
        color: hsl(200, 50%, 55%);
    }

    [data-token='dice'] {
        color: hsl(50, 50%, 55%);
        text-shadow:
            0 0 7px black,
            0 0 10px hsl(50, 100%, 60%),
            0 0 20px hsl(50, 100%, 65%);
    }
   
    [data-token='garbage'] {
        color: hsl(0, 0%, 30%);
    }

    :is([data-token='*'], [data-token='/'], [data-token='+'], [data-token='-']) {
       color: hsl(0, 0%, 80%);
    }

    :is([data-token='('], [data-token=')']) {
       color: hsl(300, 50%, 55%);
    }   
</style>
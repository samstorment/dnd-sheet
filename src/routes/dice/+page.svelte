<script lang="ts">
    import { fly, scale, slide } from "svelte/transition";
    import { scanner, type Token } from "./scanner";
    import { rand } from "$lib";
    import { Smile, Frown, Dices, Repeat2 } from "lucide-svelte";
    import SyntaxHighlight from './SyntaxHighlight.svelte';

    let q = $state('');
    let _scanner = $derived(scanner(q));
    let tokens = $derived(_scanner.scan());
    let useful = $derived(tokens.filter(t => t.type !== "garbage"));
    let expanded: Token[] = $state([]);

    let scroll = $state(0);

    let show = $state(false);

    let empty = $derived(q.trim() === '');

    let result = $derived.by(() => {
        const str = expanded
            .filter(t => t.type !== 'eof')
            .map(t => t.lexeme)
            .join(' ');

        try {
            return window.eval(str);
        } catch {
            return undefined;
        }
    });

    let smile = $derived(result !== undefined && !show);
    let frown = $derived(result === undefined && !show && !empty);

    let textarea: HTMLTextAreaElement;

    let examples = [
        'd20',
        '2d6',
        '8d8 + 7',
        '11d14 - 4d37 + (2 * 54)',      
        '(6d12 + 3d4 - 4d6 + 8) / 2'
    ]

    let input: HTMLInputElement | undefined;

    function expand() {
        const result: Token[] = [];

        function isValidPreDiceToken(token?: Token) {
            if (token?.type !== 'number') return false;
            const num = token.literal as number;
            if (num <= 0) return false;
            return Number.isInteger(num);
        }

        for (let i = 0; i < useful.length; i++) {
            const t = useful[i];

            const next = i === useful.length - 1 ? undefined : useful[i + 1];

            if (isValidPreDiceToken(t) && next?.type === 'dice') {
                continue;
            }

            if (t.type !== 'dice') {
                result.push(t);
                continue;
            }

            let numRolls = 1;

            const prev = i === 0 ? undefined : useful[i - 1];

            if (isValidPreDiceToken(prev)) {
                numRolls = prev?.literal as number;
            }

            result.push({ start: 0, end: 0, lexeme: '(', literal: undefined, type: "(" });

            const rolls = Array
                .from({ length: numRolls }, () => rand(1, t.literal as number));
                
            if (numRolls < 101) {
                rolls.forEach((r, j) => {
                    result.push({ start: 0, end: 0, lexeme: r.toString(), literal: r, type: "number" });
                    if (j < numRolls - 1) {
                        result.push({ start: 0, end: 0, lexeme: '+', literal: undefined, type: "+" });
                    }
                });
            } else {
                const sumOfRolls = rolls.reduce((a, b) => a + b); 
                result.push({ start: 0, end: 0, lexeme: sumOfRolls.toString(), literal: sumOfRolls, type: "number" });
            }

            result.push({ start: 0, end: 0, lexeme: ')', literal: undefined, type: ")" });
        }

        return result;
    }

</script>

<div class="bg-zinc-950 h-screen">
    <div id="dice" class="p-4 flex flex-col gap-4 max-w-screen-lg mx-auto">
        <form 
            onsubmit={e => { 
                e.preventDefault();
                if (frown) { return };
                show = true;
                expanded = expand();
            }}
            class="bg-zinc-800 rounded-md border border-zinc-600"
        >

            <div class="isolate flex-1">
                <div class="relative text-3xl ring-zinc-600 overflow-hidden rounded-md">
                    <SyntaxHighlight {tokens} {scroll} />
                    <textarea 
                        bind:value={q} 
                        bind:this={textarea}
                        placeholder="Enter dice roll"
                        rows="1"
                        spellcheck="false"
                        class="w-full p-4 text-transparent caret-zinc-400 bg-transparent font-mono max-h-[12ex] resize-none placeholder:text-zinc-600 placeholder:text-xl placeholder:leading-9" 
                        onscroll={e => {
                            scroll = textarea.scrollTop;
                        }}
                        oninput={async () => {
                            textarea.style.removeProperty('height');
                            textarea.style.height = `${textarea.scrollHeight}px`;
                            show = false;
                            expanded = expand();
                        }}
                        onkeypress={e => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                textarea.closest("form")?.requestSubmit();
                            }
                        }}
                    ></textarea>
                </div>
            </div>

            <div class="flex justify-end p-2">
                <button type="submit" 
                    disabled={frown || result === undefined}
                    class="{smile || result !== undefined ? "bg-green-700 text-green-100" : "bg-transparent text-zinc-600"}
                    px-4 py-1 rounded-md hover:scale-105 active:scale-100 transition-[scale] text-xl flex gap-2"
                >
                    <span>{result !== undefined && show ? "Reroll" : "Roll"}</span>
                    <Dices class="" />
                </button>
            </div>
        </form>
        

        {#if expanded.length > 1 && show}
            <div 
                in:scale={{  duration: 200 }}
                class="flex flex-wrap bg-zinc-800 gap-2 p-4 rounded-md border border-zinc-600"
            >
                {#each expanded.filter(t => t.type !== 'eof') as t}
                    <div data-token={t.type}>
                        <pre class="text hover:ring-4">{t.lexeme}</pre>
                        <!-- <pre class="json">{JSON.stringify(t, null, 2)}</pre> -->
                    </div>
                {/each}
            </div>

        {/if}

        {#if smile}
            <div 
                in:scale={{  duration: 200 }}
                class="result flex items-center gap-4 px-12 py-4 rounded-md bg-green-700 text-green-100 font-bold text-2xl mx-auto shadow-md max-w-full max-sm:flex-col max-sm:w-full"
            >
                <span>Ready to Roll</span>
                <Smile class="w-12 h-12"/>
            </div>
        {/if}

        {#if frown}
            <div 
                in:scale={{  duration: 200 }}
                class="result flex items-center gap-4 px-12 py-4 rounded-md bg-red-800 text-red-100 font-bold text-2xl mx-auto shadow-md max-w-full max-sm:flex-col max-sm:w-full"
            >
                <span>Invalid Syntax</span>
                <Frown class="w-12 h-12"/>
            </div>
        {/if}

        {#if empty}
            <div 
                in:fly={{  duration: 200, y: 250 }}
                class="text-zinc-300">

                <p class="mb-4 text-lg text-zinc-400">Examples:</p>
                <ul class="rounded-md border border-zinc-600 overflow-hidden bg-zinc-800">
                    {#each examples as ex}
                        <li class="flex items-center p-2 border-b border-zinc-600 last-of-type:border-none">
                            <span>{ex}</span>
                            <button
                                onclick={() => { 
                                    q = ex;
                                    show = false;
                                    expanded = expand();
                                }}
                                class="ml-auto border border-zinc-600 py-1 px-2 text-sm bg-zinc-900 rounded-md shadow-md shadow-zinc-800"
                            >
                                Try It!
                            </button>
                        </li>
                    {/each}
                </ul>
            </div>
        {/if}

        {#if result !== undefined && show}
            <div 
                in:scale={{  duration: 200 }}
                class="result flex flex-wrap gap-2 px-12 py-4 rounded-md text-zinc-100 font-bold text-6xl mx-auto border border-zinc-600 bg-zinc-800 shadow-md max-w-full"
            >
                <span in:scale>{result?.toLocaleString('en-US') ?? '?'}</span>
            </div>
        {/if}
        
    </div>
</div>


<style>

    .result span {
        word-wrap: break-word;
        overflow-wrap: break-word;
        overflow: hidden;
        max-width: 100%;
    }

    [data-token] {
        position: relative;
        display: inline;

    }

    .text {
        padding: 0 .3rem;
        font-size: 1.75rem;
        cursor: pointer;
        border-radius: .25rem;
        line-height: 1.25;
        font-family: monospace;
    }

    .json {
        position: absolute;
        display: none;
        box-shadow: 0 0 1rem 0 gray;
        padding: .5rem;
        border-radius: .25rem;
        background-color: white;
        left: 0;
        top: calc(100% + .5rem);
        z-index: 1;
    }

    .json::before {
        content: '';
        display: block;
        width: 100%;
        height: .5rem;
        /* background-color: red; */
        position: absolute;
        bottom: 100%;
        left: 0;
    }


    [data-token='number'] .text {
        color: hsl(200, 50%, 55%);

    }

    [data-token='dice'] .text {
        color: hsl(50, 50%, 55%);
    }

    :is([data-token='*'], [data-token='/'], [data-token='+'], [data-token='-']) .text {
       color: hsl(0, 0%, 80%);
    }

    :is([data-token='('], [data-token=')']) .text {
       color: hsl(300, 50%, 55%);
       font-weight: bold;
    }
</style>
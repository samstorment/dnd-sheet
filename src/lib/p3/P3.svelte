<script>
    import Header from "./Header.svelte";
    import SpellHead from "./SpellHead.svelte";
    import SpellSlot from "./SpellSlot.svelte";

</script>

<article class="shadow-lg shadow-zinc-700 flex flex-col rounded-md print:rounded-none">
    <Header />

    <div class="flex gap-2">
        <div class="flex-1">
            <SpellHead level={0} />
            <div class="mb-8">
                {#each { length: 8 } as _, i}
                    <SpellSlot />
                {/each}
            </div>

            <SpellHead level={1} />
            <div class="mb-2">
                {#each { length: 14 } as _, i}
                    <SpellSlot />
                {/each}
            </div>

            <SpellHead level={2} />
            <div class="mb-2">
                {#each { length: 14 } as _, i}
                    <SpellSlot />
                {/each}
            </div>
        </div>
        <div class="flex-1">  
            <SpellHead level={3}/>
            <div class="mb-3">
                {#each { length: 14 } as _, i}
                    <SpellSlot />
                {/each}
            </div>

            <SpellHead level={4}/>
            <div class="mb-2">
                {#each { length: 13 } as _, i}
                    <SpellSlot />
                {/each}
            </div>

            <SpellHead level={5}/>
            <div class="mb-2">
                {#each { length: 10 } as _, i}
                    <SpellSlot />
                {/each}
            </div>

        </div>
        <div class="flex-1">
            <SpellHead level={6}/>
            <div class="mb-2">
                {#each { length: 10 } as _, i}
                    <SpellSlot />
                {/each}
            </div>

            <SpellHead level={7}/>
            <div class="mb-3">
                {#each { length: 9 } as _, i}
                    <SpellSlot />
                {/each}
            </div>

            <SpellHead level={8}/>
            <div class="mb-2">
                {#each { length: 8 } as _, i}
                    <SpellSlot />
                {/each}
            </div>

            <SpellHead level={9}/>
            <div class="mb-2">
                {#each { length: 7 } as _, i}
                    <SpellSlot />
                {/each}
            </div>
        </div>

    </div>
</article>

<script lang="ts">
    import './sheet.css';

    const { children } = $props();
</script>

<div id="sheet">
    {@render children()}
</div>
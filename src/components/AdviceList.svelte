<script lang="ts">
 import Icon from './Icon.svelte';
 interface Post { id:string; title:string; description:string; topic:string; category:string; image:string; imageAlt:string; href:string; date:string; }
 let { posts }:{posts:Post[]} = $props();
 let selected = $state('All advice');
 const categories = ['All advice','Accounts & security','Computers'];
 let visible = $derived(posts.filter(post => selected === 'All advice' || post.category === selected));
 let featured = $derived(visible.find(post => post.id === '3-key-steps-to-protect-your-business-accounts'));
 let remaining = $derived(visible.filter(post => post.id !== featured?.id));
</script>
<div class="filters" role="group" aria-label="Filter advice by topic">{#each categories as category}<button type="button" aria-pressed={selected === category} onclick={() => selected = category}>{category}</button>{/each}</div>
<p class="visually-hidden" role="status">{visible.length} {visible.length === 1 ? 'guide' : 'guides'} shown.</p>
{#if featured}
 <article class="featured">
  <div><p class="topic">{featured.category}</p><h2><a href={featured.href}>{featured.title}</a></h2><p class="intro">Unique passwords, a password manager and a second sign-in check.</p><a class="button" href={featured.href}>Read the guide<Icon name="arrowRight" size={22} /></a></div>
  <img src={featured.image} alt={featured.imageAlt} width="1400" height="1120" loading="lazy" />
 </article>
{/if}
<h2 class="reading-title">{featured ? 'More useful reading.' : 'Advice for your computers.'}</h2>
<div class="reading-list">{#each remaining as post}<article class="reading-row"><a class="thumbnail" href={post.href} tabindex="-1" aria-hidden="true"><img src={post.image} alt="" width="1400" height="1120" loading="lazy" /></a><div><p class="topic">{post.category}</p><h3><a href={post.href}>{post.title}</a></h3><p class="description">{post.description}</p><a class="text-link" href={post.href}>Read the article<Icon name="arrowRight" size={22} /></a></div></article>{/each}</div>
<style>
 .filters { display:flex; flex-wrap:wrap; gap:1rem 3rem; margin-bottom:3rem; }
 .filters button { position:relative; min-height:48px; padding:.6rem 0; border:0; background:transparent; color:var(--muted); font:inherit; font-size:1.08rem; cursor:pointer; }
 .filters button[aria-pressed='true'] { color:var(--ink); font-weight:800; box-shadow:0 4px 0 var(--pink); }
 .featured { display:grid; grid-template-columns:1.05fr 1fr; border:2px solid var(--ink); background:var(--pink); box-shadow:10px 10px 0 var(--pink),10px 10px 0 2px var(--ink); }
 .featured > div { padding:clamp(1.75rem,3.5vw,3.25rem); }
 .featured img { display:block; width:100%; height:100%; object-fit:cover; }
 .topic { margin:0 0 1rem; color:var(--pink-dark); font-size:.76rem; font-weight:850; letter-spacing:.1em; text-transform:uppercase; }
 .featured .topic { color:var(--ink); }
 h2,h3 { margin:0; font-weight:820; letter-spacing:-.045em; line-height:1.12; }
 .featured h2 { font-size:clamp(2rem,3.3vw,3.2rem); }
 h2 a,h3 a { text-decoration:none; }h2 a:hover,h3 a:hover{text-decoration:underline;text-decoration-thickness:2px}
 .intro { margin:1.3rem 0 0; font-size:clamp(1.1rem,1.7vw,1.4rem); line-height:1.6; }
 .featured .button { margin-top:2rem; box-shadow:5px 5px 0 var(--white); }
 .reading-title { font-size:clamp(2rem,3.4vw,3.1rem); margin:4.5rem 0 2rem; }
 .reading-row { display:grid; grid-template-columns:minmax(0,.45fr) minmax(0,1fr); gap:3rem; align-items:center; padding:2rem 0; border-bottom:1px solid var(--line); }
 .reading-row:first-child { padding-top:0; }
 .thumbnail img { display:block; width:100%; height:auto; aspect-ratio:1.7; object-fit:cover; border:2px solid var(--ink); }
 .reading-row h3 { font-size:clamp(1.35rem,2.1vw,2rem); }
 .description { margin:.8rem 0 0; color:var(--muted); line-height:1.65; font-size:1.05rem; }
 .reading-row .text-link { margin-top:1rem; }
 .visually-hidden { position:absolute; width:1px; height:1px; overflow:hidden; clip-path:inset(50%); }
 @media(max-width:700px){.filters{gap:.5rem 1.5rem;margin-bottom:2rem}.filters button{font-size:.95rem}.featured{grid-template-columns:1fr}.featured img{aspect-ratio:1.5;max-height:300px}.featured>div{padding:1.5rem}.reading-row{grid-template-columns:1fr;gap:1.5rem;padding:2.5rem 0}.reading-row .thumbnail{max-width:100%}.reading-title{margin-top:3.5rem}.reading-row .topic{margin-bottom:.75rem}}
</style>

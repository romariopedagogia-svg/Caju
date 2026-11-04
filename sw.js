/* Nick na Trilha dos Padrões – guarda o jogo no aparelho para funcionar sem internet.
   A versão muda sozinha quando qualquer arquivo do jogo muda (gerada ao montar o pacote). */
var VERSAO="nick-c2354a5636";
var ARQUIVOS=["./", "_config.yml", "capa/img/f1_a.jpg", "capa/img/f1_b.jpg", "capa/img/f2_a.jpg", "capa/img/f2_b.jpg", "capa/img/f3_a.jpg", "capa/img/f3_b.jpg", "capa/img/nick_cheer.png", "capa/img/nick_feliz.png", "capa/index.html", "f1/index.html", "f1/voz/aiai.mp3", "f1/voz/iupi.mp3", "f1/voz/v20_abriu.mp3", "f1/voz/v20_acerto.mp3", "f1/voz/v20_agora.mp3", "f1/voz/v20_caiu.mp3", "f1/voz/v20_chave.mp3", "f1/voz/v20_dica.mp3", "f1/voz/v20_erro.mp3", "f1/voz/v20_escorrega.mp3", "f1/voz/v20_fim.mp3", "f1/voz/v20_intro1.mp3", "f1/voz/v20_intro2.mp3", "f1/voz/v20_nossa.mp3", "f1/voz/v20_orienta.mp3", "f1/voz/v20_ouve.mp3", "f1/voz/v20_ouvidos.mp3", "f1/voz/v20_pule.mp3", "f1/voz/v20_suavez.mp3", "f1/voz/v20_tente.mp3", "f2/index.html", "f2/voz/aiai.mp3", "f2/voz/f2_pule.mp3", "f2/voz/f2_qual.mp3", "f2/voz/iupi.mp3", "f2/voz/v20_abriu.mp3", "f2/voz/v20_acerto.mp3", "f2/voz/v20_caiu.mp3", "f2/voz/v20_caiuArv.mp3", "f2/voz/v20_chave.mp3", "f2/voz/v20_dica.mp3", "f2/voz/v20_erro.mp3", "f2/voz/v20_escorrega.mp3", "f2/voz/v20_fim.mp3", "f2/voz/v20_intro1.mp3", "f2/voz/v20_nossa.mp3", "f2/voz/v20_ouve.mp3", "f2/voz/v20_suavez.mp3", "f2/voz/v20_tente.mp3", "f2/voz/v21_orienta_portao.mp3", "f3/index.html", "f3/voz/aiai.mp3", "f3/voz/f3_observe.mp3", "f3/voz/f3_qual.mp3", "f3/voz/iupi.mp3", "f3/voz/v20_acerto.mp3", "f3/voz/v20_caiu.mp3", "f3/voz/v20_cria1.mp3", "f3/voz/v20_cria2.mp3", "f3/voz/v20_dica.mp3", "f3/voz/v20_erro.mp3", "f3/voz/v20_escorrega.mp3", "f3/voz/v20_falta1.mp3", "f3/voz/v20_final.mp3", "f3/voz/v20_intro1.mp3", "f3/voz/v20_mais1.mp3", "f3/voz/v20_nossa.mp3", "f3/voz/v20_ouve.mp3", "f3/voz/v20_pl0.mp3", "f3/voz/v20_pl1.mp3", "f3/voz/v20_pl3.mp3", "f3/voz/v20_pl5.mp3", "f3/voz/v20_suavez.mp3", "f3/voz/v20_suavez2.mp3", "f3/voz/v20_tente.mp3", "fonts/OFL.txt", "fonts/baloo2-600.woff", "fonts/baloo2-800.woff", "icons/apple-touch-icon.png", "icons/favicon-48.png", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-192.png", "icons/maskable-512.png", "index.html", "manifest.webmanifest", "mapa/img/nick_cheer.png", "mapa/img/nick_feliz.png", "mapa/index.html", "mapa/voz/v20_ambiente.mp3", "mapa/voz/v20_apresentacao.mp3", "mapa/voz/v20_final.mp3", "mapa/voz/v20_mapa_fase1.mp3", "mapa/voz/v20_mapa_fase2.mp3", "mapa/voz/v20_mapa_fase3.mp3", "privacidade.html", "sobre.html"];
self.addEventListener("install",function(e){
  e.waitUntil(caches.open(VERSAO).then(function(c){return c.addAll(ARQUIVOS);}).then(function(){return self.skipWaiting();}));
});
self.addEventListener("activate",function(e){
  e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==VERSAO;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));
});
self.addEventListener("fetch",function(e){
  var r=e.request;if(r.method!=="GET")return;
  var u=new URL(r.url);
  if(u.origin!==location.origin)return;
  /* arquivos do jogo: primeiro a cópia do aparelho (ignorando ?direto=1 etc.), depois a internet */
  e.respondWith(caches.open(VERSAO).then(function(c){return c.match(r,{ignoreSearch:true}).then(function(m){
    if(m)return m;
    return fetch(r).then(function(resp){if(resp&&resp.ok&&!r.headers.get("range"))c.put(r,resp.clone());return resp;}).catch(function(){
      if(r.mode==="navigate")return c.match("./");return Response.error();});});}));
});

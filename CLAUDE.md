```markdown
## Vault de Obsidian

Vault en `C:\Users\Fran\ObsidianVaults\astrologia-herbolaria`, con dos orígenes distintos:

- `memoria-claude\` — Directory Junction (no copia) a `C:\Users\Fran\.claude\projects\C--Users-Fran-Code\memory\`, la memoria persistente de Claude Code. Editar notas ahí dentro o fuera del vault está bien; el hook/flujo de graphify mantiene sincronizada la vista del proyecto.
- `grafo-proyecto\` — vault de graphify (`graphify export obsidian --dir <ruta>`) con una nota por nodo del grafo de este repo más notas `_COMMUNITY_*.md` por comunidad.

`graphify hook install` ya deja un hook de post-commit que reconstruye `graphify-out/graph.json` en cada commit. Para volver a exportar ese grafo al vault y (si hay `GEMINI_API_KEY`/`GOOGLE_API_KEY`) hacer el "fold-back" automático, se incluye el script `scripts/sync-obsidian.ps1`.

- Requisitos:
  - `graphify` CLI en PATH
  - (Opcional, para fold-back automático) `GEMINI_API_KEY` o `GOOGLE_API_KEY` en el entorno

- Uso básico:
  - Mostrar ayuda: `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\sync-obsidian.ps1 -Help`
  - Ejecutar con vault/Project explícitos: `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\sync-obsidian.ps1 -VaultDir "C:\path\to\vault" -ProjectDir "C:\path\to\repo"`
  - Ejecutar desde el repo (el script deriva ProjectDir automáticamente): `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\sync-obsidian.ps1 -VaultDir "C:\path\to\vault"`

Sin la clave de LLM, el script exporta desde el proyecto al vault pero omite el fold-back; en ese caso, sigue las instrucciones que imprime para correr `/graphify "<ruta-grafo-proyecto>"` dentro de Claude Code y luego ejecutar `graphify merge-graphs` si quieres incorporar notas desde el vault.
```


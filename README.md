# swccg-wiki-files

Public backup of [wiki.swccg.com](https://wiki.swccg.com) `File:` uploads (card scans, rulebook art, championship photos, PDFs).

Wikitext lives in [billbisco/swccg-wiki](https://github.com/billbisco/swccg-wiki). How the stack fits together: [billbisco/swccg-site](https://github.com/billbisco/swccg-site).

GEMP XML/text uploads are omitted. Extract rasters, dest-note dumps, and live `.env` stay off GitHub.

## Layout

| Path | What it is |
| --- | --- |
| `files/INDEX.tsv` | `title<TAB>path<TAB>mime<TAB>size` |
| `files/*` | One file per live wiki `File:` title (spaces → `_`) |

Refresh from the live wiki (run from the wikitext clone):

```text
python tools/dump_images.py --out C:\Users\gythe\.grok\swccg-wiki-files\files
```

GitHub push cap is 2 GB. Split commits if the tree is larger.

## Rebuild

On a MediaWiki box, after importing wikitext:

```bash
php maintenance/importImages.php /path/to/swccg-wiki-files/files
```

Use `INDEX.tsv` to confirm titles and sizes.

## License

Fan encyclopedia. Respective rights belong to their owners.

Star Wars, Star Wars Customizable Card Game, card names, card text, card art, and related marks remain with Lucasfilm Ltd., Disney, Decipher, and/or the Players Committee. This project claims none of those rights.

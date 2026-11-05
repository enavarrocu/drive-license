# Textos legales de referencia (versión consolidada vigente)

Copia local de los textos oficiales con los que se revisa el contenido (preguntas, teoría,
curso, glosario, señales). Se bajan de **ejustice** (Banque de données Justel, SPF Justice),
que es la versión consolidada oficial. Cada fichero lleva en la cabecera la URL, el numac y
la fecha «mise à jour au» de ejustice.

| Fichero | Texto | Para qué |
|---|---|---|
| `code-de-la-route-AR-1975-12-01.txt` | AR 1/12/1975, Code de la route | Todas las reglas de circulación y las señales (art. 65–77) |
| `loi-circulation-1968-03-16.txt` | Ley de 16/3/1968 | Alcohol y drogas (34, 37bis, 37/1, 60, 61ter), déchéance (29, 38), retirada inmediata (55), délit de fuite (33) |
| `degres-infractions-AR-2005-09-30.txt` | AR 30/9/2005 | Grados de las infracciones (2.º, 3.º, 4.º; lo demás es 1.º) |
| `permis-de-conduire-AR-1998-03-23.txt` | AR 23/3/1998 | Categorías (AM, A1, B…), examen, signo «L», código 372 |
| `permis-B-provisoire-AR-2006-07-10.txt` | AR 10/7/2006 | Permiso provisional B (M12, M18, M36), guía |
| `assurance-RC-auto-loi-1989-11-21.txt` | Ley de 21/11/1989 | Seguro obligatorio RC, art. 29bis (usuarios vulnerables) |

Actualizar (necesita internet):

```bash
pnpm legal
git diff --stat docs/legal   # qué textos han cambiado desde la última descarga
```

Notas:

- Lo propio de Bruselas que no está en estos textos (precios y organización del examen,
  condiciones prácticas del provisional) se contrasta en be.brussels; la política de la
  fiscalía (retirada sistemática desde 0,8 g/l, teléfono en mano) en police.be.
- Los PDF de codedelaroute.be / Wallex pueden estar desfasados (el de los grados lo estaba):
  usa estos ficheros o ejustice.

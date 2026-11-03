# Integrated notes application

Milestone M17 combines Core helpers, Moon SQLite/HTTP, Snow pages and assets, Bela tasks/channels, Shady tests, and a local Smokey dependency.

With Fubby 0.3.0 on PATH, start in this folder:

```sh
cd app
fubby pkg validate
fubby pkg install
fubby shady test tests/preview_tests.fab
fubby snow serve src/main.fab --port 8080 --workers 4 --queue-capacity 32
```

Expect three passing tests. Open http://127.0.0.1:8080/ and explore Home, About, Runtime, and the notes form. Add a note, reload, and inspect `/api/notes`. Stop with Ctrl-C.

Keep `app` and `packages` together: the manifest uses a relative path dependency. Installation generates a lockfile/cache. The app creates `preview.db` in `app`. The upstream HTTP diagnostic intentionally calls an unavailable local endpoint and reports the caught failure; a successful external HTTP service is not required.

Try changing the greeting helper in `packages/preview-kit/src/lib.fab`, reinstalling the dependency, and rerunning the tests. The server is for local evaluation and has no TLS or application authentication.

[All examples](../README.md)

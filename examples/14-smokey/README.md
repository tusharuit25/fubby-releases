# Smokey local registry example

This example demonstrates an application depending on `greeting`, which in turn depends on `text-util`. The registry is a local directory; these commands do not use the network. With Fubby 0.3.0 on `PATH`, start in this example folder.

```sh
REGISTRY="$(mktemp -d "${TMPDIR:-/tmp}/fubby-smokey.XXXXXX")"

cd text-util
fubby pkg validate
fubby pkg publish --registry "$REGISTRY"

cd ../greeting
fubby pkg publish --registry "$REGISTRY"

cd ../app
fubby pkg add greeting '^1.0.0'
fubby pkg validate --registry "$REGISTRY"
fubby pkg install --registry "$REGISTRY"
fubby pkg list
fubby run src/main.fab
```

The application imports the greeting package with `package:greeting/src/lib.fab`; the greeting package imports `text-util` the same way. `fubby.lock` records exact versions and SHA-256 checksums. The registry refuses to overwrite an already-published package version.

Expected result: package validation and installation succeed, and the app prints its greeting. Keep all three sibling folders together. Each run uses a fresh temporary registry because published versions cannot be overwritten. Package commands create local caches and lockfiles.

[All examples](../README.md)

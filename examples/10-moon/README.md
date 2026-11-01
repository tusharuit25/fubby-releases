# Moon SQLite and network policy

Milestones: M12.

Create an in-memory table, bind SQL parameters, query a row, and catch a denied HTTP request.

## Run

With Fubby 0.1.0 on PATH, open a terminal in this folder:

```sh
unset FUBBY_NET_ALLOWLIST
fubby check moon_m12.fab
fubby run moon_m12.fab
```

## What to expect

Ada and true for the denied-request check. Run with FUBBY_NET_ALLOWLIST unset; no external server is needed.

## Try it

Change an input value in the example, rerun it, and compare the result. `fubby check` checks syntax/imports; execution checks runtime behavior.

[All examples](../README.md)

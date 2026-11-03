# Shady developer tools

Milestones: M13.

Run tests and inspect an ordinary program with the developer tools.

## Run

With Fubby 0.3.0 on PATH, open a terminal in this folder:

```sh
fubby check shady.fab
fubby run shady.fab
fubby check shady_test.fab
fubby run shady_test.fab
fubby shady test shady_test.fab
fubby shady fmt --check shady.fab
fubby shady lint shady.fab
fubby shady profile shady.fab
fubby shady docs shady.fab
```

## What to expect

Two passing tests; the sum program prints 21.

## Try it

Change an input value in the example, rerun it, and compare the result. `fubby check` checks syntax/imports; execution checks runtime behavior.

[All examples](../README.md)

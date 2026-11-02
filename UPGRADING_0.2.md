# Upgrading to Fubby 0.2

0.2 makes the changes that have to happen before 1.0 promises not to break programs. Most
programs need a few small edits. When something needs changing, `fubby check` says what and
where, and usually shows the fix.

## 1. Use imported names through the import

Each file now has its own names. An import is named after its file, and you reach what it
declares through that name.

Before:

```fubby
import "helpers.fab"

func main() {
    print(greeting())
    let Person ann = Person("Ann")
}
```

After:

```fubby
import "helpers.fab"

func main() {
    print(helpers.greeting())
    let helpers.Person ann = helpers.Person("Ann")
}
```

`fubby check` reports each old use, for example:

```text
main.fab:4:5: check error: greeting is defined in helpers.fab; call it as helpers.greeting()
```

- Add `as` to choose another name: `import "helpers.fab" as h`, then `h.greeting()`.
- Package files are usually called `lib.fab`, so name package imports:
  `import "package:greeting/src/lib.fab" as greeting`.
- Types, `extends`, and `implements` use the same names, as in `class Puppy extends pets.Dog`.
- Inside a file, its own functions and classes keep their plain names.
- A file can now be imported from several places, and it's loaded once. Import cycles are
  still errors.
- An import can't be named `moon`, `snow`, or `bela`, and a variable can't have the name of an
  import in the same file.

## 2. Check values that may be null before using them

A `String?` can't be used where a `String` is needed until you check it. The checker follows
`if x != null`, the `else` of `if x == null`, the rest of a block after
`if x == null { return }`, and the right side of `&&` and `||`.

Before:

```fubby
func main() {
    let String? nickname = find_nickname("Asha")
    print(shout(nickname))
}
```

After:

```fubby
func main() {
    let String? nickname = find_nickname("Asha")
    if nickname != null {
        print(shout(nickname))
    }
}
```

A field can change between the check and its use, so copy it into a variable and check that:

```fubby
public func courseTitle() -> String {
    let course = this.course
    if course == null {
        return "not enrolled"
    }
    return course.title
}
```

## 3. Pass Snow handlers and Bela tasks as functions

Before:

```fubby
snow.get("/", "home")
let task = bela.spawn("work", input)
```

After:

```fubby
snow.get("/", home)
let task = bela.spawn(work, input)
```

Names in quotes still work in 0.2, and `fubby shady lint` reports each one as `S005`. A handler
or task runs on another thread, so it can't be a function that copied outer variables.

## 4. Update package manifests

Packages that ran on 0.1 declare `fubby = ">=0.1.0, <0.2.0"`, so 0.2 refuses to install
them. Change the line to:

```toml
fubby = ">=0.2.0, <0.3.0"
```

`fubby pkg init` writes this for new packages.

## New in 0.2

- **Functions as values:** a function's name without `()` is a value, and
  `func(Int n) -> Int { return n * 2 }` makes one without a name. It copies the outer
  variables it uses when it's made. Its type is `Func`.
- **`text + 1 + true`** is no longer rejected by the checker, because it runs.

Everything else is unchanged: the standard library, Moon, Snow, Bela, Shady, and Smokey work as
in 0.1.5.

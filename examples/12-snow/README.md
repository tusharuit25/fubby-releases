# Snow Notes

Milestone M14: routes, HTML templates, static CSS/JavaScript, middleware, JSON responses, and parameterized SQLite CRUD.

With Fubby 0.1.0 on PATH, run from this folder:

```sh
fubby check app.fab
fubby snow serve app.fab --port 8080
```

Open http://127.0.0.1:8080/. Add a note using the form. Reload to see it persist. Visit `/about`, `/hello/Ada`, and `/api/notes`. Stop with Ctrl-C before running another server example.

From a second terminal, exercise the API:

```sh
curl -X POST http://127.0.0.1:8080/api/notes -H 'Content-Type: application/json' -d '{"title":"Learn Fubby"}'
curl http://127.0.0.1:8080/api/notes
```

The POST returns a created note with an ID; GET returns the notes array. Use that ID with GET, PATCH, or DELETE at `/api/notes/<id>`. PATCH accepts the same title JSON.

Creates `snow-notes.db` in the working directory. Keep the `assets` folder beside `app.fab`. This is a local development server with no authentication or TLS.

[All examples](../README.md)

'use strict';
const status = document.querySelector('#status');
async function refresh() {
  const response = await fetch('/api/notes');
  if (!response.ok) throw new Error('Could not load notes');
  const list = document.querySelector('#notes');
  list.replaceChildren();
  for (const note of await response.json()) {
    const row = document.createElement('li');
    const title = document.createElement('span');
    title.textContent = note.title;
    const edit = document.createElement('button');
    edit.textContent = 'Edit';
    edit.onclick = async () => {
      const next = prompt('New title', note.title);
      if (next === null) return;
      await change(`/api/notes/${note.id}`, 'PATCH', { title: next });
    };
    const remove = document.createElement('button');
    remove.textContent = 'Delete';
    remove.onclick = () => change(`/api/notes/${note.id}`, 'DELETE');
    row.append(title, edit, remove);
    list.append(row);
  }
}
async function change(url, method, body) {
  try {
    const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: body === undefined ? undefined : JSON.stringify(body) });
    if (!response.ok) throw new Error((await response.json()).error || 'Request failed');
    status.textContent = 'Saved';
    await refresh();
  } catch (error) { status.textContent = error.message; }
}
document.querySelector('#new-note').onsubmit = async event => {
  event.preventDefault();
  const title = document.querySelector('#title');
  await change('/api/notes', 'POST', { title: title.value });
  title.value = '';
};
refresh().catch(error => { status.textContent = error.message; });

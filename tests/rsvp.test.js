const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');
const section = source.slice(source.indexOf("const form=$('#rsvpForm')"), source.indexOf('   10. Share'));

function setup({attending = true, name = 'Nusrat Ahmed', whatsapp = '+880 1712-345678', saved = null} = {}) {
  const elements = new Map();
  function $(selector) {
    if (!elements.has(selector)) elements.set(selector, {
      value: '', textContent: '', checked: false, hidden: true, style: {},
      classList: {add() {}, remove() {}, toggle() {}},
      listeners: {}, addEventListener(event, handler) { this.listeners[event] = handler; },
      focus() { this.focused = true; },
    });
    return elements.get(selector);
  }
  $('#fName').value = name;
  $('#attY').checked = attending;
  $('#attN').checked = !attending;
  $('#gNum').textContent = '3';
  $('#fSong').value = '  A song & a dance  ';
  $('#fNotes').value = '  Blessings ♥\nVegetarian meal  ';
  const opened = [], toasts = [], stored = [];
  vm.runInNewContext(section + '\n*/', {
    $, CFG: {rsvp: {storageKey: 'rsvp-test', maxParty: 8, whatsapp}, calendar: {title: 'Ayan & Mim — Wedding'}},
    window: {open: (...args) => opened.push(args)},
    localStorage: {setItem: (...args) => stored.push(args), getItem: () => JSON.stringify(saved)},
    toast: message => toasts.push(message), setTimeout() {},
  });
  return {$, opened, toasts, stored, submit: () => $('#rsvpForm').listeners.submit({preventDefault() {}})};
}

test('RSVP opens WhatsApp addressed to the configured couple with all reply details', () => {
  const page = setup();
  page.submit();
  assert.equal(page.opened.length, 1);
  const [link, target, features] = page.opened[0];
  const url = new URL(link);
  assert.equal(url.origin + url.pathname, 'https://wa.me/8801712345678');
  assert.equal(target, '_blank');
  assert.equal(features, 'noopener');
  assert.equal(url.searchParams.get('text'), 'RSVP — Ayan & Mim — Wedding\nName: Nusrat Ahmed\nAttending: Joyfully, yes (3 guests)\nSong request: A song & a dance\nMessage: Blessings ♥\nVegetarian meal');
  assert.match(page.$('#cBody').textContent, /press send/i);
  assert.match(page.toasts.at(-1), /WhatsApp/);
  assert.equal(JSON.parse(page.stored[0][1]).n, 'Nusrat Ahmed');
  assert.equal(page.$('#rsvpForm').style.display, 'none');
});

test('declining RSVP omits party size and empty optional answers', () => {
  const page = setup({attending: false});
  page.$('#fSong').value = ' ';
  page.$('#fNotes').value = '';
  page.submit();
  assert.equal(page.opened.length, 1);
  assert.equal(new URL(page.opened[0][0]).searchParams.get('text'), 'RSVP — Ayan & Mim — Wedding\nName: Nusrat Ahmed\nAttending: Regretfully, no');
});

test('blank names do not open WhatsApp or save a reply', () => {
  const page = setup({name: '  '});
  page.submit();
  assert.equal(page.opened.length, 0);
  assert.equal(page.stored.length, 0);
  assert.equal(page.$('#fName').focused, true);
});

test('an empty WhatsApp destination keeps the local-only reply flow', () => {
  const page = setup({whatsapp: ''});
  page.submit();
  assert.equal(page.opened.length, 0);
  assert.equal(page.stored.length, 1);
  assert.equal(page.$('#rsvpForm').style.display, 'none');
});

test('restoring a saved reply does not send it again', () => {
  const page = setup({saved: {n: 'Returning Guest', att: 'no', g: 2, song: 'Song', notes: 'Thanks'}});
  assert.equal(page.opened.length, 0);
  assert.equal(page.$('#fName').value, 'Returning Guest');
  assert.equal(page.$('#savedNote').hidden, false);
});

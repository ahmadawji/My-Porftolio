import fetch from 'node-fetch';

async function test() {
  try {
    const res = await fetch('https://docs.google.com/spreadsheets/d/17Kd37P23SY-BTbhKBWyJmNq9nJPRxyRwqQ5uigaUpbE/export?format=csv');
    console.log('Status:', res.status);
    console.log('Headers:', res.headers.raw());
    const text = await res.text();
    console.log('Text length:', text.length);
  } catch (e) {
    console.error(e);
  }
}

test();

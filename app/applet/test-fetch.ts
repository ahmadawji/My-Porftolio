async function test() {
  try {
    const res = await fetch('https://docs.google.com/spreadsheets/d/17Kd37P23SY-BTbhKBWyJmNq9nJPRxyRwqQ5uigaUpbE/export?format=csv');
    console.log('Status:', res.status);
    console.log('Headers:', res.headers);
    const text = await res.text();
    console.log('Text length:', text.length);
    console.log('Text preview:', text.substring(0, 100));
  } catch (e) {
    console.error(e);
  }
}

test();

import Papa from 'papaparse';

try {
  Papa.parse("a,b\n1,2", {
    complete: () => {
      throw new Error("Test error inside complete");
    }
  });
} catch (e) {
  console.log("Caught:", e.message);
}

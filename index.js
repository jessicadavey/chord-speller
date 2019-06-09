// Define two arrays of all 12 notes, one with sharp names and one with flat names:
const sharps = ["C", "C♯", "D", "D♯", "E", "E♯", "F♯", "G", "G♯", "A", "A♯", "B"];
const flats = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];

// Define two arrays of chord root notes - one for "sharp" keys and one for "flat" keys:
const sharpRoots = ["C♯", "F♯", "B", "E", "A", "D", "G"];
const flatRoots = ["C", "F", "B♭", "E♭", "A♭", "D♭", "G♭"];
// (some overlap is necessary to account for alternate spellings of C#/Db and F#/Gb)


function spellMajorChord(root) {
    let tones;

    //1. Decide if the root note supplied is for a sharp key or a flat key 
    //   and choose the corresponding array:
    if (sharpRoots.includes(root)) tones = sharps;
    if (flatRoots.includes(root)) tones = flats;

    //2. Find the location of the root note in that array:
    let i = tones.indexOf(root);

    //3. Return an array of three notes chosen from that arrray, making sure the index is never > 11:
    return [root, tones[(i + 4) % 12], tones[(i + 7) % 12]];
}

console.log(spellMajorChord("D♭"));
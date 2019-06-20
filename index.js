// Define two arrays of all 12 notes, one with sharp names and one with flat names:
const flats = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
const sharps = ["C", "C♯", "D", "D♯", "E", "E♯", "F♯", "G", "G♯", "A", "A♯", "B"];
// (some overlap is necessary to account for alternate spellings of C#/Db and F#/Gb)

// Define two arrays of chord root notes - one for "sharp" keys and one for "flat" keys:
const flatMajorRoots = ["C", "F", "B♭", "E♭", "A♭", "D♭", "G♭"];
const sharpMajorRoots = ["C♯", "F♯", "B", "E", "A", "D", "G"];

// Define two arrays of chord root notes - one for "sharp" keys and one for "flat" keys:
const flatMinorRoots = ["A", "D", "G", "C", "F", "B♭", "E♭"];
const sharpMinorRoots = ["A♯", "D♯", "G♯", "C♯", "F♯", "B", "E"];

//  Select which type of chord:
const chordSelector = document.querySelector("#chord-select");

// Make the buttons: 
makeButtons();
chordSelector.addEventListener("change", makeButtons);

function makeButtons() {

    if (chordSelector.value === "major") {

        // Make the buttons for the flat key roots:
        const flatButtons = flatMajorRoots.map(note => {
            return `<button class="btn btn-info mx-auto rootname disabled">${note}</button>`
        })

        const flatsContainer = document.querySelector("#flatsContainer");
        flatsContainer.innerHTML = flatButtons.join("");

        // ...and then the sharp key roots:
        const sharpButtons = sharpMajorRoots.map(note => {
            return `<button class="btn btn-info mx-auto rootname disabled">${note}</button>`
        })

        const sharpsContainer = document.querySelector("#sharpsContainer");
        sharpsContainer.innerHTML = sharpButtons.join("");

    }

    if (chordSelector.value === "minor") {

        // Make the buttons for the flat key roots:
        const flatButtons = flatMinorRoots.map(note => {
            return `<button class="btn btn-danger mx-auto rootname disabled">${note}</button>`
        })

        const flatsContainer = document.querySelector("#flatsContainer");
        flatsContainer.innerHTML = flatButtons.join("");

        // ...and then the sharp key roots:
        const sharpButtons = sharpMinorRoots.map(note => {
            return `<button class="btn btn-danger mx-auto rootname disabled">${note}</button>`
        })

        const sharpsContainer = document.querySelector("#sharpsContainer");
        sharpsContainer.innerHTML = sharpButtons.join("");

    }

    // Add event listeners to all of the buttons
    let buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.addEventListener("click", (e) => handleClick(e)));

    // Initialize: 

    buttons[0].classList.remove("disabled");
    buttons[0].classList.add("active");

    let chord;
    if (chordSelector.value === "major") chord = spellMajorTriad(buttons[0].innerHTML);
    if (chordSelector.value === "minor") chord = spellMinorTriad(buttons[0].innerHTML);

    const root = document.querySelector("#root");
    const third = document.querySelector("#third");
    const fifth = document.querySelector("#fifth");

    root.innerHTML = chord[0];
    third.innerHTML = chord[1];
    fifth.innerHTML = chord[2];

}


function handleClick(e) {

    let buttons = document.querySelectorAll("button");
    // Deactivate all other buttons:
    buttons.forEach(button => button.classList.add("disabled"));
    buttons.forEach(button => button.classList.remove("active"));

    // Activate selected button:
    e.target.classList.remove("disabled");
    e.target.classList.add("active");

    // When each button is clicked, spell the chord and update elements
    let chord;
    if (chordSelector.value === "major") chord = spellMajorTriad(e.target.innerHTML);
    if (chordSelector.value === "minor") chord = spellMinorTriad(e.target.innerHTML);

    const root = document.querySelector("#root");
    const third = document.querySelector("#third");
    const fifth = document.querySelector("#fifth");

    root.innerHTML = chord[0];
    third.innerHTML = chord[1];
    fifth.innerHTML = chord[2];

}

function spellMajorTriad(root) {

    let tones;

    // 2. Decide if the root note supplied is for a sharp key or a flat key 
    //   and choose the corresponding array:
    if (flatMajorRoots.includes(root)) tones = flats;
    if (sharpMajorRoots.includes(root)) tones = sharps;


    // 3. Find the location of the root note in that array:
    let i = tones.indexOf(root);

    // 4. Return an array of three notes chosen from that arrray, making sure the index is never > 11:
    return [root, tones[(i + 4) % 12], tones[(i + 7) % 12]];

}

function spellMinorTriad(root) {

    let tones;

    // 2. Decide if the root note supplied is for a sharp key or a flat key 
    //   and choose the corresponding array:
    if (flatMinorRoots.includes(root)) tones = flats;
    if (sharpMinorRoots.includes(root)) tones = sharps;


    // 3. Find the location of the root note in that array:
    let i = tones.indexOf(root);

    // 4. Return an array of three notes chosen from that arrray, making sure the index is never > 11:
    return [root, tones[(i + 3) % 12], tones[(i + 7) % 12]];

}
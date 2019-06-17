// Define two arrays of all 12 notes, one with sharp names and one with flat names:
const flats = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
const sharps = ["C", "C♯", "D", "D♯", "E", "E♯", "F♯", "G", "G♯", "A", "A♯", "B"];
// (some overlap is necessary to account for alternate spellings of C#/Db and F#/Gb)

//  Select which type of chord:

const chordSelector = document.querySelector("#chord-select");

chordSelector.addEventListener("change", makeButtons);


// Make the buttons: 
makeButtons();


function makeButtons() {

    console.log(chordSelector.value);

    if (chordSelector.value === "major") {
        // Define two arrays of chord root notes - one for "sharp" keys and one for "flat" keys:
        const flatRoots = ["C", "F", "B♭", "E♭", "A♭", "D♭", "G♭"];
        const sharpRoots = ["C♯", "F♯", "B", "E", "A", "D", "G"];

        // Make the buttons for the flat key roots:
        const flatButtons = flatRoots.map(note => {
            return `<button class="btn btn-info mx-auto rootname disabled">${note}</button>`
        })

        const flatsContainer = document.querySelector("#flatsContainer");
        flatsContainer.innerHTML = flatButtons.join("");

        // ...and then the sharp key roots:
        const sharpButtons = sharpRoots.map(note => {
            return `<button class="btn btn-info mx-auto rootname disabled">${note}</button>`
        })

        const sharpsContainer = document.querySelector("#sharpsContainer");
        sharpsContainer.innerHTML = sharpButtons.join("");

    }

    if (chordSelector.value === "minor") {
        // Define two arrays of chord root notes - one for "sharp" keys and one for "flat" keys:
        const flatRoots = ["A", "D", "G", "C", "F", "B♭", "E♭"];
        const sharpRoots = ["A♯", "D♯", "G♯", "C♯", "F♯", "B", "E"];

        // Make the buttons for the flat key roots:
        const flatButtons = flatRoots.map(note => {
            return `<button class="btn btn-danger mx-auto rootname disabled">${note}</button>`
        })

        const flatsContainer = document.querySelector("#flatsContainer");
        flatsContainer.innerHTML = flatButtons.join("");

        // ...and then the sharp key roots:
        const sharpButtons = sharpRoots.map(note => {
            return `<button class="btn btn-danger mx-auto rootname disabled">${note}</button>`
        })

        const sharpsContainer = document.querySelector("#sharpsContainer");
        sharpsContainer.innerHTML = sharpButtons.join("");

    }

}






function spellMajorTriad(root) {


    let tones;

    // 2. Decide if the root note supplied is for a sharp key or a flat key 
    //   and choose the corresponding array:
    if (flatRoots.includes(root)) tones = flats;
    if (sharpRoots.includes(root)) tones = sharps;


    // 3. Find the location of the root note in that array:
    let i = tones.indexOf(root);

    // 4. Return an array of three notes chosen from that arrray, making sure the index is never > 11:

    if (chordType === "major")

        return [root, tones[(i + 4) % 12], tones[(i + 7) % 12]];

    if (chordType === "minor")

        return [root, tones[(i + 3) % 12], tones[(i + 7) % 12]];
}






// Add event listeners to all of the buttons
const buttons = [...document.querySelectorAll("button")];
buttons.map(button => button.addEventListener("click", (e) => handleClick(e)));

buttons[0].classList.remove("disabled");
buttons[0].classList.add("active");

function handleClick(e) {
    // Deactivate all other buttons:
    buttons.map(button => button.classList.add("disabled"));
    buttons.map(button => button.classList.remove("active"));

    // Activate selected button:
    e.target.classList.remove("disabled");
    e.target.classList.add("active");

    // When each button is clicked, spell the chord and update elements
    let chord = spellMajorTriad(e.target.innerHTML);

    const root = document.querySelector("#root");
    const third = document.querySelector("#third");
    const fifth = document.querySelector("#fifth");

    root.innerHTML = chord[0];
    third.innerHTML = chord[1];
    fifth.innerHTML = chord[2];

}
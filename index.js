window.addEventListener('load', () => {
    load_rlut();
    load_notes();

//     const VF = Vex.Flow;
//
// // Create an SVG renderer and attach it to the DIV element named "boo".
//     var vf = new VF.Factory({renderer: {elementId: 'boo', height: 700}});
//     var score = vf.EasyScore();
//     var system = vf.System();
//
//     let stave1 = system.addStave({
//         voices: [
//             score.voice(score.notes('C#3/q, B2, A2/8r, B2, C#3, D3'))
//         ]
//     }).addClef('treble').addTimeSignature('4/4');
//
//     let stave2 = system.addStave({
//         voices: [
//             score.voice(score.notes('C#3/q, B2, A2/8, B2, C#3, D3', {clef: 'bass'}))
//         ]
//     }).addClef('bass').addTimeSignature('4/4');
//
//     vf.StaveConnector({
//         top_stave: stave1,
//         bottom_stave: stave2,
//         type: 'brace',
//     });
//
//     vf.draw();

})

let rlut;
let orig_notes;
let notes;

function load_rlut() {
    rlut = []

    for (const lut_entry of document.getElementById("random_lut").value.split(';')) {
        let s = lut_entry.split(',')

        rlut.push({length: s[0], octave: parseInt(s[1])})
    }
}

function output_notes() {
    document.getElementById('note_output').value = notes.toString()
    document.getElementById('index_output').value = notes.map(x => get_index(x) + 1).join(',')
}

function load_notes() {
    orig_notes = []

    for (const splitElement of document.getElementById("random_notes").value.split(',')) {
        orig_notes.push(parseInt(splitElement))
    }

    notes = orig_notes

    output_notes()
}

function get_index(halftone) {
    for (let i = 0; i < orig_notes.length; i++) {
        if (orig_notes[i] === halftone)
            return i;
    }

    throw 'no!';
}

function wrap_note(param) {
    let cur = param % 12;

    if (cur < 0)
        cur = 12 + cur;

    return cur;
}

function transcribe() {
    let amount = parseInt(document.getElementById('transcription_amount').value)

    if (isNaN(amount))
        return

    let new_notes = []

    for (const note of notes) {
        new_notes.push(wrap_note(note + amount))
    }

    notes = new_notes

    output_notes()
}

function cancer() {
    notes = notes.reverse()

    output_notes()
}

function invert() {
    notes = notes.map(x => wrap_note(-x))

    output_notes()
}

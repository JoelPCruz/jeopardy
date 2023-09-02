// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];
const numOfCategories = 6;

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */
const url = 'http://jservice.io//api/clues';
async function getCatNQues() {
    
    const response = await axios.get(url);
    categories = Object.entries(response.data);
    
    let allCategoryIds = categories.map( arr => {
        const categoryArr = arr[1]; 
        return categoryArr;
    });
    
    // creating an array
    // spreading array of ids
    // reducing
    // params
    // map = accumulator
    // obj = current obj iteration
    // func
        // set maps key to obj's id and val = current obj
    // call map values
    const uniqIds = [...allCategoryIds.reduce((map, obj) => map.set(obj, obj), new Map()).values()];
    categories = _.sampleSize(uniqIds, numOfCategories);
    console.log(allCategoryIds)
    let uniqCategories = [];
    uniqCategories = _.filter(allCategoryIds,  {'category_id' : categories.category_id});
    return console.log(uniqCategories);
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare"},
 *      {question: "Bell Jar Author", answer: "Plath"},
 *      ...
 *   ]
 */


function getCategory(catId) {
    const randomIdx = Math.floor(Math.random() * catId.length);
    console.log(catId[randomIdx]);
}

/** Fill the HTML Card#jeopardy with the categories & cells for questions.
 *
 * - It should contain Card Container div and inside this it contain
 * - Card header div where Category title will be prsent
 * - The it should contain Card body div that contain Category Question,
 * - And in last ist should contain Footer div where it should contain answer which will appear on click.
 * 
 */

async function fillCard() {
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses showed property on category Index to determine what to show:
 * - if currently null, show question & set showed to "true" and render card with current index
 * - if currently true, show answer & set index to index+1"
 * */


function handleClick(evt) {
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
}

/** On click of start / restart button, set up game. */
$('#start').on("click", () => {
    $('header').fadeOut("slow", () => {

    });
});
// TODO

/** On page load, add event handler for clicking clues */

// TODO
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
$('#restart').hide();
let categories = [];
const numOfCategories = 6;
const numOfQuestions = 5;
const $jeopardyBoard = $("#jeopardy");
const $questionP = $("#question");
/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */
function getCategoryIds(catIds) {
	// selects random categories from list provided
	let randomIds = _.sampleSize(catIds.data, numOfCategories);
	let categoryIds = [];
	// push each id into an array
	for (cat of randomIds) {
		categoryIds.push(cat.id);
	}
	return categoryIds;
}

// gets data from each id provided
function getCategory(catId) {
	let cat = catId.data;
	// gets the amount of questions needed from the category
	let clues = _.sampleSize(cat, numOfQuestions);
	// gets titles from categories
	let catData = {
		title: cat[0].category.title,
		clues: []
	};
	// gets questions and answers from categories
	clues.map((arr) => {
		let cluesArr = {
			question: arr.question,
			answer: arr.answer,
			showing: null
		};
		catData.clues.push(cluesArr);
	});
	// pushes data into categories array
	categories.push(catData);
    console.log(categories)
}


/** Fill the HTML Card#jeopardy with the categories & cells for questions.
 *
 * - It should contain Card Container div and inside this it contain
 * - Card header div where Category title will be prsent
 * - The it should contain Card body div that contain Category Question,
 * - And in last ist should contain Footer div where it should contain answer which will appear on click.
 * 
 */

async function fillTable() {
    const titles = categories.map(title => title.title);
	// loops through each title and makes table headers of each
	$("thead").add("tr");
	for (let x = 0; x < numOfCategories; x++) {
		const catHeader = document.createElement("th");
		catHeader.innerText = titles[x];
		$("thead").append(catHeader);
	}
	//makes the rest of the table and gives each an id of its location
	let value = 0;
    for (let y = 0; y < numOfQuestions; y++) {
		const row = document.createElement("tr");
        value += 100;
		for (let x = 0; x < numOfCategories; x++) {
			const cell = document.createElement("td");
			cell.innerHTML = `<div id=${x}-${y}>${value}</div>`;
			row.append(cell);
		}
        // console.log(row)
		$jeopardyBoard.append(row);
	}
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses showed property on category Index to determine what to show:
 * - if currently null, show question & set showed to "true" and render card with current index
 * - if currently true, show answer & set index to index+1"
 * */


// function handleClick(e) {
// 	let x = e.target.id[0];
// 	let y = e.target.id[2];
// 	if (e.target.classList.contains("answer")) {
// 		e.target.style.height = "";
// 		e.target.style.width = "";
// 		return;
// 		// if question is displayed, display answer instead
// 	} else if (e.target.classList.contains("question")) {
		
// 		e.target.innerText = categories[x].clues[y].answer;
// 		e.target.classList.remove("question");
// 		e.target.classList.add("answer");
// 		// if nothing is displayed yet, display question
// 	} else {
// 		e.target.innerText = categories[x].clues[y].question;
// 		e.target.classList.add("question");
// 	}

// }

function handleClick(e) {
	// x and y are used to change the data displayed into the correct questions and answers
	let x = e.target.id[0];
	let y = e.target.id[2];
	// if answer is displayed, do nothing
	if (e.target.classList.contains("answer")) {
		return;
		// if question is displayed, display answer instead
	} else if (e.target.classList.contains("question")) {
		e.target.innerText = categories[x].clues[y].answer;
		e.target.classList.remove("question");
		e.target.classList.add("answer");
		// if nothing is displayed yet, display question
	} else {
		e.target.innerText = categories[x].clues[y].question;
		e.target.classList.add("question");
	}
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
	$(document).on( "ajaxStop", function() {
		$( ".fa-spinner" ).show();
	});
	
}

// /** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
	$('.fa-spinner').hide();
	$(document).on( "ajaxStart", function() {
		$( ".fa-spinner" ).show();
	});
	
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
	// get 100 categories from jservice.io
	$("#start").hide();
	showLoadingView()
	const resCategories = await axios.get("http://jservice.io/api/categories", {
		params: {
			count: 100
		}
	});
	hideLoadingView()
	let catIds = getCategoryIds(resCategories);

	for (id of catIds) {
		// for each id, get clue data from jservoce.io
		const resTitles = await axios.get("http://jservice.io/api/clues", {
			params: {
				category: id
			}
		});
        let res = getCategory(resTitles);
		console.log(res)
	}
	fillTable();
}
$("#restart").on("click", function() {
	location.reload();
});

// when document is loaded, start game and add event listener for jeopardy board
$("#start").on("click", function() {
	setupAndStart();
	("#restart").show();
});
$jeopardyBoard.on("click", handleClick);




//   $( document ).on( "ajaxStop", function() {
// 	$( ".fa-spinner" ).hide();
//   } );

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO
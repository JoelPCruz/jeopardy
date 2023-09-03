# jeopardy
$jeopardyBoard.on("click", function() {
		$jeopardyBoard.hide();
		let question = `
			<h1 class="question">${categories[x].clues[y].question}</h1>
		`;
		$(".card-body").append(question)
	});
	

	$(".card-body").on("click", function() {
		let question = `
			<h1 class="question">${categories[x].clues[y].question}</h1>
		`;
		$(".card-body").append(question)
	});

	$(".question").on("click", function() {
		let answer = `
		<p class="answer">${categories[x].clues[y].answer}</p>
		`;
		$(".card-body").replaceWith(answer);
	});

	$(".answer").on("click", function() {
		$jeopardyBoard.show();
	});

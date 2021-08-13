export function inputHandler(formSelector, inputSelector) {
	const form = document.querySelector(formSelector);
	const input = document.querySelector(inputSelector);
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		console.log(input.value);
		alert('form submitted');
	});
}
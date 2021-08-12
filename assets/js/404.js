
$( document ).ready(function() {

	$('.error').draggable();

	var audioDir = 'https://doraemonxxx.github.io/portfolio-v2/assets/sounds/Windows-XP-Critical-Stop.mp3';

	var critical = new Audio(audioDir);

	var error = '<div class="error">' + $('.error').html() + '</div>',
		x = window.innerWidth / 3,
		y = window.innerHeight / 3;

	$(document).on('click', '.ok, .close-button', function () {
		critical.play();
		$('body').append(error);
		$('.error').last()
			.css({
				top: y + 'px',
				left: x + 'px'
			}).draggable();

		x += 4;
		y += 4;
	});
});
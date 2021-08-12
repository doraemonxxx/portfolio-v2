// $(window).load(function() {

// 	$('#loader').addClass('is_active');

// 	setTimeout(function() {
// 		$('#loader').addClass('is_loaded');
// 	}, 4000);

// 	setTimeout(function() {
// 		$('#loader_second').addClass('is_loaded');
// 	}, 1800);
// });


document.onreadystatechange = function () {
	var state = document.readyState
	if (state == 'interactive') {
		// console.log('interactive true')
		$('#loader').addClass('is_active');

		setTimeout(function() {
			$('#loader').addClass('is_loaded');
		}, 5000);

		setTimeout(function() {
			$('#loader_second').addClass('is_loaded');
		}, 1800);

	} else if (state == 'complete') {
		// console.log('complete true')
	}
}
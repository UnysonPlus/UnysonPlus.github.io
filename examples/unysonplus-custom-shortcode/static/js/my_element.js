/* my_element — reveal each Highlight Box as it scrolls into view.
 *
 * Progressive enhancement: the box is fully visible with no JS. This script
 * adds the hidden start state itself (the `--reveal` class), so if the script
 * never loads, nothing is hidden. It also bows out when the visitor prefers
 * reduced motion.
 */
(function () {
	var boxes = document.querySelectorAll('.my-element');
	if (!boxes.length) return;

	var reduce =
		window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduce || !('IntersectionObserver' in window)) return;

	var io = new IntersectionObserver(
		function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					io.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.15 }
	);

	boxes.forEach(function (box) {
		box.classList.add('my-element--reveal'); // hidden start state, added only when JS runs
		io.observe(box);
	});
})();

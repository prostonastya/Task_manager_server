'use strict';

;(function ($) {
	$(window).on('load', function (e) {
		var taskLink = $('.toggle-task-list a');
		var taskContent = $('.task-content');
		var taskHeader = $('.task-header');
		var overlay = $('.overlay');
		var editTaskBlock = $('.edit-task');

		var addTaskBtn = $('.add-task');
		function tabTask(e) {
			e.preventDefault();
			// получить значение ссылки
			var activeBlock = $(this).attr('href');

			// удаление классов
			taskLink.removeClass('active');
			taskContent.removeClass('active');

			// повесить класс на текущий task-content, link
			$(this).addClass('active');
			$(activeBlock).addClass('active');
		}

		function taskAccordion(e) {
			// console.dir(e.target);
			if (!$(e.target).hasClass('icon-cancel')) {
				var parentTask = $(this).closest('.task');
				var taskContentWrap = $(parentTask).find('.task-content-wrap');
				// console.log(taskContentWrap);

				if ($(parentTask).hasClass('open')) {
					$(taskContentWrap).slideUp(500, function () {
						$(parentTask).removeClass('open');
					});
				} else {
					$(taskContentWrap).slideDown(500, function () {
						$(parentTask).addClass('open');
					});
				}
			}
		}

		function openEditBlock(e) {
			$([overlay, editTaskBlock]).toggleClass('open');
		}

		taskLink.on('click', tabTask);
		taskHeader.on('click', taskAccordion);
		addTaskBtn.on('click', openEditBlock);
	});
})(jQuery);
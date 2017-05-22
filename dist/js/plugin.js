;(function($){
	$(window).on('load', function(e){
		let taskLink = $('.toggle-task-list a');
		let taskContent = $('.task-content');
		let taskHeader = $('.task-header');
		let addTaskBtn = $('.add-task');
		let overlay = $('.overlay');
		let editTaskBlock = $('.edit-task');

		function tabTask(e){
			e.preventDefault();
			// получить значение ссылки
			let activeBlock = $(this).attr('href');

			// удаление классов
			taskLink.removeClass('active');
			taskContent.removeClass('active');

			// повесить класс на текущий task-content, link
			$(this).addClass('active');
			$(activeBlock).addClass('active');

		}

		function taskAccordion(e){
			// console.dir(e.target);
			if(!$(e.target).hasClass('icon-cancel')){
				let parentTask = $(this).closest('.task');
				let taskContentWrap = $(parentTask).find('.task-content-wrap');
				// console.log(taskContentWrap);

				if ($(parentTask).hasClass('open')){
					$(taskContentWrap).slideUp(500, function (){
						$(parentTask).removeClass('open');
					});
				} else {
					$(taskContentWrap).slideDown(500, function (){
						$(parentTask).addClass('open');
					});
				}
			}
		}

		function openEditBlock(e){
			$([overlay, editTaskBlock]).toggleClass('open');
		}

		taskLink.on('click', tabTask);
		taskHeader.on('click', taskAccordion);
		addTaskBtn.on('click', openEditBlock);


	})
})(jQuery);
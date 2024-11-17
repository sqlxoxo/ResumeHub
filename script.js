document.addEventListener('DOMContentLoaded', () => {
	const addProjectBtn = document.getElementById('add-project-btn')
	const addProjectForm = document.getElementById('add-project-form')
	const cancelAddBtn = document.getElementById('cancel-add')
	const projectList = document.getElementById('project-list')
	const projectImageUpload = document.getElementById('project-image-upload')

	// Показать форму добавления проекта
	addProjectBtn.addEventListener('click', () => {
		addProjectForm.style.display = 'block'
		addProjectBtn.style.display = 'none'
	})

	// Отмена добавления
	cancelAddBtn.addEventListener('click', () => {
		addProjectForm.reset()
		addProjectForm.style.display = 'none'
		addProjectBtn.style.display = 'block'
	})

	// Добавить проект
	addProjectForm.addEventListener('submit', event => {
		event.preventDefault()

		// Получаем данные из формы
		const title = document.getElementById('project-title').value
		const description = document.getElementById('project-description').value
		let imageSrc = 'https://via.placeholder.com/300' // Плейсхолдер по умолчанию

		// Если загружено изображение
		if (projectImageUpload.files && projectImageUpload.files[0]) {
			const reader = new FileReader()
			reader.onload = function (e) {
				imageSrc = e.target.result

				// Создаем карточку проекта
				addProjectToPortfolio(title, description, imageSrc)
			}
			reader.readAsDataURL(projectImageUpload.files[0])
		} else {
			// Создаем карточку проекта с плейсхолдером
			addProjectToPortfolio(title, description, imageSrc)
		}

		// Сбрасываем и скрываем форму
		addProjectForm.reset()
		addProjectForm.style.display = 'none'
		addProjectBtn.style.display = 'block'
	})

	// Функция добавления проекта
	function addProjectToPortfolio(title, description, imageSrc) {
		const projectCard = document.createElement('div')
		projectCard.classList.add('project-card')
		projectCard.innerHTML = `
            <img src="${imageSrc}" alt="${title}">
            <h3>${title}</h3>
            <p>${description}</p>
        `

		// Добавляем карточку в список проектов
		projectList.appendChild(projectCard)
	}
})

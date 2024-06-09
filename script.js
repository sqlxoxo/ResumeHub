document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('contact-form')

	form.addEventListener('submit', function (event) {
		event.preventDefault()

		const name = document.getElementById('name').value
		const email = document.getElementById('email').value
		const message = document.getElementById('message').value

		// Здесь можно добавить логику для отправки данных на сервер или другие действия
		console.log(`Имя: ${name}, Email: ${email}, Сообщение: ${message}`)

		alert('Ваше сообщение отправлено!')
		form.reset()
	})
})

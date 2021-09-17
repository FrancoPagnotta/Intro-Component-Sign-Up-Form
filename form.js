const d = document;

export default function formValidation() {
	const $form = d.querySelector('.form');
	const $inputs = d.querySelectorAll('.form *[required]'); //.form *[required] give us access to all .form childs that have the required attribute
	
	$inputs.forEach(input => {
		const $span = d.createElement('SPAN');
		$span.id = input.name;
		$span.classList.add('error-message','none');
		$span.textContent = input.title;

		input.insertAdjacentElement('afterend',$span);
	});

	d.addEventListener('keyup', (e)=> {
		if (e.target.matches('.form *[required]')) {
			let $input = e.target;
			let pattern = $input.pattern;

			if (pattern && $input.value !== '') {
				let regex = new RegExp(pattern);
				// return !regex.exec($input.value)
				// ?(d.getElementById($input.name).classList.add('is-active'),$input.classList.add('error'))
				// :(d.getElementById($input.name).classList.remove('is-active'),$input.classList.remove('error'))

				if (!regex.exec($input.value)) {
					d.getElementById($input.name).classList.add('is-active');
					$input.classList.add('error');

					if ($input.id == 'input-name') d.getElementById($input.name).textContent = 'only letters and whitespaces';
					if ($input.id == 'input-lastName') d.getElementById($input.name).textContent = 'only letters and whitespaces';
					if ($input.id == 'input-email') d.getElementById($input.name).textContent = 'that must be characters@characters.domain';
					if ($input.id == 'input-password') d.getElementById($input.name).textContent = 'one number, one uppercase and lowercase letter, and 8 or more characters';
					
				}

				else {
					d.getElementById($input.name).classList.remove('is-active');
					$input.classList.remove('error');
				}
			}
		}
	});
	
	d.querySelector('.form-btn').addEventListener('click', (e)=> {
		$inputs.forEach((input)=> {
			if (input.value == '') {
				input.classList.add('error');
				d.getElementById(input.name).classList.add('is-active');
			}
		});
	})
}
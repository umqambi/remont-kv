// Mobile menu switcher
function showMobileMenu() {
	const menuContainer = document.querySelector('#top-bar')
	const navlinks = document.querySelector('#top-nav')
	const trigger = document.querySelector('#mobile-menu-trigger')
	const icon = trigger.children
	
	if (menuContainer.classList.contains('mobile-menu--on')) {
		menuContainer.classList.remove('mobile-menu--on')
		icon[0].classList.toggle('fa-bars', true)
		icon[0].classList.toggle('fa-times', false)
		navlinks.style.display = 'none'
	} else {
		menuContainer.classList.add('mobile-menu--on')
		icon[0].classList.toggle('fa-bars', false)
		icon[0].classList.toggle('fa-times', true)
		navlinks.style.display = 'block'
	}

	return false
}



function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}

// Top bar background change
window.onscroll = function changeNav(){
var scrollPosY = window.pageYOffset | document.body.scrollTop;
    var navBar = document.getElementById('top-bar'),
    navBarHeight = navBar.getBoundingClientRect().height;
    if(scrollPosY <= 100) {
         navBar.classList.remove('bg-black');
    } else {
          navBar.classList.add('bg-black');
    }
}

// slider

var sliders = document.querySelectorAll('.glide');
if (sliders.length > 0) {
	for (var i = 0; i < sliders.length; i++) {
		var glide = new Glide(sliders[i], {
			type: 'slider',
			bound: true,
		  	perView: 3,
		  	breakpoints: {
		  		720: {
		  			perView: 1
		  		}
		  	}
		});

		glide.mount();
	}
}


const contactFormContainer = document.getElementById("contactFormContainer");
const contactFormSubmit = document.getElementById("contactFormSubmit")
function sendContactForm() {
	var name = document.getElementById("contactFormName");
	var email = document.getElementById("contactFormEmail");
	var phone = document.getElementById("contactFormPhone");
	var message = document.getElementById("contactFormMessage")
	var rodoAgreement = document.getElementById("contactFormRodo")
	
	name.classList.remove("error");
	email.classList.remove("error");
	document.getElementById('rodoAgreementLabel').classList.remove('error');
	

	// Check form data
	errors = false;
	if (name.value == '') {
		name.classList.add('error');
		errors = true
	}
	if (email.value == '') {
		email.classList.add('error');
		errors = true
	}
	if (rodoAgreement.checked == false) {
		document.getElementById('rodoAgreementLabel').classList.add('error');
		errors = true
	}
	
	if (!errors) {
		contactFormSubmit.value = "Wysyłam..."

	
		var data = new FormData();
		data.append('name', name.value);
		data.append('email', email.value)
		data.append('phone', phone.value)
		data.append('message', message.value);

		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/send-contact-form.php', true);
		xhr.onload = function () {
		    // do something to response
		    var json = JSON.parse(this.responseText);
		    if (json.success) {
		    		animateCSS('#contactFormContainer', 'fadeOut', function() {
					  	contactFormContainer.innerHTML = "<p>Dziękujemy za przesłanie zapytania.</h1><p>Nasz pracownik wkrótce się z Państwem skontaktuje.</p><p class='small'><br><br>Z poważaniem<br>Zespół Inner Concept</p>"
					  	contactFormContainer.classList.add("after-send")
					  	animateCSS('#contactFormContainer', 'fadeIn')
					})
	        } else {
	            button.value = "Błąd wysyłki"
	        }
		};
		xhr.send(data);
	}
	
	return false
}


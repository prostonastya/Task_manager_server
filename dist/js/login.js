
;(function ($){
	class Login{
		constructor(){
			this._form = document.forms['loginForm'];
			this._allInputReq = document.querySelectorAll('.required');			
			this._inputSavePassword = this._form.elements['check'];
			// this._sendFormBtn = this._form.elements['save-pas'];
			this._canSend = true;
			this._formData = {};
			this.regExp = {
				login:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				password:/\S+/,
			}
		}

		init() {
            var self = this;
            // this.checkTocken();
            if (this._form == undefined || this._allInputReq == undefined) {
                console.error('Form elements undefined');
            } else {
                this.formEvents(self);
            }
        }

		formEvents(self) {
            this._form.addEventListener('submit', function (e) {
                e.preventDefault();
                self._canSend = true;
                self._formData = {};
                self._allInputReq.forEach(input => {
                    if (!self.regExp[input.name].test(input.value)) {
                        input.classList.add('error');
                        self._canSend = false;
                    } else {
                        input.classList.remove('error');
                        self._formData[input.name] = input.value;
                    }
                });
                console.log(self._formData);
                
            self._canSend ? self.sendFormAjax(self._formData) : console.error('input regexp test error');
            })
        }
		sendFormAjax(data) {
			console.log('all')
            $.ajax({
                method: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/JSON',
                success: function (res) {
                    console.log(res);
                },
                error: function (err) {
                    console.log(err)
                }
            })
        }

		
		// generateTocken(){
			
		// }
	}

	var newLogin = new Login();
	newLogin.init();

})(jQuery);
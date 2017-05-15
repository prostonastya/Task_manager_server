'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function ($) {
    var Login = function () {
        function Login() {
            _classCallCheck(this, Login);

            this._form = document.forms['loginForm'];
            this._allInputReq = document.querySelectorAll('.required');
            this._inputSavePassword = this._form.elements['check'];
            // this._sendFormBtn = this._form.elements['save-pas'];
            this._canSend = true;
            this._formData = {};
            this.regExp = {
                login: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                password: /\S+/
            };
        }

        _createClass(Login, [{
            key: 'init',
            value: function init() {
                var self = this;
                this.checkToken();
                if (this._form == undefined || this._allInputReq == undefined) {
                    console.error('Form elements undefined');
                } else {
                    this.formEvents(self);
                }
            }
        }, {
            key: 'checkToken',
            value: function checkToken() {
                localStorage.getItem('taskTocken') || sessionStorage.getItem('taskTocken') ? window.location = '/task' : false;
            }
        }, {
            key: 'formEvents',
            value: function formEvents(self) {
                this._form.addEventListener('submit', function (e) {
                    e.preventDefault();
                    self._canSend = true;
                    self._formData = {};
                    self._allInputReq.forEach(function (input) {
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
                });
            }
        }, {
            key: 'sendFormAjax',
            value: function sendFormAjax(data) {
                console.log('all');
                $.ajax({
                    method: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/JSON',
                    success: function success(res) {
                        console.log(res);
                        self._inputSavePassword.checked ? localStorage.setItem('taskToken', res._id) : sessi
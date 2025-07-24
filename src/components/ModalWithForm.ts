import { Modal } from './common/Modal';
import { IEvents } from './base/events';

interface IModalForm {
	valid: boolean;
	inputValues: Record<string, string>;
	error: Record<string, string>;
}

export class ModalWithForm extends Modal<IModalForm> {
	protected inputs: NodeListOf<HTMLInputElement>;
	protected _form: HTMLFormElement;
	protected errors: Record<string, HTMLElement>;
	protected formName: string;
	protected submitButton: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);
		this.inputs = this.container.querySelectorAll<HTMLInputElement>('.popup__input');
		this._form = this.container.querySelector('.popup__form');
		this.formName = this._form.getAttribute('name');
		this.submitButton = this._form.querySelector('.popup__button');
		this.errors = {};
		this.inputs.forEach((input) => {
			this.errors[input.name] = this._form.querySelector(`#${input.id}-error`);
		});
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this.events.emit(`${this.formName}:submit`, this.getInputValues());
		});
		this._form.addEventListener('input', (evt: InputEvent) => {
			const target = evt.target as HTMLInputElement;
			const field = target.name;
			const value = target.value;
			this.events.emit(`${this.formName}:input`, {field, value});
		});
	}

	protected getInputValues() {
		const valuesObject: Record<string, string> = {};
		this.inputs.forEach((input) => {
			valuesObject[input.name] = input.value;
		});
		return valuesObject;
	}

	set inputValues(data: Record<string, string>) {
		this.inputs.forEach((input) => {
			input.value = data[input.name];
		});
	}

	set error(data: {field: string; value: string; validationInformation: string}) {
		if (data.validationInformation) {
			this.showInputError(data.field, data.validationInformation);
		} else {
			this.hideInputError(data.field);
		}
	}

	protected showInputError(field: string, errorMessage: string) {
		this._form[field].classList.add('popup__input_type_error');
		this.errors[field].classList.add('popup__error_visible');
		this.errors[field].textContent = errorMessage;
	}

	protected hideInputError(field: string) {
		this._form[field].classList.remove('popup__input_type_error');
		this.errors[field].classList.remove('popup__error_visible');
		this.errors[field].textContent = '';
	}

	set valid(isValid: boolean) {
		this.submitButton.classList.toggle('popup__button_disabled', !isValid);
		this.submitButton.disabled = !isValid;
	}

	get form() {
		return this._form;
	}

	close() {
		super.close();
		this._form.reset();
		this.inputs.forEach((input) => {
			this.hideInputError(input.name);
		});
	}
}
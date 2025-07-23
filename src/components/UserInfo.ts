import { Component } from './base/Component';
import { TUserPublicInfo } from '../types';
import { IEvents } from './base/events';

export class UserInfo extends Component<TUserPublicInfo> {
	protected container: HTMLElement;
	protected userNameElement: HTMLElement;
	protected userAboutElement: HTMLElement;
	protected userAvatarElement: HTMLDivElement;
	protected userEditButton: HTMLButtonElement;
	protected userAddButton: HTMLButtonElement;
	protected events: IEvents;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;
		this.userNameElement = container.querySelector('.profile__title');
		this.userAboutElement = container.querySelector('.profile__description');
		this.userAvatarElement = container.querySelector('.profile__image');
		this.userAddButton = container.querySelector('.profile__add-button');
		this.userEditButton = container.querySelector('.profile__edit-button');

		this.userEditButton.addEventListener('click', () => {
			this.events.emit('userEdit:open');
		});

		this.userAddButton.addEventListener('click', () => {
			this.events.emit('newCard:open');
		});

		this.userAvatarElement.addEventListener('click', () => {
			this.events.emit('avatar:open');
		});
	}

	set name(name: string) {
		this.userNameElement.textContent = name;
	}

	set about(about: string) {
		this.userAboutElement.textContent = about;
	}

	set avatar(link: string) {
		this.userAvatarElement.style.backgroundImage = `url(${link})`;
	}
}
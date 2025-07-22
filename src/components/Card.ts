import { IEvents } from './base/events';
import { cloneTemplate } from '../utils/utils';
import { ICard, IUser } from '../types';

export class Card {
	protected element: HTMLElement;
	protected events: IEvents;
	protected likeButton: HTMLButtonElement;
	protected likeCount: HTMLElement;
	protected deleteButton: HTMLButtonElement;
	protected cardImage: HTMLDivElement;
	protected cardTitle: HTMLElement;
	protected cardId: string;

	constructor(template: HTMLTemplateElement, events: IEvents) {
		this.events = events;
		this.element = cloneTemplate(template);

		this.likeButton = this.element.querySelector('.card__like-button');
		this.likeCount = this.element.querySelector('.card__like-count');
		this.deleteButton = this.element.querySelector('.card__delete-button');
		this.cardImage = this.element.querySelector('.card__image');
		this.cardTitle = this.element.querySelector('.card__title');

		this.cardImage.addEventListener('click', () => {
			this.events.emit('card:select', {card: this});
		});

		this.deleteButton.addEventListener('click', () => {
			this.events.emit('card:delete', {card: this});
		});

		this.likeButton.addEventListener('click', () => {
			this.events.emit('card:like', {card: this, isLike: this.isLiked()});
		});
	}

	isLiked() {
		return this.likeButton.classList.contains('card__like-button_is-active');
	}

	render(cardData: Partial<ICard>, userId: string) {
		const {likes, owner, ...otherCardData} = cardData;

		if (likes) {
			this.likes = {likes, userId};
		}

		if (owner) {
			this.owner = {owner, userId};
		}

		Object.assign(this, otherCardData);

		return this.element;
	}

	set _id(id) {
		this.cardId = id;
	}

	get _id() {
		return this.cardId;
	}

	set name(name: string) {
		this.cardTitle.textContent = name;
	}

	set link(link: string) {
		this.cardImage.style.backgroundImage = `url(${link})`;
	}

	set owner({owner, userId}: {owner: IUser, userId: string}) {
		if (owner._id !== userId) {
			this.deleteButton.remove();
		}
	}

	set likes({likes, userId}: {likes: IUser[], userId: string}) {
		const cardIsLiked = likes.some((like) => like._id === userId);
		this.likeButton.classList.toggle('card__like-button_is-active', cardIsLiked);
		this.likeCount.textContent = String(likes.length);
	}

	deleteCard() {
		this.element.remove();
		this.element = null;
	}
}
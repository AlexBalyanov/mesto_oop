import { Component } from './base/Component';

interface ICardContainer {
	catalog: HTMLElement[];
}

export class CardsContainer extends Component<ICardContainer> {
	protected _catalog: HTMLElement;

	constructor(protected container: HTMLElement) {
		super(container);
	}

	set catalog(items: HTMLElement[]) {
		this.container.replaceChildren(...items);
	}
}
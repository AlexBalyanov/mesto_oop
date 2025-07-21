import './blocks/index.css';
import { EventEmitter } from './components/base/events';
import { CardData } from './components/CardsData';
import { UserData } from './components/UserData';
import { IApi } from './types';
import { Api } from './components/base/api';
import { API_URL, settings } from './utils/constants';
import { AppApi } from './components/AppApi';

const events = new EventEmitter();

const cardsData = new CardData(events);
const userData = new UserData(events);

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

Promise.all([api.getUser(), api.getCards()])
	.then(([userInfo, cards]) => {
		console.log(userInfo);
		console.log(cards);
	})
	.catch((err) => {
		console.log(err);
	})


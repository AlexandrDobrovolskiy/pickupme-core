import { Document } from 'mongoose';

interface Authentication {
	firebase: string;
}

export interface User extends Document {
  name: string;
	phone: string;
	telegramId: string;
	authentication: Authentication;
}
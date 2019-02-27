import { sync } from "glob";
import { union } from "lodash";

const getMongoConnectionString = () => {
	switch(process.env.NODE_ENV) {
		case 'doker':
			return 'mongodb://mongo:27017/express-typescript-starter';
		case 'development':
			return 'mongodb://localhost:27017/pickupme';
		case 'production':
			return 'mongodb://hZsBjny88GbwJyaw:67C2WTf748R2zeuDkJTn@127.0.0.1:27017/pickupme?authSource=admin';
		default:
			return 'mongodb://hZsBjny88GbwJyaw:67C2WTf748R2zeuDkJTn@165.227.157.101:27017/pickupme?authSource=admin';
	}
}

export default class Config {
	public static port: number = 8080;
	public static routes: string = "./dist/routes/**/*.js";
	public static models: string = "./dist/models/**/*.js";
	public static useMongo: boolean = true;
	public static mongodb = getMongoConnectionString();
	public static globFiles(location: string): string[] {
		return union([], sync(location));
	}
}
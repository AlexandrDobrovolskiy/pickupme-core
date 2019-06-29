import * as admin from 'firebase-admin';

class FirebaseAdmin {
  public static initialized: boolean = false;
  public static instance: any = admin;

  public static async init(databaseURL: string, credentialsPath: string = 'firebase.json'): Promise<void> {
    if (FirebaseAdmin.initialized) {
      console.warn('Firebase admin is already initialized.');
      console.trace();
      return;
    }

    admin.initializeApp({
      credential: admin.credential.cert(credentialsPath),
      databaseURL,
    });

    console.log('Firebase Admin initialized.');
  }

  public static verifyToken(token: string) {
    return admin.auth().verifyIdToken(token);
  }
};

export default FirebaseAdmin;

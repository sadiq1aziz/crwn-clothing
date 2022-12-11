import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore';
import {
    onAuthStateChanged,
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBBplKem1gacxU6VLHeF5WEc8E1D_EGOUE",
    authDomain: "crwn-clothing-db-59520.firebaseapp.com",
    projectId: "crwn-clothing-db-59520",
    storageBucket: "crwn-clothing-db-59520.appspot.com",
    messagingSenderId: "31288517033",
    appId: "1:31288517033:web:a9bb018f931e096a7c64b8"
};

//initializing firebase instance
const firebaseapp = initializeApp(firebaseConfig);
//creating instance of Provider for auth
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

// getting auth singleton w.r.t initialized firebase instance
export const auth = getAuth();
// function call to fetch signed in user post successful authentication 
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//creating db instance (firestore)
export const db = getFirestore();

//create categories collections and documents - one time use to set data in firestore db
export const addCollectionsAndDocuments = async(collectionKey, objectsToAdd) => {
    // get a collection ref w.r.t db
    const collectionRef = collection(db, collectionKey);
    // initiate transaction of writes that we want 
    // to perform in db
    const batch = writeBatch(db);
    // iterate over objects collection : for each object we get a doc ref and
    // we also set the object key, values in the batch
    objectsToAdd.forEach( (object) => {
        const docRef = doc( collectionRef,  object.title.toLowerCase());
        batch.set(docRef, object);
    })

    //initiate transaction;
    await batch.commit();
    console.log("transaction done");
} 

// get categories and documents
// 1. make a collection ref : accepts 2 args - a)db points to our db instance in firestore 
//                                            b) key points to our collection available in firestore
// 2. make a query with collection ref
// 3. get query snapshot - executes query and retrieves querySnapShot results 
// 4. We iterate through that object to retrieve our documentdata and store in our custom object - categoryMap
//    ie, the documents pertaining to that collection/categories
export const getCategoriesAndDocuments = async() => {
    const collectionRef  = collection(db,'categories' );
    const q = query(collectionRef);

    //get querySnapshot
    const querySnapshot = await getDocs(q);

    // iterate over results, fetch and store in custom object
    const categoriesMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;    
    }, {});

    return categoriesMap;

}

//function to create User instance in firestore via userDocRef methodology
export const createUserDocumentFromAuth = async (userAuth, otherAttributes) => {
    //use doc to get the userDocReference that points to location in Firestore
    const userDocReference = doc(db, 'users', userAuth.uid);
    console.log(userDocReference);
    //use getDoc to check if the doc exists or not
    const userSnapshot = await getDoc(userDocReference);

    //setDoc instance if doesnt exist
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocReference, {
                displayName,
                email,
                createdAt,
                ...otherAttributes
            })

        } catch (error) {
            console.log('Error creating document', error);
        }
    }
    return userDocReference;
}

//function to sign up with Email and password
export const createAuthUserViaEmailPassword = async (email, password) => {
    if (!email || !password) return
    return await createUserWithEmailAndPassword(auth, email, password);
}

//function to sign in with Email and password
export const signInUserWithEmailPassword = async (email, password) => {
    if (!email || !password) return
    return await signInWithEmailAndPassword(auth, email, password);
}

export const userSignOut = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
    return onAuthStateChanged(auth, callback);
}
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEvHcQgdMWBZuG6F_1gfCxBSXMcfj8wTI",
  authDomain: "ribka-portfolio.firebaseapp.com",
  projectId: "ribka-portfolio",
  storageBucket: "ribka-portfolio.firebasestorage.app",
  messagingSenderId: "401052065514",
  appId: "1:401052065514:web:0507a97afc0eaaf0ed8193",
  measurementId: "G-YQBVTV0DBK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

export const submitIdea = async (projectTitle, idea) => {
  try {
    const docRef = await addDoc(collection(db, 'projectIdeas'), {
      projectTitle,
      idea,
      timestamp: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting idea:', error);
    return { success: false, error: error.message };
  }
}; 
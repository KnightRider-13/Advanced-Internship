"use server"

import { db } from "@/firebase";
import { BookType } from "@/types/book";
import { doc, getDoc } from "firebase/firestore";


  export async function FetchFavorites(userId: string): Promise<BookType[]> {
    if (!userId) {
      return [];
    }
  
    try {
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        return Array.isArray(data?.favorites) ? data.favorites : [];
      } else {
        console.log("User document not found.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      return [];
    }
  }
  
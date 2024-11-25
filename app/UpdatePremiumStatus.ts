import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

export const updatePremiumStatus = async (userId: string, plan: 'Premium' | 'Premium-Plus') => {
  const db = getFirestore();
  const customerRef = doc(db, "customers", userId);
  const subscriptionEndDate = plan === 'Premium-Plus'
  ? new Date(Date.now() + 372 * 24 * 60 * 60 * 1000)
  : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  try {
    await setDoc(customerRef, {
      premiumStatus: plan,
      subscriptionStartDate: new Date().toISOString(),
      subscriptionEndDate: subscriptionEndDate.toISOString(),
    }, { merge: true });

    console.log(`User ${userId} upgraded to ${plan} with end date: ${subscriptionEndDate}`);
  } catch (error) {
    console.error("Error updating premium status: ", error);
  }
};
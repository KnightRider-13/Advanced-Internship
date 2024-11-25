"use client";

import { IoDocumentText } from "react-icons/io5";
import Footer from "../components/home/Footer";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeLoginModal, openLoginModal } from "@/redux/modalSlice";
import { getCheckoutUrl } from "../StripePayment";
import { accordionData } from "@/public/data/accordionData";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "@/firebase";
import { login, setPremiumStatus } from "@/redux/authSlice";
import { updatePremiumStatus } from "../UpdatePremiumStatus";


export default function ChoosePlan() {
  const [selectedPlan, setSelectedPlan] = useState<'yearly' | 'monthly'>('yearly');
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const router = useRouter(); 
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  const auth = getAuth();
  const isAutghenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const subscriptionStatus = useSelector((state: RootState) => state.auth.premiumStatus);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        dispatch(login());
        dispatch(closeLoginModal());
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch]);

  const upgradeToPremiumMonthly = async () => {
    const priceId = "price_1QOhqsLvRL6qQUR0CZal7eQ0";
    const checkoutURL = await getCheckoutUrl(app, priceId);
    router.push(checkoutURL);
    if (user) {
      await updatePremiumStatus(user.uid, 'Premium');
      dispatch(setPremiumStatus('Premium'));
    }
  }

  const upgradeToPremiumYearly = async () => {
    const priceId = "price_1QOhraLvRL6qQUR0AosEoxZQ";
    const trialPeriodDays = 7; 
  const checkoutURL = await getCheckoutUrl(app, priceId, trialPeriodDays);
    router.push(checkoutURL);
    if (user) {
      await updatePremiumStatus(user.uid, 'Premium-Plus');
      dispatch(setPremiumStatus('Premium-Plus'))
    }
  }

  useEffect(() => {
    const checkUserStatus = async () => {
      if (isAutghenticated && subscriptionStatus != "") {
        router.push("/for-you");
      } else {
        setUser(null);
      }
    };

    checkUserStatus();
  }, [router]);

  const handleAccordionClick = (id: number) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  }
  const handlePlanSelect = (plan: 'yearly' | 'monthly') => {
    setSelectedPlan(plan);
  };
  const handleButtonClick = () => {
    if (!user) {
      dispatch(openLoginModal());
    } else {
      if (selectedPlan === 'monthly') {
        upgradeToPremiumMonthly(); 
      } else if(selectedPlan === "yearly"){
        upgradeToPremiumYearly();
      }
    }
  };

  return (
    <div className="wrapper wrapper__full">
      <div className="plan">
        <div className="plan__header--wrapper">
          <div className="plan__header">
            <div className="plan__title">
              Get unlimited access to many amazing books to read
            </div>
            <div className="plan__sub--title">
              Turn ordinary moments into amazing learning opportunities
            </div>
            <figure className="plan__img--mask">
              <img src="/assets/pricing-top.png" />
            </figure>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="plan__features--wrapper">
              <div className="plan__features">
                <figure className="plan__features--icon-wrapper">
                  <IoDocumentText className="plan__features--icon" />
                </figure>
                <div className="plan__features--text">
                  <b>Key ideas in few min</b> with many books to read
                </div>
              </div>
              <div className="plan__features">
                <figure className="plan__features--icon-wrapper">
                  <RiPlantFill className="plan__features--icon" />
                </figure>
                <div className="plan__features--text">
                  <b>3 million</b> people growing with Summarist everyday
                </div>
              </div>
              <div className="plan__features">
                <figure className="plan__features--icon-wrapper">
                  <FaHandshake className="plan__features--icon" />
                </figure>
                <div className="plan__features--text">
                  <b>Precise recommendations</b> collections curated by experts
                </div>
              </div>
            </div>
            <div className="section__title">Choose the plan that fits you</div>
            <div className={`plan__card ${selectedPlan === 'yearly' ? 'plan__card--active' : ''}`}
             onClick={() => handlePlanSelect('yearly')}>
              <div className="plan__card--circle">
              {selectedPlan === "yearly" ? <div className="plan__card--dot"></div> : <></>}
              </div>
              <div className="plan__card--content">
                <div className="plan__card--title">Premium Plus Yearly</div>
                <div className="plan__card--price">$99.99/year</div>
                <div className="plan__card--text">
                  7-day free trial included
                </div>
              </div>
            </div>
            <div className="plan__card--separator">
              <div className="plan__separator">or</div>
            </div>
            <div className={`plan__card ${selectedPlan === 'monthly' ? 'plan__card--active' : ''}`}
              onClick={() => handlePlanSelect('monthly')}>
              <div className="plan__card--circle">
              {selectedPlan === "monthly" ? <div className="plan__card--dot"></div> : <></>}
              </div>
              <div className="plan__card--content">
                <div className="plan__card--title">Premium Monthly</div>
                <div className="plan__card--price">$9.99/month</div>
                <div className="plan__card--text">No trial included</div>
              </div>
            </div>
            <div className="plan__card--cta">
              <span className="btn--wrapper">
                <button className="btn plan__button" onClick={handleButtonClick}>
                  <span>{selectedPlan === 'yearly'
                      ? 'Start your free 7-day trial'
                      : 'Start your first month'}</span>
                </button>
              </span>
              <div className="plan__disclaimer">
              {selectedPlan === 'yearly'
                      ? 'Cancel your trial at any time before it ends, and you won’t be charged.'
                      : '30-day money back guarantee, no questions asked.'}
              </div>
            </div>
            <div className="faq__wrapper">
              {accordionData.map((item) => (
                <div className="accordion__card" key={item.id}>
                <div className="accordion__header" onClick={() => handleAccordionClick(item.id)}>
                  <div className="accordion__title">
                    {item.title}
                  </div>
                </div>
                <div className={`collapse ${activeAccordion === item.id ? "show" : ""}`}>
                  <div className="accordion__body">
                    {item.body}
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

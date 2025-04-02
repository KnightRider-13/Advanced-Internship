# Summarist Book Library

## Description

TThe Summarist Book Library is a feature-rich application built with Next.js 15, TypeScript, Redux, Firebase, CSS, and Stripe. The app provides a seamless and responsive user experience with features like an interactive audio player, a customizable sidebar, and integrated subscription payments via Stripe.

## Table of Contents

- [Description📝](#description)
- [Features✨](#features)
- [Tech Stack🛠️](#tech-stack)
- [Live Demo 📸](#live-demo)
- [Code Highlights🔍](#code-highlights)
- [Installation🛠️](#installation)
- [Future Improvements🛠️](#future-improvements)
- [Contributing🤝](#contributing)
- [Contact📧](#contact)
- [License⚖️](#license)

## Features

- User Authentication - Firebase authentication system to log users in.
- Book Library - Users can browse, add to favorites, and search books.
- Interactive Audio Player - Play, pause, and navigate through audio files of books.
- Sidebar Navigation - Customizable sidebar for easy access to different sections.
- Stripe Subscription - Manage subscription payments and access premium features.

## Tech Stack

- Next.js 15 - React framework for server-side rendering and static site generation.
- TypeScript - Ensures type safety and enhanced developer experience.
- Redux - State management for authentication and app data.
- Firebase - Real-time database and authentication solution.
- Stripe - Payment gateway for handling subscriptions.
- CSS - Styling framework for responsive design and layout.


## Live Demo

The application is deployed and accessible at: https://advanced-internship-lake.vercel.app/


## Code Highlights

### 1. Interactive Audio Player
This code snippet demonstrates an interactive audio player component. It allows users to play and pause an audio file, which is specified by the audioUrl prop. The player toggles between play and pause states when the button is clicked.
```javascript
const AudioPlayer = ({ audioUrl, bookId, onComplete }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const progressRef = useRef<HTMLInputElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 10,
        0
      );
    }
  };
  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 10,
        audioRef.current.duration
      );
    }
  };

```
### 2. Sidebar Component
This snippet shows a customizable sidebar component. It includes a button to toggle the visibility of the sidebar and a simple navigation menu with links to different sections of the app.
```javascript
export default function Sidebar({ isOpen }: SidebarProps) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string>("for-you");
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const isPlayerPage = pathname.includes("/player");
  const [fontSize, setFontSize] = useState<number>(16);
  const fontSizes = [16, 18, 22, 26];
  const activeFontIndex = fontSizes.indexOf(fontSize);

  const handleLinkClick = (link: string): void => {
    setActiveLink(link);
  };

  useEffect(() => {
    if (pathname.includes("/for-you")) {
      setActiveLink("for-you");
    } else if (pathname.includes("/library")) {
      setActiveLink("library");
    } else if (pathname.includes("/settings")) {
      setActiveLink("settings");
    }
  }, [pathname]);

  const handleFontSizeChange = (size: number): void => {
    setFontSize(size);
    const summaryElement = document.querySelector(".audio__book--summary");
    if (summaryElement) {
      (summaryElement as HTMLElement).style.fontSize = `${size}px`;
    }
  };

```
### 3. Stripe Subscription Integration
This snippet integrates Stripe's checkout functionality. It handles the process of creating a checkout session via an API call and redirects the user to Stripe's secure payment page to complete the subscription process.
```javascript
export const getCheckoutUrl = async (
  app: FirebaseApp,
  priceId: string,
  trialPeriodDays: number = 0
): Promise<string> => {
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User is not authenticated");

  const db = getFirestore(app);
  const checkoutSessionRef = collection(
    db,
    "customers",
    userId,
    "checkout_sessions"
  );

  const docRef = await addDoc(checkoutSessionRef, {
    price: priceId,
    success_url: `${window.location.origin}/for-you`,
    cancel_url: `${window.location.origin}/choose-plan`,
    trial_period_days: trialPeriodDays,
  });

  return new Promise<string>((resolve, reject) => {
    const unsubscribe = onSnapshot(docRef, (snap) => {
      const { error, url } = snap.data() as {
        error?: { message: string };
        url?: string;
      };
      if (error) {
        unsubscribe();
        reject(new Error(`An error occurred: ${error.message}`));
      }
      if (url) {
        console.log("Stripe Checkout URL:", url);
        unsubscribe();
        resolve(url);
      }
    });
  });
};
```

## Installation
### 1. Clone the repository:

```bash
git clone https://github.com/KnightRider-13/Advanced-Internship.git
```
### 2. Navigate into the project directory: 
  ```bash
   cd summarist-book-library
  ```
 
### 3. Install dependencies: 
  ```bash
   npm install
  ```
### 4. Set up Firebase configuration (provide .env.local setup if applicable).
### 5. Run the development server: 
  ```bash
   npm run dev
  ```
This will open the application in your browser at http://localhost:3000.

## Future Improvements

- Dark Mode - Add a dark mode toggle for better accessibility.

- Offline Support - Enable offline access for browsing and reading books.

- Advanced Search - Implement advanced search filters based on genre, release date etc.

- Mobile App - Transition the project into a mobile app for iOS and Android using React Native.


## Contributing

Contributions are welcome! To contribute: 

Fork the repository. 

Create a new branch (git checkout -b feature/YourFeature). 

Commit your changes (git commit -m 'Add YourFeature'). 

Push to the branch (git push origin feature/YourFeature). 

Create a pull request. 

## Contact
Ismaa'eel – www.linkedin.com/in/ismaaeel-fahmay – fahmay17@gmail.com

## License
This project does not have a license. If you'd like to use the code, please contact me for permission.



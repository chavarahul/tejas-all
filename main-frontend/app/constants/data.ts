import avatar1 from "@/app/assets/avatar-1.png";
import avatar2 from "@/app/assets/avatar-2.png";
import avatar3 from "@/app/assets/avatar-3.png";
import avatar4 from "@/app/assets/avatar-4.png";
import avatar5 from "@/app/assets/avatar-5.png";
import avatar6 from "@/app/assets/avatar-6.png";
import avatar7 from "@/app/assets/avatar-7.png";
import avatar8 from "@/app/assets/avatar-8.png";
import avatar9 from "@/app/assets/avatar-9.png";

export const pricingTiers = [
  {
    title: "Free",
    monthlyPrice: 0,
    buttonText: "Start for Free",
    popular: false,
    inverse: false,
    features: [
      "Access to 5 free machine learning models",
      "Limited usage: 5 requests per day",
      "Up to 2 projects",
      "Basic email support",
      "Limited storage: 1GB",
      "Basic integrations"
    ],
  },
  {
    title: "Pro",
    monthlyPrice: 15,
    buttonText: "Sign up now",
    popular: true,
    inverse: true,
    features: [
      "Deploy up to 5 custom ML models per month",
      "Access to all free models and some premium models",
      "Unlimited usage on free models",
      "Up to 10 projects",
      "Priority email support",
      "Custom analytics & insights",
      "Faster response times for requests"
    ],
  },
  {
    title: "Business",
    monthlyPrice: 35,
    buttonText: "Sign up now",
    popular: false,
    inverse: false,
    features: [
      "Deploy up to 15 custom ML models per month",
      "Unlimited access to all free and premium models",
      "Unlimited usage",
      "Unlimited projects",
      "Full analytics dashboard & export support",
      "Custom integrations & API access",
      "Advanced security features",
      "Priority review for your models",
    ],
  },
];

export const testimonials = [
  {
    text: "As a designer always seeking the latest tools, Framer.com quickly caught my eye and became indispensable.",
    imageSrc: avatar1.src,
    name: "Jamie Rivera",
    username: "@jamietechguru00",
  },
  {
    text: "Since implementing this tool, our team's productivity has soared and it's become a key part of our daily workflow.",
    imageSrc: avatar2.src,
    name: "Josh Smith",
    username: "@jjsmith",
  },
  {
    text: "This app has revolutionized the way I manage projects, ensuring deadlines are met with ease.",
    imageSrc: avatar3.src,
    name: "Morgan Lee",
    username: "@morganleewhiz",
  },
  {
    text: "I was blown away by how quickly we integrated this app into our team processes, making everything smoother.",
    imageSrc: avatar4.src,
    name: "Casey Jordan",
    username: "@caseyj",
  },
  {
    text: "Planning and executing events is now a breeze. This app keeps everything organized and ensures nothing gets overlooked.",
    imageSrc: avatar5.src,
    name: "Taylor Kim",
    username: "@taylorkimm",
  },
  {
    text: "The customization and seamless integrations this app offers have elevated our operations.",
    imageSrc: avatar6.src,
    name: "Riley Smith",
    username: "@rileysmith1",
  },
  {
    text: "Adopting this tool has streamlined our project management, significantly improving team communication and efficiency.",
    imageSrc: avatar7.src,
    name: "Jordan Patels",
    username: "@jpatelsdesign",
  },
  {
    text: "This app has become our central hub for task management, progress tracking, and document organization.",
    imageSrc: avatar8.src,
    name: "Sam Dawson",
    username: "@dawsontechtips",
  },
  {
    text: "Its intuitive interface and powerful features make it the perfect fit for our diverse team needs.",
    imageSrc: avatar9.src,
    name: "Casey Harper",
    username: "@casey09",
  },
];

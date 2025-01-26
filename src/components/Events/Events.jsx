import React from 'react';
import { EventCard } from './EventCard';
import { ContactInfo } from './ContactInfo';
import { SocialIcon } from './SocialIcon';
import styles from '../../styles/Events.module.css';
// import { Header } from '../Header';

const events = [
  { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/5ba65986f624270ad4c92bcee449f64986733ef7f4536cb2521f7d13f7a8cbba?placeholderIfAbsent=true&apiKey=b7dde77ca8de46239c4205de9625fdd3", title: "Karthika Masam" },
  { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/438f6a4e61da969e3af1d979146ee5f0992a669f90baf2c81bc69dc16c9f1fb0?placeholderIfAbsent=true&apiKey=b7dde77ca8de46239c4205de9625fdd3", title: "Maha Shivaratri" },
  { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ff777c82a0ad47ecd6e657956e4225560440820410c5c8e1582b3b048e6575e7?placeholderIfAbsent=true&apiKey=b7dde77ca8de46239c4205de9625fdd3", title: "Ganesha Chaturthi" },
  { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/229c592e0cce1522560ba0f67caf9af6e459647bc6fd379c13ed82bc57348e01?placeholderIfAbsent=true&apiKey=b7dde77ca8de46239c4205de9625fdd3", title: "Panguni Uthiram" },
  { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/e11ada4a160bb307efc6092a8ca0a26bf4cd40100b522f1a1416e8f9f7259e2b?placeholderIfAbsent=true&apiKey=b7dde77ca8de46239c4205de9625fdd3", title: "Chitra Pournami" },
  { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/a012cadedee89f745a03074d8ac2ecb879b40c312291daa336dc8c5bf372d20d?placeholderIfAbsent=true&apiKey=b7dde77ca8de46239c4205de9625fdd3", title: "Pongal" },
  { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/67ae72b1a3ccfe123654a5ea6d4c6c2b44f410a952c99fcba9ec8f0840fe176b?placeholderIfAbsent=true&apiKey=b7dde77ca8de46239c4205de9625fdd3", title: "Thai Poosam" }
];

const contacts = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/44d4d301cb42422843f8b4e377cbfaa678e3c5f3ff4eca8a3a654dbecacc6932?placeholderIfAbsent=true&apiKey=b7dde77ca8de46239c4205de9625fdd3", text: "91+ 9019285770" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/44d4d301cb42422843f8b4e377cbfaa678e3c5f3ff4eca8a3a654dbecacc6932?placeholderIfAbsent=true&apiKey=b7dde77ca8de46239c4205de9625fdd3", text: "91+1823479083" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/44d4d301cb42422843f8b4e377cbfaa678e3c5f3ff4eca8a3a654dbecacc6932?placeholderIfAbsent=true&apiKey=b7dde77ca8de46239c4205de9625fdd3", text: "91+3247892343" }
];

const socialIcons = [
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a40e9c4ccf83903130e264a54e5939c761ec98a6dadea3ea1de1cd0d3c077838?placeholderIfAbsent=true&apiKey=b7dde77ca8de46239c4205de9625fdd3", alt: "Facebook" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5026ac004a2debf235a6ef24ea7b0e674acbeaef45ff5d06787987fd035fff38?placeholderIfAbsent=true&apiKey=b7dde77ca8de46239c4205de9625fdd3", alt: "Twitter" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/da1cc3bdd072e570ba972a962526c45479c30f6e98c58fd4d32cd7e708391bbf?placeholderIfAbsent=true&apiKey=b7dde77ca8de46239c4205de9625fdd3", alt: "Instagram" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e5f808b55d40535ba499e40e219df6a5f5f5e26d362eecab27e7a2a89a972ce6?placeholderIfAbsent=true&apiKey=b7dde77ca8de46239c4205de9625fdd3", alt: "YouTube" }
];

export const Events = () => {
  return (
    <div className={styles.eventsContainer}>
      {/* <Header/> */}

      <h1 className={styles.templeTitle}>
        ARULMIGU SRI RAMAPERUMAL KOVIL
        <br />
        <span lang="ta">அருள்மிகு ஸ்ரீ ராமபெருமாள் கோவில்</span>
      </h1>

      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5eda65379a5729dd155ad121029cb09bcc732dcbe56fe0fc5bcb2c3aab5dee21?placeholderIfAbsent=true&apiKey=b7dde77ca8de46239c4205de9625fdd3"
        alt="Temple main view"
        className={styles.mainImage}
      />

      <h2 className={styles.eventsTitle}>Event's</h2>

      <div className={styles.eventsGrid}>
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Follow Us</h3>
          <div className={styles.socialIcons}>
            {socialIcons.map((icon, index) => (
              <SocialIcon key={index} {...icon} />
            ))}
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Contact us</h3>
          <div className={styles.contactInfo}>
            {contacts.map((contact, index) => (
              <ContactInfo key={index} {...contact} />
            ))}
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Get in touch with us</h3>
          <p className={styles.footerText}>We'd love to hear from you!</p>
          <p className={styles.footerText}>Email: kovil@gmail.com</p>
          <address className={styles.footerText}>Address: Kolvil</address>
        </div>
      </footer>
    </div>
  );
};
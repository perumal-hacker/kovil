import React from 'react';
import { EventCard } from './EventCard';
import { ContactInfo } from './ContactInfo';
import { SocialIcon } from './SocialIcon';
// import { FaPhoneAlt } from "react-icons/fa";
// import { Navigation } from './Navigation';
import styles from '../../styles/Temple.module.css';
import karthikpournami from '../assets/images/karthik-pournami.jpg';
import karthikamasam from '../assets/images/karthika-masam.jpg';
import Brahmotsavm from '../assets/images/Brahmotsavam.jpg';
import mahashivaratri from '../assets/images/maha-shivaratri.jpg';
import ganeshachaturthi from '../assets/images/ganesha-chaturthi.jpg';
import panguniuthiram from  '../assets/images/panguni-uthiram.jpg'
import chitrapournami from '../assets/images/chitra-pournami.jpg';
import pongal from '../assets/images/pongal.jpg';
import thaipoosam from '../assets/images/thai-poosam.jpg';
// import templelogo from '../assets/images/templelogo.png'
import EventTemple from '../assets/images/EventTemple.jpg';
import contactus from '../assets/images/contactus.png'
import { Header } from '../Header';




const events = [
  { image:  karthikpournami , title: "Karthika pournami" },
  { image: karthikamasam, title: "Karthika Masam" },
  { image: Brahmotsavm, title: "Brahmotsavam" },
  { image:  mahashivaratri, title: "Maha Shivaratri" },
  { image: ganeshachaturthi, title: "Ganesha Chaturthi" },
  { image: panguniuthiram, title: "Panguni Uthiram" },
  { image: chitrapournami, title: "Chitra Pournami" },
  { image: pongal, title: "Pongal" },
  { image: thaipoosam, title: "Thai Poosam" }
];

const contacts = [
  { icon: contactus, text: "91+ 9019285770" },
  { icon: contactus, text: "91+1823479083" },
  { icon: contactus, text: "91+3247892343" }
];



const socialIcons = [
  { src: 'https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/665a012ffa8966ba2094ee534c365d32d37705ef95458d39a9cb219ae7ce699d?apiKey=cefa1649806149578fe3d15c65143941&', alt: "Facebook", href: "https://facebook.com/temple" },
  { src: 'https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/c770db62cab8d4c358df55b467369f57561ee5208b37076ba3e2656ec61c5c84?apiKey=cefa1649806149578fe3d15c65143941&', alt: "Twitter", href: "https://twitter.com/temple" },
  { src: 'https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/ee4719b264592f03050fc2b6c5fbe092ddcc287b76766e0c3ffaa59762ae6f54?apiKey=cefa1649806149578fe3d15c65143941&', alt: "Instagram", href: "https://instagram.com/temple" },
  { src: 'https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/fe7a5dc64169e485a10c42f7b0fc6784b0333d40b93bd049b7e93ca44121754a?apiKey=cefa1649806149578fe3d15c65143941&', alt: "YouTube", href: "https://youtube.com/temple" }
];





export const Temple = () => {
  return (
    <div className={styles.templeContainer}>
      <Header/>

      <main className={styles.main} role="main">
        <h1 className={styles.templeTitle}>
          ARULMIGU SRI RAMAPERUMAL KOVIL
          <br />
          <span lang="ta">அருள்மிகு ஸ்ரீ ராமபெருமாள் கோவில்</span>
        </h1>

        <img
          loading="lazy"
          src = {EventTemple}
          alt="Temple main view"
          className={styles.mainImage}
        />

        <section className={styles.eventsSection} aria-labelledby="events-title">
          <h2 id="events-title" className={styles.eventsTitle}>Event's</h2>
          <div className={styles.eventsGrid}>
            {events.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer} role="contentinfo">
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
          <p className={styles.footerText}>
            Email: <a href="mailto:kovil@gmail.com">kovil@gmail.com</a>
          </p>
          <address className={styles.footerText}>Address: Kovil</address>
        </div>
      </footer>

      
    </div>
  );
};
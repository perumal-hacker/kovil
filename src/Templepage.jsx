import React from 'react';
import { Header } from './components/Header';
import { ServiceCard } from './components/ServiceCard';
import { FeatureCard } from './components/FeatureCard';
import styles from './styles/TemplePage.module.css';
import aboutimage from './images/aboutimage.jpg';

const services = [
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/bd7339e88d291d103b72ca0f53c23728488da63b32c1fee173c603715b7003a5?apiKey=cefa1649806149578fe3d15c65143941&',
    title: 'Visit the Temple',
    description: 'Choose the most convenient time for you and book your appointment in the Website',
    actionIcon: 'https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/a1b3f4e34a20980e4622e7089fb91a7aff6ccb5e077f77f1ce6713405d6086c6?apiKey=cefa1649806149578fe3d15c65143941&'
  },
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/49aeed8554f15a4d08002e3a6290e9fd50d5d57ae663a2a5596fc7f2f0f3206e?apiKey=cefa1649806149578fe3d15c65143941&',
    title: 'Live Pooja',
    description: 'Experience the Live pooja of Arulmigu Sri Ramaperumal Kovil',
    actionIcon: 'https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/0959577d91db6a4573fac585753db7e5974798cd1b04baf16672325cc17d3342?apiKey=cefa1649806149578fe3d15c65143941&'
  },
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/76a705404e2cba452124119d00911981e9a38c784c1c370df3d0d33f974daa54?apiKey=cefa1649806149578fe3d15c65143941&',
    title: 'Host Functions',
    description: 'Choose dates for hosting Naming ceremony, Marriages, Feasts.',
    actionIcon: 'https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/e6d45f2b415aa832dcc327317facd44c97ae51895a17602148d3e91feee7f30d?apiKey=cefa1649806149578fe3d15c65143941&'
  }
];

const features = [
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/dc18dfd55107e50e8f51d53844b64e63cb13afb8ab85fb48f1efb72b8fcb3c96?apiKey=cefa1649806149578fe3d15c65143941&',
    title: 'Nature Friendly'
  },
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/045135b7c32c55caaa0ca97db809f34462ecab8a4bbb1b1a40800abd56d245e2?apiKey=cefa1649806149578fe3d15c65143941&',
    title: 'Charity'
  },
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/b51a30124fcf962c6cd2a224734708192e6536725e639e3222314b1b49cf1272?apiKey=cefa1649806149578fe3d15c65143941&',
    title: 'Parking Facility'
  },
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/67f7c45da66f825ab7dc51f5fb8382e0fc6e9ddb4f0309959b9fe3294863d4a1?apiKey=cefa1649806149578fe3d15c65143941&',
    title: 'Pooja Booking'
  }
];

const socialIcons = [
  { src: 'https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/665a012ffa8966ba2094ee534c365d32d37705ef95458d39a9cb219ae7ce699d?apiKey=cefa1649806149578fe3d15c65143941&', alt: 'Facebook' },
  { src: 'https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/c770db62cab8d4c358df55b467369f57561ee5208b37076ba3e2656ec61c5c84?apiKey=cefa1649806149578fe3d15c65143941&', alt: 'Twitter' },
  { src: 'https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/ee4719b264592f03050fc2b6c5fbe092ddcc287b76766e0c3ffaa59762ae6f54?apiKey=cefa1649806149578fe3d15c65143941&', alt: 'Instagram' },
  { src: 'https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/fe7a5dc64169e485a10c42f7b0fc6784b0333d40b93bd049b7e93ca44121754a?apiKey=cefa1649806149578fe3d15c65143941&', alt: 'YouTube' }
];

export const TemplePage = () => {
  return (
    <div className={styles.pageContainer}>
      <Header />
      
      <h1 className={styles.templeTitle}>
        ARULMIGU SRI RAMAPERUMAL KOVIL
        <br />
        <span lang="ta">அருள்மிகு ஸ்ரீ ராமபெருமாள் கோவில்</span>
      </h1>

      <section className={styles.welcomeSection}>
        <h2 className={styles.welcomeTitle}>
          Welcome to Arulmigu Sri Ramaperumal Kovil
        </h2>
        <p className={styles.welcomeText}>
          Experience Peace, Tradition, and Divinity All in One Place.
        </p>
      </section>

      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/52ba1865b5a653e347d786c79ac5fd4afaebd0e0d0291d9c11787eb3f3d83856?apiKey=cefa1649806149578fe3d15c65143941"
        className={styles.heroImage}
        alt="Temple main view"
      />
      <section className={styles.AboutSection}>
        
        <div className={styles.AboutDescription}>
          <h1 className={styles.AboutSubtitle}>About</h1>
          <p className={styles.AboutText}>
           Nestled in the serene Kolli Hills, Arulmigu Sri Ramaperumal Kovil is a sacred temple dedicated to Lord Rama.
           Surrounded by lush greenery and tranquil landscapes, the temple is a spiritual haven for devotees seeking peace and blessings.
          Known for its rich history and cultural significance.
          </p>
        </div>
        <div className={styles.AboutContent}>
          
          <img
            loading="lazy"
            src= {aboutimage}
            className={styles.AboutImage}
            alt="Temple gallery showcase"
          />
        </div>
      </section>

      <section className={styles.servicesSection}>
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </section>

      <section className={styles.gallerySection}>
        <div className={styles.galleryContent}>
          <h2 className={styles.galleryTitle}>Our Gallery</h2>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/cefa1649806149578fe3d15c65143941/08c1e814aa61265b6d5499865c3a1f3c43dadd3de1276a4e1adbe8803b2a6994?apiKey=cefa1649806149578fe3d15c65143941&"
            className={styles.galleryImage}
            alt="Temple gallery showcase"
          />
        </div>
        <div className={styles.galleryDescription}>
          <h1 className={styles.gallerySubtitle}>Divine Moments Captured</h1>
          <p className={styles.galleryText}>
            Step into the sacred world of Arulmigu Sri Ramaperumal Kovil through our gallery. 
            From the majestic architecture of the temple to the serene landscapes of Kolli Hills, 
            every image tells a story of devotion and tranquility.
          </p>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <h2 className={styles.featuresTitle}>Our Specialities</h2>
        <p className={styles.featuresText}>Arulmigu Sri Rama Perumal Kovil is a significant Hindu temple dedicated to Lord Rama,    
     located in places like Tiruvallur, Tamil Nadu. Known for its traditional Dravidian    
       architecture, the temple features intricate carvings and towering gopurams.</p>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.socialSection}>
          <h3 className={styles.socialTitle}>Follow Us</h3>
          <div className={styles.socialIcons}>
            {socialIcons.map((icon, index) => (
              <img
                key={index}
                loading="lazy"
                src={icon.src}
                className={styles.socialIcon}
                alt={icon.alt}
              />
            ))}
          </div>
        </div>

        <div className={styles.contactSection}>
          <h3 className={styles.contactTitle}>Contact us</h3>
          <div className={styles.contactInfo}>
            <p>91+ 9019285770</p>
            <p>91+1823479083</p>
            <p>91+3247892343</p>
          </div>
        </div>

        <div className={styles.addressSection}>
          <h3 className={styles.addressTitle}>Get in touch with us</h3>
          <p className={styles.addressText}>We'd love to hear from you!</p>
          <p className={styles.emailText}>Email: kovil@gmail.com</p>
          <p className={styles.locationText}>Address: Kolli Hills</p>
        </div>
      </footer>
    </div>
  );
};
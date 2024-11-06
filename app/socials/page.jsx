import React from 'react';

const About = () => {
  return (
    <div className="about-container" style={styles.container}>
      <h1 style={styles.heading}>About Us</h1>
      <p style={styles.paragraph}>
        Welcome to our website! We are dedicated to providing you with the best experience possible.
      </p>
      <p style={styles.paragraph}>
        Our mission is to deliver high-quality services and ensure customer satisfaction.
      </p>
      <p style={styles.paragraph}>
        Our team is passionate about what we do, and we are always looking to innovate and improve.
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  paragraph: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    marginBottom: '10px',
  },
};

export default About;
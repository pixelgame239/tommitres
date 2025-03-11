// pages/ThankYouScreen.jsx
import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import thankYouImage from '../assets/Thank-you.jpg';
import fbLogo from '../assets/Facebook-logo.png'

const ThankYouScreen = () => {
  // Theme colors with pink palette
  const theme = {
    primary: '#FF99CC',      // Pink light
    secondary: '#FF66B2',    // Pink medium
    backgroundLight: '#FFF0F5', // Very light pink (full background)
    textDark: '#3A1F25',
    textMuted: '#5C3A42'
  };

  // Responsive styles
  const getStyles = () => {
    const isMobile = window.innerWidth <= 768;

    return {
      container: {
        minHeight: '100vh',
        background: theme.backgroundLight,
        padding: isMobile ? '1rem 0' : '2rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      card: {
        borderRadius: '20px',
        border: 'none',
        background: 'white',
        boxShadow: '0 15px 35px rgba(255, 153, 204, 0.2)',
        maxWidth: isMobile ? '90%' : '500px',
        width: '100%',
        margin: '0 auto',
        animation: 'fadeIn 0.5s ease-in-out'
      },
      cardBody: {
        padding: isMobile ? '1.5rem' : '2.5rem',
        textAlign: 'center'
      },
      imageWrapper: {
        position: 'relative',
        width: isMobile ? '140px' : '180px',
        height: isMobile ? '140px' : '180px',
        margin: isMobile ? '0 auto 1.5rem' : '0 auto 2rem'
      },
      image: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        objectFit: 'cover',
        border: `4px solid ${theme.primary}`,
        boxShadow: '0 5px 20px rgba(255, 153, 204, 0.3)'
      },
      title: {
        fontSize: isMobile ? '1.75rem' : '2.25rem',
        fontWeight: 800,
        background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: isMobile ? '1rem' : '1.25rem',
        textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
      },
      leadText: {
        fontSize: isMobile ? '1rem' : '1.15rem',
        color: theme.textDark,
        marginBottom: '1rem',
        fontWeight: 600,
        textShadow: '0 1px 2px rgba(255, 255, 255, 0.6)'
      },
      secondaryText: {
        fontSize: isMobile ? '0.85rem' : '0.95rem',
        color: theme.textMuted,
        marginBottom: isMobile ? '1.5rem' : '2rem',
        lineHeight: '1.6',
        fontWeight: 500,
        textShadow: '0 1px 1px rgba(255, 255, 255, 0.5)'
      },
      button: {
        background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`,
        border: 'none',
        borderRadius: '30px',
        padding: isMobile ? '0.6rem 2rem' : '0.75rem 2.5rem',
        fontWeight: 700,
        fontSize: isMobile ? '0.9rem' : '1rem',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(255, 153, 204, 0.4)',
        color: '#FFFFFF',
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
      },
      facebookButton: {
        background: '#1877F2', // Facebook blue
        border: 'none',
        borderRadius: '30px',
        padding: isMobile ? '0.5rem 1.5rem' : '0.6rem 2rem',
        fontWeight: 700,
        fontSize: isMobile ? '0.9rem' : '1rem',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(24, 119, 242, 0.4)',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        margin: '0 auto'
      },
      fbLogo: {
        width: isMobile ? '20px' : '50px',
        height: 'auto'
      }
    };
  };

  const styles = getStyles();

  return (
    <Container fluid style={styles.container}>
      <Card style={styles.card}>
        <Card.Body style={styles.cardBody}>
          <div style={styles.imageWrapper}>
            <img
              src={thankYouImage}
              alt="Thank You"
              style={styles.image}
            />
          </div>
          <h1 style={styles.title}>Cảm ơn quý khách!</h1>
          <p style={styles.leadText}>
            Chúng tôi trân trọng sự ủng hộ của quý khách
          </p>
          <p style={styles.secondaryText}>
            Đơn hàng đã được xác nhận thành công.
          </p>
          <p style={styles.secondaryText}>            
            Vui lòng đợi trong giây lát!
          </p>
          <a 
            href="https://www.facebook.com/TOM.MIT.88/?locale=vi_VN" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <Button style={styles.facebookButton}>
              <img 
                src={fbLogo} 
                alt="Facebook" 
                style={styles.fbLogo} 
              />
              Theo dõi chúng tôi
            </Button>
          </a>
        </Card.Body>
      </Card>
    </Container>
  );
};

// Add CSS keyframes
const customStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default ThankYouScreen;
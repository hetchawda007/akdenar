import React from 'react';
import styled from 'styled-components';

const WhatsAppWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    bottom: 15px;
    right: 15px;
    
    img {
      width: 50px;
      height: 50px;
    }
  }
`;

const WhatsAppLink = styled.a`
  display: block;
  width: 60px;
  height: 60px;

  img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const WhatsAppButton = () => {
    const message = "Hello! I'm interested in your products."; // You can customize this message
    const phoneNumber = "+919220852922"; // Replace with your actual WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    const ChatText = styled.div`
      background-color: #25D366;
      color: white;
      padding: 6px 12px;
      border-radius: 16px;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      margin-top: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      opacity: 0.9;
      transition: opacity 0.3s ease;
      
      &:hover {
      opacity: 1;
      }
      
      @media (max-width: 768px) {
      font-size: 12px;
      padding: 4px 8px;
      }
    `;

    return (
      <WhatsAppWrapper>
        <WhatsAppLink
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="whatsapp-link"
        >
          <img 
            src="/whatsapp.png" 
            alt="WhatsApp Chat"
            className="whatsapp-icon" 
          />
        </WhatsAppLink>
        <ChatText className="chat-text">Chat with us</ChatText>
      </WhatsAppWrapper>
    );
};

export default WhatsAppButton; 
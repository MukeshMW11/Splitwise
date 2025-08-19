
const AnimationStyles = () => (
  <style jsx>{`
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes settleSuccess {
      0% {
        transform: scale(1);
        box-shadow: 0 0 0 rgba(34, 197, 94, 0);
      }
      50% {
        transform: scale(1.05);
        box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
      }
      100% {
        transform: scale(1.02);
        box-shadow: 0 0 15px rgba(34, 197, 94, 0.2);
      }
    }
    
    .animate-slideUp {
      animation: slideUp 0.6s ease-out both;
    }
    
    .animate-settleSuccess {
      animation: settleSuccess 1s ease-out both;
    }
  `}</style>
);

export default AnimationStyles;
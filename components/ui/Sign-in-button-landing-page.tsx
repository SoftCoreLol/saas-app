
const NewButton = ({ 
  children = "Get Started",
  onClick,
  className = "",
  variant = "indigo",
  size = "md",
  disabled = false,
  type = "button"
}) => {
  
  const variants = {
    indigo: {
      bg: "bg-indigo-500",
      hover: "bg-indigo-600",
      accent: "bg-indigo-700"
    },
    purple: {
      bg: "bg-purple-500",
      hover: "bg-purple-600",
      accent: "bg-purple-700"
    },
    blue: {
      bg: "bg-blue-500",
      hover: "bg-blue-600",
      accent: "bg-blue-700"
    },
    green: {
      bg: "bg-green-500",
      hover: "bg-green-600",
      accent: "bg-green-700"
    }
  };

  // Size variants
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const selectedVariant = variants[variant] || variants.indigo;
  const selectedSize = sizes[size] || sizes.md;

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative cursor-pointer flex items-center ${selectedSize} overflow-hidden font-medium transition-all ${selectedVariant.bg} rounded-md group ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <span className={`absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-300 ease-in-out ${selectedVariant.accent} rounded group-hover:-mr-4 group-hover:-mt-4`}>
        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
      </span>
      <span className={`absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-300 ease-in-out ${selectedVariant.accent} rounded group-hover:-ml-4 group-hover:-mb-4`}>
        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
      </span>
      <span className={`absolute bottom-0 left-0 w-full h-full transition-all duration-300 ease-in-out delay-200 -translate-x-full ${selectedVariant.hover} rounded-md group-hover:translate-x-0`} />
      <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
        {children}
      </span>
    </button>
  );
}

export default NewButton;
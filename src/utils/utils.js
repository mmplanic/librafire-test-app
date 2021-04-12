export const getClassName = (baseClass = "", className) => {
    if (!className) return baseClass;
    
    if (Array.isArray(className)) {
        for (let i = 0; i < className.length; i++) {
            baseClass += (className[i] ? ` ${className[i]}` : '');
        }
    }
    else {
        baseClass += " " + className;
    }
    return baseClass;
    
};

